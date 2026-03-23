const STORAGE_START = "steady_sobriety_start_iso";
const STORAGE_NOTES = "steady_checkins";
const STORAGE_INTENT = "steady_intent_only";
const STORAGE_THEME = "steady_theme";
const STORAGE_HABITS = "steady_habits";
const STORAGE_JOURNAL = "steady_journal";
const STORAGE_RESOURCES = "steady_resources";
const STORAGE_HABIT_DAY_LOGS = "steady_habit_day_logs";
const STORAGE_HABIT_ACTIVITY_HISTORY = "steady_habit_activity_history";

const STEADY_EXPORT_KEYS = [
  STORAGE_START,
  STORAGE_NOTES,
  STORAGE_INTENT,
  STORAGE_THEME,
  STORAGE_HABITS,
  STORAGE_JOURNAL,
  STORAGE_RESOURCES,
  STORAGE_HABIT_DAY_LOGS,
  STORAGE_HABIT_ACTIVITY_HISTORY,
];

/** Journal entry title used when syncing habit logs from the Habits page. */
const JOURNAL_TITLE_HABITS_SYNC = "Habits";

/** `#/journal/<slug>` list anchors — must not collide with entry ids (use `section/` if needed). */
const JOURNAL_LIST_SECTION_BY_SLUG = {
  writing: "journal-section-writing",
  mood: "journal-section-mood",
  habits: "journal-section-habits",
};

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
    url: "https://a.co/d/0ezgLyy5",
  },
  {
    id: "cb-alcohol-explained",
    category: "books",
    title: "Alcohol Explained",
    desc: "William Porter breaks down what alcohol does in the body and why cravings and habits form — clear and practical.",
    url: "https://a.co/d/0d46hS50",
  },
  {
    id: "cb-quit-like-woman",
    category: "books",
    title: "Quit Like a Woman",
    desc: "Holly Whitaker’s memoir-meets-manifesto on culture, marketing, and choosing sobriety on your own terms.",
    url: "https://a.co/d/06CW224W",
  },
  {
    id: "cb-unexpected-joy",
    category: "books",
    title: "The Unexpected Joy of Being Sober",
    desc: "Catherine Gray’s warm, funny account of early sobriety and what changed when she stopped drinking.",
    url: "https://a.co/d/08nh7yBy",
  },
  {
    id: "cp-recovery-elevator",
    category: "podcasts",
    title: "Recovery Elevator",
    desc: "Interviews and stories from people in recovery — community-focused, many episodes on alcohol specifically.",
    url: "https://open.spotify.com/show/51g2uQIwCFuJ2igFSWxn0P?si=397442a5708b4200",
  },
  {
    id: "cp-sober-awkward",
    category: "podcasts",
    title: "Sober Awkward",
    desc: "Two hosts talk social life, dating, and confidence without alcohol — light and relatable.",
    url: "https://open.spotify.com/show/4qXlSc9lDGStYLeYIjrWPH?si=297e560dc28a449c",
  },
  {
    id: "cp-bubble-hour",
    category: "podcasts",
    title: "The Bubble Hour",
    desc: "Conversations on sobriety, mental health, and recovery from Jean McCarthy and guests.",
    url: "https://open.spotify.com/show/4lfVy2RxM9oighai9YcebX?si=46b02e0bbcc24091",
  },
  {
    id: "cp-love-sobriety",
    category: "podcasts",
    title: "Love Sober",
    desc: "Kate Baily and Mandy Manners explore sober living, parenting, and midlife without the wine culture script.",
    url: "https://open.spotify.com/show/2dtOPIAy9m0WKVJgiUhmRU?si=78879dac73844482",
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

const SUGGESTED_HABIT_BY_ID = Object.fromEntries(SUGGESTED_HABITS.map((h) => [h.id, h]));

/** Compact habit tracker row (emoji only — keep light). */
const HABIT_LOG_EMOJI = {
  movement: "🚶",
  "alt-drink": "🥤",
  "self-reward": "✨",
  sleep: "🌙",
  connect: "💬",
  "urge-plan": "⏱️",
  custom: "✏️",
};

function habitLogEmojiForItem(item) {
  if (item.kind === "custom") return HABIT_LOG_EMOJI.custom;
  return HABIT_LOG_EMOJI[item.id] || "✓";
}

/** Quick-pick activities for datalist; users can always type something else. */
const HABIT_ACTIVITY_PRESETS = {
  movement: [
    "Walk",
    "Run or jog",
    "Strength training",
    "Stretch or yoga",
    "Bike ride",
    "Swim",
    "Dance",
    "Active chores",
  ],
  "alt-drink": ["Herbal tea", "Sparkling water", "Juice", "Coffee", "Soda", "Mocktail", "Iced drink"],
  "self-reward": ["Named the win", "Journaled", "Small treat (non-alcohol)", "Extra rest", "Praised myself quietly"],
  sleep: ["Earlier bedtime", "Dimmed screens", "Wind-down routine", "Cool dark room", "Consistent wake time"],
  connect: ["Text", "Phone call", "Video chat", "In-person visit", "Support meeting", "Voice message"],
  "urge-plan": ["Stepped outside", "Deep breathing", "Made a non-alcohol drink", "Messaged someone", "Moved my body", "Cold water on face"],
};

/** Second field for sleep / reward / connect / urge-plan rows, keyed by exact preset activity text. */
const HABIT_SECONDARY_BY_ACTIVITY = {
  sleep: {
    "Earlier bedtime": { type: "minutes", label: "Minutes earlier than usual" },
    "Dimmed screens": { type: "text", label: "What you changed", optional: true },
    "Wind-down routine": { type: "text", label: "What you did", optional: false },
    "Cool dark room": { type: "text", label: "Notes", optional: true },
    "Consistent wake time": { type: "text", label: "Wake-time note", optional: true },
    __default: { type: "minutes", label: "Minutes" },
  },
  "self-reward": {
    "Named the win": { type: "text", label: "What you named", optional: true },
    Journaled: { type: "minutes", label: "Minutes writing" },
    "Small treat (non-alcohol)": { type: "text", label: "What treat", optional: true },
    "Extra rest": { type: "minutes", label: "Extra rest (minutes)" },
    "Praised myself quietly": { type: "text", label: "Note", optional: true },
    __default: { type: "minutes", label: "Minutes" },
  },
  connect: {
    Text: { type: "text", label: "Message notes", optional: true },
    "Phone call": { type: "minutes", label: "Call length (minutes)" },
    "Video chat": { type: "minutes", label: "Minutes" },
    "In-person visit": { type: "minutes", label: "Time together (minutes)" },
    "Support meeting": { type: "minutes", label: "Meeting length (minutes)" },
    "Voice message": { type: "text", label: "Topic", optional: true },
    __default: { type: "minutes", label: "Minutes" },
  },
  "urge-plan": {
    "Stepped outside": { type: "minutes", label: "Minutes outside" },
    "Deep breathing": { type: "minutes", label: "Minutes" },
    "Made a non-alcohol drink": { type: "text", label: "What you made", optional: true },
    "Messaged someone": { type: "text", label: "Who / what", optional: true },
    "Moved my body": { type: "minutes", label: "Minutes" },
    "Cold water on face": { type: "text", label: "Note", optional: true },
    __default: { type: "minutes", label: "Minutes" },
  },
};

const HABIT_DYNAMIC_IDS = ["sleep", "self-reward", "connect", "urge-plan"];

const HABIT_HISTORY_CAP = 28;
const HABIT_LOG_MAX_PER_DAY = 48;
const HABIT_LOG_MAX_ENTRIES_PER_HABIT = 12;

function getHabitSecondarySpec(habitId, activityTrimmed) {
  const map = HABIT_SECONDARY_BY_ACTIVITY[habitId];
  if (!map) return null;
  const a = (activityTrimmed || "").trim();
  if (a && map[a]) return map[a];
  return map.__default;
}

function loadHabitActivityHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_HABIT_ACTIVITY_HISTORY);
    if (!raw) return {};
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object" || Array.isArray(o)) return {};
    const out = {};
    Object.entries(o).forEach(([k, v]) => {
      if (typeof k !== "string" || k.length > 120 || !Array.isArray(v)) return;
      out[k] = v
        .map((x) => String(x).trim())
        .filter(Boolean)
        .slice(0, HABIT_HISTORY_CAP);
    });
    return out;
  } catch {
    return {};
  }
}

