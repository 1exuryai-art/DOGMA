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

function buildDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    throw new Error("Date and time are required");
  }

  const isoDateTime = `${dateStr}T${timeStr}:00`;
  const date = new Date(isoDateTime);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date or time");
  }

  return date;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function formatCalendarDescription(payload) {
  return [
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

async function createEvent(payload) {
  const oauth2Client = createOAuthClient();
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const durationMinutes = parseDuration(payload.serviceDuration);
  const startDate = buildDateTime(payload.date, payload.time);
  const endDate = addMinutes(startDate, durationMinutes);

  const event = {
    summary: `${payload.serviceName} — ${payload.name}`,
    description: formatCalendarDescription(payload),
    start: {
      dateTime: startDate.toISOString(),
      timeZone: TIMEZONE
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: TIMEZONE
    }
  };

  const response = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: event
  });

  return response.data;
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

app.get("/api/slots/mock", (_req, res) => {
  const slots = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "11:30", available: true },
    { time: "12:00", available: true }
  ];

  res.json({
    ok: true,
    slots
  });
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
app.listen(PORT, () => {
  console.log(`DOGMA booking app running on port ${PORT}`);
});
