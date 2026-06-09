import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "3.1",
  moduleId: "m3",
  order: 301,
  slug: "volatility",
  title: "波动率",
  subtitle: "波动率衡量收益变化幅度，不等于亏损，但会影响持有体验。",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解收益率标准差", "计算年化波动率", "知道高收益高波动未必适合"],
  concepts: ["volatility", "standard deviation", "annualized volatility"],
  intuition: "两条净值曲线最终都到 1.2，但一条平稳上涨，另一条每天大起大落。波动率帮助描述这种不稳定程度。",
  formula: "annual_volatility = std(daily_returns) * sqrt(252)",
  handExample: "如果日收益经常在 +5% 和 -5% 之间跳动，哪怕最终收益不错，持有过程也会很难受。",
  pythonCode: `def annualized_volatility(returns: pd.Series, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if len(clean) < 2:
        return float("nan")
    return float(clean.std(ddof=1) * np.sqrt(periods_per_year))`,
  chart: "volatility",
  chartNote: "收益率分布越分散，波动率越高。图表帮助你观察波动来自收益序列。",
  mistakes: ["把波动率当成最大亏损", "收益高就忽略波动", "用价格标准差替代收益率标准差"],
  checkpoint: ["能解释波动率", "能计算年化波动率", "知道波动率有局限"],
  skillLine: "risk-reading",
  quizQuestion: "波动率主要衡量什么？",
  correctLabel: "收益率变化幅度",
  wrongLabels: ["未来一定亏损", "股票成交量"],
  quizExplanation: "波动率描述收益率分散程度，不直接等同于亏损。",
  codexFunction: "annualized_volatility",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
