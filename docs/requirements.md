# learn-quant-with-codex 需求文档

## 1. 项目概述

`learn-quant-with-codex` 是一个面向初学者的交互式课程型 Web 项目，主题是“用 Codex 学习美股量化交易基础”。

项目同时包含两部分：

1. 一个现代课程站：通过课程、图表、Quiz、代码示例、Codex Prompt 和 Checkpoint 帮助用户循序渐进学习。
2. 一个配套 Python 量化学习项目：用真实的工程结构实现课程中出现的数据处理、指标计算、策略、回测、参数实验和报告生成。

项目不用于实盘交易，不提供投资建议，不承诺任何收益。它的定位是教育、编程练习和量化研究入门。

## 2. 产品目标

### 2.1 核心目标

- 帮助没有金融和量化背景的用户理解美股量化交易的基础概念。
- 用可运行的 Python 代码把课程概念落到具体实现。
- 让用户通过 Codex Prompt 学会把需求拆解为代码任务。
- 提供一个可扩展的课程和代码结构，后续可以继续增加策略、数据源和研究模块。
- 用交互式图表和练习降低抽象概念的理解门槛。

### 2.2 非目标

- 不做实盘交易系统。
- 不连接券商下单 API。
- 不给出个股推荐或投资建议。
- 不把回测结果包装成未来收益预测。
- 不引导用户使用高杠杆、期权、日内高频或复杂衍生品策略。

## 3. 目标用户

### 3.1 主要用户

- 会一点 Python，但不懂量化交易的初学者。
- 正在学习 pandas、numpy、数据分析，希望找一个金融数据项目练手的开发者。
- 想使用 Codex 辅助学习和构建项目的编程学习者。

### 3.2 用户前置知识假设

用户不需要预先懂：

- 美股市场结构
- 股票交易规则
- OHLCV 数据
- 收益率、波动率、夏普比率
- 回测系统
- 策略信号和仓位管理

用户最好具备：

- 基础 Python 语法
- 基础命令行使用能力
- 基础 Web 浏览能力

## 4. 信息架构

网站采用现代文档站和课程站结合的结构。

### 4.1 页面结构

- 首页 `/`
  - 项目定位
  - 学习路径概览
  - 课程模块入口
  - Python 项目入口
  - 风险和边界说明

- 课程目录 `/courses`
  - 按模块展示所有课程
  - 展示每节课标题、学习目标、预计难度、对应 Python 模块
  - 支持跳转到具体课程
  - 支持按课程标题、概念和 Python 模块搜索
  - 支持按模块过滤

- 课程详情 `/courses/[slug]`
  - 左侧课程导航
  - 正文内容
  - 代码块
  - 图表组件
  - Quiz
  - Codex Prompt 复制区
  - Checkpoint 总结
  - 上一课 / 下一课导航

- Python 项目说明 `/python-project`
  - 代码结构
  - uv 使用方式
  - 示例脚本
  - 测试方式
  - 课程与代码映射表

- 项目实践 `/projects`
  - 汇总所有模块 Mini Project
  - 展示交付物、验收项、建议命令和相关课程
  - 帮助用户把课程内容逐步转化为 Capstone 材料

- Capstone `/capstone`
  - 展示最终研究报告要求、模板结构和生成命令
  - 提供交互式自查清单，实时显示完成度、缺失项和风险声明状态
  - 和 Python 的 `generate_capstone_template.py`、`run_capstone_check.py` 形成网页与代码的双重验收闭环

- 指标实验页 `/labs/metrics`
  - 收益率、波动率、最大回撤、夏普比率的交互式展示

- 策略实验页 `/labs/strategies`
  - buy and hold、双均线、动量、均值回归的对比图

- 参数实验页 `/labs/parameter-scan`
  - 参数扫描结果表
  - 热力图或折线图
  - 样本内 / 样本外说明

- 术语表 `/glossary`
  - 用初学者能理解的语言解释高频量化术语
  - 每个术语链接到相关课程
  - 课程页概念标签可以跳转到术语表

