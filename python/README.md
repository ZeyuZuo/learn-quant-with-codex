# Python 量化学习项目

这是 `learn-quant-with-codex` 的配套 Python 项目。它用于课程中的数据处理、指标计算、策略实现、回测实验和报告生成。

它不是交易系统，不连接券商，不提供投资建议。

课程网站讲到的每个核心概念，都应该能在这个 Python 项目里找到对应函数、测试或示例脚本。学习时不要只复制代码，应该同时确认输入、输出、边界条件和测试结果。

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
uv run python examples/run_equal_weight_portfolio.py
uv run python examples/run_parameter_scan.py
uv run python examples/run_capstone_check.py
uv run python examples/generate_capstone_template.py
```

## 课程到模块的对应关系

| 课程阶段 | 你在学什么 | 代码落点 | 常用验证 |
| --- | --- | --- | --- |
| 数据 | CSV、OHLCV、复权价格、质量报告 | `src/quant_learning/data.py` | `uv run pytest tests/test_data.py` |
| 收益 | 收益率、复利、年化收益 | `src/quant_learning/metrics.py` | `uv run pytest tests/test_metrics.py` |
| 风险 | 波动率、最大回撤、夏普、胜率 | `metrics.py` | `uv run pytest tests/test_metrics.py` |
| 仓位成本 | signal、position、换手、手续费、滑点 | `positions.py`、`costs.py` | `uv run pytest tests/test_positions.py tests/test_costs.py` |
| 回测 | BacktestConfig、BacktestResult、报告 | `backtest.py`、`reports.py` | `uv run pytest tests/test_backtest.py tests/test_reports.py` |
| 策略 | buy and hold、双均线、动量、均值回归 | `strategies.py` | `uv run pytest tests/test_strategies.py` |
| 组合 | 多资产对齐、等权、轮动 | `portfolio.py` | `uv run pytest tests/test_portfolio.py` |
| 实验 | 参数扫描、样本内 / 样本外、随机策略 | `experiments.py` | `uv run pytest tests/test_experiments.py` |
| Capstone | 最终报告、偏差检查、风险声明 | `reports.py` | `uv run python examples/run_capstone_check.py` |

## 模块说明

- `data.py`：读取价格数据、检查 OHLCV、生成数据质量报告。
- `metrics.py`：收益率、复利、年化收益、波动率、回撤、夏普、胜率和盈亏比。
- `positions.py`：signal 到 position 的滞后转换、权重归一化。
- `costs.py`：换手和简化交易成本模型。
- `strategies.py`：buy and hold、双均线、动量和均值回归。
- `portfolio.py`：多资产收益、等权组合、轮动信号和组合收益。
- `backtest.py`：最小可用向量化回测器。
- `experiments.py`：参数扫描、样本内 / 样本外、随机策略实验。
- `reports.py`：JSON 和 Markdown 学习报告。

## 示例脚本说明

- `run_buy_and_hold.py`：运行最基础的 buy and hold 回测，适合 Module 5。
- `run_moving_average.py`：运行双均线策略示例，适合 Module 6。
- `run_equal_weight_portfolio.py`：运行等权组合示例，适合 Module 7。
- `run_parameter_scan.py`：运行双均线参数扫描，适合 Module 8。
- `generate_capstone_template.py`：生成最终报告模板，适合 Module 9.4。
- `run_capstone_check.py`：检查 Capstone 报告是否包含必要章节和风险声明。

## 学习边界

- 只使用本地样例数据和教学函数，不连接真实券商。
- 回测是历史实验，不代表未来收益。
- 策略函数只生成学习型 signal，不发送订单。
- 成本、滑点和执行模型都被简化，不能当作实盘系统。
- 如果扩展到真实数据源，需要单独检查数据许可、延迟、复权规则和幸存者偏差。
