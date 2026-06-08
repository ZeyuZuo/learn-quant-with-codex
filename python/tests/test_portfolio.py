import pandas as pd
import pytest

from quant_learning.portfolio import (
    calculate_asset_returns,
    equal_weight_portfolio,
    equal_weight_positions_from_signals,
    momentum_rotation_signal,
    portfolio_returns_from_weights,
    run_equal_weight_portfolio,
)


def test_calculate_asset_returns_aligns_and_preserves_columns() -> None:
    prices = pd.DataFrame(
        {"a": [100.0, 110.0, 121.0], "b": [50.0, None, 55.0]},
        index=pd.date_range("2024-01-01", periods=3),
    )

    returns = calculate_asset_returns(prices)

    assert returns.columns.tolist() == ["a", "b"]
    assert returns.index.tolist() == [pd.Timestamp("2024-01-03")]
    assert returns.iloc[0].tolist() == pytest.approx([0.21, 0.10])


def test_equal_weight_portfolio_averages_asset_returns() -> None:
    returns = pd.DataFrame(
        {"a": [0.10, -0.02], "b": [0.00, 0.04]},
        index=pd.date_range("2024-01-02", periods=2),
    )

    portfolio = equal_weight_portfolio(returns)

    assert portfolio.name == "portfolio_returns"
    assert portfolio.tolist() == pytest.approx([0.05, 0.01])


def test_portfolio_returns_from_weights_uses_row_weights() -> None:
    returns = pd.DataFrame(
        {"a": [0.10, 0.10], "b": [0.00, -0.10]},
        index=pd.date_range("2024-01-02", periods=2),
    )
    weights = pd.DataFrame({"a": [1.0, 0.5], "b": [0.0, 0.5]}, index=returns.index)

    portfolio = portfolio_returns_from_weights(returns, weights)

    assert portfolio.tolist() == pytest.approx([0.10, 0.0])


def test_equal_weight_positions_from_signals_lags_then_allocates() -> None:
    signals = pd.DataFrame(
        {"a": [1.0, 1.0, 0.0], "b": [1.0, 0.0, 1.0]},
        index=pd.date_range("2024-01-01", periods=3),
    )

    positions = equal_weight_positions_from_signals(signals, lag=1)

    assert positions.iloc[0].tolist() == pytest.approx([0.0, 0.0])
    assert positions.iloc[1].tolist() == pytest.approx([0.5, 0.5])
    assert positions.iloc[2].tolist() == pytest.approx([1.0, 0.0])


def test_momentum_rotation_signal_selects_top_assets() -> None:
    prices = pd.DataFrame(
        {"a": [100.0, 110.0, 121.0], "b": [100.0, 101.0, 102.0]},
        index=pd.date_range("2024-01-01", periods=3),
    )

    signals = momentum_rotation_signal(prices, lookback=1, top_n=1)

    assert signals.iloc[0].tolist() == pytest.approx([0.0, 0.0])
    assert signals.iloc[1].tolist() == pytest.approx([1.0, 0.0])
    assert signals.iloc[2].tolist() == pytest.approx([1.0, 0.0])


def test_run_equal_weight_portfolio_returns_series() -> None:
    prices = pd.DataFrame(
        {"a": [100.0, 110.0], "b": [100.0, 90.0]},
        index=pd.date_range("2024-01-01", periods=2),
    )

    portfolio = run_equal_weight_portfolio(prices)

    assert portfolio.tolist() == pytest.approx([0.0])
