const API_BASE = "https://dogma-production.up.railway.app";
const TOTAL_STEPS = 8;

const DISCOUNT_PERCENT = 10;
const DISCOUNT_WEEKDAYS = [1, 2, 3, 4]; // pn-czw

const stepMeta = [
  {
    title: "Dane kontaktowe",
    subtitle: "Zostaw podstawowe dane i przejdź dalej."
  },
  {
    title: "Wybór usługi",
    subtitle: "Najpierw wybierz kategorię, potem konkretną usługę."
  },
  {
    title: "Wybrać barbera?",
    subtitle: "Możesz przejść dalej bez wyboru albo wybrać konkretnego barbera."
  },
  {
    title: "Wybór barbera",
    subtitle: "Przeglądaj barbera strzałkami i wybierz konkretną osobę."
  },
  {
    title: "Wybór daty",
    subtitle: "Salon otwarty codziennie. Rabat 10%: pon–czw, 10:00–16:00."
  },
  {
    title: "Wybór godziny",
    subtitle: "Wybierz wolny slot czasowy."
  },
  {
    title: "Potwierdzenie danych",
    subtitle: "Sprawdź wszystko przed zapisaniem wizyty."
  },
  {
    title: "Rezerwacja zapisana",
    subtitle: "Wizyta została pomyślnie dodana do systemu."
  }
];

const serviceCategories = [
  {
    id: "popular",
    title: "Popularne usługi",
    description: "Najczęściej wybierane opcje."
  },
  {
    id: "premium",
    title: "Strzyżenie premium",
    description: "Klasyczne i bardziej rozbudowane usługi włosów."
  },
  {
    id: "beard",
    title: "Broda i golenie",
    description: "Usługi brody i golenia."
  },
  {
    id: "gray",
    title: "Koloryzacja i odsiwianie",
    description: "Usługi premium z odsiwianiem."
  },
  {
    id: "extras",
    title: "Dodatki",
    description: "Szybkie dodatkowe usługi."
  }
];

const services = [
  {
    id: "haircut",
    category: "popular",
    name: "Strzyżenie / Haircut",
    basePrice: 90,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "combo",
    category: "popular",
    name: "Combo (Strzyżenie + Broda)",
    basePrice: 140,
    duration: "1h 30min",
    durationMinutes: 90
  },
  {
    id: "scissors",
    category: "premium",
    name: "Strzyżenie nożyczkami",
    basePrice: 130,
    duration: "1h 30min",
    durationMinutes: 90
  },
  {
    id: "kids",
    category: "premium",
    name: "Fryzjer dla dzieci (4–12 lat)",
    basePrice: 80,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "buzz",
    category: "premium",
    name: "Buzz cut / tylko boki",
    basePrice: 80,
    duration: "1h",
    durationMinutes: 60
  },
  {
    id: "beard-zero",
    category: "beard",
    name: "Broda + Golenie głowy na zero",
    basePrice: 90,
    duration: "50min",
    durationMinutes: 50
  },
  {
    id: "beard-trim",
    category: "beard",
    name: "Strzyżenie brody",
    basePrice: 70,
    duration: "40min",
    durationMinutes: 40
  },
  {
    id: "shaving",
    category: "beard",
    name: "Golenie głowy golarką",
    basePrice: 50,
    duration: "30min",
    durationMinutes: 30
  },
  {
    id: "gray-beard",
    category: "gray",
    name: "Strzyżenie brody + Odsiwianie",
    basePrice: 150,
    duration: "1h 30min",
    durationMinutes: 90
  },
  {
    id: "gray-hair",
    category: "gray",
    name: "Strzyżenie + Odsiwianie włosów",
    basePrice: 150,
    duration: "1h 30min",
    durationMinutes: 90
  },
  {
    id: "gray-combo-beard",
    category: "gray",
    name: "Combo: włosy + broda + Odsiwianie brody",
    basePrice: 210,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "gray-combo-full",
    category: "gray",
    name: "Combo Odsiwianie: włosy + broda + strzyżenie",
    basePrice: 260,
    duration: "2h",
    durationMinutes: 120
  },
  {
    id: "wax",
    category: "extras",
    name: "Depilacja woskiem",
    basePrice: 20,
    duration: "5min",
    durationMinutes: 5
  }
];

