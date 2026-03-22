const STORAGE_START = "steady_sobriety_start_iso";
const STORAGE_NOTES = "steady_checkins";
const STORAGE_INTENT = "steady_intent_only";
const STORAGE_THEME = "steady_theme";
const STORAGE_HABITS = "steady_habits";
const STORAGE_JOURNAL = "steady_journal";
const STORAGE_RESOURCES = "steady_resources";

const STEADY_EXPORT_KEYS = [
  STORAGE_START,
  STORAGE_NOTES,
  STORAGE_INTENT,
  STORAGE_THEME,
  STORAGE_HABITS,
  STORAGE_JOURNAL,
  STORAGE_RESOURCES,
];

const STEADY_EXPORT_VERSION = 1;

const MOOD_CAPTIONS = ["Very low", "Low", "Okay — neutral", "Good", "Great"];
const MOOD_EMOJIS = ["😢", "🙁", "😐", "🙂", "😄"];
const ENERGY_CAPTIONS = ["Drained", "Low", "Steady — moderate", "Up", "Energized"];
const ENERGY_BATTERY_FILL_WIDTHS = [3, 9, 15, 21, 22];

function energyBatterySvg(level, className = "checkin-energy-batt") {
  const lv = Math.min(5, Math.max(1, level));
  const w = ENERGY_BATTERY_FILL_WIDTHS[lv - 1];
  return `<svg class="${className}" viewBox="0 0 36 18" width="36" height="18" aria-hidden="true" focusable="false"><rect x="1.5" y="3.5" width="28" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M31.5 6.5h3.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3.5" fill="currentColor" opacity="0.35"/><rect x="4.5" y="6" width="${w}" height="6" rx="1" fill="currentColor"/></svg>`;
}

const EMOTIONS = [
  { id: "hopeful", label: "Hopeful" },
  { id: "anxious", label: "Anxious" },
  { id: "proud", label: "Proud" },
  { id: "tired", label: "Tired" },
  { id: "grateful", label: "Grateful" },
  { id: "irritable", label: "Irritable" },
  { id: "calm", label: "Calm" },
  { id: "lonely", label: "Lonely" },
  { id: "motivated", label: "Motivated" },
];

const EMOTION_BY_ID = Object.fromEntries(EMOTIONS.map((e) => [e.id, e.label]));

/** Curated picks — thumbs-down hides per device; not personalized beyond that. */
const RESOURCE_CATEGORIES = [
  { key: "books", label: "Books" },
  { key: "podcasts", label: "Podcasts" },
  { key: "virtual", label: "Virtual meetings" },
  { key: "inperson", label: "In-person meetings" },
];

const CURATED_RESOURCES = [
  {
    id: "cb-naked-mind",
    category: "books",
    title: "This Naked Mind",
    desc: "A science- and compassion-framed look at how alcohol hooks the brain — popular with people rethinking drinking.",
    url: "https://thisnakedmind.com/",
  },
  {
    id: "cb-alcohol-explained",
    category: "books",
    title: "Alcohol Explained",
    desc: "William Porter breaks down what alcohol does in the body and why cravings and habits form — clear and practical.",
    url: "https://www.alcoholexplained.co.uk/",
  },
  {
    id: "cb-quit-like-woman",
    category: "books",
    title: "Quit Like a Woman",
    desc: "Holly Whitaker’s memoir-meets-manifesto on culture, marketing, and choosing sobriety on your own terms.",
    url: "https://www.hollywhitaker.com/",
  },
  {
    id: "cb-unexpected-joy",
    category: "books",
    title: "The Unexpected Joy of Being Sober",
    desc: "Catherine Gray’s warm, funny account of early sobriety and what changed when she stopped drinking.",
    url: "https://www.catherinegray.co.uk/",
  },
  {
    id: "cp-recovery-elevator",
    category: "podcasts",
    title: "Recovery Elevator",
    desc: "Interviews and stories from people in recovery — community-focused, many episodes on alcohol specifically.",
    url: "https://www.recoveryelevator.com/",
  },
  {
    id: "cp-sober-awkward",
    category: "podcasts",
    title: "Sober Awkward",
    desc: "Two hosts talk social life, dating, and confidence without alcohol — light and relatable.",
    url: "https://www.soberawkward.com/",
  },
  {
    id: "cp-bubble-hour",
    category: "podcasts",
    title: "The Bubble Hour",
    desc: "Conversations on sobriety, mental health, and recovery from Jean McCarthy and guests.",
    url: "https://www.bubblehourpodcast.com/",
  },
  {
    id: "cp-love-sobriety",
    category: "podcasts",
    title: "Love Sober",
    desc: "Kate Baily and Mandy Manners explore sober living, parenting, and midlife without the wine culture script.",
    url: "https://lovesober.com/podcast/",
  },
  {
    id: "cv-smart",
    category: "virtual",
    title: "SMART Recovery — online meetings",
    desc: "Free self-help meetings with a cognitive-behavioral toolkit; many online and international options.",
    url: "https://www.smartrecovery.org/community/calendar/",
  },
  {
    id: "cv-aa-online",
    category: "virtual",
    title: "AA — online meetings",
    desc: "Alcoholics Anonymous lists online and phone meetings worldwide if you want peer support from home.",
    url: "https://aa-intergroup.org/oia/meetings/",
  },
  {
    id: "cv-dharma",
    category: "virtual",
    title: "Recovery Dharma — online",
    desc: "Buddhist-inspired peer meetings focused on meditation and community; online schedules available.",
    url: "https://recoverydharma.org/",
  },
  {
    id: "cv-life-ring",
    category: "virtual",
    title: "LifeRing Secular Recovery",
    desc: "Secular, abstinence-based peer support with online meetings and forums.",
    url: "https://www.lifering.org/",
  },
  {
    id: "ci-aa-finder",
    category: "inperson",
    title: "AA meeting finder",
    desc: "Search for local Alcoholics Anonymous meetings by area — many groups welcome newcomers.",
    url: "https://www.aa.org/find-aa",
  },
  {
    id: "ci-smart-finder",
    category: "inperson",
    title: "SMART Recovery — in person",
    desc: "Filter the SMART calendar for face-to-face meetings near you.",
    url: "https://www.smartrecovery.org/community/calendar/",
  },
  {
    id: "ci-dharma-meet",
    category: "inperson",
    title: "Recovery Dharma — meetings",
    desc: "Local and hybrid Recovery Dharma sanghas listed on the main site.",
    url: "https://recoverydharma.org/",
  },
  {
    id: "ci-wfs",
    category: "inperson",
    title: "Women for Sobriety",
    desc: "Peer support groups built on the “New Life” program — check the meeting list for in-person and online options.",
    url: "https://womenforsobriety.org/meetings/",
  },
];

const CURATED_BY_ID = Object.fromEntries(CURATED_RESOURCES.map((r) => [r.id, r]));

const SUGGESTED_HABITS = [
  { id: "movement", title: "Daily movement", desc: "A short walk, stretch, or whatever feels doable today." },
  { id: "alt-drink", title: "Alcohol-free go-to drink", desc: "Herbal tea, sparkling water, fancy mocktail — a ritual you enjoy." },
  { id: "self-reward", title: "Reward saying no", desc: "When you turn down a drink, name the win — even a quiet “nice work.”" },
  { id: "sleep", title: "Protect sleep", desc: "Simple wind-down cues: dim lights, a steady bedtime when you can." },
  { id: "connect", title: "Reach out to someone", desc: "Text, call, or meet — connection softens hard days." },
  { id: "urge-plan", title: "First 10 minutes plan", desc: "When a craving spikes: step outside, make tea, breathe, or text a friend." },
];

const MILESTONES = [1, 3, 7, 14, 30, 60, 90, 180, 365];

