import type { CourseModule, Lesson } from "./types";

const code = {
  dailyReturn: `def daily_return(previous_price: float, current_price: float) -> float:
    if previous_price <= 0:
        raise ValueError("previous_price must be positive")
    return current_price / previous_price - 1`,
  readCsv: `from pathlib import Path
import pandas as pd

def read_price_csv(path: str | Path) -> pd.DataFrame:
    df = pd.read_csv(path, parse_dates=["date"])
    df = df.sort_values("date").set_index("date")
    return df`,
  ohlcv: `REQUIRED_OHLCV_COLUMNS = {"open", "high", "low", "close", "volume"}

def validate_ohlcv_columns(df: pd.DataFrame) -> None:
    missing = REQUIRED_OHLCV_COLUMNS.difference(df.columns)
    if missing:
        raise ValueError(f"missing OHLCV columns: {sorted(missing)}")`,
  adjusted: `def choose_price_column(df: pd.DataFrame, adjusted: bool = True) -> pd.Series:
    if adjusted and "adj_close" in df.columns:
        return df["adj_close"]
    if "close" not in df.columns:
        raise ValueError("price data must contain close")
    return df["close"]`,
  quality: `def validate_price_data(df: pd.DataFrame) -> dict:
    return {
        "rows": len(df),
        "start": str(df.index.min().date()),
        "end": str(df.index.max().date()),
        "missing_values": int(df.isna().sum().sum()),
        "duplicate_dates": int(df.index.duplicated().sum()),
        "is_monotonic": bool(df.index.is_monotonic_increasing),
        "non_positive_close": int((df["close"] <= 0).sum()) if "close" in df else None,
    }`,
  returns: `def calculate_returns(prices: pd.Series) -> pd.Series:
    returns = prices.astype(float).pct_change()
    return returns.dropna()`,
  compound: `def compound_returns(returns: pd.Series) -> pd.Series:
    clean_returns = returns.dropna().astype(float)
    return (1 + clean_returns).cumprod()`,
  drawdown: `def drawdown_series(equity: pd.Series) -> pd.Series:
    running_max = equity.cummax()
    return equity / running_max - 1

def max_drawdown(equity: pd.Series) -> float:
    return float(drawdown_series(equity).min())`,
  sharpe: `import numpy as np

def sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.0, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if clean.empty:
        return float("nan")
    daily_rf = risk_free_rate / periods_per_year
    excess = clean - daily_rf
    volatility = clean.std(ddof=1)
    if volatility == 0 or np.isnan(volatility):
        return float("nan")
    return float(excess.mean() / volatility * np.sqrt(periods_per_year))`,
  positions: `def signals_to_positions(signals: pd.Series, lag: int = 1) -> pd.Series:
    if lag < 0:
        raise ValueError("lag must be non-negative")
    return signals.shift(lag).fillna(0.0)`,
  costs: `def calculate_turnover(positions: pd.Series) -> pd.Series:
    return positions.diff().abs().fillna(positions.abs())

def apply_transaction_costs(returns, positions, commission_bps=0.0, slippage_bps=0.0):
    turnover = calculate_turnover(positions)
    cost_rate = (commission_bps + slippage_bps) / 10_000
    return returns - turnover * cost_rate`,
  buyHold: `def buy_and_hold_signal(prices: pd.Series) -> pd.Series:
    signal = pd.Series(1.0, index=prices.index)
    if not signal.empty:
        signal.iloc[0] = 0.0
    return signal`,
  backtest: `def run_backtest(prices: pd.Series, signals: pd.Series, config: BacktestConfig) -> BacktestResult:
    asset_returns = calculate_returns(prices)
    positions = signals_to_positions(signals, lag=config.signal_lag).reindex(asset_returns.index).fillna(0)
    strategy_returns = asset_returns * positions
    strategy_returns = apply_transaction_costs(
        strategy_returns,
        positions,
        commission_bps=config.commission_bps,
        slippage_bps=config.slippage_bps,
    )
    equity = compound_returns(strategy_returns)
    return BacktestResult.from_series(config, asset_returns, positions, strategy_returns, equity)`,
  movingAverage: `def moving_average_crossover(prices: pd.Series, fast_window: int, slow_window: int) -> pd.Series:
    if fast_window <= 0 or slow_window <= 0:
        raise ValueError("window sizes must be positive")
    if fast_window >= slow_window:
        raise ValueError("fast_window must be smaller than slow_window")
    fast = prices.rolling(fast_window).mean()
    slow = prices.rolling(slow_window).mean()
    return (fast > slow).astype(float).fillna(0.0)`,
};

