import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "6.4",
  moduleId: "m6",
  order: 604,
  slug: "strategy-parameters",
  title: "策略参数和函数接口",
  subtitle: "策略函数要清楚、可测、参数非法时要明确拒绝。",
  pythonModule: "quant_learning.strategies",
  objectives: ["设计策略函数签名", "校验参数合法性", "保证返回索引对齐"],
  concepts: ["function interface", "parameter validation", "aligned signal"],
  intuition: "好的策略函数像一个稳定零件。它只生成信号，不偷偷跑回测，也不隐藏成本假设。",
  handExample: "双均线函数如果 fast_window=20、slow_window=10，就应该抛出清晰错误，而不是生成一个含糊结果。",
  pythonCode: `def moving_average_crossover(prices: pd.Series, fast_window: int, slow_window: int) -> pd.Series:
    if fast_window <= 0 or slow_window <= 0:
        raise ValueError("window sizes must be positive")
    if fast_window >= slow_window:
        raise ValueError("fast_window must be smaller than slow_window")
    fast = prices.rolling(fast_window).mean()
    slow = prices.rolling(slow_window).mean()
    return (fast > slow).astype(float).fillna(0.0)`,
  chart: "moving-average",
  chartNote: "参数变化会影响信号图，但函数接口必须保持一致。",
  mistakes: ["策略函数里直接跑回测", "非法参数静默返回全 0", "返回索引和价格不一致"],
  checkpoint: ["能设计清晰函数签名", "能校验参数", "知道策略函数只输出 signal"],
  skillLine: "execution-assumptions",
  quizQuestion: "策略函数首要职责是什么？",
  correctLabel: "生成信号",
  wrongLabels: ["直接下单", "保证盈利"],
  quizExplanation: "课程项目中策略函数只生成学习型 signal，回测由 backtester 负责。",
  codexFunction: "策略参数校验",
  targetFile: "python/src/quant_learning/strategies.py",
  testFile: "python/tests/test_strategies.py",
});
