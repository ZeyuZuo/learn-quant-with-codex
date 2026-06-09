import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, FileCode2, ListChecks, Milestone } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { allLessons, getAdjacentLessons, getModule } from "@/lib/courses";
import { LessonChart } from "@/components/charts/LessonChart";
import { Checkpoint } from "./Checkpoint";
import { CodeBlock } from "@/components/prompt/CodeBlock";
import { PromptBox } from "@/components/prompt/PromptBox";
import { QuizCard } from "@/components/quiz/QuizCard";
import { LessonCompleteButton } from "@/components/progress/LessonCompleteButton";
import { PracticePanel } from "./PracticePanel";
import { ConceptPills } from "./ConceptPills";
import { NotesPanel } from "./NotesPanel";
import { LessonLearningScaffold } from "./LessonLearningScaffold";
import { MistakeClinic } from "./MistakeClinic";
import { LessonAside } from "./LessonAside";
import { LessonFocusPanel } from "./LessonFocusPanel";
import { LessonCompletionPanel } from "./LessonCompletionPanel";

type LessonViewProps = {
  lesson: Lesson;
};

export function LessonView({ lesson }: LessonViewProps) {
  const { previous, next } = getAdjacentLessons(lesson.slug);
  const courseModule = getModule(lesson.moduleId);
  const lessonIndex = allLessons.findIndex((item) => item.slug === lesson.slug);
  const progress = Math.round(((lessonIndex + 1) / allLessons.length) * 100);

  return (
    <div className="mx-auto flex max-w-7xl items-start justify-center">
      <article className="min-w-0 max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <div id="progress" className="scroll-mt-24 mb-6 rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-ink">课程进度</span>
            <span className="text-muted">
              {lessonIndex + 1} / {allLessons.length}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
          {courseModule ? <p className="mt-3 text-sm leading-6 text-muted">{courseModule.title}</p> : null}
        </div>

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
          <div className="mt-5">
            <LessonCompleteButton slug={lesson.slug} />
          </div>
        </header>

        <LessonFocusPanel lesson={lesson} />

        <LessonLearningScaffold lesson={lesson} />

        <section id="objectives" className="chart-enter scroll-mt-24 mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-base font-bold text-ink">
            <ListChecks className="h-4 w-4 text-accent" />
            本节目标
          </h2>
          <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </section>

        <div id="concepts" className="lesson-prose scroll-mt-24 mt-8">
          <h2>概念解释</h2>
          <p>
            本节涉及的核心概念是：<ConceptPills concepts={lesson.concepts} />
          </p>
          <p id="intuition" className="scroll-mt-24">
            {lesson.intuition}
          </p>

          {lesson.formula ? (
            <>
              <h2>简单公式</h2>
              <div className="formula-card rounded-lg border border-line bg-slate-50 p-4 font-mono text-sm text-ink">{lesson.formula}</div>
            </>
          ) : null}

          <h2 id="hand-example" className="scroll-mt-24">
            小型手算例子
          </h2>
          <div className="chart-enter rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">{lesson.handExample}</div>

          <h2 id="code" className="scroll-mt-24">
            Python 示例
          </h2>
          <p>
            这段代码对应 <code>{lesson.pythonModule}</code>。先理解输入和输出，再复制到 Codex 任务里要求补测试。
          </p>
          <div className="chart-enter">
            <CodeBlock code={lesson.pythonCode} />
          </div>

          <h2 id="chart" className="scroll-mt-24">
            可视化观察
          </h2>
          <LessonChart kind={lesson.chart} />
          <p>{lesson.chartNote}</p>
        </div>

        <div className="mt-8 grid gap-6">
          <MistakeClinic mistakes={lesson.mistakes} />
          <div id="quiz" className="scroll-mt-24">
            <QuizCard quiz={lesson.quiz} lessonSlug={lesson.slug} />
          </div>
          <PracticePanel lesson={lesson} />
          <NotesPanel slug={lesson.slug} />
          <div id="codex-task" className="scroll-mt-24">
            <PromptBox prompt={lesson.codexTask} lessonSlug={lesson.slug} />
          </div>
          <div id="checkpoint" className="scroll-mt-24">
            <Checkpoint items={lesson.checkpoint} />
          </div>
          <LessonCompletionPanel lesson={lesson} />
          {courseModule ? (
            <section className="rounded-lg border border-teal-200 bg-teal-50 p-5">
              <h3 className="flex items-center gap-2 text-base font-bold text-teal-950">
                <Milestone className="h-4 w-4" />
                模块 Mini Project
              </h3>
              <p className="mt-2 text-sm leading-7 text-teal-950">{courseModule.miniProject.deliverable}</p>
              <ul className="mt-3 grid gap-2">
                {courseModule.miniProject.checks.map((check) => (
                  <li key={check} className="flex gap-2 text-sm leading-6 text-teal-950">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/projects#${courseModule.id}`} className="mt-4 inline-flex rounded-md bg-teal-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-800">
                查看项目验收清单
              </Link>
            </section>
          ) : null}
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
      <LessonAside lesson={lesson} courseModule={courseModule} progress={progress} />
    </div>
  );
}
