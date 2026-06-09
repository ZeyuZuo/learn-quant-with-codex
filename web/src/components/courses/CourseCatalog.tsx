"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Filter, Milestone, PlayCircle, RotateCcw, Search, Target } from "lucide-react";
import { courseModules } from "@/lib/courses";
import { CourseProgressList } from "@/components/progress/CourseProgressList";
import { ModuleProgress } from "@/components/progress/ModuleProgress";
import { useLessonProgress } from "@/lib/progress";

type StatusFilter = "all" | "todo" | "done";
type DifficultyFilter = "all" | "入门" | "基础" | "进阶";

export function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const progress = useLessonProgress();

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courseModules
      .filter((module) => moduleId === "all" || module.id === moduleId)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const haystack = [lesson.id, lesson.title, lesson.subtitle, lesson.pythonModule, ...lesson.concepts].join(" ").toLowerCase();
          const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
          const matchesDifficulty = difficulty === "all" || lesson.difficulty === difficulty;
          const completed = progress.completedSet.has(lesson.slug);
          const matchesStatus =
            status === "all" || !progress.ready || (status === "done" && completed) || (status === "todo" && !completed);

          return matchesQuery && matchesDifficulty && matchesStatus;
        }),
      }))
      .filter((module) => module.lessons.length > 0 || (!normalizedQuery && difficulty === "all" && status === "all"));
  }, [difficulty, moduleId, progress.completedSet, progress.ready, query, status]);

  const visibleLessons = filteredModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const visibleModules = filteredModules.length;
  const hasActiveFilters = query.trim().length > 0 || moduleId !== "all" || status !== "all" || difficulty !== "all";
  const activeFilterLabels = [
    query.trim() ? `关键词：${query.trim()}` : null,
    moduleId !== "all" ? courseModules.find((module) => module.id === moduleId)?.title : null,
    status !== "all" ? `状态：${status === "done" ? "已完成" : "未完成"}` : null,
    difficulty !== "all" ? `难度：${difficulty}` : null,
  ].filter((label): label is string => Boolean(label));

  function clearFilters() {
    setQuery("");
    setModuleId("all");
    setStatus("all");
    setDifficulty("all");
  }

  return (
    <>
      <section className="mt-8 rounded-lg border border-line bg-white p-4 shadow-soft">
        <div className="grid gap-3 lg:grid-cols-[1fr_230px_180px_160px]">
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
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-accent" />
              状态
            </span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as StatusFilter)}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">全部</option>
              <option value="todo">未完成</option>
              <option value="done">已完成</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              难度
            </span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as DifficultyFilter)}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">全部</option>
              <option value="入门">入门</option>
              <option value="基础">基础</option>
              <option value="进阶">进阶</option>
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_340px]">
          <div className="rounded-md border border-line bg-slate-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                当前显示 <span className="font-bold text-ink">{visibleModules}</span> 个模块、<span className="font-bold text-ink">{visibleLessons}</span> 节课。
                {progress.ready ? ` 已完成 ${progress.completedCount} / ${progress.totalCount} 节。` : " 正在读取本地进度。"}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
                >
                  <RotateCcw className="h-4 w-4" />
                  清除筛选
                </button>
              ) : null}
            </div>
            {hasActiveFilters ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {activeFilterLabels.map((label) => (
                  <span key={label} className="rounded-md border border-teal-100 bg-white px-2 py-1 text-xs font-bold text-teal-950">
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {progress.ready ? (
            <Link
              href={`/courses/${progress.nextLesson.slug}`}
              className="rounded-md border border-teal-200 bg-teal-50 p-3 text-teal-950 transition hover:border-teal-300 hover:bg-teal-100"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-wide opacity-75">下一步课程</div>
                  <div className="mt-1 text-sm font-black">
                    {progress.nextLesson.id} {progress.nextLesson.title}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </div>
            </Link>
          ) : (
            <div className="rounded-md border border-line bg-slate-50 p-3 text-sm font-bold text-muted">读取下一步课程中</div>
          )}
        </div>
      </section>

      {visibleLessons === 0 ? (
        <section className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <h2 className="text-lg font-black">没有找到匹配课程</h2>
          <p className="mt-2 text-sm leading-7">换一个关键词，或清除状态、难度和模块筛选后再看完整学习路径。</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-amber-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-amber-900"
          >
            <RotateCcw className="h-4 w-4" />
            清除筛选
          </button>
        </section>
      ) : null}

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

            {module.lessons.length > 0 ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <CourseProgressList lessons={module.lessons} />
              </div>
            ) : (
              <div className="mt-5 rounded-lg border border-line bg-slate-50 p-4 text-sm leading-7 text-muted">本模块下没有匹配当前筛选条件的课程。</div>
            )}

            <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-950">
                  <Milestone className="h-4 w-4" />
                  Mini Project: {module.miniProject.title}
                </div>
                <Link href={`/projects#${module.id}`} className="inline-flex items-center gap-2 rounded-md bg-teal-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-teal-800">
                  查看项目
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
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
