from pathlib import Path

from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.experiments import scan_moving_average_parameters


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    scan = scan_moving_average_parameters(prices, fast_windows=[2, 3, 4], slow_windows=[3, 5, 6])
    print(scan)


if __name__ == "__main__":
    main()
