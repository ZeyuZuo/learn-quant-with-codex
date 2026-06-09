import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "5.2",
  moduleId: "m5",
  order: 502,
  slug: "minimal-backtester",
  title: "最小可用回测器",
  subtitle: "把价格、信号、仓位、成本、净值和指标串起来。",
  duration: "20 分钟",
  pythonModule: "quant_learning.backtest",
  objectives: ["理解回测流程", "实现 BacktestResult", "默认避免 look-ahead bias"],
  concepts: ["asset returns", "strategy returns", "equity curve", "BacktestResult"],
  intuition: "回测器不是神秘工具，它只是稳定地执行一套流程：价格变收益，信号变仓位，仓位乘收益，扣成本，再计算净值和指标。",
  formula: "strategy_return_t = asset_return_t * position_t - cost_t",
  handExample: "如果某天资产收益是 2%，position 是 1，成本是 0.1%，策略收益就是 1.9%。如果 position 是 0，策略不承担这天价格变化。",
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
  chartNote: "回测图把净值、回撤和指标卡片放在一起，避免只看收益。",
  mistakes: ["把信号直接乘当天收益", "只保存最终收益", "没有测试成本和滞后逻辑"],
  checkpoint: ["能说出回测 5 个步骤", "能解释 asset returns 和 strategy returns", "知道默认滞后仓位的重要性"],
  skillLine: "execution-assumptions",
  quizQuestion: "最小回测器里 position 的作用是什么？",
  correctLabel: "决定是否承担当天资产收益",
  wrongLabels: ["替代价格数据", "保证没有亏损"],
  quizExplanation: "position 决定策略在某一天是否暴露于资产收益。",
  codexFunction: "run_backtest 和 BacktestResult",
  targetFile: "python/src/quant_learning/backtest.py",
  testFile: "python/tests/test_backtest.py",
});
