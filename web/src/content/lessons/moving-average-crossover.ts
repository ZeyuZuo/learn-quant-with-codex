import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "6.1",
  moduleId: "m6",
  order: 601,
  slug: "moving-average-crossover",
  title: "双均线策略",
  subtitle: "第一种趋势跟随学习案例：快线在慢线上方时持仓。",
  duration: "18 分钟",
  pythonModule: "quant_learning.strategies",
  objectives: ["理解 moving average", "实现 fast/slow crossover signal", "知道参数越调越好可能是过拟合"],
  concepts: ["moving average", "fast window", "slow window", "crossover", "trend following"],
  intuition: "移动平均线会把价格噪声平滑掉。快线更敏感，慢线更稳定。快线高于慢线时，策略把它理解为趋势向上学习信号。",
  formula: "signal_t = 1 if MA_fast_t > MA_slow_t else 0",
  handExample: "如果 5 日均线是 108，20 日均线是 104，双均线信号为 1；如果快线低于慢线，信号为 0。",
  pythonCode: `def moving_average_crossover(prices: pd.Series, fast_window: int, slow_window: int) -> pd.Series:
    if fast_window <= 0 or slow_window <= 0:
        raise ValueError("window sizes must be positive")
    if fast_window >= slow_window:
        raise ValueError("fast_window must be smaller than slow_window")
    fast = prices.rolling(fast_window).mean()
    slow = prices.rolling(slow_window).mean()
    return (fast > slow).astype(float).fillna(0.0)`,
  chart: "moving-average",
  chartNote: "图中价格、快线、慢线和 signal 一起出现，帮助理解信号如何从价格派生。",
  mistakes: ["fast_window 大于 slow_window", "调参直到历史最好就停止", "忘记 signal 到 position 需要滞后"],
  checkpoint: ["能解释快慢均线", "能实现双均线 signal", "知道历史最优参数不代表未来有效"],
  skillLine: "execution-assumptions",
  quizQuestion: "双均线策略里 fast_window 应该通常如何比较 slow_window？",
  correctLabel: "更短",
  wrongLabels: ["更长", "必须相等"],
  quizExplanation: "快线窗口更短，才能更快反映价格变化。",
  codexFunction: "moving_average_crossover",
  targetFile: "python/src/quant_learning/strategies.py",
  testFile: "python/tests/test_strategies.py",
});
