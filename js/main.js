const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

// menu mobile
$('#menuBtn')?.addEventListener('click', ()=> $('#menu')?.classList.toggle('open'));

// tema
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') { root.classList.add('light'); if (themeToggle) themeToggle.checked = true; }
themeToggle?.addEventListener('change', e=>{
  root.classList.toggle('light', e.target.checked);
  localStorage.setItem('theme', e.target.checked?'light':'dark');
});

$('#year')?.textContent = new Date().getFullYear();

// Carrossel Home
(function () {
  const wrap = document.getElementById("homeCarousel");
  if (!wrap) return;

  const track = wrap.querySelector(".car-track");
  const prev = wrap.querySelector(".car-btn.prev");
  const next = wrap.querySelector(".car-btn.next");

  const scrollByCard = () => {
    const card = track.querySelector(".car-card");
    const step = card ? (card.clientWidth + 16) : 260; // largura + gap
    return step * Math.max(1, Math.floor(track.clientWidth / (card?.clientWidth || step)));
  };

  prev.addEventListener("click", () => track.scrollBy({ left: -scrollByCard(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left:  scrollByCard(), behavior: "smooth" }));

  let isDown = false, startX = 0, startScroll = 0;
  const start = (x) => { isDown = true; startX = x; startScroll = track.scrollLeft; track.classList.add("drag"); };
  const move  = (x) => { if (!isDown) return; track.scrollLeft = startScroll - (x - startX); };
  const end   = () => { isDown = false; track.classList.remove("drag"); };

  track.addEventListener("mousedown", (e) => start(e.pageX));
  track.addEventListener("mousemove", (e) => move(e.pageX));
  document.addEventListener("mouseup", end);

  track.addEventListener("touchstart", (e) => start(e.touches[0].pageX), {passive:true});
  track.addEventListener("touchmove",  (e) => move(e.touches[0].pageX),  {passive:true});
  track.addEventListener("touchend", end);

  // Teclado (quando o carrossel recebe foco)
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { next.click(); e.preventDefault(); }
    if (e.key === "ArrowLeft")  { prev.click(); e.preventDefault(); }
  });
})();

// ===== Toggle do menu mobile + fechar fora =====
(() => {
  const btn  = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (!btn || !menu) return;

  function open(v){
    menu.classList.toggle("open", v);
    btn.setAttribute("aria-expanded", String(v));
  }
  btn.addEventListener("click", () => open(!menu.classList.contains("open")));

  // fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    const within = menu.contains(e.target) || btn.contains(e.target);
    if (!within) open(false);
  });

  // fecha ao pressionar Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") open(false);
  });
})();