const barbers = [
  {
    id: "tymur",
    name: "Tymur",
    photo: "/tymur.png",
    description: "Młody i ambitny barber z pasją do klasycznych strzyżeń.",
    languages: ["🇺🇦 Ukraiński", "🇵🇱 Polski", "🇬🇧 English"]
  },
  {
    id: "dima",
    name: "Dima",
    photo: "/dima.png",
    description: "Doświadczony barber z 3-letnim stażem. Mistrz klasyki i nowoczesnych stylów.",
    languages: ["🇺🇦 Ukraiński", "🇵🇱 Polski", "🇬🇧 English"]
  },
  {
    id: "vlad",
    name: "Vlad",
    photo: "/vlad.png",
    description: "Młody talent z energią i świeżym podejściem do strzyżeń.",
    languages: ["🇺🇦 Ukraiński", "🇷🇺 Rosyjski", "🇵🇱 Polski"]
  }
];

const state = {
  step: 1,
  name: "",
  phone: "+48 ",
  selectedCategory: "",
  selectedServiceId: "",
  barberDecision: "",
  barberSlideIndex: 0,
  selectedBarberId: "",
  selectedDate: "",
  selectedTime: "",
  slotsByDate: {},
  calendarMonthOffset: 0,
  submitting: false
};

const steps = [...document.querySelectorAll(".step")];

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const stepPill = document.getElementById("stepPill");
const stepTitle = document.getElementById("stepTitle");
const stepSubtitle = document.getElementById("stepSubtitle");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

const categoryAccordion = document.getElementById("categoryAccordion");

const chooseBarberYes = document.getElementById("chooseBarberYes");
const chooseBarberNo = document.getElementById("chooseBarberNo");
const barberSkipBox = document.getElementById("barberSkipBox");

const barberSlidePhoto = document.getElementById("barberSlidePhoto");
const barberSlideName = document.getElementById("barberSlideName");
const barberSlideDescription = document.getElementById("barberSlideDescription");
const barberSlideLangs = document.getElementById("barberSlideLangs");
const barberCounter = document.getElementById("barberCounter");
const barberPrevBtn = document.getElementById("barberPrevBtn");
const barberNextBtn = document.getElementById("barberNextBtn");
const selectBarberBtn = document.getElementById("selectBarberBtn");

const monthLabel = document.getElementById("monthLabel");
const calendarStatus = document.getElementById("calendarStatus");
const calendarGrid = document.getElementById("calendarGrid");
const dateError = document.getElementById("dateError");
const calendarPrevBtn = document.getElementById("calendarPrevBtn");
const calendarNextBtn = document.getElementById("calendarNextBtn");

const slotsStatus = document.getElementById("slotsStatus");
const slotsGrid = document.getElementById("slotsGrid");
const timeError = document.getElementById("timeError");

const submitError = document.getElementById("submitError");

function formatPrice(value) {
  return `${Number(value).toFixed(2).replace(".", ",")} zł`;
}

function getSelectedService() {
  return services.find((service) => service.id === state.selectedServiceId) || null;
}

function getSelectedBarber() {
  return barbers.find((barber) => barber.id === state.selectedBarberId) || null;
}

function formatDateText(dateStr) {
  if (!dateStr) return "—";

  const date = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");

  if (digits.startsWith("48")) {
    digits = digits.slice(2);
  }

  digits = digits.slice(0, 9);

  let result = "+48";
  if (digits.length > 0) result += ` ${digits.slice(0, 3)}`;
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += ` ${digits.slice(6, 9)}`;

  return result;
}

function isValidName(value) {
  return value.trim().length >= 2;
}

function isValidPhone(value) {
  return /^\+48 \d{3} \d{3} \d{3}$/.test(value.trim());
}

function timeToMinutes(timeStr) {
  const [hour, minute] = timeStr.split(":").map(Number);
  return hour * 60 + minute;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function getWeekday(dateStr) {
  return new Date(`${dateStr}T00:00:00`).getDay();
}

function getWorkingHoursForDate(dateStr) {
  const day = getWeekday(dateStr);

  if (day === 0) {
    return { openHour: 10, closeHour: 18 };
  }

  return { openHour: 10, closeHour: 20 };
}

function isDiscountActiveNow() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const isDiscountDay = DISCOUNT_WEEKDAYS.includes(day);
  const isDiscountTime = minutes >= 10 * 60 && minutes < 16 * 60;

  return isDiscountDay && isDiscountTime;
}

function getLiveDiscountBadgeMarkup() {
  if (!isDiscountActiveNow()) return "";
  return `<div class="service-option-note">Zaoszczędź ${DISCOUNT_PERCENT}%</div>`;
}