const task = (lesson: string, functionName: string, targetFile: string, testFile: string) => `你正在实现 learn-quant-with-codex 的 ${lesson}。

背景：
- 当前课程讲到一个量化入门概念。
- 项目是教育用途，不提供投资建议，不联网，不做实盘交易。

任务：
- 在 ${targetFile} 中实现 ${functionName}。
- 保持输入和输出的索引对齐。
- 对空输入、缺失值或非法参数给出明确行为。

验收：
- 新增或更新 ${testFile}。
- 运行 uv run pytest。
- 用一个极小 DataFrame 或 Series 解释结果。

请先说明实现思路，再修改代码，最后总结这个函数可能被误用的地方。`;

const lessons: Lesson[] = [
  {
    id: "0.1",
    moduleId: "m0",
    order: 1,
    slug: "project-boundary",
    title: "这门课学什么，不学什么",
    subtitle: "先把边界说清楚：这是学习项目，不是赚钱系统。",
    difficulty: "入门",
    duration: "8 分钟",
    pythonModule: "README.md",
    objectives: ["区分量化研究、回测、paper trading 和实盘交易", "理解为什么课程不会提供投资建议", "知道最终会完成一个学习型研究报告"],
    concepts: ["量化研究", "回测", "paper trading", "实盘交易", "非投资建议"],
    intuition: "量化学习像是在实验室里研究问题。你会写代码、看数据、画图、检查假设，但实验室结果不能直接等同于真实市场里的资金结果。",
    handExample: "如果一个策略在历史数据上从 1.00 涨到 1.20，这只能说明它在这段历史样本里的回测净值上涨了 20%，不能说明未来也会上涨 20%。",
    pythonCode: `PROJECT_BOUNDARY = "education only, not investment advice"`,
    chart: "learning-path",
    chartNote: "学习路径图把课程分成数据、指标、仓位、回测、策略、验证和报告几个阶段。",
    mistakes: ["把回测截图当成收益承诺", "没理解交易成本和执行问题就谈实盘", "只追求策略收益，不学习验证方法"],
    quiz: {
      question: "这门课里的双均线策略应该被理解为什么？",
      options: [
        { label: "学习案例", value: "case" },
        { label: "投资建议", value: "advice" },
        { label: "保证盈利的方法", value: "guarantee" },
      ],
      correctValue: "case",
      explanation: "课程策略只用于学习如何编码、回测和审查假设，不构成投资建议。",
    },
    codexTask: task("0.1 项目边界", "项目风险声明", "README.md", "无需测试"),
    checkpoint: ["能说出本项目不是投资建议", "能解释回测和实盘的区别", "知道课程最终产物是一份学习报告"],
  },
  {
    id: "0.2",
    moduleId: "m0",
    order: 2,
    slug: "codex-workflow",
    title: "用 Codex 学量化的工作流",
    subtitle: "不要只让 Codex 写代码，要让它解释、实现、测试和反思。",
    difficulty: "入门",
    duration: "10 分钟",
    pythonModule: "quant_learning.metrics",
    objectives: ["掌握 Explain -> Implement -> Test -> Reflect 工作流", "学会给 Codex 明确约束和验收标准", "写出第一个可测试函数"],
    concepts: ["Prompt", "验收标准", "pytest", "边界条件"],
    intuition: "好的 Prompt 像一张小工单：它说清楚背景、目标、输入输出、限制和怎样算完成。这样 Codex 生成的代码更容易被你检查。",
    formula: "daily_return = current_price / previous_price - 1",
    handExample: "100 美元涨到 105 美元，收益率是 105 / 100 - 1 = 0.05，也就是 5%。",
    pythonCode: code.dailyReturn,
    chart: "learning-path",
    chartNote: "这节课的图展示从课程问题到函数、测试、图表和总结的闭环。",
    mistakes: ["Prompt 只写“帮我写个函数”", "没有告诉 Codex 不能联网或不能做投资建议", "没有要求测试"],
    quiz: {
      question: "一个适合课程项目的 Codex Prompt 至少应该包含什么？",
      options: [
        { label: "任务、约束、验收", value: "complete" },
        { label: "只写函数名", value: "name" },
        { label: "只说越快越好", value: "fast" },
      ],
      correctValue: "complete",
      explanation: "任务、约束和验收标准能让实现更可检查。",
    },
    codexTask: task("0.2 Codex 学习工作流", "daily_return", "python/src/quant_learning/metrics.py", "python/tests/test_metrics.py"),
    checkpoint: ["能写出带约束的 Prompt", "知道测试是学习过程的一部分", "能手算一个最简单收益率"],
  },
  {
    id: "1.1",
    moduleId: "m1",
    order: 101,
    slug: "us-market-and-ticker",
    title: "美股市场和 ticker",
    subtitle: "先理解股票数据里的代码、交易日和指数。",
    difficulty: "入门",
    duration: "12 分钟",
    pythonModule: "quant_learning.data",
    objectives: ["理解 ticker、股票、ETF 和指数", "知道日线数据只覆盖交易日", "读取第一份本地 CSV"],
    concepts: ["ticker", "NYSE", "Nasdaq", "ETF", "S&P 500", "交易日"],
    intuition: "ticker 是市场里用来识别证券的短代码。比如 SPY 不是公司名，而是跟踪 S&P 500 的 ETF 代码。",
    handExample: "如果 CSV 里有 AAPL、MSFT、SPY 三个 symbol，它们分别代表苹果、微软和一个指数 ETF 学习样例。",
    pythonCode: code.readCsv,
    chart: "price",
    chartNote: "价格曲线展示一只股票在多个交易日里的收盘价变化。",
    mistakes: ["把 ticker 当成公司全名", "以为每一天都有交易数据", "把指数和 ETF 完全混为一谈"],
    quiz: {
      question: "SPY 在课程样例里更接近什么？",
      options: [
        { label: "ETF 代码", value: "etf" },
        { label: "公司全称", value: "company" },
        { label: "交易所名称", value: "exchange" },
      ],
      correctValue: "etf",
      explanation: "SPY 是一个常见 ETF ticker，课程中用它作为基准学习样例。",
    },
    codexTask: task("1.1 美股市场和 ticker", "read_price_csv", "python/src/quant_learning/data.py", "python/tests/test_data.py"),
    checkpoint: ["能解释 ticker 的作用", "知道周末通常没有日线数据", "能读取本地 CSV"],
  },
  {
    id: "1.2",
    moduleId: "m1",
    order: 102,
    slug: "ohlcv",
    title: "OHLCV：一行日线数据",
    subtitle: "Open、High、Low、Close、Volume 是最基础的价格语言。",
    difficulty: "入门",
    duration: "14 分钟",
    pythonModule: "quant_learning.data",
    objectives: ["读懂一行 OHLCV 数据", "检查必要列是否存在", "理解 High、Low 和 Close 的区别"],
    concepts: ["Open", "High", "Low", "Close", "Volume", "日线"],
    intuition: "一行日线数据像是一张当天交易小结：开盘从哪里开始，最高最低到过哪里，最后收在哪里，成交量有多少。",
    handExample: "如果 open=100、high=106、low=98、close=104，说明当天收盘高于开盘，但盘中也曾跌到 98。",
    pythonCode: code.ohlcv,
    chart: "ohlcv",
    chartNote: "简化 OHLC 图帮助你看到同一天里 open、high、low、close 的关系。",
    mistakes: ["把 high 当成最终成交价", "只看 close 忽略 volume", "不检查列名就进入回测"],
    quiz: {
      question: "日线数据里的 Close 表示什么？",
      options: [
        { label: "当天收盘价", value: "close" },
        { label: "当天最高价", value: "high" },
        { label: "当天成交量", value: "volume" },
      ],
      correctValue: "close",
      explanation: "Close 是该交易日最后记录的收盘价格，不是最高价或成交量。",
    },
    codexTask: task("1.2 OHLCV", "validate_ohlcv_columns", "python/src/quant_learning/data.py", "python/tests/test_data.py"),
    checkpoint: ["能读懂一行 OHLCV", "能说出 high 和 close 的区别", "能检查必要列"],
  },
  {
    id: "1.3",
    moduleId: "m1",
    order: 103,
    slug: "close-vs-adjusted-close",
    title: "Close 和 Adjusted Close",
    subtitle: "拆股和分红会让普通收盘价在长期回测中误导你。",
    difficulty: "基础",
    duration: "15 分钟",
    pythonModule: "quant_learning.data",
    objectives: ["理解 close 和 adjusted close 的区别", "知道拆股会改变历史价格表现", "选择合适价格列计算收益"],
    concepts: ["Close", "Adjusted Close", "split", "dividend", "复权"],
    intuition: "如果一家公司 1 股拆成 2 股，普通 close 可能突然减半。但投资者的经济价值不一定减半，所以长期收益通常需要看复权价格。",
    handExample: "某股票 close 从 105 变成 53，看起来跌了接近一半；但 adj_close 从 105 到 106，说明这更像拆股调整，而不是一天暴跌。",
    pythonCode: code.adjusted,
    chart: "adjusted-close",
    chartNote: "Close 曲线出现断崖，Adjusted Close 曲线保持连续，帮助解释复权价格的意义。",
    mistakes: ["长期回测直接使用未复权 close", "看到价格减半就判断公司价值减半", "没有记录自己选择了哪一列价格"],
    quiz: {
      question: "长期回测通常优先使用哪类价格？",
      options: [
        { label: "复权价格", value: "adjusted" },
        { label: "成交量", value: "volume" },
        { label: "当天最高价", value: "high" },
      ],
      correctValue: "adjusted",
      explanation: "复权价格能更好处理拆股和分红对历史收益的影响。",
    },
    codexTask: task("1.3 Close 和 Adjusted Close", "choose_price_column", "python/src/quant_learning/data.py", "python/tests/test_data.py"),
    checkpoint: ["能解释复权价格", "知道 close 曲线可能有拆股断点", "能在代码中选择价格列"],
  },
  {
    id: "1.4",
    moduleId: "m1",
    order: 104,
    slug: "data-quality",
    title: "数据清洗和质量检查",
    subtitle: "回测前先检查数据，否则后面的结果都不可靠。",
    difficulty: "基础",
    duration: "16 分钟",
    pythonModule: "quant_learning.data",
    objectives: ["识别缺失值、重复日期和异常价格", "输出数据质量报告", "理解为什么不能盲目修复数据"],
    concepts: ["missing data", "duplicate index", "outlier", "data quality"],
    intuition: "数据质量检查像出发前看地图和油量。你不一定马上修车，但至少要知道车哪里可能有问题。",
    handExample: "如果同一天出现两行价格，回测器可能计算两次收益；如果 close 为 0，收益率会变成无意义的巨大数字。",
    pythonCode: code.quality,
    chart: "data-quality",
    chartNote: "数据质量图把缺失值、重复日期和异常价格标出来，避免问题藏在表格里。",
    mistakes: ["下载数据后直接回测", "静默删除异常值但不记录", "把所有缺失值都用前一天价格填充"],
    quiz: {
      question: "回测前发现重复日期，最合理的第一步是什么？",
      options: [
        { label: "记录并调查原因", value: "inspect" },
        { label: "直接忽略", value: "ignore" },
        { label: "把价格乘以 2", value: "double" },
      ],
      correctValue: "inspect",
      explanation: "重复日期会影响收益路径，应该先记录并调查，而不是静默忽略。",
    },
    codexTask: task("1.4 数据质量检查", "validate_price_data", "python/src/quant_learning/data.py", "python/tests/test_data.py"),
    checkpoint: ["能列出 4 个数据检查项", "能生成质量报告", "知道不要静默修复严重问题"],
  },
  {
    id: "2.1",
    moduleId: "m2",
    order: 201,
    slug: "returns",
    title: "收益率：价格变化的百分比",
    subtitle: "10 美元上涨不总是同一件事，百分比才方便比较。",
    difficulty: "入门",
    duration: "14 分钟",
    pythonModule: "quant_learning.metrics",
    objectives: ["理解价格变化和收益率的区别", "计算日收益率序列", "处理第一天没有收益的问题"],
    concepts: ["return", "pct_change", "daily return", "索引对齐"],
    intuition: "100 涨到 110 和 1000 涨到 1010 都涨了 10 美元，但前者是 10%，后者只有 1%。收益率让不同价格水平可以比较。",
    formula: "return_t = price_t / price_{t-1} - 1",
    handExample: "价格从 100 到 102，收益率是 2%；从 102 到 101，收益率是 -0.98%。",
    pythonCode: code.returns,
    chart: "returns",
    chartNote: "同一张图同时展示价格曲线和日收益率柱状图，强调价格和收益不是同一种信息。",
    mistakes: ["用绝对涨跌代替收益率", "忘记第一天没有上一日价格", "把 NaN 当成 0 之前不说明原因"],
    quiz: {
      question: "股票 A 从 10 涨到 11，股票 B 从 100 涨到 101，谁的收益率更高？",
      options: [
        { label: "股票 A", value: "a" },
        { label: "股票 B", value: "b" },
        { label: "一样高", value: "same" },
      ],
      correctValue: "a",
      explanation: "A 上涨 10%，B 上涨 1%。绝对涨幅相同，收益率不同。",
    },
    codexTask: task("2.1 收益率", "calculate_returns", "python/src/quant_learning/metrics.py", "python/tests/test_metrics.py"),
    checkpoint: ["能手算简单收益率", "能解释第一天为什么没有收益", "能用 pandas 计算收益序列"],
  },
  {
    id: "2.2",
    moduleId: "m2",
    order: 202,
    slug: "compound-equity",
    title: "复利和净值曲线",
    subtitle: "策略表现不是把每日收益简单相加，而是沿路径累乘。",
    difficulty: "基础",
    duration: "15 分钟",
    pythonModule: "quant_learning.metrics",
    objectives: ["理解复利累乘", "从收益率生成净值曲线", "读懂 equity curve"],
    concepts: ["compound return", "equity curve", "cumprod"],
    intuition: "净值曲线从 1.00 开始，记录每一天你的学习型组合相对初始资金变成了多少。它显示路径，而不是只显示终点。",
    formula: "equity_t = product(1 + return_i)",
    handExample: "第一天 +10%，第二天 -10%，净值是 1.1 * 0.9 = 0.99，不是回到 1.00。",
    pythonCode: code.compound,
    chart: "equity",
    chartNote: "净值曲线让你看到策略经历了哪些上涨、回落和恢复。",
    mistakes: ["把每日收益直接相加当最终收益", "只看终点不看路径", "忘记负收益后的恢复需要更大涨幅"],
    quiz: {
      question: "+10% 后再 -10%，最终净值是多少？",
      options: [
        { label: "0.99", value: "099" },
        { label: "1.00", value: "100" },
        { label: "1.10", value: "110" },
      ],
      correctValue: "099",
      explanation: "1.1 * 0.9 = 0.99，复利路径不是简单加减。",
    },
    codexTask: task("2.2 复利和净值曲线", "compound_returns", "python/src/quant_learning/metrics.py", "python/tests/test_metrics.py"),
    checkpoint: ["能解释 equity curve", "知道复利不是简单相加", "能从收益率生成净值"],
  },
  {
    id: "3.1",
    moduleId: "m3",
    order: 301,
    slug: "max-drawdown",
    title: "最大回撤",
    subtitle: "收益曲线从历史高点跌下来多少，往往比最终收益更刺眼。",
    difficulty: "基础",
    duration: "16 分钟",
    pythonModule: "quant_learning.metrics",
    objectives: ["理解 running max", "计算回撤序列", "找到最大回撤"],
    concepts: ["drawdown", "running max", "max drawdown"],
    intuition: "最大回撤描述从高点到低点的最坏下跌。它回答的是：如果你在最难受的位置持有，会经历多大的账面回落。",
    formula: "drawdown_t = equity_t / running_max_t - 1",
    handExample: "净值从 1.20 跌到 0.96，回撤是 0.96 / 1.20 - 1 = -20%。",
    pythonCode: code.drawdown,
    chart: "drawdown",
    chartNote: "上图看净值，下图看回撤。回撤越向下，代表离历史高点越远。",
    mistakes: ["只看最终收益，不看中途下跌", "把单日亏损当成最大回撤", "忽略恢复到新高需要时间"],
    quiz: {
      question: "净值从历史高点 1.20 跌到 1.02，回撤约为多少？",
      options: [
        { label: "-15%", value: "15" },
        { label: "-2%", value: "2" },
        { label: "+15%", value: "plus" },
      ],
      correctValue: "15",
      explanation: "1.02 / 1.20 - 1 = -0.15，也就是 -15%。",
    },
    codexTask: task("3.1 最大回撤", "drawdown_series 和 max_drawdown", "python/src/quant_learning/metrics.py", "python/tests/test_metrics.py"),
    checkpoint: ["能计算回撤", "能读懂回撤曲线", "知道最大回撤不是单日亏损"],
  },
  {
    id: "3.2",
    moduleId: "m3",
    order: 302,
    slug: "sharpe-ratio",
    title: "夏普比率、胜率和盈亏比",
    subtitle: "一个指标永远不够，但它们能帮你提出更好的问题。",
    difficulty: "基础",
    duration: "18 分钟",
    pythonModule: "quant_learning.metrics",
    objectives: ["理解风险调整后收益", "知道胜率和盈亏比的局限", "处理零波动边界"],
    concepts: ["Sharpe ratio", "win rate", "profit/loss ratio", "risk-free rate"],
    intuition: "夏普比率尝试回答：承担这些波动，换来的平均收益是否值得？胜率和盈亏比则从交易结果角度看策略，但它们都有盲点。",
    formula: "sharpe = mean(excess_returns) / std(returns) * sqrt(252)",
    handExample: "一个策略胜率 90%，但每次赢 1 元、每次亏 20 元，仍然可能长期亏损。",
    pythonCode: code.sharpe,
    chart: "metrics",
    chartNote: "指标卡片并排展示收益、波动率、回撤、夏普和胜率，提醒你不要只看单一数字。",
    mistakes: ["胜率高就认为策略好", "夏普高就忽略最大回撤", "零波动时强行计算夏普"],
    quiz: {
      question: "胜率高是否一定代表策略好？",
      options: [
        { label: "不一定", value: "no" },
        { label: "一定", value: "yes" },
        { label: "只要超过 50% 就一定好", value: "half" },
      ],
      correctValue: "no",
      explanation: "如果亏损交易特别大，高胜率策略仍然可能亏钱。",
    },
    codexTask: task("3.2 夏普比率、胜率和盈亏比", "sharpe_ratio、win_rate、profit_loss_ratio", "python/src/quant_learning/metrics.py", "python/tests/test_metrics.py"),
    checkpoint: ["能解释夏普比率直觉", "知道胜率的局限", "知道单一指标不能评价完整策略"],
  },
  {
    id: "4.1",
    moduleId: "m4",
    order: 401,
    slug: "signal-position",
    title: "Signal 和 Position",
    subtitle: "信号是想法，仓位才决定你哪一天真的承担收益和亏损。",
    difficulty: "基础",
    duration: "17 分钟",
    pythonModule: "quant_learning.positions",
    objectives: ["区分 signal 和 position", "理解为什么 position 通常要 shift", "避免 look-ahead bias"],
    concepts: ["signal", "position", "shift", "look-ahead bias"],
    intuition: "当天收盘后你才知道收盘价。如果你用这个收盘价产生信号，就不能再假设自己已经按同一个收盘价提前成交。",
    formula: "position_t = signal_{t-1}",
    handExample: "1 月 3 日收盘后出现买入信号，更保守的日线回测会从 1 月 4 日开始持仓。",
    pythonCode: code.positions,
    chart: "position",
    chartNote: "图里 signal 比 position 早一天变化，展示了滞后持仓如何避免偷看未来。",
    mistakes: ["当天信号当天收盘成交", "把 signal 直接乘以当天收益", "没有检查索引是否对齐"],
    quiz: {
      question: "用当天收盘价生成信号，又按当天收盘价成交，最大风险是什么？",
      options: [
        { label: "look-ahead bias", value: "bias" },
        { label: "成交量太大", value: "volume" },
        { label: "ticker 写错", value: "ticker" },
      ],
      correctValue: "bias",
      explanation: "你使用了现实中同一时刻无法同时知道并成交的信息。",
    },
    codexTask: task("4.1 Signal 和 Position", "signals_to_positions", "python/src/quant_learning/positions.py", "python/tests/test_positions.py"),
    checkpoint: ["能区分信号和仓位", "知道 position 默认滞后一日", "能指出 look-ahead bias"],
  },
  {
    id: "4.2",
    moduleId: "m4",
    order: 402,
    slug: "transaction-costs",
    title: "手续费和滑点",
    subtitle: "交易越频繁，越需要认真看成本。",
    difficulty: "基础",
    duration: "16 分钟",
    pythonModule: "quant_learning.costs",
    objectives: ["理解 commission、slippage 和 bps", "用仓位变化估算换手", "比较有成本和无成本净值"],
    concepts: ["commission", "slippage", "basis points", "turnover"],
    intuition: "回测里每次换仓都像过收费站。一次费用很小，但高换手策略会反复经过，最终吞掉很多收益。",
    formula: "cost = turnover * (commission_bps + slippage_bps) / 10000",
    handExample: "如果换手为 1，手续费和滑点合计 10 bps，则成本是 0.001，也就是 0.1%。",
    pythonCode: code.costs,
    chart: "costs",
    chartNote: "成本对比图显示无成本曲线通常更好看，但更不现实。",
    mistakes: ["忽略交易成本", "以为 bps 是百分比本身", "没有把成本和换手联系起来"],
    quiz: {
      question: "10 bps 等于多少？",
      options: [
        { label: "0.1%", value: "01" },
        { label: "10%", value: "10" },
        { label: "1%", value: "1" },
      ],
      correctValue: "01",
      explanation: "1 bps = 0.01%，所以 10 bps = 0.1%。",
    },
    codexTask: task("4.2 手续费和滑点", "calculate_turnover 和 apply_transaction_costs", "python/src/quant_learning/costs.py", "python/tests/test_costs.py"),
    checkpoint: ["能解释 bps", "能计算换手成本", "知道高换手策略对成本敏感"],
  },
  {
    id: "5.1",
    moduleId: "m5",
    order: 501,
    slug: "buy-and-hold",
    title: "Buy and Hold 基准策略",
    subtitle: "先有基准，才知道一个策略是否值得继续研究。",
    difficulty: "基础",
    duration: "14 分钟",
    pythonModule: "quant_learning.strategies",
    objectives: ["理解 benchmark", "实现 buy and hold signal", "用它作为策略比较起点"],
    concepts: ["benchmark", "buy and hold", "baseline"],
    intuition: "如果一个复杂策略连简单买入并持有都比不过，那它至少需要解释为什么还值得研究，比如回撤更小或成本更低。",
    handExample: "从第二个交易日起一直持仓为 1，就能得到最简单的持有型收益路径。",
    pythonCode: code.buyHold,
    chart: "backtest",
    chartNote: "基准图展示 buy and hold 的净值和回撤，后续策略都要和它比较。",
    mistakes: ["没有基准就评价策略", "只和现金比较", "忽略基准的风险指标"],
    quiz: {
      question: "为什么需要 benchmark？",
      options: [
        { label: "提供比较基准", value: "compare" },
        { label: "保证策略赚钱", value: "guarantee" },
        { label: "替代数据质量检查", value: "data" },
      ],
      correctValue: "compare",
      explanation: "benchmark 帮助判断策略表现是否相对简单选择有意义。",
    },
    codexTask: task("5.1 Buy and Hold", "buy_and_hold_signal", "python/src/quant_learning/strategies.py", "python/tests/test_strategies.py"),
    checkpoint: ["能解释 benchmark", "能实现 buy and hold signal", "知道策略比较不能脱离基准"],
  },
  {
    id: "5.2",
    moduleId: "m5",
    order: 502,
    slug: "minimal-backtester",
    title: "最小可用回测器",
    subtitle: "把价格、信号、仓位、成本、净值和指标串起来。",
    difficulty: "基础",
    duration: "20 分钟",
    pythonModule: "quant_learning.backtest",
    objectives: ["理解回测流程", "实现 BacktestResult", "默认避免 look-ahead bias"],
    concepts: ["asset returns", "strategy returns", "equity curve", "BacktestResult"],
    intuition: "回测器不是神秘工具，它只是稳定地执行一套流程：价格变收益，信号变仓位，仓位乘收益，扣成本，再计算净值和指标。",
    formula: "strategy_return_t = asset_return_t * position_t - cost_t",
    handExample: "如果某天资产收益是 2%，position 是 1，成本是 0.1%，策略收益就是 1.9%。如果 position 是 0，策略不承担这天价格变化。",
    pythonCode: code.backtest,
    chart: "backtest",
    chartNote: "回测图把净值、回撤和指标卡片放在一起，避免只看收益。",
    mistakes: ["把信号直接乘当天收益", "只保存最终收益", "没有测试成本和滞后逻辑"],
    quiz: {
      question: "最小回测器里 position 的作用是什么？",
      options: [
        { label: "决定是否承担当天资产收益", value: "exposure" },
        { label: "替代价格数据", value: "price" },
        { label: "保证没有亏损", value: "safe" },
      ],
      correctValue: "exposure",
      explanation: "position 决定策略在某一天是否暴露于资产收益。",
    },
    codexTask: task("5.2 最小可用回测器", "run_backtest 和 BacktestResult", "python/src/quant_learning/backtest.py", "python/tests/test_backtest.py"),
    checkpoint: ["能说出回测 5 个步骤", "能解释 asset returns 和 strategy returns", "知道默认滞后仓位的重要性"],
  },
  {
    id: "6.1",
    moduleId: "m6",
    order: 601,
    slug: "moving-average-crossover",
    title: "双均线策略",
    subtitle: "第一种趋势跟随学习案例：快线在慢线上方时持仓。",
    difficulty: "基础",
    duration: "18 分钟",
    pythonModule: "quant_learning.strategies",
    objectives: ["理解 moving average", "实现 fast/slow crossover signal", "知道参数越调越好可能是过拟合"],
    concepts: ["moving average", "fast window", "slow window", "crossover", "trend following"],
    intuition: "移动平均线会把价格噪声平滑掉。快线更敏感，慢线更稳定。快线高于慢线时，策略把它理解为趋势向上学习信号。",
    formula: "signal_t = 1 if MA_fast_t > MA_slow_t else 0",
    handExample: "如果 5 日均线是 108，20 日均线是 104，双均线信号为 1；如果快线低于慢线，信号为 0。",
    pythonCode: code.movingAverage,
    chart: "moving-average",
    chartNote: "图中价格、快线、慢线和 signal 一起出现，帮助理解信号如何从价格派生。",
    mistakes: ["fast_window 大于 slow_window", "调参直到历史最好就停止", "忘记 signal 到 position 需要滞后"],
    quiz: {
      question: "双均线策略里 fast_window 应该通常如何比较 slow_window？",
      options: [
        { label: "更短", value: "shorter" },
        { label: "更长", value: "longer" },
        { label: "必须相等", value: "equal" },
      ],
      correctValue: "shorter",
      explanation: "快线窗口更短，才能更快反映价格变化。",
    },
    codexTask: task("6.1 双均线策略", "moving_average_crossover", "python/src/quant_learning/strategies.py", "python/tests/test_strategies.py"),
    checkpoint: ["能解释快慢均线", "能实现双均线 signal", "知道历史最优参数不代表未来有效"],
  },
];

