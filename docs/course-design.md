# learn-quant-with-codex 课程设计 v4.3

## 1. 课程设计目标

这门课的核心不是“讲完所有量化术语”，而是让初学者完成一条可验证的学习路径：

1. 看懂一份美股日线数据。
2. 用 Python 把价格转换为收益、风险指标和净值曲线。
3. 理解信号、仓位、交易成本和回测之间的关系。
4. 实现几类入门策略，并知道它们只是研究案例。
5. 用样本内 / 样本外、参数扫描和偏差检查反思回测结果。
6. 最后交付一份带代码、图表、测试和风险说明的量化学习报告。

课程应该采用“边学边建”的方式。每一节课都必须留下一个可运行、可检查、可被 Codex 继续扩展的产物。

课程站还需要支持概念回查。初学者遇到 `signal`、`drawdown`、`Sharpe`、`Adjusted Close` 这类术语时，应能从课程页直接跳到术语表，再从术语表回到相关课程。

## 2. 参考教程与设计启发

本课程参考了几类成熟教程的编排方式，但不照搬它们的内容。v4.3 的重点是把参考教程里的教学机制转成本站的课程设计硬约束：每节课必须有明确问题、代码产物、图表观察、练习反馈、Codex 任务和可验收 Checkpoint；每个模块必须有一个能进入 Capstone 的交付物。

详细参考分析见 [tutorial-reference-analysis.md](./tutorial-reference-analysis.md)。单节课写作、误区设计、Lab 使用和 Codex Task 规范见 [course-authoring-guide.md](./course-authoring-guide.md)。本文件只保留对课程结构有直接影响的设计决策。

v4.3 的优化重点不是继续增加更多主题，而是把课程从“主题覆盖完整”推进到“学习体验可完成、代码产物可验收、回测结论可审查、最终报告可辩护、单节课写作可复制”。参考教程给本项目带来的核心判断是：

- 课程要像 QuantConnect Learning Center 一样拆成小 lesson 和小 task，让用户每一屏都知道下一步该做什么。
- 课程要像 Georgia Tech ML4T 一样由项目和报告驱动，而不是只让用户记住概念。
- 课程要像 Backtrader / Zipline 入门材料一样逐步建立回测系统，但首版要把复杂事件驱动系统降级为可理解的 pandas 向量化版本。
- 课程要像 QuantStart 的回测文章一样，把偏差、成本、样本外验证和结果边界放进主线。
- 课程要像 EDHEC / Coursera 投资管理 Python 课程一样，先讲风险收益和组合，再让用户进入策略实验。
- 课程要把参考教程的教学机制拆成作者可执行的 lesson writing guide，避免后续内容生产退回“术语解释 + 代码块”的松散形态。

### 2.0 参考教程到本项目的转换表

| 参考来源 | 教程模式 | 本项目吸收方式 | 本项目刻意不采用 |
| --- | --- | --- | --- |
| QuantConnect Learning Center | lesson -> task -> result -> hint/solution | 每节课设置 Codex Task、验收命令、Checkpoint 和下一步产物 | 不进入云端实盘部署和券商连接 |
| Georgia Tech CS 7646 ML4T | 多个项目作业、market simulator、strategy evaluation、书面报告 | 每个模块设置 Mini Project，最终 Capstone 必须有代码、图表、测试和报告 | 不把机器学习放入基础主线 |
| Backtrader Quickstart | 从空策略逐步加入数据、策略、参数、图表、优化 | Module 5 从最小回测器逐步加配置、结果对象、报告和测试 | 不要求初学者先掌握完整框架生命周期 |
| Zipline Beginner Tutorial | 事件流、订单延迟、滑点、交易成本、移动平均案例 | Module 4 提前讲 signal/position/cost，Module 6 用双均线作为教学案例 | 不实现真实订单系统或分钟级事件流 |
| QuantStart Backtesting 系列 | 系统讨论优化偏差、look-ahead、survivorship、心理承受偏差 | Module 4、8、9 反复审查偏差，并把偏差写入 Capstone Rubric | 不展示没有边界说明的收益截图 |
| EDHEC / Coursera Python 投资管理 | 风险收益理论和 Python lab 同步推进 | Module 2、3、7 先建立收益、风险、组合能力 | 不提前进入优化器和高级组合理论 |

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

