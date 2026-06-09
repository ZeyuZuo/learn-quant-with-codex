"use client";

export type LessonActivityType = "quiz" | "prompt" | "checkpoint";

const EVENT_NAME = "learn-quant-with-codex.lesson-activity";
const STORAGE_KEY = "learn-quant-with-codex.lesson-activity.v1";

type LessonActivityDetail = {
  slug: string;
  type: LessonActivityType;
};

type StoredLessonActivity = Record<string, LessonActivityType[]>;

function readStoredActivity(): StoredLessonActivity {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeStoredActivity(activity: StoredLessonActivity) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
}

export function getLessonActivity(slug: string): Record<LessonActivityType, boolean> {
  const stored = readStoredActivity();
  const types = new Set(stored[slug] ?? []);
  return {
    quiz: types.has("quiz"),
    prompt: types.has("prompt"),
    checkpoint: types.has("checkpoint"),
  };
}

export function setLessonActivity(slug: string, type: LessonActivityType, value = true) {
  const stored = readStoredActivity();
  const types = new Set(stored[slug] ?? []);
  if (value) {
    types.add(type);
  } else {
    types.delete(type);
  }
  const nextTypes = Array.from(types);
  if (nextTypes.length > 0) {
    stored[slug] = nextTypes;
  } else {
    delete stored[slug];
  }
  writeStoredActivity(stored);
}

export function emitLessonActivity(slug: string, type: LessonActivityType) {
  setLessonActivity(slug, type, true);
  window.dispatchEvent(new CustomEvent<LessonActivityDetail>(EVENT_NAME, { detail: { slug, type } }));
}

export function onLessonActivity(callback: (detail: LessonActivityDetail) => void) {
  function handler(event: Event) {
    const customEvent = event as CustomEvent<LessonActivityDetail>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  }

  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
