const MOCK_MODE = process.env.MOCK_MODE === "true";
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
const FRONTEND_FILE = process.env.FRONTEND_FILE || "frontend-index.html";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const requiredEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN"
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error("Missing required env variables:", missingEnv.join(", "));
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client
});

const BARBERS = [
  {
    id: "andrzej",
    name: "Andrzej"
  },
  {
    id: "michal",
    name: "Michał"
  },
  {
    id: "alex",
    name: "Alex"
  }
];

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
const FRONTEND_FILE = process.env.FRONTEND_FILE || "frontend-index.html";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const requiredEnv = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN"
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error("Missing required env variables:", missingEnv.join(", "));
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client
});

const BARBERS = [
  {
    id: "andrzej",
    name: "Andrzej"
  },
  {
    id: "michal",
    name: "Michał"
  },
  {
    id: "alex",
    name: "Alex"
  }
];

const SERVICES = [
  { category: "Strzyżenie, golenie", name: "Strzyżenie włosów", price: 100, duration: 45 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie włosów długich", price: 120, duration: 60 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie dziecka krótkie włosy (6-12 lat)", price: 80, duration: 30 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie dziecka długie włosy (6-12 lat)", price: 95, duration: 60 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie maszynką (jedna długość)", price: 80, duration: 30 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie włosów + hair tattoo", price: 110, duration: 60 },
  { category: "Strzyżenie, golenie", name: "Modelowanie brody", price: 90, duration: 30 },
  { category: "Strzyżenie, golenie", name: "Strzyżenie brody", price: 80, duration: 30 },
  { category: "Strzyżenie, golenie", name: "Golenie brzytwą na gładko", price: 90, duration: 60 },
  { category: "COMBO", name: "Strzyżenie włosów + modelowanie brody", price: 150, duration: 60 },
  { category: "COMBO", name: "Strzyżenie włosów + brody", price: 140, duration: 60 },
  { category: "COMBO", name: "Pakiet COMBO premium", price: 160, duration: 60 },
  { category: "COMBO", name: "Strzyżenie włosów długich + modelowanie brody", price: 170, duration: 75 },
  { category: "COMBO", name: "Ojciec i syn (dzieci 6-12 lat)", price: 160, duration: 60 },
  { category: "COMBO", name: "Strzyżenie + odsiwianie włosów i brody", price: 250, duration: 90 },
  { category: "COMBO", name: "Strzyżenie włosów + odsiwianie", price: 160, duration: 60 },
  { category: "COMBO", name: "Modelowanie brody + odsiwianie", price: 140, duration: 60 },
  { category: "Odsiwianie", name: "Odsiwianie włosów", price: 90, duration: 30 },
  { category: "Odsiwianie", name: "Odsiwianie brody", price: 90, duration: 30 }
];

const WORKING_HOURS = {
  start: process.env.WORKING_HOURS_START || "10:00",
  end: process.env.WORKING_HOURS_END || "18:00",
  slotStepMinutes: Number(process.env.SLOT_STEP_MINUTES) || 30,
  daysAhead: Number(process.env.DAYS_AHEAD) || 21
};

function parseTimeToMinutes(time) {
  if (!time || !time.includes(":")) return NaN;
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return NaN;
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getWarsawOffset(date) {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));

  return month >= 4 && month <= 10
    ? "+02:00"
    : "+01:00";
}

function combineDateAndTime(date, time) {
  return new Date(`${date}T${time}:00${getWarsawOffset(date)}`);
}

