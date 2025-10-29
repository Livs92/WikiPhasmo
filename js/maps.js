"use strict";
import { fetchCollection } from "./api.js";

let ALL_MAPS = [];

/* ===========================
   Render dos mapas
   =========================== */
async function renderMaps() {
  const grid = document.getElementById("mapGrid");
  const select = document.getElementById("sizeFilter");
  if (!grid) return;

  // Filtro selecionado
  const size = (select?.value || "").trim();

  // Filtra
  const data = (ALL_MAPS || []).filter((m) => !size || m.size === size);

  // Arquivo da planta por slug (mantém suas imagens locais)
  const plans = {
    willow: "Willow_planta.png",
    prison: "Prison_planta.png",
    "sunny-meadows": "SunnyMeadows_planta.png",
    "camp-woodwind": "Woodwind_planta.png",
    bleasdale: "Bleasdale_planta.png",
    edgefield: "Edgefield_planta.png",
    grafton: "Grafton_Farmhouse_planta.png",
    brownstone: "HighSchool_planta.png",
    maple: "Campsite_planta.png",
    "point-hope": "Farol_planta.png",
    ridgeview: "Ridgeview_planta.png",
    tanglewood: "Tanglewood_planta.png",
  };

  const html =
    data
      .map((m) => {
        const src = (m.image || `pic/${m.slug}.png`).replace(/^\//, "");
        const plan = `pic/${plans[m.slug] || `${m.slug}_planta.png`}`;

        const sizeLabel =
          m.size === "pequeno"
            ? "Pequena"
            : m.size === "médio"
            ? "Média"
            : m.size === "grande"
            ? "Grande"
            : m.size;

        const sizeClass =
          m.size === "pequeno"
            ? "small"
            : m.size === "médio"
            ? "medium"
            : m.size === "grande"
            ? "large"
            : "small";

        return `
<article class="map-card" data-plan="${plan}" data-title="${m.name}">
  <div class="content">
    <div class="thumb">
      <img src="${src}" alt="${m.name}" loading="lazy" decoding="async">
    </div>
    <div class="overlay"></div>
    <div class="badge ${sizeClass}">${sizeLabel}</div>
    <div class="title">${m.name}</div>
    <button class="pw-open-btn" type="button" aria-label="Abrir planta">Ver planta</button>
  </div>
</article>`;
      })
      .join("") || '<p class="muted">Nenhum mapa encontrado.</p>';

  grid.innerHTML = html;

  // Bind da modal de planta
  grid.querySelectorAll(".map-card").forEach((card) => {
    const plan = card.getAttribute("data-plan");
    const title = card.getAttribute("data-title") || "Planta";
    const open = () => openPlanModal(plan, `Planta — ${title}`);
    card.querySelector(".thumb")?.addEventListener("click", open);
    card.querySelector(".pw-open-btn")?.addEventListener("click", open);
  });
}

/* ===========================
   Modal de Imagem (Plantas)
   =========================== */
function ensureImageModal() {
  let modal = document.getElementById("pwImageModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "pw-modal map"; // classe extra "map" só p/ diferenciar se quiser
  modal.id = "pwImageModal";
  modal.innerHTML = `
    <div class="pw-backdrop" data-close="1"></div>
    <div class="pw-box" role="dialog" aria-modal="true" aria-label="Imagem do mapa">
      <button class="pw-close" type="button" data-close="1" aria-label="Fechar">✕</button>
      <div class="pw-img-wrap">
        <img id="pwImage" alt="Imagem do mapa" />
        <p id="pwSource" class="pw-source muted"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Fechar
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.close === "1") closePlanModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePlanModal();
  });

  return modal;
}

function openPlanModal(src, altText, fonte = "") {
  const modal = ensureImageModal();
  const img = modal.querySelector("#pwImage");
  const srcBox = modal.querySelector("#pwSource");

  img.src = src;
  img.alt = altText || "Planta do mapa";
  srcBox.textContent = fonte ? `Fonte: ${fonte}` : "";

  // Certifica que a imagem vai respeitar tamanho original, adaptando à tela //
  img.style.maxWidth = "100%";
  img.style.height = "auto";

  modal.classList.add("open");
}

function closePlanModal() {
  const modal = document.getElementById("pwImageModal");
  if (!modal) return;
  modal.classList.remove("open");
  const img = modal.querySelector("#pwImage");
  if (img) img.src = "";
}

/* ===========================
   Boot
   =========================== */
document.addEventListener("DOMContentLoaded", async () => {
  // filtro
  document.getElementById("sizeFilter")?.addEventListener("change", renderMaps);

  // carrega do Firestore
  try {
    ALL_MAPS = await fetchCollection("maps", "name");
  } catch (err) {
    console.error("Erro ao carregar mapas:", err);
    ALL_MAPS = [];
  }

  renderMaps();
});
