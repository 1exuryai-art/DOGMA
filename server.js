import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const TIMEZONE = process.env.TIMEZONE || "Europe/Warsaw";
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

const requiredEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN"
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function parseDuration(durationText) {
  if (!durationText || typeof durationText !== "string") {
    throw new Error("Invalid duration format");
  }

  const normalized = durationText.trim().toLowerCase();

  let totalMinutes = 0;

  const hourMatch = normalized.match(/(\d+)\s*h/);
  const minuteMatch = normalized.match(/(\d+)\s*min/);

  if (hourMatch) {
    totalMinutes += Number(hourMatch[1]) * 60;
  }

  if (minuteMatch) {
    totalMinutes += Number(minuteMatch[1]);
  }

  if (!hourMatch && !minuteMatch && /^\d+$/.test(normalized)) {
    totalMinutes = Number(normalized);
  }

  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) {
    throw new Error(`Unable to parse duration: ${durationText}`);
  }

  return totalMinutes;
}

function parseDateParts(dateStr) {
  const [year, month, day] = String(dateStr).split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD");
  }

  return { year, month, day };
}

function parseTimeParts(timeStr) {
  const [hour, minute] = String(timeStr).split(":").map(Number);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error("Invalid time format. Expected HH:MM");
  }

  return { hour, minute };
}

function getTimeZoneOffsetMinutes(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset"
  });

  const parts = formatter.formatToParts(date);
  const timeZoneName = parts.find((part) => part.type === "timeZoneName")?.value || "GMT+0";

  const match = timeZoneName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);

  if (!match) return 0;

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);

  return sign * (hours * 60 + minutes);
}

function getUtcDateFromTimeZoneLocal(dateStr, timeStr, timeZone = TIMEZONE) {
  const { year, month, day } = parseDateParts(dateStr);
  const { hour, minute } = parseTimeParts(timeStr);

  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offsetMinutes = getTimeZoneOffsetMinutes(utcGuess, timeZone);

  return new Date(utcGuess.getTime() - offsetMinutes * 60 * 1000);
}

function formatTimeInTimeZone(date, timeZone = TIMEZONE) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function formatDateTimeForGoogle(date, timeZone = TIMEZONE) {
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  const get = (type) => parts.find((part) => part.type === type)?.value || "";

  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`;
}

function buildDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    throw new Error("Date and time are required");
  }

  return getUtcDateFromTimeZoneLocal(dateStr, timeStr, TIMEZONE);
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function formatCalendarDescription(payload) {
  return [
    "Źródło: Rezerwacja przez stronę",
    `Imię: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `Usługa: ${payload.serviceName}`,
    `Barber: ${payload.barberName}`,
    `Data: ${payload.date}`,
    `Godzina: ${payload.time}`,
    `Czas trwania: ${payload.serviceDuration}`,
    `Cena: ${payload.servicePrice}`
  ].join("\n");
}

function createOAuthClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  return oauth2Client;
}

async function getBusyIntervals(dateStr) {
  if (!dateStr) {
    throw new Error("Date is required");
  }

  const oauth2Client = createOAuthClient();
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const dayStart = getUtcDateFromTimeZoneLocal(dateStr, "00:00", TIMEZONE);
  const dayEnd = getUtcDateFromTimeZoneLocal(dateStr, "23:59", TIMEZONE);

  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: dayStart.toISOString(),
    timeMax: dayEnd.toISOString(),
    singleEvents: true,
    orderBy: "startTime"
  });

  const events = response.data.items || [];

  return events
    .filter((event) => event.status !== "cancelled")
    .filter((event) => event.start?.dateTime && event.end?.dateTime)
    .map((event) => ({
      start: formatTimeInTimeZone(new Date(event.start.dateTime), TIMEZONE),
      end: formatTimeInTimeZone(new Date(event.end.dateTime), TIMEZONE)
    }));
}

async function createEvent(payload) {
  const oauth2Client = createOAuthClient();
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const durationMinutes = parseDuration(payload.serviceDuration);
  const startDate = buildDateTime(payload.date, payload.time);
  const endDate = addMinutes(startDate, durationMinutes);

  const event = {
    summary: `[WWW] ${payload.serviceName} - ${payload.name}`,
    description: formatCalendarDescription(payload),
    start: {
      dateTime: `${payload.date}T${payload.time}:00`,
      timeZone: TIMEZONE
    },
    end: {
      dateTime: formatDateTimeForGoogle(endDate, TIMEZONE),
      timeZone: TIMEZONE
    }
  };
  // ⬇️ 1. проверяем занят ли слот
const events = await calendar.events.list({
  calendarId: client.calendar_id,
  timeMin: start.toISOString(),
  timeMax: end.toISOString()
});

if (events.data.items.length > 0) {
  return res.status(400).json({ error: "Ten termin jest już zajęty" });
}

// ⬇️ 2. если свободно — создаём запись
const response = await calendar.events.insert({
  calendarId: client.calendar_id,
  requestBody: event
});

return res.json({ success: true });
}

app.get("/api/health", (_req, res) => {
  const credentialsReady = missingEnv.length === 0;

  res.json({
    ok: true,
    service: "DOGMA booking backend",
    credentialsReady,
    timezone: TIMEZONE,
    calendarId: CALENDAR_ID
  });
});

app.get("/api/availability", async (req, res) => {
  try {
    if (missingEnv.length > 0) {
      return res.status(500).json({
        ok: false,
        error: `Missing env variables: ${missingEnv.join(", ")}`
      });
    }

    const date = String(req.query.date || "").trim();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        ok: false,
        error: "Query param 'date' must be in format YYYY-MM-DD"
      });
    }

    const busy = await getBusyIntervals(date);

    return res.json({
      ok: true,
      date,
      timeZone: TIMEZONE,
      busy
    });
  } catch (error) {
    console.error("Availability error:", error);

    return res.status(500).json({
      ok: false,
      error: error.message || "Internal server error"
    });
  }
});

app.post("/api/book", async (req, res) => {
  try {
    if (missingEnv.length > 0) {
      return res.status(500).json({
        ok: false,
        error: `Missing env variables: ${missingEnv.join(", ")}`
      });
    }

    const {
      name,
      phone,
      serviceName,
      serviceDuration,
      servicePrice,
      barberName,
      date,
      time
    } = req.body || {};

    const requiredFields = {
      name,
      phone,
      serviceName,
      serviceDuration,
      servicePrice,
      barberName,
      date,
      time
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value || String(value).trim() === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        error: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    const payload = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceName: String(serviceName).trim(),
      serviceDuration: String(serviceDuration).trim(),
      servicePrice: String(servicePrice).trim(),
      barberName: String(barberName).trim(),
      date: String(date).trim(),
      time: String(time).trim()
    };

    const createdEvent = await createEvent(payload);

    return res.status(200).json({
      ok: true,
      message: "Booking saved to Google Calendar",
      eventId: createdEvent.id,
      eventLink: createdEvent.htmlLink
    });
  } catch (error) {
    console.error("Booking error:", error);

    return res.status(500).json({
      ok: false,
      error: error.message || "Internal server error"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DOGMA booking app running on port ${PORT}`);
});
