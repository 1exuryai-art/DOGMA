const TOTAL_STEPS = 7;

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
    title: "Wybór barbera",
    subtitle: "Wybierz osobę, do której chcesz się zapisać."
  },
  {
    title: "Wybór daty",
    subtitle: "Wybierz dogodny dzień wizyty."
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
    oldPrice: 90,
    newPrice: 81,
    duration: "1h",
    durationMinutes: 60,
    saveText: "Zaoszczędź do 10%",
    note: "Najniższa cena z 30 dni przed obniżką: 90,00 zł"
  },
  {
    id: "combo",
    category: "popular",
    name: "Combo (Strzyżenie + Broda) / Haircut and beard",
    oldPrice: 140,
    newPrice: 126,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "Zaoszczędź do 10%",
    note: "Najniższa cena z 30 dni przed obniżką: 140,00 zł"
  },
  {
    id: "scissors",
    category: "premium",
    name: "Strzyżenie nożyczkami / Scissors haircut",
    oldPrice: 130,
    newPrice: 117,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 130,00 zł"
  },
  {
    id: "kids",
    category: "premium",
    name: "Fryzjer dla dzieci (4–12 lat)",
    oldPrice: 80,
    newPrice: 72,
    duration: "1h",
    durationMinutes: 60,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 80,00 zł"
  },
  {
    id: "buzz",
    category: "premium",
    name: "Buzz cut / tylko boki",
    oldPrice: 80,
    newPrice: 72,
    duration: "1h",
    durationMinutes: 60,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 80,00 zł"
  },
  {
    id: "beard-zero",
    category: "beard",
    name: "Broda + Golenie głowy na zero (shaver)",
    oldPrice: 90,
    newPrice: 81,
    duration: "50min",
    durationMinutes: 50,
    saveText: "Zaoszczędź do 10%",
    note: "Najniższa cena z 30 dni przed obniżką: 90,00 zł"
  },
  {
    id: "beard-trim",
    category: "beard",
    name: "Strzyżenie brody / Beard trim",
    oldPrice: 70,
    newPrice: 63,
    duration: "40min",
    durationMinutes: 40,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 70,00 zł"
  },
  {
    id: "shaving",
    category: "beard",
    name: "Golenie głowy golarką / Shaving",
    oldPrice: 50,
    newPrice: 45,
    duration: "30min",
    durationMinutes: 30,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 50,00 zł"
  },
  {
    id: "gray-beard",
    category: "gray",
    name: "Strzyżenie brody + Odsiwianie",
    oldPrice: 150,
    newPrice: 135,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 150,00 zł"
  },
  {
    id: "gray-hair",
    category: "gray",
    name: "Strzyżenie + Odsiwianie włosów",
    oldPrice: 150,
    newPrice: 135,
    duration: "1h 30min",
    durationMinutes: 90,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 150,00 zł"
  },
  {
    id: "gray-combo-beard",
    category: "gray",
    name: "Combo: włosy + broda + Odsiwianie brody",
    oldPrice: 210,
    newPrice: 189,
    duration: "2h",
    durationMinutes: 120,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 210,00 zł"
  },
  {
    id: "gray-combo-full",
    category: "gray",
    name: "Combo Odsiwianie: (włosy + broda) + strzyżenie",
    oldPrice: 260,
    newPrice: 234,
    duration: "2h",
    durationMinutes: 120,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 260,00 zł"
  },
  {
    id: "wax",
    category: "extras",
    name: "Depilacja woskiem",
    oldPrice: 20,
    newPrice: 18,
    duration: "5min",
    durationMinutes: 5,
    saveText: "",
    note: "Najniższa cena z 30 dni przed obniżką: 20,00 zł"
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
  step: 1,
  name: "",
  phone: "+48 ",
  selectedCategory: "",
  selectedServiceId: "",
  selectedBarberId: "",
  selectedDate: "",
  selectedTime: "",
  availableDates: [],
  slotsByDate: {},
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

const categoryList = document.getElementById("categoryList");
const servicesPanel = document.getElementById("servicesPanel");
const selectedCategoryTitle = document.getElementById("selectedCategoryTitle");
const servicesGrid = document.getElementById("servicesGrid");
const closeCategoryBtn = document.getElementById("closeCategoryBtn");

const barbersList = document.getElementById("barbersList");

const calendarGrid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("monthLabel");
const calendarStatus = document.getElementById("calendarStatus");
const dateError = document.getElementById("dateError");

const slotsGrid = document.getElementById("slotsGrid");
const slotsStatus = document.getElementById("slotsStatus");
const timeError = document.getElementById("timeError");

const submitError = document.getElementById("submitError");

function formatPrice(value) {
  return `${value.toFixed(2).replace(".", ",")} zł`;
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
  if (digits.startsWith("48")) digits = digits.slice(2);
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

function updateBindings() {
  const service = getSelectedService();
  const barber = getSelectedBarber();

  document.querySelectorAll('[data-bind="name"]').forEach(el => {
    el.textContent = state.name || "—";
  });

  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = state.phone || "—";
  });

  document.querySelectorAll('[data-bind="serviceName"]').forEach(el => {
    el.textContent = service?.name || "—";
  });

  document.querySelectorAll('[data-bind="servicePrice"]').forEach(el => {
    el.textContent = service ? formatPrice(service.newPrice) : "—";
  });

  document.querySelectorAll('[data-bind="serviceDuration"]').forEach(el => {
    el.textContent = service?.duration || "—";
  });

  document.querySelectorAll('[data-bind="barberName"]').forEach(el => {
    el.textContent = barber?.name || "—";
  });

  document.querySelectorAll('[data-bind="dateText"]').forEach(el => {
    el.textContent = formatDateText(state.selectedDate);
  });

  document.querySelectorAll('[data-bind="time"]').forEach(el => {
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
  backBtn.style.visibility = state.step === 1 ? "hidden" : "visible";

  if (state.step === 6) {
    nextBtn.textContent = state.submitting ? "Zapisywanie..." : "Zarezerwuj termin";
  } else if (state.step === 7) {
    nextBtn.classList.add("hidden");
    backBtn.classList.add("hidden");
    return;
  } else {
    nextBtn.textContent = "Dalej";
  }

  nextBtn.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  if (state.step === 1) {
    nextBtn.disabled = !(isValidName(state.name) && isValidPhone(state.phone));
  } else if (state.step === 2) {
    nextBtn.disabled = !state.selectedServiceId;
  } else if (state.step === 3) {
    nextBtn.disabled = !state.selectedBarberId;
  } else if (state.step === 4) {
    nextBtn.disabled = !state.selectedDate;
  } else if (state.step === 5) {
    nextBtn.disabled = !state.selectedTime;
  } else if (state.step === 6) {
    nextBtn.disabled = state.submitting;
  }
}

function showStep(step) {
  state.step = step;

  steps.forEach(section => {
    section.classList.toggle("active", Number(section.dataset.step) === step);
  });

  updateHeader();
  updateNav();
  updateBindings();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCategories() {
  categoryList.innerHTML = "";

  serviceCategories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-btn";
    if (state.selectedCategory === category.id) button.classList.add("active");

    button.innerHTML = `
      <strong>${category.title}</strong>
      <span>${category.description}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedCategory = category.id;
      renderCategories();
      renderServices();
    });

    categoryList.appendChild(button);
  });
}

function renderServices() {
  if (!state.selectedCategory) {
    servicesPanel.classList.add("hidden");
    servicesGrid.innerHTML = "";
    return;
  }

  servicesPanel.classList.remove("hidden");

  const category = serviceCategories.find(item => item.id === state.selectedCategory);
  selectedCategoryTitle.textContent = category?.title || "Usługi";

  const filtered = services.filter(service => service.category === state.selectedCategory);
  servicesGrid.innerHTML = "";

  filtered.forEach(service => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "service-card";
    if (state.selectedServiceId === service.id) card.classList.add("selected");

    card.innerHTML = `
      <strong>${service.name}</strong>
      <p class="old-note">${service.note}</p>
      <div class="service-prices">
        <span class="old-price">${formatPrice(service.oldPrice)}</span>
        <span class="new-price">${formatPrice(service.newPrice)}</span>
      </div>
      <div class="service-meta">
        <span>${service.duration}</span>
        <span>${service.saveText || "Premium"}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      state.selectedServiceId = service.id;
      state.selectedDate = "";
      state.selectedTime = "";
      renderServices();
      updateBindings();
      updateNav();
    });

    servicesGrid.appendChild(card);
  });
}

