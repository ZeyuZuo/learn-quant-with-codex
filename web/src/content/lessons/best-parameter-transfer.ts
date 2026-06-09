import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "8.3",
  moduleId: "m8",
  order: 803,
  slug: "best-parameter-transfer",
  title: "最优参数迁移测试",
  subtitle: "样本内最优参数到了样本外，常常没有想象中稳定。",
  pythonModule: "quant_learning.experiments",
  objectives: ["选择样本内最优参数", "在样本外复测", "解释迁移失败"],
  concepts: ["best parameter", "transfer", "validation", "overfitting"],
  intuition: "如果参数只是在历史噪声上碰巧最优，换一段时间后它可能立刻失效。迁移测试就是把样本内挑出来的参数拿到另一段历史里复查，观察它是否只是过拟合。",
  handExample: "fast=20/slow=50 在样本内夏普最高，但样本外净值低于 buy and hold，这说明历史最优不稳定。",
  pythonCode: `def evaluate_in_sample_out_of_sample(prices, params, split_date):
    train, test = train_test_split_time_series(prices, split_date)
    return {
        "in_sample": run_backtest(train, moving_average_crossover(train, **params)).metrics,
        "out_of_sample": run_backtest(test, moving_average_crossover(test, **params)).metrics,
    }`,
  chart: "out-of-sample",
  chartNote: "样本内和样本外曲线分开观察，避免一条全样本曲线掩盖问题。",
  mistakes: ["样本外差就重新挑样本外参数", "只报告样本内最优", "忽略参数稳定性"],
  checkpoint: ["能验证最优参数迁移", "能解释样本外变差", "知道这仍不是未来保证"],
  skillLine: "validation",
  quizQuestion: "样本内最优参数样本外变差说明什么？",
  correctLabel: "可能不稳定或过拟合",
  wrongLabels: ["未来必定亏损", "代码一定无法运行"],
  quizExplanation: "样本外变差是警告信号，但需要结合更多分析。",
  codexFunction: "evaluate_in_sample_out_of_sample",
  targetFile: "python/src/quant_learning/experiments.py",
  testFile: "python/tests/test_experiments.py",
});
