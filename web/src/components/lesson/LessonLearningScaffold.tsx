import { AlertTriangle, BarChart3, BookOpenText, Brain, CheckCircle2, Code2, MessageSquareText, PencilLine, TestTube2 } from "lucide-react";
import type { Lesson } from "@/lib/types";

type LessonLearningScaffoldProps = {
  lesson: Lesson;
};

export function LessonLearningScaffold({ lesson }: LessonLearningScaffoldProps) {
  const steps = [
    {
      href: "#concepts",
      icon: BookOpenText,
      label: "Concept",
      title: "读懂概念",
      body: lesson.concepts.slice(0, 3).join(" / "),
      tone: "border-slate-200 bg-white text-slate-800",
      iconTone: "bg-slate-100 text-slate-700",
    },
    {
      href: "#intuition",
      icon: Brain,
      label: "Intuition",
      title: "建立直觉",
      body: lesson.intuition,
      tone: "border-violet-200 bg-violet-50 text-violet-950",
      iconTone: "bg-violet-100 text-violet-700",
    },
    {
      href: "#hand-example",
      icon: PencilLine,
      label: "Example",
      title: "手算一次",
      body: lesson.handExample,
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      iconTone: "bg-amber-100 text-amber-700",
    },
    {
      href: "#code",
      icon: Code2,
      label: "Code",
      title: "落到代码",
      body: lesson.pythonModule,
      tone: "border-teal-200 bg-teal-50 text-teal-950",
      iconTone: "bg-teal-100 text-teal-700",
    },
    {
      href: "#chart",
      icon: BarChart3,
      label: "Chart",
      title: "观察图表",
      body: lesson.chartNote,
      tone: "border-sky-200 bg-sky-50 text-sky-950",
      iconTone: "bg-sky-100 text-sky-700",
    },
    {
      href: "#quiz",
      icon: TestTube2,
      label: "Practice",
      title: "做小练习",
      body: lesson.quiz.question,
      tone: "border-blue-200 bg-blue-50 text-blue-950",
      iconTone: "bg-blue-100 text-blue-700",
    },
    {
      href: "#codex-task",
      icon: MessageSquareText,
      label: "Codex",
      title: "复制任务",
      body: "把背景、目标、约束和验收标准一起交给 Codex。",
      tone: "border-teal-200 bg-white text-teal-950",
      iconTone: "bg-teal-100 text-teal-700",
    },
    {
      href: "#checkpoint",
      icon: CheckCircle2,
      label: "Checkpoint",
      title: "留下产物",
      body: lesson.checkpoint[0] ?? "完成本节 Checkpoint",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
      iconTone: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section id="route" className="scroll-mt-24 mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">本课路线</h2>
          <p className="mt-2 text-sm leading-7 text-muted">按路线走完这一页：先建立直觉，再看代码和图表，最后用练习、Prompt 和 Checkpoint 验收。</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-950">
          <AlertTriangle className="h-4 w-4" />
          不构成投资建议
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <a
              key={step.label}
              href={step.href}
              className={`chart-enter group flex min-h-36 flex-col rounded-lg border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-accent/30 ${step.tone}`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-md transition group-hover:scale-105 ${step.iconTone}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase tracking-wide opacity-75">{step.label}</div>
                  <h3 className="mt-1 text-sm font-black">{step.title}</h3>
                  <p className="clamp-3 mt-2 text-sm leading-6 opacity-90">{step.body}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