function saveHabitActivityHistory(data) {
  try {
    localStorage.setItem(STORAGE_HABIT_ACTIVITY_HISTORY, JSON.stringify(data));
  } catch (_) {}
}

function mergedActivityOptions(habitId) {
  const presets = HABIT_ACTIVITY_PRESETS[habitId] || [];
  const hist = loadHabitActivityHistory()[habitId] || [];
  const seen = new Set();
  const out = [];
  hist.forEach((h) => {
    if (h && !seen.has(h)) {
      seen.add(h);
      out.push(h);
    }
  });
  presets.forEach((p) => {
    if (!seen.has(p)) {
      seen.add(p);
      out.push(p);
    }
  });
  return out;
}

function rememberHabitActivitiesFromLogs(logs) {
  if (!logs || !logs.length) return;
  const all = loadHabitActivityHistory();
  let changed = false;
  logs.forEach((log) => {
    if (log.habitKind !== "suggested" || !log.activity) return;
    const hid = log.habitId;
    if (!HABIT_ACTIVITY_PRESETS[hid]) return;
    const list = Array.isArray(all[hid]) ? [...all[hid]] : [];
    const a = log.activity.trim();
    const next = [a, ...list.filter((x) => x !== a)].slice(0, HABIT_HISTORY_CAP);
    if (JSON.stringify(next) !== JSON.stringify(list)) {
      all[hid] = next;
      changed = true;
    }
  });
  if (changed) saveHabitActivityHistory(all);
}

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
  streakCarouselWrap: document.getElementById("streak-carousel-wrap"),
  streakCarouselTrack: document.getElementById("streak-carousel-track"),
  streakCarouselPrev: document.getElementById("streak-carousel-prev"),
  streakCarouselNext: document.getElementById("streak-carousel-next"),
  streakSlide0: document.getElementById("streak-slide-0"),
  streakSlide1: document.getElementById("streak-slide-1"),
  streakAltHours: document.getElementById("streak-alt-hours"),
  streakAltBreakdown: document.getElementById("streak-alt-breakdown"),
  streakDayDots: document.getElementById("streak-day-dots"),
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
  milestoneTargetNum: document.getElementById("milestone-target-num"),
  milestonePctNote: document.getElementById("milestone-pct-note"),
  smartInsightsBody: document.getElementById("smart-insights-body"),
  checkinForm: document.getElementById("checkin-form"),
  checkinNote: document.getElementById("checkin-note"),
  moodCaption: document.getElementById("mood-caption"),
  energyCaption: document.getElementById("energy-caption"),
  emotionChips: document.getElementById("emotion-chips"),
  habitLogFieldset: document.getElementById("habit-log-fieldset"),
  habitLogRows: document.getElementById("habit-log-rows"),
  habitsLogDate: document.getElementById("habits-log-date"),
  habitsLogPrevDay: document.getElementById("habits-log-prev-day"),
  habitsLogNextDay: document.getElementById("habits-log-next-day"),
  habitsLogToday: document.getElementById("habits-log-today"),
  habitsSuggestedList: document.getElementById("habits-suggested-list"),
  habitCustomInput: document.getElementById("habit-custom-input"),
  habitCustomAdd: document.getElementById("habit-custom-add"),
  habitsCustomList: document.getElementById("habits-custom-list"),
  habitsExploreToggle: document.getElementById("habits-explore-toggle"),
  habitsExploreExpanded: document.getElementById("habits-explore-expanded"),
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
  viewHabits: document.getElementById("view-habits"),
  viewInsights: document.getElementById("view-insights"),
  viewJournal: document.getElementById("view-journal"),
  journalScreenList: document.getElementById("journal-screen-list"),
  journalScreenCompose: document.getElementById("journal-screen-compose"),
  journalScreenRead: document.getElementById("journal-screen-read"),
  journalEntriesList: document.getElementById("journal-entries-list"),
  journalCheckinsList: document.getElementById("journal-checkins-list"),
  journalHabitsEntriesList: document.getElementById("journal-habits-entries-list"),
  journalEmptyHint: document.getElementById("journal-empty-hint"),
  journalHabitsEmptyHint: document.getElementById("journal-habits-empty-hint"),
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
  resourcesSideNav: document.getElementById("resources-side-nav"),
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

function normalizeHabitLogEntry(x) {
  if (!x || typeof x !== "object") return null;
  const kind = x.habitKind === "custom" ? "custom" : "suggested";
  const habitId = typeof x.habitId === "string" ? x.habitId.trim().slice(0, 120) : "";
  if (!habitId) return null;
  const habitLabel = typeof x.habitLabel === "string" ? x.habitLabel.trim().slice(0, 120) : "";
  const activity = typeof x.activity === "string" ? x.activity.trim().slice(0, 120) : "";
  if (!activity) return null;

  const details = typeof x.details === "string" ? x.details.trim().slice(0, 200) : "";

  let minutes = null;
  if (x.minutes !== undefined && x.minutes !== null && x.minutes !== "") {
    const n = Number(x.minutes);
    if (Number.isFinite(n)) minutes = Math.min(999, Math.max(1, Math.floor(n)));
  }

  if (kind === "custom") {
    if (minutes === null) return null;
    const out = { habitKind: "custom", habitId, habitLabel, activity, minutes };
    if (details) out.details = details;
    return out;
  }

  if (habitId === "alt-drink") {
    const out = {
      habitKind: "suggested",
      habitId,
      habitLabel,
      activity,
      minutes: null,
    };
    if (details) out.details = details;
    return out;
  }

  if (habitId === "movement") {
    if (minutes === null) return null;
    const out = { habitKind: "suggested", habitId, habitLabel, activity, minutes };
    if (details) out.details = details;
    return out;
  }

  if (HABIT_DYNAMIC_IDS.includes(habitId)) {
    const spec = getHabitSecondarySpec(habitId, activity);
    if (!spec) return null;
    if (spec.type === "minutes") {
      if (minutes === null) return null;
      return { habitKind: "suggested", habitId, habitLabel, activity, minutes };
    }
    if (details) {
      return {
        habitKind: "suggested",
        habitId,
        habitLabel,
        activity,
        minutes: null,
        details,
      };
    }
    if (minutes !== null) {
      return {
        habitKind: "suggested",
        habitId,
        habitLabel,
        activity,
        minutes: null,
        details: `${minutes} min`,
      };
    }
    if (!spec.optional) return null;
    return { habitKind: "suggested", habitId, habitLabel, activity, minutes: null };
  }

  return null;
}

