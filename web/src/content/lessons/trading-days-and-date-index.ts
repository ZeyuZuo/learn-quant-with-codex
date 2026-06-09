import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "1.2",
  moduleId: "m1",
  order: 102,
  slug: "trading-days-and-date-index",
  title: "交易日和日期索引",
  subtitle: "日线数据不是每天都有，日期索引必须按时间顺序工作。",
  pythonModule: "quant_learning.data",
  objectives: ["理解交易日缺口", "使用 DatetimeIndex", "检查日期是否递增"],
  concepts: ["trading day", "DatetimeIndex", "sort_values", "monotonic index"],
  intuition: "股票市场通常周末不交易，所以价格序列天然有日期缺口。缺口不是错误，但重复日期、乱序日期和非时间索引通常会让回测结果变得不可信。",
  handExample: "1 月 5 日后直接到 1 月 8 日，通常只是周末；但两个 1 月 8 日就需要调查。",
  pythonCode: `from pathlib import Path
import pandas as pd

def read_price_csv(path: str | Path) -> pd.DataFrame:
    df = pd.read_csv(path, parse_dates=["date"])
    df = df.sort_values("date").set_index("date")
    return df`,
  chart: "price",
  chartNote: "价格点只出现在交易日。图上的日期间隔提醒你不要把日历日和交易日混为一谈。",
  mistakes: ["随机打乱时间序列", "把周末缺口当作缺失价格", "没有按日期排序就计算收益率"],
  checkpoint: ["能解释交易日缺口", "能使用 DatetimeIndex", "知道时间序列不能随机打乱"],
  skillLine: "data-review",
  quizQuestion: "日线数据中没有周六价格，最常见原因是什么？",
  correctLabel: "市场通常不交易",
  wrongLabels: ["数据一定坏了", "股票退市了"],
  quizExplanation: "美股日线通常只记录交易日，周末缺口本身不是错误。",
  codexFunction: "read_price_csv 日期处理",
  targetFile: "python/src/quant_learning/data.py",
  testFile: "python/tests/test_data.py",
});
