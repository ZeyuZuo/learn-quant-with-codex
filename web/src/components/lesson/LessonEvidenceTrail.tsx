"use client";

import { BarChart3, CheckCircle2, ClipboardList, FileCode2, NotebookPen, Terminal } from "lucide-react";
import { CopyButton } from "@/components/prompt/CopyButton";
import { getLessonCommandInfo } from "@/lib/lesson-commands";
import type { CourseModule, Lesson } from "@/lib/types";

type LessonEvidenceTrailProps = {
  lesson: Lesson;
  courseModule?: CourseModule;
};

export function LessonEvidenceTrail({ lesson, courseModule }: LessonEvidenceTrailProps) {
  const commandInfo = getLessonCommandInfo(lesson);
  const commandBlock = commandInfo.secondary ? `${commandInfo.primary}\n${commandInfo.secondary}` : commandInfo.primary;
  const evidenceTemplate = [
    `# ${lesson.id} ${lesson.title} 证据链`,
    "",
    `模块：${courseModule?.title ?? lesson.moduleId}`,
    `Python 落点：${lesson.pythonModule}`,
    "",
    "1. 概念复述：",
    `- ${lesson.concepts.slice(0, 4).join(" / ")}`,
    "",
    "2. 手算核对：",
    `- ${lesson.handExample}`,
    "",
    "3. 代码和命令证据：",
    "```bash",
    commandBlock,
    "```",
    "",
    "4. 图表观察：",
    `- ${lesson.chartNote}`,
    "",
    "5. 误用防线：",
    lesson.mistakes.map((mistake) => `- ${mistake}`).join("\n"),
    "",
    "6. Checkpoint：",
    lesson.checkpoint.map((item) => `- ${item}`).join("\n"),
    "",
    "边界：教育用途，不构成投资建议；历史回测结果不代表未来收益。",
    "",
  ].join("\n");

  const steps = [
    {
      icon: NotebookPen,
      title: "概念复述",
      body: lesson.concepts.slice(0, 4).join(" / "),
      href: "#concepts",
    },
    {
      icon: ClipboardList,
      title: "手算核对",
      body: lesson.handExample,
      href: "#hand-example",
    },
    {
      icon: FileCode2,
      title: "代码证据",
      body: lesson.pythonModule,
      href: "#code",
    },
    {
      icon: BarChart3,
      title: "图表观察",
      body: lesson.chartNote,
      href: "#chart",
    },
    {
      icon: Terminal,
      title: "验收命令",
      body: commandInfo.label,
      href: "#practice",
    },
  ];

  return (
    <section id="evidence-trail" className="chart-enter scroll-mt-24 mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-accent">Evidence Trail</p>
          <h2 className="mt-1 text-lg font-black text-ink">本课学习证据链</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            完成一节课不是读完页面，而是留下能复查的证据：概念、手算、代码、图表、验收命令和误用防线。
          </p>
        </div>
        <CopyButton value={evidenceTemplate} label="复制证据模板" className="px-2.5 py-1.5 text-xs" />
      </div>

      <div className="evidence-trail mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <a
              key={step.title}
              href={step.href}
              className="evidence-step group relative rounded-lg border border-slate-200 bg-slate-50 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-accent/30"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-white text-accent shadow-sm transition group-hover:scale-105">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="rounded-full border border-line bg-white px-2 py-0.5 text-xs font-black text-muted">{index + 1}</span>
              </div>
              <h3 className="mt-3 text-sm font-black text-ink">{step.title}</h3>
              <p className="clamp-3 mt-1 text-xs leading-5 text-slate-600">{step.body}</p>
            </a>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
          <div className="flex items-center gap-2 font-black">
            <CheckCircle2 className="h-4 w-4" />
            本节最小交付物
          </div>
          <p className="mt-1">{lesson.checkpoint[0] ?? "完成本节 Checkpoint，并写入学习笔记。"}</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-950 p-3 text-xs leading-5 text-slate-100">
          <div className="mb-2 font-black text-slate-300">{commandInfo.label}</div>
          <pre className="overflow-x-auto whitespace-pre-wrap">
            <code>{commandBlock}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
