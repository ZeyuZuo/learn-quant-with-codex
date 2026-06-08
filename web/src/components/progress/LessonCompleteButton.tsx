"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useLessonProgress } from "@/lib/progress";

type LessonCompleteButtonProps = {
  slug: string;
};

export function LessonCompleteButton({ slug }: LessonCompleteButtonProps) {
  const progress = useLessonProgress();
  const completed = progress.isCompleted(slug);

  return (
    <button
      type="button"
      onClick={() => progress.setLessonCompleted(slug, !completed)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
        completed
          ? "border-teal-300 bg-teal-50 text-teal-950 hover:border-teal-400"
          : "border-line bg-white text-ink hover:border-accent hover:text-accent"
      }`}
      aria-pressed={completed}
    >
      {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      {completed ? "已完成本课" : "标记完成"}
    </button>
  );
}
