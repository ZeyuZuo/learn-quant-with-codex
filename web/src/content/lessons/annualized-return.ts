import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "2.4",
  moduleId: "m2",
  order: 204,
  slug: "annualized-return",
  title: "年化收益率",
  subtitle: "把不同长度的样本放到相近尺度上比较，但短样本会很容易误导。",
  pythonModule: "quant_learning.metrics",
  objectives: ["理解 252 个交易日近似", "计算年化收益", "识别短期年化的误导性"],
  concepts: ["annualized return", "periods_per_year", "sample length"],
  intuition: "年化收益像把一段跑步速度换算成全年速度。它方便比较，但如果你只跑了 10 秒，就不能说自己全年都能保持这个速度。",
  formula: "annual_return = ending_equity ** (252 / n_days) - 1",
  handExample: "5 天上涨 2% 年化后可能很高，但这不代表未来一年能复制这 5 天。",
  pythonCode: `def annualized_return(returns: pd.Series, periods_per_year: int = 252) -> float:
    clean = returns.dropna().astype(float)
    if clean.empty:
        return float("nan")
    ending_equity = float((1 + clean).prod())
    return ending_equity ** (periods_per_year / len(clean)) - 1`,
  chart: "annualized",
  chartNote: "净值曲线越短，年化数字越容易被个别涨跌放大。",
  mistakes: ["用几天收益推断全年收益", "忘记说明 periods_per_year", "负净值或空序列仍强行年化"],
  checkpoint: ["能写年化收益公式", "知道 252 是近似", "能说明短期年化风险"],
  skillLine: "return-path",
  quizQuestion: "短样本年化收益最主要的问题是什么？",
  correctLabel: "容易被少数日期放大",
  wrongLabels: ["一定更准确", "不需要净值"],
  quizExplanation: "样本越短，年化越容易把短期偶然波动放大。",
  codexFunction: "annualized_return",
  targetFile: "python/src/quant_learning/metrics.py",
  testFile: "python/tests/test_metrics.py",
});
