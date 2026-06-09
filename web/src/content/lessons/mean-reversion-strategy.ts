import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "6.3",
  moduleId: "m6",
  order: 603,
  slug: "mean-reversion-strategy",
  title: "均值回归策略",
  subtitle: "价格短期偏离均值后，是否可能回到均值附近？",
  pythonModule: "quant_learning.strategies",
  objectives: ["理解 rolling mean 和 z-score", "实现阈值型信号", "认识均值回归风险"],
  concepts: ["mean reversion", "rolling mean", "z-score", "threshold"],
  intuition: "均值回归像判断价格是不是短期跑太远了。但市场可能不是跑远，而是基本面真的变了。",
  formula: "z_score = (price - rolling_mean) / rolling_std",
  handExample: "如果价格低于滚动均值 2 个标准差，学习策略可能生成买入信号。",
  pythonCode: `def mean_reversion_signal(prices: pd.Series, window: int, threshold: float) -> pd.Series:
    mean = prices.rolling(window).mean()
    std = prices.rolling(window).std()
    z_score = (prices - mean) / std
    return (z_score < -threshold).astype(float).fillna(0.0)`,
  chart: "strategy-comparison",
  chartNote: "均值回归曲线和趋势类策略放在一起，帮助比较不同假设。",
  mistakes: ["下跌就认为一定反弹", "忽略趋势市场中的连续亏损", "阈值只按历史最好选择"],
  checkpoint: ["能解释 z-score", "能实现均值回归 signal", "能说出失效场景"],
  skillLine: "execution-assumptions",
  quizQuestion: "均值回归策略最大的误区是什么？",
  correctLabel: "以为下跌一定反弹",
  wrongLabels: ["需要日期索引", "要计算收益率"],
  quizExplanation: "价格偏离均值可能继续偏离，不能把反弹当成必然。",
  codexFunction: "mean_reversion_signal",
  targetFile: "python/src/quant_learning/strategies.py",
  testFile: "python/tests/test_strategies.py",
});
