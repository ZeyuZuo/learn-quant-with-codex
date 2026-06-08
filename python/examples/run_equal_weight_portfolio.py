import pandas as pd

from quant_learning.metrics import compound_returns, performance_summary
from quant_learning.portfolio import calculate_asset_returns, equal_weight_portfolio


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
    print(performance_summary(portfolio_returns, equity))


if __name__ == "__main__":
    main()
