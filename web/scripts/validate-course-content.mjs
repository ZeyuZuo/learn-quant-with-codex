import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const courseFile = path.join(root, "src", "lib", "courses.ts");
const courseCodeMapFile = path.join(root, "src", "lib", "course-code-map.ts");
const lessonCommandsFile = path.join(root, "src", "lib", "lesson-commands.ts");
const lessonLabsFile = path.join(root, "src", "lib", "lesson-labs.ts");
const glossaryFile = path.join(root, "src", "lib", "glossary.ts");
const labPageDir = path.join(root, "src", "app", "labs");
const lessonChartFile = path.join(root, "src", "components", "charts", "LessonChart.tsx");

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
  const lessonText = [
    lesson.title,
    lesson.subtitle,
    lesson.intuition,
    lesson.handExample,
    lesson.chartNote,
    ...(lesson.objectives ?? []),
    ...(lesson.mistakes ?? []),
    ...(lesson.checkpoint ?? []),
  ].join(" ");

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
  assert(Boolean(lesson.handExample) && /[\d%]/.test(lesson.handExample), `${prefix}: hand example should include a concrete number or percentage`, failures);
  assert(Boolean(lesson.pythonCode) && lesson.pythonCode.length >= 20, `${prefix}: missing Python code example`, failures);
  assert(Boolean(lesson.chart), `${prefix}: missing chart kind`, failures);
  assert(Boolean(lesson.chartNote) && lesson.chartNote.length >= 20, `${prefix}: missing chart note`, failures);
  assert(Array.isArray(lesson.mistakes) && lesson.mistakes.length >= 3, `${prefix}: needs at least 3 mistakes`, failures);
  assert(
    Array.isArray(lesson.mistakes) && lesson.mistakes.every((mistake) => mistake.length >= 5),
    `${prefix}: every mistake should be concrete enough for beginners`,
    failures,
  );
  assert(Array.isArray(lesson.checkpoint) && lesson.checkpoint.length >= 3, `${prefix}: needs at least 3 checkpoint items`, failures);
  assert(
    Array.isArray(lesson.checkpoint) && lesson.checkpoint.some((item) => /能|知道|解释|实现|生成|写|运行|交付/.test(item)),
    `${prefix}: checkpoint should include an observable learning action`,
    failures,
  );
  assert(
    /误区|错误|错|误导|风险|偏差|成本|限制|不代表|不构成|不能|忽略|忘记|只看|直接|保证|偷看|失效|静默|混为|随机打乱|过拟合|未来|look-ahead/i.test(lessonText),
    `${prefix}: lesson should explicitly connect the concept to a common trap or risk`,
    failures,
  );

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
  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("请先说明实现思路"), `${prefix}: Codex task should require implementation reasoning`, failures);
  assert(Boolean(lesson.codexTask) && lesson.codexTask.includes("误用"), `${prefix}: Codex task should require misuse reflection`, failures);
  assert(Boolean(lesson.codexTask) && /pytest|无需测试/.test(lesson.codexTask), `${prefix}: Codex task should name a test expectation`, failures);
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

function validateLessonCommandsSource(failures) {
  const source = fs.readFileSync(lessonCommandsFile, "utf-8");
  const testCommandMatches = [...source.matchAll(/tests\/test_[A-Za-z0-9_]+\.py/g)].map((match) => match[0]);
  const exampleCommandMatches = [...source.matchAll(/examples\/[A-Za-z0-9_]+\.py/g)].map((match) => match[0]);

  assert(testCommandMatches.length >= 9, "lesson command map should include focused pytest commands", failures);
  assert(exampleCommandMatches.length >= 5, "lesson command map should include example scripts for project lessons", failures);

  for (const file of testCommandMatches) {
    assert(fs.existsSync(path.join(repoRoot, "python", file)), `lesson command test file does not exist: ${file}`, failures);
  }

  for (const file of exampleCommandMatches) {
    assert(fs.existsSync(path.join(repoRoot, "python", file)), `lesson command example does not exist: ${file}`, failures);
  }
}

function validateGlossarySource(allLessons, failures) {
  const source = fs.readFileSync(glossaryFile, "utf-8");
  const groups = ["数据", "收益", "风险", "回测", "策略", "验证", "边界"];
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
  const relatedSlugs = [...source.matchAll(/relatedSlugs: \[([^\]]*)\]/g)]
    .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]));
  const lessonSlugs = new Set(allLessons.map((lesson) => lesson.slug));

  assert(ids.length >= 15, `glossary should contain at least 15 terms, found ${ids.length}`, failures);
  assert(source.includes("commonMistake"), "glossary terms should include beginner mistake guidance", failures);

  for (const group of groups) {
    assert(source.includes(`group: "${group}"`), `glossary missing group: ${group}`, failures);
  }

  for (const slug of relatedSlugs) {
    assert(lessonSlugs.has(slug), `glossary related lesson does not exist: ${slug}`, failures);
  }
}

