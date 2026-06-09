"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpenText, Filter, Flag, NotebookPen, RotateCcw, Search } from "lucide-react";
import { allLessons, courseModules, getSkillLine, skillLines } from "@/lib/courses";
import { useLessonNotes } from "@/lib/notes";
import type { SkillLineId } from "@/lib/types";

type SkillLineFilter = "all" | SkillLineId;

export function NotebookView() {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");
  const [skillLineId, setSkillLineId] = useState<SkillLineFilter>("all");
  const notes = useLessonNotes();

  function findLesson(slug: string) {
    return allLessons.find((lesson) => lesson.slug === slug);
  }

  const enrichedNotes = useMemo(
    () =>
      notes.noteList.map((note) => {
        const lesson = findLesson(note.slug);
        const courseModule = lesson ? courseModules.find((item) => item.id === lesson.moduleId) : undefined;
        const skillLine = lesson ? getSkillLine(lesson.skillLine) : undefined;
        return { note, lesson, courseModule, skillLine };
      }),
    [notes.noteList],
  );

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return enrichedNotes.filter(({ note, lesson, courseModule, skillLine }) => {
      const haystack = [note.text, lesson?.id, lesson?.title, lesson?.subtitle, lesson?.pythonModule, courseModule?.title, skillLine?.title, skillLine?.shortTitle]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesModule = moduleId === "all" || lesson?.moduleId === moduleId;
      const matchesSkillLine = skillLineId === "all" || lesson?.skillLine === skillLineId;
      return matchesQuery && matchesModule && matchesSkillLine;
    });
  }, [enrichedNotes, moduleId, query, skillLineId]);

  const notedLessonSlugs = new Set(notes.noteList.map((note) => note.slug));
  const notedModuleCount = courseModules.filter((module) => module.lessons.some((lesson) => notedLessonSlugs.has(lesson.slug))).length;
  const notedSkillLineCount = skillLines.filter((skillLine) => enrichedNotes.some(({ lesson }) => lesson?.skillLine === skillLine.id)).length;
  const hasActiveFilters = query.trim().length > 0 || moduleId !== "all" || skillLineId !== "all";

  function clearFilters() {
    setQuery("");
    setModuleId("all");
    setSkillLineId("all");
  }

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-5 shadow-soft">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <NotebookPen className="h-5 w-5 text-accent" />
            本地笔记
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            {notes.ready ? `当前有 ${notes.noteCount} 条课程笔记。` : "正在读取本地笔记。"}
          </p>
        </div>
        {notes.noteCount > 0 ? (
          <button
            type="button"
            onClick={notes.clearAllNotes}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-muted transition hover:border-rose-300 hover:text-rose-700"
          >
            <RotateCcw className="h-4 w-4" />
            清空笔记
          </button>
        ) : null}
      </div>

      {notes.noteCount > 0 ? (
        <>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="text-2xl font-black text-ink">{notes.noteCount}</div>
              <div className="mt-1 text-xs font-semibold text-muted">笔记课程</div>
            </div>
            <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="text-2xl font-black text-ink">{notedModuleCount}</div>
              <div className="mt-1 text-xs font-semibold text-muted">覆盖模块</div>
            </div>
            <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="text-2xl font-black text-ink">{notedSkillLineCount}</div>
              <div className="mt-1 text-xs font-semibold text-muted">覆盖能力线</div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-line bg-white p-4 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px_190px]">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2">
                  <Search className="h-4 w-4 text-accent" />
                  搜索笔记、课程或 Python 模块
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="例如：回撤、signal、复权、pytest"
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
                  <Flag className="h-4 w-4 text-accent" />
                  能力线
                </span>
                <select
                  value={skillLineId}
                  onChange={(event) => setSkillLineId(event.target.value as SkillLineFilter)}
                  className="min-h-11 rounded-md border border-line bg-slate-50 px-3 text-sm text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                >
                  <option value="all">全部能力</option>
                  {skillLines.map((skillLine) => (
                    <option key={skillLine.id} value={skillLine.id}>
                      {skillLine.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2">
              <p className="text-sm text-muted">
                当前显示 <span className="font-bold text-ink">{filteredNotes.length}</span> 条笔记。
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
                >
                  <RotateCcw className="h-4 w-4" />
                  清除筛选
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}

      <div className="mt-5 grid gap-4">
        {notes.noteList.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-white p-6 text-sm leading-7 text-muted">
            还没有笔记。进入任意课程页，在“我的笔记”区域写下你的理解或疑问。
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-950">
            没有匹配当前筛选条件的笔记。换一个关键词，或清除模块和能力线筛选后再复盘。
          </div>
        ) : (
          filteredNotes.map(({ note, lesson, courseModule, skillLine }) => {
            return (
              <article key={note.slug} className="chart-enter rounded-lg border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-ink">{lesson ? `${lesson.id} ${lesson.title}` : note.slug}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                      <span className="rounded-md border border-line bg-slate-50 px-2 py-1">更新时间：{new Date(note.updatedAt).toLocaleString()}</span>
                      {courseModule ? <span className="rounded-md border border-line bg-slate-50 px-2 py-1">{courseModule.title}</span> : null}
                      {skillLine ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-indigo-100 bg-indigo-50 px-2 py-1 text-indigo-950">
                          <Flag className="h-3.5 w-3.5" />
                          {skillLine.title}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {lesson ? (
                    <Link href={`/courses/${lesson.slug}`} className="rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent">
                      回到课程
                    </Link>
                  ) : null}
                </div>
                <p className="mt-4 whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm leading-7 text-slate-700">{note.text}</p>
                {lesson ? (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3 text-xs leading-5 text-slate-600">
                    <span className="inline-flex items-center gap-1 font-bold text-ink">
                      <BookOpenText className="h-3.5 w-3.5 text-accent" />
                      复盘提示
                    </span>
                    <span>{lesson.checkpoint[0]}</span>
                    {skillLine ? <span>Capstone 证据：{skillLine.capstoneEvidence}</span> : null}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
