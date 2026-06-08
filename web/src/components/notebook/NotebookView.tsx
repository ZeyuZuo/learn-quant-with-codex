"use client";

import Link from "next/link";
import { NotebookPen, RotateCcw } from "lucide-react";
import { allLessons } from "@/lib/courses";
import { useLessonNotes } from "@/lib/notes";

export function NotebookView() {
  const notes = useLessonNotes();

  function findLesson(slug: string) {
    return allLessons.find((lesson) => lesson.slug === slug);
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

      <div className="mt-5 grid gap-4">
        {notes.noteList.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line bg-white p-6 text-sm leading-7 text-muted">
            还没有笔记。进入任意课程页，在“我的笔记”区域写下你的理解或疑问。
          </div>
        ) : (
          notes.noteList.map((note) => {
            const lesson = findLesson(note.slug);
            return (
              <article key={note.slug} className="rounded-lg border border-line bg-white p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-ink">{lesson ? `${lesson.id} ${lesson.title}` : note.slug}</h3>
                    <p className="mt-1 text-xs text-muted">更新时间：{new Date(note.updatedAt).toLocaleString()}</p>
                  </div>
                  {lesson ? (
                    <Link href={`/courses/${lesson.slug}`} className="rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent">
                      回到课程
                    </Link>
                  ) : null}
                </div>
                <p className="mt-4 whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm leading-7 text-slate-700">{note.text}</p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
