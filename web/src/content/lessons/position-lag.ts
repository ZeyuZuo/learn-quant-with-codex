import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "4.2",
  moduleId: "m4",
  order: 402,
  slug: "position-lag",
  title: "Position 才是持仓",
  subtitle: "仓位决定你哪一天真的承担收益，日线回测通常要让 signal 滞后一日。",
  duration: "17 分钟",
  pythonModule: "quant_learning.positions",
  objectives: ["把 signal 转换为 position", "理解 shift、lag 和索引对齐", "避免当天收盘信号当天成交的前视偏差"],
  concepts: ["position", "shift", "lag", "look-ahead bias"],
  intuition: "当天收盘后你才知道收盘价。如果你用这个收盘价产生信号，就不能再假设自己已经按同一个收盘价提前成交。Position 是回测真正用来承担收益的序列。",
  formula: "position_t = signal_{t-1}",
  handExample: "1 月 3 日收盘后出现买入信号，更保守的日线回测会从 1 月 4 日开始持仓。",
  pythonCode: `def signals_to_positions(signals: pd.Series, lag: int = 1) -> pd.Series:
    if lag < 0:
        raise ValueError("lag must be non-negative")
    return signals.shift(lag).fillna(0.0)`,
  chart: "position",
  chartNote: "图里 signal 比 position 早一天变化，展示滞后持仓如何减少最明显的 look-ahead bias。",
  mistakes: ["当天信号当天收盘成交", "把 signal 直接乘以当天收益", "没有检查 signal、position 和 returns 的索引是否对齐"],
  checkpoint: ["能区分 signal 和 position", "知道 position 默认滞后一日", "能指出 look-ahead bias"],
  skillLine: "execution-assumptions",
  quizQuestion: "用当天收盘价生成信号，又按当天收盘价成交，最大风险是什么？",
  correctLabel: "look-ahead bias",
  wrongLabels: ["成交量太大", "ticker 写错"],
  quizExplanation: "你使用了现实中同一时刻无法同时知道并成交的信息。",
  codexFunction: "signals_to_positions",
  targetFile: "python/src/quant_learning/positions.py",
  testFile: "python/tests/test_positions.py",
});