function normalizeHabitLogs(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeHabitLogEntry).filter(Boolean).slice(0, HABIT_LOG_MAX_PER_DAY);
}

function habitTitleForLog(log) {
  if (!log) return "";
  if (log.habitKind === "custom") return log.habitLabel || log.habitId;
  return SUGGESTED_HABIT_BY_ID[log.habitId]?.title || log.habitLabel || log.habitId;
}

function formatHabitLogLine(l) {
  const parts = [l.activity];
  if (l.minutes != null && Number.isFinite(l.minutes)) parts.push(`${l.minutes} min`);
  const d = l.details != null ? String(l.details).trim() : "";
  if (d) parts.push(d);
  return `${habitTitleForLog(l)}: ${parts.join(" · ")}`;
}

/** One-line summary without habit title (shown under habit heading). */
function formatHabitLogSummaryLine(l) {
  const parts = [l.activity];
  if (l.minutes != null && Number.isFinite(l.minutes)) parts.push(`${l.minutes} min`);
  const d = l.details != null ? String(l.details).trim() : "";
  if (d) parts.push(d);
  return parts.join(" · ");
}

function localDateKeyFromMs(ms) {
  const d = new Date(ms);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function localDateKeyFromIso(iso) {
  return localDateKeyFromMs(new Date(iso).getTime());
}

function dateKeyAddDays(dateKey, deltaDays) {
  const [y, mo, d] = dateKey.split("-").map(Number);
  if (!y || !mo || !d) return localDateKeyFromMs(Date.now());
  const dt = new Date(y, mo - 1, d + deltaDays);
  return localDateKeyFromMs(dt.getTime());
}

function localNoonIsoFromDateKey(dateKey) {
  const [y, mo, d] = dateKey.split("-").map(Number);
  if (!y || !mo || !d) return new Date().toISOString();
  return new Date(y, mo - 1, d, 12, 0, 0, 0).toISOString();
}

function loadHabitDayLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_HABIT_DAY_LOGS);
    if (!raw) return {};
    const o = JSON.parse(raw);
    if (!o || typeof o !== "object" || Array.isArray(o)) return {};
    const out = {};
    Object.entries(o).forEach(([k, v]) => {
      if (typeof k !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(k)) return;
      const logs = normalizeHabitLogs(v);
      if (logs.length) out[k] = logs;
    });
    return out;
  } catch {
    return {};
  }
}

function saveHabitDayLogsAll(data) {
  try {
    const keys = Object.keys(data).sort();
    const trimmed = {};
    keys.slice(-400).forEach((k) => {
      trimmed[k] = data[k];
    });
    localStorage.setItem(STORAGE_HABIT_DAY_LOGS, JSON.stringify(trimmed));
  } catch (_) {}
}

function formatHabitsJournalBody(logs) {
  if (!logs || !logs.length) return "";
  return logs.map(formatHabitLogLine).join("\n");
}

function syncHabitsToJournalForDay(dateKey, logs) {
  const title = JOURNAL_TITLE_HABITS_SYNC;
  const entries = loadJournal();
  const idx = entries.findIndex(
    (e) => localDateKeyFromIso(e.at) === dateKey && e.title.trim() === title,
  );
  if (logs.length === 0) {
    if (idx >= 0) entries.splice(idx, 1);
  } else {
    const body = formatHabitsJournalBody(logs);
    if (idx >= 0) {
      entries[idx] = { ...entries[idx], body };
    } else {
      entries.unshift({
        id: newJournalId(),
        at: localNoonIsoFromDateKey(dateKey),
        title,
        body,
        checkinAt: null,
      });
    }
  }
  saveJournal(entries);
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
    favBtn.textContent = isFav ? "★" : "☆";
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

let resourcesSubnavScrollBound = false;

function steadyPrefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function bindResourcesSubnavScrollListener() {
  if (resourcesSubnavScrollBound) return;
  resourcesSubnavScrollBound = true;
  window.addEventListener(
    "scroll",
    () => {
      if (els.viewResources.hidden) return;
      updateResourcesNavActive();
    },
    { passive: true },
  );
}

function scrollToResourcesSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const behavior = steadyPrefersReducedMotion() ? "auto" : "smooth";
  target.scrollIntoView({ behavior, block: "start" });
  target.focus({ preventScroll: true });
}

function updateResourcesNavActive() {
  if (!els.resourcesSideNav || els.viewResources.hidden) return;
  const ids = [
    "resources-section-health",
    "resources-section-recommendations",
    "resources-section-list",
    "resources-section-favorites",
  ];
  const threshold = 100;
  const vh = window.innerHeight;
  let activeId = ids[0];
  for (const sid of ids) {
    const el = document.getElementById(sid);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= threshold) activeId = sid;
  }
  const lastId = ids[ids.length - 1];
  const lastEl = document.getElementById(lastId);
  if (lastEl) {
    const r = lastEl.getBoundingClientRect();
    if (r.top > threshold && r.top < vh * 0.88 && r.bottom > threshold) {
      activeId = lastId;
    }
  }
  els.resourcesSideNav.querySelectorAll("[data-resources-jump]").forEach((el) => {
    const on = el.getAttribute("data-resources-jump") === activeId;
    el.classList.toggle("is-active", on);
    if (on) el.setAttribute("aria-current", "location");
    else el.removeAttribute("aria-current");
  });
}

function bindResourcesPageNav() {
  if (!els.resourcesSideNav || els.resourcesSideNav.dataset.bound) return;
  els.resourcesSideNav.dataset.bound = "1";
  els.resourcesSideNav.addEventListener("click", (e) => {
    const jump = e.target.closest("[data-resources-jump]");
    if (!jump || !els.resourcesSideNav.contains(jump)) return;
    e.preventDefault();
    scrollToResourcesSection(jump.getAttribute("data-resources-jump"));
  });
  bindResourcesSubnavScrollListener();
}

