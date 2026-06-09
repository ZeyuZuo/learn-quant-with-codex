import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "7.1",
  moduleId: "m7",
  order: 701,
  slug: "multi-asset-alignment",
  title: "多股票数据对齐",
  subtitle: "多资产组合的第一步不是策略，而是把日期和列对齐。",
  pythonModule: "quant_learning.data",
  objectives: ["理解多资产日期交集", "处理缺失资产价格", "避免随意填补数据"],
  concepts: ["multi asset", "alignment", "missing data", "date intersection"],
  intuition: "多股票数据像几本日记。你要比较同一天的记录，不能把 A 股票周一的数据和 B 股票周二的数据混在一起。",
  handExample: "如果 AAPL 有 1 月 2 日价格，MSFT 没有这一日价格，组合收益要明确如何处理这个缺口。",
  pythonCode: `def align_price_data(prices: pd.DataFrame) -> pd.DataFrame:
    return prices.sort_index().dropna(how="any")`,
  chart: "portfolio",
  chartNote: "多资产净值图只有在日期对齐后才有可比意义。",
  mistakes: ["随意前向填充所有缺失价格", "不同资产日期错位", "不记录删除了哪些日期"],
  checkpoint: ["能解释多资产对齐", "知道缺失值处理有风险", "能准备组合收益输入"],
  skillLine: "data-review",
  quizQuestion: "多股票组合前为什么要对齐日期？",
  correctLabel: "确保同一天收益可比较",
  wrongLabels: ["让图表颜色相同", "保证没有亏损"],
  quizExplanation: "组合收益需要同一日期上的资产收益和权重。",
  codexFunction: "align_price_data",
  targetFile: "python/src/quant_learning/data.py",
  testFile: "python/tests/test_data.py",
});
