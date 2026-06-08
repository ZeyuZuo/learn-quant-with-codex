import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const courseFile = path.join(root, "src", "lib", "courses.ts");
const courseCodeMapFile = path.join(root, "src", "lib", "course-code-map.ts");

function loadTypeScriptModule(filePath) {
  const source = fs.readFileSync(filePath, "utf-8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      isolatedModules: true,
    },
    fileName: filePath,
  }).outputText;

  const moduleObject = { exports: {} };
  const sandbox = {
    exports: moduleObject.exports,
    module: moduleObject,
    require: (specifier) => {
      throw new Error(`Unexpected runtime import in course data: ${specifier}`);
    },
  };

  vm.runInNewContext(compiled, sandbox, { filename: filePath });
  return moduleObject.exports;
}

function assert(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function unique(values) {
  return new Set(values).size === values.length;
}

function validateLesson(lesson, failures) {
  const prefix = `${lesson.id ?? "unknown"} ${lesson.title ?? "untitled"}`;

  assert(Boolean(lesson.id), `${prefix}: missing id`, failures);
  assert(Boolean(lesson.slug), `${prefix}: missing slug`, failures);
  assert(Boolean(lesson.title), `${prefix}: missing title`, failures);
  assert(Boolean(lesson.subtitle) && lesson.subtitle.length >= 12, `${prefix}: subtitle is too thin`, failures);
  assert(["入门", "基础", "进阶"].includes(lesson.difficulty), `${prefix}: invalid difficulty`, failures);
  assert(/^\d+ 分钟$/.test(lesson.duration), `${prefix}: duration should look like "15 分钟"`, failures);
  assert(Boolean(lesson.pythonModule), `${prefix}: missing pythonModule`, failures);
  assert(Array.isArray(lesson.objectives) && lesson.objectives.length >= 3, `${prefix}: needs at least 3 objectives`, failures);
  assert(Array.isArray(lesson.concepts) && lesson.concepts.length >= 3, `${prefix}: needs at least 3 concepts`, failures);
  assert(Boolean(lesson.intuition) && lesson.intuition.length >= 35, `${prefix}: intuition should be beginner-friendly and substantial`, failures);
  assert(Boolean(lesson.handExample) && lesson.handExample.length >= 20, `${prefix}: missing hand example`, failures);
  assert(Boolean(lesson.pythonCode) && lesson.pythonCode.length >= 20, `${prefix}: missing Python code example`, failures);
  assert(Boolean(lesson.chart), `${prefix}: missing chart kind`, failures);
  assert(Boolean(lesson.chartNote) && lesson.chartNote.length >= 20, `${prefix}: missing chart note`, failures);
  assert(Array.isArray(lesson.mistakes) && lesson.mistakes.length >= 3, `${prefix}: needs at least 3 mistakes`, failures);
  assert(Array.isArray(lesson.checkpoint) && lesson.checkpoint.length >= 3, `${prefix}: needs at least 3 checkpoint items`, failures);

  const quiz = lesson.quiz ?? {};
  assert(Boolean(quiz.question), `${prefix}: missing quiz question`, failures);
  assert(Array.isArray(quiz.options) && quiz.options.length === 3, `${prefix}: quiz should have exactly 3 options`, failures);
  assert(
    Array.isArray(quiz.options) && quiz.options.some((option) => option.value === quiz.correctValue),
    `${prefix}: quiz correctValue must match an option`,
    failures,
  );
  assert(Boolean(quiz.explanation) && quiz.explanation.length >= 15, `${prefix}: quiz explanation is too thin`, failures);

  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("背景："), `${prefix}: Codex task missing background`, failures);
  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("任务："), `${prefix}: Codex task missing task section`, failures);
  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("验收："), `${prefix}: Codex task missing acceptance section`, failures);
  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("不提供投资建议"), `${prefix}: Codex task missing project boundary`, failures);
}

function validateModules(courseModules, allLessons, failures) {
  const moduleIds = courseModules.map((module) => module.id);
  assert(courseModules.length === 10, `expected 10 modules, found ${courseModules.length}`, failures);
  assert(unique(moduleIds), "module ids must be unique", failures);

  for (const module of courseModules) {
    assert(Boolean(module.title), `${module.id}: missing title`, failures);
    assert(Boolean(module.summary) && module.summary.length >= 20, `${module.id}: summary is too thin`, failures);
    assert(Boolean(module.product) && module.product.length >= 10, `${module.id}: product is too thin`, failures);
    assert(module.lessons.length >= 3, `${module.id}: module should have at least 3 lessons`, failures);
    assert(Boolean(module.miniProject?.title), `${module.id}: missing mini project title`, failures);
    assert(Boolean(module.miniProject?.deliverable), `${module.id}: missing mini project deliverable`, failures);
    assert(Array.isArray(module.miniProject?.checks) && module.miniProject.checks.length >= 3, `${module.id}: mini project needs at least 3 checks`, failures);
  }

  for (const lesson of allLessons) {
    assert(moduleIds.includes(lesson.moduleId), `${lesson.id}: unknown moduleId ${lesson.moduleId}`, failures);
  }
}

