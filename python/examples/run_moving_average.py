from pathlib import Path

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.strategies import moving_average_crossover


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    signals = moving_average_crossover(prices, fast_window=2, slow_window=4)
    result = run_backtest(prices, signals, BacktestConfig(name="sample_ma", commission_bps=1, slippage_bps=2))
    print(result.metrics)


if __name__ == "__main__":
    main()
