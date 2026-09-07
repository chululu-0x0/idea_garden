const APP_VERSION = "0.1";
const DB_NAME = "idea_garden_db";
const DB_VERSION = 1;

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
  "default": {
    seed: ["このアイデアの核は見えてきた？", "「これはつまり何なのか？」に答えられそうなら、芽にしてよさそう。"],
    sprout: ["他の要素とどう繋がるか見えてきた？", "作品の中での役割が見えてきたら、蕾へ。"],
    bud: ["もう実際に作品へ持ち込める？", "考える素材から使える素材になったなら、開花。"],
    flower: ["この花はもう使える状態。", "ここから別の種を派生させてもいい。"]
  }
};

let db;
let ideas = [];
let relations = [];
let currentIdeaId = null;
let currentView = "garden";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

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
}

function sortIdeas() {
  ideas.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

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
    const first = select.options[0];
    CATEGORIES.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      select.appendChild(option);
    });
  });
}

function stageInfo(id) {
  return STAGES.find((s) => s.id === id) || STAGES[0];
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
  return relations.filter((r) => r.sourceIdeaId === ideaId || r.targetIdeaId === ideaId).length;
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
      <span class="relation-count">${getRelationCount(idea.id) ? `⌁ ${getRelationCount(idea.id)}` : escapeHTML(idea.project || "未所属")}</span>
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
    <span class="grave-date">${idea.buriedAt ? `${formatDate(idea.buriedAt)} 埋葬` : "眠っている種"}</span>
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
      <p class="today-note">${escapeHTML(daysAgo(idea.createdAt))}に植えたアイデアです。${getRelationCount(idea.id) ? `今は ${getRelationCount(idea.id)} 個の種と繋がっています。` : "まだ静かに一人で眠っています。"}</p>
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
}

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

  const idx = STAGES.findIndex((s) => s.id === idea.stage);
  $("#stageDown").disabled = idx <= 0;
  $("#stageUp").disabled = idx >= STAGES.length - 1;
  $("#stageUp").textContent = idx >= STAGES.length - 1 ? "開花済み" : `${STAGES[idx + 1].label}に育てる`;
  renderStageStrip(idea.stage);
}

function relatedIdeaIds(ideaId) {
  return relations
    .filter((r) => r.sourceIdeaId === ideaId || r.targetIdeaId === ideaId)
    .map((r) => r.sourceIdeaId === ideaId ? r.targetIdeaId : r.sourceIdeaId);
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
      const row = document.createElement("div");
      row.className = "relation-item";
      row.innerHTML = `
        <span>${stageInfo(idea.stage).icon} ${escapeHTML(displayTitle(idea))}</span>
        <button type="button" data-remove-relation="${idea.id}" aria-label="関連を外す">×</button>
      `;
      row.querySelector("button").addEventListener("click", () => removeRelationBetween(ideaId, idea.id));
      list.appendChild(row);
    });
  }

  const available = ideas.filter((idea) => idea.id !== ideaId && !ids.includes(idea.id) && idea.status !== "buried");
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
  const idx = STAGES.findIndex((s) => s.id === idea.stage);
  const next = idx + direction;
  if (next < 0 || next >= STAGES.length) return;

  idea.stage = STAGES[next].id;
  idea.updatedAt = new Date().toISOString();
  await put("ideas", idea);
  await reloadData();
  renderAll();
  openDetail(idea.id);

  if (idea.stage === "flower") {
    toast("花が開きました。");
  } else {
    toast(`${stageInfo(idea.stage).label}に育ちました。`);
  }
}

async function addRelation() {
  const targetId = $("#relationTarget").value;
  if (!currentIdeaId || !targetId || currentIdeaId === targetId) return;

  const exists = relations.some((r) =>
    (r.sourceIdeaId === currentIdeaId && r.targetIdeaId === targetId) ||
    (r.sourceIdeaId === targetId && r.targetIdeaId === currentIdeaId)
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
  const relation = relations.find((r) =>
    (r.sourceIdeaId === a && r.targetIdeaId === b) ||
    (r.sourceIdeaId === b && r.targetIdeaId === a)
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
  renderAll();
  openDetail(child.id);
  toast("花から新しい種を落としました。");
}

async function deleteCurrentIdea() {
  const idea = ideas.find((item) => item.id === currentIdeaId);
  if (!idea) return;

  const ok = confirm(`「${displayTitle(idea)}」を完全に削除しますか？\n墓地ではなく、本当に消えます。`);
  if (!ok) return;

  const toDelete = relations.filter((r) => r.sourceIdeaId === idea.id || r.targetIdeaId === idea.id);
  for (const relation of toDelete) {
    await remove("relations", relation.id);
  }

  await remove("ideas", idea.id);
  currentIdeaId = null;
  await reloadData();
  renderAll();
  closeModal("detailModal");
  toast("種を完全に削除しました。");
}

function switchView(target) {
  currentView = target;
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.dataset.view === target));
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.target === target));
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (target === "search") {
    setTimeout(() => $("#searchInput").focus(), 80);
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
  $("#openQuickAddTop").addEventListener("click", openQuickAdd);
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
    const preview = { ...idea, category: $("#detailCategory").value };
    renderGrowth(preview);
  });
}

async function init() {
  document.querySelector(".version-badge").textContent = `v${APP_VERSION}`;
  setupSelects();
  bindEvents();

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
