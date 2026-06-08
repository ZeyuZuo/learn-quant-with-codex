"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRightLeft, ReceiptText } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { strategySimulatorData } from "@/lib/chart-data";
import { MetricCard } from "@/components/lesson/MetricCard";

type SimRow = {
  date: string;
  correct: number;
  wrongShift: number;
  position: number;
  wrongPosition: number;
  turnover: number;
};

function pct(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function CostLagPlayground() {
  const [commissionBps, setCommissionBps] = useState(2);
  const [slippageBps, setSlippageBps] = useState(4);
  const [showWrongShift, setShowWrongShift] = useState(true);

  const simulation = useMemo(() => {
    const totalCostRate = (commissionBps + slippageBps) / 10_000;
    let correctEquity = 1;
    let wrongEquity = 1;
    let previousPosition = 0;
    let previousWrongPosition = 0;

    const rows: SimRow[] = strategySimulatorData.map((row, index) => {
      const position = index === 0 ? 0 : strategySimulatorData[index - 1].signal;
      const wrongPosition = row.signal;
      const turnover = Math.abs(position - previousPosition);
      const wrongTurnover = Math.abs(wrongPosition - previousWrongPosition);
      const correctReturn = row.assetReturn * position - turnover * totalCostRate;
      const wrongReturn = row.assetReturn * wrongPosition - wrongTurnover * totalCostRate;

      correctEquity *= 1 + correctReturn;
      wrongEquity *= 1 + wrongReturn;
      previousPosition = position;
      previousWrongPosition = wrongPosition;

      return {
        date: row.date,
        correct: Number(correctEquity.toFixed(4)),
        wrongShift: Number(wrongEquity.toFixed(4)),
        position,
        wrongPosition,
        turnover,
      };
    });

    const totalTurnover = rows.reduce((sum, row) => sum + row.turnover, 0);
    return {
      rows,
      correctReturn: correctEquity - 1,
      wrongReturn: wrongEquity - 1,
      totalCostRate,
      totalTurnover,
    };
  }, [commissionBps, slippageBps]);

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">成本和滞后敏感性</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
            拖动手续费和滑点，观察同一组信号在正确滞后一日和错误当天成交下的差异。这个实验对应 Module 4 和 Module 5。
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-950">
          <AlertTriangle className="h-4 w-4" />
          错误 shift 只用于教学
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          手续费：{commissionBps} bps
          <input type="range" min="0" max="20" step="1" value={commissionBps} onChange={(event) => setCommissionBps(Number(event.target.value))} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          滑点：{slippageBps} bps
          <input type="range" min="0" max="30" step="1" value={slippageBps} onChange={(event) => setSlippageBps(Number(event.target.value))} />
        </label>
        <label className="flex items-center gap-2 rounded-md border border-line bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={showWrongShift} onChange={(event) => setShowWrongShift(event.target.checked)} />
          显示错误 shift
        </label>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <MetricCard label="正确滞后总收益" value={pct(simulation.correctReturn)} note="position_t = signal_{t-1}" />
        <MetricCard label="错误 shift 总收益" value={pct(simulation.wrongReturn)} note="当天信号当天成交" />
        <MetricCard label="合计成本假设" value={`${(simulation.totalCostRate * 10_000).toFixed(0)} bps`} note={`换手次数示例：${simulation.totalTurnover.toFixed(0)}`} />
      </div>

      <div className="mt-5 h-80 rounded-lg border border-line bg-slate-50 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={simulation.rows} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
            <YAxis domain={["dataMin - 0.01", "dataMax + 0.01"]} stroke="#64748b" fontSize={12} />
            <Tooltip formatter={(value: number) => value.toFixed(4)} />
            <Line type="monotone" dataKey="correct" name="正确滞后" stroke="#0f766e" strokeWidth={2.5} dot={{ r: 3 }} />
            {showWrongShift ? <Line type="monotone" dataKey="wrongShift" name="错误 shift" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3 }} /> : null}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-sm leading-7 text-teal-950">
          <div className="flex items-center gap-2 font-bold">
            <ArrowRightLeft className="h-4 w-4" />
            正确滞后
          </div>
          <p className="mt-1">用上一日信号决定今日仓位，更接近日线学习回测的保守假设。</p>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-7 text-amber-950">
          <div className="flex items-center gap-2 font-bold">
            <ReceiptText className="h-4 w-4" />
            成本假设
          </div>
          <p className="mt-1">每次仓位变化都会产生换手成本；高换手策略对 bps 很敏感。</p>
        </div>
      </div>
    </section>
  );
}