### 2.6 v4.3 课程优化结论

参考这些教程后，v4.3 课程做出 13 个关键选择：

1. 项目驱动优先：课程围绕一个逐步完善的 Python 量化学习项目推进，而不是按术语百科排序。
2. 评价能力前置：先讲收益、净值、回撤和风险指标，再进入策略。
3. 偏差意识前置：在正式回测前讲清 `signal`、`position`、成本和 look-ahead bias。
4. 向量化先行：首版使用 pandas 向量化回测降低门槛，但明确说明它不是完整交易系统。
5. 每节课可验收：每节课都要有 Quiz、动手练习、Codex Task 和 Checkpoint。
6. 报告而非宣传：最终产物是一份带局限说明的学习型研究报告，不是策略收益展示页。
7. 概念必须落到文件：每个核心概念都要对应 Python 函数、测试文件、前端图表或报告章节。
8. 结果必须被审查：每次策略或参数结果都必须同时看 benchmark、成本、回撤、样本外和偏差说明。
9. 进度必须可见：首页、课程目录、项目页和 Capstone 页都要显示“下一步产物”，避免用户只阅读不交付。
10. 策略必须先讲假设：双均线、动量和均值回归都按“市场假设 -> 信号生成 -> 公平回测 -> 失效场景”写作。
11. Lab 优先：收益、指标、仓位、成本、参数扫描这类抽象概念必须配一个小型数据实验，不能只配定义。
12. 报告答辩化：Capstone 不是把结果拼成文档，而是要求用户能解释数据、假设、偏差、成本和限制。
13. 写作矩阵化：47 节课都要有明确的误区、产物和反馈形式，详见 `course-authoring-guide.md`。

### 2.6.1 v4.3 相比 v4.2 的新增优化

v4.2 已经确定 10 模块、47 节课、9 个 Mini Project 和 1 个 Capstone。v4.3 不新增课程数量，而是解决后续内容实现最容易失控的三个问题：

| 问题 | v4.3 处理方式 |
| --- | --- |
| 课程大纲完整，但单节课写作可能退回普通文章 | 新增 [course-authoring-guide.md](./course-authoring-guide.md)，规定每节课的 Question、Trap、Tiny Example、Python Artifact、Chart、Quiz、Codex Task、Checkpoint |
| 参考教程启发停留在原则层 | 把 QuantConnect、ML4T、Backtrader、Zipline、QuantStart、EDHEC/Coursera 的机制转成 47 节课写作矩阵 |
| Lab 和课程页可能脱节 | 规定 Lab 必须回答具体观察问题，课程页链接 Lab 时必须说明“去实验页看什么” |

### 2.7 参考教程机制到本站组件的转换

参考教程的价值不只是章节顺序，而是它们让学习者完成任务、获得反馈、形成项目产物的机制。本站按以下规则落地：

| 参考机制 | 来源启发 | 本站落地组件 | 验收方式 |
| --- | --- | --- | --- |
| lesson -> task -> result | QuantConnect Learning Center | 每节课的 Quiz、Codex Task、Checkpoint | 课程页能说明任务是否完成，Prompt 包含验收命令 |
| 项目作业驱动 | Georgia Tech ML4T | 9 个 Mini Project 和 1 个 Capstone | `/projects` 集中展示交付物、命令和反思问题 |
| 从最小系统逐步加复杂度 | Backtrader Quickstart | Module 5 从 buy and hold 到 `BacktestResult` 和报告 | 回测器按 v1、结果对象、报告、测试逐步建立 |
| 事件流和执行现实 | Zipline / QuantStart | Module 4 先讲 signal、position、lag、cost | 默认 `signals_to_positions(lag=1)`，策略页必须说明成本和延迟 |
| 偏差不是附录 | QuantStart Backtesting | Diagnostic Lesson、参数扫描、样本外、偏差清单 | 每个策略和 Capstone 必须写限制，不能只有收益截图 |
| 理论 + Python lab | EDHEC / Coursera | 公式、手算例子、Python 函数、前端图表同步出现 | 课程中出现的函数必须在 Python 项目有实现或标注为伪代码 |

