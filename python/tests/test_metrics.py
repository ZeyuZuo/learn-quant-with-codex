import math

import pandas as pd
import pytest

from quant_learning.metrics import (
    annualized_return,
    annualized_volatility,
    calculate_returns,
    compound_returns,
    drawdown_series,
    max_drawdown,
    profit_loss_ratio,
    sharpe_ratio,
    win_rate,
)


def test_calculate_returns() -> None:
    prices = pd.Series([100.0, 110.0, 99.0])
    returns = calculate_returns(prices)
    assert returns.tolist() == pytest.approx([0.1, -0.1])


def test_compound_returns() -> None:
    returns = pd.Series([0.1, -0.1])
    equity = compound_returns(returns)
    assert equity.iloc[-1] == pytest.approx(0.99)


def test_annualized_return() -> None:
    returns = pd.Series([0.01] * 252)
    assert annualized_return(returns) == pytest.approx((1.01**252) - 1)


def test_annualized_volatility() -> None:
    returns = pd.Series([0.01, -0.01, 0.02, -0.02])
    assert annualized_volatility(returns) > 0


def test_drawdown_and_max_drawdown() -> None:
    equity = pd.Series([1.0, 1.2, 0.96, 1.3])
    drawdown = drawdown_series(equity)
    assert drawdown.iloc[2] == pytest.approx(-0.2)
    assert max_drawdown(equity) == pytest.approx(-0.2)


def test_sharpe_ratio_zero_volatility_returns_nan() -> None:
    returns = pd.Series([0.01, 0.01, 0.01])
    assert math.isnan(sharpe_ratio(returns))


def test_trade_metrics() -> None:
    trades = pd.Series([0.1, -0.05, 0.2, -0.1])
    assert win_rate(trades) == pytest.approx(0.5)
    assert profit_loss_ratio(trades) == pytest.approx(2.0)
