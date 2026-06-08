# learn-quant-with-codex 课程设计 v2

## 1. 课程设计目标

这门课的核心不是“讲完所有量化术语”，而是让初学者完成一条可验证的学习路径：

1. 看懂一份美股日线数据。
2. 用 Python 把价格转换为收益、风险指标和净值曲线。
3. 理解信号、仓位、交易成本和回测之间的关系。
4. 实现几类入门策略，并知道它们只是研究案例。
5. 用样本内 / 样本外、参数扫描和偏差检查反思回测结果。
6. 最后交付一份带代码、图表、测试和风险说明的量化学习报告。

课程应该采用“边学边建”的方式。每一节课都必须留下一个可运行、可检查、可被 Codex 继续扩展的产物。

## 2. 参考教程与设计启发

本课程参考了几类成熟教程的编排方式，但不照搬它们的内容。

### 2.1 QuantConnect Learning Center / Boot Camp

参考链接：

- https://www.quantconnect.com/docs/v2/cloud-platform/learning-center/course-structure
- https://www.quantconnect.com/announcements/15528/get-started-with-quantconnect-s-boot-camp/

可借鉴点：

- 课程被拆成 lesson 和 task，任务小而明确。
- 每节课围绕一个可实现的策略或工程动作，而不是只讲理论。
- 课程顺序要求前一节的 API 和概念服务后一节。
- 提供 hint、solution 和 backtest result 反馈。

本项目吸收方式：

- 每节课都设计一个 “Codex Task”，包含输入、约束、验收标准和测试要求。
- 每个模块末尾增加一个 Mini Project，而不是只做选择题。
- 用户完成课程后应保留自己的代码，而不是只读完页面。

### 2.2 Georgia Tech CS 7646 Machine Learning for Trading

参考链接：

- https://omscs.gatech.edu/cs-7646-machine-learning-trading
- https://lucylabs.gatech.edu/ml4t/machine-learning-algorithms-for-trading/

可借鉴点：

- 从 Manipulating Financial Data in Python 开始，再进入 Computational Investing 和交易策略。
- 强调从信息获取到交易决策的完整算法流程。
- 在策略和机器学习之前引入 out-of-sample、roll-forward validation 等验证概念。
- 用项目作业驱动学习，而不是只堆课程章节。

本项目吸收方式：

- 先构建数据、指标、回测和验证能力，再讲策略。
- 过拟合、样本外和回测偏差不放在最后作为附录，而是在策略实验后立刻进入。
- 课程中的策略不以“收益最高”为目标，而以“能解释、能测试、能发现问题”为目标。

### 2.3 EDHEC / Coursera 投资管理 Python 课程

参考链接：

- https://www.coursera.org/specializations/investment-management-python-machine-learning/
- https://www.coursera.org/learn/introduction-portfolio-construction-python

可借鉴点：

- 面向初学者，自包含，不假设用户已经懂投资组合分析。
- 理论、直觉和 Python lab 同步推进。
- 先讲收益、风险、组合，再扩展到更复杂模型。

本项目吸收方式：

- 收益、波动率、回撤、夏普比率等指标必须在策略之前讲清楚。
- 多股票组合不是高级附录，而是用户理解“策略收益不是单只股票涨跌”的关键环节。
- 每个公式都要配一个小型数据例子和一段 Python 实现。

### 2.4 Backtrader / Zipline / QuantStart 回测教程

参考链接：

- https://www.backtrader.com/docu/quickstart/quickstart/
- https://zipline-trader.readthedocs.io/en/latest/my-beginner-tutorial.html
- https://www.quantstart.com/articles/Event-Driven-Backtesting-with-Python-Part-I/

可借鉴点：

- Backtrader quickstart 从空策略逐步推进到数据、策略、参数、图表和优化。
- Zipline beginner tutorial 使用经典双均线案例展示完整回测流程。
- QuantStart 区分向量化回测和事件驱动回测，并强调 look-ahead bias、执行模型和测试。

本项目吸收方式：

- 首版采用更适合初学者的向量化回测，后面专门解释它和事件驱动系统的差异。
- 回测器从最小可用版本开始，逐步加入成本、报告、参数扫描和对比。
- 每次策略结果展示都必须有 benchmark、回撤和风险提示。

