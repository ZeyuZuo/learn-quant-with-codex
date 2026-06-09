"use client";

export type LessonActivityType = "quiz" | "prompt";

const EVENT_NAME = "learn-quant-with-codex.lesson-activity";

type LessonActivityDetail = {
  slug: string;
  type: LessonActivityType;
};

export function emitLessonActivity(slug: string, type: LessonActivityType) {
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