function renderBarbers() {
  barbersList.innerHTML = "";

  barbers.forEach(barber => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "barber-card";
    if (state.selectedBarberId === barber.id) card.classList.add("selected");

    card.innerHTML = `
      <div class="barber-photo">Zdjęcie ${barber.name}<br>PNG 1:1</div>
      <strong>💈 ${barber.name}</strong>
      <p>${barber.description}</p>
      <div class="barber-langs">
        ${barber.languages.map(lang => `<span>${lang}</span>`).join("")}
      </div>
    `;

    card.addEventListener("click", () => {
      state.selectedBarberId = barber.id;
      state.selectedDate = "";
      state.selectedTime = "";
      renderBarbers();
      updateBindings();
      updateNav();
    });

    barbersList.appendChild(card);
  });
}

function generateAvailability() {
  const today = new Date();
  state.availableDates = [];
  state.slotsByDate = {};

  const baseSlots = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00"
  ];

  for (let i = 1; i <= 18; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (date.getDay() === 0) continue;

    const iso = date.toISOString().slice(0, 10);
    state.availableDates.push(iso);

    state.slotsByDate[iso] = baseSlots.map((time, index) => ({
      time,
      available: ((index + i) % 4 !== 0)
    }));
  }
}

function renderCalendar() {
  calendarGrid.innerHTML = "";
  dateError.textContent = "";

  if (!state.availableDates.length) {
    generateAvailability();
  }

  if (state.availableDates[0]) {
    const firstDate = new Date(`${state.availableDates[0]}T00:00:00`);
    monthLabel.textContent = new Intl.DateTimeFormat("pl-PL", {
      month: "long",
      year: "numeric"
    }).format(firstDate);
  }

  calendarStatus.textContent = `${state.availableDates.length} dostępnych dni`;

  state.availableDates.forEach(dateStr => {
    const date = new Date(`${dateStr}T00:00:00`);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "calendar-day";
    if (state.selectedDate === dateStr) btn.classList.add("selected");
    btn.textContent = `${date.getDate()}.${date.getMonth() + 1}`;

    btn.addEventListener("click", () => {
      state.selectedDate = dateStr;
      state.selectedTime = "";
      renderCalendar();
      renderSlots();
      updateBindings();
      updateNav();
    });

    calendarGrid.appendChild(btn);
  });
}

