import { Header } from "./header.mjs";
import { escapeHtml } from "../lib/html.mjs";

export function AppShell({ data, currentLocale, languages, children }) {
  return `<!doctype html>
<html lang="${currentLocale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(data.home.title)} | ${escapeHtml(data.site.projectName)}</title>
    <meta name="description" content="${escapeHtml(data.home.description)}">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23277c6a'/%3E%3Cpath d='M8 21h16v3H8zm2-4 4-4 3 3 6-8 2 2-8 11-3-3-3 3z' fill='white'/%3E%3C/svg%3E">
    <link rel="stylesheet" href="/assets/main.css">
  </head>
  <body>
    <div class="page">
      ${Header({ data, currentLocale, languages })}
      <main>
        ${children}
      </main>
    </div>
  </body>
</html>
`;
}
