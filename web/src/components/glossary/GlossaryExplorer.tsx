"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, BookOpen, Filter, Flag, Layers3, RotateCcw, Search, Target } from "lucide-react";
import { courseModules, getSkillLine, skillLines } from "@/lib/courses";
import { getRelatedLessons, glossaryTerms, type GlossaryTerm } from "@/lib/glossary";
import type { SkillLineId } from "@/lib/types";

const groups: Array<GlossaryTerm["group"] | "全部"> = ["全部", "数据", "收益", "风险", "回测", "策略", "验证", "边界"];
type SkillLineFilter = SkillLineId | "全部";

function uniqueValues<T>(values: T[]) {
  return Array.from(new Set(values));
}

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GlossaryTerm["group"] | "全部">("全部");
  const [moduleId, setModuleId] = useState("全部");
  const [skillLineId, setSkillLineId] = useState<SkillLineFilter>("全部");

  const enrichedTerms = useMemo(
    () =>
      glossaryTerms.map((term) => {
        const lessons = getRelatedLessons(term);
        const modules = uniqueValues(lessons.map((lesson) => lesson.moduleId))
          .map((id) => courseModules.find((module) => module.id === id))
          .filter((module) => module !== undefined);
        const relatedSkillLines = uniqueValues(lessons.map((lesson) => lesson.skillLine))
          .map((id) => getSkillLine(id))
          .filter((skillLine) => skillLine !== undefined);

        return { term, lessons, modules, skillLines: relatedSkillLines };
      }),
    [],
  );

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return enrichedTerms.filter(({ term, lessons, modules, skillLines: relatedSkillLines }) => {
      const matchesGroup = group === "全部" || term.group === group;
      const matchesModule = moduleId === "全部" || lessons.some((lesson) => lesson.moduleId === moduleId);
      const matchesSkillLine = skillLineId === "全部" || lessons.some((lesson) => lesson.skillLine === skillLineId);
      const haystack = [
        term.term,
        term.english,
        term.summary,
        term.whyItMatters,
        term.commonMistake,
        term.group,
        ...lessons.flatMap((lesson) => [lesson.id, lesson.title, lesson.subtitle, lesson.pythonModule]),
        ...modules.map((module) => module.title),
        ...relatedSkillLines.flatMap((skillLine) => [skillLine.title, skillLine.shortTitle, skillLine.capstoneEvidence]),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      return matchesGroup && matchesModule && matchesSkillLine && matchesQuery;
    });
  }, [enrichedTerms, group, moduleId, query, skillLineId]);

  const coveredModuleCount = uniqueValues(enrichedTerms.flatMap((item) => item.modules.map((module) => module.id))).length;
  const coveredSkillLineCount = uniqueValues(enrichedTerms.flatMap((item) => item.skillLines.map((skillLine) => skillLine.id))).length;
  const hasActiveFilter = query.trim().length > 0 || group !== "全部" || moduleId !== "全部" || skillLineId !== "全部";

  function clearFilters() {
    setQuery("");
    setGroup("全部");
    setModuleId("全部");
    setSkillLineId("全部");
  }

  return (
    <>
      <section className="mt-8 rounded-lg border border-line bg-white p-4 shadow-soft">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-line bg-slate-50 p-3">
            <div className="text-2xl font-black text-ink">{glossaryTerms.length}</div>
            <div className="mt-1 text-xs font-semibold text-muted">核心术语</div>
          </div>
          <div className="rounded-md border border-line bg-slate-50 p-3">
            <div className="text-2xl font-black text-ink">{coveredModuleCount}</div>
            <div className="mt-1 text-xs font-semibold text-muted">关联模块</div>
          </div>
          <div className="rounded-md border border-line bg-slate-50 p-3">
            <div className="text-2xl font-black text-ink">{coveredSkillLineCount}</div>
            <div className="mt-1 text-xs font-semibold text-muted">覆盖能力线</div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_180px_220px_190px]">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-accent" />
              搜索术语、课程或 Capstone 证据
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：drawdown、复权、偷看未来、样本外"
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Filter className="h-4 w-4 text-accent" />
              主题
            </span>
            <select
              value={group}
              onChange={(event) => setGroup(event.target.value as GlossaryTerm["group"] | "全部")}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              {groups.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-accent" />
              模块
            </span>
            <select
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              <option value="全部">全部模块</option>
              {courseModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Flag className="h-4 w-4 text-accent" />
              能力线
            </span>
            <select
              value={skillLineId}
              onChange={(event) => setSkillLineId(event.target.value as SkillLineFilter)}
              className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
            >
              <option value="全部">全部能力</option>
              {skillLines.map((skillLine) => (
                <option key={skillLine.id} value={skillLine.id}>
                  {skillLine.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-slate-50 p-3">
          <p className="text-sm text-muted">
            当前显示 <span className="font-bold text-ink">{filteredTerms.length}</span> / {glossaryTerms.length} 个术语。筛选会同步匹配相关课程、模块和能力线。
          </p>
          {hasActiveFilter ? (
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
      </section>

      {filteredTerms.length === 0 ? (
        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <h2 className="text-lg font-black">没有找到匹配术语</h2>
          <p className="mt-2 text-sm leading-7">可以换一个关键词，或清除主题筛选后再查。</p>
        </section>
      ) : null}

      <section className="mt-8 grid gap-4">
        {filteredTerms.map(({ term, lessons, modules, skillLines: relatedSkillLines }, index) => {
          return (
            <article
              key={term.id}
              id={term.id}
              className="chart-enter scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-soft transition target:border-accent target:ring-4 target:ring-teal-100"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-xl font-black text-ink">{term.term}</h2>
                    <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-semibold text-muted">{term.english}</span>
                  </div>
                </div>
                <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-xs font-black text-teal-950">{term.group}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{term.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                {modules.map((module) => (
                  <span key={module.id} className="inline-flex items-center gap-1 rounded-md border border-line bg-slate-50 px-2 py-1">
                    <Layers3 className="h-3.5 w-3.5 text-accent" />
                    {module.title}
                  </span>
                ))}
                {relatedSkillLines.map((skillLine) => (
                  <span key={skillLine.id} className="inline-flex items-center gap-1 rounded-md border border-indigo-100 bg-indigo-50 px-2 py-1 text-indigo-950">
                    <Flag className="h-3.5 w-3.5" />
                    {skillLine.title}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                <div className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm leading-7 text-teal-950">
                  <span className="font-bold">为什么重要：</span>
                  {term.whyItMatters}
                </div>
                <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-7 text-amber-950">
                  <span className="inline-flex items-center gap-1 font-bold">
                    <AlertTriangle className="h-4 w-4" />
                    常见误区：
                  </span>
                  {term.commonMistake}
                </div>
              </div>
              {relatedSkillLines.length > 0 ? (
                <div className="mt-4 rounded-md border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs leading-5 text-indigo-950">
                  <div className="inline-flex items-center gap-1 font-black text-ink">
                    <Target className="h-3.5 w-3.5 text-accent" />
                    Capstone 复盘证据
                  </div>
                  <div className="mt-1 grid gap-1">
                    {relatedSkillLines.map((skillLine) => (
                      <p key={skillLine.id}>{skillLine.capstoneEvidence}</p>
                    ))}
                  </div>
                </div>
              ) : null}
              {lessons.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/courses/${lesson.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      {lesson.id} {lesson.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </>
  );
}