const QUOTES = [
  { text: "Start where you are. Use what you have. Do what you can.", by: "Arthur Ashe" },
  { text: "Progress, not perfection.", by: "Recovery wisdom" },
  { text: "The future depends on what you do today.", by: "Mahatma Gandhi" },
  { text: "Every day is a new chance to choose differently.", by: "Anonymous" },
  { text: "Be gentle with yourself. You’re doing something hard.", by: "Anonymous" },
  { text: "Courage doesn’t always roar — sometimes it’s the quiet voice at the end of the day saying, I’ll try again tomorrow.", by: "Mary Anne Radmacher" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", by: "Ralph Waldo Emerson" },
];

/** Short teasers rotate by calendar day; details + links for deeper reading. */
const HEALTH_FACTS = [
  {
    teaser:
      "After you stop drinking, your digestive tract often gets room to calm down. Many people see gradual improvements in bloating, regularity, and gut comfort as inflammation and barrier stress ease—though timing varies widely.",
    detail:
      "Alcohol irritates the GI lining, shifts the microbiome, and is linked to increased intestinal permeability in research settings. Those changes can contribute to inflammation and digestive symptoms. With sustained abstinence or much lower intake, mucosal healing and microbial balance can improve over weeks to months, alongside nutrition and medical care when needed. Severe or long-standing disease still needs a clinician—not an app.",
    sources: [
      {
        label: "NIAAA — Alcohol’s effects on the body (GI system & microbiome)",
        url: "https://www.niaaa.nih.gov/alcohols-effects-health/alcohols-effects-body",
      },
      {
        label: "MedlinePlus — Alcohol",
        url: "https://medlineplus.gov/alcohol.html",
      },
    ],
  },
  {
    teaser:
      "Your liver isn’t stuck where it is today: when alcohol isn’t constantly in the picture, fat buildup and enzyme stress can improve. Early changes may show within weeks; more advanced scarring is harder to reverse and needs medical care.",
    detail:
      "The liver processes nearly all consumed alcohol. Heavy use can lead to fat accumulation, inflammation, and over time fibrosis or cirrhosis. Stopping or cutting back removes a major insult, so steatosis and some inflammatory changes can improve. Recovery isn’t guaranteed at every stage—this is why follow-up with a doctor matters, especially if you’ve drunk heavily for years.",
    sources: [
      {
        label: "NIAAA — Alcohol’s effects on the body (liver)",
        url: "https://www.niaaa.nih.gov/alcohols-effects-health/alcohols-effects-body",
      },
      {
        label: "NHS — Alcohol-related liver disease",
        url: "https://www.nhs.uk/conditions/alcohol-related-liver-disease-arld/",
      },
    ],
  },
  {
    teaser:
      "Alcohol fragments sleep and suppresses REM early in the night. After quitting, sleep architecture often becomes more restorative over time—though some people briefly feel sleep gets worse before it gets better.",
    detail:
      "Alcohol is sedating at first but later causes more awakenings and less REM sleep. That pattern improves for many after sustained abstinence, but alcohol withdrawal can include insomnia or vivid dreams in the short term. Persistent sleep problems deserve a clinician’s input.",
    sources: [
      {
        label: "Sleep Foundation — Alcohol and sleep",
        url: "https://www.sleepfoundation.org/nutrition/alcohol-and-sleep",
      },
      {
        label: "NIAAA — Alcohol’s effects on the body (brain & nervous system)",
        url: "https://www.niaaa.nih.gov/alcohols-effects-health/alcohols-effects-body",
      },
    ],
  },
  {
    teaser:
      "Heavy drinking raises blood pressure and strains the cardiovascular system. Cutting back or stopping is a recognized way to help blood pressure and heart risk move in a healthier direction for many people.",
    detail:
      "Alcohol contributes to hypertension and arrhythmias such as atrial fibrillation in susceptible people. Reductions in drinking are associated with meaningful blood-pressure improvements in studies and clinical guidance. Individual risk depends on genetics, overall health, and how much you drank—pair changes with your care team if you’re on medication.",
    sources: [
      {
        label: "CDC — Alcohol use and your health",
        url: "https://www.cdc.gov/alcohol/about-alcohol-use/index.html",
      },
      {
        label: "American Heart Association — Alcohol and heart health",
        url: "https://www.heart.org/en/health-topics/alcohol-and-heart-health",
      },
    ],
  },
  {
    teaser:
      "Alcohol is classified as a carcinogen; less drinking over the long run reduces ongoing exposure linked to breast, colorectal, and other alcohol-related cancers.",
    detail:
      "Ethanol metabolism produces acetaldehyde, which can damage DNA. Risk rises with average drinks per day and cumulative years of drinking. Quitting or cutting back doesn’t erase past exposure but lowers future dose—an evidence-based reason many guidelines emphasize lower intake or abstinence.",
    sources: [
      {
        label: "National Cancer Institute — Alcohol and cancer risk",
        url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/alcohol/alcohol-fact-sheet",
      },
      {
        label: "WHO — Alcohol (health risks including cancer)",
        url: "https://www.who.int/news-room/fact-sheets/detail/alcohol",
      },
    ],
  },
  {
    teaser:
      "The brain adapts to chronic drinking; with sustained abstinence, imaging and cognitive studies show partial recovery of structure and function—especially memory, attention, and processing speed—in many people.",
    detail:
      "Heavy alcohol use is associated with shrinkage in some brain regions and slower cognition. Abstinence allows remodeling and recovery that can continue for months to a year or more, though not everyone regains the same baseline. Thiamine deficiency and withdrawal complications are medical emergencies—seek care for confusion, severe tremor, or hallucinations.",
    sources: [
      {
        label: "NIAAA — Alcohol and the brain: an overview",
        url: "https://www.niaaa.nih.gov/publications/alcohol-and-brain-overview",
      },
      {
        label: "NIAAA — Alcohol and the brain (topic hub)",
        url: "https://www.niaaa.nih.gov/health-topics-alcohol-and-brain",
      },
    ],
  },
  {
    teaser:
      "Drinking suppresses immune responses and slows wound healing. Staying alcohol-free more often gives your immune system a steadier environment to do its job—especially alongside sleep, food, and vaccines your clinician recommends.",
    detail:
      "Alcohol disrupts innate and adaptive immunity and increases susceptibility to some infections in research models and population data. Cutting back reduces that burden. This isn’t a substitute for treatment of alcohol use disorder or other conditions—just one piece of the physiology picture.",
    sources: [
      {
        label: "NIAAA — Alcohol’s effects on the body (immune system)",
        url: "https://www.niaaa.nih.gov/alcohols-effects-health/alcohols-effects-body",
      },
      {
        label: "CDC — Alcohol use",
        url: "https://www.cdc.gov/alcohol/index.html",
      },
    ],
  },
];

const els = {
  setupPanel: document.getElementById("setup-panel"),
  setupProgress: document.getElementById("setup-progress"),
  setupStepNum: document.getElementById("setup-step-num"),
  setupStepTotal: document.getElementById("setup-step-total"),
  setupStepChoose: document.getElementById("setup-step-choose"),
  setupStepLastDrink: document.getElementById("setup-step-last-drink"),
  setupStepDaysSince: document.getElementById("setup-step-days-since"),
  setupStepNotYet: document.getElementById("setup-step-not-yet"),
  setupFormLastDrink: document.getElementById("setup-form-last-drink"),
  setupFormDaysSince: document.getElementById("setup-form-days-since"),
  startDate: document.getElementById("start-date"),
  startTime: document.getElementById("start-time"),
  daysSinceInput: document.getElementById("days-since-input"),
  setupFinishNotYet: document.getElementById("setup-finish-not-yet"),
  dashboard: document.getElementById("dashboard"),
  dashStreakBlock: document.getElementById("dash-streak-block"),
  dashIntentBlock: document.getElementById("dash-intent-block"),
  dashMilestoneCard: document.getElementById("dash-milestone-card"),
  days: document.getElementById("days"),
  hoursMins: document.getElementById("hours-mins"),
  sinceDisplay: document.getElementById("since-display"),
  quote: document.getElementById("quote"),
  quoteBy: document.getElementById("quote-by"),
  milestoneText: document.getElementById("milestone-text"),
  milestoneBar: document.getElementById("milestone-bar"),
  milestoneBarWrap: document.getElementById("milestone-bar-wrap"),
  checkinForm: document.getElementById("checkin-form"),
  checkinNote: document.getElementById("checkin-note"),
  checkinList: document.getElementById("checkin-list"),
  checkinTrendBlock: document.getElementById("checkin-trend-block"),
  checkinTrend: document.getElementById("checkin-trend"),
  checkinTrendLegend: document.getElementById("checkin-trend-legend"),
  moodCaption: document.getElementById("mood-caption"),
  energyCaption: document.getElementById("energy-caption"),
  emotionChips: document.getElementById("emotion-chips"),
  habitsSuggestedList: document.getElementById("habits-suggested-list"),
  habitCustomInput: document.getElementById("habit-custom-input"),
  habitCustomAdd: document.getElementById("habit-custom-add"),
  habitsCustomList: document.getElementById("habits-custom-list"),
  btnSettings: document.getElementById("btn-settings"),
  btnSlip: document.getElementById("btn-slip"),
  btnStartClockNow: document.getElementById("btn-start-clock-now"),
  btnChangeSetup: document.getElementById("btn-change-setup"),
  settingsModal: document.getElementById("settings-modal"),
  settingsForm: document.getElementById("settings-form"),
  settingsDate: document.getElementById("settings-date"),
  settingsTime: document.getElementById("settings-time"),
  settingsCancel: document.getElementById("settings-cancel"),
  btnExportData: document.getElementById("btn-export-data"),
  btnImportTrigger: document.getElementById("btn-import-trigger"),
  importFileInput: document.getElementById("import-file-input"),
  slipModal: document.getElementById("slip-modal"),
  slipForm: document.getElementById("slip-form"),
  slipDate: document.getElementById("slip-date"),
  slipTime: document.getElementById("slip-time"),
  slipCancel: document.getElementById("slip-cancel"),
  btnHeaderSettings: document.getElementById("btn-header-settings"),
  siteNav: document.getElementById("site-nav"),
  viewJournal: document.getElementById("view-journal"),
  journalScreenList: document.getElementById("journal-screen-list"),
  journalScreenCompose: document.getElementById("journal-screen-compose"),
  journalScreenRead: document.getElementById("journal-screen-read"),
  journalEntriesList: document.getElementById("journal-entries-list"),
  journalEmptyHint: document.getElementById("journal-empty-hint"),
  journalBackCompose: document.getElementById("journal-back-compose"),
  journalForm: document.getElementById("journal-form"),
  journalTitle: document.getElementById("journal-title"),
  journalBody: document.getElementById("journal-body"),
  journalLinkCheckin: document.getElementById("journal-link-checkin"),
  journalCheckinSelect: document.getElementById("journal-checkin-select"),
  journalCheckinField: document.getElementById("journal-checkin-field"),
  journalNoCheckinsHint: document.getElementById("journal-no-checkins-hint"),
  journalBackRead: document.getElementById("journal-back-read"),
  journalReadRoot: document.getElementById("journal-read-root"),
  viewResources: document.getElementById("view-resources"),
  resourcesCarouselsRoot: document.getElementById("resources-carousels-root"),
  resourcesResetDismissed: document.getElementById("resources-reset-dismissed"),
  resourcesAddForm: document.getElementById("resources-add-form"),
  resourcesAddTitle: document.getElementById("resources-add-title"),
  resourcesAddUrl: document.getElementById("resources-add-url"),
  resourcesMyList: document.getElementById("resources-my-list"),
  resourcesMyEmpty: document.getElementById("resources-my-empty"),
  resourcesFavoritesList: document.getElementById("resources-favorites-list"),
  resourcesFavEmpty: document.getElementById("resources-fav-empty"),
  healthTeaser: document.getElementById("health-teaser"),
  healthDetail: document.getElementById("health-detail"),
  healthSourcesList: document.getElementById("health-sources-list"),
  healthExpanded: document.getElementById("health-expanded"),
  healthLearnMore: document.getElementById("health-learn-more"),
};

const setupSteps = [
  els.setupStepChoose,
  els.setupStepLastDrink,
  els.setupStepDaysSince,
  els.setupStepNotYet,
];

function getTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function syncThemeRadios() {
  const dark = getTheme() === "dark";
  const lightEl = document.querySelector('input[name="settings-theme"][value="light"]');
  const darkEl = document.querySelector('input[name="settings-theme"][value="dark"]');
  if (lightEl) lightEl.checked = !dark;
  if (darkEl) darkEl.checked = dark;
}

function applyTheme(mode) {
  if (mode === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    try {
      localStorage.setItem(STORAGE_THEME, "dark");
    } catch (_) {}
  } else {
    document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(STORAGE_THEME, "light");
    } catch (_) {}
  }
  syncThemeRadios();
}

function initTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (stored === "light") {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (_) {}
  syncThemeRadios();
}

function openSettingsModal() {
  const start = loadStart();
  if (start) {
    primeSettingsFromDate(start);
  } else {
    primeSettingsFromDate(new Date());
  }
  syncThemeRadios();
  els.settingsModal.showModal();
}

if (els.btnHeaderSettings) {
  els.btnHeaderSettings.addEventListener("click", () => openSettingsModal());
}

els.settingsModal.addEventListener("change", (e) => {
  const t = e.target;
  if (t && t.getAttribute("name") === "settings-theme" && t.value) {
    applyTheme(t.value);
  }
});

function loadStart() {
  const raw = localStorage.getItem(STORAGE_START);
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isIntentOnly() {
  return localStorage.getItem(STORAGE_INTENT) === "1";
}

function setIntentOnly(on) {
  if (on) localStorage.setItem(STORAGE_INTENT, "1");
  else localStorage.removeItem(STORAGE_INTENT);
}

function saveStart(date) {
  localStorage.setItem(STORAGE_START, date.toISOString());
  setIntentOnly(false);
}

function clearTrackedStart() {
  localStorage.removeItem(STORAGE_START);
}

function normalizeCheckin(entry) {
  if (!entry || typeof entry.at !== "string") return null;
  if (typeof entry.mood === "number" && typeof entry.energy === "number") {
    return {
      at: entry.at,
      mood: Math.min(5, Math.max(1, Math.floor(entry.mood))),
      energy: Math.min(5, Math.max(1, Math.floor(entry.energy))),
      emotions: Array.isArray(entry.emotions) ? entry.emotions.filter((e) => typeof e === "string") : [],
      note: typeof entry.note === "string" ? entry.note : "",
    };
  }
  if (typeof entry.text === "string") {
    return {
      at: entry.at,
      mood: null,
      energy: null,
      emotions: [],
      note: entry.text,
      legacy: true,
    };
  }
  return null;
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_NOTES);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map(normalizeCheckin).filter(Boolean);
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes.slice(0, 60)));
}

function newJournalId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `j-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeJournalEntry(raw) {
  if (!raw || typeof raw.id !== "string" || typeof raw.at !== "string" || typeof raw.body !== "string") {
    return null;
  }
  return {
    id: raw.id,
    at: raw.at,
    title: typeof raw.title === "string" ? raw.title.slice(0, 120) : "",
    body: raw.body,
    checkinAt: typeof raw.checkinAt === "string" && raw.checkinAt.length ? raw.checkinAt : null,
  };
}

function loadJournal() {
  try {
    const raw = localStorage.getItem(STORAGE_JOURNAL);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map(normalizeJournalEntry).filter(Boolean);
  } catch {
    return [];
  }
}

function saveJournal(entries) {
  try {
    localStorage.setItem(STORAGE_JOURNAL, JSON.stringify(entries.slice(0, 200)));
  } catch (_) {}
}

const resourceCarouselIndex = { books: 0, podcasts: 0, virtual: 0, inperson: 0 };

function newResourceItemId() {
  return `r-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeResourceItem(raw) {
  if (!raw || typeof raw.id !== "string") return null;
  const title = typeof raw.title === "string" ? raw.title.trim().slice(0, 200) : "";
  if (!title) return null;
  const url = typeof raw.url === "string" ? raw.url.trim().slice(0, 500) : "";
  const fromCuratedId =
    typeof raw.fromCuratedId === "string" && raw.fromCuratedId.length ? raw.fromCuratedId : undefined;
  return {
    id: raw.id,
    title,
    url,
    done: Boolean(raw.done),
    favorite: Boolean(raw.favorite),
    fromCuratedId,
  };
}

function loadResourcesState() {
  try {
    const raw = localStorage.getItem(STORAGE_RESOURCES);
    if (!raw) return { dismissed: [], favoritedCurated: [], items: [] };
    const o = JSON.parse(raw);
    const dismissed = Array.isArray(o.dismissed) ? o.dismissed.filter((x) => typeof x === "string") : [];
    const favoritedCurated = Array.isArray(o.favoritedCurated)
      ? o.favoritedCurated.filter((x) => typeof x === "string")
      : [];
    const items = Array.isArray(o.items)
      ? o.items.map(normalizeResourceItem).filter(Boolean).slice(0, 150)
      : [];
    return {
      dismissed: [...new Set(dismissed)],
      favoritedCurated: [...new Set(favoritedCurated)],
      items,
    };
  } catch {
    return { dismissed: [], favoritedCurated: [], items: [] };
  }
}

