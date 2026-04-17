const API_BASE = "";

const INSTAGRAM_URL = "https://instagram.com/dogma.barbershop";
const MAPS_URL = "https://maps.google.com/?q=DOGMA+BARBERSHOP+Wrocław";
const CONTACT_PHONE = "+48500000000";

const stepMeta = [
  {
    title: "Dane kontaktowe",
    lead: "Zostaw podstawowe dane, żeby przejść do wyboru usługi i terminu.",
    short: "Kontakt"
  },
  {
    title: "Wybór usługi",
    lead: "Wybierz usługę w premium-service UI z ceną, czasem i rabatem.",
    short: "Usługa"
  },
  {
    title: "Wybór barbera",
    lead: "Duże karty, czytelne profile i wyraźny selected state.",
    short: "Barber"
  },
  {
    title: "Wybór daty",
    lead: "Dostępne są tylko przyszłe terminy. Wybierz dzień wizyty.",
    short: "Data"
  },
  {
    title: "Wybór godziny",
    lead: "Wolne sloty są klikalne. Zajęte godziny pozostają zablokowane.",
    short: "Godzina"
  },
  {
    title: "Potwierdzenie danych",
    lead: "Sprawdź wszystko przed zapisaniem wizyty do Google Calendar.",
    short: "Confirm"
  },
  {
    title: "Rezerwacja zapisana",
    lead: "Wizyta została pomyślnie zapisana w systemie.",
    short: "Success"
  }
];

const services = [
  {
    id: "haircut",
    category: "Popularne usługi",
    name: "Strzyżenie / Haircut",
    oldPrice: 90,
    newPrice: 81,
    duration: "1h",
    durationMinutes: 60,
    saveText: "Zaoszczędź do 10%",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 90,00 zł",
    popular: true
  },
  {
    id: "combo-hair-beard",
    category: "Popularne usługi",
    name: "Combo (Strzyżenie + Broda) / Haircut and beard",
    oldPrice: 140,
    newPrice: 126,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "Zaoszczędź do 10%",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 140,00 zł",
    popular: true
  },
  {
    id: "beard-zero",
    category: "Broda i golenie",
    name: "Broda + Golenie głowy na zero (shaver)",
    oldPrice: 90,
    newPrice: 81,
    duration: "50min",
    durationMinutes: 50,
    saveText: "Zaoszczędź do 10%",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 90,00 zł"
  },
  {
    id: "beard-trim",
    category: "Broda i golenie",
    name: "Strzyżenie brody / Beard trim",
    oldPrice: 70,
    newPrice: 63,
    duration: "40min",
    durationMinutes: 40,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 70,00 zł"
  },
  {
    id: "scissors",
    category: "Strzyżenie premium",
    name: "Strzyżenie nożyczkami / Scissors haircut",
    oldPrice: 130,
    newPrice: 117,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 130,00 zł"
  },
  {
    id: "kids",
    category: "Strzyżenie premium",
    name: "Fryzjer dla dzieci (4–12 lat)",
    oldPrice: 80,
    newPrice: 72,
    duration: "1h",
    durationMinutes: 60,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 80,00 zł"
  },
  {
    id: "buzz",
    category: "Strzyżenie premium",
    name: "Buzz cut / tylko boki",
    oldPrice: 80,
    newPrice: 72,
    duration: "1h",
    durationMinutes: 60,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 80,00 zł"
  },
  {
    id: "shaving",
    category: "Broda i golenie",
    name: "Golenie głowy golarką / Shaving",
    oldPrice: 50,
    newPrice: 45,
    duration: "30min",
    durationMinutes: 30,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 50,00 zł"
  },
  {
    id: "beard-gray",
    category: "Koloryzacja i odsiwianie",
    name: "Strzyżenie brody + Odsiwianie",
    oldPrice: 150,
    newPrice: 135,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 150,00 zł"
  },
  {
    id: "hair-gray",
    category: "Koloryzacja i odsiwianie",
    name: "Strzyżenie + Odsiwianie włosów",
    oldPrice: 150,
    newPrice: 135,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 150,00 zł"
  },
  {
    id: "combo-beard-gray",
    category: "Koloryzacja i odsiwianie",
    name: "Combo: włosy + broda + Odsiwianie brody",
    oldPrice: 210,
    newPrice: 189,
    duration: "2h",
    durationMinutes: 120,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 210,00 zł"
  },
  {
    id: "combo-full-gray",
    category: "Koloryzacja i odsiwianie",
    name: "Combo Odsiwianie: (włosy + broda) + strzyżenie",
    oldPrice: 260,
    newPrice: 234,
    duration: "2h",
    durationMinutes: 120,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 260,00 zł"
  },
  {
    id: "wax",
    category: "Dodatki",
    name: "Depilacja woskiem",
    oldPrice: 20,
    newPrice: 18,
    duration: "5min",
    durationMinutes: 5,
    saveText: "",
    oldPriceNote: "Najniższa cena z 30 dni przed obniżką: 20,00 zł"
  }
];

