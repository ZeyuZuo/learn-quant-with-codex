"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Menu, X } from "lucide-react";
import { useState } from "react";
import { courseModules } from "@/lib/courses";
import { useLessonProgress } from "@/lib/progress";

type MobileCourseNavProps = {
  activeSlug?: string;
};

export function MobileCourseNav({ activeSlug }: MobileCourseNavProps) {
  const [open, setOpen] = useState(false);
  const progress = useLessonProgress();

  return (
    <div className="border-b border-line bg-white lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-ink"
        aria-expanded={open}
      >
        课程导航
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open ? (
        <div className="max-h-[70vh] overflow-y-auto border-t border-line px-4 py-4">
          {courseModules.map((module) => (
            <section key={module.id} className="mb-4">
              <h3 className="mb-2 text-sm font-bold text-ink">{module.title}</h3>
              <div className="grid gap-1">
                {module.lessons.map((lesson) => {
                  const completed = progress.isCompleted(lesson.slug);
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${lesson.slug}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-2 rounded-md px-3 py-2 text-sm ${
                        activeSlug === lesson.slug ? "bg-teal-50 font-semibold text-accent" : "text-slate-700"
                      }`}
                    >
                      {completed ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> : <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-300" />}
                      <span>
                        {lesson.id} {lesson.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
