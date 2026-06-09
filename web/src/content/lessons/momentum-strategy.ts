import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "6.2",
  moduleId: "m6",
  order: 602,
  slug: "momentum-strategy",
  title: "动量策略",
  subtitle: "过去一段时间上涨，是否可能继续强势？这是动量的学习假设。",
  pythonModule: "quant_learning.strategies",
  objectives: ["理解 lookback", "计算过去收益作为动量分数", "实现单资产动量信号"],
  concepts: ["momentum", "lookback", "ranking", "trend continuation"],
  intuition: "动量策略假设强者可能继续强一段时间。但这只是市场假设，不是自然规律。你要把它当成一个可测试的学习想法，而不是看到过去上涨就默认未来继续上涨。",
  formula: "momentum_t = price_t / price_{t-lookback} - 1",
  handExample: "如果 20 天前价格 100，今天 110，20 日动量是 10%。",
  pythonCode: `def momentum_signal(prices: pd.Series, lookback: int) -> pd.Series:
    momentum = prices.astype(float).pct_change(lookback)
    return (momentum > 0).astype(float).fillna(0.0)`,
  chart: "strategy-comparison",
  chartNote: "策略对比图展示动量和其他学习策略的净值路径差异。",
  mistakes: ["认为上涨一定会继续", "lookback 越长越好", "忘记样本外验证"],
  checkpoint: ["能解释动量假设", "能实现动量 signal", "知道动量会失效"],
  skillLine: "execution-assumptions",
  quizQuestion: "动量策略的核心假设是什么？",
  correctLabel: "过去强势可能延续",
  wrongLabels: ["下跌一定反弹", "交易成本为零"],
  quizExplanation: "动量研究的是趋势延续假设，但它不保证未来。",
  codexFunction: "momentum_signal",
  targetFile: "python/src/quant_learning/strategies.py",
  testFile: "python/tests/test_strategies.py",
});