- 学习笔记 `/notebook`
  - 汇总用户在课程页写下的本地笔记
  - 支持从笔记跳回对应课程
  - 不需要账户，不上传服务器，只保存到浏览器 localStorage

### 4.2 课程页布局

桌面端：

- 顶部固定 Header
- 左侧课程导航
- 中间正文
- 右侧本页目录或 Checkpoint

移动端：

- 顶部 Header
- 抽屉式课程导航
- 正文单列展示
- 图表自适应宽度
- Quiz 和 Prompt 区块保留完整交互

## 5. 课程体系

课程设计以 [course-design.md](./course-design.md) 为主文档，外部教程参考和课程优化依据见 [tutorial-reference-analysis.md](./tutorial-reference-analysis.md)，单节课写作和验收规则见 [course-authoring-guide.md](./course-authoring-guide.md)。

需求文档只规定产品层面的课程约束；详细课表、模块产物、Mini Project、Capstone、Codex Task 模板和课程与代码同步契约，以 `docs/course-design.md` 的 v4.3 设计为准。课程内容的实际写作必须同时满足 `docs/course-authoring-guide.md` 的单节课结构、误区矩阵、Lab 使用规则和作者自查清单。

### 5.1 课程设计原则

课程必须采用唯一的 10 模块主线，不能再维护一套旧版 8 模块大纲。v4.3 的设计参考了 QuantConnect Learning Center、Georgia Tech ML4T、Backtrader、Zipline、QuantStart 和 EDHEC / Coursera 投资管理 Python 课程的教学机制，落地为以下原则：

- 项目驱动：每个模块都有可运行、可测试、可解释的产物。
- 评价前置：先学收益、净值、回撤、波动和夏普，再写策略。
- 偏差前置：在回测系统前先讲 `signal`、`position`、`lag`、交易成本和 look-ahead bias。
- 向量化先行：首版使用 pandas 向量化回测降低门槛，同时明确它不是完整交易系统。
- 每节可验收：课程页必须包含 Quiz、Codex Task、Checkpoint 和至少一个可保留的学习产物。
- 报告优先：最终交付是学习型研究报告，不是策略推荐或收益宣传页。
- Lab 优先：指标、仓位、成本、参数和偏差必须通过小型实验帮助用户观察，而不是只解释定义。
- 答辩意识：Capstone 必须要求用户解释数据、假设、成本、偏差和限制，不能只汇总指标。

### 5.2 课程模块

| 模块 | 主题 | 核心问题 | 模块产物 |
| --- | --- | --- | --- |
| Module 0 | 学习方式和项目边界 | 这门课如何学，哪些事情不能做？ | 学习计划、风险声明、第一个收益率函数 |
| Module 1 | 美股数据入门 | 一行股票数据到底代表什么？ | 数据读取函数和质量报告 |
| Module 2 | 收益和净值 | 如何从价格得到收益路径？ | 收益率、复利、年化和净值函数 |
| Module 3 | 风险和绩效指标 | 如何评价一条收益曲线？ | 风险指标模块和绩效摘要表 |
| Module 4 | 信号、仓位和成本 | 策略想法如何变成可回测的持仓？ | position、turnover、cost 和偏差演示 |
| Module 5 | 第一套回测系统 | 如何把数据、仓位、成本和指标串起来？ | `BacktestResult` 和 buy and hold 报告 |
| Module 6 | 入门策略模式 | 趋势、动量、均值回归如何编码？ | 策略函数库和公平对比实验 |
| Module 7 | 多股票组合 | 多资产收益和权重如何工作？ | 等权组合和轮动组合实验 |
| Module 8 | 参数实验和验证 | 为什么历史最优不等于未来有效？ | 参数扫描、样本外和随机策略报告 |
| Module 9 | 回测边界和 Capstone | 如何正确看待研究结果？ | 最终研究报告和下一步路线 |

### 5.3 主题覆盖

