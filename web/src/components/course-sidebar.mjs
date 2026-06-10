import { courseHref, getCourseGroups, localeHomePath } from "../lib/course-paths.mjs";
import { escapeHtml } from "../lib/html.mjs";

const sidebarLabels = {
  zh: {
    home: "课程首页",
    aria: "课程导航"
  },
  en: {
    home: "Course Home",
    aria: "Course navigation"
  }
};

export function CourseSidebar({ data, currentLocale, currentIndex }) {
  const labels = sidebarLabels[currentLocale] || sidebarLabels.en;
  const groups = getCourseGroups(currentLocale, data.courses);

  const groupMarkup = groups
    .map((group) => {
      const items = group.items
        .map(({ course, index }) => {
          const isActive = index === currentIndex;
          const number = `s${String(index + 1).padStart(2, "0")}`;

          return `
            <li>
              <a class="sidebar-link${isActive ? " is-active" : ""}" href="${courseHref(currentLocale, index)}">
                <span class="sidebar-code">${number}</span>
                <span>${escapeHtml(course.title)}</span>
              </a>
            </li>
          `;
        })
        .join("");

      return `
        <section class="sidebar-group">
          <h2>${escapeHtml(group.label)}</h2>
          <ol>
            ${items}
          </ol>
        </section>
      `;
    })
    .join("");

  return `
    <aside class="course-sidebar" aria-label="${escapeHtml(labels.aria)}">
      <div class="course-sidebar-inner">
        <a class="sidebar-home" href="${localeHomePath(currentLocale)}">${escapeHtml(labels.home)}</a>
        ${groupMarkup}
      </div>
    </aside>
  `;
}
