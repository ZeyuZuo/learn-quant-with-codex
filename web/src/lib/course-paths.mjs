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
  const coursePath = courseHref(locale, courseIndex);
  return `${coursePath}${lessonSlug(lessonIndex)}/`;
}

export function courseOutputPath(locale, index) {
  const slug = courseSlug(index);
  return locale === "en" ? `en/${slug}/index.html` : `${slug}/index.html`;
}

export function lessonOutputPath(locale, courseIndex, lessonIndex) {
  const courseSlugValue = courseSlug(courseIndex);
  const lessonSlugValue = lessonSlug(lessonIndex);
  return locale === "en"
    ? `en/${courseSlugValue}/${lessonSlugValue}/index.html`
    : `${courseSlugValue}/${lessonSlugValue}/index.html`;
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
