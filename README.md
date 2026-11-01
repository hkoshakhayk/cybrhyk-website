# cybrhyk.com

Source for the Cyber HAYKALAH website, published with GitHub Pages.

- `src/` — the page sources: `home.html` (bilingual template), `motion.css` / `motion.js` (full-page card snap and motion), `landing.css`, `og.html` (share image), `brand/` (logos and icons).
- `build/pages.mjs` — English and Arabic content for the service pages, page titles and descriptions.
- `build/build.mjs` — builds the published site into `docs/` (what GitHub Pages serves): `/` and `/ar/`, `/services/*` and `/ar/services/*`, `/assets`, `sitemap.xml`, `robots.txt`, `llms.txt`, `site.webmanifest`, `404.html`.

Edit files in `src/` or `build/pages.mjs`, then rebuild (needs Node and Chrome or Edge):

    node build/build.mjs

Preview locally with `node build/serve.mjs` and open http://localhost:8765/. Commit and push to `main` to publish. GitHub Pages serves `main:/docs`.
