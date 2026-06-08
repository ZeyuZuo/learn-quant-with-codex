from __future__ import annotations

import math

import numpy as np
import pandas as pd


def calculate_returns(prices: pd.Series) -> pd.Series:
    clean = prices.dropna().astype(float)
    if clean.empty:
        return pd.Series(dtype=float, name="returns")
    returns = clean.pct_change().dropna()
    returns.name = "returns"
    return returns


def compound_returns(returns: pd.Series) -> pd.Series:
    clean = returns.dropna().astype(float)
    if clean.empty:
        return pd.Series(dtype=float, name="equity")
    equity = (1 + clean).cumprod()
    equity.name = "equity"
    return equity


def annualized_return(returns: pd.Series, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if clean.empty:
        return float("nan")
    ending_equity = float((1 + clean).prod())
    if ending_equity <= 0:
        return float("nan")
    return ending_equity ** (periods_per_year / len(clean)) - 1


def annualized_volatility(returns: pd.Series, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if len(clean) < 2:
        return float("nan")
    return float(clean.std(ddof=1) * math.sqrt(periods_per_year))


def drawdown_series(equity: pd.Series) -> pd.Series:
    clean = equity.dropna().astype(float)
    if clean.empty:
        return pd.Series(dtype=float, name="drawdown")
    running_max = clean.cummax()
    drawdown = clean / running_max - 1
    drawdown.name = "drawdown"
    return drawdown


def max_drawdown(equity: pd.Series) -> float:
    drawdown = drawdown_series(equity)
    if drawdown.empty:
        return float("nan")
    return float(drawdown.min())


def sharpe_ratio(
    returns: pd.Series,
    risk_free_rate: float = 0.0,
    periods_per_year: int = 252,
) -> float:
    clean = returns.dropna().astype(float)
    if len(clean) < 2:
        return float("nan")
    daily_rf = risk_free_rate / periods_per_year
    excess = clean - daily_rf
    volatility = clean.std(ddof=1)
    if volatility == 0 or np.isnan(volatility):
        return float("nan")
    return float(excess.mean() / volatility * math.sqrt(periods_per_year))


def win_rate(trade_returns: pd.Series) -> float:
    clean = trade_returns.dropna().astype(float)
    if clean.empty:
        return float("nan")
    return float((clean > 0).mean())


def profit_loss_ratio(trade_returns: pd.Series) -> float:
    clean = trade_returns.dropna().astype(float)
    wins = clean[clean > 0]
    losses = clean[clean < 0]
    if wins.empty or losses.empty:
        return float("nan")
    return float(wins.mean() / abs(losses.mean()))


def performance_summary(returns: pd.Series, equity: pd.Series | None = None) -> dict[str, float]:
    clean_returns = returns.dropna().astype(float)
    clean_equity = compound_returns(clean_returns) if equity is None else equity.dropna().astype(float)
    return {
        "total_return": float(clean_equity.iloc[-1] - 1) if not clean_equity.empty else float("nan"),
        "annualized_return": annualized_return(clean_returns),
        "annualized_volatility": annualized_volatility(clean_returns),
        "max_drawdown": max_drawdown(clean_equity),
        "sharpe_ratio": sharpe_ratio(clean_returns),
    }