const barbers = [
  {
    id: "tymur",
    name: "Tymur",
    description: "Młody i ambitny barber z pasją do klasycznych strzyżeń.",
    languages: ["🇺🇦 Ukraiński", "🇵🇱 Polski", "🇬🇧 English"]
  },
  {
    id: "dima",
    name: "Dima",
    description: "Doświadczony barber z 3-letnim stażem. Mistrz klasyki i nowoczesnych stylów.",
    languages: ["🇺🇦 Ukraiński", "🇵🇱 Polski", "🇬🇧 English"]
  },
  {
    id: "vlad",
    name: "Vlad",
    description: "Młody talent z energią i świeżym podejściem do strzyżeń.",
    languages: ["🇺🇦 Ukraiński", "🇷🇺 Rosyjski", "🇵🇱 Polski"]
  }
];

const state = {
  currentStep: 1,
  name: "",
  phone: "",
  selectedServiceId: "",
  selectedBarberId: "",
  selectedDate: "",
  selectedTime: "",
  availableDates: [],
  slotsByDate: {},
  submitting: false
};

const steps = Array.from(document.querySelectorAll(".step"));
const progressRail = document.getElementById("progressRail");
const stepHeading = document.getElementById("stepHeading");
const stepLead = document.getElementById("stepLead");
const progressFill = document.getElementById("progressFill");
const summaryStepBadge = document.getElementById("summaryStepBadge");

const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const step1Next = document.getElementById("step1Next");

const serviceCategoriesEl = document.getElementById("serviceCategories");
const popularInlineList = document.getElementById("popularInlineList");
const popularServicesGrid = document.getElementById("popularServicesGrid");
const step2Next = document.getElementById("step2Next");

const barbersGrid = document.getElementById("barbersGrid");
const step3Next = document.getElementById("step3Next");

const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarStatus = document.getElementById("calendarStatus");
const calendarGrid = document.getElementById("calendarGrid");
const dateError = document.getElementById("dateError");
const step4Next = document.getElementById("step4Next");

const slotsStatus = document.getElementById("slotsStatus");
const slotsGrid = document.getElementById("slotsGrid");
const timeError = document.getElementById("timeError");
const step5Next = document.getElementById("step5Next");

const confirmBookingBtn = document.getElementById("confirmBookingBtn");
const submitError = document.getElementById("submitError");

document.getElementById("instagramBtn").href = INSTAGRAM_URL;
document.getElementById("mapsBtn").href = MAPS_URL;
document.getElementById("contactBtn").href = `tel:${CONTACT_PHONE}`;

function formatPrice(value) {
  if (value == null) return "—";
  return `${value.toFixed(2).replace(".", ",")} zł`;
}

function getSelectedService() {
  return services.find((service) => service.id === state.selectedServiceId) || null;
}

function getSelectedBarber() {
  return barbers.find((barber) => barber.id === state.selectedBarberId) || null;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function isValidName(value) {
  return value.trim().length >= 2;
}

function normalizePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  let localDigits = digits;

  if (localDigits.startsWith("48")) {
    localDigits = localDigits.slice(2);
  }

  localDigits = localDigits.slice(0, 9);

  let result = "+48";
  if (localDigits.length > 0) result += ` ${localDigits.slice(0, 3)}`;
  if (localDigits.length > 3) result += ` ${localDigits.slice(3, 6)}`;
  if (localDigits.length > 6) result += ` ${localDigits.slice(6, 9)}`;
  return result;
}

function isValidPhone(value) {
  return /^\+48 \d{3} \d{3} \d{3}$/.test(value.trim());
}