function saveResourcesState(state) {
  try {
    localStorage.setItem(
      STORAGE_RESOURCES,
      JSON.stringify({
        dismissed: state.dismissed,
        favoritedCurated: state.favoritedCurated,
        items: state.items.slice(0, 150),
      }),
    );
  } catch (_) {}
}

function visibleCuratedForCategory(categoryKey, dismissed) {
  return CURATED_RESOURCES.filter((c) => c.category === categoryKey && !dismissed.includes(c.id));
}

function hasListEntryFromCurated(state, curatedId) {
  return state.items.some((i) => i.fromCuratedId === curatedId);
}

function renderResourcesCarousels(state) {
  els.resourcesCarouselsRoot.innerHTML = "";
  RESOURCE_CATEGORIES.forEach(({ key, label }) => {
    const visible = visibleCuratedForCategory(key, state.dismissed);
    const block = document.createElement("div");
    block.className = "resources-category-block card";

    const h2 = document.createElement("h2");
    h2.className = "card-title";
    h2.textContent = label;
    block.appendChild(h2);

    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "resources-carousel-empty";
      empty.textContent =
        "No suggestions in this category right now — you may have hidden them all, or try “Show hidden recommendations again” below.";
      block.appendChild(empty);
      els.resourcesCarouselsRoot.appendChild(block);
      return;
    }

    let idx = resourceCarouselIndex[key] || 0;
    idx = Math.max(0, Math.min(idx, visible.length - 1));
    resourceCarouselIndex[key] = idx;
    const item = visible[idx];

    const carousel = document.createElement("div");
    carousel.className = "resources-carousel";
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-roledescription", "carousel");
    carousel.setAttribute("aria-label", `${label} recommendations`);

    const viewport = document.createElement("div");
    viewport.className = "resources-carousel-viewport";

    const article = document.createElement("article");
    article.className = "resources-carousel-card";
    article.setAttribute("aria-live", "polite");

    const titleEl = document.createElement("h3");
    titleEl.className = "resources-carousel-title";
    if (item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      titleEl.appendChild(a);
    } else {
      titleEl.textContent = item.title;
    }
    article.appendChild(titleEl);

    const desc = document.createElement("p");
    desc.className = "resources-carousel-desc";
    desc.textContent = item.desc;
    article.appendChild(desc);

    viewport.appendChild(article);
    carousel.appendChild(viewport);

    const controls = document.createElement("div");
    controls.className = "resources-carousel-controls";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "btn btn-ghost resources-carousel-nav";
    prev.setAttribute("aria-label", "Previous recommendation");
    prev.textContent = "← Prev";
    prev.disabled = visible.length <= 1;
    prev.addEventListener("click", () => {
      resourceCarouselIndex[key] = (resourceCarouselIndex[key] + visible.length - 1) % visible.length;
      renderResourcesPage();
    });

    const status = document.createElement("span");
    status.className = "resources-carousel-status";
    status.textContent = `${idx + 1} / ${visible.length}`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "btn btn-ghost resources-carousel-nav";
    next.setAttribute("aria-label", "Next recommendation");
    next.textContent = "Next →";
    next.disabled = visible.length <= 1;
    next.addEventListener("click", () => {
      resourceCarouselIndex[key] = (resourceCarouselIndex[key] + 1) % visible.length;
      renderResourcesPage();
    });

    controls.append(prev, status, next);
    carousel.appendChild(controls);

    const actions = document.createElement("div");
    actions.className = "resources-carousel-actions";

    const onList = hasListEntryFromCurated(state, item.id);
    const thumbUp = document.createElement("button");
    thumbUp.type = "button";
    thumbUp.className = "btn btn-secondary res-thumb-btn";
    thumbUp.setAttribute("aria-label", onList ? "Already on your list" : "Add this pick to your list");
    thumbUp.disabled = onList;
    thumbUp.textContent = onList ? "✓ On your list" : "👍 Add to my list";
    thumbUp.addEventListener("click", () => {
      if (hasListEntryFromCurated(loadResourcesState(), item.id)) return;
      const s = loadResourcesState();
      s.items.push({
        id: newResourceItemId(),
        title: item.title,
        url: item.url || "",
        done: false,
        favorite: false,
        fromCuratedId: item.id,
      });
      saveResourcesState(s);
      renderResourcesPage();
    });

    const thumbDown = document.createElement("button");
    thumbDown.type = "button";
    thumbDown.className = "btn btn-ghost res-thumb-btn";
    thumbDown.setAttribute("aria-label", "Not for me — hide this recommendation");
    thumbDown.textContent = "👎 Not for me";
    thumbDown.addEventListener("click", () => {
      const s = loadResourcesState();
      if (!s.dismissed.includes(item.id)) s.dismissed.push(item.id);
      saveResourcesState(s);
      renderResourcesPage();
    });

    const isFav = state.favoritedCurated.includes(item.id);
    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "btn btn-ghost res-fav-toggle";
    favBtn.setAttribute("aria-pressed", isFav ? "true" : "false");
    favBtn.setAttribute("aria-label", isFav ? "Remove from favorites" : "Save to favorites");
    favBtn.textContent = isFav ? "★ Favorited" : "☆ Favorite";
    favBtn.addEventListener("click", () => {
      const s = loadResourcesState();
      if (s.favoritedCurated.includes(item.id)) {
        s.favoritedCurated = s.favoritedCurated.filter((id) => id !== item.id);
      } else {
        s.favoritedCurated = [...s.favoritedCurated, item.id];
      }
      saveResourcesState(s);
      renderResourcesPage();
    });

    actions.append(thumbUp, thumbDown, favBtn);
    carousel.appendChild(actions);

    block.appendChild(carousel);
    els.resourcesCarouselsRoot.appendChild(block);
  });
}

function renderResourcesMyList(state) {
  els.resourcesMyList.innerHTML = "";
  const open = state.items.filter((i) => !i.done);
  const done = state.items.filter((i) => i.done);
  const ordered = [...open, ...done];

  ordered.forEach((item) => {
    const li = document.createElement("li");
    li.className = "resources-my-item";
    if (item.done) li.classList.add("is-done");

    const row = document.createElement("div");
    row.className = "resources-my-item-row";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = item.done;
    check.setAttribute("aria-label", `Done: ${item.title}`);
    check.addEventListener("change", () => {
      const s = loadResourcesState();
      const it = s.items.find((x) => x.id === item.id);
      if (it) it.done = check.checked;
      saveResourcesState(s);
      renderResourcesPage();
    });

    const textWrap = document.createElement("div");
    textWrap.className = "resources-my-text";
    const titleSpan = document.createElement("span");
    titleSpan.className = "resources-my-title";
    if (item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      titleSpan.appendChild(a);
    } else {
      titleSpan.textContent = item.title;
    }
    textWrap.appendChild(titleSpan);
    if (item.fromCuratedId) {
      const src = document.createElement("span");
      src.className = "resources-my-source";
      src.textContent = "From recommendations";
      textWrap.appendChild(src);
    }
    row.append(check, textWrap);

    const itemActions = document.createElement("div");
    itemActions.className = "resources-my-actions";

    const favUser = document.createElement("button");
    favUser.type = "button";
    favUser.className = "btn btn-ghost res-fav-toggle res-fav-toggle--sm";
    favUser.setAttribute("aria-pressed", item.favorite ? "true" : "false");
    favUser.setAttribute("aria-label", item.favorite ? "Remove from favorites" : "Add to favorites");
    favUser.textContent = item.favorite ? "★" : "☆";
    favUser.addEventListener("click", () => {
      const s = loadResourcesState();
      const it = s.items.find((x) => x.id === item.id);
      if (it) it.favorite = !it.favorite;
      saveResourcesState(s);
      renderResourcesPage();
    });

    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "btn btn-text resources-my-remove";
    rm.textContent = "Remove";
    rm.addEventListener("click", () => {
      const s = loadResourcesState();
      s.items = s.items.filter((x) => x.id !== item.id);
      saveResourcesState(s);
      renderResourcesPage();
    });

    itemActions.append(favUser, rm);
    li.append(row, itemActions);
    els.resourcesMyList.appendChild(li);
  });

  els.resourcesMyEmpty.hidden = state.items.length > 0;
}

function categoryLabelForCuratedId(id) {
  const c = CURATED_BY_ID[id];
  if (!c) return "";
  const cat = RESOURCE_CATEGORIES.find((x) => x.key === c.category);
  return cat ? cat.label : "";
}