| 用户要求主题 | 所属模块 |
| --- | --- |
| 美股市场基础、美股历史数据、OHLCV、Close 和 Adjusted Close、数据清洗 | Module 1 |
| 收益率、复利、年化收益率、净值曲线 | Module 2 |
| 波动率、最大回撤、夏普比率、胜率、盈亏比 | Module 3 |
| 手续费、滑点、仓位管理、signal 和 position | Module 4 |
| equity curve、buy and hold、简单回测系统、回测报告 | Module 5 |
| 双均线策略、动量策略、均值回归策略、策略对比 | Module 6 |
| 多股票组合、权重、再平衡、benchmark | Module 7 |
| 参数扫描、样本内和样本外、过拟合 | Module 8 |
| 回测偏差、为什么回测结果不能代表未来收益、paper trading 和实盘区别、下一步路线 | Module 9 |

### 5.4 单节课要求

每节课必须尽量包含：

- 本节目标和核心问题。
- 概念解释、直觉说明、英文术语和简单公式。
- 一个可手算的小例子。
- 与 Python 项目对应的代码示例。
- 用图表说明应该观察什么。
- 常见误区，尤其是忽略该概念会怎样出错。
- Quiz 或小练习。
- 可复制的 Codex Prompt，包含背景、目标、约束、验收和反思。
- Checkpoint，总结本节保留下来的代码、笔记或报告产物。

### 5.5 参考教程对课程设计的硬约束

课程实现时必须把外部教程启发转为可检查要求：

| 参考机制 | 产品约束 |
| --- | --- |
| QuantConnect lesson/task/result | 每节课必须有可复制 Codex Prompt、验收命令或可检查产物 |
| ML4T 项目作业 | 每个模块必须有 Mini Project，且材料能进入 Capstone |
| EDHEC Python lab | 收益、风险和组合课程必须同时出现公式、手算例子、Python 函数和图表 |
| Backtrader 逐步搭建 | 回测系统必须从最小流程逐步加入结果对象、报告和测试 |
| Zipline 执行现实 | 策略比较前必须讲 `signal`、`position`、lag、手续费和滑点 |
| QuantStart 偏差教育 | 参数扫描、样本外、过拟合和回测偏差必须是主线课程，不得作为可选附录 |

### 5.6 课程设计质量门槛

一节课发布前必须通过以下检查：

- 页面开头能用一句话说明本节核心问题。
- 明确写出忽略该概念会造成的错误。
- 至少有一个小型手算例子或可运行小输入。
- 代码示例能映射到 Python 项目真实文件。
- 图表说明“应该观察什么”和“不要误读什么”。
- Quiz 检查一个初学者常见误区。
- Codex Prompt 包含背景、目标、约束、验收和反思。
- Checkpoint 明确本节留下的代码、笔记、报告或 Capstone 材料。

### 5.7 Mini Project 和 Capstone

课程必须包含 9 个 Mini Project 和 1 个 Capstone：

- Mini Project 集中展示在 `/projects`，每个项目都有交付物、验收项、建议命令、相关课程入口和反思问题。
- Mini Project 的输出会逐步成为 Capstone 材料，例如数据质量报告、绩效指标表、策略对比、参数扫描和样本外验证。
- Capstone 展示在 `/capstone`，最终报告必须包含数据范围、策略假设、基准比较、成本处理、参数验证、样本外结果、偏差检查和非投资建议声明。

## 6. 每节课内容模板

每节课使用统一结构，便于 MDX 扩展。

```mdx
---
title: "收益率"
module: "收益和风险指标"
slug: "returns"
order: 201
difficulty: "beginner"
pythonModule: "quant_learning.metrics.returns"
---

<LessonIntro objectives={[...]} />

## 概念解释

## 直觉说明

## 简单公式

## Python 示例

<CodeBlock language="python" copyable />

## 可视化

<ReturnsChart />

## 常见误区

## 小练习

<Quiz id="returns-basic" />

## Codex 练习任务

<PromptBox copyable />

## Checkpoint

<Checkpoint items={[...]} />
```

## 7. 交互功能需求

### 7.1 Quiz

- 支持单选题。
- 用户选择后即时显示正确 / 错误。
- 显示简短解释。
- 不需要账户系统，不保存长期学习记录。

### 7.1.1 学习笔记

