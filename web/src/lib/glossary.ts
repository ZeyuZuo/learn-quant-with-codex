import { allLessons } from "./courses";

export type GlossaryTerm = {
  id: string;
  term: string;
  english: string;
  group: "数据" | "收益" | "风险" | "回测" | "策略" | "验证" | "边界";
  summary: string;
  whyItMatters: string;
  commonMistake: string;
  relatedSlugs: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "ohlcv",
    term: "OHLCV",
    english: "Open, High, Low, Close, Volume",
    group: "数据",
    summary: "一行日线数据的五个核心字段：开盘价、最高价、最低价、收盘价和成交量。",
    whyItMatters: "几乎所有入门回测都会从 OHLCV 数据开始，列缺失或含义误解会直接污染后续收益率和策略信号。",
    commonMistake: "把 high、close 和真实成交价混为一谈，或者不检查列是否齐全就开始回测。",
    relatedSlugs: ["ohlcv", "data-quality"],
  },
  {
    id: "adjusted-close",
    term: "复权价格",
    english: "Adjusted Close",
    group: "数据",
    summary: "对拆股、分红等公司行为做过调整的历史价格。",
    whyItMatters: "长期回测如果直接使用普通 close，可能把拆股误读成暴跌。",
    commonMistake: "看到历史价格大幅变化就直接当成市场涨跌，而没有先确认是否发生拆股或分红调整。",
    relatedSlugs: ["close-vs-adjusted-close"],
  },
  {
    id: "return",
    term: "收益率",
    english: "Return",
    group: "收益",
    summary: "价格变化的百分比，常用 price_t / price_{t-1} - 1 计算。",
    whyItMatters: "收益率让不同价格水平的股票可以比较，也是净值、波动率和夏普比率的输入。",
    commonMistake: "用上涨了多少美元比较两只股票，而不是比较百分比收益。",
    relatedSlugs: ["returns", "daily-return-series"],
  },
  {
    id: "equity-curve",
    term: "净值曲线",
    english: "Equity Curve",
    group: "收益",
    summary: "从 1.00 开始，把每日收益复利累乘后得到的路径。",
    whyItMatters: "净值曲线展示策略经历了怎样的上涨、回撤和恢复，比单个最终收益更有信息量。",
    commonMistake: "只看最终净值，不看中间是否经历过很深的回撤。",
    relatedSlugs: ["compound-equity", "returns-summary"],
  },
  {
    id: "max-drawdown",
    term: "最大回撤",
    english: "Maximum Drawdown",
    group: "风险",
    summary: "净值从历史高点跌到后续低点的最大跌幅。",
    whyItMatters: "它描述持有过程中最难受的历史区间，是评价策略风险的重要指标。",
    commonMistake: "把最终收益高当成策略好，却忽略过程中可能跌到难以承受。",
    relatedSlugs: ["max-drawdown"],
  },
  {
    id: "sharpe-ratio",
    term: "夏普比率",
    english: "Sharpe Ratio",
    group: "风险",
    summary: "用收益均值除以收益波动率，再做年化的风险调整指标。",
    whyItMatters: "它帮助比较承担相似波动时的收益效率，但不能替代回撤、成本和样本外验证。",
    commonMistake: "只按夏普比率排序策略，而不检查回撤、样本长度和成本假设。",
    relatedSlugs: ["sharpe-ratio", "read-metrics-table"],
  },
  {
    id: "signal-position",
    term: "Signal 和 Position",
    english: "Signal and Position",
    group: "回测",
    summary: "signal 是策略想法，position 是实际持仓。日线回测里 position 通常要滞后 signal。",
    whyItMatters: "混淆两者容易产生 look-ahead bias，让回测结果过度乐观。",
    commonMistake: "用当天收盘价生成 signal，又假设当天已经按这个收盘价建仓。",
    relatedSlugs: ["signal-position", "wrong-backtest-demo"],
  },
  {
    id: "transaction-costs",
    term: "交易成本",
    english: "Transaction Costs",
    group: "回测",
    summary: "交易时产生的手续费、滑点和价差等成本，课程中用 bps 简化表示。",
    whyItMatters: "高换手策略如果忽略成本，回测可能显著高估收益。",
    commonMistake: "只在最终报告里提一句成本，却没有把成本真正扣进策略收益。",
    relatedSlugs: ["transaction-costs"],
  },
  {
    id: "benchmark",
    term: "基准",
    english: "Benchmark",
    group: "回测",
    summary: "用于比较策略表现的简单参考，例如 buy and hold 或 SPY。",
    whyItMatters: "没有基准，就很难判断复杂策略是否比简单选择更有学习价值。",
    commonMistake: "只展示策略自己的曲线，不和 buy and hold 或 SPY 做同区间比较。",
    relatedSlugs: ["buy-and-hold", "portfolio-vs-benchmark"],
  },
  {
    id: "moving-average",
    term: "移动平均线",
    english: "Moving Average",
    group: "策略",
    summary: "对一段时间的价格求平均，用来平滑短期噪声。",
    whyItMatters: "双均线策略用快线和慢线的关系生成趋势跟随学习信号。",
    commonMistake: "把某组均线参数在历史上表现好，误认为未来也会稳定有效。",
    relatedSlugs: ["moving-average-crossover"],
  },
  {
    id: "momentum",
    term: "动量",
    english: "Momentum",
    group: "策略",
    summary: "用过去一段时间的收益衡量资产近期强弱。",
    whyItMatters: "动量策略假设强势可能延续，但必须接受样本外和过拟合检查。",
    commonMistake: "看到过去上涨就追入，却没有说明趋势失效或反转时会怎样。",
    relatedSlugs: ["momentum-strategy", "momentum-rotation"],
  },
  {
    id: "mean-reversion",
    term: "均值回归",
    english: "Mean Reversion",
    group: "策略",
    summary: "假设价格短期偏离均值后可能回到均值附近。",
    whyItMatters: "它是常见策略假设，但价格下跌不一定会反弹，风险边界必须写清楚。",
    commonMistake: "把下跌简单理解成便宜，忽略趋势继续下跌和基本面变化。",
    relatedSlugs: ["mean-reversion-strategy"],
  },
  {
    id: "in-sample",
    term: "样本内 / 样本外",
    english: "In-Sample / Out-of-Sample",
    group: "验证",
    summary: "样本内用于调参或观察，样本外用于更严格地验证历史表现。",
    whyItMatters: "只在全样本上调参，会让策略更容易贴合历史噪声。",
    commonMistake: "先用全部数据找最优参数，再把同一段历史说成验证结果。",
    relatedSlugs: ["in-sample-out-of-sample", "best-parameter-transfer"],
  },
  {
    id: "overfitting",
    term: "过拟合",
    english: "Overfitting",
    group: "验证",
    summary: "策略或参数过度适配历史噪声，离开这段历史后表现可能失效。",
    whyItMatters: "参数扫描、反复试错和只展示最好结果都会增加过拟合风险。",
    commonMistake: "从几十组参数里挑最好的一组，却不展示其余参数和样本外结果。",
    relatedSlugs: ["random-strategy-winners", "parameter-scan"],
  },
  {
    id: "look-ahead-bias",
    term: "偷看未来偏差",
    english: "Look-Ahead Bias",
    group: "验证",
    summary: "回测使用了决策时点现实中还不知道的信息。",
    whyItMatters: "这是初学者最常见也最严重的回测错误之一，会让策略曲线虚假变好。",
    commonMistake: "代码能跑通就以为逻辑正确，没有逐行检查信号和仓位的时间对齐。",
    relatedSlugs: ["signal-position", "wrong-backtest-demo", "backtest-biases"],
  },
  {
    id: "paper-trading",
    term: "模拟交易",
    english: "Paper Trading",
    group: "边界",
    summary: "只记录信号或模拟交易流程，不使用真实资金下单。",
    whyItMatters: "模拟交易可以帮助检查流程，但不能代表真实执行、滑点、心理和资金风险。",
    commonMistake: "把模拟交易结果当成实盘能力证明，忽略真实成交和心理压力。",
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
