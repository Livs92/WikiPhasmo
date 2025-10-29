"use strict";

import { fetchCollection } from "./api.js";

/* ===========================
   Vídeos (YouTube) por fantasma
   =========================== */
const GHOST_VIDEOS = {
  banshee: "j16JeSqQShs",
  deogen: "EELyZOYDPGA",
  spirit: "4cpy_W3SrEw",
  wraith: "6L4F2aJyaJQ",
  phantom: "iz3K4rCcnhw",
  poltergeist: "Ry-32If74CI",
  jinn: "S4moA5IkcFk",
  mare: "wYow_QPn3Ns",
  revenant: "60SGiaOUu_w",
  shade: "3i5OqDylt-8",
  demon: "JYGfzppzMkw",
  yurei: "LKeylnLrggo",
  oni: "X_FyfC2zCrc",
  yokai: "gQ18IZYsmK4",
  hantu: "HeVF_gtKNNg",
  goryo: "qkbpk73tNxE",
  myling: "rWZxWjbRzUw",
  onryo: "noEXe4L27iw",
  raiju: "-8EcNYJ3j0Y",
  obake: "-km_8ymTgsM",
  mimic: "7isgP0RsSXA",
  "the-mimic": "7isgP0RsSXA",
  the_mimic: "7isgP0RsSXA",
  twins: "KgYUPsrPY08",
  "the-twins": "KgYUPsrPY08",
  moroi: "Cm_uTXm8Bl0",
  thaye: "zpKWX5sovrE",
};

/* ===========================
   Rótulos de evidências (local)
   =========================== */
const EVIDENCE_LABELS = {
  "emf-5": "EMF 5",
  freezing: "Temperatura Baixa",
  writing: "Escrita",
  "spirit-box": "Spirit Box",
  orbs: "Orbes",
  dots: "DOTS",
  uv: "UV / Digitais",
};

// array auxiliar para montar os chips
const EVIDENCES = Object.entries(EVIDENCE_LABELS).map(([id, name]) => ({
  id,
  name,
}));

/* ===========================
   Estado e elementos
   =========================== */
const selected = new Set(); // evidências selecionadas
let ALL_GHOSTS = []; // vindo do Firestore

let ghostGrid, modal, iframe, closeBtn, videoDescRoot, searchInput;

document.addEventListener("DOMContentLoaded", async () => {
  ghostGrid = document.getElementById("ghostGrid");
  modal = document.getElementById("videoModal");
  iframe = document.getElementById("ytFrame");
  closeBtn = document.getElementById("pwClose");
  videoDescRoot = document.getElementById("videoDesc");
  searchInput = document.getElementById("searchGhosts");

  // listeners da modal
  if (modal) {
    closeBtn?.addEventListener("click", closeVideo);
    modal.querySelector(".pw-backdrop")?.addEventListener("click", closeVideo);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
    });
  }

  renderEvidenceChips();
  searchInput?.addEventListener("input", renderGhosts);

  // 🔥 carrega os fantasmas do Firestore
  try {
    ALL_GHOSTS = await fetchCollection("ghosts", "name"); // ordena por nome
  } catch (err) {
    console.error("Erro ao carregar ghosts do Firestore:", err);
    ALL_GHOSTS = [];
  }

  renderGhosts();
});

/* ===========================
   Helpers modal
   =========================== */
function showGhostDesc(slug) {
  if (!videoDescRoot) return;
  const blocks = videoDescRoot.querySelectorAll(".desc");
  blocks.forEach((el) => {
    const isTarget = el.getAttribute("data-ghost") === slug;
    el.hidden = !isTarget;
  });
}

function getVideoIdForSlug(slug) {
  if (!slug) return null;
  if (GHOST_VIDEOS[slug]) return GHOST_VIDEOS[slug];
  const noThe = slug.replace(/^the-/, "");
  if (GHOST_VIDEOS[noThe]) return GHOST_VIDEOS[noThe];
  const withThe = slug.startsWith("the-") ? slug : `the-${slug}`;
  if (GHOST_VIDEOS[withThe]) return GHOST_VIDEOS[withThe];
  const under = slug.replace(/-/g, "_");
  if (GHOST_VIDEOS[under]) return GHOST_VIDEOS[under];
  return null;
}