### 2.8 参考后明确不做的事情

为了保持“初学者教育项目”的定位，本站不采用以下做法：

- 不把机器学习、因子模型或组合优化放进基础主线，避免用户跳过数据、指标和回测基础。
- 不引入券商 API、实盘下单、账户连接或 live trading 部署。
- 不把策略课程写成“哪种策略更赚钱”，而是写成“一个策略假设如何被编码、测试和审查”。
- 不用框架生命周期淹没初学者。Backtrader / Zipline 的事件驱动思想会被解释，但首版仍采用 pandas 向量化项目。
- 不展示没有成本、基准、回撤、样本外和风险声明的策略结论。

## 3. v4.3 课程编排原则

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

Mini Project 需要在 `/projects` 页面集中展示，包含模块、交付物、验收项、建议命令和相关课程入口。这样用户可以按项目推进，也可以从课程目录按知识点推进。

### 3.6 Codex 任务必须可验收

每个 Codex Prompt 都应该包含：

- 背景：当前学到什么。
- 目标：要实现什么。
- 输入和输出：函数签名或文件路径。
- 约束：避免 look-ahead bias、不要联网、不要实盘交易。
- 验收：运行哪些测试、期望哪些结果。
- 反思：让 Codex 解释边界和潜在错误。

### 3.7 按认知阶梯排序

初学者最容易卡住的不是某个复杂公式，而是不知道一段量化代码到底在解决哪一类问题。v4.3 采用以下认知阶梯：

| 阶段 | 用户心智问题 | 对应模块 | 设计理由 |
| --- | --- | --- | --- |
| 边界 | 这是不是投资建议？我该如何使用 Codex？ | Module 0 | 先避免错误期待，再开始写代码 |
| 数据 | 一行美股数据代表什么？ | Module 1 | 没有数据理解，后面所有指标都悬空 |
| 收益 | 价格怎么变成收益路径？ | Module 2 | 策略评价依赖收益和净值，而不是价格本身 |
| 风险 | 一条收益曲线好在哪里、差在哪里？ | Module 3 | 先会读报告，再谈策略 |
| 执行 | 策略想法如何变成实际持仓？ | Module 4 | 避免 signal/position 混淆和 look-ahead bias |
| 回测 | 如何把数据、仓位、成本和指标串起来？ | Module 5 | 建立统一实验框架 |
| 策略 | 趋势、动量、均值回归如何编码？ | Module 6 | 策略只是框架中的一个组件 |
| 组合 | 多只股票如何一起计算？ | Module 7 | 从单资产收益走向组合收益和 benchmark |
| 验证 | 历史最优为什么危险？ | Module 8 | 通过参数扫描和样本外验证暴露过拟合 |
| 反思 | 如何正确陈述研究结果？ | Module 9 | 把回测边界写入最终报告 |

### 3.8 每个概念都必须连接到一个错误模式

课程不只解释“这个是什么”，还要解释“忽略它会怎样错”。

| 概念 | 常见错误模式 | 课程处理方式 |
| --- | --- | --- |
| Adjusted Close | 长期回测使用未复权价格，拆股或分红导致收益失真 | Close / Adjusted Close 对比图和价格列选择函数 |
| 日收益率 | 用绝对涨跌比较不同股票 | 手算例子和收益率柱状图 |
| 复利 | 把每日收益简单相加 | 净值曲线和 `(1 + r).cumprod()` |
| 最大回撤 | 只看最终收益，不看过程痛苦程度 | 净值和回撤双图 |
| 夏普比率 | 把高收益等同于好策略 | 指标卡片展示收益和波动的关系 |
| signal / position | 用当天收盘信号当天成交 | 对齐图、默认 lag 和偏差演示 |
| 成本和滑点 | 忽略高换手策略的成本侵蚀 | 成本滑块和净值对比 |
| 参数扫描 | 挑历史最好看的参数 | 样本内 / 样本外迁移测试 |
| 多重测试 | 随机策略中挑赢家 | 随机策略云图 |
| 回测结论 | 把历史结果写成未来收益承诺 | 风险声明改写练习和 Capstone Rubric |

