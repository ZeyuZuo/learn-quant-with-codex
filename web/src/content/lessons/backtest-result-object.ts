import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "5.3",
  moduleId: "m5",
  order: 503,
  slug: "backtest-result-object",
  title: "BacktestResult 结果对象",
  subtitle: "不要只保存一个最终收益，过程数据才方便检查。",
  pythonModule: "quant_learning.backtest",
  objectives: ["保存配置、收益、仓位、净值和指标", "理解结果对象的价值", "为报告和策略比较做准备"],
  concepts: ["dataclass", "BacktestResult", "config", "equity curve"],
  intuition: "只保存总收益像只保存考试总分。你不知道哪题错了，也不知道过程哪里有问题。",
  handExample: "如果策略总收益是 8%，你还需要知道它在哪些日期持仓、最大回撤是多少、是否扣了成本。",
  pythonCode: `def run_backtest(prices: pd.Series, signals: pd.Series, config: BacktestConfig) -> BacktestResult:
    asset_returns = calculate_returns(prices)
    positions = signals_to_positions(signals, lag=config.signal_lag).reindex(asset_returns.index).fillna(0)
    strategy_returns = asset_returns * positions
    strategy_returns = apply_transaction_costs(
        strategy_returns,
        positions,
        commission_bps=config.commission_bps,
        slippage_bps=config.slippage_bps,
    )
    equity = compound_returns(strategy_returns)
    return BacktestResult.from_series(config, asset_returns, positions, strategy_returns, equity)`,
  chart: "backtest",
  chartNote: "回测结果对象支撑图表、指标卡片和报告生成。",
  mistakes: ["只返回 float", "不保存 config", "不保存 strategy_returns"],
  checkpoint: ["能解释结果对象字段", "知道为什么保存过程数据", "能为报告提供输入"],
  skillLine: "return-path",
  quizQuestion: "为什么 BacktestResult 不应该只保存 total_return？",
  correctLabel: "无法审查收益路径",
  wrongLabels: ["total_return 不重要", "图表不需要数据"],
  quizExplanation: "总收益有用，但不足以检查路径、风险和实现逻辑。",
  codexFunction: "BacktestResult",
  targetFile: "python/src/quant_learning/backtest.py",
  testFile: "python/tests/test_backtest.py",
});