function renderResourcesFavorites(state) {
  els.resourcesFavoritesList.innerHTML = "";
  const curatedFavs = state.favoritedCurated
    .map((id) => {
      const c = CURATED_BY_ID[id];
      if (!c) return null;
      return { kind: "curated", id, item: c };
    })
    .filter(Boolean);

  const userFavs = state.items.filter((i) => i.favorite);

  const hasAny = curatedFavs.length > 0 || userFavs.length > 0;
  els.resourcesFavEmpty.hidden = hasAny;

  curatedFavs.forEach(({ id, item }) => {
    const li = document.createElement("li");
    li.className = "resources-fav-item";
    const lab = categoryLabelForCuratedId(id);
    const meta = document.createElement("span");
    meta.className = "resources-fav-meta";
    meta.textContent = lab;
    const linkWrap = document.createElement("div");
    linkWrap.className = "resources-fav-main";
    if (item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      linkWrap.appendChild(a);
    } else {
      linkWrap.textContent = item.title;
    }
    const unfav = document.createElement("button");
    unfav.type = "button";
    unfav.className = "btn btn-text resources-fav-unfav";
    unfav.textContent = "Unstar";
    unfav.addEventListener("click", () => {
      const s = loadResourcesState();
      s.favoritedCurated = s.favoritedCurated.filter((x) => x !== id);
      saveResourcesState(s);
      renderResourcesPage();
    });
    li.append(meta, linkWrap, unfav);
    els.resourcesFavoritesList.appendChild(li);
  });

  userFavs.forEach((item) => {
    const li = document.createElement("li");
    li.className = "resources-fav-item";
    const meta = document.createElement("span");
    meta.className = "resources-fav-meta";
    meta.textContent = "Your list";
    const linkWrap = document.createElement("div");
    linkWrap.className = "resources-fav-main";
    if (item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      linkWrap.appendChild(a);
    } else {
      linkWrap.textContent = item.title;
    }
    const unfav = document.createElement("button");
    unfav.type = "button";
    unfav.className = "btn btn-text resources-fav-unfav";
    unfav.textContent = "Unstar";
    unfav.addEventListener("click", () => {
      const s = loadResourcesState();
      const it = s.items.find((x) => x.id === item.id);
      if (it) it.favorite = false;
      saveResourcesState(s);
      renderResourcesPage();
    });
    li.append(meta, linkWrap, unfav);
    els.resourcesFavoritesList.appendChild(li);
  });
}

function renderResourcesPage() {
  if (!els.viewResources || els.viewResources.hidden) return;
  const state = loadResourcesState();
  renderResourcesCarousels(state);
  renderResourcesMyList(state);
  renderResourcesFavorites(state);
  els.resourcesResetDismissed.hidden = state.dismissed.length === 0;
}

function collectSteadyDataForExport() {
  const data = {};
  STEADY_EXPORT_KEYS.forEach((key) => {
    try {
      const v = localStorage.getItem(key);
      if (v !== null) data[key] = v;
    } catch (_) {}
  });
  return {
    steadyExportVersion: STEADY_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    app: "steady",
    data,
  };
}

function downloadSteadyBackup() {
  try {
    const payload = collectSteadyDataForExport();
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `steady-backup-${y}-${m}-${d}.json`;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    alert("Couldn’t create the backup file. Check that browser storage is available.");
  }
}

function parseSteadyImport(raw) {
  if (!raw || typeof raw !== "object") return null;
  if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) return raw;
  return null;
}

function applySteadyImport(pkg) {
  try {
    STEADY_EXPORT_KEYS.forEach((key) => {
      localStorage.removeItem(key);
    });
    Object.entries(pkg.data).forEach(([key, value]) => {
      if (STEADY_EXPORT_KEYS.includes(key) && typeof value === "string") {
        localStorage.setItem(key, value);
      }
    });
  } catch {
    alert("Couldn’t write restored data to storage.");
    return false;
  }
  return true;
}

async function handleImportFile(file) {
  if (!file) return;
  let text;
  try {
    text = await file.text();
  } catch {
    alert("Couldn’t read that file.");
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    alert("That file isn’t valid JSON.");
    return;
  }
  const pkg = parseSteadyImport(parsed);
  if (!pkg) {
    alert("This doesn’t look like a Steady backup (expected a “data” object).");
    return;
  }
  const keyCount = Object.keys(pkg.data).filter((k) => STEADY_EXPORT_KEYS.includes(k)).length;
  const msgEmpty =
    "This backup has no Steady data fields. Restore anyway? All current Steady data in this browser will be cleared.";
  const msgFull =
    "Restore this backup? This replaces all Steady data in this browser (streak, check-ins, journal, habits, resources, theme). The page will reload.";
  if (keyCount === 0) {
    if (!confirm(msgEmpty)) return;
  } else if (!confirm(msgFull)) {
    return;
  }
  if (applySteadyImport(pkg)) {
    location.reload();
  }
}

function findCheckinByAt(iso) {
  if (!iso) return null;
  return loadNotes().find((c) => c.at === iso) || null;
}

function buildCheckinSnapshotEl(checkin) {
  const box = document.createElement("div");
  box.className = "checkin-snapshot";
  const h = document.createElement("h2");
  h.className = "checkin-snapshot-title";
  h.textContent = "Check-in snapshot";
  box.appendChild(h);
  const dt = document.createElement("p");
  dt.className = "journal-read-date";
  dt.style.marginBottom = "0.75rem";
  dt.textContent = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(checkin.at));
  box.appendChild(dt);

  if (checkin.legacy) {
    const hint = document.createElement("p");
    hint.className = "checkin-snapshot-missing";
    hint.textContent = "Quick note from before guided check-ins.";
    box.appendChild(hint);
    if (checkin.note) {
      const p = document.createElement("p");
      p.className = "checkin-note-line";
      p.style.marginTop = "0.5rem";
      p.textContent = checkin.note;
      box.appendChild(p);
    }
    return box;
  }

  const meta = document.createElement("div");
  meta.className = "checkin-meta";
  const moodFace = MOOD_EMOJIS[checkin.mood - 1] || "";
  meta.innerHTML = `<span><span class="checkin-mood-emo" aria-hidden="true">${moodFace}</span>Mood <strong>${checkin.mood}</strong>/5</span><span class="checkin-energy-row">${energyBatterySvg(checkin.energy)}<span>Energy <strong>${checkin.energy}</strong>/5</span></span>`;
  box.appendChild(meta);
  if (checkin.emotions.length) {
    const tags = document.createElement("div");
    tags.className = "checkin-tags";
    checkin.emotions.forEach((id) => {
      const lab = EMOTION_BY_ID[id] || id;
      const t = document.createElement("span");
      t.className = "checkin-tag";
      t.textContent = lab;
      tags.appendChild(t);
    });
    box.appendChild(tags);
  }
  if (checkin.note.trim()) {
    const p = document.createElement("p");
    p.className = "checkin-note-line";
    p.textContent = checkin.note.trim();
    box.appendChild(p);
  }
  return box;
}

function isAppReady() {
  return loadStart() !== null || isIntentOnly();
}

function parseHash(hash) {
  const raw = (hash || "#/home").replace(/^#/, "").replace(/^\//, "");
  const parts = raw.split("/").filter(Boolean);
  if (parts.length === 0) return { view: "home" };
  if (parts[0] === "home") return { view: "home" };
  if (parts[0] === "resources") return { view: "resources" };
  if (parts[0] === "journal") {
    if (parts[1] === "new") return { view: "journal", sub: "new" };
    if (parts[1]) return { view: "journal", sub: "read", id: parts[1] };
    return { view: "journal", sub: "list" };
  }
  return { view: "home" };
}

function updateNavActive(view) {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const key = link.getAttribute("data-nav-link");
    link.classList.toggle("is-active", key === view);
  });
}

function healthFactDayIndex() {
  return Math.floor(Date.now() / 86400000) % HEALTH_FACTS.length;
}

function renderHealthFact() {
  const fact = HEALTH_FACTS[healthFactDayIndex()];
  els.healthTeaser.textContent = fact.teaser;
  els.healthDetail.textContent = fact.detail;
  els.healthSourcesList.innerHTML = "";
  fact.sources.forEach((s) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = s.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    li.appendChild(a);
    els.healthSourcesList.appendChild(li);
  });
  els.healthExpanded.hidden = true;
  els.healthLearnMore.setAttribute("aria-expanded", "false");
  els.healthLearnMore.textContent = "Learn more";
}

function refreshDashboardData() {
  renderQuote();
  renderHealthFact();
  renderCheckins();
  renderHabits();
}

