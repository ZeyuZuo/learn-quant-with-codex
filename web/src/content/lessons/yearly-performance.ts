import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "8.5",
  moduleId: "m8",
  order: 805,
  slug: "yearly-performance",
  title: "分年度表现",
  subtitle: "同一策略在不同市场环境中的表现可能完全不同。",
  pythonModule: "quant_learning.experiments",
  objectives: ["按年份分组收益", "观察 regime change", "识别稳定性问题"],
  concepts: ["yearly performance", "regime change", "stability"],
  intuition: "一个策略可能在趋势市场很好，在震荡市场很差。按年份拆开看，能避免平均数掩盖问题。",
  handExample: "全样本年化 12%，但其中一年 -25%、另一年 +40%，这比平稳每年 12% 风险大得多。",
  pythonCode: `def yearly_performance(returns: pd.Series) -> pd.DataFrame:
    rows = []
    for year, group in returns.dropna().groupby(returns.dropna().index.year):
        rows.append({"year": int(year), **performance_summary(group)})
    return pd.DataFrame(rows)`,
  chart: "metrics",
  chartNote: "年度指标表帮助你观察收益是否集中在少数年份。",
  mistakes: ["只看全样本平均", "忽略市场环境变化", "把单一年份外推到未来"],
  checkpoint: ["能生成年度表现", "能解释 regime change", "知道平均数会掩盖路径"],
  skillLine: "validation",
  quizQuestion: "分年度表现主要帮助你看什么？",
  correctLabel: "稳定性和环境差异",
  wrongLabels: ["保证明年收益", "替代样本外验证"],
  quizExplanation: "年度拆分能暴露表现是否集中在少数时期。",
  codexFunction: "yearly_performance",
  targetFile: "python/src/quant_learning/experiments.py",
  testFile: "python/tests/test_experiments.py",
});
