const APP_VERSION = "6";
const DB_NAME = "idea_garden_db";
const DB_VERSION = 2;
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
  tagSort: "frequency",
  accent: "rose"
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

const FRAGMENT_KINDS = ["すべて", "未分類", "台詞", "言葉", "情景", "設定", "その他"];
const EDIT_FRAGMENT_KINDS = FRAGMENT_KINDS.filter((kind) => kind !== "すべて");

const DEFAULT_TAG_NAMES = [
  "可愛い", "不穏", "幻想", "奇妙", "暗い", "静か", "温かい", "日常", "退廃"
];

const GROWTH = {
  "キャラクター": {
    seed: ["この人物の核は見えてきた？", "「何を望み、なぜそういう人物なのか？」に答えられそうなら、芽にしてよさそう。"],
    sprout: ["この人物は作品の中で動き始めた？", "他者との関係や物語上の役割が見えてきたら、蕾へ。"],
    bud: ["もう実際に登場させられる？", "行動や台詞を書けるところまで輪郭が定まっていれば、開花してよさそう。"],
    flower: ["この花はもう使える状態。", "必要ならさらに書き足してもいいし、ここから別の種を派生させてもいい。"]
  },
  "世界観・設定": {
    seed: ["この世界・設定の本質は見えてきた？", "「これはつまり何なのか？」を一言で説明できそうなら、芽にしてよさそう。"],
    sprout: ["他の設定と繋がってきた？", "人物や物語へどんな影響を与えるのかが見えてきたら、蕾へ。"],
    bud: ["作品の中で矛盾なく使えそう？", "描写や説明へそのまま持ち込めるなら、開花。"],
    flower: ["この設定は作品へ持ち込める。", "さらに別設定の土台になったら、新しい種を落としてもいい。"]
  },
  "ストーリー・イベント": {
    seed: ["なぜこの出来事が起こるのか見えてきた？", "原因や発端が言葉にできるなら、芽にしてよさそう。"],
    sprout: ["この出来事が何を変えるのか見えてきた？", "誰に何を起こし、前後の展開とどう繋がるかが定まれば、蕾へ。"],
    bud: ["もうシーンとして書き始められる？", "登場人物・目的・前後関係が揃っていれば、開花。"],
    flower: ["この出来事はシーンとして使える。", "実際に書いたあとも、派生した出来事を新しい種として残せる。"]
  },
  "演出": {
    seed: ["この演出で何を感じさせたい？", "狙っている感情や印象が言葉になれば、芽へ。"],
    sprout: ["どの場面で、どう見せるか決まってきた？", "条件・タイミング・見せ方がまとまってきたら、蕾へ。"],
    bud: ["そのまま執筆・実装できる？", "実際の制作に移せる程度まで決まっていれば、開花。"],
    flower: ["この演出は使える状態。", "別の場面へ応用したいなら、新しい派生種にしてもいい。"]
  },
  "ゲームシステム": {
    seed: ["プレイヤーに何をさせる仕組み？", "遊びの中心行動が見えてきたら、芽へ。"],
    sprout: ["他のシステムや物語とどう関係する？", "報酬、進行、制約などとの繋がりが見えてきたら、蕾へ。"],
    bud: ["ルールとして実装できる？", "条件・入力・結果まで定義できていれば、開花。"],
    flower: ["この仕組みは実装へ持ち込める。", "試した結果の改善案は、別の種として残してもいい。"]
  },
  "UI・画面": {
    seed: ["この画面で何を見せ、何をさせたい？", "目的が言葉になれば、芽へ。"],
    sprout: ["情報の優先順位と操作の流れは見えた？", "どこを押し、何が変わるかが決まってきたら、蕾へ。"],
    bud: ["実際に画面として作れる？", "配置・操作・必要情報が揃っていれば、開花。"],
    flower: ["このUIは制作へ持ち込める。", "実装後に生まれた改善点は、新しい種にしてもいい。"]
  },
  "台詞": {
    seed: ["誰が、なぜこの言葉を言う？", "話者と感情の理由が見えてきたら、芽へ。"],
    sprout: ["どの場面で、誰に向けて言う？", "文脈と相手が定まってきたら、蕾へ。"],
    bud: ["実際のシーンへ組み込める？", "前後の流れに置けるなら、開花。"],
    flower: ["この台詞はシーンへ置ける状態。", "別の台詞や反応が生まれたら、そこから新しい種を作れる。"]
  },
  "ビジュアル": {
    seed: ["この見た目で何を表現したい？", "雰囲気や意味が見えてきたら、芽へ。"],
    sprout: ["作品や人物の意味と繋がった？", "色・形・モチーフの理由が定まってきたら、蕾へ。"],
    bud: ["デザインとして制作に移れる？", "必要な要素が揃っていれば、開花。"],
    flower: ["このビジュアルは制作へ持ち込める。", "差分や別案は派生種にしておける。"]
  },
  default: {
    seed: ["このアイデアの核は見えてきた？", "「これはつまり何なのか？」に答えられそうなら、芽にしてよさそう。"],
    sprout: ["他の要素とどう繋がるか見えてきた？", "作品の中での役割が見えてきたら、蕾へ。"],
    bud: ["もう実際に作品へ持ち込める？", "考える素材から使える素材になったなら、開花。"],
    flower: ["この花はもう使える状態。", "ここから別の種を派生させてもいい。"]
  }
};

const CATEGORY_FIELDS = {
  "キャラクター": {
    description: "人物を動かすための骨格だけを分けて置いておく欄。全部埋める必要はありません。",
    fields: [
      { key: "name", label: "名前", type: "text" },
      { key: "age", label: "年齢", type: "text" },
      { key: "role", label: "物語上の役割", type: "textarea", wide: true },
      { key: "personality", label: "性格・行動原理", type: "textarea", wide: true },
      { key: "appearance", label: "外見・特徴", type: "textarea", wide: true },
      { key: "past", label: "過去", type: "textarea", wide: true },
      { key: "desire", label: "望み・目的", type: "textarea", wide: true },
      { key: "relationships", label: "他者との関係", type: "textarea", wide: true },
      { key: "secret", label: "秘密・本人が隠していること", type: "textarea", wide: true },
      { key: "change", label: "物語を通した変化", type: "textarea", wide: true }
    ]
  },
  "世界観・設定": {
    description: "世界を成立させる前提、規則、社会と歴史を分けて考えられるようにした欄。",
    fields: [
      { key: "name", label: "世界・設定の呼び名", type: "text", wide: true },
      { key: "core", label: "この世界の核", type: "textarea", wide: true },
      { key: "rules", label: "法則・できること／できないこと", type: "textarea", wide: true },
      { key: "geography", label: "土地・場所・環境", type: "textarea", wide: true },
      { key: "society", label: "社会・文化・暮らし", type: "textarea", wide: true },
      { key: "history", label: "歴史・過去の出来事", type: "textarea", wide: true },
      { key: "magicTech", label: "魔法・技術・超常の仕組み", type: "textarea", wide: true },
      { key: "conflict", label: "対立・問題・禁忌", type: "textarea", wide: true },
      { key: "storyImpact", label: "物語や人物への影響", type: "textarea", wide: true }
    ]
  },
  "ストーリー・イベント": {
    description: "出来事そのものより、なぜ起きて何を変えるのかを整理する欄。",
    fields: [
      { key: "sceneName", label: "出来事・場面名", type: "text", wide: true },
      { key: "purpose", label: "この場面の目的", type: "textarea", wide: true },
      { key: "trigger", label: "起きるきっかけ", type: "textarea", wide: true },
      { key: "participants", label: "関わる人物", type: "textarea", wide: true },
      { key: "before", label: "直前の状態", type: "textarea", wide: true },
      { key: "event", label: "何が起きるか", type: "textarea", wide: true },
      { key: "outcome", label: "結果・失うもの／得るもの", type: "textarea", wide: true },
      { key: "after", label: "その後どう変わるか", type: "textarea", wide: true }
    ]
  },
  "演出": {
    description: "見せ方の狙いと、いつ・どう発生させるかを分けて置いておく欄。",
    fields: [
      { key: "scene", label: "使う場面", type: "text", wide: true },
      { key: "purpose", label: "感じさせたいこと", type: "textarea", wide: true },
      { key: "trigger", label: "発生条件・タイミング", type: "textarea", wide: true },
      { key: "visual", label: "画面・視覚表現", type: "textarea", wide: true },
      { key: "sound", label: "音・声・無音の使い方", type: "textarea", wide: true },
      { key: "duration", label: "長さ・テンポ", type: "text" },
      { key: "implementation", label: "実装・執筆メモ", type: "textarea", wide: true }
    ]
  },
  "ゲームシステム": {
    description: "プレイヤーが何をして、どう結果が返る仕組みなのかを整理する欄。",
    fields: [
      { key: "name", label: "システム名", type: "text", wide: true },
      { key: "playerAction", label: "プレイヤーがすること", type: "textarea", wide: true },
      { key: "purpose", label: "この仕組みの目的", type: "textarea", wide: true },
      { key: "rules", label: "基本ルール", type: "textarea", wide: true },
      { key: "input", label: "入力・条件", type: "textarea", wide: true },
      { key: "output", label: "結果・変化", type: "textarea", wide: true },
      { key: "reward", label: "報酬・手応え", type: "textarea", wide: true },
      { key: "limits", label: "制約・失敗条件", type: "textarea", wide: true },
      { key: "connections", label: "他システムとの関係", type: "textarea", wide: true }
    ]
  },
  "UI・画面": {
    description: "画面の目的、情報の優先順位、操作の流れを分けて考える欄。",
    fields: [
      { key: "screenName", label: "画面名", type: "text", wide: true },
      { key: "purpose", label: "この画面の目的", type: "textarea", wide: true },
      { key: "information", label: "表示する情報", type: "textarea", wide: true },
      { key: "priority", label: "最優先で見せるもの", type: "textarea", wide: true },
      { key: "actions", label: "できる操作", type: "textarea", wide: true },
      { key: "transition", label: "前後の画面遷移", type: "textarea", wide: true },
      { key: "states", label: "通常・選択・エラー等の状態", type: "textarea", wide: true }
    ]
  },
  "台詞": {
    description: "一言から場面へ育てるために、誰が誰へ何のために言うかを整理する欄。",
    fields: [
      { key: "speaker", label: "話す人", type: "text" },
      { key: "listener", label: "相手", type: "text" },
      { key: "scene", label: "場面", type: "textarea", wide: true },
      { key: "emotion", label: "感情", type: "textarea", wide: true },
      { key: "intent", label: "本当の意図", type: "textarea", wide: true },
      { key: "context", label: "前後の文脈", type: "textarea", wide: true }
    ]
  },
  "ビジュアル": {
    description: "見た目の断片を、モチーフ・色・意味へ分けて育てる欄。",
    fields: [
      { key: "subject", label: "対象", type: "text", wide: true },
      { key: "motif", label: "モチーフ・象徴", type: "textarea", wide: true },
      { key: "palette", label: "色・配色", type: "textarea", wide: true },
      { key: "shape", label: "形・シルエット", type: "textarea", wide: true },
      { key: "material", label: "素材・質感", type: "textarea", wide: true },
      { key: "meaning", label: "デザイン上の意味", type: "textarea", wide: true },
      { key: "reference", label: "参考・連想", type: "textarea", wide: true }
    ]
  },
  "その他": {
    description: "まだ分類しきれないけれど、少し整理しておきたいアイデア用。",
    fields: [
      { key: "core", label: "核になっていること", type: "textarea", wide: true },
      { key: "use", label: "どう使えそうか", type: "textarea", wide: true },
      { key: "questions", label: "まだ決めていないこと", type: "textarea", wide: true }
    ]
  },
  "未分類": {
    description: "カテゴリを決める前なので、ここでは項目を増やしません。フリースペースだけでも十分です。",
    fields: []
  }
};

