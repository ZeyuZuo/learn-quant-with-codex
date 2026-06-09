import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCode2, FlaskConical, PlayCircle } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { CopyButton } from "@/components/prompt/CopyButton";
import { getLessonCommandInfo } from "@/lib/lesson-commands";
import { getRelatedLabs } from "@/lib/lesson-labs";

type PracticePanelProps = {
  lesson: Lesson;
};

export function PracticePanel({ lesson }: PracticePanelProps) {
  const commandInfo = getLessonCommandInfo(lesson);
  const relatedLabs = getRelatedLabs(lesson);
  const steps = [
    {
      icon: FileCode2,
      title: "定位代码",
      body: `打开 ${lesson.pythonModule}，找到本节对应的函数或报告结构。`,
    },
    {
      icon: PlayCircle,
      title: "运行一个小例子",
      body: `用这个手算例子构造一个极小输入：${lesson.handExample}`,
    },
    {
      icon: ClipboardCheck,
      title: "写下边界",
      body: "记录一个本节最容易误用的地方，并把它加入测试、报告或学习笔记。",
    },
  ];

  const copyValue = commandInfo.secondary ? `${commandInfo.primary}\n${commandInfo.secondary}` : commandInfo.primary;

  return (
    <section id="practice" className="scroll-mt-24 rounded-lg border border-blue-200 bg-blue-50/70 p-5">
      <h3 className="text-base font-bold text-blue-950">动手练习</h3>
      <p className="mt-2 text-sm leading-7 text-blue-950">
        这一段不是额外作业，而是把本节知识落到代码里的最小动作。完成后再进入 Codex Prompt。
      </p>
      <div className="mt-4 grid gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-3 rounded-md border border-blue-100 bg-white p-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-700">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">
                  {index + 1}. {step.title}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-700">{step.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-md border border-blue-100 bg-white p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-ink">{commandInfo.label}</div>
          <CopyButton value={copyValue} label="复制命令" className="px-2.5 py-1.5 text-xs" />
        </div>
        <pre className="mt-3 overflow-x-auto rounded-md bg-slate-950 p-3 text-sm leading-6 text-slate-100">
          <code>{commandInfo.primary}</code>
        </pre>
        {commandInfo.secondary ? (
          <>
            <div className="mt-3 text-sm font-bold text-ink">可选示例脚本</div>
            <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-3 text-sm leading-6 text-slate-100">
              <code>{commandInfo.secondary}</code>
            </pre>
          </>
        ) : null}
      </div>
      {relatedLabs.length > 0 ? (
        <div className="mt-4 rounded-md border border-teal-200 bg-teal-50 p-3">
          <div className="flex items-center gap-2 text-sm font-black text-teal-950">
            <FlaskConical className="h-4 w-4" />
            相关实验
          </div>
          <div className="mt-3 grid gap-2">
            {relatedLabs.map((lab) => (
              <Link
                key={lab.href}
                href={lab.href}
                className="flex items-start justify-between gap-3 rounded-md border border-teal-100 bg-white px-3 py-2 text-sm text-teal-950 transition hover:border-teal-300"
              >
                <span>
                  <span className="block font-black">{lab.title}</span>
                  <span className="mt-1 block leading-6 opacity-85">{lab.reason}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