- 每节课提供本地笔记输入区。
- 笔记保存到浏览器 `localStorage`。
- `/notebook` 汇总所有课程笔记。
- 笔记功能只服务学习反思，不保存交易账户、投资记录或实盘数据。

### 7.2 复制功能

- 代码块支持复制。
- Codex Prompt 支持复制。
- 复制后显示短暂反馈状态。

### 7.3 图表组件

至少实现：

- 价格曲线
- 日收益率柱状图
- 净值曲线
- 回撤曲线
- Close / Adjusted Close 对比图
- 有成本 / 无成本策略对比图
- 双均线策略图
- 多策略净值对比图
- 参数扫描结果图

图表数据优先使用静态示例数据，确保无需联网也能运行。

### 7.4 指标卡片

展示：

- 总收益
- 年化收益率
- 年化波动率
- 最大回撤
- 夏普比率
- 胜率
- 盈亏比

### 7.5 实验页

实验页不追求复杂交易功能，目标是帮助理解：

- 改变交易成本会如何影响净值。
- 改变均线窗口会如何影响策略结果。
- 样本内最优参数在样本外可能失效。

实验页需要提供轻量交互控件，例如滑块、分段按钮和勾选项。交互只服务教学解释，不引入实盘交易、账户、券商 API 或复杂订单系统。

## 8. 技术方案

### 8.1 前端技术栈

推荐使用：

- Next.js App Router
- TypeScript
- MDX
- Tailwind CSS
- React
- Recharts
- next-mdx-remote 或 Contentlayer 替代方案
- lucide-react

选择理由：

- Next.js 适合课程站、文档站和交互式 React 组件混合开发。
- TypeScript 能保证课程元数据、组件参数和图表数据结构清晰。
- MDX 适合把长篇课程内容和交互组件组合在一起。
- Tailwind CSS 适合快速构建一致的文档站 UI。
- Recharts 对学习型图表足够清晰，API 简单，维护成本低。
- lucide-react 提供复制、导航、菜单等常用图标。

### 8.2 Python 技术栈

推荐使用：

- uv
- Python 3.11+
- pandas
- numpy
- pytest
- matplotlib 或 plotly 可选

选择理由：

- uv 适合现代 Python 包管理和快速创建可复现环境。
- pandas / numpy 是量化入门最核心的数据处理工具。
- pytest 用于保证指标和回测逻辑可测试。
- 图表主要放在前端，Python 侧只需要生成报告数据，降低重复维护成本。

### 8.3 数据策略

首版使用本地静态示例数据：

- `AAPL` 示例日线数据
- `MSFT` 示例日线数据
- `SPY` 示例日线数据
- 小型人工构造数据，用于教学公式验证

原因：

- 避免初学者被 API key、网络失败、数据供应商差异卡住。
- 保证课程站和测试可以离线运行。
- 便于解释 Close 和 Adjusted Close、缺失值和回测偏差。

后续可以扩展：

- yfinance 数据下载脚本
- Nasdaq Data Link
- Polygon.io
- Alpha Vantage

扩展数据源必须清楚标注数据许可、延迟、限制和使用风险。

## 9. 推荐项目结构

```text
learn-quant-with-codex/
  README.md
  docs/
    requirements.md
    course-design.md
    course-authoring-guide.md
    tutorial-reference-analysis.md
    architecture.md
  web/
    package.json
    next.config.ts
    tsconfig.json
    src/
      app/
        page.tsx
        courses/
          page.tsx
          [slug]/
            page.tsx
        labs/
          metrics/
            page.tsx
          strategies/
            page.tsx
          parameter-scan/
            page.tsx
      components/
        layout/
        lesson/
        charts/
        quiz/
        prompt/
        metrics/
      content/
        courses/
          001-introduction.mdx
          101-us-market-basics.mdx
          102-ohlcv.mdx
      lib/
        courses.ts
        chart-data.ts
        metrics.ts
      styles/
        globals.css
  python/
    pyproject.toml
    README.md
    src/
      quant_learning/
        __init__.py
        data.py
        metrics.py
        costs.py
        positions.py
        strategies.py
        backtest.py
        experiments.py
        reports.py
    data/
      sample_prices.csv
    examples/
      run_buy_and_hold.py
      run_moving_average.py
      run_parameter_scan.py
    tests/
      test_metrics.py
      test_positions.py
      test_strategies.py
      test_backtest.py
```