### 2.5 Claude Code / 交互式 AI 编程教程

参考链接：

- https://code.claude.com/docs/en/tutorials
- https://nimbalyst.com/skills/tutorial/

可借鉴点：

- 通过真实文件、真实命令和真实反馈学习。
- 任务要有明确成功标准。
- Checkpoint 可以把一个大目标拆成可回退、可复盘的小步骤。

本项目吸收方式：

- 每节课都有 “Explain -> Implement -> Test -> Reflect” 的 Codex 工作流。
- Prompt 不只是“帮我写代码”，而是包含上下文、约束、验收和反思问题。
- Checkpoint 不只总结知识，还要求用户确认自己生成了哪个代码或报告产物。

## 3. v2 课程编排原则

### 3.1 项目主线优先

课程不是按金融百科词条排序，而是围绕一个逐步完善的项目排序：

```text
读取数据
  -> 检查数据质量
  -> 计算收益和风险
  -> 生成信号
  -> 转换为仓位
  -> 加入成本
  -> 运行回测
  -> 比较策略
  -> 扫描参数
  -> 做样本外验证
  -> 写研究报告
```

### 3.2 先评价，再策略

初学者容易急着写策略。课程必须先让用户知道如何评价策略：

- 什么是收益率。
- 为什么净值曲线比单日涨跌更重要。
- 为什么最大回撤会影响真实承受能力。
- 为什么夏普比率、胜率和盈亏比都有局限。

只有当用户能读懂一张回测报告后，才进入双均线、动量和均值回归。

### 3.3 每个策略都要经历同一套审查

每个策略必须经过：

- 与 buy and hold 比较。
- 加入手续费和滑点。
- 检查 signal 和 position 是否错位。
- 看净值曲线和回撤曲线。
- 看参数变化是否稳定。
- 做样本内 / 样本外对比。
- 写出为什么结果不能代表未来收益。

### 3.4 用同一份样例数据贯穿课程

首版用固定本地数据，例如 `SPY`、`AAPL`、`MSFT`、`NVDA` 的小型样例数据。这样用户每次学新概念时，不需要重新理解数据来源。

同一份数据会在课程中被反复使用：

- Module 1 用它理解 OHLCV。
- Module 2 用它计算收益。
- Module 3 用它计算风险。
- Module 5 用它做 buy and hold。
- Module 6 用它跑策略。
- Module 8 用它做参数扫描和样本外。

### 3.5 小节要短，模块要有产出

每节课控制在一个核心概念和一个代码产物内。每个模块结束时必须有一个 Mini Project：

- 不是只答题。
- 不是只复制代码。
- 必须能运行、能测试、能解释。

### 3.6 Codex 任务必须可验收

每个 Codex Prompt 都应该包含：

- 背景：当前学到什么。
- 目标：要实现什么。
- 输入和输出：函数签名或文件路径。
- 约束：避免 look-ahead bias、不要联网、不要实盘交易。
- 验收：运行哪些测试、期望哪些结果。
- 反思：让 Codex 解释边界和潜在错误。

## 4. 整体课程地图

v2 课程分为 10 个模块、47 节课、9 个 Mini Project 和 1 个 Capstone。

| 模块 | 主题 | 核心问题 | 模块产物 |
| --- | --- | --- | --- |
| 0 | 学习方式和项目边界 | 这门课如何学，哪些事情不能做？ | 学习计划和第一条 Codex 任务 |
| 1 | 美股数据入门 | 一行股票数据到底代表什么？ | 数据读取和质量报告 |
| 2 | 收益和净值 | 如何从价格得到收益路径？ | 收益率和净值曲线函数 |
| 3 | 风险和绩效指标 | 如何评价一条收益曲线？ | 指标计算模块 |
| 4 | 信号、仓位和成本 | 策略想法如何变成可回测的持仓？ | signal/position/cost 模块和偏差演示 |
| 5 | 第一套回测系统 | 如何把数据、仓位和指标串起来？ | 最小可用回测器 |
| 6 | 入门策略模式 | 趋势、动量、均值回归如何编码？ | 策略函数库 |
| 7 | 多股票组合 | 多资产收益和权重如何工作？ | 等权和轮动组合实验 |
| 8 | 参数实验和验证 | 为什么历史最优不等于未来有效？ | 参数扫描和样本外报告 |
| 9 | 回测边界和下一步 | 如何正确看待研究结果？ | 最终研究报告和学习路线 |

