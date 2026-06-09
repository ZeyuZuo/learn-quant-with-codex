# learn-quant-with-codex

一个课程型 Web 项目：用 Codex 学习美股量化交易基础。

这个项目不是实盘交易系统，不连接券商 API，不提供投资建议，也不承诺任何收益。所有策略、回测和图表都用于教学、编程练习和研究方法入门。

## 项目组成

- `web/`：Next.js + TypeScript + MDX 风格内容数据的交互式课程站。
- `python/`：使用 uv 管理的 Python 量化学习项目，包含数据处理、指标、策略、回测、实验和测试。
- `docs/`：需求文档和课程设计文档。

## 本地运行

5 分钟上手：

```bash
cd web
npm install
npm run validate:course
npm run dev
```

然后打开 `http://localhost:3000`，从第一课开始。另开一个终端运行 Python 项目：

```bash
cd python
uv sync
uv run pytest
uv run python examples/run_data_quality_report.py
```

第一条 Python 示例会生成 `reports/sample_prices_quality_report.json`。这就是课程里 Module 1 Mini Project 的交付物。

前端：

```bash
cd web
npm install
npm run dev
```

打开 `http://localhost:3000` 后，建议先从 `/courses` 进入课程目录，再按模块顺序学习。课程页的进度、笔记和完成状态都只保存在浏览器本地。

Python：

```bash
cd python
uv sync
uv run pytest
uv run python examples/run_data_quality_report.py
uv run python examples/run_returns_summary.py
uv run python examples/run_metrics_summary.py
uv run python examples/run_position_cost_bias.py
uv run python examples/run_buy_and_hold.py
uv run python examples/run_moving_average.py
uv run python examples/run_equal_weight_portfolio.py
uv run python examples/run_parameter_scan.py
uv run python examples/run_capstone_check.py
uv run python examples/generate_capstone_template.py
```

示例脚本会把课程项目页需要的报告写到仓库根目录 `reports/`。该目录默认不提交到 git，方便你反复生成自己的学习报告。

如果只想确认整个项目是否健康，可以运行：

```bash
cd web
npm run validate:course
npm run lint
npm run build

cd ../python
UV_CACHE_DIR=/tmp/uv-cache uv run pytest
```

## 学习路径

课程采用“边学边建”的结构：

1. 理解美股日线数据和数据质量。
2. 从价格计算收益、净值和风险指标。
3. 区分 signal、position、交易成本和回测收益。
4. 实现 buy and hold、双均线、动量和均值回归学习策略。
5. 比较单资产和多资产组合。
6. 做参数扫描、样本内 / 样本外验证和回测偏差检查。
7. 完成一份带代码、图表、测试和风险声明的学习型研究报告。

详细课程蓝图见 [docs/course-design.md](docs/course-design.md)。

最终报告要求见前端 `/capstone` 页面和第 9.4 课。

项目实践入口见前端 `/projects` 页面。每个模块都有一个 Mini Project，包含交付物、验收项、建议命令和相关课程入口。

## 课程产物

完成课程时，你会逐步生成这些学习产物：

| 模块 | 运行命令 | 产物 |
| --- | --- | --- |
| Module 1 数据 | `uv run python examples/run_data_quality_report.py` | `reports/sample_prices_quality_report.json` |
| Module 2 收益 | `uv run python examples/run_returns_summary.py` | `reports/returns_equity_summary.json` |
| Module 3 指标 | `uv run python examples/run_metrics_summary.py` | `reports/performance_metrics_summary.json` |
| Module 4 仓位成本 | `uv run python examples/run_position_cost_bias.py` | `reports/position_cost_bias_comparison.json` |
| Module 5 回测 | `uv run python examples/run_buy_and_hold.py` | `reports/buy_and_hold_report.md` |
| Module 6 策略 | `uv run python examples/run_moving_average.py` | `reports/strategy_comparison_report.md` |
| Module 7 组合 | `uv run python examples/run_equal_weight_portfolio.py` | `reports/portfolio_comparison_report.md` |
| Module 8 验证 | `uv run python examples/run_parameter_scan.py` | `reports/parameter_scan_oos_report.md` |
| Module 9 Capstone | `uv run python examples/generate_capstone_template.py` | `reports/final_research_report.md` |

