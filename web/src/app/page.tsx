import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, ShieldCheck, SquareKanban, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { courseModules, allLessons } from "@/lib/courses";
import { LessonChart } from "@/components/charts/LessonChart";
import { ProgressSummary } from "@/components/progress/ProgressSummary";

export default function HomePage() {
  const firstLesson = allLessons[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-950">
                <ShieldCheck className="h-4 w-4" />
                教育用途，不构成投资建议
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl">
                用 Codex 学习美股量化交易基础
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                这不是一个交易信号网站，而是一套边学边建的课程。你会从 OHLCV 数据开始，逐步实现收益指标、回测器、策略实验、参数验证和最终研究报告。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/courses/${firstLesson.slug}`}
                  className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  开始第一课
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
                >
                  查看课程目录
                  <BookOpen className="h-4 w-4" />
                </Link>
                <Link
                  href="/capstone"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
                >
                  最终报告要求
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
                >
                  项目实践
                  <SquareKanban className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="min-w-0">
              <LessonChart kind="learning-path" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
            <ProgressSummary />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
                <Terminal className="h-5 w-5 text-accent" />
                <h2 className="mt-3 text-lg font-bold text-ink">课程和代码同步</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  每节课都绑定一个 Python 函数、一个测试方向、一个图表和一条可复制的 Codex 任务。
                </p>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
                <FlaskConical className="h-5 w-5 text-accent" />
                <h2 className="mt-3 text-lg font-bold text-ink">实验服务理解</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  图表用于解释收益、回撤、成本、策略对比和参数扫描，不为了展示复杂交易功能。
                </p>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <h2 className="mt-3 text-lg font-bold text-ink">先学验证再谈策略</h2>
                <p className="mt-2 text-sm leading-7 text-muted">
                  策略只是学习案例。课程会持续强调回测偏差、样本外验证和未来收益不确定性。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-ink">学习路径</h2>
              <p className="mt-2 text-sm text-muted">MVP 课程已覆盖主线闭环，后续模块按课程设计继续扩展。</p>
            </div>
            <Link href="/python-project" className="text-sm font-bold text-accent hover:underline">
              Python 项目说明
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {courseModules.map((module) => (
              <Link key={module.id} href="/courses" className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-soft">
                <div className="text-xs font-bold uppercase tracking-wide text-accent">{module.id}</div>
                <h3 className="mt-2 text-lg font-bold text-ink">{module.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{module.summary}</p>
                <p className="mt-3 text-sm font-semibold text-slate-700">模块产物：{module.product}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 p-5">
            <h3 className="text-lg font-bold text-teal-950">按项目推进学习</h3>
            <p className="mt-2 text-sm leading-7 text-teal-950">
              每个模块都有一个 Mini Project。完成这些项目后，你会自然得到最终 Capstone 报告需要的材料。
            </p>
            <Link href="/projects" className="mt-4 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
              查看项目实践
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
