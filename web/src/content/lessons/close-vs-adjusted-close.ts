import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "1.4",
  moduleId: "m1",
  order: 104,
  slug: "close-vs-adjusted-close",
  title: "Close 和 Adjusted Close",
  subtitle: "拆股和分红会让普通收盘价在长期回测中误导你。",
  pythonModule: "quant_learning.data",
  objectives: ["理解 close 和 adjusted close 的区别", "知道拆股会改变历史价格表现", "选择合适价格列计算收益"],
  concepts: ["Close", "Adjusted Close", "split", "dividend", "复权"],
  intuition: "如果一家公司 1 股拆成 2 股，普通 close 可能突然减半。但投资者的经济价值不一定减半，所以长期收益通常需要看复权价格。",
  handExample: "某股票 close 从 105 变成 53，看起来跌了接近一半；但 adj_close 从 105 到 106，说明这更像拆股调整，而不是一天暴跌。",
  pythonCode: `def choose_price_column(df: pd.DataFrame, adjusted: bool = True) -> pd.Series:
    if adjusted and "adj_close" in df.columns:
        return df["adj_close"]
    if "close" not in df.columns:
        raise ValueError("price data must contain close")
    return df["close"]`,
  chart: "adjusted-close",
  chartNote: "Close 曲线出现断崖，Adjusted Close 曲线保持连续，帮助解释复权价格的意义。",
  mistakes: ["长期回测直接使用未复权 close", "看到价格减半就判断公司价值减半", "没有记录自己选择了哪一列价格"],
  checkpoint: ["能解释复权价格", "知道 close 曲线可能有拆股断点", "能在代码中选择价格列"],
  skillLine: "data-review",
  quizQuestion: "长期回测通常优先使用哪类价格？",
  correctLabel: "复权价格",
  wrongLabels: ["成交量", "当天最高价"],
  quizExplanation: "复权价格能更好处理拆股和分红对历史收益的影响。",
  codexFunction: "choose_price_column",
  targetFile: "python/src/quant_learning/data.py",
  testFile: "python/tests/test_data.py",
});
