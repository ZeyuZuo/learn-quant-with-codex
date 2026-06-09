from __future__ import annotations

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.costs import calculate_turnover
from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.positions import signals_to_positions
from quant_learning.reports import DISCLAIMER
from quant_learning.strategies import moving_average_crossover

from _example_utils import sample_prices_path, save_json_report, series_points


def main() -> None:
    df = read_price_csv(sample_prices_path())
    prices = choose_price_column(df, adjusted=True)
    signals = moving_average_crossover(prices, fast_window=2, slow_window=4)

    no_cost = run_backtest(
        prices,
        signals,
        BacktestConfig(name="ma_lag_1_no_cost", signal_lag=1, commission_bps=0, slippage_bps=0),
    )
    with_cost = run_backtest(
        prices,
        signals,
        BacktestConfig(name="ma_lag_1_with_cost", signal_lag=1, commission_bps=1, slippage_bps=2),
    )
    lookahead = run_backtest(
        prices,
        signals,
        BacktestConfig(name="ma_lag_0_bias_demo", signal_lag=0, commission_bps=0, slippage_bps=0),
    )
    positions = signals_to_positions(signals, lag=1)
    turnover = calculate_turnover(positions)

    report = {
        "title": "Module 4 仓位、成本和偏差对比",
        "disclaimer": DISCLAIMER,
        "strategy": "moving_average_crossover(fast_window=2, slow_window=4)",
        "signal_preview": series_points(signals),
        "position_preview": series_points(positions),
        "turnover_preview": series_points(turnover),
        "comparisons": {
            "lag_1_no_cost": no_cost.metrics,
            "lag_1_with_cost": with_cost.metrics,
            "lag_0_bias_demo": lookahead.metrics,
        },
        "learning_checks": [
            "Signal 是策略想法；position 才是用于计算收益的真实暴露。",
            "默认 lag=1 是为了避免假设用收盘价生成信号后还能在同一收盘价成交。",
            "成本和换手相关，频繁改变仓位会侵蚀看似不错的策略结果。",
        ],
        "common_misuse": "不要把 lag=0 结果当作真实执行；它只用于演示 look-ahead bias。",
    }
    output = save_json_report("position_cost_bias_comparison.json", report)
    print({"path": str(output), "comparisons": list(report["comparisons"].keys())})


if __name__ == "__main__":
    main()