function applyRoute() {
  if (!isAppReady()) return;
  const r = parseHash(location.hash);
  const navKey = r.view === "journal" ? "journal" : r.view === "resources" ? "resources" : "home";
  updateNavActive(navKey);

  if (r.view === "journal") {
    els.dashboard.hidden = true;
    els.viewResources.hidden = true;
    els.viewJournal.hidden = false;
    window.scrollTo(0, 0);
    if (r.sub === "new") {
      showJournalCompose();
    } else if (r.sub === "read" && r.id) {
      showJournalRead(r.id);
    } else {
      showJournalList();
    }
  } else if (r.view === "resources") {
    els.dashboard.hidden = true;
    els.viewJournal.hidden = true;
    els.viewResources.hidden = false;
    els.journalScreenList.hidden = false;
    els.journalScreenCompose.hidden = true;
    els.journalScreenRead.hidden = true;
    window.scrollTo(0, 0);
    renderResourcesPage();
  } else {
    els.viewJournal.hidden = true;
    els.viewResources.hidden = true;
    els.dashboard.hidden = false;
    els.journalScreenList.hidden = false;
    els.journalScreenCompose.hidden = true;
    els.journalScreenRead.hidden = true;
    window.scrollTo(0, 0);
  }
}

function enterAppShell() {
  els.setupPanel.hidden = true;
  els.siteNav.hidden = false;
  refreshDashboardData();
  applyRoute();
}

function populateJournalCheckinSelect() {
  const notes = loadNotes();
  els.journalCheckinSelect.innerHTML = "";
  notes.forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n.at;
    const dt = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(n.at));
    let label = dt;
    if (!n.legacy && typeof n.mood === "number") {
      const face = MOOD_EMOJIS[n.mood - 1] || "";
      label = `${dt} — ${face} mood ${n.mood}/5`;
    } else if (n.legacy) {
      label = `${dt} — quick note`;
    }
    opt.textContent = label;
    els.journalCheckinSelect.appendChild(opt);
  });
}

function syncJournalLinkUI() {
  const has = loadNotes().length > 0;
  els.journalNoCheckinsHint.hidden = has;
  els.journalLinkCheckin.disabled = !has;
  if (!has) {
    els.journalLinkCheckin.checked = false;
    els.journalCheckinField.hidden = true;
    return;
  }
  els.journalCheckinField.hidden = !els.journalLinkCheckin.checked;
}

function renderJournalList() {
  const entries = [...loadJournal()].sort((a, b) => new Date(b.at) - new Date(a.at));
  els.journalEntriesList.innerHTML = "";
  els.journalEmptyHint.hidden = entries.length > 0;
  entries.forEach((entry) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "journal-list-link";
    a.href = `#/journal/${entry.id}`;
    const title = document.createElement("p");
    title.className = "journal-list-title";
    title.textContent = entry.title.trim() || "Untitled entry";
    const meta = document.createElement("p");
    meta.className = "journal-list-meta";
    meta.append(
      document.createTextNode(
        new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(entry.at)),
      ),
    );
    if (entry.checkinAt) {
      const badge = document.createElement("span");
      badge.className = "journal-list-badge";
      badge.textContent = "Check-in";
      meta.appendChild(badge);
    }
    a.append(title, meta);
    li.appendChild(a);
    els.journalEntriesList.appendChild(li);
  });
}

function showJournalList() {
  els.journalScreenList.hidden = false;
  els.journalScreenCompose.hidden = true;
  els.journalScreenRead.hidden = true;
  renderJournalList();
}

function showJournalCompose() {
  els.journalScreenList.hidden = true;
  els.journalScreenCompose.hidden = false;
  els.journalScreenRead.hidden = true;
  els.journalTitle.value = "";
  els.journalBody.value = "";
  populateJournalCheckinSelect();
  const hasCheckins = loadNotes().length > 0;
  els.journalLinkCheckin.checked = hasCheckins;
  syncJournalLinkUI();
}

function showJournalRead(id) {
  els.journalScreenList.hidden = true;
  els.journalScreenCompose.hidden = true;
  els.journalScreenRead.hidden = false;
  els.journalReadRoot.innerHTML = "";
  const entry = loadJournal().find((e) => e.id === id);
  if (!entry) {
    const p = document.createElement("p");
    p.className = "checkin-snapshot-missing";
    p.textContent = "That entry couldn’t be found.";
    els.journalReadRoot.appendChild(p);
    return;
  }

  const titleEl = document.createElement("h1");
  titleEl.className = "journal-read-title";
  titleEl.textContent = entry.title.trim() || "Journal entry";
  const dateEl = document.createElement("p");
  dateEl.className = "journal-read-date";
  dateEl.textContent = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(entry.at));
  const bodyEl = document.createElement("div");
  bodyEl.className = "journal-read-body";
  bodyEl.textContent = entry.body;

  const actions = document.createElement("div");
  actions.className = "journal-read-actions";
  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "btn btn-text";
  delBtn.textContent = "Delete this entry";
  delBtn.addEventListener("click", () => {
    if (!confirm("Delete this journal entry? This can’t be undone.")) return;
    const next = loadJournal().filter((e) => e.id !== id);
    saveJournal(next);
    location.hash = "#/journal";
  });
  actions.appendChild(delBtn);

  els.journalReadRoot.append(titleEl, dateEl, bodyEl, actions);

  if (entry.checkinAt) {
    const linked = findCheckinByAt(entry.checkinAt);
    if (linked) {
      els.journalReadRoot.appendChild(buildCheckinSnapshotEl(linked));
    } else {
      const missing = document.createElement("div");
      missing.className = "checkin-snapshot";
      const mh = document.createElement("h2");
      mh.className = "checkin-snapshot-title";
      mh.textContent = "Linked check-in";
      const mp = document.createElement("p");
      mp.className = "checkin-snapshot-missing";
      mp.textContent =
        "This entry was linked to a check-in that’s no longer in your history (for example, if data was cleared).";
      missing.append(mh, mp);
      els.journalReadRoot.appendChild(missing);
    }
  }
}

