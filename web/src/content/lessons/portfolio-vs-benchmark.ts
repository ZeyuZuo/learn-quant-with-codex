import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "7.5",
  moduleId: "m7",
  order: 705,
  slug: "portfolio-vs-benchmark",
  title: "组合 vs SPY",
  subtitle: "组合策略必须和清晰基准比较，分散化也要看证据。",
  pythonModule: "quant_learning.portfolio",
  objectives: ["比较组合和 benchmark", "观察组合回撤", "判断分散化是否改善风险"],
  concepts: ["portfolio benchmark", "diversification", "SPY"],
  intuition: "买很多股票不自动等于分散化。如果它们高度同涨同跌，组合回撤可能仍然很大。",
  handExample: "如果组合年化收益 8% 低于 SPY 的 10%，但最大回撤是 -12% 而 SPY 是 -25%，它仍然有学习讨论价值。",
  pythonCode: `portfolio = equal_weight_portfolio(asset_returns)
benchmark = calculate_returns(spy_prices)
comparison = pd.DataFrame({"portfolio": portfolio, "SPY": benchmark}).dropna()`,
  chart: "portfolio",
  chartNote: "组合和 SPY 放在同一张图里，帮助观察收益和路径差异。",
  mistakes: ["组合只和现金比较", "股票数量多就宣称分散", "只看收益不看回撤"],
  checkpoint: ["能选择 benchmark", "能比较组合和 SPY", "知道分散化需要证据"],
  skillLine: "data-review",
  quizQuestion: "多股票组合一定更分散吗？",
  correctLabel: "不一定",
  wrongLabels: ["一定", "只要超过两只就一定"],
  quizExplanation: "如果资产高度相关，多股票组合也可能缺少真正分散化。",
  codexFunction: "组合 benchmark 报告",
  targetFile: "python/src/quant_learning/portfolio.py",
  testFile: "python/tests/test_portfolio.py",
});
