import { modulesMeta } from "@/content/course/modules";
import { moduleSkillLines, skillLines as courseSkillLines } from "@/content/course/skill-lines";
import { lessons } from "@/content/lessons";
import type { CourseModule, SkillLineId } from "./types";

export const skillLines = courseSkillLines;

export const courseModules: CourseModule[] = modulesMeta.map((module) => ({
  ...module,
  skillLines: moduleSkillLines[module.id] ?? [],
  lessons: lessons.filter((lesson) => lesson.moduleId === module.id),
}));

export const allLessons = [...lessons].sort((a, b) => a.order - b.order);

export function getLesson(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const index = allLessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: index > 0 ? allLessons[index - 1] : undefined,
    next: index >= 0 && index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}

export function getModule(moduleId: string) {
  return courseModules.find((module) => module.id === moduleId);
}

export function getSkillLine(skillLineId: SkillLineId) {
  return skillLines.find((skillLine) => skillLine.id === skillLineId);
}
