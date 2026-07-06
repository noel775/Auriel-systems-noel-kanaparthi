/* AURIEL SYSTEMS — interactions
   nav · scroll reveals · registration HUD · contact form
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------- registration / viewfinder HUD (decorative) -------- */
  (function injectHud() {
    if (document.querySelector(".hud")) return;
    var hud = document.createElement("div");
    hud.className = "hud";
    hud.setAttribute("aria-hidden", "true");
    hud.innerHTML =
      '<span class="hud__corner hud__corner--tl"></span>' +
      '<span class="hud__corner hud__corner--tr"></span>' +
      '<span class="hud__corner hud__corner--bl"></span>' +
      '<span class="hud__corner hud__corner--br"></span>' +
      '<span class="hud__spine">Auriel Systems · Est. MMXXIV · Gurugram</span>';
    document.body.appendChild(hud);
  })();

  /* -------- mobile nav toggle -------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------- scroll reveals (staggered, rect-based & bulletproof) -------- */
  (function reveals() {
    var targets = [];
    document.querySelectorAll(".section:not(.hero)").forEach(function (sec) {
      Array.prototype.forEach.call(sec.children, function (el) {
        if (el.tagName === "SCRIPT" || el.classList.contains("reveal")) return;
        el.classList.add("reveal");
        targets.push(el);
      });
    });

    // stagger delay by position within parent
    targets.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
        return c.classList && c.classList.contains("reveal");
      });
      el.dataset.rIdx = Math.min(sibs.indexOf(el), 6);
    });

    if (reduce) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    function show(el) {
      if (el.classList.contains("is-in")) return;
      el.style.transitionDelay = (parseInt(el.dataset.rIdx, 10) || 0) * 80 + "ms";
      el.classList.add("is-in");
    }
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = targets.length - 1; i >= 0; i--) {
        var el = targets[i];
        if (el.classList.contains("is-in")) { targets.splice(i, 1); continue; }
        if (el.getBoundingClientRect().top < vh * 0.9) show(el);
      }
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { check(); ticking = false; });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("load", check);
    check();
    // safety net: never leave content hidden
    setTimeout(function () { targets.slice().forEach(show); }, 2600);
  })();

  /* -------- contact form (mailto) -------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var subject = "Website enquiry" + (name ? " — " + name : "");
      var body = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + company,
        "",
        message
      ].join("\n");

      window.location.href =
        "mailto:noel@auriel.co.in?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      var wrap = document.querySelector("#contact-form-wrap");
      var success = document.querySelector("#contact-success");
      if (wrap && success) {
        wrap.classList.add("is-hidden");
        success.classList.remove("is-hidden");
      }
    });
  }
})();
