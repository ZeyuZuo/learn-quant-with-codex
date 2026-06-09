import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "2.5",
  moduleId: "m2",
  order: 205,
  slug: "returns-summary",
  title: "收益率小结",
  subtitle: "把价格、收益率和净值曲线连成一条完整数据链。",
  pythonModule: "quant_learning.metrics",
  objectives: ["串联价格、收益和净值", "生成收益摘要", "为风险指标做准备"],
  concepts: ["price path", "return path", "equity path"],
  intuition: "价格告诉你市场怎么走，收益率告诉你每一步变化，净值曲线告诉你这些变化累积成什么结果。",
  handExample: "同样最终涨到 110，一条平稳上涨路径和一条先跌 30% 再反弹的路径，体验完全不同。",
  pythonCode: `def calculate_returns(prices: pd.Series) -> pd.Series:
    returns = prices.astype(float).pct_change()
    return returns.dropna()

def compound_returns(returns: pd.Series) -> pd.Series:
    clean_returns = returns.dropna().astype(float)
    return (1 + clean_returns).cumprod()`,
  chart: "equity",
  chartNote: "这节课把价格、收益和净值作为一个整体观察。",
  mistakes: ["只保留最终收益", "不保存中间收益序列", "忽略路径差异"],
  checkpoint: ["能从价格到收益再到净值", "知道路径比终点更重要", "准备进入风险指标"],
  skillLine: "return-path",
  quizQuestion: "为什么净值曲线比单个总收益更有信息量？",
  correctLabel: "它显示收益路径",
  wrongLabels: ["它保证未来收益", "它不需要价格"],
  quizExplanation: "净值曲线展示过程中的上涨、回落和恢复。",
  codexFunction: "performance_summary 的收益部分",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