let db;
let ideas = [];
let relations = [];
let fragments = [];
let tags = [];

let currentIdeaId = null;
let currentFragmentId = null;
let transferFragmentId = null;
let currentView = "timeline";
let fragmentKindFilter = "すべて";
let fragmentSelectedKind = "未分類";

let structuredDraft = {};
let quickSelectedTags = new Set();
let detailSelectedTags = new Set();
let fragmentSelectedTags = new Set();
const tagExpanded = { quick: false, detail: false, fragment: false };

let uiSettings = loadSettings();
let resolvedTheme = "light";
let currentBackgroundPath = "";
let activeBackgroundLayer = 0;
let backgroundTransitionTimer = null;
let rotationTimer = null;
let rotationRemainingMs = BACKGROUND_INTERVAL_MS;
let rotationStartedAt = null;
let lastFairytaleIndex = -1;

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/* Theme / background */
function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    return {
      themeMode: ["system", "light", "dark"].includes(parsed?.themeMode)
        ? parsed.themeMode : DEFAULT_SETTINGS.themeMode,
      backgroundMode: ["fairytale", "sky"].includes(parsed?.backgroundMode)
        ? parsed.backgroundMode : DEFAULT_SETTINGS.backgroundMode,
      tagSort: ["frequency", "recent"].includes(parsed?.tagSort)
        ? parsed.tagSort : DEFAULT_SETTINGS.tagSort
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
  $$("[data-tag-sort]").forEach((button) => {
    const selected = button.dataset.tagSort === uiSettings.tagSort;
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
  toast(mode === "system"
    ? "端末の表示設定と同期します。"
    : `${mode === "dark" ? "ダーク" : "ライト"}モードに固定しました。`);
}

function selectBackgroundMode(mode) {
  if (!["fairytale", "sky"].includes(mode) || uiSettings.backgroundMode === mode) return;
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

/* IndexedDB */
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
        const store = database.createObjectStore("relations", { keyPath: "id" });
        store.createIndex("sourceIdeaId", "sourceIdeaId");
        store.createIndex("targetIdeaId", "targetIdeaId");
      }
      if (!database.objectStoreNames.contains("fragments")) {
        const store = database.createObjectStore("fragments", { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt");
        store.createIndex("kind", "kind");
      }
      if (!database.objectStoreNames.contains("tags")) {
        const store = database.createObjectStore("tags", { keyPath: "id" });
        store.createIndex("name", "name", { unique: false });
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

async function seedDefaultTags() {
  const existing = await getAll("tags");
  if (existing.length) return;
  const now = new Date().toISOString();
  for (let index = 0; index < DEFAULT_TAG_NAMES.length; index += 1) {
    await put("tags", {
      id: `tag_default_${index + 1}`,
      name: DEFAULT_TAG_NAMES[index],
      createdAt: now
    });
  }
}

async function reloadData() {
  ideas = await getAll("ideas");
  relations = await getAll("relations");
  fragments = await getAll("fragments");
  tags = await getAll("tags");

  ideas.forEach((idea) => {
    if (!Array.isArray(idea.tags)) idea.tags = [];
    if (!idea.details || typeof idea.details !== "object") idea.details = {};
  });
  fragments.forEach((fragment) => {
    if (!Array.isArray(fragment.tags)) fragment.tags = [];
    if (!EDIT_FRAGMENT_KINDS.includes(fragment.kind)) fragment.kind = "未分類";
  });

  ideas.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  fragments.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  computeTagStats();
}

async function migrateLegacyMoods() {
  const nameMap = new Map(tags.map((tag) => [tag.name.trim().toLowerCase(), tag]));
  let changed = false;

  for (const idea of ideas) {
    if (!Object.prototype.hasOwnProperty.call(idea, "mood")) continue;
    const mood = String(idea.mood || "").trim();

    if (mood && mood !== "未設定") {
      let tag = nameMap.get(mood.toLowerCase());
      if (!tag) {
        tag = { id: uid("tag"), name: mood, createdAt: new Date().toISOString() };
        await put("tags", tag);
        tags.push(tag);
        nameMap.set(mood.toLowerCase(), tag);
      }
      if (!idea.tags.includes(tag.id)) {
        idea.tags.push(tag.id);
      }
    }

    /* v5 no longer uses mood; removing it prevents a deleted legacy tag from reappearing later. */
    delete idea.mood;
    await put("ideas", idea);
    changed = true;
  }

  if (changed) {
    await reloadData();
  }
}

/* Common data helpers */
function stageInfo(id) {
  return STAGES.find((stage) => stage.id === id) || STAGES[0];
}

function displayTitle(idea) {
  return idea.title?.trim() || idea.body?.trim().slice(0, 24) || "名もない種";
}

function formatDate(dateString) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric", month: "short", day: "numeric"
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

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRelationCount(ideaId) {
  return relations.filter((relation) =>
    relation.sourceIdeaId === ideaId || relation.targetIdeaId === ideaId
  ).length;
}

function tagById(id) {
  return tags.find((tag) => tag.id === id);
}

function tagNames(ids = []) {
  return ids.map((id) => tagById(id)?.name).filter(Boolean);
}

function computeTagStats() {
  const stats = new Map(tags.map((tag) => [tag.id, { count: 0, last: 0 }]));
  const apply = (item) => {
    const timestamp = new Date(item.updatedAt || item.createdAt || 0).getTime() || 0;
    (item.tags || []).forEach((tagId) => {
      if (!stats.has(tagId)) return;
      const stat = stats.get(tagId);
      stat.count += 1;
      stat.last = Math.max(stat.last, timestamp);
    });
  };
  ideas.forEach(apply);
  fragments.forEach(apply);
  tags.forEach((tag) => {
    const stat = stats.get(tag.id) || { count: 0, last: 0 };
    tag._usageCount = stat.count;
    tag._lastUsedAt = stat.last;
  });
}

function sortedTags() {
  const list = [...tags];
  if (uiSettings.tagSort === "recent") {
    return list.sort((a, b) =>
      (b._lastUsedAt || 0) - (a._lastUsedAt || 0) ||
      (b._usageCount || 0) - (a._usageCount || 0) ||
      a.name.localeCompare(b.name, "ja")
    );
  }
  return list.sort((a, b) =>
    (b._usageCount || 0) - (a._usageCount || 0) ||
    (b._lastUsedAt || 0) - (a._lastUsedAt || 0) ||
    a.name.localeCompare(b.name, "ja")
  );
}

/* Tag UI */
function selectedSetForContext(context) {
  if (context === "quick") return quickSelectedTags;
  if (context === "detail") return detailSelectedTags;
  return fragmentSelectedTags;
}

function renderTagSelector(context) {
  const container = $(`#${context}TagList`);
  if (!container) return;
  const expandButton = $(`[data-tag-expand="${context}"]`);
  if (expandButton) {
    expandButton.textContent = tagExpanded[context]
      ? "上位だけ"
      : (context === "detail" ? "タグを選ぶ" : "すべて");
  }
  const selected = selectedSetForContext(context);
  const ordered = sortedTags();
  const shown = tagExpanded[context]
    ? ordered
    : ordered.filter((tag, index) => index < 8 || selected.has(tag.id));

  container.innerHTML = "";
  if (!shown.length) {
    const note = document.createElement("span");
    note.className = "tag-empty-note";
    note.textContent = "設定からタグを作れます。";
    container.appendChild(note);
    return;
  }

  shown.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tag-chip${selected.has(tag.id) ? " is-selected" : ""}`;
    button.textContent = `# ${tag.name}`;
    button.addEventListener("click", () => {
      if (selected.has(tag.id)) selected.delete(tag.id);
      else selected.add(tag.id);
      renderTagSelector(context);
    });
    container.appendChild(button);
  });
}

function renderAllTagSelectors() {
  renderTagSelector("quick");
  renderTagSelector("detail");
  renderTagSelector("fragment");
}

function renderTagManageList() {
  const list = $("#tagManageList");
  if (!list) return;
  list.innerHTML = "";
  const ordered = sortedTags();

  if (!ordered.length) {
    list.innerHTML = `<div class="tag-empty-note">まだタグがありません。</div>`;
    return;
  }

  ordered.forEach((tag) => {
    const row = document.createElement("div");
    row.className = "tag-manage-item";
    row.innerHTML = `
      <div>
        <strong># ${escapeHTML(tag.name)}</strong>
        <small>${tag._usageCount || 0}件で使用</small>
      </div>
      <button type="button" aria-label="${escapeHTML(tag.name)}を削除">×</button>
    `;
    row.querySelector("button").addEventListener("click", () => deleteTag(tag.id));
    list.appendChild(row);
  });
}

async function createTag() {
  const input = $("#newTagInput");
  const name = input.value.trim().replace(/^#+\s*/, "");
  if (!name) return;
  if (tags.some((tag) => tag.name.toLowerCase() === name.toLowerCase())) {
    toast("同じ名前のタグがあります。");
    return;
  }
  await put("tags", {
    id: uid("tag"),
    name: name.slice(0, 24),
    createdAt: new Date().toISOString()
  });
  input.value = "";
  await reloadData();
  renderSettingsControls();
  renderTagManageList();
  renderAllTagSelectors();
  toast("タグを追加しました。");
}

async function deleteTag(tagId) {
  const tag = tagById(tagId);
  if (!tag) return;
  const ok = confirm(`タグ「${tag.name}」を削除しますか？\n庭やポストからもこのタグだけ外れます。`);
  if (!ok) return;

  for (const idea of ideas) {
    if (!idea.tags.includes(tagId)) continue;
    idea.tags = idea.tags.filter((id) => id !== tagId);
    await put("ideas", idea);
  }
  for (const fragment of fragments) {
    if (!fragment.tags.includes(tagId)) continue;
    fragment.tags = fragment.tags.filter((id) => id !== tagId);
    await put("fragments", fragment);
  }

  quickSelectedTags.delete(tagId);
  detailSelectedTags.delete(tagId);
  fragmentSelectedTags.delete(tagId);
  await remove("tags", tagId);
  await reloadData();
  renderAll();
  renderTagManageList();
  renderAllTagSelectors();
  toast("タグを削除しました。");
}

function selectTagSort(mode) {
  if (!["frequency", "recent"].includes(mode)) return;
  uiSettings.tagSort = mode;
  saveSettings();
  renderSettingsControls();
  renderTagManageList();
  renderAllTagSelectors();
}

/* Category picker */
function setCategoryPicker(context, category, { triggerChange = false } = {}) {
  if (!CATEGORIES.includes(category)) category = "未分類";

  if (triggerChange && context === "detail") {
    collectStructuredFields();
  }

  const hidden = $(`#${context}Category`);
  const trigger = $(`#${context}CategoryTrigger`);
  if (hidden) hidden.value = category;
  if (trigger) trigger.textContent = category;

  const menu = $(`#${context}CategoryMenu`);
  if (menu) {
    menu.querySelectorAll(".compact-picker-option").forEach((option) => {
      option.classList.toggle("is-selected", option.dataset.category === category);
    });
  }

  if (triggerChange && context === "detail") {
    renderStructuredFields(category);
    const idea = ideas.find((item) => item.id === currentIdeaId);
    if (idea) renderGrowth({ ...idea, category });
  }
}

function buildCategoryPickers() {
  ["quick", "detail", "transfer"].forEach((context) => {
    const menu = $(`#${context}CategoryMenu`);
    const trigger = $(`#${context}CategoryTrigger`);
    if (!menu || !trigger) return;

    menu.innerHTML = "";
    CATEGORIES.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "compact-picker-option";
      button.dataset.category = category;
      button.textContent = category;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        setCategoryPicker(context, category, { triggerChange: true });
        menu.classList.add("hidden");
        trigger.setAttribute("aria-expanded", "false");
      });
      menu.appendChild(button);
    });

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      closeCategoryMenus(context);
      const willOpen = menu.classList.contains("hidden");
      menu.classList.toggle("hidden", !willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  buildFilterCategoryPicker("gardenFilter", {
    hiddenId: "gardenCategoryFilter",
    triggerId: "gardenFilterCategoryTrigger",
    menuId: "gardenFilterCategoryMenu",
    allLabel: "すべてのカテゴリ",
    onChange: renderGarden
  });

  buildFilterCategoryPicker("searchFilter", {
    hiddenId: "searchCategoryFilter",
    triggerId: "searchFilterCategoryTrigger",
    menuId: "searchFilterCategoryMenu",
    allLabel: "カテゴリ指定なし",
    onChange: renderSearch
  });
}

function buildFilterCategoryPicker(context, config) {
  const hidden = $(`#${config.hiddenId}`);
  const trigger = $(`#${config.triggerId}`);
  const menu = $(`#${config.menuId}`);
  if (!hidden || !trigger || !menu) return;

  const options = [{ value: "all", label: config.allLabel }, ...CATEGORIES.map((category) => ({
    value: category,
    label: category
  }))];

  menu.innerHTML = "";
  options.forEach((optionData) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "compact-picker-option";
    button.dataset.category = optionData.value;
    button.textContent = optionData.label;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      hidden.value = optionData.value;
      trigger.textContent = optionData.label;
      menu.querySelectorAll(".compact-picker-option").forEach((item) => {
        item.classList.toggle("is-selected", item === button);
      });
      menu.classList.add("hidden");
      trigger.setAttribute("aria-expanded", "false");
      config.onChange();
    });
    menu.appendChild(button);
  });

  menu.querySelector('[data-category="all"]')?.classList.add("is-selected");
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    closeCategoryMenus(context);
    const willOpen = menu.classList.contains("hidden");
    menu.classList.toggle("hidden", !willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
}

function closeCategoryMenus(exceptContext = null) {
  const configs = [
    ["quickCategoryMenu", "quickCategoryTrigger", "quick"],
    ["detailCategoryMenu", "detailCategoryTrigger", "detail"],
    ["transferCategoryMenu", "transferCategoryTrigger", "transfer"],
    ["gardenFilterCategoryMenu", "gardenFilterCategoryTrigger", "gardenFilter"],
    ["searchFilterCategoryMenu", "searchFilterCategoryTrigger", "searchFilter"]
  ];
  configs.forEach(([menuId, triggerId, context]) => {
    if (context === exceptContext) return;
    $(`#${menuId}`)?.classList.add("hidden");
    $(`#${triggerId}`)?.setAttribute("aria-expanded", "false");
  });
}

/* Structured fields */
function collectStructuredFields() {
  const category = $("#detailCategory")?.value || "未分類";
  if (!structuredDraft[category] || typeof structuredDraft[category] !== "object") {
    structuredDraft[category] = {};
  }
  $$("#structuredFields [data-structured-key]").forEach((field) => {
    structuredDraft[category][field.dataset.structuredKey] = field.value;
  });
}

function renderStructuredFields(category) {
  const config = CATEGORY_FIELDS[category] || CATEGORY_FIELDS["未分類"];
  const categoryDraft = structuredDraft[category] && typeof structuredDraft[category] === "object"
    ? structuredDraft[category]
    : {};
  $("#structuredCategoryBadge").textContent = category;
  $("#structuredDescription").textContent = config.description;
  const fields = $("#structuredFields");
  fields.innerHTML = "";

  if (!config.fields.length) {
    fields.innerHTML = `<div class="tag-empty-note">このカテゴリでは専用欄はありません。フリースペースをそのまま使えます。</div>`;
    return;
  }

  config.fields.forEach((definition) => {
    const wrapper = document.createElement("label");
    wrapper.className = `structured-field${definition.wide ? " is-wide" : ""}`;
    const caption = document.createElement("span");
    caption.textContent = definition.label;
    wrapper.appendChild(caption);

    const field = document.createElement(definition.type === "textarea" ? "textarea" : "input");
    if (definition.type !== "textarea") field.type = "text";
    if (definition.type === "textarea") field.rows = 3;
    field.dataset.structuredKey = definition.key;
    field.value = categoryDraft[definition.key] || "";
    wrapper.appendChild(field);
    fields.appendChild(wrapper);
  });
}

/* Main cards / lists */
function createIdeaCard(idea) {
  const stage = stageInfo(idea.stage);
  const article = document.createElement("article");
  article.className = "idea-card";
  article.dataset.id = idea.id;
  const previewTags = tagNames(idea.tags).slice(0, 2);
  article.innerHTML = `
    <div class="card-top">
      <span class="stage-mark">${stage.icon}</span>
      <span class="card-category">${escapeHTML(idea.category || "未分類")}</span>
    </div>
    <h3>${escapeHTML(displayTitle(idea))}</h3>
    <p>${escapeHTML(idea.body || "まだ本文はありません。")}</p>
    <div class="card-bottom">
      <span class="stage-text">${stage.label}</span>
      <span class="card-tag-preview">
        ${previewTags.map((name) => `<span class="card-tag">#${escapeHTML(name)}</span>`).join("")}
      </span>
    </div>
  `;
  article.addEventListener("click", () => openDetail(idea.id));
  return article;
}

function createGraveCard(idea) {
  const article = document.createElement("article");
  article.className = "grave-card";
  article.innerHTML = `
    <h3>${escapeHTML(displayTitle(idea))}</h3>
    <p>${escapeHTML(idea.body || "")}</p>
    <span class="grave-date">${idea.buriedAt ? `${formatDate(idea.buriedAt)} 埋葬` : "眠っている種"}</span>
  `;
  article.addEventListener("click", () => openDetail(idea.id));
  return article;
}

function createFragmentCard(fragment, { compact = false } = {}) {
  const article = document.createElement("article");
  article.className = "fragment-card";
  const names = tagNames(fragment.tags);
  article.innerHTML = `
    <div class="fragment-card-main">
      <span class="fragment-kind">${escapeHTML(fragment.kind || "未分類")}</span>
      <p class="fragment-text">${escapeHTML(fragment.text || "")}</p>
      <div class="fragment-meta">
        <div class="fragment-tags">
          ${names.slice(0, compact ? 2 : 4).map((name) => `<span class="card-tag">#${escapeHTML(name)}</span>`).join("")}
        </div>
        <span>${escapeHTML(formatDate(fragment.updatedAt || fragment.createdAt))}</span>
      </div>
    </div>
    <div class="fragment-actions">
      <button class="grow-fragment" type="button">庭へ</button>
      <button class="edit-fragment" type="button">編集</button>
    </div>
  `;
  article.querySelector(".fragment-card-main").addEventListener("click", () => openFragmentModal(fragment.id));
  article.querySelector(".edit-fragment").addEventListener("click", () => openFragmentModal(fragment.id));
  article.querySelector(".grow-fragment").addEventListener("click", () => openTransferModal(fragment.id));
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

function renderFragmentKindFilter() {
  const row = $("#fragmentKindFilter");
  row.innerHTML = "";
  FRAGMENT_KINDS.forEach((kind) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = kind === fragmentKindFilter ? "is-selected" : "";
    button.textContent = kind;
    button.addEventListener("click", () => {
      fragmentKindFilter = kind;
      renderFragmentKindFilter();
      renderFragments();
    });
    row.appendChild(button);
  });
}

function renderFragments() {
  const list = $("#fragmentList");
  const empty = $("#fragmentEmpty");
  const query = $("#fragmentSearchInput").value.trim().toLowerCase();
  list.innerHTML = "";

  const filtered = fragments.filter((fragment) => {
    if (fragmentKindFilter !== "すべて" && fragment.kind !== fragmentKindFilter) return false;
    const haystack = `${fragment.text} ${fragment.kind} ${tagNames(fragment.tags).join(" ")}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  filtered.forEach((fragment) => list.appendChild(createFragmentCard(fragment)));
  empty.classList.toggle("hidden", filtered.length > 0);
}

function flattenDetailValues(value) {
  if (value == null) return [];
  if (typeof value === "string" || typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(flattenDetailValues);
  if (typeof value === "object") return Object.values(value).flatMap(flattenDetailValues);
  return [];
}

function renderSearch() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const category = $("#searchCategoryFilter").value;
  const stage = $("#searchStageFilter").value;

  const ideaGrid = $("#searchGrid");
  const fragmentList = $("#searchFragmentList");
  ideaGrid.innerHTML = "";
  fragmentList.innerHTML = "";

  const ideaResults = ideas.filter((idea) => {
    const haystack = [
      idea.title, idea.body, idea.memo, idea.project, idea.category,
      ...tagNames(idea.tags),
      ...flattenDetailValues(idea.details || {})
    ].join(" ").toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (category !== "all" && idea.category !== category) return false;
    if (stage !== "all" && idea.stage !== stage) return false;
    return true;
  });

  const fragmentResults = fragments.filter((fragment) => {
    const haystack = [fragment.text, fragment.kind, ...tagNames(fragment.tags)].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });

  ideaResults.forEach((idea) => ideaGrid.appendChild(createIdeaCard(idea)));
  fragmentResults.forEach((fragment) => fragmentList.appendChild(createFragmentCard(fragment, { compact: true })));
  $("#searchIdeaEmpty").classList.toggle("hidden", ideaResults.length > 0);
  $("#searchFragmentEmpty").classList.toggle("hidden", fragmentResults.length > 0);
}

function renderTodaySeed() {
  const card = $("#todayCard");
  const candidates = ideas.filter((idea) => idea.status === "active");
  if (!candidates.length) {
    card.innerHTML = `
      <div class="today-label">今日の種</div>
      <div class="today-title">まだ庭は空っぽです。</div>
      <p class="today-note">タイムラインから育てたくなったものを、庭へ送ってみてもいい。</p>
    `;
    return;
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of todayKey) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const sorted = [...candidates].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  const idea = sorted[hash % sorted.length];

  card.innerHTML = `
    <button type="button">
      <div class="today-label">今日の種</div>
      <div class="today-title">${escapeHTML(displayTitle(idea))}</div>
      <p class="today-note">${escapeHTML(daysAgo(idea.createdAt))}に植えたアイデアです。${getRelationCount(idea.id) ? `今は ${getRelationCount(idea.id)} 個の種と繋がっています。` : "まだ静かに一人で眠っています。"}</p>
    </button>
  `;
  card.querySelector("button").addEventListener("click", () => openDetail(idea.id));
}

function renderAll() {
  computeTagStats();
  renderGarden();
  renderFragments();
  renderSpecimens();
  renderCemetery();
  renderSearch();
  renderTodaySeed();
  renderTagManageList();
  renderAllTagSelectors();
}

/* Seed quick add */
function resetQuickAdd() {
  $("#quickBody").value = "";
  $("#quickTitle").value = "";
  $("#quickProject").value = "";
  quickSelectedTags = new Set();
  tagExpanded.quick = false;
  setCategoryPicker("quick", "未分類");
  const details = $(".optional-fields");
  if (details) details.open = false;
  renderTagSelector("quick");
}

function openQuickAddModal() {
  resetQuickAdd();
  $("#quickAddModal").classList.remove("hidden");
  setTimeout(() => $("#quickBody").focus(), 40);
}

async function saveQuickIdea() {
  const body = $("#quickBody").value.trim();
  if (!body) {
    toast("育てたいアイデアを一言だけでも書いてみて。");
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
    memo: "",
    details: {},
    tags: [...quickSelectedTags],
    status: "active",
    createdAt: now,
    updatedAt: now,
    buriedAt: null
  };
  await put("ideas", idea);
  await reloadData();
  renderAll();
  closeModal("quickAddModal");
  switchView("garden");
  toast("庭へ種を植えました。");
}

/* Fragment modal */
function renderFragmentKindChoices() {
  const row = $("#fragmentKindChoices");
  row.innerHTML = "";
  EDIT_FRAGMENT_KINDS.forEach((kind) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mini-choice${kind === fragmentSelectedKind ? " is-selected" : ""}`;
    button.textContent = kind;
    button.addEventListener("click", () => {
      fragmentSelectedKind = kind;
      renderFragmentKindChoices();
    });
    row.appendChild(button);
  });
}

function openFragmentModal(fragmentId = null) {
  currentFragmentId = fragmentId;
  const fragment = fragments.find((item) => item.id === fragmentId);
  fragmentSelectedKind = fragment?.kind || "未分類";
  fragmentSelectedTags = new Set(fragment?.tags || []);
  tagExpanded.fragment = false;

  $("#fragmentModalTitle").textContent = fragment ? "断片を編集" : "断片を置く";
  $("#fragmentText").value = fragment?.text || "";
  $("#deleteFragmentButton").classList.toggle("hidden", !fragment);
  renderFragmentKindChoices();
  renderTagSelector("fragment");
  $("#fragmentModal").classList.remove("hidden");
  setTimeout(() => $("#fragmentText").focus(), 40);
}

async function saveFragment() {
  const text = $("#fragmentText").value.trim();
  if (!text) {
    toast("一言だけでも書いておけます。");
    return;
  }
  const now = new Date().toISOString();
  const existing = fragments.find((item) => item.id === currentFragmentId);
  const fragment = existing ? {
    ...existing,
    text,
    kind: fragmentSelectedKind,
    tags: [...fragmentSelectedTags],
    updatedAt: now
  } : {
    id: uid("fragment"),
    text,
    kind: fragmentSelectedKind,
    tags: [...fragmentSelectedTags],
    createdAt: now,
    updatedAt: now
  };
  await put("fragments", fragment);
  await reloadData();
  renderAll();
  closeModal("fragmentModal");
  toast(existing ? "断片を更新しました。" : "断片を置きました。");
}

async function deleteCurrentFragment() {
  const fragment = fragments.find((item) => item.id === currentFragmentId);
  if (!fragment) return;
  const ok = confirm("この断片を削除しますか？");
  if (!ok) return;
  await remove("fragments", fragment.id);
  currentFragmentId = null;
  await reloadData();
  renderAll();
  closeModal("fragmentModal");
  toast("断片を削除しました。");
}

function suggestedCategoryForFragment(fragment) {
  if (fragment.kind === "台詞") return "台詞";
  if (fragment.kind === "情景") return "ビジュアル";
  if (fragment.kind === "設定") return "世界観・設定";
  return "未分類";
}

function openTransferModal(fragmentId) {
  const fragment = fragments.find((item) => item.id === fragmentId);
  if (!fragment) return;
  transferFragmentId = fragmentId;
  $("#transferPreview").textContent = fragment.text;
  $("#transferIdeaTitle").value = "";
  setCategoryPicker("transfer", suggestedCategoryForFragment(fragment));
  closeModal("fragmentModal");
  $("#transferModal").classList.remove("hidden");
}

async function confirmTransfer() {
  const fragment = fragments.find((item) => item.id === transferFragmentId);
  if (!fragment) return;
  const now = new Date().toISOString();
  const idea = {
    id: uid("idea"),
    title: $("#transferIdeaTitle").value.trim(),
    body: fragment.text,
    category: $("#transferCategory").value,
    stage: "seed",
    project: "",
    memo: "",
    details: {},
    tags: [...(fragment.tags || [])],
    status: "active",
    createdAt: now,
    updatedAt: now,
    buriedAt: null
  };
  await put("ideas", idea);
  await remove("fragments", fragment.id);
  transferFragmentId = null;
  await reloadData();
  renderAll();
  closeModal("transferModal");
  switchView("garden");
  openDetail(idea.id);
  toast("断片を庭へ移しました。");
}

/* Detail */
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
    .filter((relation) => relation.sourceIdeaId === ideaId || relation.targetIdeaId === ideaId)
    .map((relation) => relation.sourceIdeaId === ideaId ? relation.targetIdeaId : relation.sourceIdeaId);
}

function getRelationBetween(a, b) {
  return relations.find((relation) =>
    (relation.sourceIdeaId === a && relation.targetIdeaId === b) ||
    (relation.sourceIdeaId === b && relation.targetIdeaId === a));
}

function renderRelations(ideaId) {
  const list = $("#relationList");
  const select = $("#relationTarget");
  list.innerHTML = "";
  select.innerHTML = "";

  const ids = relatedIdeaIds(ideaId);
  const related = ids.map((id) => ideas.find((idea) => idea.id === id)).filter(Boolean);

  if (!related.length) {
    const empty = document.createElement("div");
    empty.className = "relation-item";
    empty.textContent = "まだ他の種とは繋がっていません。";
    list.appendChild(empty);
  } else {
    related.forEach((idea) => {
      const relation = getRelationBetween(ideaId, idea.id);
      const prefix = relation?.relationType === "derived"
        ? (relation.sourceIdeaId === ideaId ? "→" : "←") : "⌁";
      const row = document.createElement("div");
      row.className = "relation-item";
      row.innerHTML = `
        <span>${prefix} ${stageInfo(idea.stage).icon} ${escapeHTML(displayTitle(idea))}</span>
        <button type="button" aria-label="関連を外す">×</button>
      `;
      row.querySelector("button").addEventListener("click", () => removeRelationBetween(ideaId, idea.id));
      list.appendChild(row);
    });
  }

  const available = ideas.filter((idea) =>
    idea.id !== ideaId && !ids.includes(idea.id) && idea.status !== "buried");
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = available.length ? "繋げたい種を選ぶ" : "繋げられる種がありません";
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
  structuredDraft = JSON.parse(JSON.stringify(idea.details || {}));
  detailSelectedTags = new Set(idea.tags || []);
  tagExpanded.detail = false;

  $("#detailHeading").textContent = displayTitle(idea);
  $("#detailMeta").textContent = `${formatDate(idea.createdAt)} ・ ${idea.project || "未所属"}`;
  $("#detailTitle").value = idea.title || "";
  $("#detailBody").value = idea.body || "";
  $("#detailProject").value = idea.project || "";
  $("#detailStatus").value = idea.status || "active";
  $("#detailMemo").value = idea.memo || "";
  setCategoryPicker("detail", idea.category || "未分類");
  renderStructuredFields(idea.category || "未分類");
  renderTagSelector("detail");
  renderGrowth(idea);
  renderRelations(ideaId);
  $("#detailModal").classList.remove("hidden");
}

async function saveDetail() {
  const idea = ideas.find((item) => item.id === currentIdeaId);
  if (!idea) return;
  collectStructuredFields();

  const oldStatus = idea.status;
  const newStatus = $("#detailStatus").value;
  idea.title = $("#detailTitle").value.trim();
  idea.body = $("#detailBody").value.trim();
  idea.category = $("#detailCategory").value;
  idea.project = $("#detailProject").value.trim();
  idea.status = newStatus;
  idea.memo = $("#detailMemo").value.trim();
  idea.details = { ...structuredDraft };
  idea.tags = [...detailSelectedTags];
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
  toast(idea.stage === "flower" ? "花が開きました。" : `${stageInfo(idea.stage).label}に育ちました。`);
}

async function addRelation() {
  const targetId = $("#relationTarget").value;
  if (!currentIdeaId || !targetId || currentIdeaId === targetId) return;

  const exists = relations.some((relation) =>
    (relation.sourceIdeaId === currentIdeaId && relation.targetIdeaId === targetId) ||
    (relation.sourceIdeaId === targetId && relation.targetIdeaId === currentIdeaId));
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
    (item.sourceIdeaId === b && item.targetIdeaId === a));
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
  collectStructuredFields();
  const now = new Date().toISOString();
  const child = {
    ...source,
    id: uid("idea"),
    title: source.title ? `${source.title} - 派生` : "",
    stage: "seed",
    status: "active",
    details: { ...structuredDraft },
    tags: [...detailSelectedTags],
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
    relation.sourceIdeaId === idea.id || relation.targetIdeaId === idea.id);
  for (const relation of toDelete) await remove("relations", relation.id);
  await remove("ideas", idea.id);
  currentIdeaId = null;
  await reloadData();
  renderAll();
  closeModal("detailModal");
  toast("種を完全に削除しました。");
}

/* Navigation */
function closeModal(id) {
  $("#" + id)?.classList.add("hidden");
  closeCategoryMenus();
}

function switchView(target) {
  currentView = target;
  $$(".view").forEach((view) =>
    view.classList.toggle("is-active", view.dataset.view === target));
  $$(".nav-item").forEach((item) =>
    item.classList.toggle("is-active", item.dataset.target === target));
  window.scrollTo({ top: 0, behavior: "smooth" });

  const add = $("#openQuickAdd");
  if (add) {
    add.setAttribute("aria-label", target === "fragments" ? "断片を追加する" : "種を追加する");
  }
  if (target === "search") setTimeout(() => $("#searchInput").focus(), 70);
  if (target === "settings") {
    renderSettingsControls();
    renderTagManageList();
  }
}

function handleFloatingAdd() {
  if (currentView === "fragments") openFragmentModal();
  else openQuickAddModal();
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add("hidden"), 2100);
}

/* iPhone interaction guards */
function isEditableTarget(target) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function bindInteractionGuards() {
  document.addEventListener("contextmenu", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  });
  document.addEventListener("selectstart", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  });
  document.addEventListener("dragstart", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  });
  document.addEventListener("dblclick", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  }, { passive: false });
  document.addEventListener("gesturestart", (event) => {
    event.preventDefault();
  }, { passive: false });
}

/* Events */
function bindEvents() {
  $("#openQuickAdd").addEventListener("click", handleFloatingAdd);
  $("#saveQuickIdea").addEventListener("click", saveQuickIdea);

  $("#saveFragmentButton").addEventListener("click", saveFragment);
  $("#deleteFragmentButton").addEventListener("click", deleteCurrentFragment);
  $("#confirmTransferButton").addEventListener("click", confirmTransfer);

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
  $$("[data-tag-sort]").forEach((button) => {
    button.addEventListener("click", () => selectTagSort(button.dataset.tagSort));
  });

  $$("[data-tag-expand]").forEach((button) => {
    button.addEventListener("click", () => {
      const context = button.dataset.tagExpand;
      tagExpanded[context] = !tagExpanded[context];
      button.textContent = tagExpanded[context] ? "上位だけ" : (context === "detail" ? "タグを選ぶ" : "すべて");
      renderTagSelector(context);
    });
  });

  $("#createTagButton").addEventListener("click", createTag);
  $("#newTagInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createTag();
    }
  });

  $$("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });
  $$(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        backdrop.classList.add("hidden");
        closeCategoryMenus();
      }
    });
  });

  $("#gardenStageFilter").addEventListener("change", renderGarden);
  $("#fragmentSearchInput").addEventListener("input", renderFragments);
  $("#searchInput").addEventListener("input", renderSearch);
  $("#searchStageFilter").addEventListener("change", renderSearch);

  document.addEventListener("click", () => closeCategoryMenus());
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

  bindInteractionGuards();
}

/* Initial setup */
async function init() {
  $(".version-badge").textContent = `v${APP_VERSION}`;
  buildCategoryPickers();
  renderFragmentKindFilter();
  bindEvents();
  await initializeBackground();

  try {
    db = await openDB();
    await seedDefaultTags();
    await reloadData();
    await migrateLegacyMoods();
    renderSettingsControls();
    renderAll();
  } catch (error) {
    console.error(error);
    alert("保存領域を開けませんでした。ブラウザのプライベートモードやストレージ設定を確認してください。");
  }
}



/* =========================================================
   v6: personal creative SNS layer
   The old v5 fragment store is intentionally reused as posts.
   ========================================================= */

const ACCOUNT_KEY = "idea_garden_accounts_v6";
const ACTIVE_ACCOUNT_KEY = "idea_garden_active_account_v6";
const ACCENTS = ["rose", "mint", "blue", "violet", "amber", "coral"];

let accounts = loadAccounts();
let activeAccountId = loadActiveAccountId();
let timelineFilter = "all";
let threadPostId = null;
let quoteTargetId = null;
let draftFromInline = false;

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    return {
      themeMode: ["system", "light", "dark"].includes(parsed?.themeMode)
        ? parsed.themeMode : DEFAULT_SETTINGS.themeMode,
      tagSort: ["frequency", "recent"].includes(parsed?.tagSort)
        ? parsed.tagSort : DEFAULT_SETTINGS.tagSort,
      accent: ["rose", "mint", "blue", "violet", "amber", "coral"].includes(parsed?.accent) ? parsed.accent : DEFAULT_SETTINGS.accent
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function loadAccounts() {
  const fallback = [{ id: "account_main", name: "メイン", handle: "main", avatar: "✦" }];
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null");
    if (!Array.isArray(parsed) || !parsed.length) return fallback;
    const cleaned = parsed
      .filter((item) => item && item.id && item.name)
      .map((item) => ({
        id: String(item.id),
        name: String(item.name).slice(0, 24),
        handle: sanitizeHandle(item.handle || item.name),
        avatar: String(item.avatar || "✦").slice(0, 4)
      }));
    return cleaned.length ? cleaned : fallback;
  } catch {
    return fallback;
  }
}

function saveAccounts() {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
}

function loadActiveAccountId() {
  const stored = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  return accounts.some((account) => account.id === stored) ? stored : accounts[0].id;
}

function saveActiveAccountId() {
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, activeAccountId);
}

function sanitizeHandle(value = "") {
  const cleaned = String(value)
    .trim()
    .replace(/^@+/, "")
    .replace(/\s+/g, "_")
    .replace(/[^0-9A-Za-z_ぁ-んァ-ン一-龯ー]/g, "")
    .slice(0, 24);
  return cleaned || "memo";
}

function accountById(id) {
  return accounts.find((account) => account.id === id) || accounts[0];
}

function activeAccount() {
  return accountById(activeAccountId);
}

function resolveTheme() {
  if (uiSettings.themeMode === "light") return "light";
  if (uiSettings.themeMode === "dark") return "dark";
  return systemThemeQuery.matches ? "dark" : "light";
}

function applyTheme() {
  resolvedTheme = resolveTheme();
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themeMode = uiSettings.themeMode;
  document.documentElement.dataset.accent = uiSettings.accent || "rose";
  const themeColor = $("meta[name='theme-color']");
  if (themeColor) {
    themeColor.setAttribute("content", resolvedTheme === "dark" ? "#101114" : "#ffffff");
  }
  renderSettingsControls();
}

function renderSettingsControls() {
  $$('[data-theme-mode]').forEach((button) => {
    const selected = button.dataset.themeMode === uiSettings.themeMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  $$('[data-tag-sort]').forEach((button) => {
    const selected = button.dataset.tagSort === uiSettings.tagSort;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });
  $$('[data-accent]').forEach((button) => {
    const selected = button.dataset.accent === uiSettings.accent;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });

  const status = $("#settingsStatus");
  if (status) {
    const themeText = uiSettings.themeMode === "system"
      ? `端末と同期中・現在は${resolvedTheme === "dark" ? "ダーク" : "ライト"}`
      : `${resolvedTheme === "dark" ? "ダーク" : "ライト"}固定`;
    const account = activeAccount();
    status.textContent = `${themeText} ／ 投稿アカウント：${account.name}`;
  }
}

function selectThemeMode(mode) {
  if (!["system", "light", "dark"].includes(mode)) return;
  uiSettings.themeMode = mode;
  saveSettings();
  applyTheme();
  toast(mode === "system" ? "端末の表示設定と同期します。" : `${mode === "dark" ? "ダーク" : "ライト"}表示に固定しました。`);
}

function selectAccent(accent) {
  if (!ACCENTS.includes(accent)) return;
  uiSettings.accent = accent;
  saveSettings();
  applyTheme();
}

async function migratePostsV6() {
  let changed = false;
  const fallbackId = accounts[0].id;
  for (const post of fragments) {
    let dirty = false;
    if (!accounts.some((account) => account.id === post.accountId)) {
      post.accountId = fallbackId;
      dirty = true;
    }
    if (!Object.prototype.hasOwnProperty.call(post, "parentId")) { post.parentId = null; dirty = true; }
    if (!Object.prototype.hasOwnProperty.call(post, "quoteId")) { post.quoteId = null; dirty = true; }
    if (!Object.prototype.hasOwnProperty.call(post, "liked")) { post.liked = false; dirty = true; }
    if (!Object.prototype.hasOwnProperty.call(post, "picked")) { post.picked = false; dirty = true; }
    if (!Object.prototype.hasOwnProperty.call(post, "bookmarked")) { post.bookmarked = false; dirty = true; }
    if (!Object.prototype.hasOwnProperty.call(post, "gardenIdeaId")) { post.gardenIdeaId = null; dirty = true; }
    if (dirty) {
      await put("fragments", post);
      changed = true;
    }
  }
  if (changed) await reloadData();
}

function formatPostTime(dateString) {
  const date = new Date(dateString || 0);
  const diff = Date.now() - date.getTime();
  if (!Number.isFinite(diff) || diff < 0) return "今";
  const minute = 60000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "今";
  if (diff < hour) return `${Math.floor(diff / minute)}分`;
  if (diff < day) return `${Math.floor(diff / hour)}時間`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}日`;
  return new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(date);
}

function topLevelPostId(post) {
  return post?.parentId || post?.id || null;
}

function replyCount(postId) {
  return fragments.filter((post) => post.parentId === postId).length;
}

function quotePostById(id) {
  return fragments.find((post) => post.id === id) || null;
}

function postGardenIdea(post) {
  return post?.gardenIdeaId ? ideas.find((idea) => idea.id === post.gardenIdeaId) : null;
}

function renderQuoteBlock(post) {
  if (!post?.quoteId) return "";
  const quoted = quotePostById(post.quoteId);
  if (!quoted) return `<div class="quoted-post unavailable">引用元のポストは削除されています。</div>`;
  const account = accountById(quoted.accountId);
  return `
    <div class="quoted-post" data-quote-open="${quoted.id}">
      <div class="quoted-head"><span>${escapeHTML(account.avatar)}</span><strong>${escapeHTML(account.name)}</strong><small>@${escapeHTML(account.handle)}</small></div>
      <p>${escapeHTML(quoted.text || "")}</p>
    </div>
  `;
}

function createPostCard(post, { compact = false, thread = false } = {}) {
  const article = document.createElement("article");
  article.className = `post-card${compact ? " is-compact" : ""}${thread ? " is-thread" : ""}${post.parentId ? " is-reply" : ""}`;
  article.dataset.id = post.id;
  const account = accountById(post.accountId);
  const names = tagNames(post.tags || []);
  const replies = replyCount(post.id);
  const inGarden = Boolean(postGardenIdea(post));

  article.innerHTML = `
    <div class="post-avatar-col">
      <span class="account-avatar">${escapeHTML(account.avatar)}</span>
      ${post.parentId ? '<span class="reply-thread-line"></span>' : ''}
    </div>
    <div class="post-main">
      <header class="post-head">
        <div class="post-author-line">
          <strong>${escapeHTML(account.name)}</strong>
          <span>@${escapeHTML(account.handle)}</span>
          <span>·</span>
          <span>${escapeHTML(formatPostTime(post.createdAt))}</span>
        </div>
        ${compact ? "" : `<button class="post-more" type="button" aria-label="ポストを編集">•••</button>`}
      </header>
      ${post.parentId ? '<div class="reply-label">返信</div>' : ''}
      <p class="post-text">${escapeHTML(post.text || "")}</p>
      ${renderQuoteBlock(post)}
      ${names.length ? `<div class="post-tags">${names.slice(0, compact ? 2 : 5).map((name) => `<span>#${escapeHTML(name)}</span>`).join("")}</div>` : ""}
      ${inGarden ? '<div class="post-garden-mark">🌱 庭へ送信済み</div>' : ""}
      ${compact ? "" : `
        <div class="post-actions" aria-label="ポスト操作">
          <button class="post-action reply-action" type="button" aria-label="返信"><span>○</span><small>${replies || ""}</small></button>
          <button class="post-action like-action${post.liked ? " is-active" : ""}" type="button" aria-label="好き"><span>♡</span></button>
          <button class="post-action pick-action${post.picked ? " is-active" : ""}" type="button" aria-label="拾う"><span>♧</span><small>${post.picked ? "拾った" : ""}</small></button>
          <button class="post-action bookmark-action${post.bookmarked ? " is-active" : ""}" type="button" aria-label="保存"><span>⌑</span></button>
        </div>
      `}
    </div>
  `;

  const open = () => openThread(topLevelPostId(post), { focusReply: false });
  article.querySelector(".post-text")?.addEventListener("click", open);
  article.querySelector(".post-head")?.addEventListener("click", (event) => {
    if (!event.target.closest("button")) open();
  });
  article.querySelector(".post-avatar-col")?.addEventListener("click", open);
  article.querySelector(".post-more")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openFragmentModal(post.id);
  });
  article.querySelector(".reply-action")?.addEventListener("click", (event) => {
    event.stopPropagation();
    openThread(topLevelPostId(post), { focusReply: true });
  });
  article.querySelector(".like-action")?.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePostFlag(post.id, "liked");
  });
  article.querySelector(".pick-action")?.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePostFlag(post.id, "picked");
  });
  article.querySelector(".bookmark-action")?.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePostFlag(post.id, "bookmarked");
  });
  article.querySelectorAll("[data-quote-open]").forEach((block) => {
    block.addEventListener("click", (event) => {
      event.stopPropagation();
      const quoted = quotePostById(block.dataset.quoteOpen);
      if (quoted) openThread(topLevelPostId(quoted), { focusReply: false });
    });
  });
  return article;
}