这些产物用于学习和复盘，不构成投资建议，也不能证明未来收益。

## 课程和代码如何对应

课程不是独立文章，Python 项目也不是孤立代码。两者按同一条主线推进：

| 课程模块 | 学习问题 | Python 落点 |
| --- | --- | --- |
| Module 1 数据 | 一行美股日线数据代表什么？ | `python/src/quant_learning/data.py` |
| Module 2 收益 | 价格如何变成收益和净值？ | `python/src/quant_learning/metrics.py` |
| Module 3 风险 | 如何评价一条收益路径？ | `metrics.py` 和 `tests/test_metrics.py` |
| Module 4 执行 | signal 如何变成 position？成本怎么扣？ | `positions.py`、`costs.py` |
| Module 5 回测 | 如何把数据、仓位、成本和指标串起来？ | `backtest.py`、`reports.py` |
| Module 6 策略 | 双均线、动量、均值回归如何编码？ | `strategies.py` |
| Module 7 组合 | 多资产收益和权重如何工作？ | `portfolio.py` |
| Module 8 验证 | 参数扫描和样本外如何暴露过拟合？ | `experiments.py` |
| Module 9 报告 | 如何正确陈述回测边界？ | `reports.py`、Capstone 模板 |

前端 `/python-project` 页面提供更完整的课程到代码同步表，包括代码文件、测试文件和建议命令。

## 目录结构

```text
learn-quant-with-codex/
  docs/                      需求文档、课程设计和参考教程分析
  web/                       Next.js 课程站
    src/app/                 页面入口
    src/components/          课程、图表、Quiz、Prompt、项目实践组件
    src/lib/                 课程数据、图表数据、术语表、进度和命令映射
  python/                    uv 管理的量化学习代码项目
    data/sample_prices.csv   本地样例 OHLCV 数据
    src/quant_learning/      数据、指标、仓位、成本、策略、回测、实验、报告模块
    examples/                课程报告和实验脚本
    tests/                   pytest 单元测试
  reports/                   本地生成的学习报告，默认不提交
```

## 推荐学习方式

每节课建议按这个顺序完成：

1. 阅读“本课学习焦点”，先知道本节解决的问题和最容易踩的坑。
2. 看概念解释、公式和手算例子，不急着跑策略。
3. 观察图表的读图提示，确认图表在解释什么。
4. 完成 Quiz 和动手练习。
5. 复制 Codex Prompt，让 Codex 实现或审查对应 Python 代码。
6. 运行对应测试或示例脚本。
7. 勾选课程页底部的完成前自查，再标记本课完成。

## 学习进度

前端课程站支持本地学习进度：

- 用户可以在课程页标记本课完成。
- 首页、课程目录、桌面侧栏和移动导航会显示完成状态。
- 进度只保存在浏览器 `localStorage`，不需要账户，不上传到服务器。
- 进度只代表课程学习状态，不涉及交易账户、投资记录或任何实盘数据。

课程站也支持本地学习笔记：

- 每节课都有“我的笔记”区域。
- `/notebook` 页面汇总所有课程笔记，并可跳回对应课程。
- 笔记只保存在浏览器 `localStorage`，适合记录理解、疑问和下一条 Codex Prompt。

## 交互学习

- 每节课包含 Quiz、动手练习、可复制 Python 示例、可复制 Codex Prompt 和 Checkpoint。
- 指标、策略和参数实验页提供滑块、分段控件或勾选项，帮助观察概念变化。
- 课程目录支持搜索课程、概念和 Python 模块，并可按模块过滤。
- 术语表 `/glossary` 用通俗语言解释高频量化术语，课程页概念标签会链接到对应术语。
- 学习笔记 `/notebook` 汇总个人反思，帮助把课程内容转化为可继续追问的 Codex 任务。
- 项目实践 `/projects` 把模块 Mini Project 汇总成可执行清单。
- 所有交互都服务学习目标，不提供交易信号，也不连接任何实盘环境。

## 验证

```bash
cd python
uv run pytest
```

```bash
cd web
npm run validate:course
npm run lint
npm run build
```

## 风险声明

历史数据和回测结果不能代表未来收益。课程中的所有策略只是学习案例，不能直接用于真实资金交易。真实交易还涉及执行、流动性、滑点、税务、心理压力、系统故障和监管要求。
