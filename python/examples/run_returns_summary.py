from __future__ import annotations

from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.metrics import annualized_return, calculate_returns, compound_returns
from quant_learning.reports import DISCLAIMER

from _example_utils import sample_prices_path, save_json_report, series_points


def main() -> None:
    df = read_price_csv(sample_prices_path())
    prices = choose_price_column(df, adjusted=True)
    returns = calculate_returns(prices)
    equity = compound_returns(returns)

    report = {
        "title": "Module 2 收益和净值摘要",
        "disclaimer": DISCLAIMER,
        "selected_price_column": "adj_close" if "adj_close" in df.columns else "close",
        "date_range": {
            "start": str(prices.index.min().date()),
            "end": str(prices.index.max().date()),
        },
        "summary": {
            "observations": int(len(returns)),
            "total_return": float(equity.iloc[-1] - 1) if not equity.empty else None,
            "annualized_return": annualized_return(returns),
        },
        "price_preview": series_points(prices),
        "return_preview": series_points(returns),
        "equity_preview": series_points(equity),
        "learning_checks": [
            "第一行价格没有日收益率，因为它没有上一日价格可比较。",
            "净值曲线用 (1 + return).cumprod() 复利累乘，不是把日收益简单相加。",
            "短样本年化收益很容易夸大，应在报告中谨慎解释。",
        ],
        "common_misuse": "不要用美元涨跌额比较不同股票；应比较百分比收益和净值路径。",
    }
    output = save_json_report("returns_equity_summary.json", report)
    print({"path": str(output), **report["summary"]})


if __name__ == "__main__":
    main()
