"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, FileCode2 } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { useLessonProgress } from "@/lib/progress";

type CourseProgressListProps = {
  lessons: Lesson[];
};

export function CourseProgressList({ lessons }: CourseProgressListProps) {
  const progress = useLessonProgress();

  return (
    <>
      {lessons.map((lesson) => {
        const completed = progress.isCompleted(lesson.slug);
        return (
          <Link
            key={lesson.slug}
            href={`/courses/${lesson.slug}`}
            className="group chart-enter rounded-lg border border-line bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-soft"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-accent">{lesson.id}</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-xs text-muted">
                {completed ? <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> : <Circle className="h-3.5 w-3.5" />}
                {completed ? "已完成" : lesson.duration}
              </span>
            </div>
            <h3 className="mt-2 text-base font-bold text-ink">{lesson.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{lesson.subtitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="rounded-md border border-line bg-slate-50 px-2 py-1 font-semibold">{lesson.difficulty}</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-line bg-slate-50 px-2 py-1">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1 rounded-md border border-line bg-slate-50 px-2 py-1">
                <FileCode2 className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{lesson.pythonModule}</span>
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lesson.concepts.slice(0, 3).map((concept) => (
                <span key={concept} className="rounded-md bg-teal-50 px-2 py-1 text-xs font-semibold text-accent">
                  {concept}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
    </>
  );
}
