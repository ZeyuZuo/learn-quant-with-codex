import pandas as pd
import pytest

from quant_learning.strategies import buy_and_hold_signal, momentum_signal, moving_average_crossover


def test_buy_and_hold_signal_starts_flat() -> None:
    prices = pd.Series([100.0, 101.0, 102.0])
    signal = buy_and_hold_signal(prices)
    assert signal.tolist() == [0.0, 1.0, 1.0]


def test_moving_average_crossover_rejects_invalid_windows() -> None:
    prices = pd.Series([100.0, 101.0, 102.0])
    with pytest.raises(ValueError):
        moving_average_crossover(prices, fast_window=5, slow_window=5)


def test_moving_average_crossover_outputs_aligned_signal() -> None:
    prices = pd.Series([100.0, 101.0, 102.0, 103.0, 104.0])
    signal = moving_average_crossover(prices, fast_window=2, slow_window=3)
    assert signal.index.equals(prices.index)
    assert signal.iloc[-1] == 1.0


def test_momentum_signal() -> None:
    prices = pd.Series([100.0, 99.0, 102.0, 103.0])
    signal = momentum_signal(prices, lookback=1)
    assert signal.tolist() == [0.0, 0.0, 1.0, 1.0]
