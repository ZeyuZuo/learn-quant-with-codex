import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const checkedExtensions = new Set([".css", ".js", ".json", ".mjs"]);
const ignoredDirs = new Set([".next", "dist", "node_modules", "out"]);

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...(await listFiles(path.join(dir, entry.name))));
      }
      continue;
    }

    if (checkedExtensions.has(path.extname(entry.name))) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

const failures = [];
const files = await listFiles(rootDir);

for (const filePath of files) {
  const content = await readFile(filePath, "utf8");
  const relativePath = path.relative(rootDir, filePath);

  if (content.includes("\t")) {
    failures.push(`${relativePath}: contains tab characters`);
  }

  const lines = content.split("\n");
  lines.forEach((line, index) => {
    if (/[ \t]$/.test(line)) {
      failures.push(`${relativePath}:${index + 1}: trailing whitespace`);
    }
  });
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lint checks passed");
