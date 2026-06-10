import { escapeHtml } from "../lib/html.mjs";

export function Hero({ data }) {
  return `
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">${escapeHtml(data.site.projectName)}</p>
      <h1 id="page-title">${escapeHtml(data.home.title)}</h1>
      <p class="hero-description">${escapeHtml(data.home.description)}</p>
    </section>
  `;
}
