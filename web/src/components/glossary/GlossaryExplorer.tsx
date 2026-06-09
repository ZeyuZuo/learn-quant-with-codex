"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, BookOpen, Filter, RotateCcw, Search } from "lucide-react";
import { getRelatedLessons, glossaryTerms, type GlossaryTerm } from "@/lib/glossary";

const groups: Array<GlossaryTerm["group"] | "全部"> = ["全部", "数据", "收益", "风险", "回测", "策略", "验证", "边界"];

export function GlossaryExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GlossaryTerm["group"] | "全部">("全部");

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return glossaryTerms.filter((term) => {
      const matchesGroup = group === "全部" || term.group === group;
      if (!normalizedQuery) {
        return matchesGroup;
      }
      const haystack = [term.term, term.english, term.summary, term.whyItMatters, term.commonMistake, term.group].join(" ").toLowerCase();
      return matchesGroup && haystack.includes(normalizedQuery);
    });
  }, [group, query]);

  const hasActiveFilter = query.trim().length > 0 || group !== "全部";

  function clearFilters() {
    setQuery("");
    setGroup("全部");
  }

  return (
    <>
      <section className="mt-8 rounded-lg border border-line bg-white p-4 shadow-soft">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <Search className="h-4 w-4 text-accent" />
              搜索术语、英文或常见误区
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：drawdown、复权、偷看未来"
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
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-slate-50 p-3">
          <p className="text-sm text-muted">
            当前显示 <span className="font-bold text-ink">{filteredTerms.length}</span> / {glossaryTerms.length} 个术语。
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
        {filteredTerms.map((term, index) => {
          const lessons = getRelatedLessons(term);
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
