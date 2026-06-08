import { AlertTriangle, BarChart3, Brain, Code2, TestTube2 } from "lucide-react";
import type { Lesson } from "@/lib/types";

type LessonLearningScaffoldProps = {
  lesson: Lesson;
};

export function LessonLearningScaffold({ lesson }: LessonLearningScaffoldProps) {
  const steps = [
    {
      icon: BarChart3,
      label: "先看现象",
      title: "从图表开始，不急着写策略",
      body: lesson.chartNote,
      tone: "border-sky-200 bg-sky-50 text-sky-950",
      iconTone: "bg-sky-100 text-sky-700",
    },
    {
      icon: Brain,
      label: "建立直觉",
      title: "用一句话解释这个概念",
      body: lesson.intuition,
      tone: "border-violet-200 bg-violet-50 text-violet-950",
      iconTone: "bg-violet-100 text-violet-700",
    },
    {
      icon: Code2,
      label: "落到代码",
      title: lesson.pythonModule,
      body: "把本节概念映射到 Python 项目里的函数、测试或报告结构，确认它不是只停留在文字层面。",
      tone: "border-teal-200 bg-teal-50 text-teal-950",
      iconTone: "bg-teal-100 text-teal-700",
    },
    {
      icon: TestTube2,
      label: "检查理解",
      title: "用 Quiz、pytest 和 Checkpoint 验收",
      body: "如果你能答对本节 Quiz，并能用手算例子解释代码输出，才继续进入下一课。",
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      iconTone: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">这一课怎么学</h2>
          <p className="mt-2 text-sm leading-7 text-muted">每节课都按同一条路径推进：先看现象，再建立直觉，再落到代码，最后验收理解。</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-950">
          <AlertTriangle className="h-4 w-4" />
          不构成投资建议
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={step.label}
              className={`chart-enter rounded-lg border p-4 ${step.tone}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${step.iconTone}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wide opacity-75">{step.label}</div>
                  <h3 className="mt-1 text-sm font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 opacity-90">{step.body}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
