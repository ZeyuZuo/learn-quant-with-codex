import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "6.5",
  moduleId: "m6",
  order: 605,
  slug: "strategy-comparison",
  title: "策略对比",
  subtitle: "公平比较要求同一数据、同一成本、同一回测器和同一指标。",
  pythonModule: "quant_learning.backtest",
  objectives: ["比较多个 BacktestResult", "加入 benchmark", "识别不公平比较"],
  concepts: ["strategy comparison", "benchmark", "same assumptions"],
  intuition: "策略对比像比赛。你不能让一个策略扣成本，另一个不扣；也不能让一个用复权价格，另一个用普通 close。",
  handExample: "比较 buy and hold 和双均线时，两者应使用同一段价格数据、同一 signal_lag=1 和同一成本设置，例如都扣 3 bps。",
  pythonCode: `def compare_strategies(results: dict[str, BacktestResult]) -> pd.DataFrame:
    rows = []
    for name, result in results.items():
        rows.append({"name": name, **result.metrics})
    return pd.DataFrame(rows).set_index("name")`,
  chart: "strategy-comparison",
  chartNote: "多策略净值图帮助看路径差异，但结论必须结合指标和假设。",
  mistakes: ["只比较最终收益", "每个策略用不同成本", "忘记 benchmark"],
  checkpoint: ["能公平比较策略", "知道需要 benchmark", "能读多策略净值图"],
  skillLine: "execution-assumptions",
  quizQuestion: "公平策略比较需要什么？",
  correctLabel: "相同数据和假设",
  wrongLabels: ["只看最高收益", "只看最短样本"],
  quizExplanation: "比较策略时，数据、成本和回测规则必须一致。",
  codexFunction: "compare_strategies",
  targetFile: "python/src/quant_learning/backtest.py",
  testFile: "python/tests/test_backtest.py",
});
