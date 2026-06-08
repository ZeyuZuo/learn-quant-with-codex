"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Filter, Milestone, Search, Target } from "lucide-react";
import { courseModules } from "@/lib/courses";
import { CourseProgressList } from "@/components/progress/CourseProgressList";
import { ModuleProgress } from "@/components/progress/ModuleProgress";

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courseModules
      .filter((module) => moduleId === "all" || module.id === moduleId)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          if (!normalizedQuery) {
            return true;
          }
          const haystack = [lesson.id, lesson.title, lesson.subtitle, lesson.pythonModule, ...lesson.concepts].join(" ").toLowerCase();
          return haystack.includes(normalizedQuery);
        }),
      }))
      .filter((module) => module.lessons.length > 0 || !normalizedQuery);
  }, [moduleId, query]);

  return (
    <>
      <section className="mt-8 rounded-lg border border-line bg-white p-4 shadow-soft">
        <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-accent" />
              搜索课程、概念或 Python 模块
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：回撤、signal、metrics.py"
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Filter className="h-4 w-4 text-accent" />
              模块
            </span>
            <select
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">全部模块</option>
              {courseModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-muted">当前显示 {filteredModules.reduce((sum, module) => sum + module.lessons.length, 0)} 节课。</p>
      </section>

      <div className="mt-10 grid gap-10">
        {filteredModules.map((module, moduleIndex) => (
          <section
            key={module.id}
            className="chart-enter border-t border-line pt-8 first:border-t-0 first:pt-0"
            style={{ animationDelay: `${moduleIndex * 45}ms` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-2 py-1 text-xs font-bold text-muted">
                  <Target className="h-3.5 w-3.5 text-accent" />
                  {module.lessons.length} 节课
                </div>
                <h2 className="mt-3 text-xl font-bold text-ink">{module.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{module.summary}</p>
              </div>
              <div className="grid min-w-56 gap-2">
                <div className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft">{module.product}</div>
                <ModuleProgress module={module} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <CourseProgressList lessons={module.lessons} />
            </div>

            <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-4">
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
    </>
  );
}
