const APP_VERSION = "4";
const DB_NAME = "idea_garden_db";
const DB_VERSION = 1;
/* Keep the v3 settings key so the user's existing theme/background choices survive the update. */
const SETTINGS_KEY = "idea_garden_settings_v3";
const BACKGROUND_INTERVAL_MS = 5 * 60 * 1000;
const BACKGROUND_FADE_MS = 5000;

const FAIRYTALE_BACKGROUNDS = Array.from({ length: 9 }, (_, index) =>
  `assets/img/fairytale_${index + 1}.PNG`
);
const SKY_BACKGROUNDS = {
  light: "assets/img/morning_1.PNG",
  dark: "assets/img/night_1.PNG"
};

const DEFAULT_SETTINGS = {
  themeMode: "system",
  backgroundMode: "fairytale"
};

const STAGES = [
  { id: "seed", label: "種", icon: "🌰" },
  { id: "sprout", label: "芽", icon: "🌱" },
  { id: "bud", label: "蕾", icon: "🌿" },
  { id: "flower", label: "花", icon: "🌸" }
];

const CATEGORIES = [
  "未分類",
  "キャラクター",
  "世界観・設定",
  "ストーリー・イベント",
  "演出",
  "ゲームシステム",
  "UI・画面",
  "台詞",
  "ビジュアル",
  "その他"
];

const MOODS = [
  "未設定",
  "可愛い",
  "不穏",
  "暗い",
  "幻想",
  "日常",
  "奇妙",
  "静か",
  "温かい",
  "退廃"
];

const GROWTH = {
  "キャラクター": {
    seed: ["この人物の核は見えてきた？", "「この人物は何を望み、なぜそういう人物なのか？」に答えられそうなら、芽にしてよさそう。"],
    sprout: ["この人物は作品の中で動き始めた？", "他の人物や世界とどう関わり、物語でどんな役割を持つのかが見えてきたら、蕾へ。"],
    bud: ["もう実際に登場させられる？", "行動や台詞を書けるところまで輪郭が定まっていれば、開花してよさそう。"],
    flower: ["この花はもう使える状態。", "必要ならさらに肉付けしてもいいし、ここから別の種を派生させてもいい。"]
  },
  "世界観・設定": {
    seed: ["この世界・設定の本質は見えてきた？", "「これはつまり何なのか？」を一言で説明できそうなら、芽にしてよさそう。"],
    sprout: ["他の設定と繋がってきた？", "物語やキャラクターへどんな影響を与えるのかが見えてきたら、蕾へ。"],
    bud: ["作品の中で矛盾なく使えそう？", "描写や説明にそのまま持ち込めるなら、開花。"],
    flower: ["この設定は作品へ持ち込める。", "さらに別設定の土台になったら、新しい種を落としてもいい。"]
  },
  "ストーリー・イベント": {
    seed: ["なぜこの出来事が起こるのか見えてきた？", "原因や発端が言葉にできるなら、芽にしてよさそう。"],
    sprout: ["この出来事が何を変えるのか見えてきた？", "誰に何を起こし、前後の展開とどう繋がるかが定まれば、蕾へ。"],
    bud: ["もうシーンとして書き始められる？", "登場人物・目的・前後関係が揃っていれば、開花。"],
    flower: ["この出来事はシーンとして使える。", "実際に書いたあとも、派生した出来事を新しい種として残せる。"]
  },
  "演出": {
    seed: ["この演出で何を感じさせたい？", "驚き、不安、寂しさなど、狙いが言葉になれば芽へ。"],
    sprout: ["どの場面で、どう見せるか決まってきた？", "条件・タイミング・見せ方がまとまってきたら蕾へ。"],
    bud: ["そのまま執筆・実装できる？", "実際の制作に移せる程度まで決まっていれば開花。"],
    flower: ["この演出は使える状態。", "別の場面へ応用したいなら、新しい派生種にしてもいい。"]
  },
  "ゲームシステム": {
    seed: ["プレイヤーに何をさせる仕組み？", "遊びの中心行動が見えてきたら芽へ。"],
    sprout: ["他のシステムや物語とどう関係する？", "報酬、進行、制約などとの繋がりが見えてきたら蕾へ。"],
    bud: ["ルールとして実装できる？", "条件・入力・結果まで定義できていれば開花。"],
    flower: ["この仕組みは実装へ持ち込める。", "試した結果の改善案は、別の種として残してもいい。"]
  },
  "UI・画面": {
    seed: ["この画面で何を見せ、何をさせたい？", "目的が言葉になれば芽へ。"],
    sprout: ["情報の優先順位と操作の流れは見えた？", "どこを押し、何が変わるかが決まってきたら蕾へ。"],
    bud: ["実際に画面として作れる？", "配置・操作・必要情報が揃っていれば開花。"],
    flower: ["このUIは制作へ持ち込める。", "実装後に生まれた改善点は、新しい種にしてもいい。"]
  },
  "台詞": {
    seed: ["誰が、なぜこの言葉を言う？", "話者と感情の理由が見えてきたら芽へ。"],
    sprout: ["どの場面で、誰に向けて言う？", "文脈と相手が定まってきたら蕾へ。"],
    bud: ["実際のシーンへ組み込める？", "前後の流れに置けるなら開花。"],
    flower: ["この台詞はシーンへ置ける状態。", "別の台詞や反応が生まれたら、そこから新しい種を作れる。"]
  },
  "ビジュアル": {
    seed: ["この見た目で何を表現したい？", "雰囲気や意味が見えてきたら芽へ。"],
    sprout: ["作品やキャラクターの意味と繋がった？", "色・形・モチーフの理由が定まってきたら蕾へ。"],
    bud: ["デザインとして制作に移れる？", "必要な要素が揃っていれば開花。"],
    flower: ["このビジュアルは制作へ持ち込める。", "差分や別案は派生種にしておける。"]
  },
  default: {
    seed: ["このアイデアの核は見えてきた？", "「これはつまり何なのか？」に答えられそうなら、芽にしてよさそう。"],
    sprout: ["他の要素とどう繋がるか見えてきた？", "作品の中での役割が見えてきたら、蕾へ。"],
    bud: ["もう実際に作品へ持ち込める？", "考える素材から使える素材になったなら、開花。"],
    flower: ["この花はもう使える状態。", "ここから別の種を派生させてもいい。"]
  }
};

const GRAPH_NODE_W = 154;
const GRAPH_NODE_H = 76;
const GRAPH_MIN_SCALE = 0.28;
const GRAPH_MAX_SCALE = 2.4;

let db;
let ideas = [];
let relations = [];
let currentIdeaId = null;
let currentView = "garden";

let uiSettings = loadSettings();
let resolvedTheme = "light";
let currentBackgroundPath = "";
let activeBackgroundLayer = 0;
let backgroundTransitionTimer = null;
let rotationTimer = null;
let rotationRemainingMs = BACKGROUND_INTERVAL_MS;
let rotationStartedAt = null;
let lastFairytaleIndex = -1;

