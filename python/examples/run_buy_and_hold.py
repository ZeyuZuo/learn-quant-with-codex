from pathlib import Path

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.metrics import drawdown_series
from quant_learning.reports import DISCLAIMER, generate_backtest_report
from quant_learning.strategies import buy_and_hold_signal

from _example_utils import markdown_metric_table, save_markdown_report, series_points


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    signals = buy_and_hold_signal(prices)
    result = run_backtest(prices, signals, BacktestConfig(name="sample_buy_and_hold", commission_bps=1, slippage_bps=2))
    report = generate_backtest_report(result)
    drawdown = drawdown_series(result.equity_curve)

    markdown = f"""# Buy and Hold 回测报告

{DISCLAIMER}

## 目的

这份 Module 5 报告展示 buy and hold 基准路径。进入更复杂的策略前，先要知道基准本身的收益、回撤和成本假设。

## 配置

- Name: `{report["name"]}`
- Signal lag: `{report["config"]["signal_lag"]}`
- Commission bps: `{report["config"]["commission_bps"]}`
- Slippage bps: `{report["config"]["slippage_bps"]}`
- Date range: {report["date_range"]["start"]} to {report["date_range"]["end"]}

## 指标

{markdown_metric_table(report["metrics"])}

## 净值预览

{series_points(result.equity_curve)}

## 回撤预览

{series_points(drawdown)}

## 学习笔记

- Buy and hold 是基准，不是策略推荐。
- 报告同时保留指标和路径预览，因为最终收益会隐藏回撤过程。
- 这个简化回测依赖历史样例数据，不能预测未来收益。
"""
    output = save_markdown_report("buy_and_hold_report.md", markdown)
    print({"path": str(output), "metrics": report["metrics"]})


if __name__ == "__main__":
    main()
