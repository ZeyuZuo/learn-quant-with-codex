"use client";

import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { useState } from "react";
import type { Quiz } from "@/lib/types";
import { emitLessonActivity } from "@/lib/lesson-activity";

type QuizCardProps = {
  quiz: Quiz;
  lessonSlug?: string;
};

export function QuizCard({ quiz, lessonSlug }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === quiz.correctValue;

  function selectOption(value: string) {
    setSelected(value);
    if (lessonSlug) {
      emitLessonActivity(lessonSlug, "quiz");
    }
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft transition duration-200 hover:border-slate-300">
      <h3 className="text-base font-bold text-ink">小练习</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">{quiz.question}</p>
      <div className="mt-4 grid gap-2">
        {quiz.options.map((option) => {
          const active = selected === option.value;
          const correct = answered && option.value === quiz.correctValue;
          const wrong = active && answered && !correct;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => selectOption(option.value)}
              className={`flex min-h-11 items-center justify-between rounded-md border px-4 py-2 text-left text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                correct
                  ? "border-teal-300 bg-teal-50 text-teal-950"
                  : wrong
                    ? "border-rose-300 bg-rose-50 text-rose-950"
                    : active
                      ? "border-blue-300 bg-blue-50 text-blue-950"
                      : "border-line bg-slate-50 text-slate-800 hover:border-accent"
              }`}
            >
              <span>{option.label}</span>
              {correct ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : wrong ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4 text-slate-400" />
              )}
            </button>
          );
        })}
      </div>
      {answered ? (
        <div
          className={`mt-4 rounded-md border px-4 py-3 text-sm leading-7 ${
            isCorrect ? "border-teal-200 bg-teal-50 text-teal-950" : "border-rose-200 bg-rose-50 text-rose-950"
          }`}
        >
          <strong>{isCorrect ? "正确。" : "再检查一下。"}</strong> {quiz.explanation}
        </div>
      ) : null}
    </section>
  );
}