function isDiscountWindow(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;

  const day = getWeekday(dateStr);
  if (!DISCOUNT_WEEKDAYS.includes(day)) return false;

  const minutes = timeToMinutes(timeStr);
  return minutes >= 10 * 60 && minutes < 16 * 60;
}

function getDiscountedPrice(basePrice) {
  return Number((basePrice * (1 - DISCOUNT_PERCENT / 100)).toFixed(2));
}

function getServicePriceDetails(service, dateStr = "", timeStr = "") {
  if (!service) {
    return {
      basePrice: 0,
      finalPrice: 0,
      hasDiscount: false
    };
  }

  const basePrice = service.basePrice;
  const hasDiscount = isDiscountWindow(dateStr, timeStr);
  const finalPrice = hasDiscount ? getDiscountedPrice(basePrice) : basePrice;

  return {
    basePrice,
    finalPrice,
    hasDiscount
  };
}

function getServicePriceText(service, dateStr = "", timeStr = "") {
  const details = getServicePriceDetails(service, dateStr, timeStr);
  return formatPrice(details.finalPrice);
}

function generateBaseSlotsForDate(dateStr, serviceDurationMinutes = 0) {
  const { openHour, closeHour } = getWorkingHoursForDate(dateStr);
  const slots = [];
  const lastStartMinutes = closeHour * 60 - serviceDurationMinutes;

  for (let minutes = openHour * 60; minutes <= lastStartMinutes; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );
  }

  return slots;
}

function buildSlotsFromBusy(dateStr, busyIntervals, serviceDurationMinutes) {
  const baseSlots = generateBaseSlotsForDate(dateStr, serviceDurationMinutes);

  return baseSlots
    .map((time) => {
      const slotStart = timeToMinutes(time);
      const slotEnd = slotStart + serviceDurationMinutes;

      const overlapsBusy = busyIntervals.some((busy) => {
        const busyStart = timeToMinutes(busy.start);
        const busyEnd = timeToMinutes(busy.end);
        return rangesOverlap(slotStart, slotEnd, busyStart, busyEnd);
      });

      return {
        time,
        available: !overlapsBusy
      };
    })
    .filter((slot) => slot.available);
}

async function loadAvailabilityForDate(dateStr) {
  const service = getSelectedService();
  const barber = getSelectedBarber();

  if (!dateStr || !service || !barber) return;

  slotsStatus.textContent = "Ładowanie godzin...";
  slotsGrid.innerHTML = "";

  const response = await fetch(
    `${API_BASE}/api/availability?date=${encodeURIComponent(dateStr)}&barberId=${encodeURIComponent(barber.id)}`
  );
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "Nie udało się pobrać dostępności.");
  }

  const busyIntervals = Array.isArray(data.busy) ? data.busy : [];
  state.slotsByDate[dateStr] = buildSlotsFromBusy(
    dateStr,
    busyIntervals,
    service.durationMinutes
  );
}

function updateBindings() {
  const service = getSelectedService();
  const barber = getSelectedBarber();
  const priceDetails = getServicePriceDetails(
    service,
    state.selectedDate,
    state.selectedTime
  );

  document.querySelectorAll('[data-bind="name"]').forEach((el) => {
    el.textContent = state.name || "—";
  });

  document.querySelectorAll('[data-bind="phone"]').forEach((el) => {
    el.textContent = state.phone || "—";
  });

  document.querySelectorAll('[data-bind="serviceName"]').forEach((el) => {
    el.textContent = service?.name || "—";
  });

  document.querySelectorAll('[data-bind="servicePrice"]').forEach((el) => {
    el.textContent = service ? formatPrice(priceDetails.finalPrice) : "—";
  });

  document.querySelectorAll('[data-bind="serviceDuration"]').forEach((el) => {
    el.textContent = service?.duration || "—";
  });

  document.querySelectorAll('[data-bind="barberName"]').forEach((el) => {
    el.textContent = barber?.name || "—";
  });

  document.querySelectorAll('[data-bind="dateText"]').forEach((el) => {
    el.textContent = formatDateText(state.selectedDate);
  });

  document.querySelectorAll('[data-bind="time"]').forEach((el) => {
    el.textContent = state.selectedTime || "—";
  });
}

