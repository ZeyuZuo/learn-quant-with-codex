"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type LessonNote = {
  slug: string;
  text: string;
  updatedAt: string;
};

const STORAGE_KEY = "learn-quant-with-codex.lesson-notes";

function readNotes(): Record<string, LessonNote> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeNotes(notes: Record<string, LessonNote>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useLessonNotes() {
  const [notes, setNotes] = useState<Record<string, LessonNote>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setNotes(readNotes());
    setReady(true);
  }, []);

  const saveNote = useCallback((slug: string, text: string) => {
    setNotes((current) => {
      const next = { ...current };
      const trimmed = text.trim();
      if (!trimmed) {
        delete next[slug];
      } else {
        next[slug] = {
          slug,
          text,
          updatedAt: new Date().toISOString(),
        };
      }
      writeNotes(next);
      return next;
    });
  }, []);

  const clearAllNotes = useCallback(() => {
    writeNotes({});
    setNotes({});
  }, []);

  const noteList = useMemo(
    () =>
      Object.values(notes).sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      }),
    [notes],
  );

  return {
    ready,
    notes,
    noteList,
    noteCount: noteList.length,
    getNote: (slug: string) => notes[slug]?.text ?? "",
    saveNote,
    clearAllNotes,
  };
}
