import pandas as pd

from quant_learning.metrics import compound_returns, drawdown_series, performance_summary
from quant_learning.portfolio import calculate_asset_returns, equal_weight_portfolio, momentum_rotation_signal, portfolio_returns_from_weights
from quant_learning.positions import equal_weight_positions
from quant_learning.reports import DISCLAIMER

from _example_utils import markdown_metric_table, save_markdown_report, series_points


def main() -> None:
    dates = pd.date_range("2024-01-02", periods=5, freq="B")
    prices = pd.DataFrame(
        {
            "SPY": [100.0, 101.0, 100.0, 103.0, 104.0],
            "AAPL": [50.0, 51.0, 53.0, 52.0, 54.0],
            "MSFT": [80.0, 79.0, 81.0, 82.0, 83.0],
        },
        index=dates,
    )

    asset_returns = calculate_asset_returns(prices)
    portfolio_returns = equal_weight_portfolio(asset_returns)
    equity = compound_returns(portfolio_returns)
    equal_weight_metrics = performance_summary(portfolio_returns, equity)

    rotation_signals = momentum_rotation_signal(prices, lookback=2, top_n=1)
    rotation_weights = equal_weight_positions(rotation_signals).reindex(asset_returns.index).fillna(0.0)
    rotation_returns = portfolio_returns_from_weights(asset_returns, rotation_weights)
    rotation_equity = compound_returns(rotation_returns)
    rotation_metrics = performance_summary(rotation_returns, rotation_equity)

    markdown = f"""# 组合对比报告

{DISCLAIMER}

## 目的

这份 Module 7 报告比较简单等权组合和 top-1 动量轮动学习案例。

## 等权组合指标

{markdown_metric_table(equal_weight_metrics)}

## 动量轮动指标

{markdown_metric_table(rotation_metrics)}

## 等权组合净值预览

{series_points(equity)}

## 等权组合回撤预览

{series_points(drawdown_series(equity))}

## 学习笔记

- 组合收益是资产收益的加权和，不是价格水平的平均值。
- 买入更多资产不自动等于更好的分散化。
- 再平衡和轮动可能提高换手率，解读结果前需要考虑成本。
"""
    output = save_markdown_report("portfolio_comparison_report.md", markdown)
    print({"path": str(output), "equal_weight": equal_weight_metrics, "rotation": rotation_metrics})


if __name__ == "__main__":
    main()
