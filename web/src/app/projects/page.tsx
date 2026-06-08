import Link from "next/link";
import { CheckCircle2, ClipboardList, FileCode2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { miniProjects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-black text-ink sm:text-4xl">项目实践</h1>
          <p className="mt-4 text-lg leading-8 text-slate-650">
            每个模块都有一个 Mini Project。它们把课程里的概念、Python 函数、测试和报告串起来，最后收束到 Capstone 研究报告。
          </p>
        </header>

        <div className="mt-8 grid gap-5">
          {miniProjects.map((project, index) => (
            <article
              key={project.id}
              className="chart-enter rounded-lg border border-line bg-white p-5 shadow-soft"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-accent">{project.moduleId}</div>
                  <h2 className="mt-2 text-xl font-black text-ink">{project.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.moduleTitle}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-950">
                  <ClipboardList className="h-4 w-4" />
                  Mini Project
                </div>
              </div>

              <p className="mt-4 rounded-lg border border-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">{project.deliverable}</p>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
                <div>
                  <h3 className="text-sm font-bold text-ink">验收项</h3>
                  <div className="mt-3 grid gap-2">
                    {project.checks.map((check) => (
                      <div key={check} className="flex gap-2 rounded-md bg-teal-50 px-3 py-2 text-sm leading-6 text-teal-950">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                    <FileCode2 className="h-4 w-4 text-accent" />
                    建议命令
                  </h3>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
                    <code>{project.commands.join("\n")}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/courses/${lesson.slug}`}
                    className="rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent"
                  >
                    {lesson.id} {lesson.title}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
