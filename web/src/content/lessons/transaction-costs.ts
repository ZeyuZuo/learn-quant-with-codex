import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "4.3",
  moduleId: "m4",
  order: 403,
  slug: "transaction-costs",
  title: "手续费和滑点",
  subtitle: "交易越频繁，越需要认真看成本。",
  duration: "16 分钟",
  pythonModule: "quant_learning.costs",
  objectives: ["理解 commission、slippage 和 bps", "用仓位变化估算换手", "比较有成本和无成本净值"],
  concepts: ["commission", "slippage", "basis points", "turnover"],
  intuition: "回测里每次换仓都像过收费站。一次费用很小，但高换手策略会反复经过，最终吞掉很多收益。",
  formula: "cost = turnover * (commission_bps + slippage_bps) / 10000",
  handExample: "如果换手为 1，手续费和滑点合计 10 bps，则成本是 0.001，也就是 0.1%。",
  pythonCode: `def calculate_turnover(positions: pd.Series) -> pd.Series:
    return positions.diff().abs().fillna(positions.abs())

def apply_transaction_costs(returns, positions, commission_bps=0.0, slippage_bps=0.0):
    turnover = calculate_turnover(positions)
    cost_rate = (commission_bps + slippage_bps) / 10_000
    return returns - turnover * cost_rate`,
  chart: "costs",
  chartNote: "成本对比图显示无成本曲线通常更好看，但更不现实。",
  mistakes: ["忽略交易成本", "以为 bps 是百分比本身", "没有把成本和换手联系起来"],
  checkpoint: ["能解释 bps", "能计算换手成本", "知道高换手策略对成本敏感"],
  skillLine: "execution-assumptions",
  quizQuestion: "10 bps 等于多少？",
  correctLabel: "0.1%",
  wrongLabels: ["10%", "1%"],
  quizExplanation: "1 bps = 0.01%，所以 10 bps = 0.1%。",
  codexFunction: "calculate_turnover 和 apply_transaction_costs",
  targetFile: "python/src/quant_learning/costs.py",
  testFile: "python/tests/test_costs.py",
});