function updateBindings() {
  const selectedService = getSelectedService();
  const selectedBarber = getSelectedBarber();

  document.querySelectorAll('[data-bind="name"]').forEach((el) => {
    el.textContent = state.name || "—";
  });

  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = state.phone || "—";
  });

  document.querySelectorAll('[data-bind="serviceName"]').forEach((el) => {
    el.textContent = selectedService?.name || "—";
  });

  document.querySelectorAll('[data-bind="servicePrice"]').forEach((el) => {
    el.textContent = selectedService ? formatPrice(selectedService.newPrice) : "—";
  });

  document.querySelectorAll('[data-bind="serviceDuration"]').forEach((el) => {
    el.textContent = selectedService?.duration || "—";
  });

  document.querySelectorAll('[data-bind="barberName"]').forEach((el) => {
    el.textContent = selectedBarber?.name || "—";
  });

  document.querySelectorAll('[data-bind="dateText"]').forEach((el) => {
    el.textContent = formatDateDisplay(state.selectedDate);
  });

  document.querySelectorAll('[data-bind="time"]').forEach((el) => {
    el.textContent = state.selectedTime || "—";
  });
}

function renderProgressRail() {
  progressRail.innerHTML = "";

  stepMeta.forEach((step, index) => {
    const stepNumber = index + 1;
    const item = document.createElement("div");
    item.className = "progress-step";
    item.dataset.stepNumber = String(stepNumber);

    if (stepNumber < state.currentStep) item.classList.add("done");
    if (stepNumber === state.currentStep) item.classList.add("active");

    item.innerHTML = `<strong>${step.short}</strong>`;
    progressRail.appendChild(item);
  });

  const width = (state.currentStep / stepMeta.length) * 100;
  progressFill.style.width = `${width}%`;
  summaryStepBadge.textContent = `Krok ${state.currentStep} / ${stepMeta.length}`;
}

function setStep(stepNumber) {
  state.currentStep = stepNumber;

  steps.forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === stepNumber);
  });

  const meta = stepMeta[stepNumber - 1];
  stepHeading.textContent = meta.title;
  stepLead.textContent = meta.lead;

  renderProgressRail();
  updateBindings();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function validateStep1(showErrors = false) {
  const nameOk = isValidName(state.name);
  const phoneOk = isValidPhone(state.phone);

  if (showErrors) {
    nameError.textContent = nameOk ? "" : "Wpisz poprawne imię";
    phoneError.textContent = phoneOk ? "" : "Podaj poprawny numer telefonu";
  }

  step1Next.disabled = !(nameOk && phoneOk);
  return nameOk && phoneOk;
}

function buildServiceCard(service) {
  const card = document.createElement("article");
  card.className = "service-card";
  if (state.selectedServiceId === service.id) {
    card.classList.add("selected");
  }

  card.innerHTML = `
    <div class="service-top">
      <h4 class="service-title">${service.name}</h4>
      ${service.saveText ? `<span class="save-badge">${service.saveText}</span>` : ""}
    </div>
    <div class="service-old-note">${service.oldPriceNote}</div>
    <div class="service-pricing">
      <span class="service-old-price">${formatPrice(service.oldPrice)}</span>
      <span class="service-new-price">${formatPrice(service.newPrice)}</span>
    </div>
    <div class="service-duration">${service.duration}</div>
    <div class="service-cta">Umów</div>
  `;

  card.addEventListener("click", () => {
    state.selectedServiceId = service.id;
    state.selectedDate = "";
    state.selectedTime = "";
    renderServices();
    renderPopularServices();
    renderCalendar();
    renderSlots();
    updateBindings();
    updateStepButtons();
  });

  return card;
}

function renderServices() {
  serviceCategoriesEl.innerHTML = "";

  const categories = [...new Set(services.map((service) => service.category))];

  categories.forEach((category) => {
    const wrap = document.createElement("section");
    wrap.className = "service-category";

    const list = services.filter((service) => service.category === category);

    const head = document.createElement("div");
    head.className = "service-category-head";
    head.innerHTML = `
      <h4>${category}</h4>
      <span>${list.length} usług</span>
    `;

    const grid = document.createElement("div");
    grid.className = "services-grid";

    list.forEach((service) => {
      grid.appendChild(buildServiceCard(service));
    });

    wrap.appendChild(head);
    wrap.appendChild(grid);
    serviceCategoriesEl.appendChild(wrap);
  });

  const popular = services.filter((service) => service.popular);
  popularInlineList.innerHTML = "";

  popular.forEach((service) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "inline-pick";
    btn.textContent = service.name;
    btn.addEventListener("click", () => {
      state.selectedServiceId = service.id;
      state.selectedDate = "";
      state.selectedTime = "";
      renderServices();
      renderPopularServices();
      renderCalendar();
      renderSlots();
      updateBindings();
      updateStepButtons();
    });
    popularInlineList.appendChild(btn);
  });
}

