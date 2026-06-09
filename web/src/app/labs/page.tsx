import Link from "next/link";
import { ArrowRight, BarChart3, FlaskConical, LineChart, Radar, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";

const labs = [
  {
    href: "/labs/metrics",
    title: "指标实验室",
    icon: BarChart3,
    module: "Module 2-3",
    body: "观察价格、收益率、净值、回撤、波动率和夏普比率如何互相影响。",
    python: "python/src/quant_learning/metrics.py",
    lessons: [
      { href: "/courses/returns", label: "收益率" },
      { href: "/courses/compound-equity", label: "净值曲线" },
      { href: "/courses/max-drawdown", label: "最大回撤" },
    ],
  },
  {
    href: "/labs/strategies",
    title: "策略实验室",
    icon: LineChart,
    module: "Module 4-7",
    body: "比较 buy and hold、双均线、动量、均值回归和组合路径，并检查成本与 lag。",
    python: "python/src/quant_learning/strategies.py",
    lessons: [
      { href: "/courses/signal-position", label: "Signal" },
      { href: "/courses/position-lag", label: "Position" },
      { href: "/courses/moving-average-crossover", label: "双均线" },
      { href: "/courses/strategy-comparison", label: "策略对比" },
    ],
  },
  {
    href: "/labs/parameter-scan",
    title: "参数实验室",
    icon: SlidersHorizontal,
    module: "Module 8",
    body: "观察参数扫描、样本内 / 样本外迁移和过拟合风险。",
    python: "python/src/quant_learning/experiments.py",
    lessons: [
      { href: "/courses/parameter-scan", label: "参数扫描" },
      { href: "/courses/in-sample-out-of-sample", label: "样本外" },
      { href: "/courses/random-strategy-winners", label: "随机赢家" },
    ],
  },
];

const workflow = [
  {
    title: "先读课程",
    body: "每个实验都链接到相关课程。先看概念、手算和 Python 函数，再调节实验控件。",
    icon: Radar,
  },
  {
    title: "再动手观察",
    body: "实验控件用来改变样例数据或参数，让你观察指标、曲线和误区如何变化。",
    icon: FlaskConical,
  },
  {
    title: "最后回到代码",
    body: "实验页会指向对应 Python 模块，帮助你把图表观察转成函数、测试和报告。",
    icon: ShieldCheck,
  },
];

export default function LabsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <header className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-950">
              <FlaskConical className="h-4 w-4" />
              交互实验入口
            </div>
            <h1 className="mt-4 text-3xl font-black text-ink sm:text-4xl">实验室</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              实验室把课程中的抽象概念变成可观察的图表和控件。它不是交易模拟器，也不会给出投资建议；它的目标是帮助你看懂指标、策略、成本和参数验证。
            </p>
          </div>
          <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h2 className="text-base font-black">使用顺序</h2>
            <p className="mt-3 text-sm leading-7">
              每次进入实验前，先打开对应课程；实验后再运行 Python 示例脚本，把观察写进 Mini Project 或 Capstone。
            </p>
          </aside>
        </header>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          {workflow.map(({ title, body, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-black text-ink">
                <Icon className="h-4 w-4 text-accent" />
                {title}
              </div>
              <p className="mt-2 text-sm leading-7 text-muted">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {labs.map(({ href, title, icon: Icon, module, body, python, lessons }, index) => (
            <article
              key={href}
              className="chart-enter rounded-lg border border-line bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-teal-200"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-teal-50 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs font-bold text-muted">{module}</span>
              </div>
              <h2 className="mt-4 text-xl font-black text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{body}</p>
              <code className="mt-4 block rounded-md border border-line bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700">{python}</code>
              <div className="mt-4 flex flex-wrap gap-2">
                {lessons.map((lesson) => (
                  <Link key={lesson.href} href={lesson.href} className="rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-accent hover:text-accent">
                    {lesson.label}
                  </Link>
                ))}
              </div>
              <Link href={href} className="mt-5 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
                进入实验
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-lg border border-teal-200 bg-teal-50 p-5 text-teal-950">
          <h2 className="text-lg font-black">实验之后做什么</h2>
          <p className="mt-2 text-sm leading-7">
            把你观察到的误区写进课程笔记，然后运行对应 Python 示例脚本生成报告。实验结果只帮助理解历史样例，不代表未来收益。
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-md bg-teal-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800">
              查看项目实践
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/python-project" className="inline-flex items-center gap-2 rounded-md border border-teal-300 bg-white px-4 py-3 text-sm font-bold text-teal-950 transition hover:border-teal-500">
              查看 Python 项目
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
