import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "0.3",
  moduleId: "m0",
  order: 3,
  slug: "first-tested-function",
  title: "第一个测试驱动的小函数",
  subtitle: "用一个很小的收益率函数理解“实现”和“验证”的关系。",
  pythonModule: "quant_learning.metrics",
  objectives: ["把手算收益率变成函数", "写出最小 pytest", "知道测试不是形式，而是防止概念跑偏"],
  concepts: ["unit test", "expected value", "edge case"],
  intuition: "初学量化时，最危险的不是公式复杂，而是一个很小的函数算错后被后面的策略反复放大。先测试小函数，是为了让后面的回测更可信。",
  formula: "daily_return(100, 105) = 0.05",
  handExample: "如果函数把 100 到 105 算成 5，而不是 0.05，后面所有年化、净值和夏普都会错。",
  pythonCode: `def daily_return(previous_price: float, current_price: float) -> float:
    if previous_price <= 0:
        raise ValueError("previous_price must be positive")
    return current_price / previous_price - 1`,
  chart: "learning-path",
  chartNote: "这张路径图强调：课程中的每个概念都会进入实现和测试。",
  mistakes: ["只看函数能运行，不检查数值", "测试只覆盖一个正常输入", "没有测试非法价格"],
  checkpoint: ["能写一个 pytest", "知道收益率单位是小数", "能解释为什么先测小函数"],
  skillLine: "return-path",
  quizQuestion: "为什么课程从很小的函数开始测试？",
  correctLabel: "小错误会被后续回测放大",
  wrongLabels: ["为了让代码更长", "为了替代课程解释"],
  quizExplanation: "收益率、净值和指标环环相扣，小函数错误会传导到后续结果。",
  codexFunction: "daily_return 和对应 pytest",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
