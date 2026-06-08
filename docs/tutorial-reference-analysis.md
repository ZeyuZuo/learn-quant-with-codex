# 课程参考教程分析

本文档用于回答一个核心问题：`learn-quant-with-codex` 的课程设计应该如何参考成熟量化、回测和交互式编程教程，同时保持“初学者友好、教育用途、代码可运行、风险边界清楚”的定位。

本项目不会照搬外部教程的策略、代码或交易结论。参考的重点是课程结构、学习节奏、任务设计和验收方式。

## 1. 参考来源

| 来源 | 主要观察 | 对本项目的启发 |
| --- | --- | --- |
| QuantConnect Learning Center / Boot Camp | 课程拆成 lesson、task、result、hint、solution，强调完成小任务后获得反馈 | 每节课必须有可验收的 Codex Task，而不只是阅读材料 |
| Georgia Tech CS 7646 ML4T | 课程由多个项目驱动，包含 market simulator、indicator evaluation、strategy evaluation 等作业 | 课程主线应围绕项目产物推进，Mini Project 和 Capstone 不能只是附加内容 |
| Backtrader Quickstart / Strategy 文档 | 从最小运行环境逐步加入数据、策略、参数、订单和分析；策略有明确生命周期 | 回测系统要逐步搭建，不应一开始就塞入完整框架 |
| Zipline Beginner Tutorial | 强调回测中的交易成本、滑点、订单延迟和事件流，算法由初始化和逐 bar 处理组成 | 初学者版可以先用向量化回测，但必须解释它和事件驱动回测的差距 |
| QuantStart Backtesting 系列 | 区分向量化和事件驱动回测，系统讨论优化偏差、look-ahead、survivorship 等偏差 | 回测偏差必须贯穿课程，不能放在最后当成可选阅读 |
| EDHEC / Coursera 投资管理 Python 课程 | 收益、风险、组合和 Python lab 同步推进，面向没有深厚金融背景的学习者 | 先讲收益和风险，再讲策略；每个公式都要落到 Python 和图表 |

## 2. 对课程设计的关键结论

### 2.1 课程必须是项目驱动，而不是术语驱动

成熟教程的共同点是让学习者不断完成具体产物。本项目采用以下递进产物：

```text
数据质量报告
  -> 收益率和净值函数
  -> 风险指标模块
  -> signal/position/cost 模块
  -> 最小回测器
  -> 策略函数库
  -> 多资产组合实验
  -> 参数扫描和样本外验证
  -> Capstone 研究报告
```

每个模块必须留下一个可运行、可测试、可解释的结果。用户读完课程后应该拥有一个逐步完善的 Python 量化学习项目，而不是只记住几个名词。

### 2.2 初学者先学“如何评价”，再学“如何找策略”

很多入门者会直接跳到双均线、动量或均值回归。本课程刻意把收益率、净值曲线、最大回撤、波动率、夏普比率、胜率和盈亏比放在策略之前。

这样设计的原因：

- 策略结果必须先能被读懂，才谈得上比较。
- 回测报告不只是最终收益，还要包含路径、回撤、成本和限制。
- 用户应先理解一个指标可能误导什么，再使用这个指标。

### 2.3 回测偏差要提前出现

QuantStart、Zipline 和事件驱动回测材料都强调：回测最危险的地方往往不是代码报错，而是代码给出一个看起来合理但逻辑有偏的结果。

因此本课程在 Module 4 就引入：

- `signal` 和 `position` 的区别。
- 收盘信号不能默认当天收盘成交。
- `shift`、`lag` 和 look-ahead bias。
- 手续费、滑点和换手。

Module 8 和 Module 9 再系统化处理参数扫描、样本内 / 样本外、过拟合、随机策略赢家和回测边界。

### 2.4 先用向量化回测，但要解释它的边界

对初学者来说，直接学习完整事件驱动系统会造成过高认知负担。本项目首版使用 pandas 向量化回测，因为它能更快展示价格、收益、仓位和净值之间的关系。

但课程必须明确：

- 向量化回测是学习工具，不是完整交易系统。
- 它简化了订单、成交、排队、流动性和延迟。
- 事件驱动回测更接近真实执行，但复杂度更高。
- 本项目不进入券商 API 和实盘下单。

### 2.5 每节课都需要反馈闭环

QuantConnect 的 task/result 结构和交互式编程教程都说明：学习者需要知道自己是否完成了当前小目标。

本项目每节课的反馈闭环是：

```text
读懂概念
  -> 看一个最小公式和手算例子
  -> 运行 Python 示例
  -> 观察图表
  -> 完成 Quiz
  -> 复制 Codex Prompt
  -> 运行测试或生成产物
  -> Checkpoint 反思
```

## 3. 优化后的认知阶梯

课程不按“金融百科”排序，而按初学者的认知负荷排序。

