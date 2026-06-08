import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CourseSidebar } from "@/components/layout/CourseSidebar";
import { MobileCourseNav } from "@/components/layout/MobileCourseNav";
import { LessonView } from "@/components/lesson/LessonView";
import { allLessons, getLesson } from "@/lib/courses";

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return {
    title: lesson ? `${lesson.title} | learn-quant-with-codex` : "课程",
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLesson(slug);

  if (!lesson) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <MobileCourseNav activeSlug={lesson.slug} />
      <div className="flex">
        <CourseSidebar activeSlug={lesson.slug} />
        <main className="min-w-0 flex-1">
          <LessonView lesson={lesson} />
        </main>
      </div>
    </>
  );
}
