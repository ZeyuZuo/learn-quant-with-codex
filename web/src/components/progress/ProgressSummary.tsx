"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useLessonProgress } from "@/lib/progress";

type ProgressSummaryProps = {
  compact?: boolean;
};

export function ProgressSummary({ compact = false }: ProgressSummaryProps) {
  const progress = useLessonProgress();

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={compact ? "text-lg font-bold text-ink" : "text-xl font-black text-ink"}>学习进度</h2>
          <p className="mt-1 text-sm text-muted">
            {progress.ready ? `${progress.completedCount} / ${progress.totalCount} 节完成` : "读取本地进度中"}
          </p>
        </div>
        {progress.completedCount > 0 ? (
          <button
            type="button"
            onClick={progress.resetProgress}
            className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-muted transition hover:border-rose-300 hover:text-rose-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            重置
          </button>
        ) : null}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${progress.percent}%` }} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-700">{progress.percent}%</span>
        <Link
          href={`/courses/${progress.nextLesson.slug}`}
          className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          {progress.completedCount === 0 ? "开始学习" : "继续学习"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
