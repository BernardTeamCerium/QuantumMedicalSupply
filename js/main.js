/* Quantum Medical Supply — small progressive enhancements.
   No dependencies. Site is fully usable without JS. */
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after tapping a link (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Set current year in footer(s)
  var years = document.querySelectorAll("[data-year]");
  var y = String(new Date().getFullYear());
  years.forEach(function (el) { el.textContent = y; });

  // Respect "reduced motion": don't autoplay the hero video
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    try { heroVideo.pause(); } catch (e) {}
  }
})();
