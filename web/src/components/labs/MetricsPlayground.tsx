"use client";

import { useMemo, useState } from "react";
import { MetricCard } from "@/components/lesson/MetricCard";

export function MetricsPlayground() {
  const [days, setDays] = useState(60);
  const [dailyReturnBps, setDailyReturnBps] = useState(8);
  const [dailyVolBps, setDailyVolBps] = useState(120);

  const metrics = useMemo(() => {
    const dailyReturn = dailyReturnBps / 10_000;
    const dailyVol = dailyVolBps / 10_000;
    const equity = (1 + dailyReturn) ** days;
    const annualizedReturn = equity ** (252 / days) - 1;
    const annualizedVol = dailyVol * Math.sqrt(252);
    const sharpe = annualizedVol === 0 ? Number.NaN : annualizedReturn / annualizedVol;
    return {
      totalReturn: equity - 1,
      annualizedReturn,
      annualizedVol,
      sharpe,
    };
  }, [dailyReturnBps, dailyVolBps, days]);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">收益和风险调节器</h2>
      <p className="mt-2 text-sm leading-7 text-muted">拖动参数观察：同样的日收益，在不同样本长度和波动率下，指标解读会明显不同。</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          持有交易日：{days}
          <input type="range" min="20" max="252" step="1" value={days} onChange={(event) => setDays(Number(event.target.value))} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          平均日收益：{dailyReturnBps} bps
          <input type="range" min="-20" max="30" step="1" value={dailyReturnBps} onChange={(event) => setDailyReturnBps(Number(event.target.value))} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          日波动率：{dailyVolBps} bps
          <input type="range" min="20" max="300" step="10" value={dailyVolBps} onChange={(event) => setDailyVolBps(Number(event.target.value))} />
        </label>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="总收益" value={`${(metrics.totalReturn * 100).toFixed(1)}%`} note="样例参数累乘结果" />
        <MetricCard label="年化收益" value={`${(metrics.annualizedReturn * 100).toFixed(1)}%`} note="短样本年化可能放大" />
        <MetricCard label="年化波动" value={`${(metrics.annualizedVol * 100).toFixed(1)}%`} note="日波动率乘 sqrt(252)" />
        <MetricCard label="简化夏普" value={Number.isNaN(metrics.sharpe) ? "N/A" : metrics.sharpe.toFixed(2)} note="未加入无风险利率" />
      </div>
    </section>
  );
}
