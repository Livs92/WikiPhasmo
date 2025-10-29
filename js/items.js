"use strict";
import { fetchCollection } from "./api.js";

/* ===========================
   Vídeos por item (YouTube)
   =========================== */
const ITEM_VIDEOS = {
  flashlight: "phG8boNbOG0",
  "uv-light": "C-UiqznPblA",
  "emf-reader": "cS7FLCP4El8",
  thermometer: "HLTGAOFjH8A",
  "spirit-box": "wyUlftk9BdU",
  "video-camera": "q2YifVo3wtM",
  "photo-camera": "5XhYTCnNWOE",
  "dots-projector": "garcCDRpmmY",
  "ghost-writing-book": "npEysVWmBks",
  crucifix: "lnj9YLA2Ecc",
  "smudge-stick": "7Ynpku7F3IQ",
  igniter: "UCbcAklPTq4",
  firelight: "kI8FQDHjcQ0",
  salt: "vk3RzikDG2c",
  tripod: "i6qyYqTvIU8",
  "motion-sensor": "QjwM7-3cX00",
  "sound-sensor": "a0jwq_dYcFw",
  "parabolic-microphone": "dochU2Gpjw8",
  "sanity-pills": "BlZ7-nWg26c",
  "head-gear": "EPVwC6_lrf4",
  "sound-recorder": "ZojTdoAj3ZI",
};

/* ===========================
   Estado e elementos
   =========================== */
let ALL_ITEMS = []; // vindo do Firestore

let itemGrid, searchItemsInput, modal, iframe, closeBtn, videoDescRoot;

function getItemThumb(it) {
  return (it.image || it.thumbImg || `pic/${it.slug}.png`).replace(/^\//, "");
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

function showItemDesc(slug) {
  if (!videoDescRoot) return;
  const blocks = videoDescRoot.querySelectorAll(".desc");
  blocks.forEach((el) => {
    const isTarget = el.getAttribute("data-item") === slug;
    el.hidden = !isTarget;
  });
}

/* ===========================
   Filtro
   =========================== */
function filterItems() {
  const q = (searchItemsInput?.value || "").toLowerCase().trim();
  return (ALL_ITEMS || []).filter((it) => {
    const hay = `${it.name ?? ""} ${it.description ?? ""}`.toLowerCase();
    return !q || hay.includes(q);
  });
}

/* ===========================
   Render dos cards
   =========================== */
function renderItems() {
  if (!itemGrid) return;
  const data = filterItems();

  itemGrid.innerHTML =
    data
      .map((it) => {
        const slug =
          it.slug || (it.name ?? "").toLowerCase().replace(/\s+/g, "-");
        const hasVideo = !!ITEM_VIDEOS[slug];
        const thumb = getItemThumb(it);

        return `
<article class="media-card item-card ${
          hasVideo ? "has-video" : ""
        }" data-slug="${slug}">
  <div class="content">
    <div class="thumb">
      <img
        class="card-img"
        src="${thumb}"
        alt="Item ${it.name}"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src='pic/placeholder.png'"
      />
    </div>
    <div class="overlay"></div>
    <div class="title">${it.name}</div>
    ${
      hasVideo
        ? '<button class="pw-open-btn" type="button" aria-label="Ver vídeo do item">▶ Ver vídeo</button>'
        : ""
    }
  </div>
  <div class="card-body">
    <p class="card-sub muted" style="margin:0">${it.description || ""}</p>
  </div>
</article>`;
      })
      .join("") || '<p class="muted">Nenhum item encontrado.</p>';

  // Bind de clique para abrir vídeo
  itemGrid.querySelectorAll(".item-card.has-video").forEach((card) => {
    const slug = card.getAttribute("data-slug");
    const open = () => {
      const vid = ITEM_VIDEOS[slug];
      if (!vid) return;
      showItemDesc(slug);
      openVideo(vid);
    };
    card.querySelector(".pw-open-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      open();
    });
    card.addEventListener("click", open);
  });
}

/* ===========================
   Boot
   =========================== */
document.addEventListener("DOMContentLoaded", async () => {
  itemGrid = document.getElementById("itemGrid");
  searchItemsInput = document.getElementById("searchItems");
  modal = document.getElementById("videoModal");
  iframe = document.getElementById("ytFrame");
  closeBtn = document.getElementById("pwClose");
  videoDescRoot = document.getElementById("videoDesc");

  // modal listeners
  if (modal) {
    closeBtn?.addEventListener("click", closeVideo);
    modal.querySelector(".pw-backdrop")?.addEventListener("click", closeVideo);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
    });
  }

  searchItemsInput?.addEventListener("input", renderItems);

  // carrega os dados do Firestore
  try {
    ALL_ITEMS = await fetchCollection("items", "name");
  } catch (err) {
    console.error("Erro ao carregar items do Firestore:", err);
    ALL_ITEMS = [];
  }

  renderItems();
});