## 5. 标准 lesson 结构

每节课采用统一结构。

```text
1. 本节目标
2. 你会先看到什么现象
3. 概念解释
4. 直觉说明
5. 最小公式
6. 小型手算例子
7. Python 实现
8. 图表观察
9. 常见错误
10. Quiz
11. 动手练习
12. Codex Task
13. Checkpoint
```

### 5.1 每节课必须回答的问题

- 这个概念解决什么问题？
- 如果忽略它，回测会怎样出错？
- Python 代码里对应哪个函数或对象？
- 这个函数如何测试？
- 图表应该帮助用户看出什么？
- 用户在不离开课程页时，应该完成哪一个最小动手动作？
- 这个知识点和最终 Capstone 有什么关系？

### 5.2 每节课的代码要求

每节课的 Python 示例必须满足：

- 不依赖网络。
- 不使用用户自己的真实交易账户。
- 使用课程样例数据或极小 DataFrame。
- 可以复制到 Python 项目中运行。
- 对应一个真实模块或测试文件。

## 6. 详细课程设计

### Module 0: 学习方式和项目边界

模块目标：

- 建立正确边界：教育项目，不是投资建议，不是实盘交易系统。
- 让用户理解课程最终会产出一个可运行的学习型量化项目。
- 学会向 Codex 提出有约束、有验收标准的任务。

模块产物：

- `README.md` 中的项目边界声明。
- 第一条 Codex Prompt。
- 一个最小 `daily_return` 函数和测试。

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 0.1 | 这门课学什么，不学什么 | 量化研究、回测、paper trading、实盘的区别 | 无 | 学习路径图 | 总结项目边界和风险声明 | 能说出本项目不是投资建议 |
| 0.2 | 用 Codex 学量化的工作流 | Explain、Implement、Test、Reflect | `daily_return` 草稿 | Prompt 结构拆解 | 写一个带验收标准的函数实现任务 | 能写出清晰 Prompt |
| 0.3 | 第一个测试驱动的小函数 | 从价格变化到百分比收益 | `metrics.py` 雏形、`test_metrics.py` 雏形 | 单步公式卡 | 实现并测试 `daily_return(100, 105)` | 能运行第一个测试 |

Mini Project 0：

- 让 Codex 创建一个 `learning-notes.md`，记录项目边界、当前疑问和第一条已完成任务。

### Module 1: 美股数据入门

模块目标：

- 从零理解美股日线数据。
- 能读懂 OHLCV、交易日、ticker、adjusted close。
- 能在回测前做基础数据质量检查。

模块产物：

- `python/src/quant_learning/data.py`
- `python/data/sample_prices.csv`
- `validate_price_data` 的质量报告。

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1 | 美股市场和 ticker | 股票、ETF、指数、NYSE、Nasdaq、交易日 | 读取样例 CSV | ticker 判断 Quiz | 实现 `read_price_csv` | 能解释 ticker 不是公司全名 |
| 1.2 | 一行日线数据 | 日期索引、交易日缺口、日线粒度 | `DatetimeIndex` 处理 | 日历和价格点图 | 让 Codex 检查日期排序 | 能说明周末为什么没有日线 |
| 1.3 | OHLCV | open/high/low/close/volume | `validate_ohlcv_columns` | 简化蜡烛图 | 实现必要列检查 | 能读懂任意一行 OHLCV |
| 1.4 | Close vs Adjusted Close | 拆股、分红、复权价格 | `choose_price_column` | close/adj close 对比图 | 实现复权列选择 | 知道长期回测为何偏向 adj close |
| 1.5 | 数据质量检查 | 缺失值、重复日期、异常价格、非递增索引 | `validate_price_data` | 数据问题标记图 | 生成数据质量报告 | 能列出 4 个回测前检查项 |

Mini Project 1：

