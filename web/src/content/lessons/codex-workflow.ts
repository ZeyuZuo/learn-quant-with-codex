import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "0.2",
  moduleId: "m0",
  order: 2,
  slug: "codex-workflow",
  title: "用 Codex 学量化的工作流",
  subtitle: "不要只让 Codex 写代码，要让它解释、实现、测试和反思。",
  difficulty: "入门",
  duration: "10 分钟",
  pythonModule: "quant_learning.metrics",
  objectives: ["掌握 Explain -> Implement -> Test -> Reflect 工作流", "学会给 Codex 明确约束和验收标准", "写出第一个可测试函数"],
  concepts: ["Prompt", "验收标准", "pytest", "边界条件"],
  intuition: "好的 Prompt 像一张小工单：它说清楚背景、目标、输入输出、限制和怎样算完成。这样 Codex 生成的代码更容易被你检查。",
  formula: "daily_return = current_price / previous_price - 1",
  handExample: "100 美元涨到 105 美元，收益率是 105 / 100 - 1 = 0.05，也就是 5%。",
  pythonCode: `def daily_return(previous_price: float, current_price: float) -> float:
    if previous_price <= 0:
        raise ValueError("previous_price must be positive")
    return current_price / previous_price - 1`,
  chart: "learning-path",
  chartNote: "这节课的图展示从课程问题到函数、测试、图表和总结的闭环。",
  mistakes: ["Prompt 只写“帮我写个函数”", "没有告诉 Codex 不能联网或不能做投资建议", "没有要求测试"],
  checkpoint: ["能写出带约束的 Prompt", "知道测试是学习过程的一部分", "能手算一个最简单收益率"],
  skillLine: "research-writing",
  quizQuestion: "一个适合课程项目的 Codex Prompt 至少应该包含什么？",
  correctLabel: "任务、约束、验收",
  wrongLabels: ["只写函数名", "只说越快越好"],
  quizExplanation: "任务、约束和验收标准能让实现更可检查。",
  codexFunction: "daily_return",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
