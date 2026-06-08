from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pandas as pd

from quant_learning.backtest import BacktestResult

DISCLAIMER = "教育用途，不构成投资建议；历史回测结果不代表未来收益。"

CAPSTONE_REQUIRED_SECTIONS = [
    "数据",
    "策略",
    "回测",
    "基准",
    "成本",
    "参数",
    "样本外",
    "风险",
]


def generate_backtest_report(result: BacktestResult) -> dict[str, Any]:
    return {
        "name": result.config.name,
        "disclaimer": DISCLAIMER,
        "config": {
            "signal_lag": result.config.signal_lag,
            "commission_bps": result.config.commission_bps,
            "slippage_bps": result.config.slippage_bps,
            "periods_per_year": result.config.periods_per_year,
        },
        "date_range": {
            "start": None if result.equity_curve.empty else str(result.equity_curve.index.min().date()),
            "end": None if result.equity_curve.empty else str(result.equity_curve.index.max().date()),
        },
        "metrics": result.metrics,
    }


def save_report_json(report: dict[str, Any], path: str | Path) -> None:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")


def save_report_markdown(report: dict[str, Any], path: str | Path) -> None:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    metric_lines = "\n".join(f"- `{key}`: {value}" for key, value in report.get("metrics", {}).items())
    content = f"""# Backtest Report: {report.get("name", "strategy")}

{report.get("disclaimer", DISCLAIMER)}

## Date Range

- Start: {report.get("date_range", {}).get("start")}
- End: {report.get("date_range", {}).get("end")}

## Metrics

{metric_lines}
"""
    output.write_text(content, encoding="utf-8")


def paper_signal_log(date: Any, symbol: str, signal: float, reason: str) -> dict[str, Any]:
    return {
        "date": str(pd.Timestamp(date).date()),
        "symbol": symbol,
        "signal": float(signal),
        "reason": reason,
        "note": "paper log only; no order is sent",
        "disclaimer": DISCLAIMER,
    }


def validate_capstone_report(markdown_text: str) -> dict[str, Any]:
    """Check whether a learning report contains the required capstone parts."""

    missing_sections = [section for section in CAPSTONE_REQUIRED_SECTIONS if section not in markdown_text]
    has_disclaimer = "不构成投资建议" in markdown_text and "不代表未来收益" in markdown_text
    risk_mentions = markdown_text.count("风险") + markdown_text.lower().count("bias")
    return {
        "is_complete": not missing_sections and has_disclaimer and risk_mentions >= 5,
        "missing_sections": missing_sections,
        "has_disclaimer": has_disclaimer,
        "risk_mentions": risk_mentions,
    }