- 用 Codex 生成 `sample_prices_quality_report.json`。
- 页面展示质量报告摘要：日期范围、行数、缺失值、重复日期、价格异常。

### Module 2: 收益和净值

模块目标：

- 从价格序列得到收益率。
- 理解简单收益、复利和净值曲线。
- 建立“不要只看价格，要看收益路径”的意识。

模块产物：

- `calculate_returns`
- `compound_returns`
- `equity_curve_from_prices`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 2.1 | 价格变化不等于收益率 | 百分比收益和绝对涨跌 | `calculate_returns` | 价格 vs 收益柱状图 | 实现收益率函数和空值处理 | 能手算 100 到 110 的收益 |
| 2.2 | 日收益率序列 | `pct_change`、首日 NaN、索引对齐 | 返回日收益序列 | DataFrame 行高亮 | 写测试验证首日处理 | 能解释第一天为什么没有收益 |
| 2.3 | 复利和净值曲线 | 累加 vs 累乘 | `compound_returns` | 净值曲线 | 实现 `(1+r).cumprod()` | 能解释 equity curve |
| 2.4 | 总收益和年化收益 | 总收益、252 交易日、样本长度 | `annualized_return` | 持有天数滑块 | 实现年化收益率并处理短样本 | 知道短期年化可能误导 |
| 2.5 | 收益率小结 | 把价格、收益、净值串起来 | `metrics_summary_returns` | 三图联动 | 生成收益摘要表 | 能从价格得到净值曲线 |

Mini Project 2：

- 给 `SPY` 样例数据生成价格、日收益率和净值曲线。
- 让 Codex 写一个解释：为什么最终价格上涨不代表过程没有大波动。

### Module 3: 风险和绩效指标

模块目标：

- 学会评价收益曲线的风险。
- 理解波动率、最大回撤、夏普比率、胜率和盈亏比。
- 知道任何单一指标都有盲点。

模块产物：

- `annualized_volatility`
- `drawdown_series`
- `max_drawdown`
- `sharpe_ratio`
- `win_rate`
- `profit_loss_ratio`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 3.1 | 波动率 | 收益分布、标准差、年化 | `annualized_volatility` | 收益率直方图 | 实现波动率函数 | 能解释波动率不是亏损本身 |
| 3.2 | 最大回撤 | running max、drawdown | `drawdown_series`, `max_drawdown` | 净值和回撤双图 | 实现回撤序列 | 能找出净值曲线最痛苦区间 |
| 3.3 | 夏普比率 | 风险调整后收益、零波动边界 | `sharpe_ratio` | 指标卡片对比 | 实现夏普并测试零波动 | 知道高收益不等于高夏普 |
| 3.4 | 胜率和盈亏比 | 交易级指标和局限 | `win_rate`, `profit_loss_ratio` | 交易结果分布 | 实现交易指标 | 知道高胜率也可能亏钱 |
| 3.5 | 如何读一张指标表 | 指标组合解读 | `performance_summary` | 策略指标排序 | 生成 summary dict | 能指出至少 3 个指标盲点 |

Mini Project 3：

- 给 buy and hold 的样例净值生成完整绩效表。
- 页面展示指标卡片，并要求用户判断“这个结果哪里可能误导”。

### Module 4: 信号、仓位和交易成本

模块目标：

- 区分 signal 和 position。
- 理解为什么信号要滞后转换为持仓。
- 理解手续费、滑点和换手如何影响策略。

模块产物：

- `signals_to_positions`
- `calculate_turnover`
- `apply_transaction_costs`
- `normalize_weights`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 4.1 | Signal 是想法，不是收益 | signal、entry、exit | 简单 0/1 signal | 信号标记图 | 生成一个阈值信号 | 能区分信号和成交 |
| 4.2 | Position 才是持仓 | shift、lag、look-ahead bias | `signals_to_positions` | signal/position 对齐图 | 实现默认滞后一日 | 能解释为什么不能当天收盘信号当天成交 |
| 4.3 | 交易成本 | commission、slippage、bps、turnover | `calculate_turnover`, `apply_transaction_costs` | 成本滑块 | 实现成本扣减 | 能解释高换手策略为什么脆弱 |
| 4.4 | 仓位管理 | exposure、cash、weight、满仓/空仓 | `normalize_weights` | 仓位面积图 | 实现权重归一化 | 能区分买入和买多少 |
| 4.5 | 一个故意错误的回测 | 错误 shift 的后果 | bias demo 函数 | 错误/正确净值对比图 | 让 Codex 审查 look-ahead bias | 能发现一个常见回测错误 |

