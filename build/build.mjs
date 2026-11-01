// Builds cybrhyk.com from src/ into the repository root (what GitHub Pages serves).
//
//   node build/build.mjs
//
// 1. Prerenders src/home.html in English and Arabic with headless Chrome, so each
//    language has its own URL with the text in the HTML (/ and /ar/).
// 2. Writes the four service landing pages in both languages from build/pages.mjs.
// 3. Moves CSS and JS into hashed files under /assets, and writes the share image,
//    sitemap (with hreflang), robots.txt, llms.txt, web manifest and 404 page.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { PAGES, HOME, UI, STAGES } from "./pages.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs"); // GitHub Pages publishes main:/docs, so src/ and build/ stay private
const SITE = "https://cybrhyk.com";
const EMAIL = "cyber@haykalah.com";
const PORT = 8799;
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(p => fs.existsSync(p));
if (!CHROME) throw new Error("Chrome or Edge is needed for prerendering");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const hash = s => crypto.createHash("md5").update(s).digest("hex").slice(0, 8);
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cybrhyk-chrome-"));
const chrome = args => execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", "--hide-scrollbars", `--user-data-dir=${profile}`, ...args], { maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }).toString("utf8");

const homePath = l => (l === "ar" ? "/ar/" : "/");
const lpPath = (l, slug) => `${l === "ar" ? "/ar" : ""}/services/${slug}/`;
const other = l => (l === "ar" ? "en" : "ar");

/* ---------------- assets ---------------- */
const crlf = s => s.replace(/\r\n/g, "\n");
const srcHome = crlf(fs.readFileSync(path.join(SRC, "home.html"), "utf8"));
const baseCss = srcHome.match(/<style>([\s\S]*?)<\/style>/)[1];
const css = crlf(fs.readFileSync(path.join(SRC, "fonts", "fonts.css"), "utf8")) + baseCss + "\n" + crlf(fs.readFileSync(path.join(SRC, "motion.css"), "utf8")) + "\n" + crlf(fs.readFileSync(path.join(SRC, "landing.css"), "utf8"));
const homeJs = srcHome.match(/<script>\n(\(function\(\)\{[\s\S]*?\n\}\)\(\);)\n<\/script>/)[1];
const CONSENT_JS = crlf(fs.readFileSync(path.join(SRC, "consent.js"), "utf8")).replace(/<\/script/gi, "<\\/script");
const motionJs = crlf(fs.readFileSync(path.join(SRC, "motion.js"), "utf8"));
const A = { css: `site.${hash(css)}.css`, home: `home.${hash(homeJs)}.js`, motion: `motion.${hash(motionJs)}.js` };