function renderPopularServices() {
  const popular = services.filter((service) => service.popular);
  popularServicesGrid.innerHTML = "";

  popular.forEach((service) => {
    const card = document.createElement("article");
    card.className = "popular-service-card glass-inner";
    card.innerHTML = `
      <strong>${service.name}</strong>
      <p>${service.oldPriceNote}</p>
      <div class="popular-service-meta">
        <span>${formatPrice(service.newPrice)}</span>
        <span>${service.duration}</span>
      </div>
    `;
    popularServicesGrid.appendChild(card);
  });
}

function renderBarbers() {
  barbersGrid.innerHTML = "";

  barbers.forEach((barber) => {
    const card = document.createElement("article");
    card.className = "barber-card";
    if (state.selectedBarberId === barber.id) {
      card.classList.add("selected");
    }

    const languages = barber.languages
      .map((lang) => `<span>${lang}</span>`)
      .join("");

    card.innerHTML = `
      <div class="barber-photo">
        <div>
          Placeholder zdjęcia<br />
          PNG / 1:1 / 1200×1200
        </div>
        <span class="barber-photo-badge">DOGMA</span>
      </div>
      <h4>💈 ${barber.name}</h4>
      <p>${barber.description}</p>
      <div class="barber-languages">${languages}</div>
    `;

    card.addEventListener("click", () => {
      state.selectedBarberId = barber.id;
      state.selectedDate = "";
      state.selectedTime = "";
      renderBarbers();
      renderCalendar();
      renderSlots();
      updateBindings();
      updateStepButtons();
    });

    barbersGrid.appendChild(card);
  });
}

function generateMockAvailability() {
  const today = new Date();
  const availableDates = [];
  const slotsByDate = {};
  const service = getSelectedService();

  const baseSlots = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30"
  ];

  for (let i = 1; i <= 20; i += 1) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);

    const weekday = current.getDay();
    if (weekday === 0) continue;

    const iso = current.toISOString().slice(0, 10);
    availableDates.push(iso);

    const slots = baseSlots.map((time, index) => {
      const isBusy =
        (index + i) % 4 === 0 ||
        (service?.durationMinutes || 0) >= 120 && index % 3 === 0;

      return {
        time,
        available: !isBusy
      };
    });

    slotsByDate[iso] = slots;
  }

  state.availableDates = availableDates;
  state.slotsByDate = slotsByDate;
}

function renderCalendar() {
  calendarGrid.innerHTML = "";
  dateError.textContent = "";

  if (!state.selectedServiceId || !state.selectedBarberId) {
    calendarMonthLabel.textContent = "Wybierz usługę i barbera";
    calendarStatus.textContent = "Brak danych";
    step4Next.disabled = true;
    return;
  }

  if (!state.availableDates.length) {
    generateMockAvailability();
  }

  calendarStatus.textContent = `${state.availableDates.length} dostępnych dni`;

  const firstDate = state.availableDates[0];
  if (firstDate) {
    const first = new Date(`${firstDate}T00:00:00`);
    calendarMonthLabel.textContent = new Intl.DateTimeFormat("pl-PL", {
      month: "long",
      year: "numeric"
    }).format(first);
  } else {
    calendarMonthLabel.textContent = "Brak terminów";
  }

  const dates = state.availableDates.map((dateStr) => new Date(`${dateStr}T00:00:00`));
  if (!dates.length) return;

  const first = dates[0];
  let dayOffset = first.getDay() - 1;
  if (dayOffset < 0) dayOffset = 6;

  for (let i = 0; i < dayOffset; i += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    calendarGrid.appendChild(empty);
  }

  state.availableDates.forEach((dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "calendar-day";
    if (state.selectedDate === dateStr) btn.classList.add("selected");

    btn.innerHTML = `
      <div>${date.getDate()}</div>
    `;

    btn.addEventListener("click", () => {
      state.selectedDate = dateStr;
      state.selectedTime = "";
      renderCalendar();
      renderSlots();
      updateBindings();
      updateStepButtons();
    });

    calendarGrid.appendChild(btn);
  });
}

