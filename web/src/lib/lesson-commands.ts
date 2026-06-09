import type { Lesson } from "./types";

type LessonCommandInfo = {
  primary: string;
  secondary?: string;
  label: string;
};

const moduleTestCommands: Record<string, string> = {
  m0: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_metrics.py",
  m1: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_data.py",
  m2: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_metrics.py",
  m3: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_metrics.py",
  m4: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_positions.py tests/test_costs.py",
  m5: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_backtest.py tests/test_reports.py",
  m6: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_strategies.py tests/test_backtest.py",
  m7: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_portfolio.py tests/test_positions.py",
  m8: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_experiments.py",
  m9: "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest tests/test_reports.py",
};

const lessonExamples: Record<string, string> = {
  "us-market-and-ticker": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_data_quality_report.py",
  "ohlcv": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_data_quality_report.py",
  "close-vs-adjusted-close": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_data_quality_report.py",
  "data-quality": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_data_quality_report.py",
  "returns": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_returns_summary.py",
  "compound-equity": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_returns_summary.py",
  "annualized-return": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_returns_summary.py",
  "returns-summary": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_returns_summary.py",
  "volatility": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_metrics_summary.py",
  "max-drawdown": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_metrics_summary.py",
  "sharpe-ratio": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_metrics_summary.py",
  "win-rate-profit-loss": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_metrics_summary.py",
  "read-metrics-table": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_metrics_summary.py",
  "signal-position": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_position_cost_bias.py",
  "transaction-costs": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_position_cost_bias.py",
  "position-sizing": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_position_cost_bias.py",
  "wrong-backtest-demo": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_position_cost_bias.py",
  "buy-and-hold": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_buy_and_hold.py",
  "minimal-backtester": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_buy_and_hold.py",
  "backtest-result-object": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_buy_and_hold.py",
  "backtest-report": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_buy_and_hold.py",
  "moving-average-crossover": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_moving_average.py",
  "strategy-comparison": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_moving_average.py",
  "portfolio-vs-benchmark": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_equal_weight_portfolio.py",
  "parameter-scan": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_parameter_scan.py",
  "best-parameter-transfer": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_parameter_scan.py",
  "capstone-research-report": "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/generate_capstone_template.py\nUV_CACHE_DIR=/tmp/uv-cache uv run python examples/run_capstone_check.py",
};

export function getLessonCommandInfo(lesson: Lesson): LessonCommandInfo {
  if (lesson.pythonModule.endsWith(".md")) {
    return {
      label: "文档验收",
      primary: `打开 ${lesson.pythonModule}，确认本节边界、风险声明和学习产物是否已经写清楚。`,
    };
  }

  const primary = moduleTestCommands[lesson.moduleId] ?? "cd python\nUV_CACHE_DIR=/tmp/uv-cache uv run pytest";
  const secondary = lessonExamples[lesson.slug];

  return {
    label: secondary ? "本课验收和示例" : "本课验收",
    primary,
    secondary,
  };
}
