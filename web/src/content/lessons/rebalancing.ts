import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "7.3",
  moduleId: "m7",
  order: 703,
  slug: "rebalancing",
  title: "再平衡",
  subtitle: "资产涨跌会让权重漂移，再平衡会把组合拉回目标权重。",
  pythonModule: "quant_learning.positions",
  objectives: ["理解权重漂移", "理解日度和月度再平衡", "知道再平衡也会产生成本"],
  concepts: ["rebalance", "weight drift", "turnover", "target weight"],
  intuition: "如果一只股票涨很多，它在组合里的比例会变大。再平衡就是定期把权重调回计划值。",
  handExample: "等权组合开始 A/B 各 50%，A 大涨后可能变成 60/40，再平衡会卖出部分 A、买入部分 B。",
  pythonCode: `def normalize_weights(weights: pd.Series | pd.DataFrame):
    totals = weights.abs().sum(axis=1)
    return weights.div(totals.replace(0, pd.NA), axis=0).fillna(0.0)`,
  chart: "portfolio",
  chartNote: "组合图可以观察不同资产涨跌如何影响整体路径。",
  mistakes: ["以为等权永远自动保持等权", "忽略再平衡成本", "每天再平衡但不扣成本"],
  checkpoint: ["能解释权重漂移", "知道再平衡会产生成本", "能把再平衡写进报告假设"],
  skillLine: "data-review",
  quizQuestion: "再平衡通常会带来什么副作用？",
  correctLabel: "交易成本和换手",
  wrongLabels: ["保证收益更高", "消除所有风险"],
  quizExplanation: "再平衡需要交易，交易会带来成本。",
  codexFunction: "rebalance_weights",
  targetFile: "python/src/quant_learning/positions.py",
  testFile: "python/tests/test_positions.py",
});
