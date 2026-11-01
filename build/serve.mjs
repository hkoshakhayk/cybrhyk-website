// Tiny static server for previewing the site (and for the build's prerender step).
// Usage: node build/serve.mjs [root] [port]   — folders serve their index.html, like GitHub Pages.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json", ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json" };

export function serve(root, port) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    let f = path.join(root, p);
    if (!f.startsWith(path.resolve(root))) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); } catch {}
    fs.readFile(f, (e, d) => {
      if (e) {
        const nf = path.join(root, "404.html");
        res.writeHead(404, { "Content-Type": TYPES[".html"] });
        return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "Not found");
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
      res.end(d);
    });
  });
  return new Promise(r => server.listen(port, () => r(server)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] || path.join(here, ".."));
  const port = +(process.env.PORT || process.argv[3] || 8765);
  serve(root, port).then(() => console.log(`Serving ${root} on http://localhost:${port}`));
}