fs.rmSync(path.join(OUT, "assets"), { recursive: true, force: true });
write(`assets/${A.css}`, css);
write(`assets/${A.home}`, homeJs);
write(`assets/${A.motion}`, motionJs);
for (const f of fs.readdirSync(path.join(SRC, "fonts")).filter(f => f.endsWith(".woff2"))) write(`assets/fonts/${f}`, fs.readFileSync(path.join(SRC, "fonts", f)));
fs.rmSync(path.join(OUT, "photos"), { recursive: true, force: true });
for (const f of fs.readdirSync(path.join(SRC, "photos", "web"))) write(`photos/${f}`, fs.readFileSync(path.join(SRC, "photos", "web", f)));
for (const f of ["favicon.ico", "icon.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "logo-1024.png"]) write(`assets/${f}`, fs.readFileSync(path.join(SRC, "brand", f)));

/* ---------------- head ---------------- */
const ORG = {
  "@type": "Organization", "@id": `${SITE}/#org`, name: "Cyber HAYKALAH", alternateName: "سايبر هيكلة", url: `${SITE}/`,
  logo: `${SITE}/assets/logo-1024.png`, email: EMAIL, areaServed: { "@type": "Country", name: "Saudi Arabia" },
  address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
  parentOrganization: { "@type": "Organization", name: "HAYKALAH", url: "https://www.haykalah.com" },
  knowsAbout: ["Managed security operations centre", "Managed detection and response", "NCA Essential Cybersecurity Controls ECC-2:2024", "SAMA Cyber Security Framework", "Incident response", "Digital forensics", "Penetration testing"]
};

function head({ lang, title, desc, enPath, arPath, ogTitle, ogDesc, graph }) {
  const self = SITE + (lang === "ar" ? arPath : enPath);
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${self}">
<link rel="alternate" hreflang="en" href="${SITE + enPath}">
<link rel="alternate" hreflang="ar" href="${SITE + arPath}">
<link rel="alternate" hreflang="x-default" href="${SITE + enPath}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="msvalidate.01" content="3F4AE95AB422BA13A6A015BC8DAB6C1B">
${(lang === "ar" ? ["readex-pro-400-arabic", "ibm-plex-sans-arabic-400-arabic"] : ["readex-pro-400-latin", "ibm-plex-sans-400-latin"]).map(f => `<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/${f}.woff2" crossorigin>`).join("\n")}
<meta name="color-scheme" content="light dark">
<link rel="preconnect" href="https://cloudflareinsights.com" crossorigin>
<link rel="preconnect" href="https://static.cloudflareinsights.com">
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "5bc566f58a1b4c39a17e2e0fc2ad5459"}'></script>
<script>${CONSENT_JS}</script>
<meta property="og:type" content="website">
<meta property="og:site_name" content="${lang === "ar" ? "سايبر هيكلة" : "Cyber HAYKALAH"}">
<meta property="og:url" content="${self}">
<meta property="og:title" content="${esc(ogTitle || title)}">
<meta property="og:description" content="${esc(ogDesc || desc)}">
<meta property="og:image" content="${SITE}/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Cyber HAYKALAH: Structured to defend.">
<meta property="og:locale" content="${lang === "ar" ? "ar_SA" : "en_US"}">
<meta property="og:locale:alternate" content="${lang === "ar" ? "en_US" : "ar_SA"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ogTitle || title)}">
<meta name="twitter:description" content="${esc(ogDesc || desc)}">
<meta name="twitter:image" content="${SITE}/assets/og-image.png">
<meta name="theme-color" content="#0A1230">
<link rel="icon" href="/assets/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script type="application/ld+json">${ld}</script>`;
}

/* ---------------- home: prerender both languages ---------------- */
const BG_IDS = ["bgHero", "bgVision", "bgReg", "bgLoop", "bgSvc", "bgDash", "bgComp", "bgAssess", "bgWhy", "bgRoad", "ctaLattice", "heroLattice"];
// The server runs as its own process: execFileSync blocks this one while Chrome loads pages.
const server = spawn(process.execPath, [path.join(ROOT, "build", "serve.mjs"), ROOT, String(PORT)], { stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const built = {};
try {
  for (const lang of ["en", "ar"]) {
    let h = chrome(["--virtual-time-budget=4000", "--window-size=1440,900", "--dump-dom", `http://localhost:${PORT}/src/home.html?lang=${lang}&prerender=1`]);
    h = crlf(h);
    const dir = lang === "ar" ? "rtl" : "ltr";
    h = h.replace(/<html[^>]*>/, `<html lang="${lang}" dir="${dir}" data-built="1">`);
    h = h.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head({
      lang, ...HOME[lang], enPath: "/", arPath: "/ar/",
      graph: [ORG, { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Cyber HAYKALAH", inLanguage: ["en", "ar"], publisher: { "@id": `${SITE}/#org` } },
        { "@type": "WebPage", "@id": `${SITE + homePath(lang)}#page`, url: SITE + homePath(lang), name: HOME[lang].title, description: HOME[lang].desc, inLanguage: lang, isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#org` } }]
    }));
    const n0 = h.length;
    h = h.replace(/<style>[\s\S]*?<\/style>\s*<link rel="stylesheet" href="motion.css">/, `<style>${css}</style>`);
    h = h.replace(/<script>\n\(function\(\)\{[\s\S]*?\n\}\)\(\);\n<\/script>\s*<script src="motion.js"><\/script>/, `<script src="/assets/${A.home}" defer></script>\n<script src="/assets/${A.motion}" defer></script>`);
    if (h.includes('href="motion.css"') || h.includes('src="motion.js"') || (h.match(/<style>/g) || []).length !== 1) throw new Error(`asset extraction failed (${lang})`);
    h = h.replace(new RegExp(`(<svg[^>]*\\bid="(?:${BG_IDS.join("|")})"[^>]*>)[\\s\\S]*?(<\\/svg>)`, "g"), "$1$2");
    if (lang === "ar") h = h.replace(/\salt="[^"]*"(\s[^>]*?)?\sdata-alt-ar="([^"]*)"/g, (m, mid, ar) => ` alt="${ar}"${mid || ""}`);
    h = h.replace(/\sdata-alt-ar="[^"]*"/g, "");
    h = h.replace(/\sdata-(?:ar|en)="[^"]*"/g, "");
    h = h.replace(/<button class="lang" id="langBtn"([^>]*)>([\s\S]*?)<\/button>/, (m, attrs, inner) => `<a class="lang" id="langBtn" href="${homePath(other(lang))}" hreflang="${other(lang)}"${attrs}>${inner}</a>`);
    if (lang === "ar") h = h.replace(/href="\/services\//g, 'href="/ar/services/');
    h = "<!doctype html>\n" + h;
    built[lang] = h;
    write(lang === "ar" ? "ar/index.html" : "index.html", h);
    console.log(`home ${lang}: ${(h.length / 1024).toFixed(0)} KB (prerendered ${(n0 / 1024).toFixed(0)} KB)`);
  }

  /* share image */
  const png = path.join(OUT, "assets", "og-image.png");
  chrome(["--virtual-time-budget=6000", "--window-size=1200,630", `--screenshot=${png}`, `http://localhost:${PORT}/src/og.html`]);
  console.log("og-image:", fs.existsSync(png) ? `${(fs.statSync(png).size / 1024).toFixed(0)} KB` : "MISSING");
} finally {
  server.kill();
}

/* ---------------- landing pages ---------------- */
// AI-generated hero photo per service page: [file, alt en, alt ar]
const PHOTO = {
  "managed-soc-mdr": ["night-analyst", "A security analyst monitoring live alerts across several screens during a night shift", "محلل أمني يراقب التنبيهات المباشرة على عدة شاشات في نوبة ليلية"],
  "ecc-2-compliance": ["compliance-review", "Two compliance specialists reviewing control evidence together at a meeting table", "مختصّا امتثال يراجعان أدلة الضوابط معاً على طاولة اجتماعات"],
  "sama-csf": ["bank-hq", "The glass headquarters of a Saudi bank in Riyadh's financial district", "المقر الزجاجي لبنك سعودي في الحي المالي بالرياض"],
  "incident-response": ["ir-war-room", "An incident response team coordinating in a war room around a shared timeline", "فريق استجابة للحوادث ينسّق في غرفة عمليات حول جدول زمني مشترك"],
  "penetration-testing": ["pentest-office", "Two penetration testers reviewing an attack path and findings in a Riyadh office", "مختبرا اختراق يراجعان مسار الهجوم والنتائج في مكتب بالرياض"],
  "cloud-security": ["cloud-datacentre", "A cloud security engineer checking configuration on a tablet between server racks in an in-Kingdom data centre", "مهندس أمن سحابي يراجع الإعدادات على جهاز لوحي بين خزائن الخوادم في مركز بيانات داخل المملكة"],
  "ncnicc-compliance": ["ncnicc-control-room", "An operations engineer and a cyber compliance specialist reviewing plant control systems in a critical infrastructure control room", "مهندس تشغيل ومختصة امتثال سيبراني يراجعان أنظمة التحكم في غرفة تحكم لمنشأة بنية تحتية حساسة"]
};
const lpPhoto = (slug, lang) => { const [f, en, ar] = PHOTO[slug]; return `<figure class="lp-photo"><img src="/photos/${f}-1376.webp" srcset="/photos/${f}-480.webp 480w, /photos/${f}-760.webp 760w, /photos/${f}-1376.webp 1376w" sizes="(max-width:1024px) 100vw, 560px" width="1376" height="768" alt="${esc(lang === "ar" ? ar : en)}" fetchpriority="high" decoding="async"></figure>`; };
// Static vector backgrounds (no runtime script needed on these pages).
function circuitSvg(seed, color) {
  let s = seed; const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 };
  let d = "", nodes = "";
  for (let n = 0; n < 34; n++) {
    let x = Math.round(r() * 40) * 36, y = Math.round(r() * 22) * 36; let p = `M${x} ${y}`;
    for (let k = 0; k < 4; k++) { const len = 36 * (1 + Math.floor(r() * 4)); if (k % 2 === 0) x += (r() < .5 ? -1 : 1) * len; else y += (r() < .5 ? -1 : 1) * len; p += ` L${x} ${y}`; }
    d += p + " "; nodes += `<circle cx="${x}" cy="${y}" r="3.5"/>`;
  }
  return `<svg class="bg fade-side" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="${d}" fill="none" stroke="${color}" stroke-opacity=".14" stroke-width="1.4"/><g fill="none" stroke="#00D1FF" stroke-opacity=".5" stroke-width="1.4">${nodes}</g></svg>`;
}
function ringsSvg() {
  let c = ""; for (let r = 60; r < 1500; r += 70) c += `<circle cx="1260" cy="380" r="${r}" fill="none" stroke="#3D5AB5" stroke-opacity=".22"${r % 140 ? ' stroke-dasharray="2 8"' : ""}/>`;
  return `<svg class="bg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${c}</svg>`;
}
const gem = c => `<svg class="gem" viewBox="0 0 16 42" aria-hidden="true"><path d="M8 0 16 21 8 42 0 21Z" fill="${c}"/></svg>`;

function chrome2(lang, page) {
  // nav + footer lifted from the built home page of the same language, with in-page links pointed home
  const h = built[lang];
  const fix = html => html.replace(/href="#(\w+)"/g, (m, id) => id === "contact" ? m : `href="${homePath(lang)}${id === "top" ? "" : "#" + id}"`);
  let nav = fix(h.match(/<nav class="top" id="nav">[\s\S]*?<\/nav>/)[0]);
  nav = nav.replace(/(<a class="lang" id="langBtn" href=")[^"]*(")/, `$1${lpPath(other(lang), page.slug)}$2`);
  const footer = fix(h.match(/<footer>[\s\S]*?<\/footer>/)[0]);
  return { nav, footer };
}

for (const page of PAGES) {
  for (const lang of ["en", "ar"]) {
    const t = page[lang], u = UI[lang], dir = lang === "ar" ? "rtl" : "ltr";
    const self = lpPath(lang, page.slug), { nav, footer } = chrome2(lang, page);
    const subject = encodeURIComponent(`${t.nav} enquiry`);
    const graph = [
      ORG,
      { "@type": "Service", "@id": `${SITE + self}#service`, name: t.nav, serviceType: t.serviceType, description: t.desc, provider: { "@id": `${SITE}/#org` }, areaServed: { "@type": "Country", name: "Saudi Arabia" }, url: SITE + self, inLanguage: lang },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: u.home, item: SITE + homePath(lang) },
        { "@type": "ListItem", position: 2, name: u.services, item: `${SITE + homePath(lang)}#services` },
        { "@type": "ListItem", position: 3, name: t.nav, item: SITE + self }] },
      { "@type": "FAQPage", "@id": `${SITE + self}#faq`, inLanguage: lang, mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
    ];
    const html = `<!doctype html>
<html lang="${lang}" dir="${dir}" data-built="1">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${head({ lang, title: t.title, desc: t.desc, enPath: lpPath("en", page.slug), arPath: lpPath("ar", page.slug), graph })}
<script>(function(d){d.classList.add("js");var t=null;try{t=localStorage.getItem("theme")}catch(e){}var m=t==="light"||t==="dark"?t:"auto";d.setAttribute("data-mode",m);d.setAttribute("data-theme",m==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):m)})(document.documentElement)</script>
<style>${css}</style>
</head>
<body>
${nav}

<header class="hero lp-hero" id="top">
  ${circuitSvg(page.slug.length * 97 + (lang === "ar" ? 7 : 3), page.color)}
  <div class="wrap">
    <div class="grid">
      <div class="rv">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${homePath(lang)}">${u.home}</a><span aria-hidden="true">${lang === "ar" ? "‹" : "›"}</span><a href="${homePath(lang)}#services">${u.services}</a><span aria-hidden="true">${lang === "ar" ? "‹" : "›"}</span><span aria-current="page">${esc(t.nav)}</span></nav>
        <div class="label">${esc(t.kicker)}</div>
        <h1>${esc(t.h1)}</h1>
        <p class="lead">${esc(t.lead)}</p>
        <div class="ctas">
          <a class="btn primary" href="mailto:${EMAIL}?subject=${subject}">${u.email}: ${EMAIL}</a>
          <a class="btn ghost" href="${homePath(lang)}">${u.back}</a>
        </div>
      </div>
      <div class="lp-side rv">
        ${lpPhoto(page.slug, lang)}
      <div class="lp-facts">
        ${t.facts.map(([n, p], i) => `<div class="lp-fact" style="--c:${STAGES[(i + 1) % 6]}"><span class="n">${esc(n)}</span><p>${esc(p)}</p></div>`).join("\n        ")}
      </div>
      </div>
    </div>
  </div>
</header>

<section id="what" data-name="${esc(UI.en.cards)}" data-name-ar="${esc(UI.ar.cards)}">
  <div class="wrap">
    <div class="sec-head rv"><div class="label">${esc(t.nav)}</div><h2>${esc(t.cardsTitle)}</h2></div>
    <div class="lp-cards">
      ${t.cards.map(([h3, p], i) => `<article class="lp-card rv">${gem(STAGES[i % 6])}<h3>${esc(h3)}</h3><p>${esc(p)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="night" id="how" data-name="${esc(UI.en.steps)}" data-name-ar="${esc(UI.ar.steps)}">
  ${ringsSvg()}
  <div class="wrap">
    <div class="sec-head rv"><div class="label">${esc(u.steps)}</div><h2>${esc(t.stepsTitle)}</h2></div>
    <ol class="lp-steps">
      ${t.steps.map(([h3, p], i) => `<li class="rv" style="--c:${STAGES[i % 6]}"><span class="k">${String(i + 1).padStart(2, "0")}</span><h3>${esc(h3)}</h3><p>${esc(p)}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<section id="frameworks" data-name="${esc(UI.en.fw)}" data-name-ar="${esc(UI.ar.fw)}">
  <div class="wrap">
    <div class="sec-head rv"><div class="label">${esc(u.fw)}</div><h2>${esc(t.fwTitle)}</h2></div>
    <div class="lp-fw rv">${t.fw.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
  </div>
</section>

<section id="faq" data-name="${esc(UI.en.faqN)}" data-name-ar="${esc(UI.ar.faqN)}" style="background:var(--white)">
  <div class="wrap">
    <div class="sec-head rv"><div class="label">${esc(u.faqN)}</div><h2>${esc(u.faq)}</h2></div>
    <div class="faq">
      ${t.faq.map(([q, a], i) => `<details class="rv"${i === 0 ? " open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n      ")}
    </div>
    <div class="sec-head rv" style="margin:72px 0 24px"><div class="label">${esc(u.related)}</div></div>
    <div class="lp-related">
      ${page.related.map(s => { const p = PAGES.find(x => x.slug === s)[lang]; return `<a class="rv" href="${lpPath(lang, s)}"><b>${esc(p.nav)}</b><span>${u.learn} ${lang === "ar" ? "←" : "→"}</span></a>`; }).join("\n      ")}
    </div>
  </div>
</section>

<section class="cta night" id="contact">
  ${ringsSvg()}
  <div class="wrap">
    <div class="label rv">${lang === "ar" ? "أدخِل الضوء، واحجب الخطر." : "Let the light in. Keep the threat out."}</div>
    <h2 style="margin-top:18px">${esc(u.ctaH)} ${esc(t.nav)}</h2>
    <p class="rv">${esc(u.ctaP)}</p>
    <div class="ctas rv" style="display:flex;gap:14px;flex-wrap:wrap"><a class="btn primary" href="mailto:${EMAIL}?subject=${subject}">${EMAIL}</a><a class="btn ghost" href="${homePath(lang)}">${u.back}</a></div>
    <p class="source rv" style="margin-top:28px">${esc(u.illus)}</p>
  </div>
</section>

${footer}
<script src="/assets/${A.motion}" defer></script>
</body>
</html>
`;
    write(self.replace(/^\//, "") + "index.html", html);
  }
}
console.log(`landing pages: ${PAGES.length * 2}`);

/* ---------------- sitemap, robots, llms.txt, manifest, 404 ---------------- */
const today = new Date().toISOString().slice(0, 10);
const pairs = [["/", "/ar/"], ...PAGES.map(p => [lpPath("en", p.slug), lpPath("ar", p.slug)])];
const urlEntry = (loc, en, ar) => `  <url>
    <loc>${SITE + loc}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE + en}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${SITE + ar}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + en}"/>
  </url>`;
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pairs.flatMap(([en, ar]) => [urlEntry(en, en, ar), urlEntry(ar, en, ar)]).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
write("CNAME", "cybrhyk.com\n");
write(".nojekyll", "");
write("llms.txt", `# Cyber HAYKALAH

> Cyber HAYKALAH (سايبر هيكلة), a HAYKALAH company, runs security operations for financial, enterprise and private-sector clients in Saudi Arabia: a 24/7 managed SOC with managed detection and response, governance and compliance evidence for the NCA Essential Cybersecurity Controls (ECC-2:2024) and the SAMA Cyber Security Framework, incident response and digital forensics, penetration testing, and cloud security. Based in Riyadh and Jeddah. Contact: ${EMAIL}.

## Pages
- [Home (English)](${SITE}/): the Kingdom's cyber vision, the national frameworks, the SOC loop, services, a sample SOC dashboard and a maturity self-check
- [Home (Arabic)](${SITE}/ar/)
${PAGES.map(p => `- [${p.en.nav}](${SITE + lpPath("en", p.slug)}): ${p.en.desc}\n- [${p.ar.nav}](${SITE + lpPath("ar", p.slug)})`).join("\n")}

## Notes
- Market and plan figures on the site are indicative; dashboard and assessment data are illustrative.
`);
write("site.webmanifest", JSON.stringify({ name: "Cyber HAYKALAH", short_name: "Cyber HAYKALAH", start_url: "/", display: "browser", background_color: "#0A1230", theme_color: "#0A1230",
  icons: [{ src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" }, { src: "/assets/icon.svg", sizes: "any", type: "image/svg+xml" }] }, null, 2));
write("404.html", `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | Cyber HAYKALAH</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/assets/favicon.ico" sizes="48x48">
<style>${css}</style>
</head>
<body class="night" style="min-height:100vh;display:grid;place-items:center;text-align:center">
<main style="padding:40px 20px">
  <div class="label" style="color:var(--cyan)">404</div>
  <h1 style="font-size:clamp(36px,6vw,64px);margin:16px 0">This page isn't here.</h1>
  <p style="color:var(--muted-n);margin-bottom:12px">The address may have changed.</p>
  <p lang="ar" dir="rtl" style="color:var(--muted-n);font-family:'IBM Plex Sans Arabic',sans-serif;margin-bottom:32px">هذه الصفحة غير موجودة. ربما تغيّر العنوان.</p>
  <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap"><a class="btn primary" href="/">Home</a><a class="btn ghost" style="color:#fff;box-shadow:inset 0 0 0 1.5px #fff" href="/ar/" lang="ar">الرئيسية</a></div>
</main>
</body>
</html>
`);
fs.rmSync(profile, { recursive: true, force: true });
console.log("done:", A);

/* ---------------- guard: every inline script in the output must parse ---------------- */
(function checkInlineScripts(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { checkInlineScripts(p); continue; }
    if (!e.name.endsWith(".html")) continue;
    for (const m of fs.readFileSync(p, "utf8").matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      try { new Function(m[1]); } catch (err) { throw new Error(`inline script syntax error in ${path.relative(OUT, p)}: ${err.message}`); }
    }
  }
})(OUT);
