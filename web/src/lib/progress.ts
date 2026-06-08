"use client";

import { useEffect, useMemo, useState } from "react";
import { allLessons } from "@/lib/courses";

const STORAGE_KEY = "learn-quant-with-codex.completed-lessons";

function readCompletedLessons(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function writeCompletedLessons(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

export function useLessonProgress() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(readCompletedLessons());
    setReady(true);
  }, []);

  const completedSet = useMemo(() => new Set(completed), [completed]);

  function setLessonCompleted(slug: string, value: boolean) {
    setCompleted((current) => {
      const next = new Set(current);
      if (value) {
        next.add(slug);
      } else {
        next.delete(slug);
      }
      const ordered = allLessons.map((lesson) => lesson.slug).filter((lessonSlug) => next.has(lessonSlug));
      writeCompletedLessons(ordered);
      return ordered;
    });
  }

  function resetProgress() {
    writeCompletedLessons([]);
    setCompleted([]);
  }

  const nextLesson = allLessons.find((lesson) => !completedSet.has(lesson.slug)) ?? allLessons[0];

  return {
    ready,
    completed,
    completedSet,
    completedCount: completed.length,
    totalCount: allLessons.length,
    percent: allLessons.length === 0 ? 0 : Math.round((completed.length / allLessons.length) * 100),
    nextLesson,
    isCompleted: (slug: string) => completedSet.has(slug),
    setLessonCompleted,
    resetProgress,
  };
}
