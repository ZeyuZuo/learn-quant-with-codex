"use client";

import { useEffect, useState } from "react";
import { Check, NotebookPen } from "lucide-react";
import { useLessonNotes } from "@/lib/notes";

type NotesPanelProps = {
  slug: string;
};

export function NotesPanel({ slug }: NotesPanelProps) {
  const notes = useLessonNotes();
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const storedValue = notes.notes[slug]?.text ?? "";
  const hasUnsavedChanges = notes.ready && value !== storedValue;

  useEffect(() => {
    if (notes.ready) {
      setValue(storedValue);
    }
  }, [notes.ready, slug, storedValue]);

  function save() {
    notes.saveNote(slug, value);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-ink">
            <NotebookPen className="h-4 w-4 text-accent" />
            我的笔记
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted">写下本节你真正理解了什么、还有什么疑问。笔记只保存在当前浏览器。</p>
          <p className="mt-1 text-xs leading-5 text-muted">
            {hasUnsavedChanges ? "有未保存修改。" : value.trim() ? "当前笔记已保存。" : "空笔记不会保存。"}
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          {saved ? <Check className="h-4 w-4" /> : null}
          {saved ? "已保存" : "保存笔记"}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={6}
        placeholder="例如：我理解了 signal 和 position 的区别，但还需要复习为什么 position 要 shift 一天。"
        className="mt-4 w-full resize-y rounded-md border border-line bg-slate-50 p-3 text-sm leading-7 text-ink outline-none transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>{value.trim().length} 字</span>
        <span>建议记录：本节概念、仍不确定的问题、下一条 Codex Prompt。</span>
      </div>
    </section>
  );
}
