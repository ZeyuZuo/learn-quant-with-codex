import Link from "next/link";
import {
  courseHref,
  flattenLessons,
  getCourseData,
  getCourseGroups,
  getLanguages,
  lessonHref,
  localeHomePath
} from "../lib/course-data";

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

function courseCode(index) {
  return `s${String(index + 1).padStart(2, "0")}`;
}

function lessonCode(index) {
  return `l${String(index + 1).padStart(2, "0")}`;
}

function Header({ data, currentLocale, languageLinks }) {
  return (
    <header className="site-header">
      <Link className="brand" href={currentLocale === "en" ? "/en/" : "/"}>
        {data.site.projectName}
      </Link>
      <nav className="header-nav" aria-label={data.home.languageLabel}>
        <div className="language-switch" aria-label={data.home.languageLabel}>
          {languageLinks.map((language) => (
            <Link
              className={`language-link${language.locale === currentLocale ? " is-active" : ""}`}
              href={language.href}
              hrefLang={language.locale}
              key={language.locale}
            >
              {language.label}
            </Link>
          ))}
        </div>
        <a className="github-link" href={data.site.githubUrl} target="_blank" rel="noreferrer">
          {data.home.githubLabel}
        </a>
      </nav>
    </header>
  );
}

function AppShell({ children, currentLocale, data, languageLinks, pageClass = "" }) {
  return (
    <div className={`page${pageClass ? ` ${pageClass}` : ""}`}>
      <Header data={data} currentLocale={currentLocale} languageLinks={languageLinks} />
      <main>{children}</main>
    </div>
  );
}

function Hero({ data }) {
  return (
    <section className="hero" aria-labelledby="page-title">
      <p className="eyebrow">{data.site.projectName}</p>
      <h1 id="page-title">{data.home.title}</h1>
      <p className="hero-description">{data.home.description}</p>
    </section>
  );
}

