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

- 指标实验页 `/labs/metrics`
  - 收益率、波动率、最大回撤、夏普比率的交互式展示

- 策略实验页 `/labs/strategies`
  - buy and hold、双均线、动量、均值回归的对比图

- 参数实验页 `/labs/parameter-scan`
  - 参数扫描结果表
  - 热力图或折线图
  - 样本内 / 样本外说明

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

课程设计以 [course-design.md](./course-design.md) 为主文档。

需求文档中的课程目标和主题覆盖范围仍然有效，但详细课程编排、模块产物、Mini Project、Capstone、Codex Task 模板和课程与代码同步契约，以 `docs/course-design.md` 的 v2 设计为准。

v2 课程分为 10 个模块、47 节课、9 个 Mini Project 和 1 个 Capstone，从数据读取、收益风险、仓位成本、回测系统、策略实验、多股票组合、参数验证一路推进到最终研究报告。

以下旧版课程体系保留为主题覆盖参考。

课程分为 8 个模块，从市场基础逐步推进到回测、策略实验和量化学习路线。

### Module 0: 项目入门

#### 0.1 这门课学什么，不学什么

- 目标：明确量化学习、投资建议和实盘交易之间的区别。
- 概念：量化研究、回测、paper trading、实盘交易。
- Python 示例：无或只展示项目结构。
- 图表：学习路径图。
- 误区：把课程代码当成赚钱系统。
- Codex Prompt：让 Codex 阅读项目 README 并总结学习路径。
- Checkpoint：用户知道本项目是教育项目，不是交易建议。

#### 0.2 如何使用 Codex 学习量化

- 目标：学会把课程目标转成 Codex 任务。
- 概念：Prompt、约束、验收标准、测试。
- Python 示例：让 Codex 实现一个简单 `daily_return` 函数。
- 图表：从课程到代码到测试的流程图。
- 误区：只让 Codex 生成代码，不要求解释和测试。
- Codex Prompt：实现一个带测试的收益率函数。
- Checkpoint：用户能写出清晰的 Codex 学习任务。

### Module 1: 美股数据基础

#### 1.1 美股市场基础

- 目标：理解股票、交易所、交易日、ticker、指数的基本概念。
- 概念：NYSE、Nasdaq、ticker、ETF、S&P 500、交易日。
- Python 示例：读取一个示例股票数据 CSV。
- 图表：价格曲线。
- Quiz：ticker 是公司名称还是交易代码。
- Codex Prompt：创建一个读取 CSV 并检查列名的函数。
- Checkpoint：用户能解释一只股票的历史数据代表什么。

#### 1.2 OHLCV 数据

- 目标：理解 Open、High、Low、Close、Volume。
- 概念：K 线、日线数据、成交量。
- Python 示例：展示 `open/high/low/close/volume` 的 DataFrame。
- 图表：蜡烛图或简化 OHLC 图。
- 误区：把 High 和 Close 混为一谈。
- Codex Prompt：实现 `validate_ohlcv_columns(df)`。
- Checkpoint：用户能读懂一行 OHLCV 数据。

#### 1.3 Close 和 Adjusted Close

- 目标：理解拆股和分红会影响历史价格。
- 概念：close、adjusted close、split、dividend。
- Python 示例：比较 `close` 和 `adj_close` 的收益率差异。
- 图表：Close 与 Adjusted Close 对比曲线。
- 误区：长期回测直接使用未复权 Close。
- Codex Prompt：实现 `choose_price_column(df, adjusted=True)`。
- Checkpoint：用户知道为什么长期回测通常使用复权价格。

#### 1.4 数据清洗和数据质量

- 目标：识别缺失值、重复日期、非递增时间索引和异常值。
- 概念：missing data、duplicate index、outlier、data quality check。
- Python 示例：清理示例 DataFrame。
- 图表：缺失数据标记图。
- 误区：下载到数据后不检查直接回测。
- Codex Prompt：实现 `validate_price_data(df)` 并返回质量报告。
- Checkpoint：用户能列出回测前至少 3 个数据检查项。

### Module 2: 收益和风险指标

#### 2.1 收益率

- 目标：理解价格变化和收益率的区别。
- 公式：`return_t = price_t / price_{t-1} - 1`
- Python 示例：`calculate_returns(prices)`。
- 图表：价格曲线和日收益率柱状图。
- Quiz：价格上涨 10 美元是否一定代表收益率相同。
- Codex Prompt：实现收益率函数和 pytest。
- Checkpoint：用户能计算日收益率。

#### 2.2 复利和净值曲线

- 目标：理解简单累加和复利累乘的区别。
- 公式：`equity_t = product(1 + return_i)`
- Python 示例：`compound_returns(returns)`。
- 图表：净值曲线。
- 误区：把每日收益直接相加当作最终收益。
- Codex Prompt：实现净值曲线函数。
- Checkpoint：用户能解释 equity curve。

