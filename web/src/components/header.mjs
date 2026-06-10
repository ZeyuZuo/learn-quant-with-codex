import { escapeHtml } from "../lib/html.mjs";

export function Header({ data, currentLocale, languages }) {
  const languageLinks = languages
    .map((language) => {
      const isCurrent = language.locale === currentLocale;

      return `<a class="language-link${isCurrent ? " is-active" : ""}" href="${language.href}" lang="${language.locale}">${escapeHtml(language.label)}</a>`;
    })
    .join("");

  return `
    <header class="site-header">
      <a class="brand" href="${currentLocale === "en" ? "/en/" : "/"}">${escapeHtml(data.site.projectName)}</a>
      <nav class="header-nav" aria-label="${escapeHtml(data.home.languageLabel)}">
        <div class="language-switch" aria-label="${escapeHtml(data.home.languageLabel)}">
          ${languageLinks}
        </div>
        <a class="github-link" href="${escapeHtml(data.site.githubUrl)}" target="_blank" rel="noreferrer">${escapeHtml(data.home.githubLabel)}</a>
      </nav>
    </header>
  `;
}
