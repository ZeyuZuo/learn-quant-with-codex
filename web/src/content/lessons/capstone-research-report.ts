import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "9.4",
  moduleId: "m9",
  order: 904,
  slug: "capstone-research-report",
  title: "Capstone：完整策略研究报告",
  subtitle: "把数据、策略、回测、参数验证和限制条件组织成一份学习报告。",
  pythonModule: "quant_learning.reports",
  objectives: ["完成一份完整研究报告", "包含图表、指标、成本和样本外", "写明至少 5 条限制"],
  concepts: ["capstone", "research report", "limitations", "reproducibility"],
  intuition: "最终报告不是为了证明策略好，而是为了证明你能完整、诚实、可复查地研究一个策略想法。",
  handExample: "报告应包含 5 类核心材料：数据来源、策略假设、回测配置、参数扫描、样本外结果和风险声明。",
  pythonCode: `def generate_backtest_report(result: BacktestResult) -> dict:
    return {
        "name": result.config.name,
        "disclaimer": "教育用途，不构成投资建议；历史回测结果不代表未来收益。",
        "metrics": result.metrics,
        "date_range": {
            "start": str(result.equity_curve.index.min().date()),
            "end": str(result.equity_curve.index.max().date()),
        },
    }`,
  chart: "strategy-comparison",
  chartNote: "Capstone 页面应同时展示策略对比和关键指标，而不是只展示一张漂亮净值曲线。",
  mistakes: ["只写结论不写方法", "只展示最好参数", "没有风险声明"],
  checkpoint: ["能交付完整报告", "能说明限制条件", "Python 测试全部通过"],
  skillLine: "research-writing",
  quizQuestion: "Capstone 报告的目标是什么？",
  correctLabel: "可复查地研究策略想法",
  wrongLabels: ["证明未来盈利", "推荐某只股票"],
  quizExplanation: "Capstone 是学习型研究报告，不是投资推荐。",
  codexFunction: "final_research_report",
  targetFile: "reports/final_research_report.md",
  testFile: "python/tests/test_reports.py",
});