### 3.9 课程节奏采用 Explain -> Implement -> Test -> Reflect

每节课都以同一节奏推进：

1. Explain：用白话解释概念、直觉和公式。
2. Implement：把概念落到 Python 函数或报告片段。
3. Test：用 pytest、Quiz 或手算例子验证理解。
4. Reflect：写下限制、误区和下一条 Codex 任务。

这个节奏来自交互式编程教程和 QuantConnect task/result 的反馈设计，适合把 Codex 作为学习伙伴，而不是只作为代码生成器。

### 3.10 v4.3 单节课的学习闭环

每节课必须按一个可验收闭环写作。不是所有小节都需要写成长文，但必须让用户完成一个清楚的学习动作。

```text
Question
  -> 为什么这个问题重要？
Trap
  -> 初学者最容易怎样误用？
Model
  -> 用直觉、公式和手算例子建立心智模型
Code
  -> 在 Python 项目中实现一个函数、对象或报告片段
Chart
  -> 用前端图表观察结果路径，而不是只看最终数字
Check
  -> 用 Quiz、pytest 或手算结果验证
Codex Task
  -> 给出带上下文、约束和验收标准的 Prompt
Reflect
  -> 写入 Checkpoint、学习笔记或 Capstone 片段
```

这一闭环来自参考教程的共同经验：用户需要明确任务、即时反馈和可保留的代码产物。课程页不能只解释概念，还要告诉用户“现在你应该能生成什么”。

### 3.11 v4.3 lesson 类型

47 节课不应该全部写成同一种文章。v4.3 将课程分成 5 类 lesson，便于控制节奏。

| 类型 | 目标 | 典型位置 | 页面重点 | 代码重点 |
| --- | --- | --- | --- | --- |
| Boundary Lesson | 建立学习边界和风险边界 | Module 0、9 | 解释、判断题、风险声明 | README、报告模板 |
| Concept Lesson | 建立核心概念和公式 | Module 1、2、3 | 手算例子、概念图、Quiz | 单个纯函数 |
| Implementation Lesson | 把概念写成可运行模块 | Module 2、4、5、6、7 | 代码块、测试、结果对象 | 函数、dataclass、pytest |
| Diagnostic Lesson | 暴露常见错误和偏差 | Module 4、8、9 | 错误/正确对比图、诊断题 | bias demo、验证函数 |
| Report Lesson | 把结果写成可审查材料 | Module 5、8、9 | 指标表、报告预览、Rubric | report dict、Markdown 模板 |

课程实现时应根据 lesson 类型决定页面密度。比如“最大回撤”是 Concept + Implementation；“故意错误的回测”是 Diagnostic；“Capstone 报告”是 Report。

### 3.12 参考教程对标后的课程重排要求

参考成熟教程后，课程不应平均用力。不同模块要承担不同教学角色：

| 教学角色 | 对标来源 | 本项目对应模块 | 设计要求 |
| --- | --- | --- | --- |
| Boot Camp | QuantConnect | Module 0、1、2 | 小任务密集，用户每 10-15 分钟完成一个函数、测试或观察 |
| Python Lab | EDHEC / Coursera | Module 2、3、7 | 公式、手算、Python 函数、图表必须同屏或相邻出现 |
| Simulator Builder | ML4T、Backtrader | Module 4、5 | 从 signal、position、cost 到 `BacktestResult` 逐步搭系统 |
| Strategy Lab | Zipline、Backtrader | Module 6 | 每个策略先写假设，再写 signal，最后用同一回测器公平比较 |
| Validation Lab | QuantStart、ML4T | Module 8 | 参数扫描必须展示样本外和多重测试风险，不能只展示最佳结果 |
| Research Report | ML4T、QuantStart | Module 9 | 报告必须能解释限制和偏差，不能只展示收益截图 |

