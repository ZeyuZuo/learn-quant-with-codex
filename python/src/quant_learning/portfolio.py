from __future__ import annotations

import pandas as pd

from quant_learning.data import align_price_data
from quant_learning.metrics import calculate_returns
from quant_learning.positions import equal_weight_positions, signals_to_positions


def calculate_asset_returns(prices: pd.DataFrame, align: str = "inner") -> pd.DataFrame:
    """Convert aligned multi-asset prices into daily returns.

    The function keeps the column names, sorts dates, and drops the first row
    where percentage change has no previous price. It is intentionally small so
    students can trace portfolio returns by hand.
    """

    if prices.empty:
        return pd.DataFrame(index=prices.index, columns=prices.columns, dtype=float)
    aligned = align_price_data(prices, how=align)
    return aligned.astype(float).pct_change().dropna(how="all")


def equal_weight_portfolio(returns: pd.DataFrame) -> pd.Series:
    """Compute a simple equal-weight portfolio return series."""

    if returns.empty:
        return pd.Series(dtype=float, name="portfolio_returns")
    portfolio_returns = returns.astype(float).mean(axis=1)
    portfolio_returns.name = "portfolio_returns"
    return portfolio_returns


def portfolio_returns_from_weights(returns: pd.DataFrame, weights: pd.DataFrame) -> pd.Series:
    """Combine asset returns and per-asset weights into portfolio returns."""

    if returns.empty:
        return pd.Series(dtype=float, name="portfolio_returns")
    aligned_weights = weights.reindex(returns.index).fillna(0.0).astype(float)
    portfolio_returns = returns.astype(float).mul(aligned_weights, axis=0).sum(axis=1)
    portfolio_returns.name = "portfolio_returns"
    return portfolio_returns


def equal_weight_positions_from_signals(signals: pd.DataFrame, lag: int = 1) -> pd.DataFrame:
    """Lag multi-asset signals and allocate equal weight across active assets."""

    positions = signals_to_positions(signals, lag=lag)
    if not isinstance(positions, pd.DataFrame):
        raise TypeError("signals must be a DataFrame for multi-asset positions")
    return equal_weight_positions(positions)


def momentum_rotation_signal(prices: pd.DataFrame, lookback: int, top_n: int = 1) -> pd.DataFrame:
    """Select the top-n assets by lookback return for a rotation lesson."""

    if not isinstance(lookback, int) or lookback <= 0:
        raise ValueError("lookback must be a positive integer")
    if not isinstance(top_n, int) or top_n <= 0:
        raise ValueError("top_n must be a positive integer")
    if top_n > len(prices.columns):
        raise ValueError("top_n cannot exceed number of assets")

    momentum = prices.astype(float).pct_change(lookback)
    ranks = momentum.rank(axis=1, ascending=False, method="first")
    return (ranks <= top_n).astype(float).fillna(0.0)


def run_equal_weight_portfolio(prices: pd.DataFrame) -> pd.Series:
    """Convenience helper used by examples and Module 7 lessons."""

    returns = calculate_asset_returns(prices)
    return equal_weight_portfolio(returns)