Mini Project 4：

- 实现一个小实验：同一组 signal，比较无成本、有成本、错误 shift、正确 shift 四条净值曲线。

### Module 5: 第一套回测系统

模块目标：

- 从函数拼接进入系统化回测。
- 把价格、收益、signal、position、cost、equity、metrics 串成统一流程。
- 形成可复用的 `BacktestResult`。

模块产物：

- `BacktestConfig`
- `BacktestResult`
- `run_backtest`
- `compare_strategies`
- `generate_backtest_report`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 5.1 | Buy and Hold 是基准 | benchmark、持有收益 | `buy_and_hold_signal` | benchmark 曲线 | 实现 buy and hold signal | 知道没有基准就难以评价策略 |
| 5.2 | 最小可用回测器 | asset returns、strategy returns、equity | `run_backtest` v1 | 回测流程图 | 实现单资产回测器 | 能说出回测的 5 个步骤 |
| 5.3 | 回测结果对象 | config、returns、equity、metrics | `BacktestResult` | 结果对象展开 | 用 dataclass 保存结果 | 能解释为什么要保存过程数据 |
| 5.4 | 回测报告 | summary、chart data、风险声明 | `generate_backtest_report` | 报告预览 | 生成 JSON/Markdown 报告 | 能产出一份非投资建议报告 |
| 5.5 | 用测试保护回测逻辑 | lag、成本、空输入、对齐 | `test_backtest.py` | 测试通过状态 | 写 4 个关键测试 | 能用测试发现回测错误 |

Mini Project 5：

- 运行 `SPY` buy and hold 回测，生成一份包含净值、回撤、指标和风险声明的报告。

### Module 6: 入门策略模式

模块目标：

- 学会用同一套回测框架实现不同策略想法。
- 理解趋势跟随、动量和均值回归的直觉与风险。
- 明确策略函数只生成 signal，不直接做回测。

模块产物：

- `moving_average_crossover`
- `momentum_signal`
- `mean_reversion_signal`
- `strategy_registry`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 6.1 | 双均线策略 | fast/slow MA、crossover、趋势 | `moving_average_crossover` | 均线和信号图 | 实现双均线 signal | 能解释快线穿越慢线的含义 |
| 6.2 | 动量策略 | lookback、过去收益、延续假设 | `momentum_signal` | 动量分数图 | 实现动量 signal | 能说出动量策略何时可能失效 |
| 6.3 | 均值回归策略 | rolling mean、z-score、阈值 | `mean_reversion_signal` | z-score 区间图 | 实现均值回归 signal | 知道下跌不一定反弹 |
| 6.4 | 策略参数和函数接口 | 参数合法性、返回索引对齐 | strategy validation | 参数表单 | 给策略函数加参数校验 | 能说明非法参数如何处理 |
| 6.5 | 策略对比 | 同一回测器、同一指标表 | `compare_strategies` | 多策略净值对比 | 比较 3 个策略和 benchmark | 能指出策略对比必须公平 |

Mini Project 6：

- 在同一只股票上比较 buy and hold、双均线、动量、均值回归。
- 写出每个策略的“假设、优点、风险、结果不可靠之处”。

### Module 7: 多股票组合

模块目标：

- 从单资产策略扩展到多资产组合。
- 理解权重、组合收益、再平衡和 benchmark。
- 让用户知道“分散化”不是简单买很多股票。

模块产物：

