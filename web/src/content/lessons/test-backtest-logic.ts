import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "5.5",
  moduleId: "m5",
  order: 505,
  slug: "test-backtest-logic",
  title: "用测试保护回测逻辑",
  subtitle: "回测函数比普通函数更需要测试，因为错误结果常常看起来很合理。",
  pythonModule: "quant_learning.backtest",
  objectives: ["测试 signal lag", "测试成本扣减", "测试索引对齐", "测试空输入边界"],
  concepts: ["pytest", "regression test", "alignment test"],
  intuition: "回测测试不是为了追求覆盖率数字，而是为了防止最常见、最昂贵的逻辑错误。",
  handExample: "构造价格从 100 跳到 200，但信号第二天才出现。如果回测捕获了这段上涨，就说明它偷看了未来。",
  pythonCode: `def test_backtest_lags_signal():
    prices = pd.Series([100.0, 200.0, 200.0])
    signals = pd.Series([0.0, 1.0, 1.0])
    result = run_backtest(prices, signals, BacktestConfig(signal_lag=1))
    assert result.equity_curve.iloc[-1] == pytest.approx(1.0)`,
  chart: "bias",
  chartNote: "偏差检查图提醒你：测试要覆盖那些结果会被美化的错误。",
  mistakes: ["只测试正常上涨场景", "没有测试滞后", "没有测试成本影响"],
  checkpoint: ["能写滞后测试", "能写成本测试", "知道回测测试的核心风险"],
  skillLine: "return-path",
  quizQuestion: "回测测试最应该优先保护哪类问题？",
  correctLabel: "偷看未来和成本遗漏",
  wrongLabels: ["按钮颜色", "README 字数"],
  quizExplanation: "look-ahead bias 和成本遗漏会直接扭曲策略结果。",
  codexFunction: "关键回测测试",
  targetFile: "python/tests/test_backtest.py",
  testFile: "python/tests/test_backtest.py",
});
