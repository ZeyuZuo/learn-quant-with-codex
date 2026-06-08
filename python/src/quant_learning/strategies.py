from __future__ import annotations

import pandas as pd

from quant_learning.portfolio import equal_weight_portfolio as _equal_weight_portfolio
from quant_learning.portfolio import momentum_rotation_signal as _momentum_rotation_signal


def _require_positive_int(value: int, name: str) -> None:
    if not isinstance(value, int) or value <= 0:
        raise ValueError(f"{name} must be a positive integer")


def buy_and_hold_signal(prices: pd.Series) -> pd.Series:
    signal = pd.Series(1.0, index=prices.index, name="signal")
    if not signal.empty:
        signal.iloc[0] = 0.0
    return signal


def moving_average_crossover(prices: pd.Series, fast_window: int, slow_window: int) -> pd.Series:
    _require_positive_int(fast_window, "fast_window")
    _require_positive_int(slow_window, "slow_window")
    if fast_window >= slow_window:
        raise ValueError("fast_window must be smaller than slow_window")
    clean = prices.astype(float)
    fast = clean.rolling(fast_window, min_periods=fast_window).mean()
    slow = clean.rolling(slow_window, min_periods=slow_window).mean()
    signal = (fast > slow).astype(float).fillna(0.0)
    signal.name = "signal"
    return signal


def momentum_signal(prices: pd.Series, lookback: int) -> pd.Series:
    _require_positive_int(lookback, "lookback")
    momentum = prices.astype(float).pct_change(lookback)
    signal = (momentum > 0).astype(float).fillna(0.0)
    signal.name = "signal"
    return signal


def mean_reversion_signal(prices: pd.Series, window: int, threshold: float) -> pd.Series:
    _require_positive_int(window, "window")
    if threshold <= 0:
        raise ValueError("threshold must be positive")
    clean = prices.astype(float)
    rolling_mean = clean.rolling(window, min_periods=window).mean()
    rolling_std = clean.rolling(window, min_periods=window).std()
    z_score = (clean - rolling_mean) / rolling_std
    signal = (z_score < -threshold).astype(float).fillna(0.0)
    signal.name = "signal"
    return signal


def equal_weight_portfolio(returns: pd.DataFrame) -> pd.Series:
    """Backward-compatible import path for the Module 7 portfolio lesson."""

    return _equal_weight_portfolio(returns)


def momentum_rotation_signal(prices: pd.DataFrame, lookback: int, top_n: int = 1) -> pd.DataFrame:
    """Backward-compatible import path for the Module 7 rotation lesson."""

    return _momentum_rotation_signal(prices, lookback=lookback, top_n=top_n)
