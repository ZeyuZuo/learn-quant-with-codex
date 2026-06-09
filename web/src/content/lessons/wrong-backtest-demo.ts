import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "4.5",
  moduleId: "m4",
  order: 405,
  slug: "wrong-backtest-demo",
  title: "一个故意错误的回测",
  subtitle: "亲眼看到 look-ahead bias 如何让曲线变漂亮。",
  pythonModule: "quant_learning.backtest",
  objectives: ["比较错误 shift 和正确 shift", "识别偷看未来", "用测试保护回测逻辑"],
  concepts: ["look-ahead bias", "wrong shift", "bias demo"],
  intuition: "错误回测最危险的地方是它通常不会报错，甚至会给你一条更漂亮的曲线。你需要用逻辑和测试发现它。",
  handExample: "如果第 1 天收盘后才知道价格上涨 5%，却让策略在第 1 天开盘前就持仓，这等于提前知道了当天结局。",
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
  chart: "costs",
  chartNote: "错误 shift 曲线故意画得更好，用来提醒你漂亮曲线可能来自错误逻辑。",
  mistakes: ["以为代码跑通就逻辑正确", "只看收益不看实现", "没有写滞后持仓测试"],
  checkpoint: ["能识别错误 shift", "能写测试验证滞后", "知道漂亮曲线可能是偏差"],
  skillLine: "validation",
  quizQuestion: "为什么错误回测特别危险？",
  correctLabel: "它可能跑通且结果更好看",
  wrongLabels: ["它一定会报错", "它不能画图"],
  quizExplanation: "逻辑错误不一定导致程序错误，必须主动审查。",
  codexFunction: "回测偏差审查测试",
  targetFile: "python/tests/test_backtest.py",
  testFile: "python/tests/test_backtest.py",
});
