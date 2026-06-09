import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "3.3",
  moduleId: "m3",
  order: 303,
  slug: "sharpe-ratio",
  title: "夏普比率",
  subtitle: "收益高不等于策略好，还要看承担了多少波动。",
  duration: "18 分钟",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解风险调整后收益", "知道夏普比率依赖收益均值和波动率", "处理零波动边界"],
  concepts: ["Sharpe ratio", "excess return", "risk-free rate", "annualization"],
  intuition: "夏普比率尝试回答：承担这些波动，换来的平均收益是否值得？它不是策略排名答案，只是把收益和波动放进同一个问题里。",
  formula: "sharpe = mean(excess_returns) / std(returns) * sqrt(252)",
  handExample: "策略 A 日均收益 0.08%、日波动 1%，策略 B 日均收益 0.05%、日波动 0.3%。A 收益更高，但 B 的风险调整后收益可能更好。",
  pythonCode: `import numpy as np

def sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.0, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if clean.empty:
        return float("nan")
    daily_rf = risk_free_rate / periods_per_year
    excess = clean - daily_rf
    volatility = clean.std(ddof=1)
    if volatility == 0 or np.isnan(volatility):
        return float("nan")
    return float(excess.mean() / volatility * np.sqrt(periods_per_year))`,
  chart: "metrics",
  chartNote: "指标卡片并排展示收益、波动率、回撤和夏普，提醒你不要只看单一数字。",
  mistakes: ["收益高就认为策略好", "夏普高就忽略最大回撤", "零波动时强行计算夏普"],
  checkpoint: ["能解释夏普比率直觉", "知道收益和波动要一起看", "知道单一指标不能评价完整策略"],
  skillLine: "risk-reading",
  quizQuestion: "夏普比率主要想把收益和什么放在一起看？",
  correctLabel: "波动率",
  wrongLabels: ["ticker 长度", "未来收益保证"],
  quizExplanation: "夏普比率用平均超额收益除以收益波动率，再做年化。",
  codexFunction: "sharpe_ratio",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
