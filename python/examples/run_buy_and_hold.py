from pathlib import Path

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.reports import generate_backtest_report
from quant_learning.strategies import buy_and_hold_signal


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    signals = buy_and_hold_signal(prices)
    result = run_backtest(prices, signals, BacktestConfig(name="sample_buy_and_hold", commission_bps=1, slippage_bps=2))
    report = generate_backtest_report(result)
    print(report)


if __name__ == "__main__":
    main()
