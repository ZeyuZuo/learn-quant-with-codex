import { defineLesson } from "../course/define-lesson";

export default defineLesson({
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
  handExample: "如果 CSV 里有 3 个 symbol：AAPL、MSFT、SPY，它们分别代表苹果、微软和一个指数 ETF 学习样例。",
  pythonCode: `from pathlib import Path
import pandas as pd

def read_price_csv(path: str | Path) -> pd.DataFrame:
    df = pd.read_csv(path, parse_dates=["date"])
    df = df.sort_values("date").set_index("date")
    return df`,
  chart: "price",
  chartNote: "价格曲线展示一只股票在多个交易日里的收盘价变化。",
  mistakes: ["把 ticker 当成公司全名", "以为每一天都有交易数据", "把指数和 ETF 完全混为一谈"],
  checkpoint: ["能解释 ticker 的作用", "知道周末通常没有日线数据", "能读取本地 CSV"],
  skillLine: "data-review",
  quizQuestion: "SPY 在课程样例里更接近什么？",
  correctLabel: "ETF 代码",
  wrongLabels: ["公司全称", "交易所名称"],
  quizExplanation: "SPY 是一个常见 ETF ticker，课程中用它作为基准学习样例。",
  codexFunction: "read_price_csv",
  targetFile: "python/src/quant_learning/data.py",
  testFile: "python/tests/test_data.py",
});
