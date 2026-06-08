import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileCode2 } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { getAdjacentLessons } from "@/lib/courses";
import { LessonChart } from "@/components/charts/LessonChart";
import { Checkpoint } from "./Checkpoint";
import { CodeBlock } from "@/components/prompt/CodeBlock";
import { PromptBox } from "@/components/prompt/PromptBox";
import { QuizCard } from "@/components/quiz/QuizCard";

type LessonViewProps = {
  lesson: Lesson;
};

export function LessonView({ lesson }: LessonViewProps) {
  const { previous, next } = getAdjacentLessons(lesson.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span className="rounded-md border border-line bg-white px-2 py-1">{lesson.id}</span>
        <span className="rounded-md border border-line bg-white px-2 py-1">{lesson.difficulty}</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1">
          <Clock className="h-3.5 w-3.5" />
          {lesson.duration}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1">
          <FileCode2 className="h-3.5 w-3.5" />
          {lesson.pythonModule}
        </span>
      </div>

      <header>
        <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl">{lesson.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{lesson.subtitle}</p>
      </header>

      <section className="mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
        <h2 className="text-base font-bold text-ink">本节目标</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
          {lesson.objectives.map((objective) => (
            <li key={objective}>- {objective}</li>
          ))}
        </ul>
      </section>

      <div className="lesson-prose mt-8">
        <h2>概念解释</h2>
        <p>
          本节涉及的核心概念是：{lesson.concepts.map((concept) => <code key={concept}>{concept}</code>).reduce<React.ReactNode[]>((acc, node, index) => {
            if (index > 0) acc.push("、");
            acc.push(node);
            return acc;
          }, [])}。
        </p>
        <p>{lesson.intuition}</p>

        {lesson.formula ? (
          <>
            <h2>简单公式</h2>
            <div className="rounded-lg border border-line bg-slate-50 p-4 font-mono text-sm text-ink">{lesson.formula}</div>
          </>
        ) : null}

        <h2>小型手算例子</h2>
        <p>{lesson.handExample}</p>

        <h2>Python 示例</h2>
        <CodeBlock code={lesson.pythonCode} />

        <h2>可视化观察</h2>
        <LessonChart kind={lesson.chart} />
        <p>{lesson.chartNote}</p>

        <h2>常见误区</h2>
        <ul>
          {lesson.mistakes.map((mistake) => (
            <li key={mistake}>{mistake}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid gap-6">
        <QuizCard quiz={lesson.quiz} />
        <PromptBox prompt={lesson.codexTask} />
        <Checkpoint items={lesson.checkpoint} />
      </div>

      <nav className="mt-10 grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link href={`/courses/${previous.slug}`} className="rounded-lg border border-line bg-white p-4 transition hover:border-accent">
            <span className="flex items-center gap-2 text-sm text-muted">
              <ArrowLeft className="h-4 w-4" />
              上一课
            </span>
            <strong className="mt-2 block text-ink">{previous.title}</strong>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/courses/${next.slug}`} className="rounded-lg border border-line bg-white p-4 text-right transition hover:border-accent">
            <span className="flex items-center justify-end gap-2 text-sm text-muted">
              下一课
              <ArrowRight className="h-4 w-4" />
            </span>
            <strong className="mt-2 block text-ink">{next.title}</strong>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
