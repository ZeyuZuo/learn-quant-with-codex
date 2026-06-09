"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Circle, ClipboardList, FileText, Flag, HelpCircle, Lightbulb, Route, Terminal } from "lucide-react";
import { CopyButton } from "@/components/prompt/CopyButton";
import { miniProjects } from "@/lib/projects";

const STORAGE_KEY = "learn-quant-with-codex.mini-project-checks.v1";

function readCompletedChecks() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeCompletedChecks(values: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function checkId(projectId: string, index: number) {
  return `${projectId}:${index}`;
}

export function ProjectRoadmap() {
  const [completedChecks, setCompletedChecks] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompletedChecks(readCompletedChecks());
    setReady(true);
  }, []);

  const completedSet = useMemo(() => new Set(completedChecks), [completedChecks]);
  const totalChecks = miniProjects.reduce((sum, project) => sum + project.checks.length, 0);
  const completedCount = completedChecks.length;
  const percent = totalChecks === 0 ? 0 : Math.round((completedCount / totalChecks) * 100);
  const nextProject =
    miniProjects.find((project) => project.checks.some((_, index) => !completedSet.has(checkId(project.id, index)))) ?? miniProjects[miniProjects.length - 1];

  function toggle(projectId: string, index: number) {
    const id = checkId(projectId, index);
    setCompletedChecks((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      const ordered = miniProjects.flatMap((project) => project.checks.map((_, checkIndex) => checkId(project.id, checkIndex))).filter((item) => next.has(item));
      writeCompletedChecks(ordered);
      return ordered;
    });
  }

  return (
    <div className="mt-8">
      <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-ink">Mini Project 路线</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
              这里不是额外作业，而是课程主线的验收入口。每个模块完成后，都应该留下一个可运行、可测试、可写进 Capstone 的产物。
            </p>
          </div>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-black text-teal-950">
            {ready ? `${completedCount}/${totalChecks}` : "读取中"}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${ready ? percent : 0}%` }} />
        </div>
        {nextProject ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-slate-50 px-3 py-2">
            <div>
              <div className="text-xs font-black uppercase tracking-wide text-muted">下一步项目</div>
              <div className="mt-1 text-sm font-bold text-ink">
                {nextProject.moduleId} {nextProject.title}
              </div>
            </div>
            <Link href={`#${nextProject.moduleId}`} className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              定位项目
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </section>

      <div className="mt-6 grid gap-5">
        {miniProjects.map((project, index) => {
          const done = project.checks.filter((_, checkIndex) => completedSet.has(checkId(project.id, checkIndex))).length;
          const projectPercent = project.checks.length === 0 ? 0 : Math.round((done / project.checks.length) * 100);
          const firstLesson = project.lessons[0];

          return (
            <article
              id={project.moduleId}
              key={project.id}
              className="chart-enter scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-soft transition duration-200 target:border-accent target:ring-4 target:ring-teal-100"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wide text-accent">{project.moduleId}</span>
                    <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{project.moduleTitle}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-black text-ink">{project.title}</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-950">
                  <ClipboardList className="h-4 w-4" />
                  {ready ? `${projectPercent}%` : "读取中"}
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: `${ready ? projectPercent : 0}%` }} />
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <section className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-indigo-950">
                    <h3 className="flex items-center gap-2 text-sm font-black">
                      <Route className="h-4 w-4" />
                      v4.4 模块闸门
                    </h3>
                    <div className="mt-3 grid gap-2 text-sm leading-6">
                      <div className="rounded-md bg-white/75 px-3 py-2">
                        <span className="font-black">进入：</span>
                        {project.gate.entry}
                      </div>
                      <div className="rounded-md bg-white/75 px-3 py-2">
                        <span className="font-black">退出：</span>
                        {project.gate.exit}
                      </div>
                      <div className="rounded-md bg-white/75 px-3 py-2">
                        <span className="font-black">下一步用途：</span>
                        {project.gate.nextUse}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.skillLineTitles.map((title) => (
                        <span key={title} className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-white px-2 py-1 text-xs font-bold">
                          <Flag className="h-3.5 w-3.5" />
                          {title}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-black text-ink">
                      <HelpCircle className="h-4 w-4 text-accent" />
                      本项目回答的问题
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{project.question}</p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-black text-ink">
                      <FileText className="h-4 w-4 text-accent" />
                      交付物
                    </h3>
                    <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-sm leading-7 text-slate-700">{project.deliverable}</p>
                    <code className="mt-2 block rounded-md border border-line bg-white px-3 py-2 text-xs leading-5 text-slate-700">{project.deliverablePath}</code>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-black text-ink">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      验收项
                    </h3>
                    <div className="mt-3 grid gap-2">
                      {project.checks.map((check, checkIndex) => {
                        const checked = completedSet.has(checkId(project.id, checkIndex));
                        return (
                          <button
                            key={check}
                            type="button"
                            onClick={() => toggle(project.id, checkIndex)}
                            className={`flex min-h-12 items-start gap-2 rounded-md border px-3 py-2 text-left text-sm leading-6 transition ${
                              checked ? "border-teal-200 bg-teal-50 text-teal-950" : "border-line bg-slate-50 text-slate-700 hover:border-accent"
                            }`}
                          >
                            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${checked ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 bg-white"}`}>
                              {checked ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3.5 w-3.5 text-slate-400" />}
                            </span>
                            <span>{check}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>

                <aside className="space-y-4">
                  <section>
                    <h3 className="flex items-center gap-2 text-sm font-black text-ink">
                      <Terminal className="h-4 w-4 text-accent" />
                      建议命令
                    </h3>
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
                      <code>{project.commands.join("\n")}</code>
                    </pre>
                  </section>

                  <section className="rounded-md border border-amber-200 bg-amber-50 p-3">
                    <h3 className="flex items-center gap-2 text-sm font-black text-amber-950">
                      <Lightbulb className="h-4 w-4" />
                      反思问题
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-amber-950">{project.reflection}</p>
                  </section>

                  <section className="rounded-md border border-teal-200 bg-teal-50 p-3">
                    <h3 className="text-sm font-black text-teal-950">进入 Capstone 的材料</h3>
                    <p className="mt-2 text-sm leading-7 text-teal-950">{project.capstoneMaterial}</p>
                  </section>

                  <section className="rounded-md border border-line bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-black text-ink">Codex Prompt</h3>
                      <CopyButton value={project.codexPrompt} label="复制" className="px-2 py-1 text-xs" />
                    </div>
                    <pre className="mt-3 max-h-52 overflow-auto whitespace-pre-wrap rounded-md bg-white p-3 text-xs leading-6 text-slate-700">
                      {project.codexPrompt}
                    </pre>
                  </section>
                </aside>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.lessons.slice(0, 5).map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${lesson.slug}`}
                      className="rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent"
                    >
                      {lesson.id} {lesson.title}
                    </Link>
                  ))}
                </div>
                {firstLesson ? (
                  <Link href={`/courses/${firstLesson.slug}`} className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
                    从本模块开始
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
