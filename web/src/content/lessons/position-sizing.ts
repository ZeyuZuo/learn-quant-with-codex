import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "4.4",
  moduleId: "m4",
  order: 404,
  slug: "position-sizing",
  title: "仓位管理",
  subtitle: "信号回答买不买，仓位回答买多少。",
  pythonModule: "quant_learning.positions",
  objectives: ["理解 exposure 和 weight", "归一化权重", "区分满仓、空仓和部分仓位"],
  concepts: ["position sizing", "weight", "exposure", "cash"],
  intuition: "同一个买入信号，可以买 10%、50% 或 100%。仓位大小决定风险暴露，不能被信号函数偷偷决定。",
  formula: "portfolio_return_t = sum(weight_i * return_i)",
  handExample: "两只股票权重各 50%，当天分别 +2% 和 -1%，组合收益是 0.5*2% + 0.5*(-1%) = 0.5%。",
  pythonCode: `def normalize_weights(weights: pd.Series | pd.DataFrame):
    totals = weights.abs().sum(axis=1)
    return weights.div(totals.replace(0, pd.NA), axis=0).fillna(0.0)`,
  chart: "position",
  chartNote: "仓位图展示哪几天真正承担市场风险，以及暴露程度如何变化。",
  mistakes: ["信号正确就满仓", "权重总和超过 1 但不说明杠杆", "多资产权重没有归一化"],
  checkpoint: ["能区分信号和仓位大小", "能归一化权重", "知道仓位影响风险"],
  skillLine: "execution-assumptions",
  quizQuestion: "买入信号和仓位大小的关系是什么？",
  correctLabel: "信号不等于仓位大小",
  wrongLabels: ["买入信号必须满仓", "仓位不影响风险"],
  quizExplanation: "信号只是交易想法，仓位大小需要单独管理。",
  codexFunction: "normalize_weights",
  targetFile: "python/src/quant_learning/positions.py",
  testFile: "python/tests/test_positions.py",
});
