import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "5.1",
  moduleId: "m5",
  order: 501,
  slug: "buy-and-hold",
  title: "Buy and Hold 基准策略",
  subtitle: "先有基准，才知道一个策略是否值得继续研究。",
  duration: "14 分钟",
  pythonModule: "quant_learning.strategies",
  objectives: ["理解 benchmark", "实现 buy and hold signal", "用它作为策略比较起点"],
  concepts: ["benchmark", "buy and hold", "baseline"],
  intuition: "如果一个复杂策略连简单买入并持有都比不过，那它至少需要解释为什么还值得研究，比如回撤更小或成本更低。",
  handExample: "从第二个交易日起一直持仓为 1，就能得到最简单的持有型收益路径。",
  pythonCode: `def buy_and_hold_signal(prices: pd.Series) -> pd.Series:
    signal = pd.Series(1.0, index=prices.index)
    if not signal.empty:
        signal.iloc[0] = 0.0
    return signal`,
  chart: "backtest",
  chartNote: "基准图展示 buy and hold 的净值和回撤，后续策略都要和它比较。",
  mistakes: ["没有基准就评价策略", "只和现金比较", "忽略基准的风险指标"],
  checkpoint: ["能解释 benchmark", "能实现 buy and hold signal", "知道策略比较不能脱离基准"],
  skillLine: "return-path",
  quizQuestion: "为什么需要 benchmark？",
  correctLabel: "提供比较基准",
  wrongLabels: ["保证策略赚钱", "替代数据质量检查"],
  quizExplanation: "benchmark 帮助判断策略表现是否相对简单选择有意义。",
  codexFunction: "buy_and_hold_signal",
  targetFile: "python/src/quant_learning/strategies.py",
  testFile: "python/tests/test_strategies.py",
});