let graphMode = "focus";
let graphFocusId = null;
let graphLayout = { nodes: [], edges: [] };
let graphTransform = { x: 0, y: 0, scale: 1 };
let graphPointers = new Map();
let graphPanState = null;
let graphPinchState = null;
let graphFitPending = false;

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/* ---------- Theme / background ---------- */

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    return {
      themeMode: ["system", "light", "dark"].includes(parsed?.themeMode)
        ? parsed.themeMode
        : DEFAULT_SETTINGS.themeMode,
      backgroundMode: ["fairytale", "sky"].includes(parsed?.backgroundMode)
        ? parsed.backgroundMode
        : DEFAULT_SETTINGS.backgroundMode
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(uiSettings));
}

function resolveTheme() {
  if (uiSettings.themeMode === "light") return "light";
  if (uiSettings.themeMode === "dark") return "dark";
  return systemThemeQuery.matches ? "dark" : "light";
}

function applyTheme({ updateBackground = true } = {}) {
  const nextTheme = resolveTheme();
  const changed = nextTheme !== resolvedTheme;
  resolvedTheme = nextTheme;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeMode = uiSettings.themeMode;

  const themeColor = $("meta[name='theme-color']");
  if (themeColor) {
    themeColor.setAttribute("content", resolvedTheme === "dark" ? "#101625" : "#efe9d8");
  }

  renderSettingsControls();

  if (updateBackground && uiSettings.backgroundMode === "sky" && changed) {
    setBackgroundImage(SKY_BACKGROUNDS[resolvedTheme]);
  }
}

function renderSettingsControls() {
  $$("[data-theme-mode]").forEach((button) => {
    const selected = button.dataset.themeMode === uiSettings.themeMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });

  $$("[data-background-mode]").forEach((button) => {
    const selected = button.dataset.backgroundMode === uiSettings.backgroundMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });

  const status = $("#settingsStatus");
  if (status) {
    const themeText = uiSettings.themeMode === "system"
      ? `端末と同期中（現在は${resolvedTheme === "dark" ? "ダーク" : "ライト"}）`
      : `${resolvedTheme === "dark" ? "ダーク" : "ライト"}モード固定`;
    const backgroundText = uiSettings.backgroundMode === "fairytale"
      ? "童話背景：9枚からランダム、表示中は5分ごとに切替"
      : `空背景：${resolvedTheme === "dark" ? "night_1.PNG" : "morning_1.PNG"} を固定表示`;
    status.textContent = `${themeText} ／ ${backgroundText}`;
  }
}

function selectThemeMode(mode) {
  if (!["system", "light", "dark"].includes(mode)) return;
  uiSettings.themeMode = mode;
  saveSettings();
  applyTheme({ updateBackground: true });
  renderSettingsControls();
  toast(mode === "system"
    ? "端末の表示設定と同期します。"
    : `${mode === "dark" ? "ダーク" : "ライト"}モードに固定しました。`
  );
}

function selectBackgroundMode(mode) {
  if (!["fairytale", "sky"].includes(mode)) return;
  if (uiSettings.backgroundMode === mode) return;

  uiSettings.backgroundMode = mode;
  saveSettings();
  rotationRemainingMs = BACKGROUND_INTERVAL_MS;

  if (mode === "fairytale") {
    chooseAndShowRandomFairytale({ immediate: false });
    startBackgroundRotation();
    toast("童話の背景に切り替えました。");
  } else {
    stopBackgroundRotation(true);
    setBackgroundImage(SKY_BACKGROUNDS[resolvedTheme]);
    toast("空の背景に切り替えました。");
  }
  renderSettingsControls();
}

function preloadImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = path;
  });
}

async function setBackgroundImage(path, { immediate = false } = {}) {
  if (!path || (path === currentBackgroundPath && !immediate)) return;
  const loaded = await preloadImage(path);
  if (!loaded) {
    console.warn("背景画像を読み込めませんでした:", path);
    return;
  }

  const layers = [$("#bgLayerA"), $("#bgLayerB")];
  if (!layers[0] || !layers[1]) return;
  clearTimeout(backgroundTransitionTimer);

  if (immediate || !currentBackgroundPath) {
    layers.forEach((layer, index) => {
      layer.style.transitionDuration = immediate ? "0s" : "5s";
      layer.classList.toggle("is-visible", index === activeBackgroundLayer);
    });
    layers[activeBackgroundLayer].style.backgroundImage = `url("${path}")`;
    layers[1 - activeBackgroundLayer].style.backgroundImage = "none";
    currentBackgroundPath = path;
    requestAnimationFrame(() => {
      layers.forEach((layer) => { layer.style.transitionDuration = ""; });
    });
    return;
  }

  const oldIndex = activeBackgroundLayer;
  const nextIndex = 1 - activeBackgroundLayer;
  const oldLayer = layers[oldIndex];
  const nextLayer = layers[nextIndex];

  nextLayer.style.backgroundImage = `url("${path}")`;
  nextLayer.classList.remove("is-visible");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextLayer.classList.add("is-visible");
      oldLayer.classList.remove("is-visible");
      activeBackgroundLayer = nextIndex;
      currentBackgroundPath = path;
      backgroundTransitionTimer = setTimeout(() => {
        oldLayer.style.backgroundImage = "none";
      }, BACKGROUND_FADE_MS + 150);
    });
  });
}

function randomFairytaleIndex() {
  if (FAIRYTALE_BACKGROUNDS.length <= 1) return 0;
  let next = Math.floor(Math.random() * FAIRYTALE_BACKGROUNDS.length);
  while (next === lastFairytaleIndex) {
    next = Math.floor(Math.random() * FAIRYTALE_BACKGROUNDS.length);
  }
  return next;
}

function chooseAndShowRandomFairytale({ immediate = false } = {}) {
  const index = randomFairytaleIndex();
  lastFairytaleIndex = index;
  return setBackgroundImage(FAIRYTALE_BACKGROUNDS[index], { immediate });
}

function stopBackgroundRotation(resetRemaining = false) {
  if (rotationTimer) clearTimeout(rotationTimer);
  rotationTimer = null;
  rotationStartedAt = null;
  if (resetRemaining) rotationRemainingMs = BACKGROUND_INTERVAL_MS;
}

function pauseBackgroundRotation() {
  if (!rotationTimer || !rotationStartedAt) return;
  const elapsed = Date.now() - rotationStartedAt;
  rotationRemainingMs = Math.max(0, rotationRemainingMs - elapsed);
  clearTimeout(rotationTimer);
  rotationTimer = null;
  rotationStartedAt = null;
}

