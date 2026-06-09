import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "2.1",
  moduleId: "m2",
  order: 201,
  slug: "returns",
  title: "收益率：价格变化的百分比",
  subtitle: "10 美元上涨不总是同一件事，百分比才方便比较。",
  difficulty: "入门",
  duration: "14 分钟",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解价格变化和收益率的区别", "计算日收益率序列", "处理第一天没有收益的问题"],
  concepts: ["return", "pct_change", "daily return", "索引对齐"],
  intuition: "100 涨到 110 和 1000 涨到 1010 都涨了 10 美元，但前者是 10%，后者只有 1%。收益率让不同价格水平可以比较。",
  formula: "return_t = price_t / price_{t-1} - 1",
  handExample: "价格从 100 到 102，收益率是 2%；从 102 到 101，收益率是 -0.98%。",
  pythonCode: `def calculate_returns(prices: pd.Series) -> pd.Series:
    returns = prices.astype(float).pct_change()
    return returns.dropna()`,
  chart: "returns",
  chartNote: "同一张图同时展示价格曲线和日收益率柱状图，强调价格和收益不是同一种信息。",
  mistakes: ["用绝对涨跌代替收益率", "忘记第一天没有上一日价格", "把 NaN 当成 0 之前不说明原因"],
  checkpoint: ["能手算简单收益率", "能解释第一天为什么没有收益", "能用 pandas 计算收益序列"],
  skillLine: "return-path",
  quizQuestion: "股票 A 从 10 涨到 11，股票 B 从 100 涨到 101，谁的收益率更高？",
  correctLabel: "股票 A",
  wrongLabels: ["股票 B", "一样高"],
  quizExplanation: "A 上涨 10%，B 上涨 1%。绝对涨幅相同，收益率不同。",
  codexFunction: "calculate_returns",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
