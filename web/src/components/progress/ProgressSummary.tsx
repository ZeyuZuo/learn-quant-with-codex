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
          {progress.completedCount > 0 ? <p className="mt-1 text-xs leading-5 text-muted">重置会清除课程完成和单课自查，不会删除笔记。</p> : null}
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
      {progress.ready ? (
        <div className="mt-4 rounded-md border border-line bg-slate-50 px-3 py-2">
          <div className="text-xs font-black uppercase tracking-wide text-muted">下一步</div>
          <div className="mt-1 text-sm font-bold text-ink">
            {progress.nextLesson.id} {progress.nextLesson.title}
          </div>
          <p className="mt-1 text-xs leading-5 text-muted">{progress.nextLesson.subtitle}</p>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-700">{progress.percent}%</span>
        {progress.ready ? (
          <Link
            href={`/courses/${progress.nextLesson.slug}`}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            {progress.completedCount === 0 ? "开始学习" : "继续学习"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-bold text-muted">读取中</span>
        )}
      </div>
    </section>
  );
}
