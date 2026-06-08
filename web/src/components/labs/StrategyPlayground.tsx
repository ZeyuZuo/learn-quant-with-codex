"use client";

import { useMemo, useState } from "react";
import { LessonChart } from "@/components/charts/LessonChart";

const strategyNotes = {
  ma: {
    title: "双均线",
    note: "趋势跟随学习案例。重点检查 fast_window < slow_window，并确认 signal 到 position 滞后一日。",
    chart: "moving-average" as const,
  },
  compare: {
    title: "策略对比",
    note: "同一数据、同一成本、同一回测器下比较策略，避免不公平对比。",
    chart: "strategy-comparison" as const,
  },
  portfolio: {
    title: "多股票组合",
    note: "组合收益来自资产收益和权重。股票数量多不自动等于真正分散化。",
    chart: "portfolio" as const,
  },
};

export function StrategyPlayground() {
  const [mode, setMode] = useState<keyof typeof strategyNotes>("ma");
  const selected = useMemo(() => strategyNotes[mode], [mode]);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">策略观察器</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">切换不同观察模式，重点看信号假设、净值路径和风险边界。</p>
        </div>
        <div className="flex rounded-md border border-line bg-slate-50 p-1">
          {Object.entries(strategyNotes).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key as keyof typeof strategyNotes)}
              className={`rounded px-3 py-2 text-sm font-semibold transition ${
                mode === key ? "bg-white text-accent shadow-sm" : "text-slate-600 hover:text-ink"
              }`}
            >
              {value.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-7 text-amber-950">{selected.note}</div>
      <div className="mt-5">
        <LessonChart kind={selected.chart} />
      </div>
    </section>
  );
}