function validateCoverage(allLessons, failures) {
  const haystack = allLessons
    .flatMap((lesson) => [lesson.slug, lesson.title, lesson.subtitle, lesson.pythonModule, lesson.intuition, lesson.handExample, ...lesson.concepts, ...lesson.mistakes])
    .join(" ")
    .toLowerCase();

  const requiredTerms = [
    "ohlcv",
    "adjusted close",
    "data quality",
    "return",
    "equity curve",
    "drawdown",
    "sharpe",
    "signal",
    "position",
    "commission",
    "slippage",
    "buy and hold",
    "moving average",
    "momentum",
    "mean reversion",
    "portfolio",
    "parameter",
    "out-of-sample",
    "overfitting",
    "paper trading",
    "capstone",
  ];

  for (const term of requiredTerms) {
    assert(haystack.includes(term), `required course topic missing: ${term}`, failures);
  }
}

function validateCourseCodeMap(courseCodeMap, courseModules, failures) {
  assert(Array.isArray(courseCodeMap), "courseCodeMap export must be an array", failures);
  if (!Array.isArray(courseCodeMap)) {
    return;
  }

  const moduleIds = courseModules.map((module) => module.id);
  assert(courseCodeMap.length === moduleIds.length, `courseCodeMap should have ${moduleIds.length} entries`, failures);
  assert(unique(courseCodeMap.map((item) => item.moduleId)), "courseCodeMap module ids must be unique", failures);

  for (const moduleId of moduleIds) {
    assert(courseCodeMap.some((item) => item.moduleId === moduleId), `courseCodeMap missing ${moduleId}`, failures);
  }

  for (const item of courseCodeMap) {
    assert(moduleIds.includes(item.moduleId), `courseCodeMap has unknown module ${item.moduleId}`, failures);
    assert(Boolean(item.focus) && item.focus.length >= 20, `${item.moduleId}: focus is too thin`, failures);
    assert(Array.isArray(item.codeFiles) && item.codeFiles.length >= 1, `${item.moduleId}: missing code files`, failures);
    assert(Array.isArray(item.testFiles) && item.testFiles.length >= 1, `${item.moduleId}: missing test files`, failures);
    assert(Array.isArray(item.exampleCommands) && item.exampleCommands.length >= 2, `${item.moduleId}: missing example commands`, failures);

    for (const file of [...item.codeFiles, ...item.testFiles]) {
      assert(fs.existsSync(path.join(repoRoot, file)), `${item.moduleId}: mapped file does not exist: ${file}`, failures);
    }

    for (const command of item.exampleCommands) {
      const match = command.match(/examples\/[A-Za-z0-9_]+\.py/);
      if (match) {
        assert(fs.existsSync(path.join(repoRoot, "python", match[0])), `${item.moduleId}: mapped example does not exist: ${match[0]}`, failures);
      }
    }
  }
}

const { allLessons, courseModules } = loadTypeScriptModule(courseFile);
const { courseCodeMap } = loadTypeScriptModule(courseCodeMapFile);
const failures = [];

assert(Array.isArray(allLessons), "allLessons export must be an array", failures);
assert(Array.isArray(courseModules), "courseModules export must be an array", failures);

if (Array.isArray(allLessons)) {
  assert(allLessons.length === 47, `expected 47 lessons, found ${allLessons.length}`, failures);
  assert(unique(allLessons.map((lesson) => lesson.slug)), "lesson slugs must be unique", failures);
  assert(unique(allLessons.map((lesson) => lesson.order)), "lesson orders must be unique", failures);
  assert(unique(allLessons.map((lesson) => lesson.id)), "lesson ids must be unique", failures);
  for (const lesson of allLessons) {
    validateLesson(lesson, failures);
  }
  validateCoverage(allLessons, failures);
}

if (Array.isArray(courseModules) && Array.isArray(allLessons)) {
  validateModules(courseModules, allLessons, failures);
  validateCourseCodeMap(courseCodeMap, courseModules, failures);
}

if (failures.length > 0) {
  console.error("Course content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Course content validation passed: ${allLessons.length} lessons, ${courseModules.length} modules.`);
