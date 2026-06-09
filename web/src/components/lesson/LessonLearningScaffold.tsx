import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpenText,
  Brain,
  CheckCircle2,
  Code2,
  MessageSquareText,
  PencilLine,
  TestTube2,
} from "lucide-react";
import type { Lesson } from "@/lib/types";
import { getSkillLine } from "@/lib/courses";

type LessonLearningScaffoldProps = {
  lesson: Lesson;
};

export function LessonLearningScaffold({ lesson }: LessonLearningScaffoldProps) {
  const skillLine = getSkillLine(lesson.skillLine);
  const steps = [
    {
      href: "#concepts",
      icon: BookOpenText,
      label: "Concept",
      title: "读懂概念",
      body: lesson.concepts.slice(0, 3).join(" / "),
      action: "先知道本节在解决哪类量化问题。",
      evidence: "能用一句话说清本节核心概念。",
      tone: "border-slate-200 bg-white text-slate-800",
      iconTone: "bg-slate-100 text-slate-700",
    },
    {
      href: "#intuition",
      icon: Brain,
      label: "Intuition",
      title: "建立直觉",
      body: lesson.intuition,
      action: "用白话把公式背后的含义说出来。",
      evidence: "能说出忽略这个概念会怎样误导回测。",
      tone: "border-violet-200 bg-violet-50 text-violet-950",
      iconTone: "bg-violet-100 text-violet-700",
    },
    {
      href: "#hand-example",
      icon: PencilLine,
      label: "Example",
      title: "手算一次",
      body: lesson.handExample,
      action: "用小数字确认自己没有被术语带偏。",
      evidence: "能用 2-5 个数字复现课程结论。",
      tone: "border-amber-200 bg-amber-50 text-amber-950",
      iconTone: "bg-amber-100 text-amber-700",
    },
    {
      href: "#code",
      icon: Code2,
      label: "Code",
      title: "落到代码",
      body: lesson.pythonModule,
      action: "找到本节在 Python 项目里的真实落点。",
      evidence: "能指出函数、测试或报告文件路径。",
      tone: "border-teal-200 bg-teal-50 text-teal-950",
      iconTone: "bg-teal-100 text-teal-700",
    },
    {
      href: "#chart",
      icon: BarChart3,
      label: "Chart",
      title: "观察图表",
      body: lesson.chartNote,
      action: "只读图表能证明的内容，不外推结论。",
      evidence: "能写下一个读图观察和一个误读提醒。",
      tone: "border-sky-200 bg-sky-50 text-sky-950",
      iconTone: "bg-sky-100 text-sky-700",
    },
    {
      href: "#quiz",
      icon: TestTube2,
      label: "Practice",
      title: "做小练习",
      body: lesson.quiz.question,
      action: "用一个选择题暴露常见误区。",
      evidence: "能解释为什么错误选项会误导初学者。",
      tone: "border-blue-200 bg-blue-50 text-blue-950",
      iconTone: "bg-blue-100 text-blue-700",
    },
    {
      href: "#codex-task",
      icon: MessageSquareText,
      label: "Codex",
      title: "复制任务",
      body: "把背景、目标、约束和验收标准一起交给 Codex。",
      action: "让 Codex 写代码，也要求它解释边界。",
      evidence: "能运行本课验收命令或说明文档验收结果。",
      tone: "border-teal-200 bg-white text-teal-950",
      iconTone: "bg-teal-100 text-teal-700",
    },
    {
      href: "#checkpoint",
      icon: CheckCircle2,
      label: "Checkpoint",
      title: "留下产物",
      body: lesson.checkpoint[0] ?? "完成本节 Checkpoint",
      action: "确认本节能进入 Mini Project 或 Capstone。",
      evidence: "能把本节复盘写入笔记或最终报告材料。",
      tone: "border-emerald-200 bg-emerald-50 text-emerald-950",
      iconTone: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section id="route" className="scroll-mt-24 mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">本课路线</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            按路线走完这一页：先建立直觉，再看代码和图表，最后用练习、Prompt 和 Checkpoint 验收。
            {skillLine ? ` 本节主要训练“${skillLine.title}”。` : ""}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-950">
          <AlertTriangle className="h-4 w-4" />
          不构成投资建议
        </div>
      </div>

      <div className="learning-route mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <a
              key={step.label}
              href={step.href}
              className={`learning-step group relative flex min-h-56 flex-col overflow-hidden rounded-lg border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-accent/30 ${step.tone}`}
              style={{ animationDelay: `${index * 65}ms` }}
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
              <div className="mt-auto pt-4">
                <div className="rounded-md border border-current/10 bg-white/55 p-3 text-xs leading-5">
                  <div className="font-black opacity-80">产物证据</div>
                  <div className="mt-1 font-semibold opacity-90">{step.evidence}</div>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-current/10 pt-3 text-xs font-bold leading-5 opacity-85">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/70">{index + 1}</span>
                  <span>{step.action}</span>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="route-connector pointer-events-none absolute right-3 top-3 hidden h-7 w-7 place-items-center rounded-full bg-white/75 text-current/60 xl:grid">
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              ) : null}
            </a>
          );
        })}
      </div>
    </section>
  );
}
