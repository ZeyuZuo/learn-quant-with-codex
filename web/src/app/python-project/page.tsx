import { SiteHeader } from "@/components/layout/SiteHeader";
import { PythonProjectExplorer } from "@/components/python/PythonProjectExplorer";
import { BookOpen, FileCode2, FileText, TestTube2 } from "lucide-react";

const projectWorkflow = [
  {
    title: "跟着课程写",
    body: "先读课程页，再复制 Codex Prompt，把概念落到 Python 函数。",
    icon: BookOpen,
  },
  {
    title: "用测试验收",
    body: "每个模块都有 pytest，避免公式、索引和回测逻辑悄悄跑偏。",
    icon: TestTube2,
  },
  {
    title: "反查代码",
    body: "从函数名回到课程模块，确认代码为什么存在、如何被误用。",
    icon: FileCode2,
  },
  {
    title: "生成报告",
    body: "示例脚本会把模块产物写入 reports/，逐步积累 Capstone 材料。",
    icon: FileText,
  },
];

export default function PythonProjectPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-black text-ink">Python 配套项目</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Python 项目和课程一一对应。课程讲到的收益率、最大回撤、signal、position、双均线和回测，都有对应模块和测试。
        </p>
        <section className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {projectWorkflow.map(({ title, body, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-black text-ink">
                <Icon className="h-4 w-4 text-accent" />
                {title}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </section>
        <section className="mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">使用 uv</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
{`cd python
uv sync
uv run pytest
uv run python examples/run_data_quality_report.py
uv run python examples/run_returns_summary.py
uv run python examples/run_metrics_summary.py
uv run python examples/run_position_cost_bias.py
uv run python examples/run_buy_and_hold.py
uv run python examples/run_equal_weight_portfolio.py
uv run python examples/generate_capstone_template.py`}
          </pre>
        </section>
        <PythonProjectExplorer />
        <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">模块映射</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            {[
              ["data.py", "读取 CSV、OHLCV 检查、复权列选择、质量报告"],
              ["metrics.py", "收益率、复利、年化收益、波动率、回撤、夏普、胜率、盈亏比"],
              ["positions.py", "signal 到 position 的滞后转换和权重处理"],
              ["costs.py", "换手、手续费和滑点简化模型"],
              ["strategies.py", "buy and hold、双均线、动量、均值回归"],
              ["portfolio.py", "多资产收益、等权组合、轮动信号、组合 benchmark 输入"],
              ["backtest.py", "最小可用向量化回测器和策略比较"],
              ["experiments.py", "参数扫描、样本内 / 样本外、随机策略"],
              ["reports.py", "JSON 和 Markdown 学习报告"],
            ].map(([file, desc]) => (
              <div key={file} className="grid gap-2 rounded-md border border-line bg-slate-50 p-3 sm:grid-cols-[180px_1fr]">
                <strong className="font-mono text-ink">{file}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