function validateLessonLabsSource(allLessons, failures) {
  const source = fs.readFileSync(lessonLabsFile, "utf-8");
  const lessonSlugs = new Set(allLessons.map((lesson) => lesson.slug));
  const labHrefs = [...source.matchAll(/href: "(\/labs\/[^"]+)"/g)].map((match) => match[1]);
  const lessonMapSection = source.match(/const lessonLabMap:[\s\S]*?const moduleLabMap:/)?.[0] ?? "";
  const moduleMapSection = source.match(/const moduleLabMap:[\s\S]*?export function getRelatedLabs/)?.[0] ?? "";
  const mappedLessonSlugs = [...lessonMapSection.matchAll(/^\s*"([^"]+)": \[/gm)].map((match) => match[1]);
  const mappedModuleIds = [...moduleMapSection.matchAll(/^\s*(m\d+): \[/gm)].map((match) => match[1]);
  const labModules = ["m2", "m3", "m4", "m5", "m6", "m7", "m8"];
  const expectedLabs = ["/labs/metrics", "/labs/strategies", "/labs/parameter-scan"];

  for (const href of labHrefs) {
    assert(expectedLabs.includes(href), `lesson labs contains unknown href: ${href}`, failures);
  }

  assert(new Set(labHrefs).size >= expectedLabs.length, "lesson labs should reference every lab page", failures);

  for (const href of expectedLabs) {
    assert(labHrefs.includes(href), `lesson labs missing lab page: ${href}`, failures);
  }

  for (const slug of mappedLessonSlugs) {
    assert(lessonSlugs.has(slug), `lesson lab map references unknown lesson slug: ${slug}`, failures);
  }

  for (const moduleId of labModules) {
    assert(mappedModuleIds.includes(moduleId), `lesson lab module fallback missing ${moduleId}`, failures);
  }

  for (const lesson of allLessons.filter((item) => labModules.includes(item.moduleId))) {
    const hasSpecificMap = mappedLessonSlugs.includes(lesson.slug);
    const hasModuleFallback = mappedModuleIds.includes(lesson.moduleId);
    assert(hasSpecificMap || hasModuleFallback, `${lesson.id}: lesson should have a related lab mapping or module fallback`, failures);
  }

  assert(source.includes("reason"), "lesson labs should explain why each lab is related", failures);
  assert(source.includes("getRelatedLabs"), "lesson labs should export getRelatedLabs", failures);
}

function validateLabPages(failures) {
  const labPages = [
    path.join(labPageDir, "metrics", "page.tsx"),
    path.join(labPageDir, "strategies", "page.tsx"),
    path.join(labPageDir, "parameter-scan", "page.tsx"),
  ];

  for (const file of labPages) {
    const relativeFile = path.relative(repoRoot, file);
    const source = fs.readFileSync(file, "utf-8");
    assert(source.includes("<LabLearningCard"), `${relativeFile}: missing LabLearningCard`, failures);
    assert(source.includes("command={`cd python"), `${relativeFile}: lab card should include a runnable Python command`, failures);
    assert(source.includes("UV_CACHE_DIR=/tmp/uv-cache uv run python examples/"), `${relativeFile}: lab command should use a Python example script`, failures);
    assert(/reportPath="reports\/[^"]+"/.test(source), `${relativeFile}: lab card should name a report output path`, failures);
    assert((source.match(/href: "\/courses\//g) ?? []).length >= 3, `${relativeFile}: lab should link at least 3 related lessons`, failures);
    assert(source.includes("不") && /投资建议|未来|承诺|look-ahead|过拟合|误导/.test(source), `${relativeFile}: lab should include a learning boundary or misuse warning`, failures);
  }
}

function validateLessonChartGuides(failures) {
  const source = fs.readFileSync(lessonChartFile, "utf-8");
  const guideEntries = [...source.matchAll(/^\s*"?([a-z-]+)"?: \{\n\s*title: "([^"]+)",\n\s*question: "([^"]+)",\n\s*focus: "([^"]+)",\n\s*caution: "([^"]+)"/gm)];

  assert(source.includes("读图提醒"), "LessonChart should keep chart reading guidance visible", failures);
  assert(source.includes("guide.question"), "LessonChart should render a concrete observation question", failures);
  assert(guideEntries.length >= 20, `LessonChart should define guide entries for chart kinds, found ${guideEntries.length}`, failures);

  for (const [, kind, , question, focus, caution] of guideEntries) {
    assert(question.length >= 12, `${kind}: chart guide question is too thin`, failures);
    assert(focus.length >= 16, `${kind}: chart guide focus is too thin`, failures);
    assert(/不|不能|不要|风险|误读|误导|偏差|过拟合|成本|未来|承诺|look-ahead/.test(caution), `${kind}: chart guide caution should include a misuse warning`, failures);
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
  validateLessonCommandsSource(failures);
  validateLessonLabsSource(allLessons, failures);
  validateLabPages(failures);
  validateLessonChartGuides(failures);
  validateGlossarySource(allLessons, failures);
}

if (failures.length > 0) {
  console.error("Course content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Course content validation passed: ${allLessons.length} lessons, ${courseModules.length} modules.`);
