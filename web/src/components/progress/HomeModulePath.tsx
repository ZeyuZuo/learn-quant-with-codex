"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Milestone } from "lucide-react";
import { courseModules } from "@/lib/courses";
import { useLessonProgress } from "@/lib/progress";

export function HomeModulePath() {
  const progress = useLessonProgress();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {courseModules.map((module) => {
        const completed = progress.ready ? module.lessons.filter((lesson) => progress.isCompleted(lesson.slug)).length : 0;
        const total = module.lessons.length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        const firstLesson = module.lessons[0];
        const moduleDone = progress.ready && total > 0 && completed === total;

        return (
          <article key={module.id} className="chart-enter rounded-lg border border-line bg-white p-5 shadow-soft transition hover:border-accent">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
                  {moduleDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                  {module.id}
                </div>
                <h3 className="mt-2 text-lg font-bold text-ink">{module.title}</h3>
              </div>
              <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{progress.ready ? `${completed}/${total}` : "读取中"}</span>
            </div>

            <p className="mt-2 text-sm leading-7 text-muted">{module.summary}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">模块产物：{module.product}</p>

            <div className="mt-4 rounded-md border border-teal-200 bg-teal-50 p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-teal-950">
                <Milestone className="h-4 w-4" />
                {module.miniProject.title}
              </div>
              <p className="mt-1 text-xs leading-5 text-teal-950">{module.miniProject.deliverable}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {firstLesson ? (
                <Link href={`/courses/${firstLesson.slug}`} className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
                  进入模块
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
                查看项目
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
