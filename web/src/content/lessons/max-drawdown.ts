import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "3.2",
  moduleId: "m3",
  order: 302,
  slug: "max-drawdown",
  title: "最大回撤",
  subtitle: "收益曲线从历史高点跌下来多少，往往比最终收益更刺眼。",
  duration: "16 分钟",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解 running max", "计算回撤序列", "找到最大回撤"],
  concepts: ["drawdown", "running max", "max drawdown"],
  intuition: "最大回撤描述从高点到低点的最坏下跌。它回答的是：如果你在最难受的位置持有，会经历多大的账面回落。",
  formula: "drawdown_t = equity_t / running_max_t - 1",
  handExample: "净值从 1.20 跌到 0.96，回撤是 0.96 / 1.20 - 1 = -20%。",
  pythonCode: `def drawdown_series(equity: pd.Series) -> pd.Series:
    running_max = equity.cummax()
    return equity / running_max - 1

def max_drawdown(equity: pd.Series) -> float:
    return float(drawdown_series(equity).min())`,
  chart: "drawdown",
  chartNote: "上图看净值，下图看回撤。回撤越向下，代表离历史高点越远。",
  mistakes: ["只看最终收益，不看中途下跌", "把单日亏损当成最大回撤", "忽略恢复到新高需要时间"],
  checkpoint: ["能计算回撤", "能读懂回撤曲线", "知道最大回撤不是单日亏损"],
  skillLine: "risk-reading",
  quizQuestion: "净值从历史高点 1.20 跌到 1.02，回撤约为多少？",
  correctLabel: "-15%",
  wrongLabels: ["-2%", "+15%"],
  quizExplanation: "1.02 / 1.20 - 1 = -0.15，也就是 -15%。",
  codexFunction: "drawdown_series 和 max_drawdown",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