function formatSince(date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function combineLocalDateTime(dateStr, timeStr) {
  const t = timeStr && timeStr.length ? timeStr : "00:00";
  const local = new Date(`${dateStr}T${t}:00`);
  return local;
}

function padTimePart(n) {
  return String(n).padStart(2, "0");
}

function primeSlipDefaults() {
  const now = new Date();
  const y = now.getFullYear();
  const m = padTimePart(now.getMonth() + 1);
  const d = padTimePart(now.getDate());
  els.slipDate.value = `${y}-${m}-${d}`;
  els.slipTime.value = `${padTimePart(now.getHours())}:${padTimePart(now.getMinutes())}`;
}

function primeLastDrinkInputs() {
  const now = new Date();
  const y = now.getFullYear();
  const m = padTimePart(now.getMonth() + 1);
  const d = padTimePart(now.getDate());
  const today = `${y}-${m}-${d}`;
  const timeNow = `${padTimePart(now.getHours())}:${padTimePart(now.getMinutes())}`;
  els.startDate.value = today;
  els.startTime.value = timeNow;
}

function primeSettingsFromDate(date) {
  const y = date.getFullYear();
  const mo = padTimePart(date.getMonth() + 1);
  const da = padTimePart(date.getDate());
  els.settingsDate.value = `${y}-${mo}-${da}`;
  els.settingsTime.value = `${padTimePart(date.getHours())}:${padTimePart(date.getMinutes())}`;
}

function startFromDaysSince(n) {
  const days = Math.max(0, Math.floor(Number(n)));
  if (days === 0) return new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return start;
}

function hideAllSetupSteps() {
  setupSteps.forEach((el) => {
    el.hidden = true;
  });
}

function goSetupStep1() {
  hideAllSetupSteps();
  els.setupStepChoose.hidden = false;
  els.setupStepNum.textContent = "1";
  els.setupProgress.hidden = false;
}

function goSetupStep2(path) {
  hideAllSetupSteps();
  if (path === "last-drink") {
    els.setupStepLastDrink.hidden = false;
    primeLastDrinkInputs();
  } else if (path === "days-since") {
    els.setupStepDaysSince.hidden = false;
    els.daysSinceInput.value = "0";
  } else if (path === "not-yet") {
    els.setupStepNotYet.hidden = false;
  }
  els.setupStepNum.textContent = "2";
}

function resetSetupWizard() {
  goSetupStep1();
}

function msSinceStart(start) {
  return Math.max(0, Date.now() - start.getTime());
}

function streakParts(ms) {
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const rem = sec % 86400;
  const hours = Math.floor(rem / 3600);
  const minutes = Math.floor((rem % 3600) / 60);
  return { days, hours, minutes };
}

function nextMilestone(days) {
  for (const m of MILESTONES) {
    if (days < m) return m;
  }
  const last = MILESTONES[MILESTONES.length - 1];
  return last + Math.ceil((days - last + 1) / 365) * 365;
}

function prevMilestone(days) {
  let prev = 0;
  for (const m of MILESTONES) {
    if (days >= m) prev = m;
    else break;
  }
  return prev;
}

function pickQuote() {
  const idx = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[idx];
}

function renderQuote() {
  const q = pickQuote();
  els.quote.textContent = `“${q.text}”`;
  els.quoteBy.textContent = q.by ? `— ${q.by}` : "";
}

function renderMoodTrend() {
  const withMood = loadNotes().filter((c) => typeof c.mood === "number");
  if (withMood.length < 2) {
    els.checkinTrendBlock.hidden = true;
    return;
  }
  els.checkinTrendBlock.hidden = false;
  const slice = withMood.slice(0, 14).reverse();
  els.checkinTrend.innerHTML = "";
  slice.forEach((c) => {
    const div = document.createElement("div");
    div.className = "trend-cell";
    div.setAttribute("data-level", String(c.mood));
    div.style.height = `${18 + c.mood * 8}px`;
    div.title = `${new Intl.DateTimeFormat(undefined, { dateStyle: "short", timeStyle: "short" }).format(new Date(c.at))} · mood ${c.mood}`;
    els.checkinTrend.appendChild(div);
  });
  els.checkinTrendLegend.textContent =
    "Each bar is one check-in — height reflects mood (older ← → newer).";
}

function renderCheckins() {
  const notes = loadNotes();
  els.checkinList.innerHTML = "";
  notes.slice(0, 12).forEach((n) => {
    const li = document.createElement("li");
    const dateEl = document.createElement("span");
    dateEl.className = "checkin-date";
    dateEl.textContent = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(n.at));
    li.appendChild(dateEl);

    if (n.legacy) {
      const meta = document.createElement("div");
      meta.className = "checkin-meta";
      meta.textContent = "Quick note (saved before guided check-in)";
      li.appendChild(meta);
      if (n.note) {
        const p = document.createElement("p");
        p.className = "checkin-note-line";
        p.textContent = n.note;
        li.appendChild(p);
      }
    } else {
      const meta = document.createElement("div");
      meta.className = "checkin-meta";
      const moodFace = MOOD_EMOJIS[n.mood - 1] || "";
      meta.innerHTML = `<span><span class="checkin-mood-emo" aria-hidden="true">${moodFace}</span>Mood <strong>${n.mood}</strong>/5</span><span class="checkin-energy-row">${energyBatterySvg(n.energy)}<span>Energy <strong>${n.energy}</strong>/5</span></span>`;
      li.appendChild(meta);
      if (n.emotions.length) {
        const tags = document.createElement("div");
        tags.className = "checkin-tags";
        n.emotions.forEach((id) => {
          const lab = EMOTION_BY_ID[id] || id;
          const t = document.createElement("span");
          t.className = "checkin-tag";
          t.textContent = lab;
          tags.appendChild(t);
        });
        li.appendChild(tags);
      }
      if (n.note.trim()) {
        const p = document.createElement("p");
        p.className = "checkin-note-line";
        p.textContent = n.note.trim();
        li.appendChild(p);
      }
    }
    els.checkinList.appendChild(li);
  });
  renderMoodTrend();
}

function loadHabitsState() {
  try {
    const raw = localStorage.getItem(STORAGE_HABITS);
    if (!raw) return { suggestedOn: [], custom: [] };
    const o = JSON.parse(raw);
    const suggestedOn = Array.isArray(o.suggestedOn) ? o.suggestedOn.filter((x) => typeof x === "string") : [];
    const custom = Array.isArray(o.custom)
      ? o.custom
          .map((x) => String(x).trim())
          .filter(Boolean)
          .slice(0, 30)
      : [];
    return { suggestedOn: [...new Set(suggestedOn)], custom: [...new Set(custom)] };
  } catch {
    return { suggestedOn: [], custom: [] };
  }
}

function saveHabitsState(state) {
  try {
    localStorage.setItem(
      STORAGE_HABITS,
      JSON.stringify({
        suggestedOn: state.suggestedOn,
        custom: state.custom.slice(0, 30),
      }),
    );
  } catch (_) {}
}

function renderHabits() {
  const state = loadHabitsState();
  els.habitsSuggestedList.innerHTML = "";
  SUGGESTED_HABITS.forEach((h) => {
    const on = state.suggestedOn.includes(h.id);
    const li = document.createElement("li");
    li.className = "habit-suggested-item";
    const top = document.createElement("div");
    top.className = "habit-suggested-top";
    const textWrap = document.createElement("div");
    const title = document.createElement("p");
    title.className = "habit-suggested-title";
    title.textContent = h.title;
    const desc = document.createElement("p");
    desc.className = "habit-suggested-desc";
    desc.textContent = h.desc;
    textWrap.append(title, desc);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "habit-toggle";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.textContent = on ? "On your list" : "Try this";
    btn.addEventListener("click", () => {
      const s = loadHabitsState();
      if (s.suggestedOn.includes(h.id)) {
        s.suggestedOn = s.suggestedOn.filter((id) => id !== h.id);
      } else {
        s.suggestedOn = [...s.suggestedOn, h.id];
      }
      saveHabitsState(s);
      renderHabits();
    });
    top.append(textWrap, btn);
    li.appendChild(top);
    els.habitsSuggestedList.appendChild(li);
  });

  els.habitsCustomList.innerHTML = "";
  state.custom.forEach((line) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = line;
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "habit-remove";
    rm.textContent = "Remove";
    rm.addEventListener("click", () => {
      const s = loadHabitsState();
      s.custom = s.custom.filter((c) => c !== line);
      saveHabitsState(s);
      renderHabits();
    });
    li.append(span, rm);
    els.habitsCustomList.appendChild(li);
  });
}

function buildEmotionChips() {
  els.emotionChips.innerHTML = "";
  EMOTIONS.forEach(({ id, label }) => {
    const labEl = document.createElement("label");
    labEl.className = "emotion-chip";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "checkin-emotion";
    input.value = id;
    const span = document.createElement("span");
    span.textContent = label;
    labEl.append(input, span);
    els.emotionChips.appendChild(labEl);
  });
}

function bindScaleCaptions() {
  const updateMood = () => {
    const el = document.querySelector('input[name="checkin-mood"]:checked');
    const v = el ? Number(el.value) : 3;
    els.moodCaption.textContent = MOOD_CAPTIONS[v - 1] || MOOD_CAPTIONS[2];
  };
  const updateEnergy = () => {
    const el = document.querySelector('input[name="checkin-energy"]:checked');
    const v = el ? Number(el.value) : 3;
    els.energyCaption.textContent = ENERGY_CAPTIONS[v - 1] || ENERGY_CAPTIONS[2];
  };
  document.querySelectorAll('input[name="checkin-mood"]').forEach((r) => {
    r.addEventListener("change", updateMood);
  });
  document.querySelectorAll('input[name="checkin-energy"]').forEach((r) => {
    r.addEventListener("change", updateEnergy);
  });
  updateMood();
  updateEnergy();
}

function resetCheckinForm() {
  const m3 = document.querySelector('input[name="checkin-mood"][value="3"]');
  const e3 = document.querySelector('input[name="checkin-energy"][value="3"]');
  if (m3) m3.checked = true;
  if (e3) e3.checked = true;
  document.querySelectorAll('input[name="checkin-emotion"]').forEach((cb) => {
    cb.checked = false;
  });
  els.checkinNote.value = "";
  els.moodCaption.textContent = MOOD_CAPTIONS[2];
  els.energyCaption.textContent = ENERGY_CAPTIONS[2];
}

let tickTimer = null;

