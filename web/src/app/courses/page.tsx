import { SiteHeader } from "@/components/layout/SiteHeader";
import { allLessons, courseModules } from "@/lib/courses";
import { ProgressSummary } from "@/components/progress/ProgressSummary";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import Link from "next/link";

export default function CoursesPage() {
  const totalMinutes = allLessons.reduce((sum, lesson) => sum + Number.parseInt(lesson.duration, 10), 0);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black text-ink sm:text-4xl">课程目录</h1>
            <p className="mt-4 text-lg leading-8 text-slate-650">
              课程按项目产物推进。每个模块都包含概念、代码、图表、Quiz、Codex 任务、Checkpoint 和 Mini Project。
            </p>
            <Link href="/projects" className="mt-4 inline-flex rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
              查看所有 Mini Project
            </Link>
          </div>
          <ProgressSummary compact />
        </header>

        <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-line bg-white p-4 shadow-soft sm:max-w-xl">
          <div>
            <div className="text-2xl font-black text-ink">{courseModules.length}</div>
            <div className="mt-1 text-xs text-muted">模块</div>
          </div>
          <div>
            <div className="text-2xl font-black text-ink">{allLessons.length}</div>
            <div className="mt-1 text-xs text-muted">课程</div>
          </div>
          <div>
            <div className="text-2xl font-black text-ink">{Math.round(totalMinutes / 60)}h</div>
            <div className="mt-1 text-xs text-muted">预计学习</div>
          </div>
        </div>

        <CourseCatalog />
      </main>
    </>
  );
}
