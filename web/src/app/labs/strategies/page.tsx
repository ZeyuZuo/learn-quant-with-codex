import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LessonChart } from "@/components/charts/LessonChart";
import { StrategyPlayground } from "@/components/labs/StrategyPlayground";
import { CostLagPlayground } from "@/components/labs/CostLagPlayground";

export default function StrategiesLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-3xl font-black text-ink">策略实验室</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            用相同图表比较 buy and hold、双均线、动量和均值回归，并观察成本和错误 shift 如何改变回测曲线。重点是理解策略假设和风险，而不是挑最好看的曲线。
          </p>
        </header>
        <section className="mt-8 grid gap-8">
          <StrategyPlayground />
          <CostLagPlayground />
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">双均线信号</h2>
            <LessonChart kind="moving-average" />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">策略对比</h2>
            <LessonChart kind="strategy-comparison" />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">多股票组合</h2>
            <LessonChart kind="portfolio" />
          </div>
        </section>
        <div className="mt-8 rounded-lg border border-line bg-white p-4 text-sm leading-7 text-muted">
          先完成
          <Link href="/courses/minimal-backtester" className="font-bold text-accent underline">
            最小可用回测器
          </Link>
          ，再进入策略实验。否则很容易把信号、仓位和收益路径混在一起。
        </div>
      </main>
    </>
  );
}
