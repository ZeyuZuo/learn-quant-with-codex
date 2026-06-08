import pandas as pd

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.reports import generate_backtest_report, paper_signal_log, validate_capstone_report
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


def test_validate_capstone_report_checks_sections_and_risk_statement() -> None:
    markdown = """
教育用途，不构成投资建议；历史回测结果不代表未来收益。

## 数据
## 策略
## 回测
## 基准
## 成本
## 参数
## 样本外
## 风险
风险 风险 风险 风险 风险
"""
    result = validate_capstone_report(markdown)
    assert result["is_complete"] is True
    assert result["missing_sections"] == []


def test_validate_capstone_report_flags_missing_parts() -> None:
    result = validate_capstone_report("只有一段收益很高的描述")
    assert result["is_complete"] is False
    assert "数据" in result["missing_sections"]
    assert result["has_disclaimer"] is False
