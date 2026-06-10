import { courseHref, getCourseGroups, lessonHref, localeHomePath } from "../lib/course-paths.mjs";
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

export function CourseSidebar({ data, currentLocale, currentIndex, currentLessonIndex = null }) {
  const labels = sidebarLabels[currentLocale] || sidebarLabels.en;
  const groups = getCourseGroups(currentLocale, data.courses);

  const groupMarkup = groups
    .map((group) => {
      const items = group.items
        .map(({ course, index }) => {
          const isActive = index === currentIndex;
          const number = `s${String(index + 1).padStart(2, "0")}`;
          const lessonItems =
            isActive
              ? `
                <ol class="sidebar-lessons">
                  ${course.lessons
                    .map((lesson, lessonIndex) => {
                      const isLessonActive = lessonIndex === currentLessonIndex;
                      const lessonNumber = String(lessonIndex + 1).padStart(2, "0");

                      return `
                        <li>
                          <a class="sidebar-lesson-link${isLessonActive ? " is-active" : ""}" href="${lessonHref(
                            currentLocale,
                            index,
                            lessonIndex
                          )}">
                            <span>${lessonNumber}</span>
                            <span>${escapeHtml(lesson.title)}</span>
                          </a>
                        </li>
                      `;
                    })
                    .join("")}
                </ol>
              `
              : "";

          return `
            <li>
              <a class="sidebar-link${isActive ? " is-active" : ""}" href="${courseHref(currentLocale, index)}">
                <span class="sidebar-code">${number}</span>
                <span>${escapeHtml(course.title)}</span>
              </a>
              ${lessonItems}
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
