import { courseHref, lessonHref } from "../lib/course-paths.mjs";
import { escapeHtml } from "../lib/html.mjs";

const lessonLabels = {
  zh: {
    lesson: "小课",
    chapter: "所属章节",
    goal: "本节目标",
    content: "课程正文",
    pending: "本节正文待撰写。",
    previous: "上一节",
    next: "下一节"
  },
  en: {
    lesson: "Lesson",
    chapter: "Chapter",
    goal: "Lesson Goal",
    content: "Lesson Content",
    pending: "Lesson content will be written later.",
    previous: "Previous",
    next: "Next"
  }
};

function code(index, prefix) {
  return `${prefix}${String(index + 1).padStart(2, "0")}`;
}

function flattenLessons(data) {
  return data.courses.flatMap((course, courseIndex) =>
    course.lessons.map((lesson, lessonIndex) => ({
      course,
      lesson,
      courseIndex,
      lessonIndex
    }))
  );
}

function lessonNavLink({ item, currentLocale, label }) {
  if (!item) {
    return "<span></span>";
  }

  return `
    <a class="course-page-nav-link" href="${lessonHref(currentLocale, item.courseIndex, item.lessonIndex)}">
      <span>${escapeHtml(label)}</span>
      <strong>${code(item.courseIndex, "s")} · ${code(item.lessonIndex, "l")} · ${escapeHtml(item.lesson.title)}</strong>
    </a>
  `;
}

export function LessonDetail({ data, currentLocale, currentIndex, currentLessonIndex }) {
  const labels = lessonLabels[currentLocale] || lessonLabels.en;
  const course = data.courses[currentIndex];
  const lesson = course.lessons[currentLessonIndex];
  const flatLessons = flattenLessons(data);
  const flatIndex = flatLessons.findIndex(
    (item) => item.courseIndex === currentIndex && item.lessonIndex === currentLessonIndex
  );
  const previousLesson = flatIndex > 0 ? flatLessons[flatIndex - 1] : null;
  const nextLesson = flatIndex < flatLessons.length - 1 ? flatLessons[flatIndex + 1] : null;

  return `
    <article class="course-detail lesson-detail">
      <header class="course-detail-header">
        <div class="course-detail-kicker">
          <span>${code(currentIndex, "s")}</span>
          <span>${code(currentLessonIndex, "l")}</span>
          <span>${escapeHtml(labels.lesson)}</span>
        </div>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${escapeHtml(lesson.goal)}</p>
      </header>

      <section class="detail-callout">
        <h2>${escapeHtml(labels.chapter)}</h2>
        <p><a href="${courseHref(currentLocale, currentIndex)}">${code(currentIndex, "s")} · ${escapeHtml(
          course.title
        )}</a></p>
      </section>

      <section class="detail-section">
        <h2>${escapeHtml(labels.goal)}</h2>
        <p class="lesson-goal">${escapeHtml(lesson.goal)}</p>
      </section>

      <section class="detail-section">
        <h2>${escapeHtml(labels.content)}</h2>
        <p class="lesson-pending">${escapeHtml(labels.pending)}</p>
      </section>

      <nav class="course-page-nav" aria-label="${escapeHtml(labels.previous)} / ${escapeHtml(labels.next)}">
        ${lessonNavLink({
          item: previousLesson,
          currentLocale,
          label: labels.previous
        })}
        ${lessonNavLink({
          item: nextLesson,
          currentLocale,
          label: labels.next
        })}
      </nav>
    </article>
  `;
}
