import { ClipboardCheck, FileCode2, PlayCircle } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { CopyButton } from "@/components/prompt/CopyButton";

type PracticePanelProps = {
  lesson: Lesson;
};

export function PracticePanel({ lesson }: PracticePanelProps) {
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

  const command = lesson.pythonModule.endsWith(".md")
    ? "打开 README.md，确认风险声明和课程边界是否清楚。"
    : `cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest`;

  return (
    <section className="rounded-lg border border-blue-200 bg-blue-50/70 p-5">
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
          <div className="text-sm font-bold text-ink">建议验证命令</div>
          <CopyButton value={command} label="复制命令" className="px-2.5 py-1.5 text-xs" />
        </div>
        <pre className="mt-3 overflow-x-auto rounded-md bg-slate-950 p-3 text-sm leading-6 text-slate-100">
          <code>{command}</code>
        </pre>
      </div>
    </section>
  );
}
