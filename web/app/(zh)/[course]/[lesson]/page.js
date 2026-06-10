import { notFound } from "next/navigation";
import { LessonDetailPage } from "../../../../src/next-components/pages";
import { getLessonBySlug, getLessonStaticParams } from "../../../../src/lib/course-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLessonStaticParams("zh");
}

export async function generateMetadata({ params }) {
  const { course, lesson } = await params;
  const page = getLessonBySlug("zh", course, lesson);

  if (!page) {
    return {};
  }

  return {
    title: page.lesson.title,
    description: page.lesson.goal
  };
}

export default async function Page({ params }) {
  const { course, lesson } = await params;
  const page = getLessonBySlug("zh", course, lesson);

  if (!page) {
    notFound();
  }

  return <LessonDetailPage currentIndex={page.index} currentLessonIndex={page.lessonIndex} locale="zh" />;
}