async function togglePostFlag(postId, field) {
  const post = fragments.find((item) => item.id === postId);
  if (!post || !["liked", "picked", "bookmarked"].includes(field)) return;
  post[field] = !post[field];
  post.updatedAt = new Date().toISOString();
  await put("fragments", post);
  await reloadData();
  renderAll();
  if (threadPostId && !$("#threadModal").classList.contains("hidden")) renderThread();
}

function renderTimelineProfile() {
  const account = activeAccount();
  $("#activeAccountAvatar").textContent = account.avatar;
  $("#activeAccountName").textContent = account.name;
  $("#activeAccountHandle").textContent = `@${account.handle}`;
  $("#composerAvatar").textContent = account.avatar;
  $("#replyAvatar").textContent = account.avatar;
}

function renderTimelineTabs() {
  $$('[data-timeline-filter]').forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.timelineFilter === timelineFilter);
  });
}

function renderTimeline() {
  const list = $("#timelineList");
  const empty = $("#timelineEmpty");
  if (!list || !empty) return;
  list.innerHTML = "";
  let posts = fragments.filter((post) => !post.parentId);

  if (timelineFilter === "account") {
    posts = posts.filter((post) => post.accountId === activeAccountId);
  } else if (timelineFilter === "picked") {
    posts = fragments.filter((post) => post.picked);
  } else if (timelineFilter === "bookmarked") {
    posts = fragments.filter((post) => post.bookmarked);
  }

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  posts.forEach((post) => list.appendChild(createPostCard(post)));
  empty.classList.toggle("hidden", posts.length > 0);
  renderTimelineProfile();
  renderTimelineTabs();
}

