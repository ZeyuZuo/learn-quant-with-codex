import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "8.4",
  moduleId: "m8",
  order: 804,
  slug: "random-strategy-winners",
  title: "随机策略也会有赢家",
  subtitle: "尝试次数越多，越容易在历史里挑到偶然表现好的曲线。",
  pythonModule: "quant_learning.experiments",
  objectives: ["模拟随机信号", "观察多重测试风险", "识别挑最好截图的问题"],
  concepts: ["random strategy", "multiple testing", "data snooping"],
  intuition: "如果你扔 1000 次硬币，总能找到一段看起来很有规律的结果。市场回测里也有类似风险。",
  handExample: "生成 100 条随机 0/1 信号，总会有几条在短样本里表现很好，但它们没有真实交易逻辑。",
  pythonCode: `def simulate_random_strategies(prices: pd.Series, n_strategies: int, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    rows = []
    for strategy_id in range(n_strategies):
        signal = pd.Series(rng.integers(0, 2, len(prices)), index=prices.index)
        rows.append(run_backtest(prices, signal).metrics | {"strategy_id": strategy_id})
    return pd.DataFrame(rows)`,
  chart: "parameter-scan",
  chartNote: "随机策略云图强调：最好看的历史曲线不一定代表真实规律。",
  mistakes: ["只展示随机策略中最好的一条", "把多次尝试当成一次实验", "不记录尝试次数"],
  checkpoint: ["能模拟随机策略", "知道多重测试风险", "能识别挑截图问题"],
  skillLine: "validation",
  quizQuestion: "为什么随机策略也可能有历史赢家？",
  correctLabel: "尝试次数多会产生偶然好结果",
  wrongLabels: ["随机信号知道未来", "随机策略没有风险"],
  quizExplanation: "多重测试会让偶然表现好的结果出现概率上升。",
  codexFunction: "simulate_random_strategies",
  targetFile: "python/src/quant_learning/experiments.py",
  testFile: "python/tests/test_experiments.py",
});
