"use client";

import { useMemo, useState } from "react";
import { parameterData } from "@/lib/chart-data";
import { LessonChart } from "@/components/charts/LessonChart";

export function ParameterPlayground() {
  const [minimumSharpe, setMinimumSharpe] = useState(0.6);
  const [showOutSample, setShowOutSample] = useState(true);

  const filtered = useMemo(() => parameterData.filter((row) => row.sharpe >= minimumSharpe), [minimumSharpe]);
  const best = filtered.reduce<(typeof parameterData)[number] | null>((current, row) => {
    if (!current || row.sharpe > current.sharpe) {
      return row;
    }
    return current;
  }, null);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">参数扫描解释器</h2>
      <p className="mt-2 text-sm leading-7 text-muted">调整过滤条件，观察“历史最好参数”如何被筛选出来，以及为什么还要看样本外。</p>
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          最低样本内 Sharpe：{minimumSharpe.toFixed(2)}
          <input type="range" min="0.4" max="0.95" step="0.05" value={minimumSharpe} onChange={(event) => setMinimumSharpe(Number(event.target.value))} />
        </label>
        <label className="flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={showOutSample} onChange={(event) => setShowOutSample(event.target.checked)} />
          显示样本外提醒
        </label>
      </div>
      <div className="mt-4 rounded-md border border-line bg-slate-50 p-3 text-sm leading-7 text-slate-700">
        当前保留 {filtered.length} 组参数
        {best ? `，样本内 Sharpe 最高的是 fast=${best.fast}, slow=${best.slow}。` : "。没有参数满足过滤条件。"}
        {showOutSample && best ? ` 它的样本外净值示例是 ${best.outSample.toFixed(2)}，这才是后续要重点审查的部分。` : null}
      </div>
      <div className="mt-5">
        <LessonChart kind="parameter-scan" />
      </div>
    </section>
  );
}
