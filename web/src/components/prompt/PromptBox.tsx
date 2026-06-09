"use client";

import { CopyButton } from "./CopyButton";
import { emitLessonActivity } from "@/lib/lesson-activity";

type PromptBoxProps = {
  prompt: string;
  lessonSlug?: string;
};

export function PromptBox({ prompt, lessonSlug }: PromptBoxProps) {
  function handleCopied() {
    if (lessonSlug) {
      emitLessonActivity(lessonSlug, "prompt");
    }
  }

  return (
    <section className="rounded-lg border border-teal-200 bg-teal-50/70 p-4 transition duration-200 hover:border-teal-300 hover:shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-teal-950">Codex 练习任务</h3>
        <CopyButton value={prompt} label="复制 Prompt" onCopied={handleCopied} />
      </div>
      <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-md border border-teal-200 bg-white p-4 text-sm leading-7 text-slate-800">
        {prompt}
      </pre>
    </section>
  );
}
