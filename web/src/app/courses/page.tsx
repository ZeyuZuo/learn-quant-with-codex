import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCode2, Milestone } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { allLessons, courseModules } from "@/lib/courses";

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
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-lg border border-line bg-white p-4 shadow-soft">
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
        </header>

        <div className="mt-8 grid gap-5">
          {courseModules.map((module, moduleIndex) => (
            <section
              key={module.id}
              className="chart-enter rounded-lg border border-line bg-white p-5 shadow-soft"
              style={{ animationDelay: `${moduleIndex * 45}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-ink">{module.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{module.summary}</p>
                </div>
                <div className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{module.product}</div>
              </div>

              {module.lessons.length > 0 ? (
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${lesson.slug}`}
                      className="group rounded-lg border border-line bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-white hover:shadow-soft"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-accent">{lesson.id}</span>
                        <span className="rounded-md border border-line bg-white px-2 py-1 text-xs text-muted">{lesson.duration}</span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-ink">{lesson.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{lesson.subtitle}</p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <FileCode2 className="h-3.5 w-3.5" />
                          {lesson.pythonModule}
                        </span>
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-lg border border-dashed border-line bg-slate-50 p-4 text-sm leading-7 text-muted">
                  该模块已在课程设计中规划，后续会按主线继续补齐完整内容。
                </div>
              )}

              <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50/70 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-950">
                  <Milestone className="h-4 w-4" />
                  Mini Project: {module.miniProject.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-teal-950">{module.miniProject.deliverable}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  {module.miniProject.checks.map((check) => (
                    <div key={check} className="flex gap-2 rounded-md bg-white px-3 py-2 text-xs leading-5 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
