import Link from "next/link";
import { CheckCircle2, FileCode2, Milestone, Navigation } from "lucide-react";
import type { CourseModule, Lesson } from "@/lib/types";

type LessonAsideProps = {
  lesson: Lesson;
  courseModule?: CourseModule;
  progress: number;
};

const anchors = [
  ["#objectives", "本节目标"],
  ["#concepts", "概念和公式"],
  ["#code", "Python 示例"],
  ["#chart", "图表观察"],
  ["#quiz", "Quiz 和练习"],
  ["#codex-task", "Codex 任务"],
  ["#checkpoint", "Checkpoint"],
];

export function LessonAside({ lesson, courseModule, progress }: LessonAsideProps) {
  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto px-4 py-10">
        <section className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <Navigation className="h-4 w-4 text-accent" />
            本页导航
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 text-xs font-semibold text-muted">{progress}% 课程路径</div>
          <nav className="mt-4 grid gap-1">
            {anchors.map(([href, label]) => (
              <a key={href} href={href} className="rounded-md px-2 py-1.5 text-sm text-slate-600 transition hover:bg-teal-50 hover:text-accent">
                {label}
              </a>
            ))}
          </nav>
        </section>

        <section className="mt-4 rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <FileCode2 className="h-4 w-4 text-accent" />
            代码落点
          </div>
          <code className="mt-3 block rounded-md border border-line bg-slate-50 px-2 py-2 text-xs leading-5 text-slate-700">{lesson.pythonModule}</code>
          <p className="mt-3 text-xs leading-5 text-muted">复制 Codex Prompt 前，先确认你知道本课会修改或检查哪个 Python 模块。</p>
        </section>

        <section className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-teal-950">
            <Milestone className="h-4 w-4" />
            模块项目
          </div>
          <p className="mt-2 text-xs leading-5 text-teal-950">{courseModule?.miniProject.title ?? "Mini Project"}</p>
          {courseModule ? (
            <Link href={`/projects#${courseModule.id}`} className="mt-3 inline-flex rounded-md bg-teal-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-teal-800">
              查看验收项
            </Link>
          ) : null}
        </section>

        <section className="mt-4 rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="text-sm font-black text-ink">本课 Checkpoint</div>
          <div className="mt-3 grid gap-2">
            {lesson.checkpoint.map((item) => (
              <div key={item} className="flex gap-2 text-xs leading-5 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
