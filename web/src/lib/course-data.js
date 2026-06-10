import enData from "../../content/courses/en.json";
import zhData from "../../content/courses/zh.json";

export const locales = ["zh", "en"];

export const languages = [
  { locale: "zh", label: "中文", href: "/" },
  { locale: "en", label: "English", href: "/en/" }
];

export function getCourseData(locale) {
  return locale === "en" ? enData : zhData;
}

export function courseSlug(index) {
  return `s${String(index + 1).padStart(2, "0")}`;
}

export function lessonSlug(index) {
  return `l${String(index + 1).padStart(2, "0")}`;
}

export function localeHomePath(locale) {
  return locale === "en" ? "/en/" : "/";
}

export function courseHref(locale, index) {
  const slug = courseSlug(index);
  return locale === "en" ? `/en/${slug}/` : `/${slug}/`;
}

export function lessonHref(locale, courseIndex, lessonIndex) {
  return `${courseHref(locale, courseIndex)}${lessonSlug(lessonIndex)}/`;
}

export function slugToIndex(slug, prefix) {
  const match = new RegExp(`^${prefix}(\\d{2})$`).exec(slug);
  if (!match) {
    return -1;
  }

  return Number(match[1]) - 1;
}

export function getCourseBySlug(locale, slug) {
  const data = getCourseData(locale);
  const index = slugToIndex(slug, "s");
  const course = data.courses[index];

  if (!course) {
    return null;
  }

  return { data, course, index };
}

export function getLessonBySlug(locale, courseSlugValue, lessonSlugValue) {
  const coursePage = getCourseBySlug(locale, courseSlugValue);
  if (!coursePage) {
    return null;
  }

  const lessonIndex = slugToIndex(lessonSlugValue, "l");
  const lesson = coursePage.course.lessons[lessonIndex];

  if (!lesson) {
    return null;
  }

  return { ...coursePage, lesson, lessonIndex };
}

export function getLanguages(currentIndex = null, currentLessonIndex = null) {
  if (currentIndex === null) {
    return languages;
  }

  if (currentLessonIndex !== null) {
    return [
      { locale: "zh", label: "中文", href: lessonHref("zh", currentIndex, currentLessonIndex) },
      { locale: "en", label: "English", href: lessonHref("en", currentIndex, currentLessonIndex) }
    ];
  }

  return [
    { locale: "zh", label: "中文", href: courseHref("zh", currentIndex) },
    { locale: "en", label: "English", href: courseHref("en", currentIndex) }
  ];
}

export function getCourseGroups(locale, courses) {
  const labels =
    locale === "en"
      ? ["Foundations", "Quant Research", "Practice"]
      : ["基础知识", "量化研究", "实践应用"];

  return [
    {
      id: "foundations",
      label: labels[0],
      items: courses.slice(0, 5).map((course, index) => ({ course, index }))
    },
    {
      id: "research",
      label: labels[1],
      items: courses.slice(5, 9).map((course, offset) => ({ course, index: offset + 5 }))
    },
    {
      id: "practice",
      label: labels[2],
      items: courses.slice(9).map((course, offset) => ({ course, index: offset + 9 }))
    }
  ];
}

export function flattenLessons(data) {
  return data.courses.flatMap((course, courseIndex) =>
    course.lessons.map((lesson, lessonIndex) => ({
      course,
      lesson,
      courseIndex,
      lessonIndex
    }))
  );
}

export function getCourseStaticParams(locale) {
  return getCourseData(locale).courses.map((course, index) => ({
    course: courseSlug(index)
  }));
}

export function getLessonStaticParams(locale) {
  return getCourseData(locale).courses.flatMap((course, courseIndex) =>
    course.lessons.map((lesson, lessonIndex) => ({
      course: courseSlug(courseIndex),
      lesson: lessonSlug(lessonIndex)
    }))
  );
}
