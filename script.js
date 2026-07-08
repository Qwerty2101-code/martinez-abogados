/* =========================================================
   Martínez Abogados — Interacciones
   ========================================================= */
(function () {
  "use strict";

  /* ---- Año dinámico en el footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Barra de progreso de lectura (inyectada) ---- */
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);

  /* ---- Botón volver arriba (inyectado) ---- */
  var toTop = document.createElement("button");
  toTop.className = "back-to-top";
  toTop.setAttribute("aria-label", "Volver arriba / Back to top");
  toTop.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(toTop);

  /* ---- Header con sombra + progreso + volver arriba al hacer scroll ---- */
  var header = document.getElementById("header");
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    toTop.classList.toggle("visible", y > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---- Resaltar la página actual en la navegación ---- */
  var path = (location.pathname.split("/").pop() || "index.html");
  if (path === "") path = "index.html";
  document.querySelectorAll(".nav a, .side-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var base = href.split("#")[0];
    if (base && base === path) a.classList.add("is-current");
    if (base === "areas.html" && /^area-/.test(path)) a.classList.add("is-current");
  });

  /* =======================================================
     Idioma ES / EN
     ======================================================= */
  var currentLang = "es";
  var textEls = document.querySelectorAll("[data-en]");
  var phEls = document.querySelectorAll("[data-en-placeholder]");

  // Capturar el contenido original en español
  textEls.forEach(function (el) { el.dataset.es = el.innerHTML; });
  phEls.forEach(function (el) { el.dataset.esPlaceholder = el.getAttribute("placeholder") || ""; });

  var FEEDBACK = {
    es: "Gracias. Hemos recibido su mensaje y le responderemos a la brevedad.",
    en: "Thank you. We have received your message and will respond shortly."
  };
  var SENDING = { es: "Enviando...", en: "Sending..." };

  function applyLang(lang) {
    currentLang = lang === "en" ? "en" : "es";
    textEls.forEach(function (el) {
      el.innerHTML = currentLang === "en" ? el.dataset.en : el.dataset.es;
    });
    phEls.forEach(function (el) {
      el.setAttribute("placeholder", currentLang === "en" ? el.dataset.enPlaceholder : el.dataset.esPlaceholder);
    });
    document.documentElement.lang = currentLang;
    document.querySelectorAll(".lang-toggle__opt").forEach(function (opt) {
      opt.classList.toggle("is-active", opt.dataset.lang === currentLang);
    });
    try { localStorage.setItem("ma-lang", currentLang); } catch (e) {}
  }

  // Selector de idioma
  document.querySelectorAll(".lang-toggle__opt").forEach(function (opt) {
    opt.addEventListener("click", function () { applyLang(opt.dataset.lang); });
  });

  // Idioma inicial: override por URL (#lang=en) > preferencia guardada > navegador
  var saved;
  var hashMatch = (location.hash + " " + location.search).match(/lang=(en|es)/);
  if (hashMatch) {
    saved = hashMatch[1];
  } else {
    try { saved = localStorage.getItem("ma-lang"); } catch (e) {}
    if (!saved) saved = (navigator.language || "es").slice(0, 2) === "en" ? "en" : "es";
  }
  applyLang(saved);

  /* ---- Animaciones reveal al entrar en viewport ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Formulario de contacto (sin backend por ahora) ---- */
  var form = document.getElementById("contactForm");
  var feedback = document.getElementById("formFeedback");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = SENDING[currentLang]; }
      setTimeout(function () {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = currentLang === "en" ? btn.dataset.en : btn.dataset.es;
        }
        if (feedback) feedback.textContent = FEEDBACK[currentLang];
      }, 800);
    });
  }
})();
