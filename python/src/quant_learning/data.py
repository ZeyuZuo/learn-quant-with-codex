from __future__ import annotations

from pathlib import Path
from typing import Any

import pandas as pd

REQUIRED_OHLCV_COLUMNS = {"open", "high", "low", "close", "volume"}


def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    renamed = {column: str(column).strip().lower().replace(" ", "_") for column in df.columns}
    return df.rename(columns=renamed)


def read_price_csv(path: str | Path) -> pd.DataFrame:
    """Read a local OHLCV CSV file with a date column.

    The function sorts by date and uses a DatetimeIndex. It does not drop
    duplicate dates or fill missing values; those issues are reported by
    validate_price_data so students can inspect them explicitly.
    """

    df = pd.read_csv(path)
    df = _normalize_columns(df)
    if "date" not in df.columns:
        raise ValueError("price CSV must contain a date column")
    df["date"] = pd.to_datetime(df["date"], errors="raise")
    df = df.sort_values("date").set_index("date")
    return df


def validate_ohlcv_columns(df: pd.DataFrame) -> None:
    missing = REQUIRED_OHLCV_COLUMNS.difference(df.columns)
    if missing:
        raise ValueError(f"missing OHLCV columns: {sorted(missing)}")


def validate_price_data(df: pd.DataFrame) -> dict[str, Any]:
    validate_ohlcv_columns(df)
    if not isinstance(df.index, pd.DatetimeIndex):
        raise TypeError("price data must use a DatetimeIndex")

    report: dict[str, Any] = {
        "rows": int(len(df)),
        "start": None if df.empty else str(df.index.min().date()),
        "end": None if df.empty else str(df.index.max().date()),
        "missing_values": int(df.isna().sum().sum()),
        "duplicate_dates": int(df.index.duplicated().sum()),
        "is_monotonic": bool(df.index.is_monotonic_increasing),
        "non_positive_close": int((df["close"] <= 0).sum()),
        "non_positive_volume": int((df["volume"] < 0).sum()),
    }
    report["has_issues"] = any(
        [
            report["missing_values"] > 0,
            report["duplicate_dates"] > 0,
            not report["is_monotonic"],
            report["non_positive_close"] > 0,
            report["non_positive_volume"] > 0,
        ]
    )
    return report


def choose_price_column(df: pd.DataFrame, adjusted: bool = True) -> pd.Series:
    if adjusted and "adj_close" in df.columns:
        return df["adj_close"].rename("price")
    if "close" not in df.columns:
        raise ValueError("price data must contain close")
    return df["close"].rename("price")
