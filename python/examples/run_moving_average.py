from pathlib import Path

from quant_learning.backtest import BacktestConfig, compare_strategies, run_backtest
from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.reports import DISCLAIMER
from quant_learning.strategies import buy_and_hold_signal, mean_reversion_signal, momentum_signal, moving_average_crossover

from _example_utils import markdown_dataframe_table, markdown_metric_table, save_markdown_report


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    config = BacktestConfig(commission_bps=1, slippage_bps=2)
    results = {
        "buy_and_hold": run_backtest(prices, buy_and_hold_signal(prices), BacktestConfig(name="buy_and_hold", commission_bps=1, slippage_bps=2)),
        "moving_average": run_backtest(prices, moving_average_crossover(prices, fast_window=2, slow_window=4), BacktestConfig(name="moving_average", commission_bps=1, slippage_bps=2)),
        "momentum": run_backtest(prices, momentum_signal(prices, lookback=3), BacktestConfig(name="momentum", commission_bps=1, slippage_bps=2)),
        "mean_reversion": run_backtest(prices, mean_reversion_signal(prices, window=4, threshold=0.5), BacktestConfig(name="mean_reversion", commission_bps=1, slippage_bps=2)),
    }
    comparison = compare_strategies(results)
    sections = []
    for name, result in results.items():
        sections.append(f"""### {name}

{markdown_metric_table(result.metrics)}
""")

    markdown = f"""# 策略对比报告

{DISCLAIMER}

## 目的

这份 Module 6 报告在同一份样例数据、同一滞后规则、同一手续费和滑点假设下比较四个学习案例。

## 共同配置

- Signal lag: `{config.signal_lag}`
- Commission bps: `1`
- Slippage bps: `2`
- 所有策略都只是学习案例。

## 对比表

{markdown_dataframe_table(comparison)}

## 策略指标

{chr(10).join(sections)}

## 学习笔记

- 策略函数只生成 `signal`；回测器负责把 signal 转成滞后 position。
- 公平比较需要保持数据、成本、滞后规则和指标口径一致。
- 小样本中表现最好的行，不是未来表现证据。
"""
    output = save_markdown_report("strategy_comparison_report.md", markdown)
    print({"path": str(output), "strategies": list(results)})


if __name__ == "__main__":
    main()
