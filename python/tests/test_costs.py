import pandas as pd
import pytest

from quant_learning.costs import apply_transaction_costs, calculate_turnover


def test_calculate_turnover_for_series() -> None:
    positions = pd.Series([0.0, 1.0, 1.0, 0.0])
    turnover = calculate_turnover(positions)
    assert turnover.tolist() == pytest.approx([0.0, 1.0, 0.0, 1.0])


def test_apply_transaction_costs() -> None:
    returns = pd.Series([0.01, 0.02])
    positions = pd.Series([1.0, 0.0])
    adjusted = apply_transaction_costs(returns, positions, commission_bps=10, slippage_bps=0)
    assert adjusted.tolist() == pytest.approx([0.009, 0.019])
