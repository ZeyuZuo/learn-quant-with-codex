from __future__ import annotations

from quant_learning.data import choose_price_column, read_price_csv, validate_price_data
from quant_learning.reports import DISCLAIMER

from _example_utils import sample_prices_path, save_json_report, series_points


def main() -> None:
    df = read_price_csv(sample_prices_path())
    quality = validate_price_data(df)
    prices = choose_price_column(df, adjusted=True)

    report = {
        "title": "Module 1 数据质量报告",
        "disclaimer": DISCLAIMER,
        "source": str(sample_prices_path()),
        "selected_price_column": "adj_close" if "adj_close" in df.columns else "close",
        "quality": quality,
        "price_preview": series_points(prices),
        "learning_checks": [
            "在计算收益或回测之前，先确认 OHLCV 必要列存在。",
            "样例数据包含类似拆股的 close 断点，因此长期学习示例优先选择 adj_close。",
            "数据问题应先记录再处理；静默修复会让后续报告难以审查。",
        ],
        "common_misuse": "不要因为样例文件干净，就假设真实市场数据总是干净、授权清晰或没有复权差异。",
    }
    output = save_json_report("sample_prices_quality_report.json", report)
    print({"path": str(output), "has_issues": quality["has_issues"], "rows": quality["rows"]})


if __name__ == "__main__":
    main()
