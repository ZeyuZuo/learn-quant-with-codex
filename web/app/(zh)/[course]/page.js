import { notFound } from "next/navigation";
import { CourseDetailPage } from "../../../src/next-components/pages";
import { getCourseBySlug, getCourseStaticParams } from "../../../src/lib/course-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourseStaticParams("zh");
}

export async function generateMetadata({ params }) {
  const { course } = await params;
  const page = getCourseBySlug("zh", course);

  if (!page) {
    return {};
  }

  return {
    title: page.course.title,
    description: page.course.summary
  };
}

export default async function Page({ params }) {
  const { course } = await params;
  const page = getCourseBySlug("zh", course);

  if (!page) {
    notFound();
  }

  return <CourseDetailPage currentIndex={page.index} locale="zh" />;
}
