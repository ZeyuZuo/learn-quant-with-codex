"use client";

import { ClipboardCheck, FileText, Flag } from "lucide-react";
import { CopyButton } from "@/components/prompt/CopyButton";
import { getModule, getSkillLine } from "@/lib/courses";
import { emitLessonActivity } from "@/lib/lesson-activity";
import type { Lesson } from "@/lib/types";

type LessonReviewTemplateProps = {
  lesson: Lesson;
};

function listItems(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildReviewTemplate(lesson: Lesson) {
  const courseModule = getModule(lesson.moduleId);
  const skillLine = getSkillLine(lesson.skillLine);
  const sections = [
    `# ${lesson.id} ${lesson.title} 复盘`,
    "",
    `课程模块：${courseModule?.title ?? lesson.moduleId}`,
    `能力线：${skillLine?.title ?? lesson.skillLine}`,
    `Python 落点：${lesson.pythonModule}`,
    "",
    "用途边界：教育学习记录，不构成投资建议；历史数据和回测结果不代表未来收益。",
    "",
    "## 1. 本节我应该掌握什么",
    listItems(lesson.objectives),
    "",
    "## 2. 用自己的话解释概念",
    `核心概念：${lesson.concepts.join(" / ")}`,
    "",
    "> 写下你自己的解释：",
    "",
    lesson.intuition,
    "",
    "## 3. 手算检查",
    lesson.formula ? `公式：${lesson.formula}` : "公式：本节没有单独公式，重点是流程和边界。",
    "",
    `手算例子：${lesson.handExample}`,
    "",
    "> 写下你的手算过程，确认结果和代码输出一致。",
    "",
    "## 4. 代码和测试证据",
    `代码位置：${lesson.pythonModule}`,
    "",
    "我运行的命令：",
    "",
    "```bash",
    "",
    "```",
    "",
    "我检查到的边界条件：",
    "",
    "- ",
    "",
    "## 5. 图表观察",
    `图表类型：${lesson.chart}`,
    "",
    `观察提醒：${lesson.chartNote}`,
    "",
    "> 只写图表能支持的观察，不写未来收益判断。",
    "",
    "## 6. 常见误区防线",
    listItems(lesson.mistakes),
    "",
    "我最容易犯的一个错误：",
    "",
    "- ",
    "",
    "## 7. Checkpoint",
    listItems(lesson.checkpoint),
    "",
    "本节完成证据：",
    "",
    "- ",
    "",
    "## 8. Capstone 关联",
    skillLine ? skillLine.capstoneEvidence : "把本节学习证据写入最终报告。",
    "",
    "下一条要交给 Codex 的任务：",
    "",
    "> ",
    "",
  ];

  return sections.join("\n");
}

export function LessonReviewTemplate({ lesson }: LessonReviewTemplateProps) {
  const skillLine = getSkillLine(lesson.skillLine);
  const reviewTemplate = buildReviewTemplate(lesson);

  function handleCopied() {
    emitLessonActivity(lesson.slug, "checkpoint");
  }

  return (
    <section id="review-template" className="scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-base font-black text-ink">
            <FileText className="h-4 w-4 text-accent" />
            本课复盘模板
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            把本节概念、手算、代码证据、图表观察、误区和 Checkpoint 整理成一段 Markdown，后续可放入学习笔记或 Capstone 草稿。
          </p>
        </div>
        <CopyButton value={reviewTemplate} label="复制模板" onCopied={handleCopied} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
          <span className="inline-flex items-center gap-1 font-black text-ink">
            <ClipboardCheck className="h-3.5 w-3.5 text-accent" />
            复盘重点
          </span>
          <p className="mt-1">{lesson.checkpoint[0]}</p>
        </div>
        <div className="rounded-md border border-indigo-100 bg-indigo-50 p-3 text-sm leading-6 text-indigo-950">
          <span className="inline-flex items-center gap-1 font-black text-ink">
            <Flag className="h-3.5 w-3.5 text-accent" />
            能力线证据
          </span>
          <p className="mt-1">{skillLine?.capstoneEvidence ?? "把本节产物写入最终报告。"}</p>
        </div>
      </div>
    </section>
  );
}