function armBackgroundRotation() {
  if (uiSettings.backgroundMode !== "fairytale" || document.hidden) return;
  stopBackgroundRotation(false);
  rotationStartedAt = Date.now();
  rotationTimer = setTimeout(async () => {
    rotationTimer = null;
    rotationStartedAt = null;
    rotationRemainingMs = BACKGROUND_INTERVAL_MS;
    await chooseAndShowRandomFairytale();
    armBackgroundRotation();
  }, Math.max(250, rotationRemainingMs));
}

function startBackgroundRotation() {
  rotationRemainingMs = BACKGROUND_INTERVAL_MS;
  armBackgroundRotation();
}

function handleVisibilityChange() {
  if (uiSettings.backgroundMode !== "fairytale") return;
  if (document.hidden) {
    pauseBackgroundRotation();
  } else {
    if (rotationRemainingMs <= 0) rotationRemainingMs = 250;
    armBackgroundRotation();
  }
}

async function initializeBackground() {
  applyTheme({ updateBackground: false });
  if (uiSettings.backgroundMode === "sky") {
    await setBackgroundImage(SKY_BACKGROUNDS[resolvedTheme], { immediate: true });
    stopBackgroundRotation(true);
  } else {
    await chooseAndShowRandomFairytale({ immediate: true });
    startBackgroundRotation();
  }
}

