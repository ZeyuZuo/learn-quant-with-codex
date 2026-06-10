import { AppShell } from "../components/app-shell.mjs";
import { CourseDetail } from "../components/course-detail.mjs";
import { CourseSidebar } from "../components/course-sidebar.mjs";

export class CourseDetailPageBuilder {
  constructor({ data, currentLocale, languages, currentIndex }) {
    this.data = data;
    this.currentLocale = currentLocale;
    this.languages = languages;
    this.currentIndex = currentIndex;
  }

  build() {
    const course = this.data.courses[this.currentIndex];
    const children = `
      <div class="learn-layout">
        ${CourseSidebar({
          data: this.data,
          currentLocale: this.currentLocale,
          currentIndex: this.currentIndex
        })}
        ${CourseDetail({
          data: this.data,
          currentLocale: this.currentLocale,
          currentIndex: this.currentIndex
        })}
      </div>
    `;

    return AppShell({
      data: this.data,
      currentLocale: this.currentLocale,
      languages: this.languages,
      title: course.title,
      description: course.summary,
      pageClass: "learn-page",
      children
    });
  }
}