function renderPickedShelf() {
  const shelf = $("#pickedShelf");
  const container = $("#pickedPostList");
  if (!shelf || !container) return;
  const picked = fragments
    .filter((post) => post.picked && !postGardenIdea(post))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  $("#pickedCount").textContent = String(picked.length);
  shelf.classList.toggle("hidden", picked.length === 0);
  container.innerHTML = "";

  picked.forEach((post) => {
    const account = accountById(post.accountId);
    const row = document.createElement("div");
    row.className = "picked-post-row";
    row.innerHTML = `
      <span class="account-avatar tiny">${escapeHTML(account.avatar)}</span>
      <button class="picked-post-text" type="button">${escapeHTML(post.text || "")}</button>
      <button class="picked-to-garden" type="button">種にする</button>
      <button class="picked-dismiss" type="button" aria-label="拾った印を外す">×</button>
    `;
    row.querySelector(".picked-post-text").addEventListener("click", () => openThread(topLevelPostId(post)));
    row.querySelector(".picked-to-garden").addEventListener("click", () => openTransferModal(post.id));
    row.querySelector(".picked-dismiss").addEventListener("click", () => togglePostFlag(post.id, "picked"));
    container.appendChild(row);
  });
}

function renderSearch() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const category = $("#searchCategoryFilter").value;
  const stage = $("#searchStageFilter").value;
  const ideaGrid = $("#searchGrid");
  const postList = $("#searchFragmentList");
  ideaGrid.innerHTML = "";
  postList.innerHTML = "";

  const ideaResults = ideas.filter((idea) => {
    const haystack = [
      idea.title, idea.body, idea.memo, idea.project, idea.category,
      ...tagNames(idea.tags), ...flattenDetailValues(idea.details || {})
    ].join(" ").toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (category !== "all" && idea.category !== category) return false;
    if (stage !== "all" && idea.stage !== stage) return false;
    return true;
  });

  const postResults = fragments.filter((post) => {
    const account = accountById(post.accountId);
    const haystack = [post.text, post.kind, account.name, account.handle, ...tagNames(post.tags)].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });

  postResults.forEach((post) => postList.appendChild(createPostCard(post, { compact: true })));
  ideaResults.forEach((idea) => ideaGrid.appendChild(createIdeaCard(idea)));
  $("#searchFragmentEmpty").classList.toggle("hidden", postResults.length > 0);
  $("#searchIdeaEmpty").classList.toggle("hidden", ideaResults.length > 0);
}

