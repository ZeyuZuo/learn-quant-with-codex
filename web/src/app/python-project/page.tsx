import { SiteHeader } from "@/components/layout/SiteHeader";
import { courseModules } from "@/lib/courses";
import { courseCodeMap } from "@/lib/course-code-map";

export default function PythonProjectPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-black text-ink">Python 配套项目</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Python 项目和课程一一对应。课程讲到的收益率、最大回撤、signal、position、双均线和回测，都有对应模块和测试。
        </p>
        <section className="mt-8 rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">使用 uv</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
{`cd python
uv sync
uv run pytest
uv run python examples/run_buy_and_hold.py
uv run python examples/run_equal_weight_portfolio.py
uv run python examples/generate_capstone_template.py`}
          </pre>
        </section>
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
        <section className="mt-6 rounded-lg border border-line bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">课程到代码同步表</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            每个课程模块都有对应的 Python 文件、测试文件和建议运行命令。这个表用于确保课程内容和代码项目同步推进。
          </p>
          <div className="mt-4 grid gap-4">
            {courseCodeMap.map((item) => {
              const courseModule = courseModules.find((candidate) => candidate.id === item.moduleId);
              return (
                <article key={item.moduleId} className="rounded-lg border border-line bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-accent">{item.moduleId}</div>
                      <h3 className="mt-1 text-base font-black text-ink">{courseModule?.title ?? item.moduleId}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{item.focus}</p>
                    </div>
                    {courseModule?.lessons[0] ? (
                      <a href={`/courses/${courseModule.lessons[0].slug}`} className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
                        进入课程
                      </a>
                    ) : null}
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-muted">代码文件</div>
                      <div className="mt-2 grid gap-2">
                        {item.codeFiles.map((file) => (
                          <code key={file} className="rounded-md border border-line bg-white px-2 py-1 text-xs text-slate-700">
                            {file}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-muted">测试文件</div>
                      <div className="mt-2 grid gap-2">
                        {item.testFiles.map((file) => (
                          <code key={file} className="rounded-md border border-line bg-white px-2 py-1 text-xs text-slate-700">
                            {file}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wide text-muted">建议命令</div>
                      <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-3 text-xs leading-6 text-slate-100">
                        <code>{item.exampleCommands.join("\n")}</code>
                      </pre>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
