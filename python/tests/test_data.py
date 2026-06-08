from pathlib import Path

import pandas as pd
import pytest

from quant_learning.data import align_price_data, choose_price_column, read_price_csv, validate_ohlcv_columns, validate_price_data


def test_read_price_csv_uses_datetime_index() -> None:
    df = read_price_csv(Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv")
    assert isinstance(df.index, pd.DatetimeIndex)
    assert df.index.is_monotonic_increasing


def test_validate_ohlcv_columns_raises_for_missing_column() -> None:
    df = pd.DataFrame({"open": [1], "high": [1], "low": [1], "close": [1]})
    with pytest.raises(ValueError, match="missing OHLCV"):
        validate_ohlcv_columns(df)


def test_choose_price_column_prefers_adjusted_close() -> None:
    df = pd.DataFrame({"close": [53.0], "adj_close": [106.0]})
    assert choose_price_column(df, adjusted=True).iloc[0] == 106.0
    assert choose_price_column(df, adjusted=False).iloc[0] == 53.0


def test_validate_price_data_reports_issues() -> None:
    df = pd.DataFrame(
        {
            "open": [1.0, 1.0],
            "high": [1.0, 1.0],
            "low": [1.0, 1.0],
            "close": [1.0, 0.0],
            "volume": [100, -1],
        },
        index=pd.to_datetime(["2024-01-02", "2024-01-02"]),
    )
    report = validate_price_data(df)
    assert report["duplicate_dates"] == 1
    assert report["non_positive_close"] == 1
    assert report["non_positive_volume"] == 1
    assert report["has_issues"] is True


def test_align_price_data_inner_drops_missing_dates() -> None:
    prices = pd.DataFrame(
        {"a": [1.0, 2.0, 3.0], "b": [1.0, None, 3.0]},
        index=pd.date_range("2024-01-01", periods=3),
    )
    aligned = align_price_data(prices)
    assert aligned.index.tolist() == [pd.Timestamp("2024-01-01"), pd.Timestamp("2024-01-03")]