function updateHeader() {
  const meta = stepMeta[state.step - 1];

  stepTitle.textContent = meta.title;
  stepSubtitle.textContent = meta.subtitle;
  stepPill.textContent = `${state.step} / ${TOTAL_STEPS}`;

  const percent = Math.round((state.step / TOTAL_STEPS) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}%`;
}

function updateNav() {
  if (state.step === 8) {
    backBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  backBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";

  if (state.step === 2) {
    nextBtn.classList.add("hidden");
    return;
  }

  nextBtn.classList.remove("hidden");
  nextBtn.classList.remove("pulse");

  if (state.step === 7) {
    nextBtn.textContent = state.submitting ? "Zapisywanie..." : "Zarezerwuj termin";
  } else {
    nextBtn.textContent = "Dalej";
  }

  if (state.step === 1) {
    nextBtn.disabled = !(isValidName(state.name) && isValidPhone(state.phone));
  } else if (state.step === 3) {
    nextBtn.disabled = !state.barberDecision;
  } else if (state.step === 4) {
    nextBtn.disabled = !state.selectedBarberId;
  } else if (state.step === 5) {
    nextBtn.disabled = !state.selectedDate;
  } else if (state.step === 6) {
    nextBtn.disabled = !state.selectedTime;
  } else if (state.step === 7) {
    nextBtn.disabled = state.submitting;
  } else {
    nextBtn.disabled = false;
  }

  if (state.step === 7 && !state.submitting) {
    nextBtn.classList.add("pulse");
  }
}

function showStep(step) {
  state.step = step;

  steps.forEach((section) => {
    section.classList.toggle("active", Number(section.dataset.step) === step);
  });

  updateHeader();
  updateBindings();
  updateNav();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function renderServiceAccordion() {
  categoryAccordion.innerHTML = "";

  serviceCategories.forEach((category) => {
    const item = document.createElement("div");
    const isOpen = state.selectedCategory === category.id;

    item.className = `accordion-item ${isOpen ? "open" : ""}`;

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "accordion-trigger";
    trigger.innerHTML = `
      <div class="accordion-trigger-main">
        <strong>${category.title}</strong>
        <span>${category.description}</span>
      </div>
      <div class="accordion-arrow">⌄</div>
    `;

    trigger.addEventListener("click", () => {
      state.selectedCategory = state.selectedCategory === category.id ? "" : category.id;
      renderServiceAccordion();
    });

    const body = document.createElement("div");
    body.className = "accordion-body";

    const inner = document.createElement("div");
    inner.className = "accordion-inner";

    const serviceList = document.createElement("div");
    serviceList.className = "service-option-list";

    const categoryServices = services.filter((service) => service.category === category.id);

    categoryServices.forEach((service) => {
      const card = document.createElement("div");
      card.className = `service-option ${state.selectedServiceId === service.id ? "selected" : ""}`;

      const liveDiscountMarkup = getLiveDiscountBadgeMarkup();

      card.innerHTML = `
        <div class="service-option-top">
          <strong class="service-option-title">${service.name}</strong>
          <span class="service-option-duration">${service.duration}</span>
        </div>

        <div class="service-option-prices">
          <span class="new-price">${formatPrice(service.basePrice)}</span>
        </div>

        ${liveDiscountMarkup}

        <div class="service-inline-next">
          <button class="nav-btn nav-btn-primary service-next-btn" type="button">
            Dalej
          </button>
        </div>
      `;

      card.addEventListener("click", (event) => {
        const nextButton = event.target.closest(".service-next-btn");

        state.selectedCategory = category.id;
        state.selectedServiceId = service.id;
        state.barberDecision = "";
        state.selectedBarberId = "";
        state.selectedDate = "";
        state.selectedTime = "";
        state.calendarMonthOffset = 0;
        state.slotsByDate = {};

        renderServiceAccordion();
        renderBarberDecision();
        renderBarberSlider();
        renderCalendar();
        renderSlots();
        updateBindings();
        updateNav();

        if (nextButton) {
          showStep(3);
        }
      });

      serviceList.appendChild(card);
    });

    inner.appendChild(serviceList);
    body.appendChild(inner);
    item.appendChild(trigger);
    item.appendChild(body);
    categoryAccordion.appendChild(item);
  });
}

function renderBarberDecision() {
  if (!barberSkipBox) return;

  barberSkipBox.classList.toggle("hidden", state.barberDecision !== "no");

  chooseBarberYes?.classList.toggle("active", state.barberDecision === "yes");
  chooseBarberNo?.classList.toggle("active", state.barberDecision === "no");
}

function renderBarberSlider() {
  const barber = barbers[state.barberSlideIndex];
  if (!barber) return;

  if (barberSlidePhoto) {
    barberSlidePhoto.innerHTML = `
      <img src="${barber.photo}" alt="${barber.name}" class="barber-photo-img" />
    `;
  }

  barberSlideName.textContent = barber.name;
  barberSlideDescription.textContent = barber.description;

  barberSlideLangs.innerHTML = "";
  barber.languages.forEach((lang) => {
    const tag = document.createElement("span");
    tag.textContent = lang;
    barberSlideLangs.appendChild(tag);
  });

  barberCounter.textContent = `${state.barberSlideIndex + 1} / ${barbers.length}`;

  const isSelected = state.selectedBarberId === barber.id;
  selectBarberBtn.textContent = isSelected ? "Barber wybrany" : "Wybierz tego barbera";
  selectBarberBtn.classList.toggle("selected", isSelected);
}

function getMonthName(monthIndex) {
  const months = [
    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
    "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
  ];

  return months[monthIndex];
}

function renderCalendar() {
  calendarGrid.innerHTML = "";
  dateError.textContent = "";

  const today = new Date();
  const currentMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() + state.calendarMonthOffset,
    1
  );

  const currentYear = currentMonthDate.getFullYear();
  const currentMonth = currentMonthDate.getMonth();

  monthLabel.textContent = `${getMonthName(currentMonth)} ${currentYear}`;

  const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  const firstDay = new Date(currentYear, currentMonth, 1);
  let firstWeekday = firstDay.getDay();
  if (firstWeekday === 0) firstWeekday = 7;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const cells = [];

  for (let i = firstWeekday - 1; i > 0; i -= 1) {
    cells.push({
      label: prevMonthDays - i + 1,
      muted: true
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateObj = new Date(currentYear, currentMonth, day);
    const iso = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    const isPast = iso < todayString;

    cells.push({
      label: day,
      iso,
      muted: false,
      available: !isPast,
      selected: state.selectedDate === iso,
      today: iso === todayString
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      label: "",
      muted: true
    });
  }

  calendarStatus.textContent = "Godziny: pn-sob 10:00–20:00, nd 10:00–18:00";

  cells.forEach((cell) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.textContent = cell.label;

    if (cell.muted) {
      button.classList.add("muted");
      button.disabled = true;
    } else {
      if (cell.selected) button.classList.add("selected");
      if (cell.today) button.classList.add("today");

      if (!cell.available) {
        button.classList.add("unavailable");
        button.disabled = true;
      } else {
        button.addEventListener("click", async () => {
          try {
            state.selectedDate = cell.iso;
            state.selectedTime = "";

            renderCalendar();
            renderSlots();
            updateBindings();
            updateNav();

            await loadAvailabilityForDate(cell.iso);

            renderSlots();
            updateBindings();
            updateNav();
          } catch (error) {
            dateError.textContent = error.message || "Nie udało się pobrać godzin.";
            slotsStatus.textContent = "Błąd ładowania godzin";
            slotsGrid.innerHTML = "";
          }
        });
      }
    }

    calendarGrid.appendChild(button);
  });

  calendarPrevBtn.disabled = state.calendarMonthOffset <= 0;
}

function renderSlots() {
  slotsGrid.innerHTML = "";
  timeError.textContent = "";

  if (!state.selectedDate) {
    slotsStatus.textContent = "Najpierw wybierz datę";
    return;
  }

  const slots = state.slotsByDate[state.selectedDate];
  const { openHour, closeHour } = getWorkingHoursForDate(state.selectedDate);

  if (!slots) {
    slotsStatus.textContent = "Wybierz dzień, aby pobrać godziny";
    return;
  }

  if (!slots.length) {
    slotsStatus.textContent = "Brak wolnych godzin";
    return;
  }

  slotsStatus.textContent = `${slots.length} wolnych godzin · ${String(openHour).padStart(2, "0")}:00–${String(closeHour).padStart(2, "0")}:00`;

  slots.forEach((slot) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";
    btn.textContent = slot.time;

    if (state.selectedTime === slot.time) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      state.selectedTime = slot.time;
      renderSlots();
      updateBindings();
      updateNav();
    });

    slotsGrid.appendChild(btn);
  });
}

async function submitBooking() {
  submitError.textContent = "";
  state.submitting = true;
  updateNav();

  const service = getSelectedService();
  const barber = getSelectedBarber();

  const payload = {
    name: state.name,
    phone: state.phone,
    serviceName: service?.name || "",
    serviceDuration: service?.duration || "",
    servicePrice: getServicePriceText(service, state.selectedDate, state.selectedTime),
    barberName: barber?.name || "",
    barberId: barber?.id || "",
    date: state.selectedDate,
    time: state.selectedTime
  };

  try {
    const response = await fetch(`${API_BASE}/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || "Nie udało się zapisać wizyty.");
    }

    showStep(8);
  } catch (error) {
    submitError.textContent = error.message || "Błąd serwera.";
  } finally {
    state.submitting = false;
    updateNav();
  }
}