function renderResourcesPage() {
  if (!els.viewResources || els.viewResources.hidden) return;
  renderHealthFact();
  const state = loadResourcesState();
  renderResourcesCarousels(state);
  renderResourcesMyList(state);
  renderResourcesFavorites(state);
  els.resourcesResetDismissed.hidden = state.dismissed.length === 0;
  requestAnimationFrame(() => updateResourcesNavActive());
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
    "Restore this backup? This replaces all Steady data in this browser (streak, check-ins, journal, habits, habit-by-day logs, resources, theme). The page will reload.";
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
  if (parts[0] === "insights") return { view: "insights" };
  if (parts[0] === "resources") return { view: "resources" };
  if (parts[0] === "habits") return { view: "habits" };
  if (parts[0] === "journal") {
    if (parts[1] === "new") return { view: "journal", sub: "new" };
    if (parts[1] && JOURNAL_LIST_SECTION_BY_SLUG[parts[1]]) {
      return { view: "journal", sub: "list", scrollToId: JOURNAL_LIST_SECTION_BY_SLUG[parts[1]] };
    }
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

function habitStatsLastNDays(n) {
  const all = loadHabitDayLogs();
  let daysWithAny = 0;
  let totalLines = 0;
  for (let i = 0; i < n; i += 1) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = localDateKeyFromMs(d.getTime());
    const logs = all[key];
    if (logs && logs.length) {
      daysWithAny += 1;
      totalLines += logs.length;
    }
  }
  return { daysWithAny, totalLines };
}

function moodInsightStats() {
  const notes = loadNotes().filter((n) => !n.legacy && typeof n.mood === "number");
  if (!notes.length) return { hasData: false, total: 0 };
  const recent = notes.slice(0, 7);
  const avg = recent.reduce((s, x) => s + x.mood, 0) / recent.length;
  let trend = "steady";
  if (recent.length >= 4) {
    const mid = Math.max(1, Math.floor(recent.length / 2));
    const newerAvg = recent.slice(0, mid).reduce((s, x) => s + x.mood, 0) / mid;
    const olderAvg = recent.slice(mid).reduce((s, x) => s + x.mood, 0) / (recent.length - mid);
    if (newerAvg > olderAvg + 0.35) trend = "up";
    else if (newerAvg < olderAvg - 0.35) trend = "down";
  }
  return { hasData: true, total: notes.length, recentCount: recent.length, avg, trend };
}

function journalWritingCountExcludingHabits() {
  const t = JOURNAL_TITLE_HABITS_SYNC;
  return loadJournal().filter((e) => e.title.trim() !== t).length;
}

/** Supportive overview from on-device data only — not medical advice. */
function buildSmartInsightParagraphs() {
  const start = loadStart();
  const preparing = isIntentOnly() || !start;
  const mood = moodInsightStats();
  const habitWindow = 7;
  const h = habitStatsLastNDays(habitWindow);
  const jCount = journalWritingCountExcludingHabits();

  const paras = [];

  if (start) {
    const days = Math.floor(msSinceStart(start) / 86400000);
    paras.push(
      `You’re sitting at about ${days} alcohol-free day${days === 1 ? "" : "s"} — not a grade, just time you’ve given yourself. Whether today felt huge or barely survivable, it still counts as part of that story.`,
    );
  } else if (preparing) {
    paras.push(
      `You’re here without a start date on the clock, and that’s a fine place to be. There’s no quiz to pass first; when you want to pin a beginning, this app will still be here.`,
    );
  }

  const bits = [];

  if (mood.hasData) {
    if (mood.avg >= 4) {
      bits.push(
        `If I look at your latest check-ins, mood has been leaning toward the lighter side — worth a quiet nod to yourself if that lands at all.`,
      );
    } else if (mood.avg <= 2.5) {
      bits.push(
        `Your recent moods have been pretty low on the check-ins. That’s a lot to hold; you don’t owe anyone a brave face, and leaning on someone you trust is still a move forward.`,
      );
    } else {
      bits.push(
        `Mood-wise you’ve mostly been in that middle band lately — not flashy, but honest, and that still paints a picture over time.`,
      );
    }
    if (mood.trend === "up" && mood.recentCount >= 4) {
      bits.push(`Stacked next to the stretch just before, the newest few feel a touch brighter — small shifts are still shifts.`);
    } else if (mood.trend === "down" && mood.recentCount >= 4) {
      bits.push(`The freshest check-ins read heavier than the batch before them — that can be a wave, not a verdict on who you are.`);
    }
  } else {
    bits.push(
      `Whenever a mood check-in feels doable — even just sometimes — those little snapshots stack into something kinder to look back on.`,
    );
  }

  if (h.daysWithAny > 0) {
    const dayWord = h.daysWithAny === 1 ? "day" : "days";
    bits.push(
      `Over the past week you’ve opened the habit side of things on ${h.daysWithAny} ${dayWord} — nothing heroic required; showing up in small ways still counts.`,
    );
  } else {
    bits.push(
      `The habit log’s been quiet, and that’s allowed — it’s a notebook, not a report you have to file.`,
    );
  }

  if (jCount > 0) {
    bits.push(
      `You’ve also tucked away ${jCount} journal entr${jCount === 1 ? "y" : "ies"} that aren’t just habit lines — that’s you leaving room for thoughts that need more than a checkbox.`,
    );
  } else {
    bits.push(
      `If you ever want more than quick logs, the journal doesn’t care how polished it is — a short paragraph can mean a lot to future-you.`,
    );
  }

  paras.push(bits.join(" "));

  paras.push(
    `Almost nobody’s path runs straight. Whatever today looked like, you’re allowed to try again tomorrow — no permission slip, no perfect streak required.`,
  );

  return paras;
}

function renderSmartInsights() {
  if (!els.smartInsightsBody) return;
  els.smartInsightsBody.innerHTML = "";
  buildSmartInsightParagraphs().forEach((text) => {
    const p = document.createElement("p");
    p.className = "smart-insights-line";
    p.textContent = text;
    els.smartInsightsBody.appendChild(p);
  });
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
  let navKey = "home";
  if (r.view === "journal") navKey = "journal";
  else if (r.view === "resources") navKey = "resources";
  else if (r.view === "habits") navKey = "habits";
  else if (r.view === "insights") navKey = "insights";
  updateNavActive(navKey);

  if (r.view === "journal") {
    els.dashboard.hidden = true;
    els.viewResources.hidden = true;
    if (els.viewInsights) els.viewInsights.hidden = true;
    if (els.viewHabits) els.viewHabits.hidden = true;
    els.viewJournal.hidden = false;
    if (r.sub === "new") {
      window.scrollTo(0, 0);
      showJournalCompose();
    } else if (r.sub === "read" && r.id) {
      window.scrollTo(0, 0);
      showJournalRead(r.id);
    } else {
      showJournalList();
      if (r.scrollToId) {
        queueMicrotask(() => {
          const el = document.getElementById(r.scrollToId);
          if (!el) return;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.focus({ preventScroll: true });
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  } else if (r.view === "resources") {
    els.dashboard.hidden = true;
    els.viewJournal.hidden = true;
    if (els.viewInsights) els.viewInsights.hidden = true;
    if (els.viewHabits) els.viewHabits.hidden = true;
    els.viewResources.hidden = false;
    els.journalScreenList.hidden = false;
    els.journalScreenCompose.hidden = true;
    els.journalScreenRead.hidden = true;
    window.scrollTo(0, 0);
    renderResourcesPage();
  } else if (r.view === "habits") {
    els.dashboard.hidden = true;
    els.viewJournal.hidden = true;
    els.viewResources.hidden = true;
    if (els.viewInsights) els.viewInsights.hidden = true;
    if (els.viewHabits) els.viewHabits.hidden = false;
    els.journalScreenList.hidden = false;
    els.journalScreenCompose.hidden = true;
    els.journalScreenRead.hidden = true;
    window.scrollTo(0, 0);
    renderHabits();
  } else if (r.view === "insights") {
    els.dashboard.hidden = true;
    els.viewJournal.hidden = true;
    els.viewResources.hidden = true;
    if (els.viewHabits) els.viewHabits.hidden = true;
    if (els.viewInsights) els.viewInsights.hidden = false;
    els.journalScreenList.hidden = false;
    els.journalScreenCompose.hidden = true;
    els.journalScreenRead.hidden = true;
    window.scrollTo(0, 0);
    renderSmartInsights();
  } else {
    els.viewJournal.hidden = true;
    els.viewResources.hidden = true;
    if (els.viewInsights) els.viewInsights.hidden = true;
    if (els.viewHabits) els.viewHabits.hidden = true;
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

function appendJournalListItem(ul, entry, mode) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "journal-list-link" + (mode === "habit" ? " journal-list-link--habit-log" : "");
  a.href = `#/journal/${entry.id}`;
  const title = document.createElement("p");
  title.className = "journal-list-title";
  const meta = document.createElement("p");
  meta.className = "journal-list-meta";
  const dateStr = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(entry.at));

  if (mode === "habit") {
    title.textContent = "Habit log";
    meta.append(document.createTextNode(dateStr));
    const badge = document.createElement("span");
    badge.className = "journal-list-badge";
    badge.textContent = "Habits";
    meta.appendChild(badge);
  } else {
    title.textContent = entry.title.trim() || "Untitled entry";
    meta.append(document.createTextNode(dateStr));
    if (entry.checkinAt) {
      const badge = document.createElement("span");
      badge.className = "journal-list-badge";
      badge.textContent = "Check-in";
      meta.appendChild(badge);
    }
  }
  a.append(title, meta);
  li.appendChild(a);
  ul.appendChild(li);
}

function renderJournalList() {
  renderCheckins();
  const entries = [...loadJournal()].sort((a, b) => new Date(b.at) - new Date(a.at));
  const habitTitle = JOURNAL_TITLE_HABITS_SYNC;
  const regular = entries.filter((e) => e.title.trim() !== habitTitle);
  const habitLogs = entries.filter((e) => e.title.trim() === habitTitle);

  els.journalEntriesList.innerHTML = "";
  els.journalEmptyHint.hidden = regular.length > 0;
  regular.forEach((entry) => appendJournalListItem(els.journalEntriesList, entry, "writing"));

  if (els.journalHabitsEntriesList) {
    els.journalHabitsEntriesList.innerHTML = "";
    habitLogs.forEach((entry) => appendJournalListItem(els.journalHabitsEntriesList, entry, "habit"));
  }
  if (els.journalHabitsEmptyHint) {
    els.journalHabitsEmptyHint.hidden = habitLogs.length > 0;
  }
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

function renderCheckins() {
  if (!els.journalCheckinsList) return;
  const notes = loadNotes();
  els.journalCheckinsList.innerHTML = "";
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
    els.journalCheckinsList.appendChild(li);
  });
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

function habitEntryElIsValid(row) {
  if (!row) return false;
  const act = row.querySelector(".habit-log-activity")?.value.trim() || "";
  const mode = row.getAttribute("data-habit-tracker");
  const habitId = row.getAttribute("data-habit-id") || "";

  const minMain = row.querySelector(".habit-log-minutes");
  const drinkDet = row.querySelector(".habit-log-drink-details");
  const secMin = row.querySelector(".habit-log-secondary-minutes");
  const secText = row.querySelector(".habit-log-secondary-text");

  if (!act) {
    const orphan =
      (minMain && minMain.value.trim()) ||
      (drinkDet && drinkDet.value.trim()) ||
      (secMin && secMin.value.trim()) ||
      (secText && secText.value.trim());
    return !orphan;
  }

  if (mode === "drink") return true;

  if (mode === "movement" || mode === "custom") {
    const raw = minMain?.value.trim() || "";
    const n = raw === "" ? NaN : Number(raw);
    return Number.isFinite(n) && n >= 1 && n <= 999;
  }

  if (mode === "dynamic") {
    const spec = getHabitSecondarySpec(habitId, act);
    if (!spec) return false;
    if (spec.type === "minutes") {
      const raw = secMin?.value.trim() || "";
      const n = raw === "" ? NaN : Number(raw);
      return Number.isFinite(n) && n >= 1 && n <= 999;
    }
    if (!spec.optional && !(secText && secText.value.trim())) return false;
    return true;
  }

  return false;
}

function collectSingleHabitLogFromEntry(row) {
  if (!row) return null;
  const kind = row.getAttribute("data-habit-kind");
  const habitId = row.getAttribute("data-habit-id") || "";
  const habitLabel = row.getAttribute("data-habit-label") || "";
  const act = row.querySelector(".habit-log-activity")?.value.trim() || "";
  const mode = row.getAttribute("data-habit-tracker");
  if (!act) return null;

  const base = {
    habitKind: kind === "custom" ? "custom" : "suggested",
    habitId,
    habitLabel: habitLabel.slice(0, 120),
    activity: act.slice(0, 120),
  };

  if (mode === "drink") {
    const det = row.querySelector(".habit-log-drink-details")?.value.trim().slice(0, 200) || "";
    return { ...base, minutes: null, details: det || undefined };
  }

  if (mode === "movement" || mode === "custom") {
    const rawMin = row.querySelector(".habit-log-minutes")?.value.trim() || "";
    const minutes = rawMin === "" ? NaN : Number(rawMin);
    if (!Number.isFinite(minutes) || minutes < 1) return null;
    return { ...base, minutes: Math.min(999, Math.floor(minutes)) };
  }

  if (mode === "dynamic") {
    const spec = getHabitSecondarySpec(habitId, act);
    if (!spec) return null;
    if (spec.type === "minutes") {
      const raw = row.querySelector(".habit-log-secondary-minutes")?.value.trim() || "";
      const minutes = raw === "" ? NaN : Number(raw);
      if (!Number.isFinite(minutes) || minutes < 1) return null;
      return { ...base, minutes: Math.min(999, Math.floor(minutes)) };
    }
    const det = row.querySelector(".habit-log-secondary-text")?.value.trim().slice(0, 200) || "";
    return { ...base, minutes: null, details: det || undefined };
  }

  return null;
}

function getHabitsLogDateKey() {
  return els.habitsLogDate?.value || localDateKeyFromMs(Date.now());
}

function persistHabitsDayLogs(dateKey, logs) {
  const normalized = logs.map(normalizeHabitLogEntry).filter(Boolean).slice(0, HABIT_LOG_MAX_PER_DAY);
  const all = loadHabitDayLogs();
  if (!normalized.length) delete all[dateKey];
  else all[dateKey] = normalized;
  saveHabitDayLogsAll(all);
  const finalLogs = all[dateKey] || [];
  syncHabitsToJournalForDay(dateKey, finalLogs);
  rememberHabitActivitiesFromLogs(finalLogs);
  renderHabitCheckinRows();
}

function updateHabitRowSecondary(row, habitId, prevLog) {
  const slot = row.querySelector(".habit-log-secondary-slot");
  if (!slot) return;
  slot.innerHTML = "";
  const act = row.querySelector(".habit-log-activity")?.value.trim() || "";
  if (!act) return;
  const spec = getHabitSecondarySpec(habitId, act);
  if (!spec) return;

  const lab = document.createElement("label");
  lab.className = "field habit-log-field habit-log-field--secondary";

  const span = document.createElement("span");
  span.className = "field-label";
  span.textContent = spec.label;

  if (spec.type === "minutes") {
    const inp = document.createElement("input");
    inp.type = "number";
    inp.className = "habit-log-secondary-minutes";
    inp.min = "1";
    inp.max = "999";
    inp.step = "1";
    inp.placeholder = "—";
    inp.setAttribute("inputmode", "numeric");
    if (prevLog != null && prevLog.minutes != null && Number.isFinite(prevLog.minutes)) {
      inp.value = String(prevLog.minutes);
    }
    lab.append(span, inp);
  } else {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.className = "habit-log-secondary-text";
    inp.maxLength = 200;
    inp.placeholder = spec.optional ? "Optional" : "Required";
    if (prevLog != null) {
      const d = prevLog.details != null ? String(prevLog.details).trim() : "";
      if (d) inp.value = d;
    }
    lab.append(span, inp);
  }
  slot.appendChild(lab);
}

function habitTrackerModeForItem(item) {
  if (item.kind !== "suggested") return "custom";
  if (item.id === "movement") return "movement";
  if (item.id === "alt-drink") return "drink";
  if (HABIT_DYNAMIC_IDS.includes(item.id)) return "dynamic";
  return "movement";
}

function createHabitLogEntryEl(item, tracker, prevLog, listId) {
  const entry = document.createElement("div");
  entry.className = "habit-log-entry";
  entry.setAttribute("data-habit-kind", item.kind);
  entry.setAttribute("data-habit-id", item.id);
  entry.setAttribute("data-habit-label", item.label);
  entry.setAttribute("data-habit-tracker", tracker);

  const fields = document.createElement("div");
  fields.className = "habit-log-row-fields";

  const actLab = document.createElement("label");
  actLab.className = "field habit-log-field";
  const actLabSpan = document.createElement("span");
  actLabSpan.className = "field-label";
  if (item.kind === "custom") actLabSpan.textContent = "What you did";
  else if (item.id === "alt-drink") actLabSpan.textContent = "Type of drink (pick or type)";
  else actLabSpan.textContent = "Activity (pick or type)";

  const actInput = document.createElement("input");
  actInput.type = "text";
  actInput.className = "habit-log-activity";
  actInput.setAttribute("autocomplete", "off");
  actInput.maxLength = 120;
  actInput.placeholder =
    item.kind === "suggested"
      ? "Suggestions appear as you type — or enter your own"
      : "Describe briefly";
  if (prevLog) actInput.value = prevLog.activity;
  if (listId) actInput.setAttribute("list", listId);
  actLab.append(actLabSpan, actInput);

  const slot = document.createElement("div");
  slot.className = "habit-log-secondary-slot";

  if (tracker === "movement" || tracker === "custom") {
    const minLab = document.createElement("label");
    minLab.className = "field habit-log-field habit-log-field--minutes";
    const minLabSpan = document.createElement("span");
    minLabSpan.className = "field-label";
    minLabSpan.textContent = "Minutes";
    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.className = "habit-log-minutes";
    minInput.min = "1";
    minInput.max = "999";
    minInput.step = "1";
    minInput.placeholder = "—";
    minInput.setAttribute("inputmode", "numeric");
    if (prevLog && prevLog.minutes != null && Number.isFinite(prevLog.minutes)) {
      minInput.value = String(prevLog.minutes);
    }
    minLab.append(minLabSpan, minInput);
    slot.appendChild(minLab);
  } else if (tracker === "drink") {
    const detLab = document.createElement("label");
    detLab.className = "field habit-log-field habit-log-field--details";
    const detSpan = document.createElement("span");
    detSpan.className = "field-label";
    detSpan.textContent = "Details";
    const detInput = document.createElement("input");
    detInput.type = "text";
    detInput.className = "habit-log-drink-details";
    detInput.maxLength = 200;
    detInput.placeholder = "Optional";
    if (prevLog && prevLog.details) detInput.value = String(prevLog.details);
    detLab.append(detSpan, detInput);
    slot.appendChild(detLab);
  }

  fields.append(actLab, slot);
  entry.appendChild(fields);

  if (tracker === "dynamic") {
    updateHabitRowSecondary(entry, item.id, prevLog);
  }
  return entry;
}

function syncHabitsLogDateNav() {
  const todayKey = localDateKeyFromMs(Date.now());
  if (els.habitsLogDate) els.habitsLogDate.max = todayKey;
  const cur = els.habitsLogDate?.value || todayKey;
  if (els.habitsLogNextDay) {
    const atToday = cur >= todayKey;
    els.habitsLogNextDay.disabled = atToday;
    els.habitsLogNextDay.setAttribute("aria-disabled", atToday ? "true" : "false");
  }
}

function renderHabitCheckinRows() {
  if (!els.habitLogFieldset || !els.habitLogRows) return;
  const todayKey = localDateKeyFromMs(Date.now());
  if (els.habitsLogDate) {
    els.habitsLogDate.max = todayKey;
    if (!els.habitsLogDate.value) els.habitsLogDate.value = todayKey;
  }
  syncHabitsLogDateNav();
  const dateKey = els.habitsLogDate?.value || todayKey;
  const savedForDay = loadHabitDayLogs()[dateKey] || [];

  const state = loadHabitsState();
  const items = [];
  state.suggestedOn.forEach((hid) => {
    const def = SUGGESTED_HABIT_BY_ID[hid];
    if (def) items.push({ kind: "suggested", id: def.id, label: def.title });
  });
  state.custom.forEach((line) => {
    items.push({ kind: "custom", id: line, label: line });
  });
  els.habitLogRows.innerHTML = "";
  if (items.length === 0) {
    els.habitLogFieldset.hidden = true;
    return;
  }
  els.habitLogFieldset.hidden = false;

  items.forEach((item, habitIdx) => {
    const tracker = habitTrackerModeForItem(item);
    const listId =
      item.kind === "suggested" && HABIT_ACTIVITY_PRESETS[item.id] ? `habit-dl-${item.id}` : null;

    const group = document.createElement("div");
    group.className = "habit-log-group habit-log-group--compact";
    group.dataset.habitKind = item.kind;
    group.dataset.habitId = item.id;
    group.dataset.habitLabel = item.label;
    group.dataset.habitTracker = tracker;
    if (listId) group.dataset.habitListId = listId;

    if (listId) {
      const dl = document.createElement("datalist");
      dl.id = listId;
      mergedActivityOptions(item.id).forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        dl.appendChild(opt);
      });
      group.appendChild(dl);
    }

    const draftId = `habit-draft-${habitIdx}`;
    const top = document.createElement("div");
    top.className = "habit-log-group-top";
    const emoji = document.createElement("span");
    emoji.className = "habit-log-emoji";
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = habitLogEmojiForItem(item);
    const title = document.createElement("span");
    title.className = "habit-log-title-text";
    title.textContent = item.label;
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn btn-ghost habit-log-add-btn";
    addBtn.innerHTML = '<span class="habit-log-add-icon" aria-hidden="true">＋</span> Add';
    addBtn.setAttribute("aria-expanded", "false");
    addBtn.setAttribute("aria-controls", draftId);
    top.append(emoji, title, addBtn);

    const savedList = document.createElement("ul");
    savedList.className = "habit-log-saved-list";
    savedList.setAttribute("aria-label", `Saved logs for ${item.label}`);
    let anySaved = false;
    savedForDay.forEach((log, globalIdx) => {
      if (log.habitKind !== item.kind || log.habitId !== item.id) return;
      anySaved = true;
      const li = document.createElement("li");
      li.className = "habit-log-saved-row";
      const text = document.createElement("span");
      text.className = "habit-log-saved-text";
      text.textContent = formatHabitLogSummaryLine(log);
      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-ghost habit-log-delete-saved";
      del.innerHTML = '<span aria-hidden="true">🗑️</span>';
      del.setAttribute("aria-label", `Delete: ${formatHabitLogSummaryLine(log)}`);
      del.dataset.logDayIndex = String(globalIdx);
      li.append(text, del);
      savedList.appendChild(li);
    });
    if (!anySaved) {
      savedList.classList.add("habit-log-saved-list--empty");
      const emptyLi = document.createElement("li");
      emptyLi.className = "habit-log-saved-empty";
      emptyLi.textContent = "Nothing logged yet for this day.";
      savedList.appendChild(emptyLi);
    }

    const draftWrap = document.createElement("div");
    draftWrap.className = "habit-log-draft-wrap";
    draftWrap.id = draftId;
    draftWrap.hidden = true;

    group.append(top, savedList, draftWrap);
    els.habitLogRows.appendChild(group);
  });
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
  renderHabitCheckinRows();
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

  const totalHours = Math.floor(ms / 3600000);
  if (els.streakAltHours) els.streakAltHours.textContent = String(totalHours);
  if (els.streakAltBreakdown) {
    const wk = Math.floor(days / 7);
    const rd = days % 7;
    if (wk > 0) {
      els.streakAltBreakdown.textContent = `That’s ${wk} week${wk === 1 ? "" : "s"} and ${rd} day${rd === 1 ? "" : "s"} on the calendar.`;
    } else {
      els.streakAltBreakdown.textContent =
        rd === 0 ? "First day — every hour counts." : `${rd} day${rd === 1 ? "" : "s"} on the calendar.`;
    }
  }
  if (els.streakDayDots) {
    els.streakDayDots.innerHTML = "";
    const filled = Math.min(10, days);
    for (let i = 0; i < 10; i += 1) {
      const dot = document.createElement("span");
      dot.className = "streak-day-dot" + (i < filled ? " streak-day-dot--on" : "");
      dot.setAttribute("aria-hidden", "true");
      els.streakDayDots.appendChild(dot);
    }
  }

  const next = nextMilestone(days);
  const prev = prevMilestone(days);
  els.milestoneText.textContent =
    days >= MILESTONES[MILESTONES.length - 1]
      ? `You’ve passed ${prev} days. Next ring: ${next} days.`
      : `Day ${next} — you’re building toward it.`;

  if (els.milestoneTargetNum) els.milestoneTargetNum.textContent = String(next);

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
  if (els.milestonePctNote) {
    els.milestonePctNote.textContent =
      pct >= 100 ? "You’ve reached this stretch — next ring ahead." : `${pct}% of the way to your next day mark.`;
  }
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

const STREAK_CAROUSEL_SLIDE_COUNT = 2;
let streakCarouselIndex = 0;

function applyStreakCarouselSlide(i) {
  if (!els.streakCarouselTrack) return;
  streakCarouselIndex =
    ((i % STREAK_CAROUSEL_SLIDE_COUNT) + STREAK_CAROUSEL_SLIDE_COUNT) % STREAK_CAROUSEL_SLIDE_COUNT;
  els.streakCarouselTrack.style.transform = `translateX(-${streakCarouselIndex * 50}%)`;
  if (els.streakSlide0) els.streakSlide0.setAttribute("aria-hidden", streakCarouselIndex === 0 ? "false" : "true");
  if (els.streakSlide1) els.streakSlide1.setAttribute("aria-hidden", streakCarouselIndex === 1 ? "false" : "true");
  document.querySelectorAll(".streak-carousel-tab").forEach((tab, j) => {
    const on = j === streakCarouselIndex;
    tab.classList.toggle("is-active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });
}

function bindStreakCarousel() {
  if (!els.streakCarouselTrack) return;
  els.streakCarouselPrev?.addEventListener("click", () => applyStreakCarouselSlide(streakCarouselIndex - 1));
  els.streakCarouselNext?.addEventListener("click", () => applyStreakCarouselSlide(streakCarouselIndex + 1));
  document.querySelectorAll(".streak-carousel-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const n = Number(tab.getAttribute("data-streak-slide"), 10);
      if (Number.isFinite(n)) applyStreakCarouselSlide(n);
    });
  });
}

bindStreakCarousel();

function showSetup() {
  els.setupPanel.hidden = false;
  els.dashboard.hidden = true;
  els.viewJournal.hidden = true;
  if (els.viewResources) els.viewResources.hidden = true;
  if (els.viewInsights) els.viewInsights.hidden = true;
  if (els.viewHabits) els.viewHabits.hidden = true;
  els.siteNav.hidden = true;
  stopTicking();
  resetSetupWizard();
  primeLastDrinkInputs();
  primeSlipDefaults();
}

function showDashboardTracked(start) {
  enterAppShell();
  if (els.streakCarouselWrap) els.streakCarouselWrap.hidden = false;
  els.dashIntentBlock.hidden = true;
  if (els.dashMilestoneCard) els.dashMilestoneCard.hidden = false;
  els.btnSlip.hidden = false;
  startTicking(start);
}

function showDashboardPreparing() {
  enterAppShell();
  if (els.streakCarouselWrap) els.streakCarouselWrap.hidden = true;
  els.dashIntentBlock.hidden = false;
  if (els.dashMilestoneCard) els.dashMilestoneCard.hidden = true;
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

function setHabitsLogDateAndRender(dateKey) {
  if (!els.habitsLogDate) return;
  const todayKey = localDateKeyFromMs(Date.now());
  const next = dateKey > todayKey ? todayKey : dateKey;
  els.habitsLogDate.value = next;
  renderHabitCheckinRows();
}

if (els.habitsLogPrevDay) {
  els.habitsLogPrevDay.addEventListener("click", () => {
    const cur = els.habitsLogDate?.value;
    if (!cur) return;
    setHabitsLogDateAndRender(dateKeyAddDays(cur, -1));
  });
}

if (els.habitsLogNextDay) {
  els.habitsLogNextDay.addEventListener("click", () => {
    if (els.habitsLogNextDay.disabled) return;
    const cur = els.habitsLogDate?.value;
    if (!cur) return;
    setHabitsLogDateAndRender(dateKeyAddDays(cur, 1));
  });
}

if (els.habitsLogToday) {
  els.habitsLogToday.addEventListener("click", () => {
    setHabitsLogDateAndRender(localDateKeyFromMs(Date.now()));
  });
}

if (els.habitsLogDate) {
  els.habitsLogDate.addEventListener("change", () => renderHabitCheckinRows());
  els.habitsLogDate.addEventListener("input", () => syncHabitsLogDateNav());
}

if (els.habitLogRows) {
  const refreshDynamicSecondary = (e) => {
    const t = e.target;
    if (!t || !t.classList || !t.classList.contains("habit-log-activity")) return;
    const row = t.closest(".habit-log-entry");
    if (!row || row.getAttribute("data-habit-tracker") !== "dynamic") return;
    updateHabitRowSecondary(row, row.getAttribute("data-habit-id") || "", null);
  };
  els.habitLogRows.addEventListener("input", refreshDynamicSecondary);
  els.habitLogRows.addEventListener("change", refreshDynamicSecondary);

  els.habitLogRows.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".habit-log-delete-saved");
    if (delBtn) {
      e.preventDefault();
      const idx = Number(delBtn.dataset.logDayIndex, 10);
      if (!Number.isInteger(idx) || idx < 0) return;
      const dateKey = getHabitsLogDateKey();
      const all = loadHabitDayLogs();
      const logs = [...(all[dateKey] || [])];
      if (idx >= logs.length) return;
      logs.splice(idx, 1);
      persistHabitsDayLogs(dateKey, logs);
      return;
    }

    const saveEntry = e.target.closest(".habit-log-save-entry");
    if (saveEntry) {
      e.preventDefault();
      const draftWrap = saveEntry.closest(".habit-log-draft-wrap");
      const draftEl = draftWrap?.querySelector(".habit-log-entry");
      if (!habitEntryElIsValid(draftEl)) {
        alert(
          "Complete every field for this entry, or tap Cancel. Movement and custom habits need minutes; alcohol-free drink needs a type; other suggested habits need the second field for that activity.",
        );
        return;
      }
      const raw = collectSingleHabitLogFromEntry(draftEl);
      const normalized = normalizeHabitLogEntry(raw);
      if (!normalized) {
        alert("Could not save that entry. Check the fields and try again.");
        return;
      }
      const dateKey = getHabitsLogDateKey();
      const all = loadHabitDayLogs();
      const logs = [...(all[dateKey] || [])];
      if (logs.length >= HABIT_LOG_MAX_PER_DAY) {
        alert(`You can save up to ${HABIT_LOG_MAX_PER_DAY} habit lines per day.`);
        return;
      }
      const sameHabit = logs.filter(
        (l) => l.habitKind === normalized.habitKind && l.habitId === normalized.habitId,
      ).length;
      if (sameHabit >= HABIT_LOG_MAX_ENTRIES_PER_HABIT) {
        alert(`You can save up to ${HABIT_LOG_MAX_ENTRIES_PER_HABIT} lines per habit per day.`);
        return;
      }
      logs.push(normalized);
      persistHabitsDayLogs(dateKey, logs);
      return;
    }

    const cancelBtn = e.target.closest(".habit-log-draft-cancel");
    if (cancelBtn) {
      e.preventDefault();
      const draftWrap = cancelBtn.closest(".habit-log-draft-wrap");
      const group = cancelBtn.closest(".habit-log-group");
      if (draftWrap) {
        draftWrap.innerHTML = "";
        draftWrap.hidden = true;
      }
      group?.querySelector(".habit-log-add-btn")?.setAttribute("aria-expanded", "false");
      return;
    }

    const addBtn = e.target.closest(".habit-log-add-btn");
    if (addBtn) {
      e.preventDefault();
      const group = addBtn.closest(".habit-log-group");
      if (!group) return;
      const draftWrap = group.querySelector(".habit-log-draft-wrap");
      const item = {
        kind: group.dataset.habitKind,
        id: group.dataset.habitId,
        label: group.dataset.habitLabel,
      };
      const tracker = group.dataset.habitTracker;
      const listId = group.dataset.habitListId || null;
      if (draftWrap && !draftWrap.hidden && draftWrap.querySelector(".habit-log-entry")) {
        draftWrap.querySelector(".habit-log-activity")?.focus();
        return;
      }
      if (!draftWrap) return;
      draftWrap.innerHTML = "";
      const draft = createHabitLogEntryEl(item, tracker, null, listId);
      draft.classList.add("habit-log-draft");
      const actions = document.createElement("div");
      actions.className = "habit-log-draft-actions";
      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.className = "btn btn-primary habit-log-save-entry";
      saveBtn.textContent = "Save entry";
      const cancelDraftBtn = document.createElement("button");
      cancelDraftBtn.type = "button";
      cancelDraftBtn.className = "btn btn-ghost habit-log-draft-cancel";
      cancelDraftBtn.textContent = "Cancel";
      actions.append(saveBtn, cancelDraftBtn);
      draftWrap.append(draft, actions);
      draftWrap.hidden = false;
      addBtn.setAttribute("aria-expanded", "true");
      draft.querySelector(".habit-log-activity")?.focus();
    }
  });
}

els.journalBackCompose.addEventListener("click", () => {
  location.hash = "#/journal";
});

els.journalBackRead.addEventListener("click", () => {
  location.hash = "#/journal";
});

els.journalLinkCheckin.addEventListener("change", syncJournalLinkUI);

els.healthLearnMore?.addEventListener("click", () => {
  const willOpen = els.healthExpanded.hidden;
  els.healthExpanded.hidden = !willOpen;
  els.healthLearnMore.setAttribute("aria-expanded", willOpen ? "true" : "false");
  els.healthLearnMore.textContent = willOpen ? "Show less" : "Learn more";
});

if (els.habitsExploreToggle && els.habitsExploreExpanded) {
  els.habitsExploreToggle.addEventListener("click", () => {
    const willOpen = els.habitsExploreExpanded.hidden;
    els.habitsExploreExpanded.hidden = !willOpen;
    els.habitsExploreToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    els.habitsExploreToggle.textContent = willOpen ? "Hide suggestions" : "Show suggestions";
  });
}

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

  bindResourcesPageNav();

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
