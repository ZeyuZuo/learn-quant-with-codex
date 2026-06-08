import pandas as pd

from quant_learning.experiments import scan_moving_average_parameters, train_test_split_time_series


def test_parameter_scan_skips_invalid_combinations() -> None:
    prices = pd.Series([100, 101, 102, 103, 104, 105], index=pd.date_range("2024-01-01", periods=6), dtype=float)
    scan = scan_moving_average_parameters(prices, fast_windows=[2, 5], slow_windows=[3, 4])
    assert ((scan["fast_window"] < scan["slow_window"]).all())


def test_train_test_split_time_series_preserves_order() -> None:
    data = pd.Series([1, 2, 3], index=pd.date_range("2024-01-01", periods=3))
    train, test = train_test_split_time_series(data, "2024-01-02")
    assert train.index.tolist() == list(pd.date_range("2024-01-01", periods=2))
    assert test.index.tolist() == [pd.Timestamp("2024-01-03")]
