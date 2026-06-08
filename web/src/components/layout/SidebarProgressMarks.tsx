"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { useLessonProgress } from "@/lib/progress";

type SidebarProgressMarksProps = {
  lessons: Lesson[];
  activeSlug?: string;
};

export function SidebarProgressMarks({ lessons, activeSlug }: SidebarProgressMarksProps) {
  const progress = useLessonProgress();

  return (
    <>
      {lessons.map((lesson) => {
        const completed = progress.isCompleted(lesson.slug);
        return (
          <Link
            key={lesson.slug}
            href={`/courses/${lesson.slug}`}
            className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm leading-5 transition ${
              activeSlug === lesson.slug ? "bg-teal-50 font-semibold text-accent" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {completed ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> : <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />}
            <span>
              {lesson.id} {lesson.title}
            </span>
          </Link>
        );
      })}
    </>
  );
}