function addMinutes(dateObj, minutes) {
  return new Date(dateObj.getTime() + minutes * 60000);
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function isValidDateString(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidTimeString(time) {
  return /^\d{2}:\d{2}$/.test(time);
}

function normalizePrice(price) {
  if (price === undefined || price === null || price === "") return "";
  return String(price).trim().replace(/\s*zł\s*$/i, "");
}

function escapeRegExp(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeString(value = "") {
  return String(value).trim().toLowerCase();
}

function findServiceByName(serviceName) {
  return SERVICES.find((service) => normalizeString(service.name) === normalizeString(serviceName)) || null;
}

function findBarber({ barberId = "", barberName = "" }) {
  if (barberId) {
    const byId = BARBERS.find((barber) => barber.id === barberId.trim());
    if (byId) return byId;
  }

  if (barberName) {
    const byName = BARBERS.find(
      (barber) => normalizeString(barber.name) === normalizeString(barberName)
    );
    if (byName) return byName;
  }

  return null;
}

function getDateStringFromOffset(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


async function getBusyEvents(date, barberId = "", barberName = "") {
   if (process.env.MOCK_MODE === "true") {
    return [];
  }
  const offset = getWarsawOffset(date);
  const timeMin = new Date(`${date}T00:00:00${offset}`).toISOString();
  const timeMax = new Date(`${date}T23:59:59${offset}`).toISOString();

  const response = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime"
  });

  const items = response.data.items || [];

  if (!barberId && !barberName) {
    return items
      .filter((event) => event.start?.dateTime && event.end?.dateTime)
      .map((event) => ({
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime)
      }));
  }

  const barberIdPattern = barberId
    ? new RegExp(`Barber ID:\\s*${escapeRegExp(barberId)}`, "i")
    : null;

  const barberNamePattern = barberName
    ? new RegExp(`Barber:\\s*${escapeRegExp(barberName)}`, "i")
    : null;

  return items
    .filter((event) => event.start?.dateTime && event.end?.dateTime)
    .filter((event) => {
      const text = `${event.summary || ""}\n${event.description || ""}`;
      if (barberIdPattern?.test(text)) return true;
      if (barberNamePattern?.test(text)) return true;
      return false;
    })
    .map((event) => ({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime)
    }));
}

async function getAvailableSlots(date, duration, barberId = "", barberName = "") {
    if (process.env.MOCK_MODE === "true") {
    const startMinutes = parseTimeToMinutes(WORKING_HOURS.start);
    const endMinutes = parseTimeToMinutes(WORKING_HOURS.end);
    const step = WORKING_HOURS.slotStepMinutes;

    const availableSlots = [];

    for (let current = startMinutes; current + duration <= endMinutes; current += step) {
      const slotTime = minutesToTime(current);

      const blockedSlots = ["12:00", "13:30", "15:00"];
      if (!blockedSlots.includes(slotTime)) {
        availableSlots.push(slotTime);
      }
    }

    return availableSlots;
  }
  const busyEvents = await getBusyEvents(date, barberId, barberName);

  const startMinutes = parseTimeToMinutes(WORKING_HOURS.start);
  const endMinutes = parseTimeToMinutes(WORKING_HOURS.end);
  const step = WORKING_HOURS.slotStepMinutes;

  const availableSlots = [];

  for (let current = startMinutes; current + duration <= endMinutes; current += step) {
    const slotTime = minutesToTime(current);
    const slotStart = combineDateAndTime(date, slotTime);
    const slotEnd = addMinutes(slotStart, duration);

    const hasConflict = busyEvents.some((event) =>
      overlaps(slotStart, slotEnd, event.start, event.end)
    );

    if (!hasConflict) {
      availableSlots.push(slotTime);
    }
  }

  return availableSlots;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, FRONTEND_FILE));
});

app.get("/api/config", (req, res) => {
  return res.json({
    ok: true,
    project: "dogma-barbershop",
    timezone: TIMEZONE,
    workingHours: WORKING_HOURS,
    barbers: BARBERS,
    services: SERVICES
  });
});

app.get("/api/barbers", (req, res) => {
  return res.json({
    ok: true,
    barbers: BARBERS
  });
});

app.get("/api/services", (req, res) => {
  return res.json({
    ok: true,
    services: SERVICES
  });
});

app.get("/api/availability", async (req, res) => {
  try {
    const duration = Number(req.query.duration);
    const barberId = String(req.query.barberId || "").trim();
    const barberName = String(req.query.barberName || "").trim();

    if (!duration || duration <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Brak poprawnego duration"
      });
    }

    const availableDates = [];

    for (let i = 0; i < WORKING_HOURS.daysAhead; i++) {
      const dateStr = getDateStringFromOffset(i);
      const slots = await getAvailableSlots(dateStr, duration, barberId, barberName);

      if (slots.length > 0) {
        availableDates.push(dateStr);
      }
    }

    return res.json({
      ok: true,
      availableDates
    });
  } catch (error) {
    console.error("Availability error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      ok: false,
      message: "Nie udało się pobrać dostępnych dat"
    });
  }
});