#### 2.3 年化收益率

- 目标：理解为什么需要年化。
- 公式：`annual_return = equity_final ** (252 / n_days) - 1`
- Python 示例：`annualized_return(returns, periods_per_year=252)`。
- 图表：不同持有天数下的年化收益对比。
- 误区：用短期极端收益推断长期收益。
- Codex Prompt：实现年化收益率并处理空序列。
- Checkpoint：用户知道年化收益率依赖样本长度。

#### 2.4 波动率

- 目标：理解收益波动和风险度量。
- 公式：`annual_volatility = std(daily_returns) * sqrt(252)`
- Python 示例：`annualized_volatility(returns)`。
- 图表：收益率分布直方图。
- 误区：收益高但波动巨大也可能不可接受。
- Codex Prompt：实现波动率函数并写测试。
- Checkpoint：用户能解释波动率不是亏损本身，而是变化幅度。

#### 2.5 最大回撤

- 目标：理解从历史高点下跌的幅度。
- 公式：`drawdown = equity / running_max(equity) - 1`
- Python 示例：`max_drawdown(equity_curve)`。
- 图表：净值曲线和回撤曲线。
- 误区：只看收益，不看最坏下跌。
- Codex Prompt：实现回撤序列和最大回撤。
- Checkpoint：用户能读懂最大回撤。

#### 2.6 夏普比率、胜率和盈亏比

- 目标：理解常见绩效指标的含义和局限。
- 公式：
  - `sharpe = mean(excess_returns) / std(returns) * sqrt(252)`
  - `win_rate = winning_trades / total_trades`
  - `profit_loss_ratio = avg_win / abs(avg_loss)`
- Python 示例：`sharpe_ratio`、`win_rate`、`profit_loss_ratio`。
- 图表：不同策略指标卡片。
- 误区：胜率高不等于策略好。
- Codex Prompt：实现一组指标函数并生成报告字典。
- Checkpoint：用户知道单一指标不能完整评价策略。

### Module 3: 交易成本和仓位

#### 3.1 手续费和滑点

- 目标：理解交易成本如何侵蚀收益。
- 概念：commission、slippage、spread。
- Python 示例：在回测收益中扣除交易成本。
- 图表：有成本和无成本净值曲线对比。
- 误区：忽略成本会显著美化高换手策略。
- Codex Prompt：实现 `apply_transaction_costs`。
- Checkpoint：用户能解释为什么频繁交易要特别关注成本。

#### 3.2 Signal 和 Position

- 目标：区分交易信号和实际持仓。
- 概念：signal、position、shift、look-ahead bias。
- Python 示例：信号滞后一日生成持仓。
- 图表：价格、信号、持仓状态图。
- 误区：当天收盘价生成信号又当天按收盘价成交。
- Codex Prompt：实现 `signals_to_positions(signals)`。
- Checkpoint：用户知道为什么 position 通常需要 shift。

#### 3.3 仓位管理

- 目标：理解满仓、空仓、固定比例仓位和多股票权重。
- 概念：position sizing、cash、weight、exposure。
- Python 示例：单资产 0/1 仓位和多资产权重。
- 图表：仓位随时间变化图。
- 误区：策略信号正确就可以忽略仓位大小。
- Codex Prompt：实现权重归一化函数。
- Checkpoint：用户能区分买入信号和买入多少。

### Module 4: 第一套回测

#### 4.1 Buy and Hold

- 目标：建立最简单的基准策略。
- 概念：benchmark、buy and hold。
- Python 示例：从第一天买入并持有。
- 图表：价格曲线和净值曲线。
- 误区：没有基准就无法判断策略是否有意义。
- Codex Prompt：实现 `buy_and_hold_strategy(prices)`。
- Checkpoint：用户能解释 benchmark 的作用。

#### 4.2 简单回测系统

- 目标：把价格、信号、仓位、收益和指标串起来。
- 概念：backtester、portfolio returns、equity curve。
- Python 示例：`BacktestResult` 和 `run_backtest`。
- 图表：策略净值、回撤、指标卡片。
- 误区：只写策略函数，不验证完整收益路径。
- Codex Prompt：实现一个最小可用回测器。
- Checkpoint：用户知道一套回测至少包含哪些步骤。

#### 4.3 回测报告

- 目标：把回测结果整理成可读报告。
- 概念：summary metrics、charts、trade log。
- Python 示例：生成 Markdown 或 JSON 报告。
- 图表：报告组件预览。
- 误区：只保存最终收益，不保存过程数据。
- Codex Prompt：实现 `generate_backtest_report(result)`。
- Checkpoint：用户能输出策略对比报告。

### Module 5: 入门策略

#### 5.1 双均线策略

- 目标：理解趋势跟随的基础形式。
- 概念：moving average、fast window、slow window、crossover。
- Python 示例：`moving_average_crossover(prices, fast, slow)`。
- 图表：价格、快慢均线、买卖信号。
- 误区：参数越调越好不代表未来越好。
- Codex Prompt：实现双均线信号函数并接入回测。
- Checkpoint：用户能解释为什么快线穿越慢线代表趋势信号。