这意味着课程编排有几个硬性调整：

- Module 2、3 的指标课必须优先写成 Lab，先让用户看路径、算公式、跑函数，再总结定义。
- Module 4 必须先于 Module 5 出现，因为没有 `position` 和成本意识的回测器会误导初学者。
- Module 6 的策略课不能单独展示收益；必须在同页或下一课展示 benchmark、成本、回撤和失效场景。
- Module 8 不能作为附录。它是策略课之后的必修验证模块，承担“拆解历史最优幻觉”的职责。
- Module 9 的 Capstone 必须以报告 Rubric 为中心，而不是以策略选择为中心。

### 3.13 初学者负荷控制

课程面向没有金融背景的用户，必须控制每节课的新增概念数量。每节课最多引入：

- 1 个核心问题。
- 1 个主公式或伪公式。
- 1 个主要 Python 函数或对象。
- 1 个最容易犯的错误。
- 1 个可保留产物。

如果一个页面需要同时解释多个新概念，应拆课或改成模块总结。比如“夏普比率、胜率和盈亏比”可以同处一个绩效指标模块，但页面内部必须先讲夏普，再把胜率和盈亏比作为对比指标，不能让三个指标并列抢占第一学习目标。

### 3.14 课程产物优先级

每节课的产物按以下优先级设计：

1. Python 纯函数和 pytest：适合收益率、指标、仓位、成本、策略信号。
2. 示例脚本和 JSON/Markdown 报告：适合数据质量、回测报告、参数扫描、Capstone。
3. 前端交互图表：适合理解路径、对齐、成本侵蚀、参数扫描。
4. 学习笔记和风险声明：适合边界课、偏差课、报告课。

如果某节课没有代码产物，必须至少有一个报告片段、风险声明或诊断清单进入 Capstone。这样课程不会退化成纯阅读材料。

## 4. 整体课程地图

v4.3 课程分为 10 个模块、47 节课、9 个 Mini Project 和 1 个 Capstone。模块数量不继续扩张，优化重点放在每个模块的产物质量、前后依赖和单节课可执行性。

| 模块 | 主题 | 核心问题 | 参考教程启发 | 模块产物 |
| --- | --- | --- | --- | --- |
| 0 | 学习方式和项目边界 | 这门课如何学，哪些事情不能做？ | 交互式编程教程的任务边界 | 学习计划和第一条 Codex 任务 |
| 1 | 美股数据入门 | 一行股票数据到底代表什么？ | ML4T 的数据处理前置 | 数据读取和质量报告 |
| 2 | 收益和净值 | 如何从价格得到收益路径？ | EDHEC 的 risk/return lab | 收益率和净值曲线函数 |
| 3 | 风险和绩效指标 | 如何评价一条收益曲线？ | EDHEC 的指标与 Python 同步 | 指标计算模块 |
| 4 | 信号、仓位和成本 | 策略想法如何变成可回测的持仓？ | Zipline 的延迟、成本、事件意识 | signal/position/cost 模块和偏差演示 |
| 5 | 第一套回测系统 | 如何把数据、仓位和指标串起来？ | Backtrader 的逐步搭建框架 | 最小可用回测器 |
| 6 | 入门策略模式 | 趋势、动量、均值回归如何编码？ | Zipline/Backtrader 的策略案例 | 策略函数库 |
| 7 | 多股票组合 | 多资产收益和权重如何工作？ | EDHEC 的组合视角 | 等权和轮动组合实验 |
| 8 | 参数实验和验证 | 为什么历史最优不等于未来有效？ | QuantStart 的优化偏差与样本外验证 | 参数扫描和样本外报告 |
| 9 | 回测边界和下一步 | 如何正确看待研究结果？ | QuantStart 和 ML4T 的报告/限制意识 | 最终研究报告和学习路线 |

### 4.1 模块教学蓝图

每个模块必须让用户完成一段“学习到交付”的闭环。后续新增课程或改写课程时，优先维护下面这张蓝图。

