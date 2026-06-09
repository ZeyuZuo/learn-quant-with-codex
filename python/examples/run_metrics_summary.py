from __future__ import annotations

from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.metrics import (
    calculate_returns,
    compound_returns,
    drawdown_series,
    performance_summary,
    profit_loss_ratio,
    win_rate,
)
from quant_learning.reports import DISCLAIMER

from _example_utils import sample_prices_path, save_json_report, series_points


def main() -> None:
    df = read_price_csv(sample_prices_path())
    prices = choose_price_column(df, adjusted=True)
    returns = calculate_returns(prices)
    equity = compound_returns(returns)
    drawdowns = drawdown_series(equity)
    metrics = performance_summary(returns, equity)

    report = {
        "title": "Module 3 绩效指标摘要",
        "disclaimer": DISCLAIMER,
        "metrics": {
            **metrics,
            "win_rate": win_rate(returns),
            "profit_loss_ratio": profit_loss_ratio(returns),
        },
        "equity_preview": series_points(equity),
        "drawdown_preview": series_points(drawdowns),
        "learning_checks": [
            "最大回撤衡量净值从历史高点下跌的幅度，不是单日亏损。",
            "夏普比率在极短样本中可能未定义或误导，不能单独使用。",
            "如果亏损幅度远大于盈利幅度，高胜率也可能亏钱。",
        ],
        "common_misuse": "不要用单一指标概括策略；应同时看收益、波动、回撤、夏普、胜率和局限。",
    }
    output = save_json_report("performance_metrics_summary.json", report)
    print({"path": str(output), **report["metrics"]})


if __name__ == "__main__":
    main()