function openVideo(videoId) {
  if (!videoId || !modal || !iframe) return;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  modal.classList.add("compact", "open");
  modal.setAttribute("aria-hidden", "false");
}

function closeVideo() {
  if (!modal || !iframe) return;
  iframe.src = "";
  modal.classList.remove("open", "compact");
  modal.setAttribute("aria-hidden", "true");
}

function openGhost(slug) {
  const videoId = getVideoIdForSlug(slug);
  if (!videoId) return;
  showGhostDesc(slug);
  openVideo(videoId);
}

/* ===========================
   Chips de evidência
   =========================== */
function renderEvidenceChips() {
  const box = document.getElementById("evidenceChips");
  if (!box) return;

  box.innerHTML = "";
  EVIDENCES.forEach((ev) => {
    const b = document.createElement("button");
    b.className = "chip" + (selected.has(ev.id) ? " active" : "");
    b.textContent = ev.name;
    b.type = "button";
    b.onclick = () => {
      selected.has(ev.id) ? selected.delete(ev.id) : selected.add(ev.id);
      renderEvidenceChips();
      renderGhosts();
    };
    box.appendChild(b);
  });
}

/* ===========================
   Badges evidências
   =========================== */
function ghostBadges(g) {
  return (g.evidences || [])
    .map((id) => `<span class="badge">${EVIDENCE_LABELS[id] ?? id}</span>`)
    .join("");
}

/* ===========================
   Filtro
   =========================== */
function filterGhosts() {
  const q = (searchInput?.value || "").toLowerCase().trim();

  return (ALL_GHOSTS || []).filter((g) => {
    const evidences = Array.isArray(g.evidences) ? g.evidences : [];
    const andOk = [...selected].every((id) => evidences.includes(id));
    const qOk =
      !q || `${g.name ?? ""} ${g.summary ?? ""}`.toLowerCase().includes(q);
    return andOk && qOk;
  });
}

/* ===========================
   Render dos cards
   =========================== */
function renderGhosts() {
  if (!ghostGrid) return;

  const data = filterGhosts();

  ghostGrid.innerHTML =
    data
      .map((g) => {
        const slug =
          g.slug || (g.name ?? "").toLowerCase().replace(/\s+/g, "-");
        const videoId = getVideoIdForSlug(slug);
        const hasVideo = !!videoId;

        const imgSrc = (g.image || `pic/${slug}.png`).replace(/^\//, "");

        return `
<article class="media-card ghost-card ${
          hasVideo ? "has-video" : ""
        }" data-slug="${slug}">
  <div class="content">
    <div class="thumb">
      <img
        class="card-img"
        src="${imgSrc}"
        alt="Fantasma ${g.name ?? ""}"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src='pic/placeholder.png'"
      />
    </div>
    <div class="overlay"></div>
    <div class="title">${g.name ?? ""}</div>
    ${
      hasVideo
        ? '<button class="pw-open-btn" type="button" aria-label="Ver vídeo do fantasma">▶ Ver vídeo</button>'
        : ""
    }
  </div>
  <div class="card-body">
    <p class="card-sub muted" style="margin:0">${g.summary ?? ""}</p>
    <div class="badges">${ghostBadges(g)}</div>
  </div>
</article>`;
      })
      .join("") || '<p class="muted">Nenhum fantasma com esses filtros.</p>';

  // Clique para abrir vídeo
  ghostGrid.querySelectorAll(".ghost-card.has-video").forEach((card) => {
    const slug = card.getAttribute("data-slug");
    if (!slug) return;

    const open = () => openGhost(slug);

    card.querySelector(".pw-open-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      open();
    });
    card.addEventListener("click", open);
  });
}
