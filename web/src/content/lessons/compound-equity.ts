import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "2.3",
  moduleId: "m2",
  order: 203,
  slug: "compound-equity",
  title: "复利和净值曲线",
  subtitle: "策略表现不是把每日收益简单相加，而是沿路径累乘。",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解复利累乘", "从收益率生成净值曲线", "读懂 equity curve"],
  concepts: ["compound return", "equity curve", "cumprod"],
  intuition: "净值曲线从 1.00 开始，记录每一天你的学习型组合相对初始资金变成了多少。它显示路径，而不是只显示终点。",
  formula: "equity_t = product(1 + return_i)",
  handExample: "第一天 +10%，第二天 -10%，净值是 1.1 * 0.9 = 0.99，不是回到 1.00。",
  pythonCode: `def compound_returns(returns: pd.Series) -> pd.Series:
    clean_returns = returns.dropna().astype(float)
    return (1 + clean_returns).cumprod()`,
  chart: "equity",
  chartNote: "净值曲线让你看到策略经历了哪些上涨、回落和恢复。",
  mistakes: ["把每日收益直接相加当最终收益", "只看终点不看路径", "忘记负收益后的恢复需要更大涨幅"],
  checkpoint: ["能解释 equity curve", "知道复利不是简单相加", "能从收益率生成净值"],
  skillLine: "return-path",
  quizQuestion: "+10% 后再 -10%，最终净值是多少？",
  correctLabel: "0.99",
  wrongLabels: ["1.00", "1.10"],
  quizExplanation: "1.1 * 0.9 = 0.99，复利路径不是简单加减。",
  codexFunction: "compound_returns",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
