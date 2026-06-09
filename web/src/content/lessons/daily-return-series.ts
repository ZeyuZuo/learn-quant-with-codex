import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "2.2",
  moduleId: "m2",
  order: 202,
  slug: "daily-return-series",
  title: "日收益率序列",
  subtitle: "收益率不是一个数，而是一条和日期对齐的路径。",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解首日 NaN", "保持收益率索引对齐", "知道收益序列服务净值和指标"],
  concepts: ["daily returns", "NaN", "index alignment", "pct_change"],
  intuition: "一条收益率序列像每天的成绩单。第一天没有上一天可比，所以不能凭空产生收益。",
  formula: "returns = prices.pct_change().dropna()",
  handExample: "价格为 100、102、101 时，收益率序列只有两个值：2% 和 -0.98%。",
  pythonCode: `def calculate_returns(prices: pd.Series) -> pd.Series:
    returns = prices.astype(float).pct_change()
    return returns.dropna()`,
  chart: "returns",
  chartNote: "柱状图展示每一天的收益率，有正有负，比单纯价格线更能显示短期波动。",
  mistakes: ["强行给第一天填 0 但不说明", "收益和价格索引错位", "把收益率序列当成交易记录"],
  checkpoint: ["能解释首日 NaN", "能保持索引对齐", "能从价格得到日收益序列"],
  skillLine: "return-path",
  quizQuestion: "为什么第一天通常没有收益率？",
  correctLabel: "没有上一日价格可比",
  wrongLabels: ["第一天一定亏损", "第一天成交量为零"],
  quizExplanation: "收益率需要两个价格点，第一天没有前一个价格。",
  codexFunction: "calculate_returns 首日处理",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
