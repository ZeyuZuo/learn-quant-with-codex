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
const lessonViewFile = path.join(root, "src", "components", "lesson", "LessonView.tsx");
const lessonReviewTemplateFile = path.join(root, "src", "components", "lesson", "LessonReviewTemplate.tsx");
const lessonCompletionPanelFile = path.join(root, "src", "components", "lesson", "LessonCompletionPanel.tsx");
const lessonEvidenceTrailFile = path.join(root, "src", "components", "lesson", "LessonEvidenceTrail.tsx");
const lessonModuleGateFile = path.join(root, "src", "components", "lesson", "LessonModuleGate.tsx");
const pythonProjectExplorerFile = path.join(root, "src", "components", "python", "PythonProjectExplorer.tsx");
const capstonePageFile = path.join(root, "src", "app", "capstone", "page.tsx");
const capstoneEvidenceMatrixFile = path.join(root, "src", "components", "capstone", "CapstoneEvidenceMatrix.tsx");
const labLearningCardFile = path.join(root, "src", "components", "labs", "LabLearningCard.tsx");
const courseCatalogFile = path.join(root, "src", "components", "courses", "CourseCatalog.tsx");
const quizCardFile = path.join(root, "src", "components", "quiz", "QuizCard.tsx");
const sourceRoot = path.join(root, "src");
const moduleCache = new Map();

function resolveTypeScriptModule(specifier, fromFile) {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) {
    throw new Error(`Unexpected external runtime import in course data: ${specifier}`);
  }

  const basePath = specifier.startsWith("@/")
    ? path.join(sourceRoot, specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    path.join(basePath, "index.ts"),
    path.join(basePath, "index.tsx"),
  ];

  const resolved = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!resolved) {
    throw new Error(`Unable to resolve runtime import ${specifier} from ${fromFile}`);
  }

  if (!resolved.startsWith(sourceRoot)) {
    throw new Error(`Runtime import resolved outside src: ${specifier}`);
  }

  return resolved;
}

function loadTypeScriptModule(filePath) {
  const normalizedFilePath = path.resolve(filePath);
  const cached = moduleCache.get(normalizedFilePath);
  if (cached) {
    return cached.exports;
  }

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
  moduleCache.set(normalizedFilePath, moduleObject);

  const sandbox = {
    exports: moduleObject.exports,
    module: moduleObject,
    require: (specifier) => {
      const resolvedPath = resolveTypeScriptModule(specifier, normalizedFilePath);
      return loadTypeScriptModule(resolvedPath);
    },
  };

  vm.runInNewContext(compiled, sandbox, { filename: normalizedFilePath });
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
  assert(Boolean(lesson.skillLine), `${prefix}: missing v4.4 skillLine`, failures);
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

  const targetFileMatch = lesson.codexTask?.match(/- 在 ([^\n]+) 中实现 /);
  const testFileMatch = lesson.codexTask?.match(/- 新增或更新 ([^\n]+)。/);
  if (targetFileMatch) {
    const targetFile = targetFileMatch[1].trim();
    assert(fs.existsSync(path.join(repoRoot, targetFile)), `${prefix}: Codex target file does not exist: ${targetFile}`, failures);
  } else {
    assert(false, `${prefix}: Codex task should expose a target file`, failures);
  }

  if (testFileMatch) {
    const testFile = testFileMatch[1].trim();
    if (testFile !== "无需测试") {
      assert(fs.existsSync(path.join(repoRoot, testFile)), `${prefix}: Codex test file does not exist: ${testFile}`, failures);
    }
  } else {
    assert(false, `${prefix}: Codex task should expose a test file or 无需测试`, failures);
  }
}

