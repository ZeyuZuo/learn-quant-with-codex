import pandas as pd
import pytest

from quant_learning.backtest import BacktestConfig, compare_strategies, run_backtest
from quant_learning.strategies import buy_and_hold_signal


def test_run_backtest_lags_signal_before_applying_returns() -> None:
    prices = pd.Series([100.0, 200.0, 200.0], index=pd.date_range("2024-01-01", periods=3))
    signals = pd.Series([0.0, 1.0, 1.0], index=prices.index)
    result = run_backtest(prices, signals, BacktestConfig(signal_lag=1))
    assert result.strategy_returns.iloc[0] == pytest.approx(0.0)
    assert result.equity_curve.iloc[-1] == pytest.approx(1.0)


def test_run_backtest_buy_and_hold() -> None:
    prices = pd.Series([100.0, 110.0, 121.0], index=pd.date_range("2024-01-01", periods=3))
    result = run_backtest(prices, buy_and_hold_signal(prices), BacktestConfig(signal_lag=1))
    assert result.equity_curve.iloc[-1] == pytest.approx(1.1)


def test_compare_strategies() -> None:
    prices = pd.Series([100.0, 110.0, 121.0], index=pd.date_range("2024-01-01", periods=3))
    result = run_backtest(prices, buy_and_hold_signal(prices), BacktestConfig(name="bh"))
    comparison = compare_strategies({"bh": result})
    assert "total_return" in comparison.columns
    assert comparison.index.tolist() == ["bh"]
