import { createReadStream, existsSync, watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "./build.mjs";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const distDir = path.join(rootDir, "dist");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 4173);
const liveReloadPath = "/__events";
const reloadClients = new Set();
const liveReloadScript = `
<script>
  new EventSource("/__events").addEventListener("reload", () => {
    window.location.reload();
  });
</script>`;

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"]
]);

function resolveRequestPath(url) {
  const requestUrl = new URL(url, `http://${host}:${port}`);
  const cleanPath = decodeURIComponent(requestUrl.pathname);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const candidate = path.normalize(path.join(distDir, relativePath));

  if (!candidate.startsWith(distDir)) {
    return null;
  }

  if (existsSync(candidate) && !candidate.endsWith(path.sep)) {
    return candidate;
  }

  return path.join(candidate, "index.html");
}

const server = createServer(async (request, response) => {
  if (request.url === liveReloadPath) {
    response.writeHead(200, {
      "cache-control": "no-cache",
      "content-type": "text/event-stream",
      "connection": "keep-alive"
    });
    response.write("\n");
    reloadClients.add(response);
    request.on("close", () => reloadClients.delete(response));
    return;
  }

  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath) {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      throw new Error("Not a file");
    }

    const extension = path.extname(filePath);
    const contentType = contentTypes.get(extension) || "application/octet-stream";
    response.writeHead(200, { "content-type": contentType });

    if (extension === ".html") {
      const html = await readFile(filePath, "utf8");
      response.end(html.replace("</body>", `${liveReloadScript}\n  </body>`));
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

let rebuildTimer;

function scheduleRebuild() {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(async () => {
    try {
      await build({ log: false });
      for (const client of reloadClients) {
        client.write("event: reload\ndata: ok\n\n");
      }
      console.log("Rebuilt and refreshed browser");
    } catch (error) {
      console.error(error);
    }
  }, 80);
}

for (const dir of ["content", "src"]) {
  watch(path.join(rootDir, dir), { recursive: true }, scheduleRebuild);
}

await build();

server.listen(port, host, () => {
  console.log(`Serving web/dist at http://${host}:${port}`);
});