function renderAll() {
  computeTagStats();
  renderTimeline();
  renderGarden();
  renderPickedShelf();
  renderSpecimens();
  renderCemetery();
  renderSearch();
  renderTodaySeed();
  renderTagManageList();
  renderAllTagSelectors();
  renderAccountSwitchList();
  renderAccountManageList();
}

async function submitTimelinePost() {
  const input = $("#timelineComposer");
  const text = input.value.trim();
  if (!text) return;
  const now = new Date().toISOString();
  await put("fragments", {
    id: uid("post"),
    text,
    kind: "未分類",
    tags: [],
    accountId: activeAccountId,
    parentId: null,
    quoteId: null,
    liked: false,
    picked: false,
    bookmarked: false,
    gardenIdeaId: null,
    createdAt: now,
    updatedAt: now
  });
  input.value = "";
  input.style.height = "";
  await reloadData();
  renderAll();
}

function populatePostAccountSelect(selectedId = activeAccountId) {
  const select = $("#postAccountSelect");
  if (!select) return;
  select.innerHTML = "";
  accounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = `${account.avatar} ${account.name}  @${account.handle}`;
    select.appendChild(option);
  });
  select.value = accounts.some((account) => account.id === selectedId) ? selectedId : activeAccountId;
  const account = accountById(select.value);
  $("#postEditorAvatar").textContent = account.avatar;
}