## 10. Python 量化项目需求

### 10.1 数据模块 `data.py`

函数：

- `read_price_csv(path: str | Path) -> pd.DataFrame`
- `validate_ohlcv_columns(df: pd.DataFrame) -> None`
- `validate_price_data(df: pd.DataFrame) -> dict`
- `choose_price_column(df: pd.DataFrame, adjusted: bool = True) -> pd.Series`

要求：

- 日期索引转换为 `DatetimeIndex`。
- 按日期升序排序。
- 检查缺失值、重复日期、必要列。
- 不在读取阶段静默修复严重错误。

### 10.2 指标模块 `metrics.py`

函数：

- `calculate_returns(prices: pd.Series) -> pd.Series`
- `compound_returns(returns: pd.Series) -> pd.Series`
- `annualized_return(returns: pd.Series, periods_per_year: int = 252) -> float`
- `annualized_volatility(returns: pd.Series, periods_per_year: int = 252) -> float`
- `drawdown_series(equity: pd.Series) -> pd.Series`
- `max_drawdown(equity: pd.Series) -> float`
- `sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.0, periods_per_year: int = 252) -> float`
- `win_rate(trade_returns: pd.Series) -> float`
- `profit_loss_ratio(trade_returns: pd.Series) -> float`

要求：

- 空输入和全 NaN 输入要有明确行为。
- 年化函数需要说明 252 是美股常用交易日近似值。
- 夏普比率在零波动时返回 `nan` 或约定值，并在文档中说明。

### 10.3 成本模块 `costs.py`

函数：

- `apply_transaction_costs(returns, positions, commission_bps=0.0, slippage_bps=0.0)`
- `calculate_turnover(positions)`

要求：

- 用仓位变化估算换手。
- 成本以 basis points 表示。
- 清楚说明这是简化模型。

### 10.4 仓位模块 `positions.py`

函数：

- `signals_to_positions(signals: pd.Series, lag: int = 1) -> pd.Series`
- `normalize_weights(weights: pd.DataFrame | pd.Series) -> pd.DataFrame | pd.Series`
- `equal_weight_positions(signals: pd.DataFrame) -> pd.DataFrame`

要求：

- 默认滞后一日，避免 look-ahead bias。
- 支持单资产和多资产基本场景。

### 10.5 策略模块 `strategies.py`

函数：

- `buy_and_hold_signal(prices: pd.Series) -> pd.Series`
- `moving_average_crossover(prices: pd.Series, fast_window: int, slow_window: int) -> pd.Series`
- `momentum_signal(prices: pd.Series, lookback: int) -> pd.Series`
- `mean_reversion_signal(prices: pd.Series, window: int, threshold: float) -> pd.Series`
- `equal_weight_portfolio(returns: pd.DataFrame) -> pd.Series`

要求：

- 策略函数只生成信号，不直接执行回测。
- 参数非法时抛出清晰异常。
- 返回值索引与输入价格索引对齐。

### 10.6 回测模块 `backtest.py`

对象和函数：

- `BacktestConfig`
- `BacktestResult`
- `run_backtest(prices, signals, config) -> BacktestResult`
- `compare_strategies(results: dict[str, BacktestResult]) -> pd.DataFrame`

要求：

- 明确区分 asset returns、strategy returns、equity curve。
- 使用 `signals_to_positions` 生成滞后仓位。
- 支持交易成本。
- 输出 summary metrics。

### 10.7 实验模块 `experiments.py`

函数：

- `scan_moving_average_parameters(prices, fast_windows, slow_windows)`
- `train_test_split_time_series(data, split_date)`
- `evaluate_in_sample_out_of_sample(prices, params, split_date)`
- `simulate_random_strategies(prices, n_strategies, seed)`

要求：

- 参数扫描跳过 `fast_window >= slow_window` 的组合。
- 输出结构适合前端图表或报告使用。

### 10.8 报告模块 `reports.py`

