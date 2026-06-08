"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartKind } from "@/lib/types";
import {
  costData,
  drawdownData,
  movingAverageData,
  parameterData,
  portfolioData,
  positionData,
  priceData,
  returnsData,
  strategyData,
} from "@/lib/chart-data";
import { MetricCard } from "@/components/lesson/MetricCard";

type LessonChartProps = {
  kind: ChartKind;
};

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="chart-enter h-80 w-full rounded-lg border border-line bg-white p-4 shadow-soft">{children}</div>;
}

export function LessonChart({ kind }: LessonChartProps) {
  if (kind === "learning-path") {
    const steps = ["数据", "收益", "风险", "仓位", "回测", "策略", "验证", "报告"];
    return (
      <div className="grid gap-3 rounded-lg border border-line bg-white p-4 shadow-soft sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="chart-enter rounded-lg border border-line bg-slate-50 p-4">
            <div className="text-xs font-bold text-accent">STEP {index + 1}</div>
            <div className="mt-2 text-lg font-bold text-ink">{step}</div>
            <p className="mt-1 text-xs leading-5 text-muted">完成一个可检查的学习产物</p>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "metrics") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="总收益" value="18.0%" note="只代表样例数据区间" />
        <MetricCard label="年化波动率" value="21.4%" note="收益率标准差年化" />
        <MetricCard label="最大回撤" value="-12.3%" note="从历史高点到低点" />
        <MetricCard label="夏普比率" value="0.84" note="风险调整后收益示例" />
      </div>
    );
  }

  if (kind === "ohlcv") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volume" yAxisId={0} fill="#cbd5e1" name="Volume" />
            <Line dataKey="open" stroke="#2563eb" strokeWidth={2} dot={false} name="Open" />
            <Line dataKey="high" stroke="#0f766e" strokeWidth={2} dot={false} name="High" />
            <Line dataKey="low" stroke="#be123c" strokeWidth={2} dot={false} name="Low" />
            <Line dataKey="close" stroke="#111827" strokeWidth={3} dot={false} name="Close" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "adjusted-close") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="close" stroke="#be123c" strokeWidth={2} name="Close" />
            <Line dataKey="adjClose" stroke="#0f766e" strokeWidth={3} name="Adjusted Close" />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "data-quality") {
    const bars = [
      { name: "缺失值", value: 2 },
      { name: "重复日期", value: 1 },
      { name: "非正价格", value: 1 },
      { name: "列缺失", value: 0 },
    ];
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bars}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" name="问题数量">
              {bars.map((entry) => (
                <Cell key={entry.name} fill={entry.value === 0 ? "#0f766e" : "#b45309"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "returns") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={returnsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" dataKey="price" stroke="#2563eb" strokeWidth={3} dot={false} name="Price" />
            <Bar yAxisId="right" dataKey="dailyReturn" fill="#0f766e" name="Daily Return" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "equity" || kind === "annualized") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={returnsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis domain={[0.95, 1.12]} />
            <Tooltip />
            <Area dataKey="equity" stroke="#0f766e" fill="#ccfbf1" strokeWidth={3} name="Equity" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "drawdown") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={drawdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" dataKey="equity" stroke="#2563eb" strokeWidth={3} dot={false} name="Equity" />
            <Area yAxisId="right" dataKey="drawdown" stroke="#be123c" fill="#ffe4e6" name="Drawdown" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "position") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={positionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="price" stroke="#2563eb" strokeWidth={3} dot={false} name="Price" />
            <Bar dataKey="signal" fill="#f59e0b" name="Signal" />
            <Area dataKey="position" stroke="#0f766e" fill="#ccfbf1" name="Position" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "costs" || kind === "backtest") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis domain={[0.95, 1.25]} />
            <Tooltip />
            <Legend />
            <Line dataKey="noCost" stroke="#2563eb" strokeWidth={3} dot={false} name="No Cost" />
            <Line dataKey="withCost" stroke="#0f766e" strokeWidth={3} dot={false} name="With Cost" />
            <Line dataKey="wrongShift" stroke="#be123c" strokeWidth={2} dot={false} name="Wrong Shift Demo" />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "moving-average") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={movingAverageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="price" stroke="#111827" strokeWidth={3} dot={false} name="Price" />
            <Line dataKey="fast" stroke="#2563eb" strokeWidth={2} dot={false} name="Fast MA" />
            <Line dataKey="slow" stroke="#b45309" strokeWidth={2} dot={false} name="Slow MA" />
            <Bar dataKey="signal" fill="#0f766e" name="Signal" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "strategy-comparison") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={strategyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis domain={[0.98, 1.12]} />
            <Tooltip />
            <Legend />
            <Line dataKey="buyHold" stroke="#111827" strokeWidth={3} dot={false} name="Buy & Hold" />
            <Line dataKey="ma" stroke="#2563eb" strokeWidth={2} dot={false} name="MA" />
            <Line dataKey="momentum" stroke="#0f766e" strokeWidth={2} dot={false} name="Momentum" />
            <Line dataKey="meanReversion" stroke="#b45309" strokeWidth={2} dot={false} name="Mean Reversion" />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "portfolio") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={portfolioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="aapl" stroke="#2563eb" strokeWidth={2} dot={false} name="AAPL" />
            <Line dataKey="msft" stroke="#0f766e" strokeWidth={2} dot={false} name="MSFT" />
            <Line dataKey="spy" stroke="#64748b" strokeWidth={2} dot={false} name="SPY" />
            <Line dataKey="equalWeight" stroke="#be123c" strokeWidth={3} dot={false} name="Equal Weight" />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  if (kind === "parameter-scan" || kind === "out-of-sample") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={parameterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={(item) => `${item.fast}/${item.slow}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sharpe" fill="#2563eb" name="Sharpe" />
            <Line dataKey="inSample" stroke="#0f766e" strokeWidth={2} name="In Sample Equity" />
            <Line dataKey="outSample" stroke="#be123c" strokeWidth={2} name="Out Sample Equity" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartFrame>
    );
  }

  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="close" stroke="#2563eb" strokeWidth={3} dot={false} name="Close" />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
