import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Terminal } from "lucide-react";
import { miniProjects } from "@/lib/projects";

export function CapstoneEvidenceMatrix() {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <FileText className="h-5 w-5 text-accent" />
            Mini Project 到 Capstone 证据矩阵
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
            每个模块项目都不是孤立作业。把下面的交付物逐项整理进最终报告，可以避免 Capstone 只剩一张净值曲线和几个指标。
          </p>
        </div>
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
          查看项目页
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 grid gap-3">
        {miniProjects.map((project, index) => (
          <article
            key={project.id}
            className="chart-enter rounded-lg border border-line bg-slate-50 p-4 transition duration-200 hover:border-accent hover:bg-white"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className="grid gap-4 lg:grid-cols-[190px_1fr_1fr]">
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-accent">{project.moduleId}</div>
                <h3 className="mt-1 text-sm font-black leading-6 text-ink">{project.moduleTitle}</h3>
                <Link href={`/projects#${project.moduleId}`} className="mt-3 inline-flex items-center gap-1 text-xs font-black text-accent hover:underline">
                  项目验收
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  交付物
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{project.deliverable}</p>
                <code className="mt-2 block rounded-md border border-line bg-white px-2 py-1.5 text-xs leading-5 text-slate-700">{project.deliverablePath}</code>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-muted">
                  <FileText className="h-3.5 w-3.5 text-accent" />
                  写入最终报告
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{project.capstoneMaterial}</p>
                <div className="mt-2 flex items-start gap-2 rounded-md border border-line bg-white px-2 py-1.5 text-xs leading-5 text-slate-600">
                  <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{project.commands[project.commands.length - 1] ?? "uv run pytest"}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
