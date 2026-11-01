/* Analytics consent. Google Analytics 4 (property "Cyber HAYKALAH - cybrhyk.com", G-YSQ4CDJ3CG) sets cookies,
   so its library loads only after the visitor accepts. The choice is remembered on the device and can be changed
   from "Cookie settings" in the footer. Cloudflare's cookie-free page counts run regardless.
   Inlined into every page's <head> by build/build.mjs. */
(function () {
  var GA = "G-YSQ4CDJ3CG", KEY = "cybr-consent", d = document, w = window;
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = gtag;
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function loadGA() {
    if (loaded) return; loaded = true;
    gtag("js", new Date()); gtag("config", GA);
    var s = d.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA;
    d.head.appendChild(s);
  }

  var T = {
    en: { text: "We'd like to use Google Analytics cookies to understand how visitors use this site. No advertising, and nothing is shared for marketing.",
          yes: "Accept", no: "Decline", label: "Cookie consent" },
    ar: { text: "نودّ استخدام ملفات تعريف الارتباط من Google Analytics لفهم كيفية استخدام الزوار للموقع، دون إعلانات ودون مشاركة أي بيانات لأغراض تسويقية.",
          yes: "قبول", no: "رفض", label: "الموافقة على ملفات تعريف الارتباط" }
  };

  function hide() { var b = d.getElementById("consent"); if (b) b.remove(); }
  function choose(v) {
    set(v); hide();
    if (v === "granted") loadGA();
    else if (loaded) { location.reload(); } // stop an already-running tracker
  }
  function show() {
    if (d.getElementById("consent")) return;
    var t = T[d.documentElement.lang === "ar" ? "ar" : "en"];
    var b = d.createElement("div");
    b.id = "consent"; b.className = "consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", t.label);
    b.innerHTML = '<p></p><div class="consent-b"><button type="button" class="btn ghost sm" data-c="denied"></button><button type="button" class="btn primary sm" data-c="granted"></button></div>';
    b.querySelector("p").textContent = t.text;
    b.querySelector('[data-c="denied"]').textContent = t.no;
    b.querySelector('[data-c="granted"]').textContent = t.yes;
    b.addEventListener("click", function (e) { var c = e.target.closest("[data-c]"); if (c) choose(c.getAttribute("data-c")); });
    d.body.appendChild(b);
  }
  w.cybrConsent = show; // footer "Cookie settings"

  addEventListener("load", function () {
    var c = get();
    if (c === "granted") setTimeout(loadGA, 1200);
    else if (c !== "denied") setTimeout(show, 900);
  });

  // clicks on the email buttons count as leads (only recorded once analytics is allowed)
  addEventListener("click", function (e) {
    var l = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (l && loaded) gtag("event", "generate_lead", { method: "email", link_text: (l.textContent || "").trim().slice(0, 60) });
  });
})();