function renderPostQuotePreview() {
  const preview = $("#quotePreview");
  if (!preview) return;
  const quoted = quotePostById(quoteTargetId);
  preview.classList.toggle("hidden", !quoted);
  if (!quoted) {
    preview.innerHTML = "";
    return;
  }
  const account = accountById(quoted.accountId);
  preview.innerHTML = `<small>引用</small><strong>${escapeHTML(account.name)} <span>@${escapeHTML(account.handle)}</span></strong><p>${escapeHTML(quoted.text || "")}</p>`;
}

function openFragmentModal(fragmentId = null, options = {}) {
  currentFragmentId = fragmentId;
  const post = fragments.find((item) => item.id === fragmentId);
  quoteTargetId = options.quoteId || post?.quoteId || null;
  draftFromInline = Boolean(options.fromInline);
  fragmentSelectedKind = post?.kind || "未分類";
  fragmentSelectedTags = new Set(post?.tags || []);
  tagExpanded.fragment = false;

  $("#fragmentModalTitle").textContent = post ? "ポストを編集" : (quoteTargetId ? "引用してポスト" : "ポストする");
  $("#fragmentText").value = post?.text || (options.prefill ?? "");
  $("#saveFragmentButton").textContent = post ? "保存" : "ポスト";
  $("#deleteFragmentButton").classList.toggle("hidden", !post);
  populatePostAccountSelect(post?.accountId || activeAccountId);
  renderFragmentKindChoices();
  renderTagSelector("fragment");
  renderPostQuotePreview();
  $("#fragmentModal").classList.remove("hidden");
  setTimeout(() => $("#fragmentText").focus(), 40);
}

