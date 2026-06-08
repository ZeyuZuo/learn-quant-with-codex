import pandas as pd

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.reports import generate_backtest_report, paper_signal_log
from quant_learning.strategies import buy_and_hold_signal


def test_report_contains_disclaimer() -> None:
    prices = pd.Series([100.0, 101.0, 102.0], index=pd.date_range("2024-01-01", periods=3))
    result = run_backtest(prices, buy_and_hold_signal(prices), BacktestConfig(name="report_test"))
    report = generate_backtest_report(result)
    assert "不构成投资建议" in report["disclaimer"]
    assert report["name"] == "report_test"


def test_paper_signal_log_never_sends_order() -> None:
    log = paper_signal_log("2024-01-01", "SPY", 1.0, "example signal")
    assert log["symbol"] == "SPY"
    assert "no order is sent" in log["note"]
    assert "不构成投资建议" in log["disclaimer"]