/* ---------- IndexedDB ---------- */

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains("ideas")) {
        const store = database.createObjectStore("ideas", { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt");
        store.createIndex("status", "status");
        store.createIndex("category", "category");
      }
      if (!database.objectStoreNames.contains("relations")) {
        const relationStore = database.createObjectStore("relations", { keyPath: "id" });
        relationStore.createIndex("sourceIdeaId", "sourceIdeaId");
        relationStore.createIndex("targetIdeaId", "targetIdeaId");
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function getAll(storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function put(storeName, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(value);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function remove(storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function reloadData() {
  ideas = await getAll("ideas");
  relations = await getAll("relations");
  sortIdeas();
  ensureGraphFocus();
}

function sortIdeas() {
  ideas.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

/* ---------- Common render helpers ---------- */

function fillOptions(select, values, selected = null) {
  select.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    if (value === selected) option.selected = true;
    select.appendChild(option);
  });
}

function setupSelects() {
  fillOptions($("#quickCategory"), CATEGORIES);
  fillOptions($("#detailCategory"), CATEGORIES);
  fillOptions($("#quickMood"), MOODS);
  fillOptions($("#detailMood"), MOODS);

  [$("#gardenCategoryFilter"), $("#searchCategoryFilter")].forEach((select) => {
    CATEGORIES.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  });
}

function stageInfo(id) {
  return STAGES.find((stage) => stage.id === id) || STAGES[0];
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

function daysAgo(dateString) {
  const created = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - created) / 86400000);
  if (diff <= 0) return "今日";
  if (diff === 1) return "昨日";
  return `${diff}日前`;
}

function displayTitle(idea) {
  return idea.title?.trim() || idea.body?.trim().slice(0, 24) || "名もない種";
}

function getRelationCount(ideaId) {
  return relations.filter((relation) =>
    relation.sourceIdeaId === ideaId || relation.targetIdeaId === ideaId
  ).length;
}

function createIdeaCard(idea) {
  const stage = stageInfo(idea.stage);
  const article = document.createElement("article");
  article.className = "idea-card";
  article.dataset.id = idea.id;
  article.innerHTML = `
    <div class="card-top">
      <span class="stage-mark">${stage.icon}</span>
      <span class="card-category">${escapeHTML(idea.category || "未分類")}</span>
    </div>
    <h3>${escapeHTML(displayTitle(idea))}</h3>
    <p>${escapeHTML(idea.body || "まだ本文はありません。")}</p>
    <div class="card-bottom">
      <span class="stage-text">${stage.label}</span>
      <span class="relation-count">${
        getRelationCount(idea.id)
          ? `⌁ ${getRelationCount(idea.id)}`
          : escapeHTML(idea.project || "未所属")
      }</span>
    </div>
  `;
  article.addEventListener("click", () => openDetail(idea.id));
  return article;
}

function createGraveCard(idea) {
  const article = document.createElement("article");
  article.className = "grave-card";
  article.dataset.id = idea.id;
  article.innerHTML = `
    <h3>${escapeHTML(displayTitle(idea))}</h3>
    <p>${escapeHTML(idea.body || "")}</p>
    <span class="grave-date">${
      idea.buriedAt ? `${formatDate(idea.buriedAt)} 埋葬` : "眠っている種"
    }</span>
  `;
  article.addEventListener("click", () => openDetail(idea.id));
  return article;
}

function renderGarden() {
  const grid = $("#gardenGrid");
  const empty = $("#gardenEmpty");
  grid.innerHTML = "";

  const stage = $("#gardenStageFilter").value;
  const category = $("#gardenCategoryFilter").value;
  const list = ideas.filter((idea) => {
    if (idea.status !== "active") return false;
    if (stage !== "all" && idea.stage !== stage) return false;
    if (category !== "all" && idea.category !== category) return false;
    return true;
  });

  list.forEach((idea) => grid.appendChild(createIdeaCard(idea)));
  empty.classList.toggle("hidden", list.length > 0);
}

function renderSpecimens() {
  const grid = $("#specimenGrid");
  const empty = $("#specimenEmpty");
  grid.innerHTML = "";
  const list = ideas.filter((idea) => idea.status === "specimen");
  list.forEach((idea) => grid.appendChild(createIdeaCard(idea)));
  empty.classList.toggle("hidden", list.length > 0);
}

function renderCemetery() {
  const grid = $("#cemeteryGrid");
  const empty = $("#cemeteryEmpty");
  grid.innerHTML = "";
  const list = ideas.filter((idea) => idea.status === "buried");
  list.forEach((idea) => grid.appendChild(createGraveCard(idea)));
  empty.classList.toggle("hidden", list.length > 0);
}

function renderSearch() {
  const grid = $("#searchGrid");
  const empty = $("#searchEmpty");
  const q = $("#searchInput").value.trim().toLowerCase();
  const category = $("#searchCategoryFilter").value;
  const stage = $("#searchStageFilter").value;
  grid.innerHTML = "";

  const list = ideas.filter((idea) => {
    const haystack = [
      idea.title,
      idea.body,
      idea.memo,
      idea.project,
      idea.category,
      idea.mood
    ].join(" ").toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (category !== "all" && idea.category !== category) return false;
    if (stage !== "all" && idea.stage !== stage) return false;
    return true;
  });

  list.forEach((idea) => grid.appendChild(createIdeaCard(idea)));
  empty.classList.toggle("hidden", list.length > 0);
}

function renderTodaySeed() {
  const card = $("#todayCard");
  const candidates = ideas.filter((idea) => idea.status === "active");

  if (!candidates.length) {
    card.innerHTML = `
      <div class="today-label">今日の種</div>
      <div class="today-title">まだ庭は空っぽです。</div>
      <p class="today-note">最初の一粒を植えると、ここに昔のアイデアが戻ってくるようになります。</p>
    `;
    return;
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of todayKey) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const sorted = [...candidates].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  const idea = sorted[hash % sorted.length];

  card.innerHTML = `
    <button type="button" data-id="${idea.id}">
      <div class="today-label">今日の種</div>
      <div class="today-title">${escapeHTML(displayTitle(idea))}</div>
      <p class="today-note">${escapeHTML(daysAgo(idea.createdAt))}に植えたアイデアです。${
        getRelationCount(idea.id)
          ? `今は ${getRelationCount(idea.id)} 個の種と繋がっています。`
          : "まだ静かに一人で眠っています。"
      }</p>
    </button>
  `;
  card.querySelector("button").addEventListener("click", () => openDetail(idea.id));
}

function renderAll() {
  renderGarden();
  renderSpecimens();
  renderCemetery();
  renderSearch();
  renderTodaySeed();
  renderGraphControls();
  if (currentView === "relations") {
    renderRelationGraph({ fit: false });
  }
}

/* ---------- Correlation graph ---------- */

function ensureGraphFocus() {
  if (graphFocusId && ideas.some((idea) => idea.id === graphFocusId)) return;
  if (!ideas.length) {
    graphFocusId = null;
    return;
  }

  const ranked = [...ideas].sort((a, b) => {
    const relationDiff = getRelationCount(b.id) - getRelationCount(a.id);
    if (relationDiff) return relationDiff;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  graphFocusId = ranked[0].id;
}

function renderGraphControls() {
  const focusButton = $("#graphFocusMode");
  const allButton = $("#graphAllMode");
  if (!focusButton || !allButton) return;

  focusButton.classList.toggle("is-selected", graphMode === "focus");
  allButton.classList.toggle("is-selected", graphMode === "all");
  focusButton.setAttribute("aria-checked", String(graphMode === "focus"));
  allButton.setAttribute("aria-checked", String(graphMode === "all"));

  const pickerWrap = $("#graphFocusPickerWrap");
  if (pickerWrap) pickerWrap.classList.toggle("hidden", graphMode === "all");

  const select = $("#graphFocusSelect");
  if (!select) return;
  const previous = graphFocusId;
  select.innerHTML = "";

  if (!ideas.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "種がありません";
    select.appendChild(option);
    select.disabled = true;
    return;
  }

  select.disabled = false;
  [...ideas]
    .sort((a, b) => displayTitle(a).localeCompare(displayTitle(b), "ja"))
    .forEach((idea) => {
      const option = document.createElement("option");
      option.value = idea.id;
      option.textContent = `${stageInfo(idea.stage).icon} ${displayTitle(idea)}`;
      select.appendChild(option);
    });

  if (ideas.some((idea) => idea.id === previous)) select.value = previous;
}

function getRelationBetween(a, b) {
  return relations.find((relation) =>
    (relation.sourceIdeaId === a && relation.targetIdeaId === b) ||
    (relation.sourceIdeaId === b && relation.targetIdeaId === a)
  );
}

function buildFocusGraph() {
  ensureGraphFocus();
  const center = ideas.find((idea) => idea.id === graphFocusId);
  if (!center) return { nodes: [], edges: [] };

  const connectedRelations = relations.filter((relation) =>
    relation.sourceIdeaId === center.id || relation.targetIdeaId === center.id
  );

  const neighborIds = [...new Set(connectedRelations.map((relation) =>
    relation.sourceIdeaId === center.id ? relation.targetIdeaId : relation.sourceIdeaId
  ))];

  const neighbors = neighborIds
    .map((id) => ideas.find((idea) => idea.id === id))
    .filter(Boolean);

  const nodes = [{
    ...center,
    graphX: 0,
    graphY: 0,
    isCenter: true
  }];

  /*
   * Direct connections are distributed over multiple rings.
   * This keeps large hubs readable instead of squeezing every node onto one circle.
   */
  let cursor = 0;
  let ringIndex = 0;
  while (cursor < neighbors.length) {
    const capacity = 8 + ringIndex * 4;
    const ringItems = neighbors.slice(cursor, cursor + capacity);
    const radius = 235 + ringIndex * 185;
    const angleOffset = ringIndex % 2 ? Math.PI / Math.max(6, ringItems.length) : 0;

    ringItems.forEach((idea, index) => {
      const angle = -Math.PI / 2 + angleOffset +
        (Math.PI * 2 * index / Math.max(1, ringItems.length));
      nodes.push({
        ...idea,
        graphX: Math.cos(angle) * radius,
        graphY: Math.sin(angle) * radius,
        isCenter: false
      });
    });

    cursor += ringItems.length;
    ringIndex += 1;
  }

  const nodeIds = new Set(nodes.map((node) => node.id));
  /* Also draw any relationship that exists between the visible neighboring nodes. */
  const edges = relations.filter((relation) =>
    nodeIds.has(relation.sourceIdeaId) && nodeIds.has(relation.targetIdeaId)
  );

  return { nodes, edges };
}

function seededUnit(id) {
  let hash = 2166136261;
  for (const ch of String(id)) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 100000) / 100000;
}

function buildFullGraph() {
  if (!ideas.length) return { nodes: [], edges: [] };

  const nodes = ideas.map((idea, index) => {
    const angle = seededUnit(idea.id) * Math.PI * 2;
    const ring = 170 + Math.sqrt(index + 1) * 72;
    return {
      ...idea,
      graphX: Math.cos(angle) * ring,
      graphY: Math.sin(angle) * ring,
      vx: 0,
      vy: 0,
      isCenter: false
    };
  });

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const edges = relations.filter((relation) =>
    nodeMap.has(relation.sourceIdeaId) && nodeMap.has(relation.targetIdeaId)
  );

  const count = nodes.length;
  const iterations = count <= 70 ? 180 : count <= 150 ? 105 : 62;
  const repulsion = count <= 90 ? 42000 : 30000;
  const springLength = count <= 90 ? 205 : 175;
  const springStrength = .0047;
  const gravity = .003;
  const damping = .78;

  for (let tick = 0; tick < iterations; tick += 1) {
    for (const node of nodes) {
      node.vx *= damping;
      node.vy *= damping;
      node.vx += -node.graphX * gravity;
      node.vy += -node.graphY * gravity;
    }

    for (let i = 0; i < count; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < count; j += 1) {
        const b = nodes[j];
        let dx = b.graphX - a.graphX;
        let dy = b.graphY - a.graphY;
        let dist2 = dx * dx + dy * dy;
        if (dist2 < 250) {
          dx += (seededUnit(a.id + b.id) - .5) * 12;
          dy += (seededUnit(b.id + a.id) - .5) * 12;
          dist2 = dx * dx + dy * dy;
        }
        const dist = Math.sqrt(dist2) || 1;
        const force = repulsion / Math.max(900, dist2);
        const fx = dx / dist * force;
        const fy = dy / dist * force;
        a.vx -= fx;
        a.vy -= fy;
        b.vx += fx;
        b.vy += fy;
      }
    }

    for (const edge of edges) {
      const source = nodeMap.get(edge.sourceIdeaId);
      const target = nodeMap.get(edge.targetIdeaId);
      if (!source || !target) continue;
      const dx = target.graphX - source.graphX;
      const dy = target.graphY - source.graphY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - springLength) * springStrength;
      const fx = dx / dist * force;
      const fy = dy / dist * force;
      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    }

    for (const node of nodes) {
      node.graphX += Math.max(-12, Math.min(12, node.vx));
      node.graphY += Math.max(-12, Math.min(12, node.vy));
    }
  }

  /* Put isolated ideas around the outer edge so they remain visible but do not crowd clusters. */
  const degree = new Map(nodes.map((node) => [node.id, 0]));
  edges.forEach((edge) => {
    degree.set(edge.sourceIdeaId, (degree.get(edge.sourceIdeaId) || 0) + 1);
    degree.set(edge.targetIdeaId, (degree.get(edge.targetIdeaId) || 0) + 1);
  });

  const isolated = nodes.filter((node) => degree.get(node.id) === 0);
  if (isolated.length) {
    const connected = nodes.filter((node) => degree.get(node.id) > 0);
    const maxRadius = Math.max(
      380,
      ...connected.map((node) => Math.hypot(node.graphX, node.graphY) + 210)
    );
    isolated.forEach((node, index) => {
      const angle = (Math.PI * 2 * index / isolated.length) - Math.PI / 2;
      node.graphX = Math.cos(angle) * maxRadius;
      node.graphY = Math.sin(angle) * maxRadius;
    });
  }

  return { nodes, edges };
}

function graphBounds(layout = graphLayout) {
  if (!layout.nodes.length) return { minX: -100, minY: -100, maxX: 100, maxY: 100 };
  const halfW = GRAPH_NODE_W / 2;
  const halfH = GRAPH_NODE_H / 2;
  return {
    minX: Math.min(...layout.nodes.map((node) => node.graphX - halfW)),
    minY: Math.min(...layout.nodes.map((node) => node.graphY - halfH)),
    maxX: Math.max(...layout.nodes.map((node) => node.graphX + halfW)),
    maxY: Math.max(...layout.nodes.map((node) => node.graphY + halfH))
  };
}

function shortenEdge(source, target) {
  const dx = target.graphX - source.graphX;
  const dy = target.graphY - source.graphY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const cut = 82;
  return {
    x1: source.graphX + ux * cut,
    y1: source.graphY + uy * cut * .55,
    x2: target.graphX - ux * cut,
    y2: target.graphY - uy * cut * .55
  };
}

function svgEl(name, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)));
  return element;
}