async function saveFragment() {
  const text = $("#fragmentText").value.trim();
  if (!text && !quoteTargetId) {
    toast("一言だけでも書いておけます。");
    return;
  }
  const now = new Date().toISOString();
  const existing = fragments.find((item) => item.id === currentFragmentId);
  const accountId = $("#postAccountSelect").value || activeAccountId;
  const post = existing ? {
    ...existing,
    text,
    kind: fragmentSelectedKind,
    tags: [...fragmentSelectedTags],
    accountId,
    quoteId: quoteTargetId,
    updatedAt: now
  } : {
    id: uid("post"),
    text,
    kind: fragmentSelectedKind,
    tags: [...fragmentSelectedTags],
    accountId,
    parentId: null,
    quoteId: quoteTargetId,
    liked: false,
    picked: false,
    bookmarked: false,
    gardenIdeaId: null,
    createdAt: now,
    updatedAt: now
  };
  await put("fragments", post);
  if (!existing && draftFromInline) {
    $("#timelineComposer").value = "";
    $("#timelineComposer").style.height = "";
  }
  currentFragmentId = null;
  quoteTargetId = null;
  draftFromInline = false;
  await reloadData();
  renderAll();
  closeModal("fragmentModal");
  if (threadPostId && !$("#threadModal").classList.contains("hidden")) renderThread();
  toast(existing ? "ポストを更新しました。" : "ポストしました。");
}

async function deleteCurrentFragment() {
  const post = fragments.find((item) => item.id === currentFragmentId);
  if (!post) return;
  const ok = confirm("このポストを削除しますか？");
  if (!ok) return;
  const rootId = post.id;
  const children = fragments.filter((item) => item.parentId === rootId);
  for (const child of children) await remove("fragments", child.id);
  await remove("fragments", rootId);
  currentFragmentId = null;
  if (threadPostId === rootId) threadPostId = null;
  await reloadData();
  renderAll();
  closeModal("fragmentModal");
  closeModal("threadModal");
  toast("ポストを削除しました。");
}

function openThread(postId, { focusReply = false } = {}) {
  const root = fragments.find((post) => post.id === postId);
  if (!root) return;
  threadPostId = root.id;
  renderThread();
  $("#threadModal").classList.remove("hidden");
  if (focusReply) setTimeout(() => $("#replyText").focus(), 50);
}

function renderThread() {
  const root = fragments.find((post) => post.id === threadPostId);
  if (!root) {
    closeModal("threadModal");
    return;
  }
  const rootWrap = $("#threadRoot");
  const repliesWrap = $("#threadReplies");
  rootWrap.innerHTML = "";
  repliesWrap.innerHTML = "";
  rootWrap.appendChild(createPostCard(root, { thread: true }));
  fragments
    .filter((post) => post.parentId === root.id)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .forEach((reply) => repliesWrap.appendChild(createPostCard(reply, { thread: true })));

  const gardenIdea = postGardenIdea(root);
  $("#threadGardenButton").textContent = gardenIdea ? "庭で開く" : "庭へ送る";
  $("#replyAvatar").textContent = activeAccount().avatar;
}

async function submitReply() {
  const root = fragments.find((post) => post.id === threadPostId);
  const input = $("#replyText");
  const text = input.value.trim();
  if (!root || !text) return;
  const now = new Date().toISOString();
  await put("fragments", {
    id: uid("reply"),
    text,
    kind: "未分類",
    tags: [],
    accountId: activeAccountId,
    parentId: root.id,
    quoteId: null,
    liked: false,
    picked: false,
    bookmarked: false,
    gardenIdeaId: null,
    createdAt: now,
    updatedAt: now
  });
  input.value = "";
  input.style.height = "";
  await reloadData();
  renderAll();
  renderThread();
}

function quoteCurrentThreadPost() {
  const root = fragments.find((post) => post.id === threadPostId);
  if (!root) return;
  closeModal("threadModal");
  openFragmentModal(null, { quoteId: root.id });
}

function editCurrentThreadPost() {
  const root = fragments.find((post) => post.id === threadPostId);
  if (!root) return;
  closeModal("threadModal");
  openFragmentModal(root.id);
}

function openCurrentThreadGarden() {
  const root = fragments.find((post) => post.id === threadPostId);
  if (!root) return;
  const idea = postGardenIdea(root);
  if (idea) {
    closeModal("threadModal");
    switchView("garden");
    setTimeout(() => openDetail(idea.id), 50);
  } else {
    openTransferModal(root.id);
  }
}

function openTransferModal(fragmentId) {
  const post = fragments.find((item) => item.id === fragmentId);
  if (!post) return;
  const existingIdea = postGardenIdea(post);
  if (existingIdea) {
    switchView("garden");
    closeModal("threadModal");
    setTimeout(() => openDetail(existingIdea.id), 40);
    return;
  }
  transferFragmentId = fragmentId;
  $("#transferPreview").textContent = post.text;
  $("#transferIdeaTitle").value = "";
  setCategoryPicker("transfer", suggestedCategoryForFragment(post));
  closeModal("fragmentModal");
  $("#transferModal").classList.remove("hidden");
}

