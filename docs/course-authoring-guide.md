# learn-quant-with-codex 课程内容创作指南 v4.4

## 1. 目的

`course-design.md` 定义课程主线和模块结构，本指南定义每节课如何写成可学习、可运行、可验收的课程页。

本项目的课程设计不追求把量化术语讲得最多，而是让初学者每节课都完成一个明确动作：

```text
看懂一个问题
  -> 识别一个常见误区
  -> 手算一个小例子
  -> 运行一个 Python 产物
  -> 观察一张图
  -> 完成一个 Quiz 或练习
  -> 复制一条可验收的 Codex Prompt
  -> 留下一个 Checkpoint 材料
```

后续新增课程、重写课程或扩展实验页时，先检查本指南，再修改代码或页面。

## 2. 参考教程带来的课程机制

本项目参考已有教程时，只吸收教学机制，不复制策略结论或实盘流程。

| 参考教程 | 观察到的机制 | 本项目转换规则 |
| --- | --- | --- |
| [QuantConnect Learning Center Course Structure](https://www.quantconnect.com/docs/v2/cloud-platform/learning-center/course-structure) | lesson 被拆成 readings、coding exercises、tasks、results、hints/solutions | 每节课必须有 Codex Task、运行命令、Checkpoint 和失败后可复查的提示 |
| [Georgia Tech CS 7646 ML4T](https://omscs.gatech.edu/cs-7646-machine-learning-trading) | 从金融数据处理到交易决策，课程由项目作业驱动 | 课程按项目产物推进，每个模块产物都能进入 Capstone |
| [Backtrader Quickstart](https://www.backtrader.com/docu/quickstart/quickstart/) | 从空框架逐步加入数据、策略、参数、图表和优化 | 回测系统先做最小可用版本，再逐步加入结果对象、报告、参数实验 |
| [Zipline Beginner Tutorial](https://zipline-trader.readthedocs.io/en/latest/my-beginner-tutorial.html) | 强调 stream-based、slippage、transaction costs、order delays 和避免 look-ahead | 在回测前先讲 signal、position、lag、成本和执行简化 |
| [QuantStart Successful Backtesting](https://www.quantstart.com/articles/Successful-Backtesting-of-Algorithmic-Trading-Strategies-Part-I/) | 系统讨论 optimisation bias、look-ahead bias、survivorship bias 和心理承受偏差 | 偏差教育进入主线课程，策略结果必须带限制说明 |
| [QuantStart Successful Backtesting Part II](https://www.quantstart.com/articles/Successful-Backtesting-of-Algorithmic-Trading-Strategies-Part-II/) | 交易成本不只是佣金，还包含滑点、市场冲击等执行成本 | 成本课程和策略比较必须展示无成本 / 有成本差异 |
| [EDHEC / Coursera Investment Management with Python](https://www.coursera.org/specializations/investment-management-python-machine-learning/) | 面向 beginner level，把 Python、风险收益和组合分析结合 | 收益、风险和组合课必须同时出现公式、Python、图表和手算例子 |

这些参考带来的最终要求是：本站课程不能只像文章，也不能只像代码仓库。它必须像一组可复查的实验工单。v4.4 进一步要求每节课连接一条纵向能力线，并让每个模块通过进入 / 退出闸门证明用户已经获得下一模块所需能力。

## 3. 初学者学习路径

课程写作时默认用户不懂金融、不懂美股、不懂量化，但能阅读基础 Python。

| 阶段 | 初学者真实问题 | 课程必须先回答 | 不应该提前做 |
| --- | --- | --- | --- |
| 边界 | 这是投资建议吗？Codex 会不会帮我赚钱？ | 教育用途、非投资建议、回测和未来的区别 | 宣传策略收益 |
| 数据 | 一行股票数据是什么？为什么周末没有数据？ | OHLCV、ticker、交易日、复权价格和质量检查 | 直接跑策略 |
| 收益 | 价格上涨和收益率有什么区别？ | 百分比收益、复利、净值曲线 | 先讲夏普或策略排名 |
| 风险 | 曲线最后涨了是不是就好？ | 波动、回撤、夏普、胜率和指标盲点 | 用单一指标评判策略 |
| 执行 | 策略想法为什么不能直接变收益？ | signal、position、lag、成本、换手 | 假设当天收盘信号当天成交 |
| 回测 | 如何把前面函数串起来？ | 回测流程、结果对象、报告、测试 | 引入复杂事件驱动框架 |
| 策略 | 双均线、动量、均值回归有什么用？ | 策略假设、信号函数、公平比较、失效场景 | 写成“推荐策略” |
| 组合 | 多只股票是不是一定更安全？ | 权重、对齐、再平衡、benchmark | 高级组合优化 |
| 验证 | 历史最优参数为什么危险？ | 样本内 / 外、参数稳定性、多重测试 | 只展示最好参数 |
| 报告 | 我该如何陈述结果？ | 数据、假设、成本、偏差、限制和下一步 | 生成收益承诺式结论 |

## 4. 单节课强制结构

每节课最多引入一个核心概念。页面可以短，但不能缺少学习闭环。

### 4.1 页面结构

```text
Lesson Question
  用一句话说明本节解决什么问题。

Why It Matters
  说明忽略这个问题会造成什么错误。

Tiny Example
  用 2-5 个数字完成手算。

Mental Model
  用白话解释，再给英文术语和最小公式。

Python Artifact
  指向真实函数、测试、示例脚本或报告路径。

Chart Observation
  告诉用户图上看什么，以及不要误读什么。

Mistake Clinic
  展示一个初学者常见误用。

Quiz / Exercise
  让用户暴露一个误区，而不是背定义。

Codex Task
  背景、目标、输入输出、约束、验收、反思。

Checkpoint
  本节留下的代码、测试、报告、笔记或 Capstone 材料。
```

### 4.2 四个验收问题

写完一节课后，作者必须能回答：

| 问题 | 合格答案 |
| --- | --- |
| 用户看完能说清什么？ | 一个具体概念或错误模式 |
| 用户能运行什么？ | 一个函数、pytest、示例脚本或报告生成命令 |
| 用户能观察什么？ | 图表中的路径、对齐、成本、回撤或参数变化 |
| 用户能带走什么？ | Checkpoint 里的代码产物、报告片段或风险声明 |

如果一节课无法回答这四个问题，就不是完整课程页。

### 4.3 v4.4 Lesson Brief

写正文前，先填下面的 Lesson Brief。它是从 QuantConnect task、EDHEC Python lab、ML4T project 和 QuantStart diagnostic 机制抽出来的最小设计单元。

```text
Lesson id:
Lesson title:
Lesson type: Boundary / Concept / Implementation / Diagnostic / Report
Vertical skill line: 数据审查 / 收益路径 / 风险解释 / 执行假设 / 验证能力 / 研究表达

Core question:
  用户本节必须能回答的一个问题。

Beginner trap:
  如果用户跳过本节，最可能犯什么错？

Tiny example:
  2-5 行可手算数据或伪代码。

Python artifact:
  文件、函数、测试、脚本或报告路径。

Chart observation:
  图上看什么？不要误读什么？

Codex acceptance:
  运行哪个命令？看哪个文件？用哪个手算值核对？

Checkpoint material:
  本节进入 Mini Project 或 Capstone 的材料。
```

没有填完 Lesson Brief 的课程，不应进入正文写作。这样可以避免写成“解释一堆术语，但用户不知道该做什么”的普通文章。

### 4.4 模块闸门写作规则

每个模块开头和 Mini Project 区域都要呼应 `course-design.md` 的进入 / 退出闸门。

模块开头必须写清：

- 进入本模块前，用户已经完成什么产物。
- 本模块会把哪个能力推进到下一步。
- 本模块结束后，哪个文件、图表、测试或报告片段可以进入 Capstone。

模块 Mini Project 必须写清：

- 交付物路径。
- 运行命令。
- 至少 3 条验收项。
- 一个限制或偏差反思问题。
- 下一模块会如何使用这个产物。

## 5. 48 节课写作矩阵

下表补充 `course-design.md` 的详细课表。它规定每节课必须暴露的误区、必须留下的产物和推荐反馈方式。

### 5.0 纵向能力线分配

每节课至少服务一条能力线。作者写作时优先使用下表，不要把课程写成彼此无关的知识点。

| 能力线 | 主要课程 | 写作重点 |
| --- | --- | --- |
| 数据审查 | 1.1-1.5、7.1、9.1 | 数据字段、日期、复权、缺失和选择偏差 |
| 收益路径 | 0.3、2.1-2.5、5.1、5.2、6.5 | 价格、收益、净值、回撤路径的转换 |
| 风险解释 | 3.1-3.5、5.4、7.5 | 指标盲点、风险表、报告解释 |
| 执行假设 | 4.1-4.5、5.2、6.1-6.4、7.3 | signal、position、lag、成本、换手 |
| 验证能力 | 4.5、8.1-8.5、9.1、9.2 | 偏差诊断、参数稳定性、样本外、随机赢家 |
| 研究表达 | 0.1、0.2、5.4、8.3、9.2-9.5 | Codex 工单、风险声明、报告语言和下一步路线 |

### Module 0: 学习方式和边界

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 0.1 | 这门课学什么，不学什么 | 把课程策略当投资建议 | 项目边界说明 | 边界判断 Quiz |
| 0.2 | 用 Codex 学量化的工作流 | 只让 Codex 写代码，不给约束和验收 | 第一条结构化 Prompt | Prompt 拆解练习 |
| 0.3 | 第一个测试驱动的小函数 | 不测试公式边界 | `daily_return` 和测试 | 单步手算 + pytest |

### Module 1: 美股数据入门

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 1.1 | 美股市场和 ticker | 把 ticker 当公司全名或策略结论 | `read_price_csv` | ticker 判断 Quiz |
| 1.2 | 一行日线数据 | 以为每天都有交易数据 | 日期索引检查 | 交易日缺口图 |
| 1.3 | OHLCV | 不检查列就计算指标 | `validate_ohlcv_columns` | OHLCV 行诊断 |
| 1.4 | Close vs Adjusted Close | 长期回测误用未复权价格 | `choose_price_column` | close / adj close 对比图 |
| 1.5 | 数据质量检查 | 静默修复缺失、重复和异常价格 | 数据质量报告 | 问题标记图 |

### Module 2: 收益和净值

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 2.1 | 价格变化不等于收益率 | 用绝对涨跌比较股票 | `calculate_returns` | 价格 vs 收益柱状图 |
| 2.2 | 日收益率序列 | 忽略首日 NaN 和索引对齐 | 日收益序列测试 | DataFrame 行高亮 |
| 2.3 | 复利和净值曲线 | 把每日收益简单相加 | `compound_returns` | 净值曲线 |
| 2.4 | 总收益和年化收益 | 过度解读短样本年化 | `annualized_return` | 持有天数滑块 |
| 2.5 | 收益率小结 | 价格、收益、净值三者脱节 | 收益摘要表 | 三图联动 |

### Module 3: 风险和绩效指标

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 3.1 | 波动率 | 把波动率等同亏损 | `annualized_volatility` | 收益分布图 |
| 3.2 | 最大回撤 | 只看最终收益 | `drawdown_series`、`max_drawdown` | 净值 / 回撤双图 |
| 3.3 | 夏普比率 | 高收益等于好策略 | `sharpe_ratio` | 指标卡片对比 |
| 3.4 | 胜率和盈亏比 | 高胜率必然赚钱 | `win_rate`、`profit_loss_ratio` | 交易结果分布 |
| 3.5 | 如何读一张指标表 | 用单一指标排序策略 | `performance_summary` | 指标盲点 Quiz |

### Module 4: 信号、仓位和交易成本

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 4.1 | Signal 是想法，不是收益 | 把 signal 当成交收益 | 0/1 signal 示例 | 信号标记图 |
| 4.2 | Position 才是持仓 | 当天收盘信号当天成交 | `signals_to_positions(lag=1)` | signal / position 对齐图 |
| 4.3 | 交易成本 | 忽略高换手成本侵蚀 | `calculate_turnover`、`apply_transaction_costs` | 成本滑块 |
| 4.4 | 仓位管理 | 只决定买不买，不决定买多少 | `normalize_weights` | 仓位面积图 |
| 4.5 | 一个故意错误的回测 | look-ahead bias 看起来也能盈利 | bias demo | 错误 / 正确净值对比 |

### Module 5: 第一套回测系统

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 5.1 | Buy and Hold 是基准 | 没有 benchmark 就评价策略 | `buy_and_hold_signal` | benchmark 曲线 |
| 5.2 | 最小可用回测器 | 不保存中间序列，无法审查 | `run_backtest` v1 | 回测流程图 |
| 5.3 | 回测结果对象 | 只保存最终收益 | `BacktestResult` | 结果对象展开 |
| 5.4 | 回测报告 | 报告只展示收益截图 | `generate_backtest_report` | 报告预览 |
| 5.5 | 用测试保护回测逻辑 | 回测逻辑错但图很好看 | `test_backtest.py` | 测试清单 |

### Module 6: 入门策略模式

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 6.1 | 双均线策略 | 均线穿越被当成盈利保证 | `moving_average_crossover` | 均线和信号图 |
| 6.2 | 动量策略 | 过去上涨必然延续 | `momentum_signal` | 动量分数图 |
| 6.3 | 均值回归策略 | 下跌一定反弹 | `mean_reversion_signal` | z-score 区间图 |
| 6.4 | 策略参数和函数接口 | 非法参数静默运行 | 参数校验 | 参数表单 |
| 6.5 | 策略对比 | 不同成本、lag 或数据下比较 | `compare_strategies` | 多策略净值对比 |

### Module 7: 多股票组合

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 7.1 | 多股票数据对齐 | 随便填补缺失日期 | `align_price_data` | 缺失热力图 |
| 7.2 | 组合收益 | 不按权重计算组合收益 | `equal_weight_portfolio` | 权重和收益图 |
| 7.3 | 再平衡 | 忽略权重漂移和成本 | `rebalance_weights` | 权重漂移图 |
| 7.4 | 多资产动量轮动 | 排名高就安全 | `momentum_rotation_signal` | 排名变化图 |
| 7.5 | 组合 vs SPY | 分散化等于稳赚 | 组合报告 | 组合对比图 |

### Module 8: 参数实验和验证

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 8.1 | 参数扫描 | 只看历史最佳参数 | `scan_moving_average_parameters` | 参数热力图 |
| 8.2 | 样本内和样本外 | 随机打乱时间序列 | `train_test_split_time_series` | 分段净值图 |
| 8.3 | 最优参数迁移测试 | 样本内最优等于未来有效 | `evaluate_in_sample_out_of_sample` | 样本内 / 外指标表 |
| 8.4 | 随机策略也会有赢家 | 多次测试后挑最好截图 | `simulate_random_strategies` | 随机策略云图 |
| 8.5 | 分年度表现 | 忽略市场阶段变化 | `yearly_performance` | 年度收益表 |

### Module 9: 回测边界、Paper Trading 和 Capstone

| 课号 | 标题 | 必须暴露的误区 | 必须留下的产物 | 推荐反馈 |
| --- | --- | --- | --- | --- |
| 9.1 | 常见回测偏差 | 只记偏差名词，不会诊断代码 | `bias_checklist.md` | 偏差诊断 Quiz |
| 9.2 | 为什么回测不能代表未来 | 把历史结果写成承诺 | 风险说明模板 | 结论改写练习 |
| 9.3 | Paper Trading vs 实盘 | 认为模拟信号等于真实成交 | `paper_signal_log.py` | research-to-live 流程图 |
| 9.4 | Capstone: 完整策略研究报告 | 报告只汇总指标 | `final_research_report.md` | 报告结构检查器 |
| 9.5 | 下一步路线 | 跳过基础直接学复杂模型 | roadmap doc | 学习路线图 |

## 6. 三类关键课程的写作示例

### 6.1 概念课示例：2.1 价格变化不等于收益率

课程页必须按下面的顺序写：

1. 先问：为什么 A 股票涨 1 美元和 B 股票涨 1 美元不是同一件事？
2. 给手算例子：`10 -> 11` 是 10%，`100 -> 101` 是 1%。
3. 给公式：`return = current / previous - 1`。
4. 给 Python：`calculate_returns(prices)`。
5. 给图表：左边价格，右边收益率柱状图。
6. 给误区：不能用绝对涨跌比较不同价格水平的股票。
7. 给 Codex Task：实现函数、测试首日 NaN、解释索引对齐。
8. Checkpoint：用户能用自己的话解释价格、收益和百分比变化。

### 6.2 诊断课示例：4.2 Position 才是持仓

课程页必须故意展示错误实现：

```python
wrong_strategy_returns = returns * signal
```

然后展示正确的学习版实现：

```python
position = signals_to_positions(signal, lag=1)
strategy_returns = returns * position
```

用户必须在图表里看到：

- `signal` 是当天生成的想法。
- `position` 是下一期才生效的持仓。
- 错误实现可能让净值曲线变得异常好看。
- 正确实现并不保证真实可交易，只是减少最明显的 look-ahead bias。

### 6.3 验证课示例：8.3 最优参数迁移测试

课程页不能只展示最优参数。必须同时展示：

- 样本内参数热力图。
- 样本内最佳参数。
- 样本外同一参数的净值和指标。
- 如果样本外表现变差，说明什么。
- 即使样本外表现不错，为什么仍然不能代表未来收益。

Quiz 必须检查这个误区：样本外结果好只说明更严格的历史验证通过了一步，不是未来收益保证。

## 7. Lab 使用规则

Lab 是课程的观察工具，不是独立炫技页面。

| Lab | 服务课程 | 必须回答的问题 | 不应做的事 |
| --- | --- | --- | --- |
| `/labs/metrics` | Module 2、3 | 收益、复利、波动、回撤、夏普如何联动 | 只显示漂亮曲线，不解释误读 |
| `/labs/strategies` | Module 4、5、6、7 | signal、position、成本和策略对比如何改变净值 | 给出策略推荐 |
| `/labs/parameter-scan` | Module 8 | 参数扫描、样本内外和随机赢家如何暴露过拟合 | 只突出历史最佳参数 |

课程页链接 Lab 时，必须告诉用户“去实验页观察什么”，而不是只放入口。

## 8. Codex Task 写作规则

每条 Codex Prompt 必须像工程工单，不像一句聊天请求。

必须包含：

- 背景：当前课程、已学概念、教育边界。
- 目标：实现函数、测试、报告或审查。
- 输入输出：参数、索引、返回值、文件路径。
- 约束：不联网、不实盘、不投资建议、默认避免 look-ahead。
- 验收：pytest、示例脚本、报告文件或手算值。
- 反思：解释误用风险和结论边界。

推荐结尾：

```text
请先说明实现思路，再修改代码，最后总结这个函数可能被误用的地方。
```

这能迫使 Codex 把学习目标、代码目标和风险边界放在同一条任务里。

## 9. 课程质量门槛

新增或改写课程时，必须通过以下门槛：

| 门槛 | 检查方式 |
| --- | --- |
| 初学者友好 | 第一屏不用专业术语堆叠，先讲问题 |
| 可手算 | 至少一个 2-5 行的小例子 |
| 可运行 | 指向真实 Python 函数、测试、脚本或报告 |
| 可观察 | 图表有观察问题和误读提醒 |
| 可诊断 | 至少一个常见错误模式 |
| 可验收 | Codex Task 有命令或文件产物 |
| 可反思 | Checkpoint 要求写边界、限制或 Capstone 片段 |
| 安全边界 | 策略和回测不写成投资建议或未来收益保证 |

## 10. 内容扩展顺序

如果资源有限，优先把下面课程写成高质量完整页：

1. 0.1 项目边界
2. 1.4 Close vs Adjusted Close
3. 1.5 数据质量检查
4. 2.1 收益率
5. 2.3 复利和净值曲线
6. 3.2 最大回撤
7. 3.3 夏普比率
8. 4.1 Signal 是想法
9. 4.2 Position 才是持仓
10. 4.3 交易成本
11. 4.5 一个故意错误的回测
12. 5.2 最小可用回测器
13. 6.1 双均线策略
14. 8.3 最优参数迁移测试
15. 9.2 为什么回测不能代表未来
16. 9.4 Capstone: 完整策略研究报告

这些课程构成项目的教学骨架：数据可信、指标可读、回测可审、策略可比较、结论有边界。

## 11. 作者自查清单

提交课程内容前，逐项确认：

- 我是否说明了这节课解决的真实问题？
- 我是否用小数字让用户能手算一次？
- 我是否把概念落到 Python 项目的真实文件？
- 我是否说明图表应该观察什么？
- 我是否暴露了至少一个初学者会犯的错误？
- 我是否给出可复制、可验收的 Codex Prompt？
- 我是否让 Checkpoint 进入 Mini Project 或 Capstone？
- 我是否避免任何投资建议、个股推荐和未来收益承诺？