function updateDashboard(start) {
  const ms = msSinceStart(start);
  const { days, hours, minutes } = streakParts(ms);
  els.days.textContent = String(days);
  els.hoursMins.textContent = `${hours}h ${minutes}m`;
  els.sinceDisplay.textContent = formatSince(start);

  const next = nextMilestone(days);
  const prev = prevMilestone(days);
  els.milestoneText.textContent =
    days >= MILESTONES[MILESTONES.length - 1]
      ? `You’ve passed ${prev} days. Next ring: ${next} days.`
      : `Day ${next} — you’re building toward it.`;

  let pct = 0;
  if (next > prev) {
    const span = next - prev;
    const elapsed = Math.max(0, days - prev);
    pct = Math.min(100, Math.round((elapsed / span) * 100));
  } else {
    pct = 100;
  }
  els.milestoneBar.style.width = `${pct}%`;
  els.milestoneBarWrap.setAttribute("aria-valuenow", String(pct));
}

function startTicking(start) {
  if (tickTimer) clearInterval(tickTimer);
  updateDashboard(start);
  tickTimer = setInterval(() => updateDashboard(start), 60_000);
}

function stopTicking() {
  if (tickTimer) {
    clearInterval(tickTimer);
    tickTimer = null;
  }
}

function showSetup() {
  els.setupPanel.hidden = false;
  els.dashboard.hidden = true;
  els.viewJournal.hidden = true;
  if (els.viewResources) els.viewResources.hidden = true;
  els.siteNav.hidden = true;
  stopTicking();
  resetSetupWizard();
  primeLastDrinkInputs();
  primeSlipDefaults();
}

function showDashboardTracked(start) {
  enterAppShell();
  els.dashStreakBlock.hidden = false;
  els.dashIntentBlock.hidden = true;
  els.dashMilestoneCard.hidden = false;
  els.btnSlip.hidden = false;
  startTicking(start);
}

function showDashboardPreparing() {
  enterAppShell();
  els.dashStreakBlock.hidden = true;
  els.dashIntentBlock.hidden = false;
  els.dashMilestoneCard.hidden = true;
  els.btnSlip.hidden = true;
  stopTicking();
}

document.querySelectorAll("[data-setup-path]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const path = btn.getAttribute("data-setup-path");
    goSetupStep2(path);
  });
});

document.getElementById("setup-back-last-drink").addEventListener("click", goSetupStep1);
document.getElementById("setup-back-days-since").addEventListener("click", goSetupStep1);
document.getElementById("setup-back-not-yet").addEventListener("click", goSetupStep1);

els.setupFormLastDrink.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateStr = els.startDate.value;
  if (!dateStr) return;
  const start = combineLocalDateTime(dateStr, els.startTime.value);
  if (start.getTime() > Date.now()) {
    alert("That date and time can’t be in the future.");
    return;
  }
  saveStart(start);
  showDashboardTracked(start);
});

els.setupFormDaysSince.addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = els.daysSinceInput.value;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) {
    alert("Enter zero or a positive number of days.");
    return;
  }
  const start = startFromDaysSince(n);
  if (start.getTime() > Date.now()) {
    alert("Something went wrong with that number — try again.");
    return;
  }
  saveStart(start);
  showDashboardTracked(start);
});

els.setupFinishNotYet.addEventListener("click", () => {
  clearTrackedStart();
  setIntentOnly(true);
  showDashboardPreparing();
});

els.btnStartClockNow.addEventListener("click", () => {
  const start = new Date();
  saveStart(start);
  showDashboardTracked(start);
});

els.btnChangeSetup.addEventListener("click", () => {
  setIntentOnly(false);
  clearTrackedStart();
  showSetup();
});

els.checkinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const moodEl = document.querySelector('input[name="checkin-mood"]:checked');
  const energyEl = document.querySelector('input[name="checkin-energy"]:checked');
  const mood = moodEl ? Number(moodEl.value) : 3;
  const energy = energyEl ? Number(energyEl.value) : 3;
  const emotions = [...document.querySelectorAll('input[name="checkin-emotion"]:checked')].map((i) => i.value);
  const note = els.checkinNote.value.trim();
  const notes = loadNotes();
  notes.unshift({
    at: new Date().toISOString(),
    mood,
    energy,
    emotions,
    note,
  });
  saveNotes(notes);
  resetCheckinForm();
  renderCheckins();
});

els.habitCustomAdd.addEventListener("click", () => {
  const t = els.habitCustomInput.value.trim().slice(0, 120);
  if (!t) return;
  const s = loadHabitsState();
  if (s.custom.includes(t)) {
    els.habitCustomInput.value = "";
    return;
  }
  if (s.custom.length >= 30) return;
  s.custom.unshift(t);
  saveHabitsState(s);
  els.habitCustomInput.value = "";
  renderHabits();
});

els.habitCustomInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    els.habitCustomAdd.click();
  }
});

els.journalBackCompose.addEventListener("click", () => {
  location.hash = "#/journal";
});

els.journalBackRead.addEventListener("click", () => {
  location.hash = "#/journal";
});

els.journalLinkCheckin.addEventListener("change", syncJournalLinkUI);

els.healthLearnMore.addEventListener("click", () => {
  const willOpen = els.healthExpanded.hidden;
  els.healthExpanded.hidden = !willOpen;
  els.healthLearnMore.setAttribute("aria-expanded", willOpen ? "true" : "false");
  els.healthLearnMore.textContent = willOpen ? "Show less" : "Learn more";
});

els.journalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = els.journalTitle.value.trim().slice(0, 120);
  const body = els.journalBody.value.trim();
  if (!body) return;
  let checkinAt = null;
  if (els.journalLinkCheckin.checked && els.journalCheckinSelect.options.length > 0) {
    checkinAt = els.journalCheckinSelect.value;
  }
  const list = loadJournal();
  list.unshift({
    id: newJournalId(),
    at: new Date().toISOString(),
    title,
    body,
    checkinAt,
  });
  saveJournal(list);
  location.hash = "#/journal";
});

els.btnSettings.addEventListener("click", () => openSettingsModal());

els.settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateStr = els.settingsDate.value;
  const start = combineLocalDateTime(dateStr, els.settingsTime.value);
  if (start.getTime() > Date.now()) {
    alert("Start time can’t be in the future.");
    return;
  }
  saveStart(start);
  els.settingsModal.close();
  showDashboardTracked(start);
});

els.settingsCancel.addEventListener("click", () => els.settingsModal.close());

els.btnExportData.addEventListener("click", () => downloadSteadyBackup());

els.btnImportTrigger.addEventListener("click", () => els.importFileInput.click());

els.importFileInput.addEventListener("change", () => {
  const f = els.importFileInput.files && els.importFileInput.files[0];
  els.importFileInput.value = "";
  if (f) handleImportFile(f);
});

if (els.resourcesAddForm) {
  els.resourcesAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = els.resourcesAddTitle.value.trim();
    const url = els.resourcesAddUrl.value.trim();
    if (!title) return;
    const s = loadResourcesState();
    s.items.push({
      id: newResourceItemId(),
      title: title.slice(0, 200),
      url: url.slice(0, 500),
      done: false,
      favorite: false,
    });
    saveResourcesState(s);
    els.resourcesAddTitle.value = "";
    els.resourcesAddUrl.value = "";
    renderResourcesPage();
  });
}

if (els.resourcesResetDismissed) {
  els.resourcesResetDismissed.addEventListener("click", () => {
    const s = loadResourcesState();
    s.dismissed = [];
    saveResourcesState(s);
    renderResourcesPage();
  });
}

els.btnSlip.addEventListener("click", () => {
  primeSlipDefaults();
  els.slipModal.showModal();
});

els.slipCancel.addEventListener("click", () => els.slipModal.close());

els.slipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateStr = els.slipDate.value;
  const start = combineLocalDateTime(dateStr, els.slipTime.value);
  if (start.getTime() > Date.now()) {
    alert("Start time can’t be in the future.");
    return;
  }
  saveStart(start);
  els.slipModal.close();
  showDashboardTracked(start);
  renderQuote();
});

function init() {
  initTheme();
  buildEmotionChips();
  bindScaleCaptions();
  els.setupStepTotal.textContent = "2";
  primeSlipDefaults();
  window.addEventListener("hashchange", () => {
    if (!isAppReady()) return;
    applyRoute();
  });

  const start = loadStart();
  if (start) {
    if (location.hash === "") {
      history.replaceState(null, "", `${location.pathname}${location.search}#/home`);
    }
    showDashboardTracked(start);
  } else if (isIntentOnly()) {
    if (location.hash === "") {
      history.replaceState(null, "", `${location.pathname}${location.search}#/home`);
    }
    showDashboardPreparing();
  } else {
    showSetup();
  }
}

init();
