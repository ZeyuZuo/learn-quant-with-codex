import Link from "next/link";
import { CheckCircle2, FileText, Route, ShieldCheck, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LessonChart } from "@/components/charts/LessonChart";
import { CapstoneChecklist } from "@/components/capstone/CapstoneChecklist";
import { skillLines } from "@/lib/courses";

const sections = [
  "项目边界和非投资建议声明",
  "数据范围、复权列选择和数据质量报告",
  "策略假设、signal 生成方式和 position 滞后规则",
  "交易成本、滑点和仓位管理假设",
  "buy and hold 或 SPY benchmark 对比",
  "净值曲线、回撤曲线和完整指标表",
  "参数扫描、样本内 / 样本外验证",
  "至少 5 条局限、偏差或风险",
  "Python 测试命令和通过结果",
];

const commands = `cd python
uv run python examples/generate_capstone_template.py
uv run python examples/run_capstone_check.py`;

const templateOutline = [
  "摘要",
  "数据",
  "策略",
  "回测",
  "基准",
  "成本",
  "参数",
  "样本外",
  "风险",
  "风险清单示例",
  "测试",
];

const evidence = [
  "数据质量：OHLCV、复权列和日期范围",
  "信号仓位：signal、position 和默认滞后一日",
  "成本假设：commission、slippage、turnover",
  "基准比较：buy and hold、SPY 或 benchmark",
  "验证证据：参数扫描和样本外结果",
  "复现记录：pytest 命令和通过结果",
];

export default function CapstonePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-950">
              <FileText className="h-4 w-4" />
              最终学习产物
            </div>
            <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl">Capstone：完整量化策略研究报告</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              选择一个学习策略，用本地样例数据完成从数据检查、策略实现、回测、参数验证到风险声明的完整报告。目标是可复查，不是证明策略未来赚钱。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/courses/capstone-research-report" className="rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
                进入 Capstone 课程
              </Link>
              <Link href="/python-project" className="rounded-md border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
                查看 Python 项目
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <ShieldCheck className="h-5 w-5" />
              报告边界
            </div>
            <p className="mt-3 text-sm leading-7 text-amber-950">
              报告必须明确说明：教育用途，不构成投资建议；历史回测结果不代表未来收益；策略只是学习案例。
            </p>
          </div>
        </header>

        <section className="mt-10">
          <CapstoneChecklist />
        </section>

        <section className="mt-10 rounded-lg border border-indigo-200 bg-indigo-50 p-5 text-indigo-950">
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            <h2 className="text-xl font-bold">v4.4 六条能力线验收</h2>
          </div>
          <p className="mt-2 text-sm leading-7">
            最终报告不是把指标贴在一起，而是证明你完成了课程主线训练的六类能力。每一类都应该在报告里留下可复查证据。
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skillLines.map((skillLine) => (
              <article key={skillLine.id} className="rounded-md border border-indigo-200 bg-white p-3">
                <div className="text-sm font-black">{skillLine.title}</div>
                <p className="mt-2 text-sm leading-6">{skillLine.capstoneEvidence}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">报告必须包含</h2>
            <div className="mt-4 grid gap-3">
              {sections.map((section) => (
                <div key={section} className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{section}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">报告应展示的核心图</h2>
            <LessonChart kind="strategy-comparison" />
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
              <Terminal className="h-5 w-5 text-accent" />
              生成报告模板
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Python 项目提供模板生成和模板校验脚本。生成的文件位于根目录 `reports/final_research_report.md`。
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
              <code>{commands}</code>
            </pre>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">模板结构</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {templateOutline.map((item) => (
                <div key={item} className="rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-teal-200 bg-teal-50 p-5 text-teal-950">
          <h2 className="text-xl font-bold">Python 校验会检查的证据</h2>
          <p className="mt-2 text-sm leading-7">
            `validate_capstone_report` 不只检查章节名，还会检查报告里是否真的出现关键证据。写报告时至少覆盖下面这些词和事实。
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {evidence.map((item) => (
              <div key={item} className="rounded-md border border-teal-200 bg-white px-3 py-2 text-sm font-semibold leading-6">
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