| 模块 | 进入前用户应该知道 | 本模块先解决什么 | 本模块最后交付什么 | 证明学会的方式 |
| --- | --- | --- | --- | --- |
| Module 0 | 会打开网站和运行基本命令 | 课程边界、Codex 工作流、测试驱动起点 | `learning-notes.md` 和第一个测试函数 | 能说清非投资建议边界，能写带验收的 Prompt |
| Module 1 | 已理解项目不是交易建议 | 一行美股数据的含义和质量风险 | 数据读取函数和质量报告 | 能解释 OHLCV、交易日缺口、复权价格和数据质量问题 |
| Module 2 | 有可信价格序列 | 价格如何变成收益和净值路径 | 收益率、复利、年化和净值函数 | 能手算小例子，并用 Python 得到同样结果 |
| Module 3 | 能生成收益路径 | 如何评价收益路径的好坏和痛苦程度 | 风险指标模块和绩效摘要表 | 能指出单一指标的盲点，能读懂回撤图 |
| Module 4 | 会看指标但还没有执行模型 | 信号如何变成滞后仓位，成本如何侵蚀收益 | position、turnover、cost 和偏差演示 | 能发现当日信号当日成交的问题 |
| Module 5 | 有数据、收益、指标、仓位、成本函数 | 如何串成可复用回测器 | `BacktestResult` 和 buy and hold 报告 | 能解释回测的每个中间序列 |
| Module 6 | 有统一回测器 | 三类入门策略如何生成 signal | 策略函数库和公平对比实验 | 能写出策略假设、成本影响和失效场景 |
| Module 7 | 会做单资产回测 | 多资产如何对齐、加权、再平衡和比较基准 | 等权组合和轮动组合实验 | 能手算两资产组合收益，能说明分散化不等于稳赚 |
| Module 8 | 能比较策略结果 | 历史最优为什么危险 | 参数扫描、样本外和随机策略报告 | 能解释过拟合、多重测试和样本外迁移失败 |
| Module 9 | 已有完整实验材料 | 如何把结果写成严谨学习报告 | Capstone 报告和下一步路线 | 能写出至少 5 条限制，不把回测写成收益承诺 |

### 4.2 课程主题覆盖矩阵

用户最初提出的主题必须全部落到课程主线中。实现时不应另开一套旧大纲，而应按下表归入 v4.3 模块。

| 主题组 | 覆盖模块 | 关键课程 | Python / 页面产物 |
| --- | --- | --- | --- |
| 美股市场、ticker、交易日 | Module 1 | 1.1、1.2 | `read_price_csv`、价格曲线 |
| OHLCV、Close、Adjusted Close | Module 1 | 1.3、1.4 | `validate_ohlcv_columns`、`choose_price_column` |
| 数据清洗和数据质量 | Module 1 | 1.5 | `validate_price_data`、质量报告 |
| 收益率、复利、年化收益 | Module 2 | 2.1-2.5 | `calculate_returns`、`compound_returns`、`annualized_return` |
| 波动率、最大回撤、夏普 | Module 3 | 3.1-3.3 | `annualized_volatility`、`drawdown_series`、`sharpe_ratio` |
| 胜率、盈亏比、指标表 | Module 3 | 3.4、3.5 | `win_rate`、`profit_loss_ratio`、`performance_summary` |
| 手续费、滑点、仓位管理 | Module 4 | 4.3、4.4 | `calculate_turnover`、`apply_transaction_costs`、`normalize_weights` |
| signal、position、equity curve | Module 4、5 | 4.1、4.2、5.2 | `signals_to_positions`、`run_backtest` |
| buy and hold、简单回测系统 | Module 5 | 5.1-5.5 | `buy_and_hold_signal`、`BacktestResult`、报告 |
| 双均线、动量、均值回归 | Module 6 | 6.1-6.5 | `moving_average_crossover`、`momentum_signal`、`mean_reversion_signal` |
| 多股票组合、再平衡、benchmark | Module 7 | 7.1-7.5 | `align_price_data`、`equal_weight_portfolio`、组合实验 |
| 参数扫描、样本内外、过拟合 | Module 8 | 8.1-8.5 | `scan_moving_average_parameters`、`train_test_split_time_series` |
| 回测偏差、未来收益边界 | Module 9 | 9.1、9.2 | bias checklist、风险声明改写练习 |
| paper trading、实盘区别、下一步路线 | Module 9 | 9.3、9.5 | `paper_signal_log`、roadmap |

