import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "1.3",
  moduleId: "m1",
  order: 103,
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
  pythonCode: `REQUIRED_OHLCV_COLUMNS = {"open", "high", "low", "close", "volume"}

def validate_ohlcv_columns(df: pd.DataFrame) -> None:
    missing = REQUIRED_OHLCV_COLUMNS.difference(df.columns)
    if missing:
        raise ValueError(f"missing OHLCV columns: {sorted(missing)}")`,
  chart: "ohlcv",
  chartNote: "简化 OHLC 图帮助你看到同一天里 open、high、low、close 的关系。",
  mistakes: ["把 high 当成最终成交价", "只看 close 忽略 volume", "不检查列名就进入回测"],
  checkpoint: ["能读懂一行 OHLCV", "能说出 high 和 close 的区别", "能检查必要列"],
  skillLine: "data-review",
  quizQuestion: "日线数据里的 Close 表示什么？",
  correctLabel: "当天收盘价",
  wrongLabels: ["当天最高价", "当天成交量"],
  quizExplanation: "Close 是该交易日最后记录的收盘价格，不是最高价或成交量。",
  codexFunction: "validate_ohlcv_columns",
  targetFile: "python/src/quant_learning/data.py",
  testFile: "python/tests/test_data.py",
});
