"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ClipboardList, DoorOpen, FileCode2, FileText, Flag, Repeat, Target, Terminal } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/prompt/CopyButton";
import { courseModules, getSkillLine } from "@/lib/courses";
import { courseCodeMap } from "@/lib/course-code-map";
import { miniProjects } from "@/lib/projects";

function commandText(commands: string[]) {
  return commands.join("\n");
}

export function PythonProjectExplorer() {
  const [activeModuleId, setActiveModuleId] = useState(courseCodeMap[0]?.moduleId ?? "m0");
  const active = useMemo(() => {
    const codeMap = courseCodeMap.find((item) => item.moduleId === activeModuleId) ?? courseCodeMap[0];
    const courseModule = courseModules.find((item) => item.id === codeMap.moduleId);
    const project = miniProjects.find((item) => item.moduleId === codeMap.moduleId);
    return { codeMap, courseModule, project };
  }, [activeModuleId]);

  if (!active.codeMap) {
    return null;
  }

  const firstLesson = active.courseModule?.lessons[0];
  const commands = commandText(active.codeMap.exampleCommands);
  const skillLines = active.courseModule?.skillLines.map((skillLineId) => getSkillLine(skillLineId)).filter((skillLine) => skillLine !== undefined) ?? [];
  const moduleReviewTemplate = [
    `# ${active.codeMap.moduleId} ${active.courseModule?.title ?? "Python 模块"} 复盘证据`,
    "",
    `模块目标：${active.codeMap.focus}`,
    `Mini Project：${active.project?.title ?? "本模块学习产物"}`,
    "",
    "## 课程证据",
    ...(active.courseModule?.lessons.map((lesson) => `- ${lesson.id} ${lesson.title}: /courses/${lesson.slug}`) ?? []),
    "",
    "## 代码文件",
    ...active.codeMap.codeFiles.map((file) => `- ${file}`),
    "",
    "## 测试文件",
    ...active.codeMap.testFiles.map((file) => `- ${file}`),
    "",
    "## 运行命令",
    "```bash",
    commands,
    "```",
    "",
    "## 报告产物",
    `- ${active.project?.deliverablePath ?? "本模块以测试或学习笔记作为产物。"}`,
    "",
    "## Capstone 材料",
    `- ${active.project?.capstoneMaterial ?? "记录学习边界和代码验收结果。"}`,
    "",
    "## 风险和误用提醒",
    "- 教育用途，不构成投资建议。",
    "- 历史回测结果不代表未来收益。",
    "- 检查 signal、position、returns 和 equity curve 是否索引对齐。",
    "",
  ].join("\n");
  const gateItems = active.courseModule
    ? [
        {
          icon: DoorOpen,
          label: "进入前",
          body: active.courseModule.gate.entry,
        },
        {
          icon: Target,
          label: "完成后",
          body: active.courseModule.gate.exit,
        },
        {
          icon: Repeat,
          label: "下一步复用",
          body: active.courseModule.gate.nextUse,
        },
      ]
    : [];

  return (
    <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-ink">课程到 Python 项目的同步流水线</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
            选择一个模块，查看它对应的课程、代码文件、测试文件、示例命令和报告产物。这个区块用于确认课程内容和 Python 项目同步推进。
          </p>
        </div>
        <div className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-black text-teal-950">
          {courseCodeMap.length} 个模块
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[260px_1fr]">
        <nav className="grid gap-2 lg:content-start">
          {courseCodeMap.map((item) => {
            const courseModule = courseModules.find((candidate) => candidate.id === item.moduleId);
            const activeItem = item.moduleId === activeModuleId;
            return (
              <button
                key={item.moduleId}
                type="button"
                onClick={() => setActiveModuleId(item.moduleId)}
                className={`rounded-lg border px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                  activeItem ? "border-teal-300 bg-teal-50 text-teal-950 shadow-soft" : "border-line bg-slate-50 text-slate-700 hover:border-accent"
                }`}
              >
                <span className="text-xs font-black uppercase tracking-wide">{item.moduleId}</span>
                <span className="mt-1 block text-sm font-black">{courseModule?.title ?? item.moduleId}</span>
              </button>
            );
          })}
        </nav>

        <article className="chart-enter rounded-lg border border-line bg-slate-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wide text-accent">{active.codeMap.moduleId}</div>
              <h3 className="mt-1 text-2xl font-black text-ink">{active.courseModule?.title ?? active.codeMap.moduleId}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{active.codeMap.focus}</p>
            </div>
            {firstLesson ? (
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-muted">
                  {active.courseModule?.lessons.length ?? 0} 节课
                </span>
                <CopyButton value={moduleReviewTemplate} label="复制模块复盘" className="px-3 py-2 text-sm" />
                <Link href={`/courses/${firstLesson.slug}`} className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
                  进入课程
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>

          {active.courseModule ? (
            <section className="mt-5 rounded-lg border border-line bg-white p-4">
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <Target className="h-4 w-4 text-accent" />
                模块学习门槛
              </h4>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {gateItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-md border border-line bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs font-black text-ink">
                        <Icon className="h-3.5 w-3.5 text-accent" />
                        {item.label}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-600">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {skillLines.length > 0 ? (
            <section className="mt-3 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
              <h4 className="flex items-center gap-2 text-sm font-black text-indigo-950">
                <Flag className="h-4 w-4" />
                能力线和 Capstone 证据
              </h4>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {skillLines.map((skillLine) => (
                  <div key={skillLine.id} className="rounded-md border border-indigo-100 bg-white px-3 py-2">
                    <div className="text-xs font-black text-indigo-950">{skillLine.title}</div>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{skillLine.capstoneEvidence}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-3 rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-950">
            <h4 className="flex items-center gap-2 text-sm font-black">
              <ClipboardList className="h-4 w-4" />
              模块复盘模板
            </h4>
            <p className="mt-2 text-sm leading-7">
              复制模板后，把实际命令输出、报告路径和本模块最容易误用的地方补进去。它可以直接进入 Mini Project 记录或 Capstone 草稿。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton value={moduleReviewTemplate} label="复制复盘模板" className="px-2.5 py-1.5 text-xs" />
              {active.project ? (
                <Link href={`/projects#${active.project.moduleId}`} className="inline-flex items-center gap-2 rounded-md border border-teal-300 bg-white px-2.5 py-1.5 text-xs font-bold transition hover:border-teal-500">
                  查看 Mini Project
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </section>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <section className="rounded-lg border border-line bg-white p-4">
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <FileCode2 className="h-4 w-4 text-accent" />
                代码文件
              </h4>
              <div className="mt-3 grid gap-2">
                {active.codeMap.codeFiles.map((file) => (
                  <code key={file} className="rounded-md border border-line bg-slate-50 px-2 py-2 text-xs leading-5 text-slate-700">
                    {file}
                  </code>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-line bg-white p-4">
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                测试文件
              </h4>
              <div className="mt-3 grid gap-2">
                {active.codeMap.testFiles.map((file) => (
                  <code key={file} className="rounded-md border border-line bg-slate-50 px-2 py-2 text-xs leading-5 text-slate-700">
                    {file}
                  </code>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr]">
            <section className="rounded-lg border border-line bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                  <Terminal className="h-4 w-4 text-accent" />
                  建议命令
                </h4>
                <CopyButton value={commands} label="复制" className="px-2 py-1 text-xs" />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-md bg-slate-950 p-3 text-xs leading-6 text-slate-100">
                <code>{commands}</code>
              </pre>
            </section>

            <section className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-950">
              <h4 className="flex items-center gap-2 text-sm font-black">
                <FileText className="h-4 w-4" />
                报告产物
              </h4>
              <p className="mt-3 text-sm leading-7">{active.project?.deliverablePath ?? "本模块以测试或学习笔记作为产物。"}</p>
              <div className="mt-3 text-xs font-black uppercase tracking-wide">进入 Capstone</div>
              <p className="mt-1 text-sm leading-7">{active.project?.capstoneMaterial ?? "记录学习边界和代码验收结果。"}</p>
            </section>
          </div>

          {active.project ? (
            <section className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
              <h4 className="flex items-center gap-2 text-sm font-black">
                <ClipboardList className="h-4 w-4" />
                模块验收项
              </h4>
              <div className="mt-3 grid gap-2">
                {active.project.checks.map((check) => (
                  <div key={check} className="flex gap-2 text-sm leading-6">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
              <Link href={`/projects#${active.project.moduleId}`} className="mt-4 inline-flex items-center gap-2 rounded-md bg-amber-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-amber-900">
                查看项目实践
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          ) : null}

          {active.courseModule ? (
            <section className="mt-3 rounded-lg border border-line bg-white p-4">
              <h4 className="flex items-center gap-2 text-sm font-black text-ink">
                <BookOpen className="h-4 w-4 text-accent" />
                相关课程
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.courseModule.lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/courses/${lesson.slug}`}
                    className="rounded-md border border-line bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent"
                  >
                    {lesson.id} {lesson.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>
    </section>
  );
}
