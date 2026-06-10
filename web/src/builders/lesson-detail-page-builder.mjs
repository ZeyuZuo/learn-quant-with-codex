import { AppShell } from "../components/app-shell.mjs";
import { LessonDetail } from "../components/lesson-detail.mjs";
import { CourseSidebar } from "../components/course-sidebar.mjs";

export class LessonDetailPageBuilder {
  constructor({ data, currentLocale, languages, currentIndex, currentLessonIndex }) {
    this.data = data;
    this.currentLocale = currentLocale;
    this.languages = languages;
    this.currentIndex = currentIndex;
    this.currentLessonIndex = currentLessonIndex;
  }

  build() {
    const course = this.data.courses[this.currentIndex];
    const lesson = course.lessons[this.currentLessonIndex];
    const children = `
      <div class="learn-layout">
        ${CourseSidebar({
          data: this.data,
          currentLocale: this.currentLocale,
          currentIndex: this.currentIndex,
          currentLessonIndex: this.currentLessonIndex
        })}
        ${LessonDetail({
          data: this.data,
          currentLocale: this.currentLocale,
          currentIndex: this.currentIndex,
          currentLessonIndex: this.currentLessonIndex
        })}
      </div>
    `;

    return AppShell({
      data: this.data,
      currentLocale: this.currentLocale,
      languages: this.languages,
      title: lesson.title,
      description: lesson.goal,
      pageClass: "learn-page",
      children
    });
  }
}