function splitGraphTitle(text, maxChars = 11) {
  const value = String(text || "");
  if (value.length <= maxChars) return [value];
  const first = value.slice(0, maxChars);
  const rest = value.slice(maxChars, maxChars * 2);
  return [first, rest ? (value.length > maxChars * 2 ? `${rest.slice(0, maxChars - 1)}…` : rest) : ""].filter(Boolean);
}

function createGraphNode(node) {
  const group = svgEl("g", {
    class: `graph-node${node.isCenter ? " is-center" : ""}${node.status === "buried" ? " is-buried" : ""}`,
    transform: `translate(${node.graphX} ${node.graphY})`,
    "data-id": node.id,
    "data-stage": node.stage || "seed",
    tabindex: "0",
    role: "button",
    "aria-label": `${displayTitle(node)}。${stageInfo(node.stage).label}。${node.category || "未分類"}`
  });

  const rect = svgEl("rect", {
    class: "node-card",
    x: -GRAPH_NODE_W / 2,
    y: -GRAPH_NODE_H / 2,
    width: GRAPH_NODE_W,
    height: GRAPH_NODE_H,
    rx: node.isCenter ? 18 : 14,
    ry: node.isCenter ? 18 : 14
  });
  group.appendChild(rect);

  const icon = svgEl("text", {
    class: "node-icon",
    x: -GRAPH_NODE_W / 2 + 13,
    y: -GRAPH_NODE_H / 2 + 24
  });
  icon.textContent = stageInfo(node.stage).icon;
  group.appendChild(icon);

  const titleLines = splitGraphTitle(displayTitle(node));
  titleLines.forEach((line, index) => {
    const text = svgEl("text", {
      class: "node-title",
      x: -GRAPH_NODE_W / 2 + 41,
      y: -GRAPH_NODE_H / 2 + 20 + index * 14
    });
    text.textContent = line;
    group.appendChild(text);
  });

  const meta = svgEl("text", {
    class: "node-meta",
    x: -GRAPH_NODE_W / 2 + 13,
    y: GRAPH_NODE_H / 2 - 12
  });
  meta.textContent = `${node.category || "未分類"} ・ ${node.project || "未所属"}`;
  group.appendChild(meta);

  if (node.status !== "active") {
    const badge = svgEl("rect", {
      class: "node-badge",
      x: GRAPH_NODE_W / 2 - 47,
      y: GRAPH_NODE_H / 2 - 27,
      width: 37,
      height: 16,
      rx: 8
    });
    group.appendChild(badge);

    const statusText = svgEl("text", {
      class: "node-status",
      x: GRAPH_NODE_W / 2 - 28.5,
      y: GRAPH_NODE_H / 2 - 16,
      "text-anchor": "middle"
    });
    statusText.textContent = node.status === "buried" ? "墓地" : "標本";
    group.appendChild(statusText);
  }

  const activate = () => {
    if (graphMode === "focus" && node.id === graphFocusId) {
      openDetail(node.id);
      return;
    }
    graphFocusId = node.id;
    graphMode = "focus";
    renderGraphControls();
    renderRelationGraph({ fit: true });
  };

  group.addEventListener("click", (event) => {
    event.stopPropagation();
    activate();
  });
  group.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
  group.addEventListener("pointerdown", (event) => event.stopPropagation());

  return group;
}