function validateModules(courseModules, allLessons, failures) {
  const moduleIds = courseModules.map((module) => module.id);
  const allowedSkillLines = new Set(["data-review", "return-path", "risk-reading", "execution-assumptions", "validation", "research-writing"]);
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
    assert(Boolean(module.gate?.entry) && module.gate.entry.length >= 12, `${module.id}: missing v4.4 entry gate`, failures);
    assert(Boolean(module.gate?.exit) && module.gate.exit.length >= 12, `${module.id}: missing v4.4 exit gate`, failures);
    assert(Boolean(module.gate?.nextUse) && module.gate.nextUse.length >= 12, `${module.id}: missing v4.4 next-use gate`, failures);
    assert(Array.isArray(module.skillLines) && module.skillLines.length >= 1, `${module.id}: missing v4.4 skill lines`, failures);
    for (const skillLine of module.skillLines ?? []) {
      assert(allowedSkillLines.has(skillLine), `${module.id}: unknown skill line ${skillLine}`, failures);
    }
  }

  for (const lesson of allLessons) {
    assert(moduleIds.includes(lesson.moduleId), `${lesson.id}: unknown moduleId ${lesson.moduleId}`, failures);
    assert(allowedSkillLines.has(lesson.skillLine), `${lesson.id}: unknown skillLine ${lesson.skillLine}`, failures);
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
  const requiredSkillLines = ["data-review", "return-path", "risk-reading", "execution-assumptions", "validation", "research-writing"];
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
  const termEntries = [...source.matchAll(/id: "([^"]+)"[\s\S]*?relatedSlugs: \[([^\]]*)\]/g)].map((match) => ({
    id: match[1],
    relatedSlugs: [...match[2].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]),
  }));
  const relatedSlugs = [...source.matchAll(/relatedSlugs: \[([^\]]*)\]/g)]
    .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]));
  const lessonSlugs = new Set(allLessons.map((lesson) => lesson.slug));
  const lessonBySlug = new Map(allLessons.map((lesson) => [lesson.slug, lesson]));
  const coveredSkillLines = new Set();

  assert(ids.length >= 15, `glossary should contain at least 15 terms, found ${ids.length}`, failures);
  assert(termEntries.length === ids.length, "glossary validator should be able to inspect every term's related lessons", failures);
  assert(source.includes("commonMistake"), "glossary terms should include beginner mistake guidance", failures);

  for (const group of groups) {
    assert(source.includes(`group: "${group}"`), `glossary missing group: ${group}`, failures);
  }

  for (const entry of termEntries) {
    assert(entry.relatedSlugs.length >= 1, `glossary term ${entry.id} should link at least one lesson`, failures);
    const relatedLessons = entry.relatedSlugs.map((slug) => lessonBySlug.get(slug)).filter((lesson) => lesson !== undefined);
    for (const lesson of relatedLessons) {
      coveredSkillLines.add(lesson.skillLine);
    }
    assert(relatedLessons.some((lesson) => Boolean(lesson.skillLine)), `glossary term ${entry.id} should connect to a skill-line lesson`, failures);
  }

  for (const slug of relatedSlugs) {
    assert(lessonSlugs.has(slug), `glossary related lesson does not exist: ${slug}`, failures);
  }

  for (const skillLine of requiredSkillLines) {
    assert(coveredSkillLines.has(skillLine), `glossary related lessons should cover skill line: ${skillLine}`, failures);
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
  const labCardSource = fs.readFileSync(labLearningCardFile, "utf-8");
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

  assert(labCardSource.includes("buildLabObservationTemplate"), "LabLearningCard should generate a reusable lab observation template", failures);
  assert(labCardSource.includes("不构成投资建议"), "LabLearningCard observation template should include the learning boundary", failures);
  assert(labCardSource.includes("Python 复现证据"), "LabLearningCard observation template should ask for Python reproduction evidence", failures);
  assert(labCardSource.includes("写入 Mini Project 或 Capstone"), "LabLearningCard should connect lab observations to projects and Capstone", failures);
  assert(labCardSource.includes("复制模板"), "LabLearningCard should let learners copy the observation template", failures);
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

function validateLessonReviewTemplate(failures) {
  const lessonViewSource = fs.readFileSync(lessonViewFile, "utf-8");
  const templateSource = fs.readFileSync(lessonReviewTemplateFile, "utf-8");
  const completionSource = fs.readFileSync(lessonCompletionPanelFile, "utf-8");
  const evidenceTrailSource = fs.readFileSync(lessonEvidenceTrailFile, "utf-8");

  assert(lessonViewSource.includes("<LessonReviewTemplate"), "lesson pages should render the review template before completion", failures);
  assert(lessonViewSource.includes("<LessonEvidenceTrail"), "lesson pages should render a compact evidence trail before objectives", failures);
  assert(templateSource.includes("buildReviewTemplate"), "LessonReviewTemplate should generate structured Markdown", failures);
  assert(templateSource.includes("不构成投资建议"), "LessonReviewTemplate should include the project boundary", failures);
  assert(templateSource.includes("代码和测试证据"), "LessonReviewTemplate should ask for code and test evidence", failures);
  assert(templateSource.includes("getLessonCommandInfo"), "LessonReviewTemplate should include concrete lesson validation commands", failures);
  assert(templateSource.includes("commandInfo.secondary"), "LessonReviewTemplate should include optional example commands when available", failures);
  assert(templateSource.includes("图表观察"), "LessonReviewTemplate should ask for chart observations", failures);
  assert(templateSource.includes("常见误区防线"), "LessonReviewTemplate should ask learners to name misuse risks", failures);
  assert(templateSource.includes("Capstone 关联"), "LessonReviewTemplate should connect lesson output to Capstone evidence", failures);
  assert(templateSource.includes('emitLessonActivity(lesson.slug, "checkpoint")'), "copying the review template should count as checkpoint activity", failures);
  assert(completionSource.includes("复制完成复盘"), "LessonCompletionPanel should let learners copy a completion review", failures);
  assert(completionSource.includes("evidence"), "LessonCompletionPanel should show evidence for each completion gate", failures);
  assert(completionSource.includes("完成度"), "LessonCompletionPanel should show completion progress before marking done", failures);
  assert(evidenceTrailSource.includes("Evidence Trail"), "LessonEvidenceTrail should label the lesson evidence trail", failures);
  assert(evidenceTrailSource.includes("复制证据模板"), "LessonEvidenceTrail should let learners copy evidence notes", failures);
  assert(evidenceTrailSource.includes("commandBlock"), "LessonEvidenceTrail should include concrete validation commands", failures);
  assert(evidenceTrailSource.includes("图表观察"), "LessonEvidenceTrail should ask learners to record chart observations", failures);
  assert(evidenceTrailSource.includes("误用防线"), "LessonEvidenceTrail should ask learners to name misuse risks", failures);
  assert(evidenceTrailSource.includes("不构成投资建议"), "LessonEvidenceTrail should preserve the learning boundary", failures);
}

function validateLessonModuleGate(failures) {
  const lessonViewSource = fs.readFileSync(lessonViewFile, "utf-8");
  const moduleGateSource = fs.readFileSync(lessonModuleGateFile, "utf-8");

  assert(lessonViewSource.includes("<LessonModuleGate"), "lesson pages should render module gate context", failures);
  assert(moduleGateSource.includes("courseModule.gate.entry"), "LessonModuleGate should render the module entry gate", failures);
  assert(moduleGateSource.includes("courseModule.gate.exit"), "LessonModuleGate should render the module exit gate", failures);
  assert(moduleGateSource.includes("courseModule.gate.nextUse"), "LessonModuleGate should render how the module is reused later", failures);
  assert(moduleGateSource.includes("courseModule.miniProject.deliverable"), "LessonModuleGate should connect lessons to the mini project deliverable", failures);
  assert(moduleGateSource.includes("courseModule.skillLines"), "LessonModuleGate should surface module skill lines", failures);
}

function validatePythonProjectExplorer(failures) {
  const source = fs.readFileSync(pythonProjectExplorerFile, "utf-8");

  assert(source.includes("模块学习门槛"), "PythonProjectExplorer should show module gate context", failures);
  assert(source.includes("active.courseModule.gate.entry"), "PythonProjectExplorer should show module entry gate", failures);
  assert(source.includes("active.courseModule.gate.exit"), "PythonProjectExplorer should show module exit gate", failures);
  assert(source.includes("active.courseModule.gate.nextUse"), "PythonProjectExplorer should show module next-use gate", failures);
  assert(source.includes("能力线和 Capstone 证据"), "PythonProjectExplorer should show skill-line Capstone evidence", failures);
  assert(source.includes("getSkillLine"), "PythonProjectExplorer should resolve skill-line metadata", failures);
  assert(source.includes("moduleReviewTemplate"), "PythonProjectExplorer should build a copyable module review template", failures);
  assert(source.includes("复制模块复盘"), "PythonProjectExplorer should let learners copy a module review", failures);
  assert(source.includes("教育用途，不构成投资建议"), "PythonProjectExplorer module review should preserve the learning boundary", failures);
  assert(source.includes("历史回测结果不代表未来收益"), "PythonProjectExplorer module review should warn against future-return claims", failures);
  assert(source.includes("检查 signal、position、returns 和 equity curve 是否索引对齐"), "PythonProjectExplorer module review should include alignment evidence", failures);
}

function validateCapstoneEvidenceMatrix(failures) {
  const capstonePageSource = fs.readFileSync(capstonePageFile, "utf-8");
  const matrixSource = fs.readFileSync(capstoneEvidenceMatrixFile, "utf-8");

  assert(capstonePageSource.includes("<CapstoneEvidenceMatrix"), "Capstone page should render the mini-project evidence matrix", failures);
  assert(matrixSource.includes("miniProjects.map"), "CapstoneEvidenceMatrix should be driven by miniProjects", failures);
  assert(matrixSource.includes("project.deliverablePath"), "CapstoneEvidenceMatrix should show project deliverable paths", failures);
  assert(matrixSource.includes("project.capstoneMaterial"), "CapstoneEvidenceMatrix should show how each project enters the final report", failures);
  assert(matrixSource.includes("project.commands"), "CapstoneEvidenceMatrix should show a reproducible command for each project", failures);
}

function validateCourseCatalogExperience(failures) {
  const source = fs.readFileSync(courseCatalogFile, "utf-8");

  assert(source.includes("继续本模块"), "CourseCatalog should expose the next unfinished lesson inside each module", failures);
  assert(source.includes("复习本模块"), "CourseCatalog should keep a module review path after completion", failures);
  assert(source.includes("module.gate.entry"), "CourseCatalog should show module entry gates", failures);
  assert(source.includes("module.gate.exit"), "CourseCatalog should show module exit gates", failures);
  assert(source.includes("module.gate.nextUse"), "CourseCatalog should show module next-use gates", failures);
}

function validateQuizReviewExperience(failures) {
  const source = fs.readFileSync(quizCardFile, "utf-8");

  assert(source.includes("Quiz 复盘"), "QuizCard should provide a review section after answering", failures);
  assert(source.includes("reviewTemplate"), "QuizCard should build a reusable review template", failures);
  assert(source.includes("我的选择"), "QuizCard review template should include the learner's selected answer", failures);
  assert(source.includes("正确选项"), "QuizCard review template should include the correct answer", failures);
  assert(source.includes("quiz.explanation"), "QuizCard review template should include the explanation", failures);
  assert(source.includes("复制复盘"), "QuizCard should let learners copy the quiz review", failures);
}

const { allLessons, courseModules } = loadTypeScriptModule(courseFile);
const { courseCodeMap } = loadTypeScriptModule(courseCodeMapFile);
const failures = [];

assert(Array.isArray(allLessons), "allLessons export must be an array", failures);
assert(Array.isArray(courseModules), "courseModules export must be an array", failures);

if (Array.isArray(allLessons)) {
  assert(allLessons.length === 48, `expected 48 lessons, found ${allLessons.length}`, failures);
  assert(unique(allLessons.map((lesson) => lesson.slug)), "lesson slugs must be unique", failures);
  assert(unique(allLessons.map((lesson) => lesson.order)), "lesson orders must be unique", failures);
  assert(unique(allLessons.map((lesson) => lesson.id)), "lesson ids must be unique", failures);
  assert(allLessons.some((lesson) => lesson.slug === "signal-position" && lesson.id === "4.1"), "Module 4 should keep Signal as the first execution lesson", failures);
  assert(allLessons.some((lesson) => lesson.slug === "position-lag" && lesson.id === "4.2"), "Module 4 should split Position/lag into its own lesson", failures);
  assert(allLessons.some((lesson) => lesson.slug === "wrong-backtest-demo" && lesson.id === "4.5"), "Module 4 should keep a dedicated look-ahead diagnostic lesson", failures);
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
  validateLessonReviewTemplate(failures);
  validateLessonModuleGate(failures);
  validatePythonProjectExplorer(failures);
  validateCapstoneEvidenceMatrix(failures);
  validateCourseCatalogExperience(failures);
  validateQuizReviewExperience(failures);
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