#### 5.2 动量策略

- 目标：理解过去一段时间上涨可能延续的假设。
- 概念：momentum、lookback、ranking。
- Python 示例：单资产动量和多资产动量排序。
- 图表：动量分数和净值曲线。
- 误区：动量不是永远有效。
- Codex Prompt：实现 `momentum_signal(prices, lookback)`。
- Checkpoint：用户能描述动量策略的核心假设。

#### 5.3 均值回归策略

- 目标：理解短期偏离后回归均值的假设。
- 概念：mean reversion、z-score、rolling mean。
- Python 示例：基于 z-score 的入门信号。
- 图表：价格、滚动均值、上下阈值。
- 误区：下跌并不一定会反弹。
- Codex Prompt：实现 `mean_reversion_signal(prices, window, threshold)`。
- Checkpoint：用户能说出均值回归策略的风险。

#### 5.4 多股票组合

- 目标：理解组合、权重和分散化。
- 概念：portfolio、diversification、equal weight、rebalance。
- Python 示例：等权组合收益。
- 图表：单股票和组合净值对比。
- 误区：股票数量多不一定真正分散。
- Codex Prompt：实现等权组合收益函数。
- Checkpoint：用户能解释组合收益如何由权重和资产收益组成。

### Module 6: 参数实验和过拟合

#### 6.1 参数扫描

- 目标：理解遍历参数并比较结果。
- 概念：grid search、parameter scan。
- Python 示例：扫描双均线 fast/slow 参数。
- 图表：参数结果表或热力图。
- 误区：选择历史上最优参数就万事大吉。
- Codex Prompt：实现参数扫描脚本。
- Checkpoint：用户能运行并阅读参数扫描结果。

#### 6.2 样本内和样本外

- 目标：理解训练期和验证期。
- 概念：in-sample、out-of-sample、train/test split。
- Python 示例：拆分历史数据并分别回测。
- 图表：样本内和样本外净值对比。
- 误区：在全部数据上调参再宣称样本外有效。
- Codex Prompt：实现时间序列切分函数。
- Checkpoint：用户能说明为什么样本外更接近验证。

#### 6.3 过拟合

- 目标：理解策略对历史噪声过度适配的问题。
- 概念：overfitting、data snooping、multiple testing。
- Python 示例：展示随机策略也可能在某段历史表现很好。
- 图表：多个随机策略的最佳曲线。
- 误区：历史最优策略一定有真实规律。
- Codex Prompt：模拟随机信号并统计最好结果。
- Checkpoint：用户能识别过拟合风险。

### Module 7: 回测偏差和现实边界

#### 7.1 常见回测偏差

- 目标：认识导致回测失真的常见问题。
- 概念：look-ahead bias、survivorship bias、selection bias、data snooping。
- Python 示例：错误 shift 与正确 shift 的结果对比。
- 图表：错误回测和正确回测净值对比。
- 误区：代码能跑通就代表逻辑正确。
- Codex Prompt：审查一个回测函数是否存在 look-ahead bias。
- Checkpoint：用户能列出常见回测偏差。

#### 7.2 为什么回测不能代表未来收益

- 目标：建立对历史结果的正确态度。
- 概念：regime change、market impact、liquidity、uncertainty。
- Python 示例：同策略在不同年份表现差异。
- 图表：按年份拆分的指标表。
- 误区：把回测收益截图当作收益承诺。
- Codex Prompt：生成一个年度绩效分析函数。
- Checkpoint：用户能解释“历史表现不代表未来收益”。

#### 7.3 Paper Trading 和实盘交易

- 目标：理解模拟交易和真实交易差异。
- 概念：paper trading、live trading、execution、latency、psychology。
- Python 示例：无下单，只展示信号日志。
- 图表：研究、回测、模拟、实盘的流程图。
- 误区：paper trading 盈利就等同于实盘盈利。
- Codex Prompt：设计一个只记录信号、不下单的 paper trading logger。
- Checkpoint：用户知道本项目不会进入实盘下单。

### Module 8: 下一步路线

#### 8.1 如何继续学习量化

- 目标：给出后续学习路线。
- 方向：统计基础、时间序列、投资组合理论、因子研究、风险管理、工程化。
- Python 示例：扩展项目结构建议。
- 图表：学习路线图。
- 误区：过早追求复杂模型。
- Codex Prompt：让 Codex 根据当前项目生成下一阶段学习计划。
- Checkpoint：用户知道下一步应该补哪些能力。

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
    course-outline.md
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

要求：

- 报告包含配置、指标、数据区间、风险提示。
- Markdown 报告必须包含“教育用途，不构成投资建议”的声明。

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
| 多股票组合 | `strategies.py` | `equal_weight_portfolio` |
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
