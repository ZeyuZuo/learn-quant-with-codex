from pathlib import Path

from quant_learning.data import choose_price_column, read_price_csv
from quant_learning.experiments import evaluate_in_sample_out_of_sample, scan_moving_average_parameters
from quant_learning.reports import DISCLAIMER

from _example_utils import markdown_dataframe_table, markdown_metric_table, save_markdown_report


def main() -> None:
    data_path = Path(__file__).resolve().parents[1] / "data" / "sample_prices.csv"
    df = read_price_csv(data_path)
    prices = choose_price_column(df, adjusted=True)
    scan = scan_moving_average_parameters(prices, fast_windows=[2, 3, 4], slow_windows=[3, 5, 6])
    best = scan.sort_values("sharpe_ratio", ascending=False, na_position="last").iloc[0]
    params = {"fast_window": int(best["fast_window"]), "slow_window": int(best["slow_window"])}
    split_date = str(prices.index[len(prices) // 2].date())
    oos = evaluate_in_sample_out_of_sample(prices, params, split_date)

    markdown = f"""# 参数扫描和样本外报告

{DISCLAIMER}

## 目的

这份 Module 8 报告演示为什么历史最优参数只能作为研究线索，不能写成未来收益承诺。

## 扫描网格

{markdown_dataframe_table(scan)}

## 样本内候选参数

- Fast window: `{params["fast_window"]}`
- Slow window: `{params["slow_window"]}`
- Split date: `{split_date}`

## 样本内指标

{markdown_metric_table(oos["in_sample"])}

## 样本外指标

{markdown_metric_table(oos["out_of_sample"])}

## 学习笔记

- 扫描会跳过 `fast_window >= slow_window` 的非法组合。
- 看过历史后挑最好的一格，会产生过拟合风险。
- 样本外只是更严格的历史检查，不是未来表现证明。
"""
    output = save_markdown_report("parameter_scan_oos_report.md", markdown)
    print({"path": str(output), "selected_params": params, "split_date": split_date})


if __name__ == "__main__":
    main()
