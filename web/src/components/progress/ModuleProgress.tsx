"use client";

import { CheckCircle2 } from "lucide-react";
import type { CourseModule } from "@/lib/types";
import { useLessonProgress } from "@/lib/progress";

type ModuleProgressProps = {
  module: CourseModule;
};

export function ModuleProgress({ module }: ModuleProgressProps) {
  const progress = useLessonProgress();
  const completed = module.lessons.filter((lesson) => progress.isCompleted(lesson.slug)).length;
  const total = module.lessons.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-md border border-line bg-white px-3 py-2">
      <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
          {completed}/{total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
