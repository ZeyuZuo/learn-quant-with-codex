import pandas as pd
import pytest

from quant_learning.positions import equal_weight_positions, normalize_weights, rebalance_weights, signals_to_positions


def test_signals_to_positions_lags_by_default() -> None:
    signals = pd.Series([0, 1, 1, 0], index=pd.date_range("2024-01-01", periods=4))
    positions = signals_to_positions(signals)
    assert positions.tolist() == [0, 0, 1, 1]


def test_signals_to_positions_rejects_negative_lag() -> None:
    with pytest.raises(ValueError):
        signals_to_positions(pd.Series([1, 0]), lag=-1)


def test_normalize_weights_series() -> None:
    weights = normalize_weights(pd.Series([2.0, -2.0]))
    assert weights.abs().sum() == pytest.approx(1.0)


def test_equal_weight_positions() -> None:
    signals = pd.DataFrame({"a": [1, 1, 0], "b": [1, 0, 0]})
    weights = equal_weight_positions(signals)
    assert weights.iloc[0].tolist() == pytest.approx([0.5, 0.5])
    assert weights.iloc[2].tolist() == pytest.approx([0.0, 0.0])


def test_rebalance_weights_returns_normalized_schedule() -> None:
    dates = pd.date_range("2024-01-01", periods=40)
    target = pd.DataFrame({"a": 0.6, "b": 0.4}, index=dates)
    weights = rebalance_weights(target, frequency="ME")
    assert weights.iloc[-1].sum() == pytest.approx(1.0)
