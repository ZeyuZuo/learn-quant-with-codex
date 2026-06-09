"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Flag } from "lucide-react";
import { allLessons, skillLines } from "@/lib/courses";
import { useLessonProgress } from "@/lib/progress";

type SkillLineProgressProps = {
  compact?: boolean;
};

export function SkillLineProgress({ compact = false }: SkillLineProgressProps) {
  const progress = useLessonProgress();

  return (
    <section className={compact ? "rounded-lg border border-line bg-white p-4 shadow-soft" : "rounded-lg border border-line bg-white p-5 shadow-soft"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-black text-indigo-950">
            <Flag className="h-3.5 w-3.5" />
            能力线进度
          </div>
          <h2 className={compact ? "mt-3 text-lg font-black text-ink" : "mt-3 text-xl font-black text-ink"}>按能力追踪学习</h2>
          <p className="mt-1 text-sm leading-6 text-muted">完成课程时，进度会同步到对应能力线。</p>
        </div>
        {progress.ready ? <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{progress.completedCount}/{progress.totalCount}</span> : null}
      </div>

      <div className={compact ? "mt-4 grid gap-3" : "mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3"}>
        {skillLines.map((skillLine, index) => {
          const lessons = allLessons.filter((lesson) => lesson.skillLine === skillLine.id);
          const completed = lessons.filter((lesson) => progress.completedSet.has(lesson.slug)).length;
          const total = lessons.length;
          const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
          const nextLesson = lessons.find((lesson) => !progress.completedSet.has(lesson.slug));
          const done = progress.ready && total > 0 && completed === total;

          return (
            <article
              key={skillLine.id}
              className="chart-enter rounded-lg border border-line bg-slate-50 p-3 transition duration-200 hover:border-accent hover:bg-white"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-wide text-accent">{skillLine.shortTitle}</div>
                  <h3 className="mt-1 text-sm font-black text-ink">{skillLine.title}</h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-xs font-bold text-muted">
                  {done ? <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> : null}
                  {progress.ready ? `${completed}/${total}` : "读取中"}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${progress.ready ? percent : 0}%` }} />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{skillLine.capstoneEvidence}</p>
              {progress.ready && nextLesson ? (
                <Link href={`/courses/${nextLesson.slug}`} className="mt-3 inline-flex items-center gap-1 text-xs font-black text-accent hover:underline">
                  下一课：{nextLesson.id} {nextLesson.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : progress.ready ? (
                <div className="mt-3 text-xs font-black text-accent">这条能力线已完成</div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