函数：

- `generate_backtest_report(result) -> dict`
- `save_report_json(report, path)`
- `save_report_markdown(report, path)`
- `generate_capstone_template(strategy_name) -> str`
- `save_capstone_template(path, strategy_name)`
- `validate_capstone_report(markdown_text) -> dict`

要求：

- 报告包含配置、指标、数据区间、风险提示。
- Markdown 报告必须包含“教育用途，不构成投资建议”的声明。
- Capstone 模板必须包含数据、策略、回测、基准、成本、参数、样本外和风险章节。

### 10.9 测试要求

至少覆盖：

- 收益率计算
- 复利净值曲线
- 年化收益率
- 波动率
- 最大回撤
- 夏普比率零波动场景
- signal 到 position 的滞后
- 双均线策略输出
- 回测是否避免当日信号当日成交
- 参数扫描是否跳过非法组合

## 11. 课程与 Python 代码映射

| 课程 | Python 模块 | 核心函数 |
| --- | --- | --- |
| OHLCV 数据 | `data.py` | `validate_ohlcv_columns` |
| Close 和 Adjusted Close | `data.py` | `choose_price_column` |
| 数据清洗 | `data.py` | `validate_price_data` |
| 收益率 | `metrics.py` | `calculate_returns` |
| 复利和净值 | `metrics.py` | `compound_returns` |
| 年化收益率 | `metrics.py` | `annualized_return` |
| 波动率 | `metrics.py` | `annualized_volatility` |
| 最大回撤 | `metrics.py` | `drawdown_series`, `max_drawdown` |
| 夏普、胜率、盈亏比 | `metrics.py` | `sharpe_ratio`, `win_rate`, `profit_loss_ratio` |
| 手续费和滑点 | `costs.py` | `apply_transaction_costs` |
| Signal 和 Position | `positions.py` | `signals_to_positions` |
| 仓位管理 | `positions.py` | `normalize_weights`, `equal_weight_positions` |
| Buy and Hold | `strategies.py` | `buy_and_hold_signal` |
| 双均线策略 | `strategies.py` | `moving_average_crossover` |
| 动量策略 | `strategies.py` | `momentum_signal` |
| 均值回归 | `strategies.py` | `mean_reversion_signal` |
| 多股票组合 | `portfolio.py` | `equal_weight_portfolio` |
| 简单回测系统 | `backtest.py` | `run_backtest` |
| 参数扫描 | `experiments.py` | `scan_moving_average_parameters` |
| 样本内 / 样本外 | `experiments.py` | `train_test_split_time_series` |
| 过拟合 | `experiments.py` | `simulate_random_strategies` |
| 回测报告 | `reports.py` | `generate_backtest_report` |

## 12. 前端组件需求

### 12.1 Layout 组件

- `SiteHeader`
- `CourseSidebar`
- `MobileCourseNav`
- `LessonToc`
- `PageShell`

### 12.2 Lesson 组件

- `LessonIntro`
- `FormulaBox`
- `CommonMistakes`
- `Checkpoint`
- `NextLessonNav`

### 12.3 Code 和 Prompt 组件

- `CopyButton`
- `CodeBlock`
- `PromptBox`

### 12.4 Quiz 组件

- `QuizCard`
- `QuizOption`
- `QuizFeedback`

### 12.5 图表组件

- `PriceChart`
- `ReturnsChart`
- `EquityCurveChart`
- `DrawdownChart`
- `AdjustedCloseChart`
- `MovingAverageChart`
- `StrategyComparisonChart`
- `ParameterScanChart`

### 12.6 指标组件

- `MetricCard`
- `MetricsGrid`
- `BacktestSummary`

## 13. 内容风格要求

- 使用中文写课程内容。
- 术语第一次出现时给出英文原词。
- 解释从直觉出发，再给公式和代码。
- 每节课都要提醒相关风险或误区。
- 避免把策略写成“赚钱方法”。
- 所有策略均以“学习案例”表述。
- 代码示例应该简短、可读、和 Python 项目函数保持一致。

## 14. 设计风格要求