- `align_price_data`
- `equal_weight_portfolio`
- `rebalance_weights`
- `momentum_rotation_signal`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 7.1 | 多股票数据对齐 | 日期交集、缺失数据、列对齐 | `align_price_data` | 多资产缺失热力图 | 对齐多股票价格 | 能解释为什么不能随便填补缺失值 |
| 7.2 | 组合收益 | 权重乘以资产收益 | `equal_weight_portfolio` | 权重和收益图 | 实现等权组合收益 | 能手算两资产组合收益 |
| 7.3 | 再平衡 | daily/monthly rebalance、漂移 | `rebalance_weights` | 权重漂移图 | 实现月度再平衡权重 | 知道再平衡会带来成本 |
| 7.4 | 多资产动量轮动 | ranking、top-n、cash fallback | `momentum_rotation_signal` | 排名变化图 | 实现 top-n 动量选择 | 能解释排名策略的风险 |
| 7.5 | 组合 vs SPY | benchmark、分散化、回撤 | portfolio report | 组合对比图 | 生成组合回测报告 | 能判断组合是否真的改善风险 |

Mini Project 7：

- 比较单只股票、等权组合、动量轮动组合和 `SPY` benchmark。
- 输出一份组合绩效表。

### Module 8: 参数实验和验证

模块目标：

- 让用户看到“历史最优参数”为什么危险。
- 学会用样本内 / 样本外拆分验证策略。
- 了解过拟合、数据窥探和多重测试问题。

模块产物：

- `scan_moving_average_parameters`
- `train_test_split_time_series`
- `evaluate_in_sample_out_of_sample`
- `simulate_random_strategies`
- `yearly_performance`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 8.1 | 参数扫描 | grid search、fast/slow 约束 | `scan_moving_average_parameters` | 参数热力图 | 扫描双均线参数 | 能解释为何跳过 fast >= slow |
| 8.2 | 样本内和样本外 | train/test split、时间顺序 | `train_test_split_time_series` | 分段净值图 | 按日期切分数据 | 知道不能随机打乱时间序列 |
| 8.3 | 最优参数迁移测试 | in-sample best vs out-of-sample | `evaluate_in_sample_out_of_sample` | 样本内/外指标表 | 验证最优参数样本外表现 | 能解释样本外差说明什么 |
| 8.4 | 随机策略也会有赢家 | multiple testing、data snooping | `simulate_random_strategies` | 随机策略云图 | 模拟 100 条随机 signal | 能识别“挑最好截图”的风险 |
| 8.5 | 分年度表现 | regime change、稳定性 | `yearly_performance` | 年度收益表 | 生成年份分组指标 | 能解释市场环境变化 |

Mini Project 8：

- 对双均线策略做参数扫描。
- 选出样本内最优参数，并展示样本外表现。
- 写出“为什么这不是未来收益承诺”。

### Module 9: 回测边界、Paper Trading 和 Capstone

模块目标：

- 建立对回测结果的正确态度。
- 理解 paper trading 和实盘交易的差异。
- 完成一个可展示的最终学习项目。

模块产物：

- `bias_checklist.md`
- `paper_signal_log.py`
- `final_research_report.md`

| 课号 | 标题 | 重点 | Python 产物 | 交互 | Codex Task | Checkpoint |
| --- | --- | --- | --- | --- | --- | --- |
| 9.1 | 常见回测偏差 | look-ahead、survivorship、selection、data snooping | bias checklist | 偏差诊断 Quiz | 审查回测函数偏差 | 能列出 4 类常见偏差 |
| 9.2 | 为什么回测不能代表未来 | 不确定性、市场变化、流动性、执行 | 风险说明模板 | 回测结果改写练习 | 让 Codex 把夸张结论改为严谨结论 | 能写出合格风险声明 |
| 9.3 | Paper Trading vs 实盘 | 模拟信号、真实执行、心理和延迟 | `paper_signal_log.py` | research-to-live 流程图 | 实现只记录信号的 logger | 知道本项目不下单 |
| 9.4 | Capstone: 完整策略研究报告 | 数据、策略、回测、验证、限制 | `final_research_report.md` | 报告结构检查器 | 生成并审查最终报告 | 能交付一份完整学习报告 |
| 9.5 | 下一步路线 | 统计、时间序列、因子、组合、工程化 | roadmap doc | 学习路线图 | 生成个人下一步计划 | 知道下一阶段学什么 |

Capstone 要求：

