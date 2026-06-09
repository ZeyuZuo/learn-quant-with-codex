import { AlertTriangle, CheckCircle2, FileCode2, HelpCircle, Route } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { getSkillLine } from "@/lib/courses";

type LessonFocusPanelProps = {
  lesson: Lesson;
};

export function LessonFocusPanel({ lesson }: LessonFocusPanelProps) {
  const firstMistake = lesson.mistakes[0] ?? "跳过本节的边界说明";
  const firstCheckpoint = lesson.checkpoint[0] ?? "完成本课 Checkpoint";
  const skillLine = getSkillLine(lesson.skillLine);

  return (
    <section id="focus" className="chart-enter scroll-mt-24 mt-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-accent">Lesson Focus</p>
          <h2 className="mt-1 text-lg font-black text-ink">本课学习焦点</h2>
        </div>
        <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{lesson.id}</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {skillLine ? (
          <article className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-indigo-950 shadow-soft md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-black">
              <Route className="h-4 w-4" />
              v4.4 纵向能力线：{skillLine.title}
            </div>
            <p className="mt-2 text-sm leading-6">{skillLine.description}</p>
            <p className="mt-2 rounded-md bg-white/70 px-3 py-2 text-xs font-semibold leading-5">Capstone 证据：{skillLine.capstoneEvidence}</p>
          </article>
        ) : null}

        <article className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sky-950 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black">
            <HelpCircle className="h-4 w-4" />
            先回答的问题
          </div>
          <p className="mt-2 text-sm leading-6">{lesson.subtitle}</p>
        </article>

        <article className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-950 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black">
            <AlertTriangle className="h-4 w-4" />
            最容易踩的坑
          </div>
          <p className="mt-2 text-sm leading-6">{firstMistake}</p>
        </article>

        <article className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-950 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black">
            <FileCode2 className="h-4 w-4" />
            代码落点
          </div>
          <code className="mt-2 block rounded-md bg-white/75 px-2 py-1.5 text-xs leading-5 text-teal-950">{lesson.pythonModule}</code>
        </article>

        <article className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black">
            <CheckCircle2 className="h-4 w-4" />
            本节验收
          </div>
          <p className="mt-2 text-sm leading-6">{firstCheckpoint}</p>
        </article>
      </div>
    </section>
  );
}
