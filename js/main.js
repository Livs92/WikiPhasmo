const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    root.classList.add("light");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", (e) => {
      const checked = e.target.checked;
      root.classList.toggle("light", checked);
      localStorage.setItem("theme", checked ? "light" : "dark");
    });
  }

  const btn = $("#menuBtn");
  const menu = $("#menu");
  if (btn && menu) {
    function open(v) {
      menu.classList.toggle("open", v);
      btn.setAttribute("aria-expanded", String(v));
    }

    btn.addEventListener("click", () => open(!menu.classList.contains("open")));

    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("open")) return;
      const within = menu.contains(e.target) || btn.contains(e.target);
      if (!within) open(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") open(false);
    });
  }

  (function () {
    const wrap = $("#homeCarousel");
    if (!wrap) return;

    const track = wrap.querySelector(".car-track");
    const prev = wrap.querySelector(".car-btn.prev");
    const next = wrap.querySelector(".car-btn.next");
    if (!track || !prev || !next) return;

    const scrollByCard = () => {
      const card = track.querySelector(".car-card");
      const step = card ? card.clientWidth + 16 : 260; // largura + gap
      const perView = Math.max(
        1,
        Math.floor(track.clientWidth / (card?.clientWidth || step))
      );
      return step * perView;
    };

    prev.addEventListener("click", () =>
      track.scrollBy({ left: -scrollByCard(), behavior: "smooth" })
    );
    next.addEventListener("click", () =>
      track.scrollBy({ left: scrollByCard(), behavior: "smooth" })
    );

    let isDown = false,
      startX = 0,
      startScroll = 0;
    const start = (x) => {
      isDown = true;
      startX = x;
      startScroll = track.scrollLeft;
      track.classList.add("drag");
    };
    const move = (x) => {
      if (!isDown) return;
      track.scrollLeft = startScroll - (x - startX);
    };
    const end = () => {
      isDown = false;
      track.classList.remove("drag");
    };

    track.addEventListener("mousedown", (e) => start(e.pageX));
    track.addEventListener("mousemove", (e) => move(e.pageX));
    document.addEventListener("mouseup", end);

    track.addEventListener("touchstart", (e) => start(e.touches[0].pageX), {
      passive: true,
    });
    track.addEventListener("touchmove", (e) => move(e.touches[0].pageX), {
      passive: true,
    });
    track.addEventListener("touchend", end);

    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        next.click();
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        prev.click();
        e.preventDefault();
      }
    });
  })();
});
