import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "3.4",
  moduleId: "m3",
  order: 304,
  slug: "win-rate-profit-loss",
  title: "胜率和盈亏比",
  subtitle: "交易赢得多不一定赚钱，单次亏损大小同样关键。",
  pythonModule: "quant_learning.metrics",
  objectives: ["计算胜率", "计算盈亏比", "理解交易级指标的局限"],
  concepts: ["win rate", "average win", "average loss", "profit/loss ratio"],
  intuition: "胜率像考试答对题目的比例，盈亏比像答对一题加多少分、答错一题扣多少分。只看答对比例是不够的。",
  formula: "profit_loss_ratio = average_win / abs(average_loss)",
  handExample: "9 次赚 1 元、1 次亏 20 元，胜率 90%，但总结果是 -11 元。",
  pythonCode: `def win_rate(trade_returns: pd.Series) -> float:
    clean = trade_returns.dropna().astype(float)
    return float((clean > 0).mean()) if not clean.empty else float("nan")

def profit_loss_ratio(trade_returns: pd.Series) -> float:
    wins = trade_returns[trade_returns > 0]
    losses = trade_returns[trade_returns < 0]
    if wins.empty or losses.empty:
        return float("nan")
    return float(wins.mean() / abs(losses.mean()))`,
  chart: "metrics",
  chartNote: "指标卡片提醒你同时看收益、风险和交易级指标。",
  mistakes: ["高胜率等于好策略", "只看平均盈利不看平均亏损", "把每日收益当作真实交易记录"],
  checkpoint: ["能计算胜率", "能解释盈亏比", "知道交易指标需要交易记录支持"],
  skillLine: "risk-reading",
  quizQuestion: "高胜率策略一定赚钱吗？",
  correctLabel: "不一定",
  wrongLabels: ["一定", "只要超过 50% 就一定"],
  quizExplanation: "如果亏损交易远大于盈利交易，高胜率也可能亏钱。",
  codexFunction: "win_rate 和 profit_loss_ratio",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