- 选择一个学习策略，例如双均线、动量或均值回归。
- 使用本地样例数据，不联网。
- 明确数据范围和处理方式。
- 与 buy and hold 和 `SPY` benchmark 对比。
- 展示净值、回撤、指标、成本影响、参数扫描和样本外结果。
- 写明至少 5 条局限或风险。
- 报告中必须包含“不构成投资建议，不代表未来收益”的声明。
- Python 测试必须通过。

## 7. 课程与代码同步契约

课程内容和 Python 项目必须遵守同步契约。

| 课程阶段 | MDX 内容 | Python 模块 | 测试文件 | 前端图表 |
| --- | --- | --- | --- | --- |
| 数据 | `101-*.mdx` | `data.py` | `test_data.py` | `PriceChart`, `DataQualityChart` |
| 收益 | `201-*.mdx` | `metrics.py` | `test_metrics.py` | `ReturnsChart`, `EquityCurveChart` |
| 风险 | `301-*.mdx` | `metrics.py` | `test_metrics.py` | `DrawdownChart`, `MetricsGrid` |
| 仓位成本 | `401-*.mdx` | `positions.py`, `costs.py` | `test_positions.py`, `test_costs.py` | `PositionChart`, `CostComparisonChart` |
| 回测 | `501-*.mdx` | `backtest.py`, `reports.py` | `test_backtest.py`, `test_reports.py` | `BacktestSummary` |
| 策略 | `601-*.mdx` | `strategies.py` | `test_strategies.py` | `MovingAverageChart`, `StrategyComparisonChart` |
| 组合 | `701-*.mdx` | `portfolio.py` 或 `strategies.py` | `test_portfolio.py` | `PortfolioWeightsChart` |
| 实验 | `801-*.mdx` | `experiments.py` | `test_experiments.py` | `ParameterScanChart`, `OutOfSampleChart` |
| 边界 | `901-*.mdx` | `reports.py` | `test_reports.py` | `BiasChecklist`, `ReportPreview` |

规则：

- 如果课程中出现一个函数名，Python 项目必须有对应实现或明确标注为伪代码。
- 如果 Python 项目新增核心函数，至少一节课程或实验页要解释它。
- 每个模块至少有一个 pytest 文件覆盖核心行为。
- 课程图表的数据结构应尽量来自 Python 示例输出的同构 JSON。

## 8. Quiz 设计规范

Quiz 不应该只考名词，而要测试误区。

### 8.1 题型

- 单选：检查概念边界。
- 判断：识别错误说法。
- 排序：按回测流程排列步骤。
- 诊断：给一段伪代码，判断是否有 look-ahead bias。

### 8.2 示例题

收益率课：

- 问题：股票 A 从 10 涨到 11，股票 B 从 100 涨到 101，谁的收益率更高？
- 正确答案：股票 A。
- 解释：A 上涨 10%，B 上涨 1%。

Signal / Position 课：

- 问题：用当天收盘价计算信号，并假设当天已经按该收盘价建仓，最大风险是什么？
- 正确答案：look-ahead bias。
- 解释：策略使用了现实中当时还无法同时决策和成交的信息。

回测边界课：

- 问题：样本外表现好是否证明策略未来一定赚钱？
- 正确答案：不能。
- 解释：样本外只是更严格的历史验证，仍然不是未来保证。

## 8.3 动手练习规范

每节课都应有一个小型动手练习面板，目标是让用户在进入 Codex Task 之前先完成最小理解闭环。

动手练习包含：

- 定位代码：指出本节对应的 Python 模块或报告文件。
- 运行小例子：用课程中的手算例子构造极小输入。
- 写下边界：记录本节最容易误用的地方，并考虑是否需要测试或报告说明。

动手练习不替代 Mini Project。它服务单节课理解；Mini Project 服务模块级产出。

## 9. Codex Prompt 设计规范

### 9.1 Prompt 模板