function renderRelationGraph({ fit = false } = {}) {
  const svg = $("#relationGraph");
  const nodesGroup = $("#graphNodes");
  const edgesGroup = $("#graphEdges");
  const empty = $("#graphEmpty");
  const caption = $("#graphCaption");
  if (!svg || !nodesGroup || !edgesGroup || !empty || !caption) return;

  ensureGraphFocus();
  renderGraphControls();

  graphLayout = graphMode === "focus" ? buildFocusGraph() : buildFullGraph();
  nodesGroup.innerHTML = "";
  edgesGroup.innerHTML = "";

  if (!graphLayout.nodes.length) {
    empty.classList.remove("hidden");
    caption.textContent = "種を追加すると、ここに思考の繋がりが現れます。";
    return;
  }

  empty.classList.add("hidden");
  const nodeMap = new Map(graphLayout.nodes.map((node) => [node.id, node]));

  graphLayout.edges.forEach((edge) => {
    const source = nodeMap.get(edge.sourceIdeaId);
    const target = nodeMap.get(edge.targetIdeaId);
    if (!source || !target) return;
    const p = shortenEdge(source, target);
    const line = svgEl("line", {
      class: `graph-edge${edge.relationType === "derived" ? " is-derived" : ""}`,
      x1: p.x1,
      y1: p.y1,
      x2: p.x2,
      y2: p.y2
    });
    edgesGroup.appendChild(line);
  });

  graphLayout.nodes.forEach((node) => nodesGroup.appendChild(createGraphNode(node)));

  if (graphMode === "focus") {
    const focus = ideas.find((idea) => idea.id === graphFocusId);
    const relationCount = focus ? getRelationCount(focus.id) : 0;
    caption.textContent = focus
      ? `「${displayTitle(focus)}」を中心に、直接繋がっている ${relationCount} 件を表示中。周囲の種を押すと、その種へ中心が移ります。中心の種をもう一度押すと詳細を開きます。`
      : "";
  } else {
    const isolatedCount = graphLayout.nodes.filter((node) => getRelationCount(node.id) === 0).length;
    caption.textContent = `全 ${graphLayout.nodes.length} 件・繋がり ${graphLayout.edges.length} 本を表示中。関連のない種も外側に表示します。種を押すと、その種を中心にした表示へ移ります。${isolatedCount ? ` 未接続は ${isolatedCount} 件。` : ""}`;
  }

  requestAnimationFrame(() => {
    updateGraphTransform();
    if (fit || graphFitPending) {
      graphFitPending = false;
      fitGraphToViewport();
    }
  });
}

function graphViewportSize() {
  const svg = $("#relationGraph");
  const rect = svg?.getBoundingClientRect();
  return {
    width: Math.max(1, rect?.width || 1),
    height: Math.max(1, rect?.height || 1)
  };
}

function clampGraphScale(value) {
  return Math.max(GRAPH_MIN_SCALE, Math.min(GRAPH_MAX_SCALE, value));
}

function updateGraphTransform() {
  const world = $("#graphWorld");
  if (!world) return;
  world.setAttribute(
    "transform",
    `translate(${graphTransform.x} ${graphTransform.y}) scale(${graphTransform.scale})`
  );
}

function fitGraphToViewport() {
  if (!graphLayout.nodes.length) return;
  const { width, height } = graphViewportSize();
  const bounds = graphBounds();
  const graphW = Math.max(1, bounds.maxX - bounds.minX);
  const graphH = Math.max(1, bounds.maxY - bounds.minY);
  const padding = graphMode === "focus" ? 52 : 72;
  const scale = clampGraphScale(Math.min(
    (width - padding * 2) / graphW,
    (height - padding * 2) / graphH,
    graphMode === "focus" ? 1.15 : .96
  ));
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  graphTransform = {
    scale,
    x: width / 2 - cx * scale,
    y: height / 2 - cy * scale
  };
  updateGraphTransform();
}

function zoomGraphAt(factor, clientX = null, clientY = null) {
  const svg = $("#relationGraph");
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  const pointX = clientX == null ? rect.left + rect.width / 2 : clientX;
  const pointY = clientY == null ? rect.top + rect.height / 2 : clientY;
  const localX = pointX - rect.left;
  const localY = pointY - rect.top;

  const oldScale = graphTransform.scale;
  const newScale = clampGraphScale(oldScale * factor);
  if (Math.abs(newScale - oldScale) < .0001) return;

  const worldX = (localX - graphTransform.x) / oldScale;
  const worldY = (localY - graphTransform.y) / oldScale;
  graphTransform.scale = newScale;
  graphTransform.x = localX - worldX * newScale;
  graphTransform.y = localY - worldY * newScale;
  updateGraphTransform();
}

function graphPointerDown(event) {
  const svg = $("#relationGraph");
  if (!svg) return;
  graphPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  svg.setPointerCapture?.(event.pointerId);

  if (graphPointers.size === 1) {
    graphPanState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: graphTransform.x,
      originY: graphTransform.y
    };
    svg.classList.add("is-panning");
  } else if (graphPointers.size === 2) {
    const points = [...graphPointers.values()];
    const dx = points[1].x - points[0].x;
    const dy = points[1].y - points[0].y;
    graphPinchState = {
      distance: Math.hypot(dx, dy) || 1,
      scale: graphTransform.scale,
      midpointX: (points[0].x + points[1].x) / 2,
      midpointY: (points[0].y + points[1].y) / 2
    };
    graphPanState = null;
  }
}

function graphPointerMove(event) {
  if (!graphPointers.has(event.pointerId)) return;
  graphPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (graphPointers.size >= 2) {
    const points = [...graphPointers.values()].slice(0, 2);
    const dx = points[1].x - points[0].x;
    const dy = points[1].y - points[0].y;
    const distance = Math.hypot(dx, dy) || 1;
    const midpointX = (points[0].x + points[1].x) / 2;
    const midpointY = (points[0].y + points[1].y) / 2;

    if (!graphPinchState) {
      graphPinchState = {
        distance,
        scale: graphTransform.scale,
        midpointX,
        midpointY
      };
      return;
    }

    const targetScale = clampGraphScale(
      graphPinchState.scale * (distance / graphPinchState.distance)
    );
    const svg = $("#relationGraph");
    const rect = svg.getBoundingClientRect();
    const localX = midpointX - rect.left;
    const localY = midpointY - rect.top;
    const oldScale = graphTransform.scale;
    const worldX = (localX - graphTransform.x) / oldScale;
    const worldY = (localY - graphTransform.y) / oldScale;
    graphTransform.scale = targetScale;
    graphTransform.x = localX - worldX * targetScale;
    graphTransform.y = localY - worldY * targetScale;
    updateGraphTransform();
    return;
  }

  if (graphPanState && graphPanState.pointerId === event.pointerId) {
    graphTransform.x = graphPanState.originX + (event.clientX - graphPanState.startX);
    graphTransform.y = graphPanState.originY + (event.clientY - graphPanState.startY);
    updateGraphTransform();
  }
}

function graphPointerEnd(event) {
  graphPointers.delete(event.pointerId);
  const svg = $("#relationGraph");
  svg?.releasePointerCapture?.(event.pointerId);

  if (graphPointers.size < 2) graphPinchState = null;
  if (graphPointers.size === 1) {
    const [remainingId, point] = [...graphPointers.entries()][0];
    graphPanState = {
      pointerId: remainingId,
      startX: point.x,
      startY: point.y,
      originX: graphTransform.x,
      originY: graphTransform.y
    };
  } else if (graphPointers.size === 0) {
    graphPanState = null;
    svg?.classList.remove("is-panning");
  }
}