app.get("/api/availability/slots", async (req, res) => {
  try {
    const { date } = req.query;
    const duration = Number(req.query.duration);
    const barberId = String(req.query.barberId || "").trim();
    const barberName = String(req.query.barberName || "").trim();

    if (!date || !isValidDateString(date) || !duration || duration <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Brakuje date lub duration"
      });
    }

    const availableSlots = await getAvailableSlots(date, duration, barberId, barberName);

    return res.json({
      ok: true,
      availableSlots
    });
  } catch (error) {
    console.error("Slots error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      ok: false,
      message: "Nie udało się pobrać wolnych godzin"
    });
  }
});

app.post("/api/bookings", async (req, res) => {
   if (process.env.MOCK_MODE === "true") {
    console.log("MOCK BOOKING:", req.body);

    return res.status(200).json({
      ok: true,
      message: "Mock booking saved",
      eventId: "mock-event-id",
      eventLink: null
    });
  }
  try {
    const {
      name,
      phone,
      service,
      price,
      duration,
      barberId,
      barberName,
      barberMode,
      date,
      time,
      notes
    } = req.body;

    if (!name || !phone || !service || !duration || !date || !time) {
      return res.status(400).json({
        ok: false,
        message: "Brakuje wymaganych danych"
      });
    }

    if (!isValidDateString(date) || !isValidTimeString(time)) {
      return res.status(400).json({
        ok: false,
        message: "Niepoprawna data lub godzina"
      });
    }

    const numericDuration = Number(duration);
    if (!numericDuration || numericDuration <= 0) {
      return res.status(400).json({
        ok: false,
        message: "Niepoprawny czas usługi"
      });
    }

    const matchedService = findServiceByName(service);
    if (!matchedService) {
      return res.status(400).json({
        ok: false,
        message: "Niepoprawna usługa"
      });
    }

    if (matchedService.duration !== numericDuration) {
      return res.status(400).json({
        ok: false,
        message: "Czas usługi nie zgadza się z konfiguracją"
      });
    }

    const expectedPrice = normalizePrice(matchedService.price);
    const providedPrice = normalizePrice(price);

    if (providedPrice && providedPrice !== expectedPrice) {
      return res.status(400).json({
        ok: false,
        message: "Cena usługi nie zgadza się z konfiguracją"
      });
    }

    const matchedBarber = findBarber({ barberId, barberName });
    const finalBarberId = matchedBarber?.id || "";
    const finalBarberName = matchedBarber?.name || "Losowy";

    const freshSlots = await getAvailableSlots(date, numericDuration, finalBarberId, finalBarberName === "Losowy" ? "" : finalBarberName);

    if (!freshSlots.includes(time)) {
      return res.status(409).json({
        ok: false,
        message: "Ten termin został już zajęty. Wybierz inny."
      });
    }

    const startDateTime = combineDateAndTime(date, time);
    const endDateTime = addMinutes(startDateTime, numericDuration);

    if (Number.isNaN(startDateTime.getTime()) || Number.isNaN(endDateTime.getTime())) {
      return res.status(400).json({
        ok: false,
        message: "Nie udało się przetworzyć daty lub godziny"
      });
    }

    const cleanedPrice = normalizePrice(matchedService.price);

    const event = {
      summary: `${matchedService.name} — ${name}`,
      description: [
        "Nowa rezerwacja DOGMA",
        `Imię: ${name}`,
        `Telefon: ${phone}`,
        `Usługa: ${matchedService.name}`,
        cleanedPrice ? `Cena: ${cleanedPrice} zł` : null,
        `Czas: ${numericDuration} min`,
        finalBarberName !== "Losowy" ? `Barber: ${finalBarberName}` : "Barber: Losowy",
        finalBarberId ? `Barber ID: ${finalBarberId}` : null,
        barberMode ? `Tryb wyboru: ${barberMode}` : null,
        `Data: ${date}`,
        `Godzina: ${time}`,
        notes ? `Uwagi: ${notes}` : null
      ]
        .filter(Boolean)
        .join("\n"),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: TIMEZONE
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: TIMEZONE
      }
    };

    const createdEvent = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event
    });

    return res.status(200).json({
      ok: true,
      message: "Rezerwacja została zapisana",
      eventId: createdEvent.data.id,
      eventLink: createdEvent.data.htmlLink
    });
  } catch (error) {
    console.error("Booking error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      ok: false,
      message: "Nie udało się utworzyć rezerwacji"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DOGMA backend started on port ${PORT}`);
});

