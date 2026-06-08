from __future__ import annotations

from dataclasses import dataclass

import pandas as pd

from quant_learning.costs import apply_transaction_costs
from quant_learning.metrics import calculate_returns, compound_returns, performance_summary
from quant_learning.positions import signals_to_positions


@dataclass(frozen=True)
class BacktestConfig:
    name: str = "strategy"
    signal_lag: int = 1
    commission_bps: float = 0.0
    slippage_bps: float = 0.0
    periods_per_year: int = 252


@dataclass(frozen=True)
class BacktestResult:
    config: BacktestConfig
    asset_returns: pd.Series
    positions: pd.Series
    strategy_returns: pd.Series
    equity_curve: pd.Series
    metrics: dict[str, float]

    @classmethod
    def from_series(
        cls,
        config: BacktestConfig,
        asset_returns: pd.Series,
        positions: pd.Series,
        strategy_returns: pd.Series,
        equity_curve: pd.Series,
    ) -> "BacktestResult":
        return cls(
            config=config,
            asset_returns=asset_returns,
            positions=positions,
            strategy_returns=strategy_returns,
            equity_curve=equity_curve,
            metrics=performance_summary(strategy_returns, equity_curve),
        )


def run_backtest(prices: pd.Series, signals: pd.Series, config: BacktestConfig | None = None) -> BacktestResult:
    cfg = config or BacktestConfig()
    asset_returns = calculate_returns(prices)
    positions = signals_to_positions(signals, lag=cfg.signal_lag).reindex(asset_returns.index).fillna(0.0)
    strategy_returns = asset_returns * positions
    strategy_returns.name = "strategy_returns"
    strategy_returns = apply_transaction_costs(
        strategy_returns,
        positions,
        commission_bps=cfg.commission_bps,
        slippage_bps=cfg.slippage_bps,
    )
    equity = compound_returns(strategy_returns)
    return BacktestResult.from_series(cfg, asset_returns, positions, strategy_returns, equity)


def compare_strategies(results: dict[str, BacktestResult]) -> pd.DataFrame:
    rows = []
    for name, result in results.items():
        row = {"name": name, **result.metrics}
        rows.append(row)
    return pd.DataFrame(rows).set_index("name") if rows else pd.DataFrame()
