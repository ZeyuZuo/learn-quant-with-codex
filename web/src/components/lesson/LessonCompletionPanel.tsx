"use client";

import { CheckCircle2, Circle, ClipboardCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/lib/types";
import { useLessonProgress } from "@/lib/progress";
import { getLessonActivity, onLessonActivity, setLessonActivity, type LessonActivityType } from "@/lib/lesson-activity";

type LessonCompletionPanelProps = {
  lesson: Lesson;
};

const gates = [
  {
    id: "quiz",
    title: "完成 Quiz",
    body: "至少回答一次本节小练习，并读完解释。",
  },
  {
    id: "prompt",
    title: "复制 Codex Prompt",
    body: "把任务交给 Codex 前，确认目标、约束和验收标准。",
  },
  {
    id: "checkpoint",
    title: "确认 Checkpoint",
    body: "能用自己的话解释本节产物和最容易误用的地方。",
  },
] satisfies Array<{
  id: LessonActivityType;
  title: string;
  body: string;
}>;

export function LessonCompletionPanel({ lesson }: LessonCompletionPanelProps) {
  const progress = useLessonProgress();
  const completed = progress.isCompleted(lesson.slug);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(getLessonActivity(lesson.slug));
    return onLessonActivity((activity) => {
      if (activity.slug !== lesson.slug) {
        return;
      }
      setChecked((current) => ({ ...current, [activity.type]: true }));
    });
  }, [lesson.slug]);

  const checkedCount = useMemo(() => gates.filter((gate) => checked[gate.id]).length, [checked]);
  const ready = checkedCount === gates.length;

  function toggleGate(id: LessonActivityType) {
    setChecked((current) => {
      const nextValue = !current[id];
      setLessonActivity(lesson.slug, id, nextValue);
      return { ...current, [id]: nextValue };
    });
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-base font-black text-ink">
            <ClipboardCheck className="h-4 w-4 text-accent" />
            完成本课前自查
          </div>
          <p className="mt-1 text-sm leading-6 text-muted">
            Quiz 和 Prompt 会在实际操作后自动点亮；Checkpoint 需要你手动确认。自查状态会保存在本地浏览器。
          </p>
        </div>
        <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{checkedCount}/3</span>
      </div>

      <div className="mt-4 grid gap-2">
        {gates.map((gate) => {
          const active = Boolean(checked[gate.id]);
          return (
            <button
              key={gate.id}
              type="button"
              onClick={() => toggleGate(gate.id)}
              className={`flex items-start gap-3 rounded-md border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                active ? "border-teal-200 bg-teal-50 text-teal-950" : "border-line bg-slate-50 text-slate-800 hover:border-accent"
              }`}
            >
              {active ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />}
              <span>
                <span className="block text-sm font-black">{gate.title}</span>
                <span className="mt-1 block text-sm leading-6 opacity-85">{gate.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-slate-50 p-3">
        <p className="text-sm leading-6 text-slate-700">
          {completed ? "本课已经记入学习进度。" : ready ? "自查完成，可以标记本课。" : "勾选全部自查项后，再标记完成。"}
        </p>
        <button
          type="button"
          onClick={() => progress.setLessonCompleted(lesson.slug, !completed)}
          disabled={!ready && !completed}
          className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
            completed
              ? "border-teal-300 bg-teal-50 text-teal-950 hover:border-teal-400"
              : ready
                ? "border-accent bg-accent text-white hover:bg-teal-800"
                : "cursor-not-allowed border-line bg-white text-slate-400"
          }`}
          aria-pressed={completed}
        >
          {completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {completed ? "已完成本课" : "标记完成"}
        </button>
      </div>
    </section>
  );
}