function renderSlots() {
  slotsGrid.innerHTML = "";
  timeError.textContent = "";

  if (!state.selectedDate) {
    slotsStatus.textContent = "Wybierz datę";
    step5Next.disabled = true;
    return;
  }

  const slots = state.slotsByDate[state.selectedDate] || [];
  const freeCount = slots.filter((slot) => slot.available).length;
  slotsStatus.textContent = `${freeCount} wolnych godzin`;

  slots.forEach((slot) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";
    btn.textContent = slot.time;

    if (!slot.available) {
      btn.classList.add("busy");
      btn.disabled = true;
    }

    if (state.selectedTime === slot.time) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      state.selectedTime = slot.time;
      renderSlots();
      updateBindings();
      updateStepButtons();
    });

    slotsGrid.appendChild(btn);
  });
}

function updateStepButtons() {
  step2Next.disabled = !state.selectedServiceId;
  step3Next.disabled = !state.selectedBarberId;
  step4Next.disabled = !state.selectedDate;
  step5Next.disabled = !state.selectedTime;
  confirmBookingBtn.disabled = state.submitting;
}

function goBack() {
  if (state.currentStep <= 1) return;
  setStep(state.currentStep - 1);
}

async function submitBooking() {
  submitError.textContent = "";

  const service = getSelectedService();
  const barber = getSelectedBarber();

  if (!service || !barber || !state.selectedDate || !state.selectedTime) {
    submitError.textContent = "Brakuje danych do rezerwacji.";
    return;
  }

  const payload = {
    name: state.name,
    phone: state.phone,
    serviceName: service.name,
    serviceDuration: service.duration,
    servicePrice: formatPrice(service.newPrice),
    barberName: barber.name,
    date: state.selectedDate,
    time: state.selectedTime
  };

  try {
    state.submitting = true;
    confirmBookingBtn.textContent = "Zapisywanie...";
    updateStepButtons();

    const response = await fetch(`${API_BASE}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.error || "Nie udało się zapisać wizyty.");
    }

    setStep(7);
  } catch (error) {
    submitError.textContent = error.message || "Wystąpił błąd podczas zapisu.";
  } finally {
    state.submitting = false;
    confirmBookingBtn.textContent = "Zarezerwuj termin";
    updateStepButtons();
  }
}

function bindEvents() {
  nameInput.addEventListener("input", (event) => {
    state.name = event.target.value;
    validateStep1(true);
    updateBindings();
  });

  phoneInput.value = "+48 ";
  state.phone = "+48 ";

  phoneInput.addEventListener("keydown", (event) => {
    const position = phoneInput.selectionStart || 0;
    if ((event.key === "Backspace" || event.key === "Delete") && position <= 4) {
      event.preventDefault();
    }
  });

  phoneInput.addEventListener("input", (event) => {
    let value = normalizePhone(event.target.value);
    if (value === "+48") value = "+48 ";
    event.target.value = value;
    state.phone = value;
    validateStep1(true);
    updateBindings();
  });

  step1Next.addEventListener("click", () => {
    if (!validateStep1(true)) return;
    setStep(2);
  });

  step2Next.addEventListener("click", () => {
    if (!state.selectedServiceId) return;
    setStep(3);
  });

  step3Next.addEventListener("click", () => {
    if (!state.selectedBarberId) return;
    generateMockAvailability();
    renderCalendar();
    setStep(4);
  });

  step4Next.addEventListener("click", () => {
    if (!state.selectedDate) {
      dateError.textContent = "Wybierz datę.";
      return;
    }
    setStep(5);
  });

  step5Next.addEventListener("click", () => {
    if (!state.selectedTime) {
      timeError.textContent = "Wybierz godzinę.";
      return;
    }
    setStep(6);
  });

  confirmBookingBtn.addEventListener("click", submitBooking);

  document.querySelectorAll(".back-btn").forEach((button) => {
    button.addEventListener("click", goBack);
  });
}

function init() {
  renderProgressRail();
  renderServices();
  renderPopularServices();
  renderBarbers();
  renderCalendar();
  renderSlots();
  updateBindings();
  updateStepButtons();
  bindEvents();
}

init();
