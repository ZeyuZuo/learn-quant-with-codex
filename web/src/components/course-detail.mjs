import { courseHref, lessonHref } from "../lib/course-paths.mjs";
import { escapeHtml } from "../lib/html.mjs";

const detailLabels = {
  zh: {
    lessonCount: "小课",
    overview: "本章定位",
    outcomes: "学完本章你应该能",
    lessons: "小课目录",
    lessonGoal: "本节目标",
    previous: "上一章",
    next: "下一章"
  },
  en: {
    lessonCount: "lessons",
    overview: "Chapter Focus",
    outcomes: "After this chapter, you should be able to",
    lessons: "Lesson Outline",
    lessonGoal: "Lesson goal",
    previous: "Previous",
    next: "Next"
  }
};

function courseCode(index) {
  return `s${String(index + 1).padStart(2, "0")}`;
}

function navigationLink({ data, currentLocale, index, label }) {
  if (index < 0 || index >= data.courses.length) {
    return "<span></span>";
  }

  const course = data.courses[index];

  return `
    <a class="course-page-nav-link" href="${courseHref(currentLocale, index)}">
      <span>${escapeHtml(label)}</span>
      <strong>${courseCode(index)} · ${escapeHtml(course.title)}</strong>
    </a>
  `;
}

export function CourseDetail({ data, currentLocale, currentIndex }) {
  const labels = detailLabels[currentLocale] || detailLabels.en;
  const course = data.courses[currentIndex];
  const code = courseCode(currentIndex);
  const lessonItems = course.lessons
    .map((lesson, index) => {
      const lessonNumber = String(index + 1).padStart(2, "0");

      return `
        <section class="detail-lesson" id="${escapeHtml(lesson.id)}">
          <span class="detail-lesson-number">${lessonNumber}</span>
          <div>
            <h3><a href="${lessonHref(currentLocale, currentIndex, index)}">${escapeHtml(lesson.title)}</a></h3>
            <p><strong>${escapeHtml(labels.lessonGoal)}：</strong>${escapeHtml(lesson.goal)}</p>
          </div>
        </section>
      `;
    })
    .join("");
  const outcomes = course.lessons
    .map((lesson) => `<li>${escapeHtml(lesson.goal)}</li>`)
    .join("");

  return `
    <article class="course-detail">
      <header class="course-detail-header">
        <div class="course-detail-kicker">
          <span>${code}</span>
          <span>${course.lessons.length} ${escapeHtml(labels.lessonCount)}</span>
        </div>
        <h1>${escapeHtml(course.title)}</h1>
        <p>${escapeHtml(course.summary)}</p>
      </header>

      <section class="detail-callout">
        <h2>${escapeHtml(labels.overview)}</h2>
        <p>${escapeHtml(course.summary)}</p>
      </section>

      <section class="detail-section">
        <h2>${escapeHtml(labels.outcomes)}</h2>
        <ul class="outcome-list">
          ${outcomes}
        </ul>
      </section>

      <section class="detail-section">
        <h2>${escapeHtml(labels.lessons)}</h2>
        <div class="detail-lessons">
          ${lessonItems}
        </div>
      </section>

      <nav class="course-page-nav" aria-label="${escapeHtml(labels.previous)} / ${escapeHtml(labels.next)}">
        ${navigationLink({
          data,
          currentLocale,
          index: currentIndex - 1,
          label: labels.previous
        })}
        ${navigationLink({
          data,
          currentLocale,
          index: currentIndex + 1,
          label: labels.next
        })}
      </nav>
    </article>
  `;
}
