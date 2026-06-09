import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "3.5",
  moduleId: "m3",
  order: 305,
  slug: "read-metrics-table",
  title: "如何读一张指标表",
  subtitle: "指标表不是答案，它是一组帮助你追问的问题。",
  pythonModule: "quant_learning.metrics",
  objectives: ["组合阅读收益、波动、回撤和夏普", "识别单一指标盲点", "生成绩效摘要"],
  concepts: ["performance summary", "metric tradeoff", "risk adjusted return"],
  intuition: "指标表像体检报告。某一项正常不代表整体健康，某一项异常也需要结合上下文判断。",
  handExample: "策略 A 收益高但回撤 -40%，策略 B 收益低但回撤 -8%。哪个更好取决于目标和承受能力。",
  pythonCode: `def performance_summary(returns, equity=None) -> dict:
    return {
        "annualized_return": annualized_return(returns),
        "annualized_volatility": annualized_volatility(returns),
        "max_drawdown": max_drawdown(compound_returns(returns) if equity is None else equity),
        "sharpe_ratio": sharpe_ratio(returns),
    }`,
  chart: "metrics",
  chartNote: "多个指标放在一起，能帮助你看到策略表现的不同侧面。",
  mistakes: ["只按收益排序", "把夏普当作唯一标准", "不看样本长度和数据范围"],
  checkpoint: ["能读懂指标表", "能指出 3 个指标盲点", "知道指标要和图表一起看"],
  skillLine: "risk-reading",
  quizQuestion: "指标表最合理的作用是什么？",
  correctLabel: "帮助提出更好的问题",
  wrongLabels: ["证明未来收益", "替代数据检查"],
  quizExplanation: "指标表总结历史样本表现，但不能证明未来。",
  codexFunction: "performance_summary",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
