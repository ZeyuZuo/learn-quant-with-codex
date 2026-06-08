from __future__ import annotations

import numpy as np
import pandas as pd

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.metrics import performance_summary
from quant_learning.strategies import moving_average_crossover


def scan_moving_average_parameters(
    prices: pd.Series,
    fast_windows: list[int],
    slow_windows: list[int],
    config: BacktestConfig | None = None,
) -> pd.DataFrame:
    rows = []
    for fast in fast_windows:
        for slow in slow_windows:
            if fast >= slow:
                continue
            signals = moving_average_crossover(prices, fast, slow)
            result = run_backtest(prices, signals, config or BacktestConfig(name=f"ma_{fast}_{slow}"))
            rows.append({"fast_window": fast, "slow_window": slow, **result.metrics})
    return pd.DataFrame(rows)


def train_test_split_time_series(data: pd.Series | pd.DataFrame, split_date: str) -> tuple[pd.Series | pd.DataFrame, pd.Series | pd.DataFrame]:
    split = pd.Timestamp(split_date)
    return data.loc[data.index <= split], data.loc[data.index > split]


def evaluate_in_sample_out_of_sample(
    prices: pd.Series,
    params: dict[str, int],
    split_date: str,
    config: BacktestConfig | None = None,
) -> dict[str, dict[str, float]]:
    train, test = train_test_split_time_series(prices, split_date)
    train_signal = moving_average_crossover(train, params["fast_window"], params["slow_window"])
    test_signal = moving_average_crossover(test, params["fast_window"], params["slow_window"])
    cfg = config or BacktestConfig(name="ma_oos")
    return {
        "in_sample": run_backtest(train, train_signal, cfg).metrics,
        "out_of_sample": run_backtest(test, test_signal, cfg).metrics,
    }


def simulate_random_strategies(prices: pd.Series, n_strategies: int, seed: int = 42) -> pd.DataFrame:
    if n_strategies <= 0:
        raise ValueError("n_strategies must be positive")
    rng = np.random.default_rng(seed)
    rows = []
    for strategy_id in range(n_strategies):
        raw = rng.integers(0, 2, size=len(prices))
        signals = pd.Series(raw, index=prices.index, dtype=float)
        result = run_backtest(prices, signals, BacktestConfig(name=f"random_{strategy_id}"))
        rows.append({"strategy_id": strategy_id, **result.metrics})
    return pd.DataFrame(rows)


def yearly_performance(returns: pd.Series) -> pd.DataFrame:
    clean = returns.dropna().astype(float)
    rows = []
    for year, group in clean.groupby(clean.index.year):
        rows.append({"year": int(year), **performance_summary(group)})
    return pd.DataFrame(rows)
