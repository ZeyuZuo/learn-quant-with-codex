import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const contentDir = path.join(rootDir, "content", "courses");

async function readJson(fileName) {
  const content = await readFile(path.join(contentDir, fileName), "utf8");
  return JSON.parse(content);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateCourseData(data, expectedLocale) {
  assert(data.locale === expectedLocale, `${expectedLocale}: locale mismatch`);
  assert(data.site?.projectName, `${expectedLocale}: missing project name`);
  assert(data.site?.githubUrl, `${expectedLocale}: missing GitHub URL`);
  assert(data.home?.title, `${expectedLocale}: missing home title`);
  assert(data.home?.description, `${expectedLocale}: missing home description`);
  assert(Array.isArray(data.courses), `${expectedLocale}: courses must be an array`);
  assert(data.courses.length > 0, `${expectedLocale}: courses cannot be empty`);

  const ids = new Set();
  for (const course of data.courses) {
    assert(course.id, `${expectedLocale}: course missing id`);
    assert(!ids.has(course.id), `${expectedLocale}: duplicate course id ${course.id}`);
    assert(course.title, `${expectedLocale}: course ${course.id} missing title`);
    assert(course.summary, `${expectedLocale}: course ${course.id} missing summary`);
    assert(Array.isArray(course.lessons), `${expectedLocale}: course ${course.id} lessons must be an array`);
    assert(course.lessons.length > 0, `${expectedLocale}: course ${course.id} lessons cannot be empty`);

    const lessonIds = new Set();
    for (const lesson of course.lessons) {
      assert(lesson.id, `${expectedLocale}: course ${course.id} lesson missing id`);
      assert(
        !lessonIds.has(lesson.id),
        `${expectedLocale}: course ${course.id} duplicate lesson id ${lesson.id}`
      );
      assert(lesson.title, `${expectedLocale}: course ${course.id} lesson ${lesson.id} missing title`);
      assert(lesson.goal, `${expectedLocale}: course ${course.id} lesson ${lesson.id} missing goal`);
      lessonIds.add(lesson.id);
    }

    ids.add(course.id);
  }
}

const zh = await readJson("zh.json");
const en = await readJson("en.json");

validateCourseData(zh, "zh");
validateCourseData(en, "en");

const zhIds = zh.courses.map((course) => course.id).join(",");
const enIds = en.courses.map((course) => course.id).join(",");
assert(zhIds === enIds, "zh and en course ids must match and stay in the same order");

const zhLessonIds = zh.courses
  .map((course) => `${course.id}:${course.lessons.map((lesson) => lesson.id).join("|")}`)
  .join(",");
const enLessonIds = en.courses
  .map((course) => `${course.id}:${course.lessons.map((lesson) => lesson.id).join("|")}`)
  .join(",");
assert(zhLessonIds === enLessonIds, "zh and en lesson ids must match and stay in the same order");

console.log("Course content is valid");