| 阶段 | 用户问题 | 课程模块 | 学习产物 |
| --- | --- | --- | --- |
| 边界 | 这是不是投资建议？我应该怎么学？ | Module 0 | 学习边界和第一条 Codex 工单 |
| 数据 | 一行美股历史数据代表什么？ | Module 1 | 数据读取和质量报告 |
| 收益 | 价格如何变成收益路径？ | Module 2 | 收益率和净值曲线函数 |
| 风险 | 怎样评价这条收益路径？ | Module 3 | 风险和绩效指标模块 |
| 执行 | 策略想法如何变成持仓？ | Module 4 | signal、position、cost 和偏差演示 |
| 回测 | 如何把所有步骤串起来？ | Module 5 | 最小可用回测器和报告 |
| 策略 | 三类入门策略如何编码？ | Module 6 | 策略函数库和公平对比 |
| 组合 | 多股票组合如何计算？ | Module 7 | 等权和轮动组合实验 |
| 验证 | 历史最优为什么危险？ | Module 8 | 参数扫描和样本外验证 |
| 反思 | 如何正确陈述研究结果？ | Module 9 | Capstone 研究报告和下一步路线 |

## 4. 课程质量标准

### 4.1 单节课质量标准

一节合格课程必须同时满足：

- 只回答一个核心问题。
- 第一屏说明为什么这个概念重要。
- 术语首次出现时给出英文原词和白话解释。
- 公式必须配一个可手算的小例子。
- Python 示例必须能对应到真实项目文件。
- 图表必须说明“应该观察什么”，不能只是展示曲线。
- Quiz 必须考一个常见误区。
- Codex Prompt 必须包含目标、约束、验收和反思。
- Checkpoint 必须要求用户确认一个学习产物。

### 4.2 Mini Project 质量标准

Mini Project 不是课后作业装饰，而是模块验收。

每个 Mini Project 必须包含：

- 交付物：文件、报告、函数或图表。
- 验收项：至少 3 条明确检查标准。
- 运行命令：例如 `uv run pytest` 或示例脚本。
- 相关课程入口：用户能回到对应知识点复习。
- 反思问题：要求用户写出限制和误用风险。

### 4.3 Capstone 质量标准

Capstone 应该像一份严谨的学习型研究报告，而不是策略宣传页。

必须包含：

- 数据范围和质量检查。
- 价格、收益、净值和回撤图。
- buy and hold 或 `SPY` benchmark。
- 至少一个策略的 signal、position 和成本处理。
- 参数扫描和样本外结果。
- 至少 5 条回测限制或偏差风险。
- 明确的非投资建议声明。
- Python 测试通过记录。

## 5. 不采用的教程模式

本项目明确不采用以下模式：

- 不做“策略优先”的课程，不用第一节课就宣传某个策略收益。
- 不做券商 API 教程，不进入实盘下单。
- 不做高频、期权、杠杆或复杂衍生品入门。
- 不把机器学习放到基础课程主线里，避免初学者跳过数据和回测基础。
- 不展示没有风险声明的回测收益截图。
- 不让用户只复制代码，必须让用户解释结果和边界。

## 6. 对当前课程设计的优化建议

当前 v3 课程应围绕 10 个模块、47 节课、9 个 Mini Project 和 1 个 Capstone 展开。优化重点不是继续增加更多主题，而是提升每节课的学习闭环：

- 每节课都显式标注“本节解决的问题”和“如果忽略它会怎样错”。
- 策略课统一增加“策略假设、失效场景、公平比较、成本影响”。
- 参数实验课统一增加“样本内结果不能直接外推”的提醒。
- 课程页的图表必须和 Python 产物保持同构，避免前端展示和后端代码脱节。
- `/projects` 页面作为 Mini Project 集中入口，帮助用户把课程进度转化为工程产物。
- `/capstone` 页面作为最终报告入口，要求用户从数据、策略、验证和限制四个方面完成总结。

## 7. 参考链接

- QuantConnect Learning Center Course Structure: https://www.quantconnect.com/docs/v2/cloud-platform/learning-center/course-structure
- Georgia Tech CS 7646 Machine Learning for Trading: https://omscs.gatech.edu/cs-7646-machine-learning-trading
- Georgia Tech ML4T Spring 2023 syllabus: https://lucylabs.gatech.edu/ml4t/spring2023/
- Backtrader Quickstart: https://www.backtrader.com/docu/quickstart/quickstart/
- Backtrader Strategy: https://www.backtrader.com/docu/strategy/
- Zipline Trader Beginner Tutorial: https://zipline-trader.readthedocs.io/en/latest/my-beginner-tutorial.html
- QuantStart Event-Driven Backtesting: https://www.quantstart.com/articles/Event-Driven-Backtesting-with-Python-Part-I/
- QuantStart Successful Backtesting: https://www.quantstart.com/articles/Successful-Backtesting-of-Algorithmic-Trading-Strategies-Part-I/
