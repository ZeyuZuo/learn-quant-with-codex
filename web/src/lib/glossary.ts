import { allLessons } from "./courses";

export type GlossaryTerm = {
  id: string;
  term: string;
  english: string;
  summary: string;
  whyItMatters: string;
  relatedSlugs: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "ohlcv",
    term: "OHLCV",
    english: "Open, High, Low, Close, Volume",
    summary: "一行日线数据的五个核心字段：开盘价、最高价、最低价、收盘价和成交量。",
    whyItMatters: "几乎所有入门回测都会从 OHLCV 数据开始，列缺失或含义误解会直接污染后续收益率和策略信号。",
    relatedSlugs: ["ohlcv", "data-quality"],
  },
  {
    id: "adjusted-close",
    term: "复权价格",
    english: "Adjusted Close",
    summary: "对拆股、分红等公司行为做过调整的历史价格。",
    whyItMatters: "长期回测如果直接使用普通 close，可能把拆股误读成暴跌。",
    relatedSlugs: ["close-vs-adjusted-close"],
  },
  {
    id: "return",
    term: "收益率",
    english: "Return",
    summary: "价格变化的百分比，常用 price_t / price_{t-1} - 1 计算。",
    whyItMatters: "收益率让不同价格水平的股票可以比较，也是净值、波动率和夏普比率的输入。",
    relatedSlugs: ["returns", "daily-return-series"],
  },
  {
    id: "equity-curve",
    term: "净值曲线",
    english: "Equity Curve",
    summary: "从 1.00 开始，把每日收益复利累乘后得到的路径。",
    whyItMatters: "净值曲线展示策略经历了怎样的上涨、回撤和恢复，比单个最终收益更有信息量。",
    relatedSlugs: ["compound-equity", "returns-summary"],
  },
  {
    id: "max-drawdown",
    term: "最大回撤",
    english: "Maximum Drawdown",
    summary: "净值从历史高点跌到后续低点的最大跌幅。",
    whyItMatters: "它描述持有过程中最难受的历史区间，是评价策略风险的重要指标。",
    relatedSlugs: ["max-drawdown"],
  },
  {
    id: "sharpe-ratio",
    term: "夏普比率",
    english: "Sharpe Ratio",
    summary: "用收益均值除以收益波动率，再做年化的风险调整指标。",
    whyItMatters: "它帮助比较承担相似波动时的收益效率，但不能替代回撤、成本和样本外验证。",
    relatedSlugs: ["sharpe-ratio", "read-metrics-table"],
  },
  {
    id: "signal-position",
    term: "Signal 和 Position",
    english: "Signal and Position",
    summary: "signal 是策略想法，position 是实际持仓。日线回测里 position 通常要滞后 signal。",
    whyItMatters: "混淆两者容易产生 look-ahead bias，让回测结果过度乐观。",
    relatedSlugs: ["signal-position", "wrong-backtest-demo"],
  },
  {
    id: "transaction-costs",
    term: "交易成本",
    english: "Transaction Costs",
    summary: "交易时产生的手续费、滑点和价差等成本，课程中用 bps 简化表示。",
    whyItMatters: "高换手策略如果忽略成本，回测可能显著高估收益。",
    relatedSlugs: ["transaction-costs"],
  },
  {
    id: "benchmark",
    term: "基准",
    english: "Benchmark",
    summary: "用于比较策略表现的简单参考，例如 buy and hold 或 SPY。",
    whyItMatters: "没有基准，就很难判断复杂策略是否比简单选择更有学习价值。",
    relatedSlugs: ["buy-and-hold", "portfolio-vs-benchmark"],
  },
  {
    id: "moving-average",
    term: "移动平均线",
    english: "Moving Average",
    summary: "对一段时间的价格求平均，用来平滑短期噪声。",
    whyItMatters: "双均线策略用快线和慢线的关系生成趋势跟随学习信号。",
    relatedSlugs: ["moving-average-crossover"],
  },
  {
    id: "momentum",
    term: "动量",
    english: "Momentum",
    summary: "用过去一段时间的收益衡量资产近期强弱。",
    whyItMatters: "动量策略假设强势可能延续，但必须接受样本外和过拟合检查。",
    relatedSlugs: ["momentum-strategy", "momentum-rotation"],
  },
  {
    id: "mean-reversion",
    term: "均值回归",
    english: "Mean Reversion",
    summary: "假设价格短期偏离均值后可能回到均值附近。",
    whyItMatters: "它是常见策略假设，但价格下跌不一定会反弹，风险边界必须写清楚。",
    relatedSlugs: ["mean-reversion-strategy"],
  },
  {
    id: "in-sample",
    term: "样本内 / 样本外",
    english: "In-Sample / Out-of-Sample",
    summary: "样本内用于调参或观察，样本外用于更严格地验证历史表现。",
    whyItMatters: "只在全样本上调参，会让策略更容易贴合历史噪声。",
    relatedSlugs: ["in-sample-out-of-sample", "best-parameter-transfer"],
  },
  {
    id: "overfitting",
    term: "过拟合",
    english: "Overfitting",
    summary: "策略或参数过度适配历史噪声，离开这段历史后表现可能失效。",
    whyItMatters: "参数扫描、反复试错和只展示最好结果都会增加过拟合风险。",
    relatedSlugs: ["random-strategy-winners", "parameter-scan"],
  },
  {
    id: "look-ahead-bias",
    term: "偷看未来偏差",
    english: "Look-Ahead Bias",
    summary: "回测使用了决策时点现实中还不知道的信息。",
    whyItMatters: "这是初学者最常见也最严重的回测错误之一，会让策略曲线虚假变好。",
    relatedSlugs: ["signal-position", "wrong-backtest-demo", "backtest-biases"],
  },
  {
    id: "paper-trading",
    term: "模拟交易",
    english: "Paper Trading",
    summary: "只记录信号或模拟交易流程，不使用真实资金下单。",
    whyItMatters: "模拟交易可以帮助检查流程，但不能代表真实执行、滑点、心理和资金风险。",
    relatedSlugs: ["paper-trading-vs-live"],
  },
];

export function findGlossaryTerm(concept: string) {
  const normalized = concept.trim().toLowerCase();
  return glossaryTerms.find((term) => {
    const aliases = [term.id, term.term, term.english].map((value) => value.toLowerCase());
    return aliases.includes(normalized) || aliases.some((value) => value.includes(normalized) || normalized.includes(value));
  });
}

export function getRelatedLessons(term: GlossaryTerm) {
  return term.relatedSlugs
    .map((slug) => allLessons.find((lesson) => lesson.slug === slug))
    .filter((lesson) => lesson !== undefined);
}
