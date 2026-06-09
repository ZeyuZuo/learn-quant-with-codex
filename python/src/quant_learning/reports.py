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
    "测试",
]

CAPSTONE_REQUIRED_EVIDENCE = {
    "数据质量": ["OHLCV", "复权", "日期"],
    "信号仓位": ["signal", "position"],
    "成本假设": ["commission", "slippage", "成本"],
    "基准比较": ["buy and hold", "SPY", "benchmark", "基准"],
    "参数实验": ["参数", "扫描"],
    "样本外验证": ["样本外"],
    "风险边界": ["不构成投资建议", "不代表未来收益"],
    "测试记录": ["pytest", "测试"],
}

CAPSTONE_TEMPLATE_SECTIONS = [
    ("数据", "说明数据文件、ticker、日期范围、OHLCV 检查结果，以及为什么选择 close 或 adj_close。"),
    ("策略", "写清楚策略假设、signal 生成方式、参数和失效场景。"),
    ("回测", "说明 BacktestConfig、signal_lag、position 生成方式、净值曲线和回撤曲线。"),
    ("基准", "至少和 buy and hold 或 SPY benchmark 比较，说明比较是否公平。"),
    ("成本", "列出 commission_bps、slippage_bps、turnover 假设，并比较有成本和无成本结果。"),
    ("参数", "记录参数扫描范围、跳过的非法组合、样本内最优参数和稳定性观察。"),
    ("样本外", "说明时间序列切分日期，比较样本内和样本外指标。"),
    ("风险", "至少列出 5 条限制、偏差或风险。"),
    ("测试", "记录 pytest 命令、测试范围和通过结果，说明测试不能证明未来收益。"),
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


def generate_capstone_template(strategy_name: str = "moving_average_crossover") -> str:
    section_text = "\n\n".join(
        f"""## {title}

{description}

- 待填写：
"""
        for title, description in CAPSTONE_TEMPLATE_SECTIONS
    )
    return f"""# Final Research Report: {strategy_name}

{DISCLAIMER}

> 本报告是 learn-quant-with-codex 的学习型 Capstone 产物。它用于复盘数据、代码、图表、回测假设和风险边界，不用于推荐任何证券或策略。

## 摘要

- 研究问题：这个学习策略在样例数据中表现如何？
- 核心结论：待填写。
- 最重要限制：待填写。

{section_text}

### 风险清单示例

- 风险 1：look-ahead bias，需要检查 signal 到 position 的滞后。
- 风险 2：overfitting bias，参数扫描可能挑到历史噪声。
- 风险 3：survivorship bias，样例数据不代表完整美股市场。
- 风险 4：交易成本模型是简化模型。
- 风险 5：历史回测结果不代表未来收益。
"""


def save_capstone_template(path: str | Path, strategy_name: str = "moving_average_crossover") -> None:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(generate_capstone_template(strategy_name), encoding="utf-8")


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
    missing_evidence = [
        label
        for label, keywords in CAPSTONE_REQUIRED_EVIDENCE.items()
        if not any(keyword.lower() in markdown_text.lower() for keyword in keywords)
    ]
    return {
        "is_complete": not missing_sections and not missing_evidence and has_disclaimer and risk_mentions >= 5,
        "missing_sections": missing_sections,
        "missing_evidence": missing_evidence,
        "has_disclaimer": has_disclaimer,
        "risk_mentions": risk_mentions,
    }