```text
你正在实现 learn-quant-with-codex 的第 {lesson_id} 课：{lesson_title}。

背景：
- 当前课程讲到：{concepts}
- 已有代码：{existing_modules}

任务：
- 在 {target_file} 中实现 {function_name}
- 函数签名：{signature}
- 输入含义：{inputs}
- 输出含义：{outputs}

约束：
- 不联网。
- 不做实盘交易或投资建议。
- 保持索引对齐。
- 默认避免 look-ahead bias。
- 对空输入和 NaN 给出明确行为。

验收：
- 新增或更新 {test_file}
- 运行 uv run pytest
- 用一个极小 DataFrame 解释结果。

请先说明实现思路，再修改代码，最后总结边界和可能误用。
```

### 9.2 Prompt 难度分层

- Level 1: 实现单个纯函数。
- Level 2: 实现函数和测试。
- Level 3: 修改多个模块并生成报告。
- Level 4: 审查已有代码中的偏差。
- Level 5: 完成 Capstone 报告。

## 10. Mini Project 和 Capstone 评分标准

### 10.1 Mini Project 标准

每个 Mini Project 评分维度：

- 正确性：代码输出是否符合公式和课程解释。
- 可读性：函数命名、注释和结构是否适合初学者复查。
- 可测试性：是否有 pytest 覆盖关键边界。
- 可解释性：用户是否能用自己的话说明结果。
- 风险意识：是否避免夸大回测意义。

### 10.2 Capstone Rubric

| 维度 | 要求 |
| --- | --- |
| 数据处理 | 数据读取、复权列选择、质量报告清楚 |
| 指标计算 | 收益、年化、波动率、回撤、夏普等指标正确 |
| 策略实现 | signal 和 position 分离，默认滞后一日 |
| 成本处理 | 至少比较无成本和有成本结果 |
| 基准比较 | 至少包含 buy and hold 或 SPY benchmark |
| 参数实验 | 至少扫描一组参数并解释稳定性 |
| 样本外验证 | 有时间序列切分，不随机打乱 |
| 偏差检查 | 明确讨论 look-ahead、过拟合等问题 |
| 报告质量 | 图表、指标、结论和限制完整 |
| 风险声明 | 明确说明教育用途和非投资建议 |

## 11. 课程落地优先级

首版不必一次写完 47 节完整长文，但必须保证主线闭环。

### 11.1 MVP 必做课程

首版最少完成 14 节：

- 0.1 项目边界
- 0.2 Codex 学习工作流
- 1.3 OHLCV
- 1.4 Close vs Adjusted Close
- 1.5 数据质量检查
- 2.1 收益率
- 2.3 复利和净值曲线
- 3.2 最大回撤
- 3.3 夏普比率
- 4.2 Signal 和 Position
- 4.3 交易成本
- 5.1 Buy and Hold
- 5.2 最小可用回测器
- 6.1 双均线策略

MVP 必须同时完成：

- 一个课程目录页。
- 至少一个完整课程详情页模板。
- Quiz、复制 Prompt、图表和指标卡片。
- Python 数据、指标、仓位、策略、回测核心模块。
- pytest 可以运行。

### 11.2 v1 完整课程

完成 47 节课、9 个 Mini Project 和 Capstone。

### 11.3 v2 扩展课程

后续可增加：

- 因子研究入门。
- 简单横截面选股。
- walk-forward validation。
- 风险预算和组合优化。
- 数据供应商比较。
- 事件驱动回测系统导论。

## 12. 和旧课程设计的主要差异

旧设计覆盖主题较全，但更像主题清单。v2 的变化：

- 增加“项目主线”：每个模块都有明确代码产物。
- 将“风险指标”拆得更扎实，保证策略前先会评价。
- 将“signal/position/cost/look-ahead”提前到回测之前。
- 增加多资产数据对齐、再平衡和组合 benchmark。
- 将过拟合和样本外验证扩展成完整模块。
- 增加 Mini Project、Capstone 和评分标准。
- 把 Codex Prompt 从复制文本升级为可验收任务模板。

## 13. 课程内容写作原则

- 每节课只讲一个核心问题。
- 第一段先回答“为什么学这个”。
- 术语首次出现时给英文原词。
- 公式必须配小型手算例子。
- 代码必须配测试或边界说明。
- 图表必须说明读图重点。
- 策略章节必须写“策略假设”和“失效场景”。
- 回测结果必须同时显示收益和回撤。
- 所有报告和策略页面必须包含非投资建议声明。