### 4.3 模块依赖关系

课程模块必须按顺序学习，因为每个模块都为后续模块提供一个必要能力：

```text
Module 0: 边界和工作流
  -> Module 1: 可信任的数据输入
  -> Module 2: 可计算的收益路径
  -> Module 3: 可解释的风险指标
  -> Module 4: 可回测的持仓和成本
  -> Module 5: 可复用的回测系统
  -> Module 6: 可比较的策略案例
  -> Module 7: 可扩展的组合实验
  -> Module 8: 可审查的参数验证
  -> Module 9: 可交付的研究报告
```

如果后续实现时需要增删课程，必须先检查它是否破坏这个依赖链。

### 4.4 课程完成后的用户能力

完成 47 节课后，用户应该能够：

- 读取并检查一份本地美股 OHLCV 样例数据。
- 解释 Close 和 Adjusted Close 的区别。
- 从价格计算收益率、净值曲线、年化收益、波动率、最大回撤、夏普比率、胜率和盈亏比。
- 区分 `signal`、`position`、`returns`、`equity_curve`。
- 说明为什么默认需要一日 lag 来降低 look-ahead bias。
- 在有手续费和滑点的假设下运行一个最小回测。
- 比较 buy and hold、双均线、动量和均值回归。
- 构建等权组合或简单动量轮动组合。
- 做参数扫描和样本内 / 样本外验证。
- 写出一份不夸大回测结果的学习型研究报告。

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

### 5.3 单节课验收 Rubric

每节课发布前必须按 0/1 检查以下项目。少于 8 项通过时，不应视为完整课程页。

| 检查项 | 合格标准 |
| --- | --- |
| 核心问题 | 页面开头能用一句话说明本节解决什么问题 |
| 错误模式 | 明确写出忽略本概念会造成的回测或理解错误 |
| 初学者解释 | 先给白话解释，再给英文术语和公式 |
| 手算例子 | 至少有一个小到能手算的价格、收益或仓位例子 |
| Python 对应 | 指向真实函数、模块、测试文件或报告章节 |
| 图表目的 | 图表旁写清楚“看什么”和“不要误读什么” |
| 互动反馈 | Quiz 或练习能即时暴露一个常见误区 |
| Codex 任务 | Prompt 包含背景、目标、约束、验收、反思 |
| Checkpoint | 明确本节完成后保留哪个代码、笔记或报告产物 |
| 风险边界 | 策略、回测或数据结论不写成投资建议 |

### 5.4 不同 lesson 类型的页面密度

不同类型的 lesson 不需要同样长，但必须服务对应学习目标：

- Boundary Lesson：文字更短，重点是边界判断、风险声明、学习方式和报告语言。
- Concept Lesson：公式、手算例子和图表解释必须完整，代码保持为一个纯函数。
- Implementation Lesson：代码和测试占比更高，必须说明函数签名、输入输出和边界行为。
- Diagnostic Lesson：必须有错误实现和正确实现的对比，不能只列偏差名词。
- Report Lesson：必须有报告结构、Rubric、风险措辞示例和生成命令。

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

Capstone 模板生成：

- Python 项目提供 `generate_capstone_template.py`。
- 命令：`uv run python examples/generate_capstone_template.py`。
- 输出：`reports/final_research_report.md`。
- 模板会包含数据、策略、回测、基准、成本、参数、样本外和风险章节。
- `validate_capstone_report` 用于检查模板或最终报告是否包含必要章节和风险声明。

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
| 组合 | `701-*.mdx` | `portfolio.py`, `positions.py` | `test_portfolio.py`, `test_positions.py` | `PortfolioWeightsChart` |
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

