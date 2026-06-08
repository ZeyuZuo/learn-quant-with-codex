# Python 量化学习项目

这是 `learn-quant-with-codex` 的配套 Python 项目。它用于课程中的数据处理、指标计算、策略实现、回测实验和报告生成。

它不是交易系统，不连接券商，不提供投资建议。

## 安装

```bash
uv sync
```

## 测试

```bash
uv run pytest
```

## 示例

```bash
uv run python examples/run_buy_and_hold.py
uv run python examples/run_moving_average.py
uv run python examples/run_parameter_scan.py
```

## 模块

- `data.py`：读取价格数据、检查 OHLCV、生成数据质量报告。
- `metrics.py`：收益率、复利、年化收益、波动率、回撤、夏普、胜率和盈亏比。
- `positions.py`：signal 到 position 的滞后转换、权重归一化。
- `costs.py`：换手和简化交易成本模型。
- `strategies.py`：buy and hold、双均线、动量、均值回归和组合学习案例。
- `backtest.py`：最小可用向量化回测器。
- `experiments.py`：参数扫描、样本内 / 样本外、随机策略实验。
- `reports.py`：JSON 和 Markdown 学习报告。
