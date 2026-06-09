import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "7.4",
  moduleId: "m7",
  order: 704,
  slug: "momentum-rotation",
  title: "多资产动量轮动",
  subtitle: "在多只股票中选择近期更强的资产，但排名也可能只是噪声。",
  pythonModule: "quant_learning.portfolio",
  objectives: ["理解横截面排名", "实现 top-n 选择", "识别排名策略风险"],
  concepts: ["ranking", "top-n", "rotation", "cash fallback"],
  intuition: "轮动策略像每段时间重新排队，选择近期表现靠前的资产。但排队靠前不代表下一段还靠前。",
  handExample: "如果 AAPL 20 日收益 8%、MSFT 3%、SPY 2%，top-1 动量轮动会选择 AAPL。",
  pythonCode: `def momentum_rotation_signal(prices: pd.DataFrame, lookback: int, top_n: int = 1) -> pd.DataFrame:
    momentum = prices.astype(float).pct_change(lookback)
    ranks = momentum.rank(axis=1, ascending=False, method="first")
    return (ranks <= top_n).astype(float).fillna(0.0)`,
  chart: "portfolio",
  chartNote: "多资产净值图让你比较单资产、等权和轮动的路径。",
  mistakes: ["排名第一就认为最安全", "频繁轮动但忽略成本", "没有和 SPY benchmark 比较"],
  checkpoint: ["能解释 top-n", "能实现轮动信号", "知道排名策略可能过拟合"],
  skillLine: "data-review",
  quizQuestion: "动量轮动策略选择资产的依据是什么？",
  correctLabel: "过去一段时间的排名",
  wrongLabels: ["公司名字排序", "未来已知收益"],
  quizExplanation: "轮动策略根据历史 lookback 表现排名，但未来未知。",
  codexFunction: "momentum_rotation_signal",
  targetFile: "python/src/quant_learning/portfolio.py",
  testFile: "python/tests/test_portfolio.py",
});
