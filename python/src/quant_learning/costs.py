from __future__ import annotations

import pandas as pd


def calculate_turnover(positions: pd.Series | pd.DataFrame) -> pd.Series:
    changes = positions.astype(float).diff().abs()
    if isinstance(positions, pd.DataFrame):
        first = positions.astype(float).abs().sum(axis=1).iloc[0] if not positions.empty else 0.0
        turnover = changes.sum(axis=1).fillna(0.0)
        if not turnover.empty:
            turnover.iloc[0] = first
        turnover.name = "turnover"
        return turnover

    turnover = changes.fillna(positions.astype(float).abs())
    turnover.name = "turnover"
    return turnover


def apply_transaction_costs(
    returns: pd.Series,
    positions: pd.Series | pd.DataFrame,
    commission_bps: float = 0.0,
    slippage_bps: float = 0.0,
) -> pd.Series:
    if commission_bps < 0 or slippage_bps < 0:
        raise ValueError("costs must be non-negative")
    turnover = calculate_turnover(positions).reindex(returns.index).fillna(0.0)
    cost_rate = (commission_bps + slippage_bps) / 10_000
    adjusted = returns.astype(float) - turnover * cost_rate
    adjusted.name = returns.name or "returns"
    return adjusted
