"use strict";
import { fetchCollection } from "./api.js";

/* ===========================
   Vídeos por amaldiçoado (YouTube)
   =========================== */
const CURSED_VIDEOS = {
  "ouija-board": "hes9ssglmt0",
  "tarot-cards": "4b4kpba2_MM",
  "music-box": "i9P3aqt87sA",
  "haunted-mirror": "mrPGNe_DhBY",
  "summoning-circle": "QBgLqHECJ3s",
  "voodoo-doll": "bNCEmAu77sE",
  "monkey-paw": "1HrCQzNU1HE",
};

/* ===========================
   Estado & elementos
   =========================== */
let CURSED_ALL = [];
const cursedGrid = document.getElementById("cursedGrid");

// Modal
const cursedModal = document.getElementById("cursedVideoModal");
const cursedIframe = document.getElementById("cursedYt");
const cursedClose = document.getElementById("cursedClose");
const cursedDescRoot = document.getElementById("cursedDesc");

function showCursedDesc(slug) {
  if (!cursedDescRoot) return;
  const blocks = cursedDescRoot.querySelectorAll(".desc");
  blocks.forEach((el) => {
    const isTarget = el.getAttribute("data-item") === slug;
    el.hidden = !isTarget;
  });
}

function openCursed(videoId) {
  if (!cursedModal || !cursedIframe || !videoId) return;
  cursedIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  cursedModal.classList.add("open");
  cursedModal.setAttribute("aria-hidden", "false");
}

function closeCursed() {
  if (!cursedModal || !cursedIframe) return;
  cursedIframe.src = "";
  cursedModal.classList.remove("open");
  cursedModal.setAttribute("aria-hidden", "true");
}

/* ===========================
   Render dos cards
   =========================== */
function renderCursed() {
  if (!cursedGrid) return;

  cursedGrid.innerHTML =
    (CURSED_ALL || [])
      .map((c) => {
        const slug = c.slug || c.id; // chave segura
        const hasVideo = !!CURSED_VIDEOS[slug];
        const imgSrc = (c.image || `pic/${slug}.png`).replace(/^\//, "");

        return `
<article class="media-card cursed-card ${
          hasVideo ? "has-video" : ""
        }" data-slug="${slug}">
  <div class="content">
    <div class="thumb">
      <img
        class="card-img"
        src="${imgSrc}"
        alt="${c.name || slug}"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src='pic/placeholder.png'"
      />
    </div>
    <div class="overlay"></div>
    <div class="title">${c.name || slug}</div>
    ${
      hasVideo
        ? '<button class="pw-open-btn" type="button" aria-label="Ver vídeo">▶ Ver vídeo</button>'
        : ""
    }
  </div>

  <div class="card-body">
    ${
      c.effect
        ? `<p class="card-sub muted"><strong>Efeito:</strong> ${c.effect}</p>`
        : ""
    }
    ${
      c.risk
        ? `<p class="card-sub muted"><strong>Risco:</strong> ${c.risk}</p>`
        : ""
    }
    ${c.tip ? `<p class="card-sub muted"><em>Dica:</em> ${c.tip}</p>` : ""}
  </div>
</article>`;
      })
      .join("") || '<p class="muted">Nenhum objeto amaldiçoado encontrado.</p>';

  // binds de clique para abrir vídeo + descrição correta
  cursedGrid.querySelectorAll(".cursed-card.has-video").forEach((card) => {
    const slug = card.getAttribute("data-slug");
    const videoId = CURSED_VIDEOS[slug];
    const open = () => {
      showCursedDesc(slug);
      openCursed(videoId);
    };
    card.querySelector(".pw-open-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      open();
    });
    card.addEventListener("click", open); // card inteiro
  });
}

/* ===========================
   Listeners da modal
   =========================== */
if (cursedModal) {
  cursedClose?.addEventListener("click", closeCursed);
  cursedModal
    .querySelector(".pw-backdrop")
    ?.addEventListener("click", closeCursed);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cursedModal.classList.contains("open"))
      closeCursed();
  });
}

/* ===========================
   Boot
   =========================== */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // carrega coleção "cursed" ordenada por nome
    CURSED_ALL = await fetchCollection("cursed", "name");
  } catch (err) {
    console.error("Erro ao carregar amaldiçoados:", err);
    CURSED_ALL = [];
  }
  renderCursed();
});
