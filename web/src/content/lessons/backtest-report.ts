import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "5.4",
  moduleId: "m5",
  order: 504,
  slug: "backtest-report",
  title: "回测报告",
  subtitle: "把结果写成可读、可复查、带风险声明的报告。",
  pythonModule: "quant_learning.reports",
  objectives: ["生成报告字典", "保存 JSON 或 Markdown", "在报告中包含风险声明"],
  concepts: ["report", "summary metrics", "disclaimer", "date range"],
  intuition: "报告不是宣传材料，而是研究记录。它应该说清楚数据、方法、结果和限制，让另一个人能复查你的假设、代码路径和风险声明，而不是只看到一张好看的收益图。",
  handExample: "一份合格报告会写：使用样例数据、信号滞后一日、成本 3 bps、历史结果不代表未来。",
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
  chart: "metrics",
  chartNote: "报告把指标卡片、净值曲线和回撤曲线组织成可复查材料。",
  mistakes: ["只写收益截图", "不写数据范围", "不写非投资建议声明"],
  checkpoint: ["能生成报告", "报告含风险声明", "知道报告是研究记录"],
  skillLine: "research-writing",
  quizQuestion: "回测报告必须包含什么声明？",
  correctLabel: "不构成投资建议",
  wrongLabels: ["保证未来收益", "推荐买入股票"],
  quizExplanation: "本项目是教育项目，报告必须清楚说明边界。",
  codexFunction: "generate_backtest_report",
  targetFile: "python/src/quant_learning/reports.py",
  testFile: "python/tests/test_reports.py",
});
