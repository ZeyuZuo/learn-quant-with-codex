"use client";

import { AlertTriangle, Eye } from "lucide-react";
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

const chartGuides: Record<ChartKind, { title: string; focus: string; caution: string }> = {
  "learning-path": {
    title: "学习路径图",
    focus: "看每一步留下的学习产物，而不是把课程当成术语列表。",
    caution: "路径图不是进度证明，真正的完成标准是代码、测试和 Checkpoint。",
  },
  price: {
    title: "价格曲线",
    focus: "看价格路径如何随交易日变化，并注意日期并不等于连续日历日。",
    caution: "价格上涨不等于策略收益，后续还要转换成收益率和净值。",
  },
  ohlcv: {
    title: "OHLCV 关系图",
    focus: "同时比较 open、high、low、close 和 volume，读懂一行日线数据。",
    caution: "不要把 high 当成最终成交价，也不要跳过必要列检查。",
  },
  "adjusted-close": {
    title: "Close 与 Adjusted Close 对比",
    focus: "观察普通收盘价的断点和复权价格的连续性。",
    caution: "长期回测直接使用未复权 close，可能会把拆股或分红误读成暴跌。",
  },
  "data-quality": {
    title: "数据质量问题图",
    focus: "看哪些问题会进入回测前检查：缺失、重复、异常价格和列缺失。",
    caution: "发现问题后要记录原因，不要静默删除或填补。",
  },
  returns: {
    title: "价格与日收益率",
    focus: "看价格线和日收益柱如何对应，理解收益率是百分比变化。",
    caution: "第一天通常没有上一日价格可比，不要随意制造收益。",
  },
  equity: {
    title: "净值曲线",
    focus: "观察复利累乘后的路径，尤其是上涨、回落和恢复。",
    caution: "不要把每日收益简单相加，也不要只看最终净值。",
  },
  annualized: {
    title: "年化收益观察",
    focus: "看净值路径和样本长度如何影响年化数字。",
    caution: "短样本年化很容易被少数日期放大，不能当作未来承诺。",
  },
  volatility: {
    title: "波动率观察",
    focus: "看日收益率柱状图的分散程度，理解波动来自收益变化。",
    caution: "波动率不是最大亏损，也不能替代回撤分析。",
  },
  drawdown: {
    title: "净值与回撤",
    focus: "看净值从历史高点跌下来的幅度，找出最难持有的区间。",
    caution: "最大回撤不是单日亏损；只看最终收益会隐藏过程风险。",
  },
  metrics: {
    title: "指标卡片",
    focus: "把收益、波动、回撤和夏普放在一起看。",
    caution: "任何单一指标都可能误导，指标表只能总结历史样本。",
  },
  position: {
    title: "Signal 与 Position 对齐",
    focus: "看 signal 和 position 的时间差，理解为什么持仓通常滞后一日。",
    caution: "当天收盘信号当天成交会引入 look-ahead bias。",
  },
  costs: {
    title: "成本与错误 shift 对比",
    focus: "比较无成本、有成本和错误 shift 曲线的差异。",
    caution: "更漂亮的曲线可能来自忽略成本或偷看未来。",
  },
  backtest: {
    title: "回测净值对比",
    focus: "同时观察净值、成本影响和错误 shift 示例。",
    caution: "回测器必须保存过程数据，不能只返回一个最终收益。",
  },
  "moving-average": {
    title: "双均线信号图",
    focus: "观察快线、慢线和 signal 如何从价格派生。",
    caution: "均线参数不能只按历史最优挑选，signal 也不能直接当 position。",
  },
  "strategy-comparison": {
    title: "策略对比图",
    focus: "把 buy and hold、双均线、动量和均值回归放在同一规则下比较。",
    caution: "公平比较必须使用同一数据、成本、lag 和指标口径。",
  },
  portfolio: {
    title: "组合与基准路径",
    focus: "观察单资产、SPY 和等权组合的路径差异。",
    caution: "买很多股票不自动等于分散化，仍要看回撤和相关性。",
  },
  "parameter-scan": {
    title: "参数扫描图",
    focus: "观察不同参数的指标变化，以及样本内与样本外是否一致。",
    caution: "历史最优参数最容易过拟合，不能直接外推到未来。",
  },
  "out-of-sample": {
    title: "样本内 / 样本外图",
    focus: "比较调参区间和验证区间的表现是否迁移。",
    caution: "样本外仍然是历史验证，不是未来收益证明。",
  },
  bias: {
    title: "偏差诊断图",
    focus: "用对比曲线观察逻辑错误如何美化回测结果。",
    caution: "回测偏差常常不会报错，必须靠测试和清单主动审查。",
  },
};

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="chart-enter h-80 w-full rounded-lg border border-line bg-white p-4 shadow-soft">{children}</div>;
}

function ChartStudyFrame({ kind, children }: { kind: ChartKind; children: React.ReactNode }) {
  const guide = chartGuides[kind];

  return (
    <section className="chart-enter">
      <div className="mb-3 grid gap-3 md:grid-cols-[1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <Eye className="h-4 w-4 text-accent" />
            {guide.title}
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-700">{guide.focus}</p>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
          <span className="inline-flex items-center gap-1 font-black">
            <AlertTriangle className="h-4 w-4" />
            读图提醒
          </span>
          <span className="ml-1">{guide.caution}</span>
        </div>
      </div>
      {children}
    </section>
  );
}

function renderChartContent(kind: ChartKind) {
  if (kind === "learning-path") {
    const steps = ["数据", "收益", "风险", "仓位", "回测", "策略", "验证", "报告"];
    return (
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="chart-enter rounded-lg border border-line bg-white p-4 shadow-soft">
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

  if (kind === "volatility") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={returnsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <Tooltip formatter={(value) => (typeof value === "number" ? `${(value * 100).toFixed(2)}%` : value)} />
            <Bar dataKey="dailyReturn" name="Daily Return">
              {returnsData.map((entry) => (
                <Cell key={entry.date} fill={entry.dailyReturn >= 0 ? "#0f766e" : "#be123c"} />
              ))}
            </Bar>
          </BarChart>
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

  if (kind === "bias") {
    return (
      <ChartFrame>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis domain={[0.95, 1.25]} />
            <Tooltip />
            <Legend />
            <Line dataKey="withCost" stroke="#0f766e" strokeWidth={3} dot={false} name="Correct Lag" />
            <Line dataKey="wrongShift" stroke="#be123c" strokeWidth={3} dot={false} name="Wrong Shift" />
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

export function LessonChart({ kind }: LessonChartProps) {
  return (
    <ChartStudyFrame kind={kind}>
      {renderChartContent(kind)}
    </ChartStudyFrame>
  );
}
