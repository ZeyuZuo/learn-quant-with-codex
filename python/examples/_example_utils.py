from __future__ import annotations

import json
import math
from pathlib import Path
from typing import Any

import pandas as pd


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def python_root() -> Path:
    return Path(__file__).resolve().parents[1]


def sample_prices_path() -> Path:
    return python_root() / "data" / "sample_prices.csv"


def reports_dir() -> Path:
    path = repo_root() / "reports"
    path.mkdir(parents=True, exist_ok=True)
    return path


def _to_jsonable(value: Any) -> Any:
    if isinstance(value, dict):
        return {str(key): _to_jsonable(item) for key, item in value.items()}
    if isinstance(value, list | tuple):
        return [_to_jsonable(item) for item in value]
    if isinstance(value, pd.Timestamp):
        return value.isoformat()
    if hasattr(value, "item"):
        return _to_jsonable(value.item())
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return None
    return value


def save_json_report(filename: str, report: dict[str, Any]) -> Path:
    output = reports_dir() / filename
    output.write_text(json.dumps(_to_jsonable(report), indent=2, ensure_ascii=False), encoding="utf-8")
    return output


def save_markdown_report(filename: str, content: str) -> Path:
    output = reports_dir() / filename
    output.write_text(content, encoding="utf-8")
    return output


def series_points(series: pd.Series, limit: int = 8) -> list[dict[str, Any]]:
    head = series.dropna().head(limit)
    return [{"date": str(index.date()), "value": float(value)} for index, value in head.items()]


def markdown_metric_table(metrics: dict[str, float]) -> str:
    lines = ["| Metric | Value |", "| --- | --- |"]
    for key, value in metrics.items():
        if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
            rendered = "n/a"
        elif isinstance(value, float):
            rendered = f"{value:.6f}"
        else:
            rendered = str(value)
        lines.append(f"| `{key}` | {rendered} |")
    return "\n".join(lines)


def markdown_dataframe_table(df: pd.DataFrame) -> str:
    if df.empty:
        return "_No rows._"

    table = df.reset_index()
    columns = [str(column) for column in table.columns]
    lines = [
        "| " + " | ".join(columns) + " |",
        "| " + " | ".join("---" for _ in columns) + " |",
    ]
    for _, row in table.iterrows():
        values = []
        for value in row:
            if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
                values.append("n/a")
            elif isinstance(value, float):
                values.append(f"{value:.6f}")
            else:
                values.append(str(value))
        lines.append("| " + " | ".join(values) + " |")
    return "\n".join(lines)
