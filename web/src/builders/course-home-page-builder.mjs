import { AppShell } from "../components/app-shell.mjs";
import { CourseList } from "../components/course-list.mjs";
import { Hero } from "../components/hero.mjs";

export class CourseHomePageBuilder {
  constructor({ data, currentLocale, languages }) {
    this.data = data;
    this.currentLocale = currentLocale;
    this.languages = languages;
    this.sections = [];
  }

  withHero() {
    this.sections.push(Hero({ data: this.data }));
    return this;
  }

  withCourseList() {
    this.sections.push(CourseList({ data: this.data }));
    return this;
  }

  build() {
    return AppShell({
      data: this.data,
      currentLocale: this.currentLocale,
      languages: this.languages,
      children: this.sections.join("\n")
    });
  }
}
