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

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Respect "reduced motion": don't autoplay the hero video
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo && reduceMotion) {
    heroVideo.removeAttribute("autoplay");
    try { heroVideo.pause(); } catch (e) {}
  }

  // Hero play button: click to play the video with sound; hide overlay while playing
  var heroPlay = document.querySelector(".hero-play");
  if (heroPlay && heroVideo) {
    heroPlay.addEventListener("click", function () {
      try {
        heroVideo.muted = false;
        heroVideo.controls = true;
        var p = heroVideo.play();
        if (p && p.then) {
          p.then(function () { heroPlay.classList.add("is-hidden"); }).catch(function () {});
        } else {
          heroPlay.classList.add("is-hidden");
        }
      } catch (e) {}
    });
    heroVideo.addEventListener("pause", function () { heroPlay.classList.remove("is-hidden"); });
  }

  // Scroll-reveal: gently fade/slide sections in as they enter the viewport
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealSel = ".section-head, .card, .split-copy, .split-media, " +
      ".steps .step, .payers, .cta-band, .faq details, .stats, .note";
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSel));
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      // small stagger for items within the same grid
      var parent = el.parentElement;
      if (parent && parent.classList.contains("grid")) {
        var idx = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
      }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---- Cookie / tracking consent (Google Consent Mode v2) ----
  (function () {
    var KEY = "qms-consent";
    function gtagSafe() {
      if (typeof window.gtag === "function") { window.gtag.apply(window, arguments); }
    }
    function applyConsent(state) {
      var v = state === "granted" ? "granted" : "denied";
      gtagSafe("consent", "update", {
        "ad_storage": v, "ad_user_data": v, "ad_personalization": v, "analytics_storage": v
      });
    }
    function store(state) { try { localStorage.setItem(KEY, state); } catch (e) {} }
    function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

    var banner = document.createElement("div");
    banner.className = "cookie-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML =
      '<div class="cookie-consent__inner">' +
        '<p class="cookie-consent__text">We use cookies and similar technologies to analyze site traffic and improve your experience. ' +
        'You can accept or decline analytics and advertising tracking — essential cookies are always on. ' +
        'See our <a href="privacy.html">Privacy Policy</a>.</p>' +
        '<div class="cookie-consent__actions">' +
          '<button type="button" class="btn btn--ghost cookie-decline">Decline</button>' +
          '<button type="button" class="btn btn--accent cookie-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    function hide() { banner.classList.remove("is-open"); }
    function show() { banner.classList.add("is-open"); }

    banner.querySelector(".cookie-accept").addEventListener("click", function () {
      store("granted"); applyConsent("granted"); hide();
    });
    banner.querySelector(".cookie-decline").addEventListener("click", function () {
      store("denied"); applyConsent("denied"); hide();
    });

    // Show the banner only until the visitor has made a choice
    if (!read()) { show(); }

    // Let visitors reopen the banner to change their mind (consent withdrawal)
    function wireReopen(el) {
      el.addEventListener("click", function (e) { e.preventDefault(); show(); });
    }
    document.querySelectorAll("[data-cookie-settings]").forEach(wireReopen);
    document.querySelectorAll(".footer-bottom .links").forEach(function (links) {
      var a = document.createElement("a");
      a.href = "#";
      a.textContent = "Cookie Preferences";
      a.setAttribute("data-cookie-settings", "");
      wireReopen(a);
      links.appendChild(a);
    });
  })();
})();