- 简洁、现代、适合长时间阅读。
- 不做营销型大 Hero。
- 首页第一屏直接呈现学习路径和进入课程的入口。
- 正文宽度适合阅读，代码块有足够对比度。
- 图表颜色克制，但不同系列要容易区分。
- 支持浅色主题，后续可扩展深色主题。
- 移动端导航不能遮挡正文。
- 交互状态明确，包括 hover、focus、selected、correct、incorrect、copied。

## 15. 可访问性要求

- 所有按钮有可访问名称。
- 颜色不能作为 Quiz 正误的唯一提示。
- 图表附近提供文字解释。
- 键盘可操作复制按钮和 Quiz 选项。
- 焦点状态清晰。

## 16. README 需求

根目录 `README.md` 需要包含：

- 项目定位
- 风险声明
- 技术栈
- 目录结构
- 前端启动方式
- Python 项目启动方式
- uv 使用方式
- 测试方式
- 课程和代码如何对应
- 后续扩展建议

`python/README.md` 需要包含：

- Python 包定位
- 安装方式
- 运行示例
- 测试方式
- 每个模块说明
- 非投资建议声明

## 17. 开发里程碑

### Milestone 1: 文档和骨架

- 完成需求文档。
- 完成课程大纲。
- 初始化 Next.js 项目。
- 初始化 Python uv 项目。
- 建立基础目录结构。

### Milestone 2: Python 核心函数

- 实现数据、指标、仓位、策略、回测模块。
- 增加 pytest。
- 提供示例数据和示例脚本。

### Milestone 3: 课程站基础

- 实现首页、课程目录、课程详情页。
- 实现 MDX 内容加载。
- 实现课程导航。
- 完成首批核心课程。

### Milestone 4: 交互组件

- 实现 Quiz。
- 实现复制代码和 Prompt。
- 实现核心图表。
- 实现指标卡片。

### Milestone 5: 策略和实验页

- 实现 metrics lab。
- 实现 strategies lab。
- 实现 parameter scan lab。
- 前端展示与 Python 项目保持概念一致。

### Milestone 6: 完善内容和验收

- 补齐课程内容。
- 完成 README。
- 运行前端构建。
- 运行 Python 测试。
- 检查移动端布局。

## 18. 验收标准

### 18.1 产品验收

- 用户能从首页理解项目目标和学习路径。
- 用户能进入课程目录并按顺序学习。
- 每节课包含目标、概念、公式或直觉、代码、图表、练习、Codex Prompt 和 Checkpoint。
- 网站明确声明不提供投资建议。

### 18.2 前端验收

- Next.js 项目可以正常启动。
- 课程页面可以渲染 MDX 内容。
- 左侧导航和移动端导航可用。
- Quiz 可交互。
- 代码块和 Prompt 可以复制。
- 图表在桌面和移动端都不溢出。
- 页面适合长时间阅读，没有明显视觉噪声。

### 18.3 Python 验收

- `uv run pytest` 通过。
- 示例脚本可以运行。
- 指标函数和课程内容一致。
- 回测逻辑默认避免 look-ahead bias。
- 报告中包含教育用途和非投资建议声明。

### 18.4 内容验收

- 课程覆盖需求中列出的所有主题。
- 课程顺序从基础到策略再到风险边界。
- 所有策略被表述为学习案例。
- 回测偏差和未来收益不确定性被明确讲解。

## 19. 风险和约束

- 初学者可能误解回测结果，因此必须在首页、README、回测报告和相关课程中重复声明边界。
- 真实市场数据存在许可、延迟、缺失和复权差异，首版使用本地样例数据。
- 过多交互会增加维护成本，首版只实现服务学习目标的交互。
- 课程内容和 Python 代码必须同步维护，否则项目会失去教学一致性。

## 20. 后续扩展方向

- 增加更多资产类别的说明，但不混入首版主线。
- 增加因子研究入门模块。
- 增加投资组合优化入门模块。
- 增加 walk-forward validation。
- 增加数据下载脚本和数据供应商对比。
- 增加更多 Codex 练习任务和自动评分测试。
- 增加学习进度本地存储。
- 增加英文版课程内容。
