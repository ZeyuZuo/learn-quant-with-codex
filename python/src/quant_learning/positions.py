from __future__ import annotations

import pandas as pd


def signals_to_positions(signals: pd.Series | pd.DataFrame, lag: int = 1) -> pd.Series | pd.DataFrame:
    if lag < 0:
        raise ValueError("lag must be non-negative")
    return signals.shift(lag).fillna(0.0).astype(float)


def normalize_weights(weights: pd.Series | pd.DataFrame) -> pd.Series | pd.DataFrame:
    if isinstance(weights, pd.Series):
        total = weights.abs().sum()
        if total == 0:
            return weights.astype(float)
        return weights.astype(float) / total

    totals = weights.abs().sum(axis=1)
    normalized = weights.astype(float).div(totals.replace(0, pd.NA), axis=0)
    return normalized.fillna(0.0)


def equal_weight_positions(signals: pd.DataFrame) -> pd.DataFrame:
    active_counts = signals.astype(float).abs().sum(axis=1)
    weights = signals.astype(float).div(active_counts.replace(0, pd.NA), axis=0)
    return weights.fillna(0.0)


def rebalance_weights(target_weights: pd.DataFrame, frequency: str = "ME") -> pd.DataFrame:
    """Create a simple calendar rebalanced weight schedule.

    `frequency` uses pandas offset aliases. "ME" means month end.
    """

    if target_weights.empty:
        return target_weights.astype(float)
    sampled = target_weights.astype(float).resample(frequency).last()
    rebalanced = sampled.reindex(target_weights.index).ffill().fillna(0.0)
    return normalize_weights(rebalanced)
