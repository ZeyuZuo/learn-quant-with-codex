import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "8.1",
  moduleId: "m8",
  order: 801,
  slug: "parameter-scan",
  title: "参数扫描",
  subtitle: "遍历参数可以观察敏感性，也会诱发挑历史最好看的结果。",
  pythonModule: "quant_learning.experiments",
  objectives: ["扫描 fast/slow 均线参数", "跳过非法组合", "阅读参数结果表"],
  concepts: ["grid search", "parameter scan", "sensitivity"],
  intuition: "参数扫描像调收音机。你能找到历史样本里声音最清楚的位置，但不代表未来也一直清楚。",
  formula: "for fast in fast_windows: for slow in slow_windows",
  handExample: "fast=5、slow=20 和 fast=20、slow=100 可能表现不同，关键是看结果是否稳定，而不是只挑最高值。",
  pythonCode: `def scan_moving_average_parameters(prices, fast_windows, slow_windows):
    rows = []
    for fast in fast_windows:
        for slow in slow_windows:
            if fast >= slow:
                continue
            signal = moving_average_crossover(prices, fast, slow)
            result = run_backtest(prices, signal)
            rows.append({"fast_window": fast, "slow_window": slow, **result.metrics})
    return pd.DataFrame(rows)`,
  chart: "parameter-scan",
  chartNote: "参数图同时展示历史指标和样本外表现，提醒你不要只看样本内最优。",
  mistakes: ["fast >= slow 也参与比较", "只挑最高夏普", "没有记录扫描范围"],
  checkpoint: ["能运行参数扫描", "知道跳过非法组合", "能解释参数敏感性"],
  skillLine: "validation",
  quizQuestion: "参数扫描时为什么要跳过 fast >= slow？",
  correctLabel: "快线不应慢于慢线",
  wrongLabels: ["为了让收益更高", "因为不能画图"],
  quizExplanation: "双均线定义里 fast_window 应小于 slow_window。",
  codexFunction: "scan_moving_average_parameters",
  targetFile: "python/src/quant_learning/experiments.py",
  testFile: "python/tests/test_experiments.py",
});