function CourseList({ data, currentLocale }) {
  return (
    <section className="course-section" aria-labelledby="course-list-title">
      <div className="section-heading">
        <h2 id="course-list-title">{data.home.courseListTitle}</h2>
        <p>{data.home.courseListDescription}</p>
      </div>
      <ol className="course-list">
        {data.courses.map((course, index) => (
          <li className="course-item" key={course.id}>
            <span className="course-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="course-copy">
              <h3>
                <Link href={courseHref(currentLocale, index)}>{course.title}</Link>
              </h3>
              <p>{course.summary}</p>
              <ol className="lesson-list">
                {course.lessons.map((lesson, lessonIndex) => (
                  <li className="lesson-item" key={lesson.id}>
                    <span className="lesson-number">{String(lessonIndex + 1).padStart(2, "0")}</span>
                    <span>{lesson.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CourseSidebar({ data, currentLocale, currentIndex, currentLessonIndex = null }) {
  const labels = sidebarLabels[currentLocale] || sidebarLabels.en;
  const groups = getCourseGroups(currentLocale, data.courses);

  return (
    <aside className="course-sidebar" aria-label={labels.aria}>
      <div className="course-sidebar-inner">
        <Link className="sidebar-home" href={localeHomePath(currentLocale)}>
          {labels.home}
        </Link>
        {groups.map((group) => (
          <section className="sidebar-group" key={group.id}>
            <h2>{group.label}</h2>
            <ol>
              {group.items.map(({ course, index }) => {
                const isActive = index === currentIndex;

                return (
                  <li key={course.id}>
                    <Link
                      className={`sidebar-link${isActive ? " is-active" : ""}`}
                      href={courseHref(currentLocale, index)}
                    >
                      <span className="sidebar-code">{courseCode(index)}</span>
                      <span>{course.title}</span>
                    </Link>
                    {isActive ? (
                      <ol className="sidebar-lessons">
                        {course.lessons.map((lesson, lessonIndex) => {
                          const isLessonActive = lessonIndex === currentLessonIndex;

                          return (
                            <li key={lesson.id}>
                              <Link
                                className={`sidebar-lesson-link${isLessonActive ? " is-active" : ""}`}
                                href={lessonHref(currentLocale, index, lessonIndex)}
                              >
                                <span>{String(lessonIndex + 1).padStart(2, "0")}</span>
                                <span>{lesson.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </aside>
  );
}

function CoursePageNavLink({ data, currentLocale, index, label }) {
  if (index < 0 || index >= data.courses.length) {
    return <span />;
  }

  const course = data.courses[index];

  return (
    <Link className="course-page-nav-link" href={courseHref(currentLocale, index)}>
      <span>{label}</span>
      <strong>
        {courseCode(index)} · {course.title}
      </strong>
    </Link>
  );
}

function CourseDetail({ data, currentLocale, currentIndex }) {
  const labels = detailLabels[currentLocale] || detailLabels.en;
  const course = data.courses[currentIndex];

  return (
    <article className="course-detail">
      <header className="course-detail-header">
        <div className="course-detail-kicker">
          <span>{courseCode(currentIndex)}</span>
          <span>
            {course.lessons.length} {labels.lessonCount}
          </span>
        </div>
        <h1>{course.title}</h1>
        <p>{course.summary}</p>
      </header>

      <section className="detail-callout">
        <h2>{labels.overview}</h2>
        <p>{course.summary}</p>
      </section>

      <section className="detail-section">
        <h2>{labels.outcomes}</h2>
        <ul className="outcome-list">
          {course.lessons.map((lesson) => (
            <li key={lesson.id}>{lesson.goal}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2>{labels.lessons}</h2>
        <div className="detail-lessons">
          {course.lessons.map((lesson, index) => (
            <section className="detail-lesson" id={lesson.id} key={lesson.id}>
              <span className="detail-lesson-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>
                  <Link href={lessonHref(currentLocale, currentIndex, index)}>{lesson.title}</Link>
                </h3>
                <p>
                  <strong>{labels.lessonGoal}：</strong>
                  {lesson.goal}
                </p>
              </div>
            </section>
          ))}
        </div>
      </section>

      <nav className="course-page-nav" aria-label={`${labels.previous} / ${labels.next}`}>
        <CoursePageNavLink data={data} currentLocale={currentLocale} index={currentIndex - 1} label={labels.previous} />
        <CoursePageNavLink data={data} currentLocale={currentLocale} index={currentIndex + 1} label={labels.next} />
      </nav>
    </article>
  );
}

function LessonPageNavLink({ currentLocale, item, label }) {
  if (!item) {
    return <span />;
  }

  return (
    <Link className="course-page-nav-link" href={lessonHref(currentLocale, item.courseIndex, item.lessonIndex)}>
      <span>{label}</span>
      <strong>
        {courseCode(item.courseIndex)} · {lessonCode(item.lessonIndex)} · {item.lesson.title}
      </strong>
    </Link>
  );
}

function LessonDetail({ data, currentLocale, currentIndex, currentLessonIndex }) {
  const labels = lessonLabels[currentLocale] || lessonLabels.en;
  const course = data.courses[currentIndex];
  const lesson = course.lessons[currentLessonIndex];
  const flatLessons = flattenLessons(data);
  const flatIndex = flatLessons.findIndex(
    (item) => item.courseIndex === currentIndex && item.lessonIndex === currentLessonIndex
  );
  const previousLesson = flatIndex > 0 ? flatLessons[flatIndex - 1] : null;
  const nextLesson = flatIndex < flatLessons.length - 1 ? flatLessons[flatIndex + 1] : null;

  return (
    <article className="course-detail lesson-detail">
      <header className="course-detail-header">
        <div className="course-detail-kicker">
          <span>{courseCode(currentIndex)}</span>
          <span>{lessonCode(currentLessonIndex)}</span>
          <span>{labels.lesson}</span>
        </div>
        <h1>{lesson.title}</h1>
        <p>{lesson.goal}</p>
      </header>

      <section className="detail-callout">
        <h2>{labels.chapter}</h2>
        <p>
          <Link href={courseHref(currentLocale, currentIndex)}>
            {courseCode(currentIndex)} · {course.title}
          </Link>
        </p>
      </section>

      <section className="detail-section">
        <h2>{labels.goal}</h2>
        <p className="lesson-goal">{lesson.goal}</p>
      </section>

      <section className="detail-section">
        <h2>{labels.content}</h2>
        <p className="lesson-pending">{labels.pending}</p>
      </section>

      <nav className="course-page-nav" aria-label={`${labels.previous} / ${labels.next}`}>
        <LessonPageNavLink currentLocale={currentLocale} item={previousLesson} label={labels.previous} />
        <LessonPageNavLink currentLocale={currentLocale} item={nextLesson} label={labels.next} />
      </nav>
    </article>
  );
}

export function CourseHomePage({ locale }) {
  const data = getCourseData(locale);

  return (
    <AppShell data={data} currentLocale={locale} languageLinks={getLanguages()}>
      <Hero data={data} />
      <CourseList data={data} currentLocale={locale} />
    </AppShell>
  );
}

export function CourseDetailPage({ currentIndex, locale }) {
  const data = getCourseData(locale);

  return (
    <AppShell
      data={data}
      currentLocale={locale}
      languageLinks={getLanguages(currentIndex)}
      pageClass="learn-page"
    >
      <div className="learn-layout">
        <CourseSidebar data={data} currentLocale={locale} currentIndex={currentIndex} />
        <CourseDetail data={data} currentLocale={locale} currentIndex={currentIndex} />
      </div>
    </AppShell>
  );
}

export function LessonDetailPage({ currentIndex, currentLessonIndex, locale }) {
  const data = getCourseData(locale);

  return (
    <AppShell
      data={data}
      currentLocale={locale}
      languageLinks={getLanguages(currentIndex, currentLessonIndex)}
      pageClass="learn-page"
    >
      <div className="learn-layout">
        <CourseSidebar
          data={data}
          currentLocale={locale}
          currentIndex={currentIndex}
          currentLessonIndex={currentLessonIndex}
        />
        <LessonDetail
          data={data}
          currentLocale={locale}
          currentIndex={currentIndex}
          currentLessonIndex={currentLessonIndex}
        />
      </div>
    </AppShell>
  );
}
