import pandas as pd

from quant_learning.backtest import BacktestConfig, run_backtest
from quant_learning.reports import (
    generate_backtest_report,
    generate_capstone_template,
    paper_signal_log,
    save_capstone_template,
    validate_capstone_report,
)
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
记录 OHLCV 检查、复权列选择和日期范围。
## 策略
策略生成 signal。
## 回测
signal 转 position，默认滞后一日。
## 基准
与 buy and hold 和 SPY benchmark 对比。
## 成本
记录 commission_bps、slippage_bps 和成本影响。
## 参数
执行参数扫描。
## 样本外
记录样本外验证。
## 风险
风险 风险 风险 风险 风险

## 测试
运行 pytest，测试通过。
"""
    result = validate_capstone_report(markdown)
    assert result["is_complete"] is True
    assert result["missing_sections"] == []
    assert result["missing_evidence"] == []


def test_validate_capstone_report_flags_missing_parts() -> None:
    result = validate_capstone_report("只有一段收益很高的描述")
    assert result["is_complete"] is False
    assert "数据" in result["missing_sections"]
    assert "数据质量" in result["missing_evidence"]
    assert result["has_disclaimer"] is False


def test_generate_capstone_template_is_valid() -> None:
    template = generate_capstone_template("ma")
    result = validate_capstone_report(template)
    assert result["is_complete"] is True
    assert "Final Research Report: ma" in template


def test_save_capstone_template(tmp_path) -> None:
    output = tmp_path / "report.md"
    save_capstone_template(output, strategy_name="demo")
    assert output.exists()
    assert validate_capstone_report(output.read_text(encoding="utf-8"))["is_complete"] is True