function nextStep() {
  if (state.step === 1) {
    const validName = isValidName(state.name);
    const validPhone = isValidPhone(state.phone);

    nameError.textContent = validName ? "" : "Wpisz poprawne imię";
    phoneError.textContent = validPhone ? "" : "Podaj poprawny numer telefonu";

    if (!validName || !validPhone) return;
    showStep(2);
    return;
  }

  if (state.step === 2) {
    if (!state.selectedServiceId) return;
    showStep(3);
    return;
  }

  if (state.step === 3) {
    if (!state.barberDecision) return;

    if (state.barberDecision === "no") {
      timeError.textContent = "";
      dateError.textContent = "Wybór barbera jest wymagany";
      return;
    }

    showStep(4);
    return;
  }

  if (state.step === 4) {
    if (!state.selectedBarberId) return;
    showStep(5);
    return;
  }

  if (state.step === 5) {
    if (!state.selectedDate) {
      dateError.textContent = "Wybierz datę";
      return;
    }
    showStep(6);
    return;
  }

  if (state.step === 6) {
    if (!state.selectedTime) {
      timeError.textContent = "Wybierz godzinę";
      return;
    }
    showStep(7);
    return;
  }

  if (state.step === 7) {
    submitBooking();
  }
}

function prevStep() {
  if (state.step <= 1) return;
  showStep(state.step - 1);
}

