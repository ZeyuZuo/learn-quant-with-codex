import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LessonChart } from "@/components/charts/LessonChart";
import { MetricCard } from "@/components/lesson/MetricCard";
import { MetricsPlayground } from "@/components/labs/MetricsPlayground";

export default function MetricsLabPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-3xl font-black text-ink">指标实验室</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            用同一段样例数据观察价格、收益率、净值和回撤之间的关系。这里的数字只用于学习。
          </p>
        </header>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="样例总收益" value="10.0%" note="基于示例净值曲线" />
          <MetricCard label="最大回撤" value="-12.3%" note="从历史高点回落" />
          <MetricCard label="夏普比率" value="0.84" note="示例风险调整指标" />
          <MetricCard label="交易日近似" value="252" note="常见美股年化近似" />
        </section>
        <div className="mt-8">
          <MetricsPlayground />
        </div>
        <section className="mt-8 grid gap-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">价格和收益率</h2>
            <LessonChart kind="returns" />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-ink">净值和回撤</h2>
            <LessonChart kind="drawdown" />
          </div>
        </section>
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
          指标只能帮助你提问，不能证明未来收益。继续学习
          <Link href="/courses/max-drawdown" className="font-bold underline">
            最大回撤
          </Link>
          和
          <Link href="/courses/sharpe-ratio" className="font-bold underline">
            夏普比率
          </Link>
          课程。
        </div>
      </main>
    </>
  );
}