function switchGraphMode(mode) {
  if (!["focus", "all"].includes(mode) || graphMode === mode) return;
  graphMode = mode;
  renderGraphControls();
  renderRelationGraph({ fit: true });
}

/* ---------- Quick add / detail ---------- */

function openQuickAdd() {
  $("#quickAddModal").classList.remove("hidden");
  setTimeout(() => $("#quickBody").focus(), 30);
}

function closeModal(id) {
  $("#" + id).classList.add("hidden");
}

function resetQuickAdd() {
  $("#quickBody").value = "";
  $("#quickTitle").value = "";
  $("#quickProject").value = "";
  $("#quickCategory").value = "未分類";
  $("#quickMood").value = "未設定";
  const details = $(".optional-fields");
  if (details) details.open = false;
}

async function saveQuickIdea() {
  const body = $("#quickBody").value.trim();
  if (!body) {
    toast("一言だけでも種を書いてみて。");
    return;
  }

  const now = new Date().toISOString();
  const idea = {
    id: uid("idea"),
    title: $("#quickTitle").value.trim(),
    body,
    category: $("#quickCategory").value,
    stage: "seed",
    project: $("#quickProject").value.trim(),
    mood: $("#quickMood").value,
    memo: "",
    status: "active",
    createdAt: now,
    updatedAt: now,
    buriedAt: null
  };

  await put("ideas", idea);
  await reloadData();
  graphFocusId = idea.id;
  renderAll();
  resetQuickAdd();
  closeModal("quickAddModal");
  switchView("garden");
  toast("新しい種を植えました。");
}

function growthCopy(idea) {
  const categoryCopy = GROWTH[idea.category] || GROWTH.default;
  return categoryCopy[idea.stage] || GROWTH.default.seed;
}

function renderStageStrip(stageId) {
  $("#detailStage").innerHTML = STAGES.map((stage) => `
    <span class="stage-chip ${stage.id === stageId ? "is-current" : ""}">
      ${stage.icon} ${stage.label}
    </span>
  `).join("");
}

function renderGrowth(idea) {
  const [question, hint] = growthCopy(idea);
  const stage = stageInfo(idea.stage);
  $("#growthQuestion").textContent = question;
  $("#growthHint").textContent = hint;
  $("#stageOrb").textContent = stage.icon;

  const index = STAGES.findIndex((item) => item.id === idea.stage);
  $("#stageDown").disabled = index <= 0;
  $("#stageUp").disabled = index >= STAGES.length - 1;
  $("#stageUp").textContent = index >= STAGES.length - 1
    ? "開花済み"
    : `${STAGES[index + 1].label}に育てる`;
  renderStageStrip(idea.stage);
}

function relatedIdeaIds(ideaId) {
  return relations
    .filter((relation) =>
      relation.sourceIdeaId === ideaId || relation.targetIdeaId === ideaId
    )
    .map((relation) =>
      relation.sourceIdeaId === ideaId ? relation.targetIdeaId : relation.sourceIdeaId
    );
}

function renderRelations(ideaId) {
  const list = $("#relationList");
  const select = $("#relationTarget");
  list.innerHTML = "";
  select.innerHTML = "";

  const ids = relatedIdeaIds(ideaId);
  const related = ids
    .map((id) => ideas.find((idea) => idea.id === id))
    .filter(Boolean);

  if (!related.length) {
    const empty = document.createElement("div");
    empty.className = "relation-item";
    empty.textContent = "まだ他の種とは繋がっていません。";
    list.appendChild(empty);
  } else {
    related.forEach((idea) => {
      const relation = getRelationBetween(ideaId, idea.id);
      const row = document.createElement("div");
      row.className = "relation-item";
      const prefix = relation?.relationType === "derived"
        ? (relation.sourceIdeaId === ideaId ? "→" : "←")
        : "⌁";
      row.innerHTML = `
        <span>${prefix} ${stageInfo(idea.stage).icon} ${escapeHTML(displayTitle(idea))}</span>
        <button type="button" data-remove-relation="${idea.id}" aria-label="関連を外す">×</button>
      `;
      row.querySelector("button").addEventListener("click", () =>
        removeRelationBetween(ideaId, idea.id)
      );
      list.appendChild(row);
    });
  }

  const available = ideas.filter((idea) =>
    idea.id !== ideaId && !ids.includes(idea.id) && idea.status !== "buried"
  );
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = available.length
    ? "繋げたい種を選ぶ"
    : "繋げられる種がありません";
  select.appendChild(placeholder);

  available.forEach((idea) => {
    const option = document.createElement("option");
    option.value = idea.id;
    option.textContent = displayTitle(idea);
    select.appendChild(option);
  });
}

function openDetail(ideaId) {
  const idea = ideas.find((item) => item.id === ideaId);
  if (!idea) return;
  currentIdeaId = ideaId;
  graphFocusId = ideaId;

  $("#detailHeading").textContent = displayTitle(idea);
  $("#detailMeta").textContent = `${formatDate(idea.createdAt)} ・ ${idea.project || "未所属"}`;
  $("#detailTitle").value = idea.title || "";
  $("#detailBody").value = idea.body || "";
  $("#detailCategory").value = idea.category || "未分類";
  $("#detailProject").value = idea.project || "";
  $("#detailMood").value = idea.mood || "未設定";
  $("#detailStatus").value = idea.status || "active";
  $("#detailMemo").value = idea.memo || "";

  renderGrowth(idea);
  renderRelations(ideaId);
  $("#detailModal").classList.remove("hidden");
}

async function saveDetail() {
  const idea = ideas.find((item) => item.id === currentIdeaId);
  if (!idea) return;

  const oldStatus = idea.status;
  const newStatus = $("#detailStatus").value;
  idea.title = $("#detailTitle").value.trim();
  idea.body = $("#detailBody").value.trim();
  idea.category = $("#detailCategory").value;
  idea.project = $("#detailProject").value.trim();
  idea.mood = $("#detailMood").value;
  idea.status = newStatus;
  idea.memo = $("#detailMemo").value.trim();
  idea.updatedAt = new Date().toISOString();

  if (newStatus === "buried" && oldStatus !== "buried") {
    idea.buriedAt = new Date().toISOString();
  } else if (newStatus !== "buried") {
    idea.buriedAt = null;
  }

  await put("ideas", idea);
  await reloadData();
  renderAll();
  openDetail(idea.id);
  toast("変更を保存しました。");
}

async function changeStage(direction) {
  const idea = ideas.find((item) => item.id === currentIdeaId);
  if (!idea) return;
  const index = STAGES.findIndex((stage) => stage.id === idea.stage);
  const next = index + direction;
  if (next < 0 || next >= STAGES.length) return;

  idea.stage = STAGES[next].id;
  idea.updatedAt = new Date().toISOString();
  await put("ideas", idea);
  await reloadData();
  renderAll();
  openDetail(idea.id);
  toast(idea.stage === "flower"
    ? "花が開きました。"
    : `${stageInfo(idea.stage).label}に育ちました。`
  );
}