const modulesMeta = [
  {
    id: "m0",
    title: "Module 0: 学习方式和项目边界",
    summary: "先理解课程边界，再学会让 Codex 带着验收标准写代码。",
    product: "学习计划、风险声明、第一个收益率函数",
  },
  {
    id: "m1",
    title: "Module 1: 美股数据入门",
    summary: "读懂 ticker、交易日、OHLCV、复权价格和数据质量。",
    product: "数据读取函数和质量报告",
  },
  {
    id: "m2",
    title: "Module 2: 收益和净值",
    summary: "从价格序列得到收益率、复利和净值曲线。",
    product: "收益率和净值曲线函数",
  },
  {
    id: "m3",
    title: "Module 3: 风险和绩效指标",
    summary: "用回撤、夏普、胜率和盈亏比评价策略表现。",
    product: "指标计算模块",
  },
  {
    id: "m4",
    title: "Module 4: 信号、仓位和成本",
    summary: "把策略想法转换成现实一点的持仓和成本模型。",
    product: "position 和 transaction cost 模块",
  },
  {
    id: "m5",
    title: "Module 5: 第一套回测系统",
    summary: "把数据、信号、仓位、成本、净值和指标串成回测器。",
    product: "BacktestResult 和报告",
  },
  {
    id: "m6",
    title: "Module 6: 入门策略模式",
    summary: "用同一套回测器比较双均线、动量和均值回归。",
    product: "策略函数库",
  },
  {
    id: "m7",
    title: "Module 7: 多股票组合",
    summary: "理解组合收益、权重、再平衡和 benchmark。",
    product: "等权组合和轮动组合实验",
  },
  {
    id: "m8",
    title: "Module 8: 参数实验和验证",
    summary: "用参数扫描、样本外验证和随机策略识别过拟合风险。",
    product: "参数扫描和样本外报告",
  },
  {
    id: "m9",
    title: "Module 9: 回测边界和 Capstone",
    summary: "理解回测不能代表未来，并完成最终学习报告。",
    product: "完整策略研究报告",
  },
];

export const courseModules: CourseModule[] = modulesMeta.map((module) => ({
  ...module,
  lessons: lessons.filter((lesson) => lesson.moduleId === module.id),
}));

export const allLessons = [...lessons].sort((a, b) => a.order - b.order);

export function getLesson(slug: string) {
  return allLessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string) {
  const index = allLessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: index > 0 ? allLessons[index - 1] : undefined,
    next: index >= 0 && index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}

export function getModule(moduleId: string) {
  return courseModules.find((module) => module.id === moduleId);
}