async function confirmTransfer() {
  const post = fragments.find((item) => item.id === transferFragmentId);
  if (!post) return;
  const now = new Date().toISOString();
  const idea = {
    id: uid("idea"),
    title: $("#transferIdeaTitle").value.trim(),
    body: post.text,
    category: $("#transferCategory").value,
    stage: "seed",
    project: "",
    memo: "",
    details: {},
    tags: [...(post.tags || [])],
    status: "active",
    createdAt: now,
    updatedAt: now,
    buriedAt: null,
    sourcePostId: post.id
  };
  await put("ideas", idea);
  post.gardenIdeaId = idea.id;
  post.picked = false;
  post.updatedAt = now;
  await put("fragments", post);
  transferFragmentId = null;
  await reloadData();
  renderAll();
  closeModal("transferModal");
  closeModal("threadModal");
  switchView("garden");
  setTimeout(() => openDetail(idea.id), 60);
  toast("ポストから種を作りました。");
}

function renderAccountSwitchList() {
  const list = $("#accountSwitchList");
  if (!list) return;
  list.innerHTML = "";
  accounts.forEach((account) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `account-switch-row${account.id === activeAccountId ? " is-active" : ""}`;
    button.innerHTML = `
      <span class="account-avatar">${escapeHTML(account.avatar)}</span>
      <span><strong>${escapeHTML(account.name)}</strong><small>@${escapeHTML(account.handle)}</small></span>
      <i>${account.id === activeAccountId ? "✓" : ""}</i>
    `;
    button.addEventListener("click", () => setActiveAccount(account.id));
    list.appendChild(button);
  });
}

function renderAccountManageList() {
  const list = $("#accountManageList");
  if (!list) return;
  list.innerHTML = "";
  accounts.forEach((account) => {
    const count = fragments.filter((post) => post.accountId === account.id).length;
    const row = document.createElement("div");
    row.className = "account-manage-row";
    row.innerHTML = `
      <button class="account-manage-main" type="button">
        <span class="account-avatar tiny">${escapeHTML(account.avatar)}</span>
        <span><strong>${escapeHTML(account.name)}</strong><small>@${escapeHTML(account.handle)} ・ ${count}件</small></span>
      </button>
      <button class="account-delete" type="button" aria-label="アカウントを削除">×</button>
    `;
    row.querySelector(".account-manage-main").addEventListener("click", () => setActiveAccount(account.id, { close: false }));
    row.querySelector(".account-delete").addEventListener("click", () => deleteAccount(account.id));
    list.appendChild(row);
  });
}

function openAccountModal() {
  renderAccountSwitchList();
  $("#accountModal").classList.remove("hidden");
}

function setActiveAccount(accountId, { close = true } = {}) {
  if (!accounts.some((account) => account.id === accountId)) return;
  activeAccountId = accountId;
  saveActiveAccountId();
  renderTimelineProfile();
  renderTimeline();
  renderAccountSwitchList();
  renderAccountManageList();
  renderSettingsControls();
  populatePostAccountSelect(accountId);
  if (close) closeModal("accountModal");
}

async function createAccount() {
  const nameInput = $("#newAccountName");
  const handleInput = $("#newAccountHandle");
  const avatarInput = $("#newAccountAvatar");
  const name = nameInput.value.trim();
  if (!name) {
    toast("アカウント名を入れてね。");
    return;
  }
  let handle = sanitizeHandle(handleInput.value || name);
  const existingHandles = new Set(accounts.map((account) => account.handle.toLowerCase()));
  if (existingHandles.has(handle.toLowerCase())) {
    let n = 2;
    const base = handle.slice(0, 20);
    while (existingHandles.has(`${base}_${n}`.toLowerCase())) n += 1;
    handle = `${base}_${n}`;
  }
  const account = {
    id: uid("account"),
    name: name.slice(0, 24),
    handle,
    avatar: (avatarInput.value.trim() || "✦").slice(0, 4)
  };
  accounts.push(account);
  saveAccounts();
  activeAccountId = account.id;
  saveActiveAccountId();
  nameInput.value = "";
  handleInput.value = "";
  avatarInput.value = "";
  renderAll();
  renderSettingsControls();
  toast("投稿アカウントを追加しました。");
}

function deleteAccount(accountId) {
  const account = accountById(accountId);
  if (accounts.length <= 1) {
    toast("投稿アカウントは1つ以上必要です。");
    return;
  }
  const used = fragments.some((post) => post.accountId === accountId);
  if (used) {
    toast("このアカウントにはポストがあるので、今は削除できません。");
    return;
  }
  if (!confirm(`「${account.name}」を削除しますか？`)) return;
  accounts = accounts.filter((item) => item.id !== accountId);
  if (activeAccountId === accountId) activeAccountId = accounts[0].id;
  saveAccounts();
  saveActiveAccountId();
  renderAll();
  renderSettingsControls();
}

function openAccountSettings() {
  closeModal("accountModal");
  switchView("settings");
  setTimeout(() => $("#newAccountName").focus(), 80);
}

function switchView(target) {
  currentView = target;
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.dataset.view === target));
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.target === target));
  window.scrollTo({ top: 0, behavior: "smooth" });

  const add = $("#openQuickAdd");
  if (add) {
    add.setAttribute("aria-label", target === "garden" ? "種を追加する" : "ポストする");
    add.classList.toggle("garden-add", target === "garden");
  }
  if (target === "timeline") renderTimeline();
  if (target === "garden") renderPickedShelf();
  if (target === "search") setTimeout(() => $("#searchInput").focus(), 70);
  if (target === "settings") {
    renderSettingsControls();
    renderTagManageList();
    renderAccountManageList();
  }
}

function handleFloatingAdd() {
  if (currentView === "garden") openQuickAddModal();
  else openFragmentModal();
}

function autoGrowTextarea(element, max = 180) {
  if (!element) return;
  element.style.height = "auto";
  element.style.height = `${Math.min(max, Math.max(element.scrollHeight, 48))}px`;
}

function bindEventsV6() {
  $("#openQuickAdd").addEventListener("click", handleFloatingAdd);
  $("#saveQuickIdea").addEventListener("click", saveQuickIdea);
  $("#submitTimelinePost").addEventListener("click", submitTimelinePost);
  $("#openPostComposer").addEventListener("click", () => {
    openFragmentModal(null, { prefill: $("#timelineComposer").value, fromInline: true });
  });
  $("#timelineComposer").addEventListener("input", (event) => autoGrowTextarea(event.currentTarget, 150));
  $("#timelineComposer").addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") submitTimelinePost();
  });

  $("#saveFragmentButton").addEventListener("click", saveFragment);
  $("#deleteFragmentButton").addEventListener("click", deleteCurrentFragment);
  $("#postAccountSelect").addEventListener("change", (event) => {
    $("#postEditorAvatar").textContent = accountById(event.target.value).avatar;
  });

  $("#confirmTransferButton").addEventListener("click", confirmTransfer);
  $("#accountSwitchButton").addEventListener("click", openAccountModal);
  $("#openAccountSettings").addEventListener("click", openAccountSettings);
  $("#createAccountButton").addEventListener("click", createAccount);
  $("#newAccountName").addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); createAccount(); }
  });
  $("#timelineSearchJump").addEventListener("click", () => switchView("search"));

  $$('[data-timeline-filter]').forEach((button) => {
    button.addEventListener("click", () => {
      timelineFilter = button.dataset.timelineFilter;
      renderTimeline();
    });
  });

  $("#threadEditButton").addEventListener("click", editCurrentThreadPost);
  $("#threadQuoteButton").addEventListener("click", quoteCurrentThreadPost);
  $("#threadGardenButton").addEventListener("click", openCurrentThreadGarden);
  $("#submitReplyButton").addEventListener("click", submitReply);
  $("#replyText").addEventListener("input", (event) => autoGrowTextarea(event.currentTarget, 130));

  $("#saveDetail").addEventListener("click", saveDetail);
  $("#stageDown").addEventListener("click", () => changeStage(-1));
  $("#stageUp").addEventListener("click", () => changeStage(1));
  $("#addRelation").addEventListener("click", addRelation);
  $("#duplicateIdea").addEventListener("click", duplicateIdea);
  $("#deleteIdea").addEventListener("click", deleteCurrentIdea);

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.target));
  });
  $$('[data-theme-mode]').forEach((button) => {
    button.addEventListener("click", () => selectThemeMode(button.dataset.themeMode));
  });
  $$('[data-accent]').forEach((button) => {
    button.addEventListener("click", () => selectAccent(button.dataset.accent));
  });
  $$('[data-tag-sort]').forEach((button) => {
    button.addEventListener("click", () => selectTagSort(button.dataset.tagSort));
  });
  $$('[data-tag-expand]').forEach((button) => {
    button.addEventListener("click", () => {
      const context = button.dataset.tagExpand;
      tagExpanded[context] = !tagExpanded[context];
      button.textContent = tagExpanded[context] ? "上位だけ" : (context === "detail" ? "タグを選ぶ" : "すべて");
      renderTagSelector(context);
    });
  });

  $("#createTagButton").addEventListener("click", createTag);
  $("#newTagInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") { event.preventDefault(); createTag(); }
  });

  $$('[data-close]').forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });
  $$(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        backdrop.classList.add("hidden");
        closeCategoryMenus();
      }
    });
  });

  $("#gardenStageFilter").addEventListener("change", renderGarden);
  $("#searchInput").addEventListener("input", renderSearch);
  $("#searchStageFilter").addEventListener("change", renderSearch);
  document.addEventListener("click", () => closeCategoryMenus());

  const handleSystemThemeChange = () => {
    if (uiSettings.themeMode === "system") applyTheme();
  };
  if (typeof systemThemeQuery.addEventListener === "function") {
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof systemThemeQuery.addListener === "function") {
    systemThemeQuery.addListener(handleSystemThemeChange);
  }

  bindInteractionGuards();
}

async function initV6() {
  $(".version-badge").textContent = `v${APP_VERSION}`;
  buildCategoryPickers();
  bindEventsV6();
  applyTheme();
  renderTimelineProfile();

  try {
    db = await openDB();
    await seedDefaultTags();
    await reloadData();
    await migrateLegacyMoods();
    await migratePostsV6();
    renderSettingsControls();
    renderAll();
  } catch (error) {
    console.error(error);
    alert("保存領域を開けませんでした。ブラウザのプライベートモードやストレージ設定を確認してください。");
  }
}

document.addEventListener("DOMContentLoaded", initV6);
