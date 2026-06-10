import { escapeHtml } from "../lib/html.mjs";
import { courseHref } from "../lib/course-paths.mjs";

export function CourseList({ data, currentLocale }) {
  const courseItems = data.courses
    .map((course, index) => {
      const number = String(index + 1).padStart(2, "0");
      const href = courseHref(currentLocale, index);
      const lessons = course.lessons
        .map((lesson, lessonIndex) => {
          const lessonNumber = String(lessonIndex + 1).padStart(2, "0");

          return `
            <li class="lesson-item">
              <span class="lesson-number">${lessonNumber}</span>
              <span>${escapeHtml(lesson.title)}</span>
            </li>
          `;
        })
        .join("");

      return `
        <li class="course-item">
          <span class="course-number">${number}</span>
          <div class="course-copy">
            <h3><a href="${href}">${escapeHtml(course.title)}</a></h3>
            <p>${escapeHtml(course.summary)}</p>
            <ol class="lesson-list">
              ${lessons}
            </ol>
          </div>
        </li>
      `;
    })
    .join("");

  return `
    <section class="course-section" aria-labelledby="course-list-title">
      <div class="section-heading">
        <h2 id="course-list-title">${escapeHtml(data.home.courseListTitle)}</h2>
        <p>${escapeHtml(data.home.courseListDescription)}</p>
      </div>
      <ol class="course-list">
        ${courseItems}
      </ol>
    </section>
  `;
}
