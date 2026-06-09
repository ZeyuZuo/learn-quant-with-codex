export type CourseCodeMapItem = {
  moduleId: string;
  codeFiles: string[];
  testFiles: string[];
  exampleCommands: string[];
  focus: string;
};

export const courseCodeMap: CourseCodeMapItem[] = [
  {
    moduleId: "m0",
    codeFiles: ["python/src/quant_learning/metrics.py"],
    testFiles: ["python/tests/test_metrics.py"],
    exampleCommands: ["cd python", "uv run pytest tests/test_metrics.py"],
    focus: "用一个最小收益率函数建立 Codex 工单、边界和测试习惯。",
  },
  {
    moduleId: "m1",
    codeFiles: ["python/src/quant_learning/data.py", "python/data/sample_prices.csv"],
    testFiles: ["python/tests/test_data.py"],
    exampleCommands: ["cd python", "uv run pytest tests/test_data.py", "uv run python examples/run_data_quality_report.py"],
    focus: "读取本地 OHLCV 数据，选择复权价格，并输出数据质量报告。",
  },
  {
    moduleId: "m2",
    codeFiles: ["python/src/quant_learning/metrics.py"],
    testFiles: ["python/tests/test_metrics.py"],
    exampleCommands: ["cd python", "uv run pytest tests/test_metrics.py", "uv run python examples/run_returns_summary.py"],
    focus: "从价格计算收益率、复利、年化收益和净值曲线。",
  },
  {
    moduleId: "m3",
    codeFiles: ["python/src/quant_learning/metrics.py"],
    testFiles: ["python/tests/test_metrics.py"],
    exampleCommands: ["cd python", "uv run pytest tests/test_metrics.py", "uv run python examples/run_metrics_summary.py"],
    focus: "用波动率、最大回撤、夏普比率、胜率和盈亏比评价收益路径。",
  },
  {
    moduleId: "m4",
    codeFiles: ["python/src/quant_learning/positions.py", "python/src/quant_learning/costs.py"],
    testFiles: ["python/tests/test_positions.py", "python/tests/test_costs.py"],
    exampleCommands: ["cd python", "uv run pytest tests/test_positions.py tests/test_costs.py", "uv run python examples/run_position_cost_bias.py"],
    focus: "把 signal 转成滞后 position，并用换手估算手续费和滑点。",
  },
  {
    moduleId: "m5",
    codeFiles: ["python/src/quant_learning/backtest.py", "python/src/quant_learning/reports.py"],
    testFiles: ["python/tests/test_backtest.py", "python/tests/test_reports.py"],
    exampleCommands: ["cd python", "uv run python examples/run_buy_and_hold.py"],
    focus: "把数据、信号、仓位、成本、净值和指标串成最小回测报告。",
  },
  {
    moduleId: "m6",
    codeFiles: ["python/src/quant_learning/strategies.py", "python/src/quant_learning/backtest.py"],
    testFiles: ["python/tests/test_strategies.py", "python/tests/test_backtest.py"],
    exampleCommands: ["cd python", "uv run python examples/run_moving_average.py"],
    focus: "实现双均线、动量、均值回归，并在同一回测器里公平比较。",
  },
  {
    moduleId: "m7",
    codeFiles: ["python/src/quant_learning/portfolio.py", "python/src/quant_learning/positions.py"],
    testFiles: ["python/tests/test_portfolio.py", "python/tests/test_positions.py"],
    exampleCommands: ["cd python", "uv run python examples/run_equal_weight_portfolio.py"],
    focus: "计算多资产收益、等权组合、轮动信号和组合 benchmark 输入。",
  },
  {
    moduleId: "m8",
    codeFiles: ["python/src/quant_learning/experiments.py"],
    testFiles: ["python/tests/test_experiments.py"],
    exampleCommands: ["cd python", "uv run python examples/run_parameter_scan.py"],
    focus: "运行参数扫描、样本内 / 样本外验证和随机策略实验。",
  },
  {
    moduleId: "m9",
    codeFiles: ["python/src/quant_learning/reports.py"],
    testFiles: ["python/tests/test_reports.py"],
    exampleCommands: ["cd python", "uv run python examples/generate_capstone_template.py", "uv run python examples/run_capstone_check.py"],
    focus: "生成、校验最终研究报告，并保持教育用途和非投资建议边界。",
  },
];

export function getCourseCodeMapItem(moduleId: string) {
  return courseCodeMap.find((item) => item.moduleId === moduleId);
}