function callDogma() {
  const phone = "+48792897149";

  try {
    window.location.href = `tel:${phone}`;
  } catch (error) {
    console.error("Call error:", error);
    navigator.clipboard?.writeText("792 897 149");
    alert("Nie udało się otworzyć połączenia. Numer został skopiowany: 792 897 149");
  }
}

window.callDogma = callDogma;

nameInput.addEventListener("input", (e) => {
  state.name = e.target.value;
  nameError.textContent = "";
  updateBindings();
  updateNav();
});

phoneInput.value = state.phone;

phoneInput.addEventListener("keydown", (e) => {
  const pos = phoneInput.selectionStart || 0;

  if ((e.key === "Backspace" || e.key === "Delete") && pos <= 4) {
    e.preventDefault();
  }
});

phoneInput.addEventListener("input", (e) => {
  let formatted = normalizePhone(e.target.value);

  if (formatted === "+48") {
    formatted = "+48 ";
  }

  e.target.value = formatted;
  state.phone = formatted;
  phoneError.textContent = "";
  updateBindings();
  updateNav();
});

backBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

chooseBarberYes.addEventListener("click", () => {
  state.barberDecision = "yes";
  state.selectedBarberId = "";
  renderBarberDecision();
  renderBarberSlider();
  updateBindings();
  updateNav();
  showStep(4);
});

chooseBarberNo.addEventListener("click", () => {
  state.barberDecision = "no";
  state.selectedBarberId = "";
  renderBarberDecision();
  updateBindings();
  updateNav();
});

barberPrevBtn.addEventListener("click", () => {
  state.barberSlideIndex = (state.barberSlideIndex - 1 + barbers.length) % barbers.length;
  renderBarberSlider();
});

barberNextBtn.addEventListener("click", () => {
  state.barberSlideIndex = (state.barberSlideIndex + 1) % barbers.length;
  renderBarberSlider();
});

selectBarberBtn.addEventListener("click", () => {
  state.selectedBarberId = barbers[state.barberSlideIndex].id;
  renderBarberSlider();
  updateBindings();
  updateNav();
});

calendarPrevBtn.addEventListener("click", () => {
  if (state.calendarMonthOffset <= 0) return;
  state.calendarMonthOffset -= 1;
  renderCalendar();
});

calendarNextBtn.addEventListener("click", () => {
  state.calendarMonthOffset += 1;
  renderCalendar();
});

renderServiceAccordion();
renderBarberDecision();
renderBarberSlider();
renderCalendar();
renderSlots();
updateBindings();
updateHeader();
updateNav();