async function addRelation() {
  const targetId = $("#relationTarget").value;
  if (!currentIdeaId || !targetId || currentIdeaId === targetId) return;

  const exists = relations.some((relation) =>
    (relation.sourceIdeaId === currentIdeaId && relation.targetIdeaId === targetId) ||
    (relation.sourceIdeaId === targetId && relation.targetIdeaId === currentIdeaId)
  );

  if (exists) {
    toast("その種とはすでに繋がっています。");
    return;
  }

  await put("relations", {
    id: uid("rel"),
    sourceIdeaId: currentIdeaId,
    targetIdeaId: targetId,
    relationType: "related",
    createdAt: new Date().toISOString()
  });

  await reloadData();
  renderAll();
  renderRelations(currentIdeaId);
  toast("ふたつの種を繋げました。");
}

async function removeRelationBetween(a, b) {
  const relation = relations.find((item) =>
    (item.sourceIdeaId === a && item.targetIdeaId === b) ||
    (item.sourceIdeaId === b && item.targetIdeaId === a)
  );
  if (!relation) return;

  await remove("relations", relation.id);
  await reloadData();
  renderAll();
  renderRelations(a);
  toast("繋がりを外しました。");
}

async function duplicateIdea() {
  const source = ideas.find((item) => item.id === currentIdeaId);
  if (!source) return;

  const now = new Date().toISOString();
  const child = {
    ...source,
    id: uid("idea"),
    title: source.title ? `${source.title} - 派生` : "",
    stage: "seed",
    status: "active",
    createdAt: now,
    updatedAt: now,
    buriedAt: null
  };

  await put("ideas", child);
  await put("relations", {
    id: uid("rel"),
    sourceIdeaId: source.id,
    targetIdeaId: child.id,
    relationType: "derived",
    createdAt: now
  });

  await reloadData();
  graphFocusId = child.id;
  renderAll();
  openDetail(child.id);
  toast("ここから新しい種を落としました。");
}

async function deleteCurrentIdea() {
  const idea = ideas.find((item) => item.id === currentIdeaId);
  if (!idea) return;

  const ok = confirm(`「${displayTitle(idea)}」を完全に削除しますか？\n墓地ではなく、本当に消えます。`);
  if (!ok) return;

  const toDelete = relations.filter((relation) =>
    relation.sourceIdeaId === idea.id || relation.targetIdeaId === idea.id
  );
  for (const relation of toDelete) {
    await remove("relations", relation.id);
  }

  await remove("ideas", idea.id);
  currentIdeaId = null;
  if (graphFocusId === idea.id) graphFocusId = null;
  await reloadData();
  renderAll();
  closeModal("detailModal");
  toast("種を完全に削除しました。");
}

/* ---------- Navigation / events ---------- */

function switchView(target) {
  currentView = target;
  $$(".view").forEach((view) =>
    view.classList.toggle("is-active", view.dataset.view === target)
  );
  $$(".nav-item").forEach((item) =>
    item.classList.toggle("is-active", item.dataset.target === target)
  );

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (target === "search") {
    setTimeout(() => $("#searchInput").focus(), 80);
  }
  if (target === "settings") {
    renderSettingsControls();
  }
  if (target === "relations") {
    graphFitPending = true;
    renderRelationGraph({ fit: true });
  }
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add("hidden"), 2200);
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  $("#openQuickAdd").addEventListener("click", openQuickAdd);
  $("#saveQuickIdea").addEventListener("click", saveQuickIdea);
  $("#saveDetail").addEventListener("click", saveDetail);
  $("#stageDown").addEventListener("click", () => changeStage(-1));
  $("#stageUp").addEventListener("click", () => changeStage(1));
  $("#addRelation").addEventListener("click", addRelation);
  $("#duplicateIdea").addEventListener("click", duplicateIdea);
  $("#deleteIdea").addEventListener("click", deleteCurrentIdea);

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.target));
  });

  $$("[data-theme-mode]").forEach((button) => {
    button.addEventListener("click", () => selectThemeMode(button.dataset.themeMode));
  });

  $$("[data-background-mode]").forEach((button) => {
    button.addEventListener("click", () => selectBackgroundMode(button.dataset.backgroundMode));
  });

  $$("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });

  $$(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) backdrop.classList.add("hidden");
    });
  });

  $("#gardenStageFilter").addEventListener("change", renderGarden);
  $("#gardenCategoryFilter").addEventListener("change", renderGarden);
  $("#searchInput").addEventListener("input", renderSearch);
  $("#searchCategoryFilter").addEventListener("change", renderSearch);
  $("#searchStageFilter").addEventListener("change", renderSearch);

  $("#detailCategory").addEventListener("change", () => {
    const idea = ideas.find((item) => item.id === currentIdeaId);
    if (!idea) return;
    renderGrowth({ ...idea, category: $("#detailCategory").value });
  });

  $("#graphFocusMode").addEventListener("click", () => switchGraphMode("focus"));
  $("#graphAllMode").addEventListener("click", () => switchGraphMode("all"));
  $("#graphFocusSelect").addEventListener("change", (event) => {
    if (!event.target.value) return;
    graphFocusId = event.target.value;
    graphMode = "focus";
    renderGraphControls();
    renderRelationGraph({ fit: true });
  });

  $("#graphZoomIn").addEventListener("click", () => zoomGraphAt(1.25));
  $("#graphZoomOut").addEventListener("click", () => zoomGraphAt(0.8));
  $("#graphFit").addEventListener("click", fitGraphToViewport);

  const graph = $("#relationGraph");
  graph.addEventListener("pointerdown", graphPointerDown);
  graph.addEventListener("pointermove", graphPointerMove);
  graph.addEventListener("pointerup", graphPointerEnd);
  graph.addEventListener("pointercancel", graphPointerEnd);
  graph.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomGraphAt(event.deltaY < 0 ? 1.12 : 0.89, event.clientX, event.clientY);
  }, { passive: false });

  document.addEventListener("visibilitychange", handleVisibilityChange);

  const handleSystemThemeChange = () => {
    if (uiSettings.themeMode !== "system") return;
    applyTheme({ updateBackground: true });
  };

  if (typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(handleSystemThemeChange);
  }

  window.addEventListener("resize", () => {
    if (currentView === "relations") fitGraphToViewport();
  });
}

async function init() {
  const badge = $(".version-badge");
  if (badge) badge.textContent = `v${APP_VERSION}`;

  setupSelects();
  bindEvents();
  await initializeBackground();
  renderSettingsControls();

  try {
    db = await openDB();
    await reloadData();
    renderAll();
  } catch (error) {
    console.error(error);
    alert("保存領域を開けませんでした。ブラウザのプライベートモードやストレージ設定を確認してください。");
  }
}

document.addEventListener("DOMContentLoaded", init);
