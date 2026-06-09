from quant_learning.reports import validate_capstone_report


def main() -> None:
    sample_report = """
# Final Research Report

教育用途，不构成投资建议；历史回测结果不代表未来收益。

## 数据
使用本地样例数据，并检查 OHLCV、复权价格和日期范围。

## 策略
使用双均线学习策略生成 signal。

## 回测
默认 signal 转 position 滞后一日。

## 基准
与 buy and hold 和 SPY benchmark 比较。

## 成本
比较无成本和有成本结果，记录 commission、slippage 和成本影响。

## 参数
扫描 fast/slow window。

## 样本外
按日期切分样本内和样本外。

## 风险
风险 1：look-ahead bias。
风险 2：overfitting bias。
风险 3：交易成本简化。
风险 4：样例数据很小。
风险 5：未来市场环境可能变化。

## 测试
运行 pytest，测试通过。
"""
    print(validate_capstone_report(sample_report))


if __name__ == "__main__":
    main()