function renderSlots() {
  slotsGrid.innerHTML = "";
  timeError.textContent = "";

  if (!state.selectedDate) {
    slotsStatus.textContent = "Najpierw wybierz datę";
    return;
  }

  const slots = state.slotsByDate[state.selectedDate] || [];
  const freeCount = slots.filter(slot => slot.available).length;
  slotsStatus.textContent = `${freeCount} wolnych godzin`;

  slots.forEach(slot => {
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
    serviceName: service.name,
    serviceDuration: service.duration,
    servicePrice: formatPrice(service.newPrice),
    barberName: barber.name,
    date: state.selectedDate,
    time: state.selectedTime
  };

  try {
    const response = await fetch("/api/book", {
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

    showStep(7);
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
    if (!state.selectedBarberId) return;
    showStep(4);
    return;
  }

  if (state.step === 4) {
    if (!state.selectedDate) {
      dateError.textContent = "Wybierz datę";
      return;
    }
    showStep(5);
    return;
  }

  if (state.step === 5) {
    if (!state.selectedTime) {
      timeError.textContent = "Wybierz godzinę";
      return;
    }
    showStep(6);
    return;
  }

  if (state.step === 6) {
    submitBooking();
  }
}

function prevStep() {
  if (state.step > 1) {
    showStep(state.step - 1);
  }
}

nameInput.addEventListener("input", e => {
  state.name = e.target.value;
  updateNav();
  updateBindings();
});

phoneInput.value = state.phone;

phoneInput.addEventListener("keydown", e => {
  const pos = phoneInput.selectionStart || 0;
  if ((e.key === "Backspace" || e.key === "Delete") && pos <= 4) {
    e.preventDefault();
  }
});

phoneInput.addEventListener("input", e => {
  let formatted = normalizePhone(e.target.value);
  if (formatted === "+48") formatted = "+48 ";
  e.target.value = formatted;
  state.phone = formatted;
  updateNav();
  updateBindings();
});

closeCategoryBtn.addEventListener("click", () => {
  state.selectedCategory = "";
  renderCategories();
  renderServices();
});

backBtn.addEventListener("click", prevStep);
nextBtn.addEventListener("click", nextStep);

renderCategories();
renderServices();
renderBarbers();
renderCalendar();
renderSlots();
updateBindings();
updateHeader();
updateNav();