## 8.4 学习笔记规范

每节课应该提供本地学习笔记入口，帮助用户把“看懂了什么”和“还没懂什么”写下来。

笔记用途：

- 记录自己的概念理解。
- 记录下一条想让 Codex 继续完成的任务。
- 记录代码运行中的疑问。
- 在 `/notebook` 汇总复盘。

笔记只保存在浏览器本地，不需要账户，也不保存任何交易账户或实盘数据。

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

### 10.1.1 Mini Project 页面模板

`/projects` 页面里的每个 Mini Project 必须采用统一模板，避免项目作业变成一句描述。

```text
项目标题
  -> 关联模块和课程入口
  -> 本项目要回答的问题
  -> 交付物路径
  -> 建议 Codex Prompt
  -> 建议运行命令
  -> 验收清单
  -> 反思问题
  -> 可进入 Capstone 的材料
```

每个 Mini Project 至少包含：

- 一个真实文件或报告产物，例如 `sample_prices_quality_report.json`、`reports/buy_and_hold_report.md`。
- 一个建议命令，例如 `uv run pytest`、`uv run python examples/run_parameter_scan.py`。
- 三条以上验收项，其中至少一条检查风险边界或常见误区。
- 一个反思问题，要求用户解释结果为什么不能直接外推到未来。

### 10.1.2 Mini Project 到 Capstone 的材料流

Mini Project 不应孤立存在。它们应该逐步积累 Capstone 需要的材料：

| Mini Project | 输出材料 | 进入 Capstone 的位置 |
| --- | --- | --- |
| Module 0 | 项目边界和学习笔记 | 报告开头的目的和非投资建议声明 |
| Module 1 | 数据质量报告 | 数据来源、日期范围、复权列选择 |
| Module 2 | 收益和净值曲线 | 策略和基准的收益路径说明 |
| Module 3 | 风险指标表 | 绩效指标章节 |
| Module 4 | 成本和 shift 对比 | 执行假设和偏差检查章节 |
| Module 5 | buy and hold 回测报告 | benchmark 章节 |
| Module 6 | 策略对比实验 | 策略选择和公平比较章节 |
| Module 7 | 组合实验 | 多资产扩展或基准对照章节 |
| Module 8 | 参数和样本外报告 | 参数验证、过拟合和限制章节 |

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

### 11.3 后续扩展课程

后续可增加：

- 因子研究入门。
- 简单横截面选股。
- walk-forward validation。
- 风险预算和组合优化。
- 数据供应商比较。
- 事件驱动回测系统导论。

## 12. 和旧课程设计的主要差异

旧设计覆盖主题较全，但更像主题清单。v4.3 的变化：

- 增加“项目主线”：每个模块都有明确代码产物。
- 将“风险指标”拆得更扎实，保证策略前先会评价。
- 将“signal/position/cost/look-ahead”提前到回测之前。
- 增加多资产数据对齐、再平衡和组合 benchmark。
- 将过拟合和样本外验证扩展成完整模块。
- 增加 Mini Project、Capstone 和评分标准。
- 把 Codex Prompt 从复制文本升级为可验收任务模板。
- 增加参考教程机制到页面组件、Python 代码和验收方式的转换表。
- 增加模块教学蓝图，明确每个模块的进入条件、交付物和学会标准。
- 增加主题覆盖矩阵，确保用户提出的所有量化入门主题都落到唯一课程主线中。
- 增加课程作者指南，把 47 节课逐节绑定到误区、产物和反馈形式。

## 13. 课程内容写作原则

- 每节课只讲一个核心问题。
- 第一段先回答“为什么学这个”。
- 术语首次出现时给英文原词。
- 公式必须配小型手算例子。
- 代码必须配测试或边界说明。
- 图表必须说明读图重点。
- 策略章节必须写“策略假设”和“失效场景”。
- 策略结果必须先解释生成逻辑和公平比较条件，再展示指标。
- 回测结果必须同时显示收益和回撤。
- 所有报告和策略页面必须包含非投资建议声明。
