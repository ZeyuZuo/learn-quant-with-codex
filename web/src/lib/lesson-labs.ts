import type { Lesson } from "./types";

export type RelatedLab = {
  href: string;
  title: string;
  reason: string;
};

const lessonLabMap: Record<string, RelatedLab[]> = {
  returns: [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "观察价格、收益率和净值如何联动。",
    },
  ],
  "compound-equity": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "用净值曲线理解复利路径。",
    },
  ],
  "annualized-return": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "调节样本长度，观察短样本年化为什么容易误导。",
    },
  ],
  "returns-summary": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "把价格、收益和净值放在同一组图表里看。",
    },
  ],
  volatility: [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "调节波动率，观察指标如何变化。",
    },
  ],
  "max-drawdown": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "对照净值和回撤曲线，找出最难持有的区间。",
    },
  ],
  "sharpe-ratio": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "同时观察收益、波动和夏普，而不是只看一个数字。",
    },
  ],
  "win-rate-profit-loss": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "把胜率和盈亏幅度放回完整指标表里解释。",
    },
  ],
  "read-metrics-table": [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "练习把多项指标组合成问题，而不是结论。",
    },
  ],
  "signal-position": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "观察 signal、position 和收益路径的区别。",
    },
  ],
  "transaction-costs": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "比较无成本、有成本和错误 shift 的曲线。",
    },
  ],
  "position-sizing": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "把仓位暴露和策略收益路径连起来观察。",
    },
  ],
  "wrong-backtest-demo": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "用错误 shift 曲线识别 look-ahead bias。",
    },
  ],
  "buy-and-hold": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "把 buy and hold 当作基准和其他策略比较。",
    },
  ],
  "minimal-backtester": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "用同一回测器比较不同信号和成本假设。",
    },
  ],
  "backtest-result-object": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "观察为什么结果对象需要保存净值和回撤路径。",
    },
  ],
  "backtest-report": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "把图表观察转成可复查报告。",
    },
  ],
  "moving-average-crossover": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "对照快慢均线、signal 和策略净值。",
    },
  ],
  "momentum-strategy": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "比较动量策略和其他学习案例。",
    },
  ],
  "mean-reversion-strategy": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "比较均值回归策略和其他学习案例。",
    },
  ],
  "strategy-parameters": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "观察参数变化如何改变历史指标。",
    },
  ],
  "strategy-comparison": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "用同一数据、成本和 lag 规则公平比较策略。",
    },
  ],
  "portfolio-vs-benchmark": [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "把组合路径和 benchmark 放在同一图表里看。",
    },
  ],
  "parameter-scan": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "观察参数扫描结果和非法组合过滤。",
    },
  ],
  "in-sample-out-of-sample": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "比较样本内和样本外结果是否迁移。",
    },
  ],
  "best-parameter-transfer": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "检查历史最优参数到了样本外是否稳定。",
    },
  ],
  "random-strategy-winners": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "理解多重测试为什么会挑出随机赢家。",
    },
  ],
  "yearly-performance": [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "把参数稳定性和市场阶段变化一起看。",
    },
  ],
};

const moduleLabMap: Record<string, RelatedLab[]> = {
  m2: [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "本模块概念适合通过收益和净值图观察。",
    },
  ],
  m3: [
    {
      href: "/labs/metrics",
      title: "指标实验室",
      reason: "本模块指标适合通过交互图表比较。",
    },
  ],
  m4: [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "本模块重点是 signal、position、cost 和 bias。",
    },
  ],
  m5: [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "本模块回测器可以在策略实验中观察。",
    },
  ],
  m6: [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "本模块策略适合通过同一图表公平比较。",
    },
  ],
  m7: [
    {
      href: "/labs/strategies",
      title: "策略实验室",
      reason: "本模块组合路径可以和策略对比一起观察。",
    },
  ],
  m8: [
    {
      href: "/labs/parameter-scan",
      title: "参数实验室",
      reason: "本模块核心是参数扫描和样本外验证。",
    },
  ],
};

export function getRelatedLabs(lesson: Lesson): RelatedLab[] {
  return lessonLabMap[lesson.slug] ?? moduleLabMap[lesson.moduleId] ?? [];
}
