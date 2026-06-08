import { courseModules } from "./courses";

const projectCommands: Record<string, string[]> = {
  m0: ["cd python", "uv run pytest tests/test_metrics.py"],
  m1: ["cd python", "uv run python examples/run_buy_and_hold.py"],
  m2: ["cd python", "uv run pytest tests/test_metrics.py"],
  m3: ["cd python", "uv run pytest tests/test_metrics.py"],
  m4: ["cd python", "uv run pytest tests/test_positions.py tests/test_costs.py"],
  m5: ["cd python", "uv run python examples/run_buy_and_hold.py"],
  m6: ["cd python", "uv run python examples/run_moving_average.py"],
  m7: ["cd python", "uv run pytest tests/test_portfolio.py", "uv run python examples/run_equal_weight_portfolio.py"],
  m8: ["cd python", "uv run python examples/run_parameter_scan.py"],
  m9: ["cd python", "uv run python examples/generate_capstone_template.py"],
};

const projectDetails: Record<
  string,
  {
    question: string;
    deliverablePath: string;
    capstoneMaterial: string;
    reflection: string;
  }
> = {
  m0: {
    question: "如何把学习边界、非投资建议声明和第一条 Codex 工单写清楚？",
    deliverablePath: "learning-notes.md, python/tests/test_metrics.py",
    capstoneMaterial: "报告开头的项目目的、学习边界和非投资建议声明。",
    reflection: "如果 Codex 生成了看起来像投资建议的措辞，你会怎样改写？",
  },
  m1: {
    question: "如何判断一份美股 OHLCV 数据已经足够干净，可以进入后续收益和回测计算？",
    deliverablePath: "reports/sample_prices_quality_report.json",
    capstoneMaterial: "数据来源、日期范围、复权列选择和数据质量检查。",
    reflection: "如果数据里有缺失日期或重复日期，直接回测会带来什么误导？",
  },
  m2: {
    question: "如何从价格序列得到收益率、复利净值和年化收益，并解释短样本年化的风险？",
    deliverablePath: "reports/returns_equity_summary.json",
    capstoneMaterial: "策略和基准的收益路径、净值曲线和年化收益说明。",
    reflection: "为什么最终价格上涨不代表这段路径容易持有？",
  },
  m3: {
    question: "如何用一组指标评价收益路径，而不是只看最终收益？",
    deliverablePath: "reports/performance_metrics_summary.json",
    capstoneMaterial: "绩效指标表、回撤解释和指标局限说明。",
    reflection: "哪个指标最容易被误用？你会在报告里怎样提醒读者？",
  },
  m4: {
    question: "同一组 signal 在不同 lag 和成本假设下，净值为什么会明显不同？",
    deliverablePath: "reports/position_cost_bias_comparison.json",
    capstoneMaterial: "signal 到 position 的滞后规则、交易成本假设和偏差检查。",
    reflection: "如果当天收盘信号当天成交，回测最可能被怎样美化？",
  },
  m5: {
    question: "如何把价格、信号、仓位、成本、净值和指标串成一份可复查的回测报告？",
    deliverablePath: "reports/buy_and_hold_report.md",
    capstoneMaterial: "buy and hold 或 SPY benchmark 的基准报告。",
    reflection: "为什么一份好报告必须保存过程数据，而不是只保存最终收益？",
  },
  m6: {
    question: "如何公平比较双均线、动量、均值回归和 buy and hold？",
    deliverablePath: "reports/strategy_comparison_report.md",
    capstoneMaterial: "策略假设、策略对比、成本影响和失效场景。",
    reflection: "如果某个策略在样例数据里最好，你还需要检查哪些条件？",
  },
  m7: {
    question: "如何从单资产回测扩展到多股票组合，并判断分散化是否真的改善了风险？",
    deliverablePath: "reports/portfolio_comparison_report.md",
    capstoneMaterial: "多资产对齐、权重、再平衡和 benchmark 对照。",
    reflection: "为什么买很多股票不一定等于真正分散化？",
  },
  m8: {
    question: "历史最优参数在样本外还能保持表现吗？如果不能，应该如何解释？",
    deliverablePath: "reports/parameter_scan_oos_report.md",
    capstoneMaterial: "参数扫描、样本内 / 样本外验证、过拟合和多重测试说明。",
    reflection: "如果只展示参数扫描中最漂亮的一格，会隐藏什么风险？",
  },
  m9: {
    question: "如何把所有模块产物整理成一份严谨、可复查、不夸大结论的最终报告？",
    deliverablePath: "reports/final_research_report.md",
    capstoneMaterial: "完整 Capstone 报告和下一步学习路线。",
    reflection: "报告结论里哪些句子会让读者误以为这是投资建议？",
  },
};

function buildPrompt(moduleId: string, moduleTitle: string, title: string, deliverable: string, commands: string[]) {
  const details = projectDetails[moduleId];
  return `你正在完成 learn-quant-with-codex 的 ${moduleTitle} Mini Project：${title}。

背景：
- 这是美股量化入门学习项目，不提供投资建议，不联网，不做实盘交易。
- 本项目要回答的问题：${details.question}

任务：
- 生成或更新交付物：${details.deliverablePath}
- 交付物需要覆盖：${deliverable}
- 把本模块课程中的 Python 函数、测试和报告说明串起来。

约束：
- 使用本地样例数据。
- 保持 signal、position、returns 和 equity curve 的索引对齐。
- 默认避免 look-ahead bias。
- 策略只能作为学习案例，不能写成收益承诺。

验收：
- 运行以下命令：
${commands.map((command) => `  ${command}`).join("\n")}
- 对每个验收项给出一条检查结果。
- 写出至少一个本项目可能被误用的地方。

请先说明计划，再修改代码或报告，最后总结 ${details.capstoneMaterial}`;
}

export const miniProjects = courseModules.map((module, index) => ({
  id: `project-${index}`,
  moduleId: module.id,
  moduleTitle: module.title,
  title: module.miniProject.title,
  deliverable: module.miniProject.deliverable,
  checks: module.miniProject.checks,
  commands: projectCommands[module.id] ?? ["cd python", "uv run pytest"],
  question: projectDetails[module.id].question,
  deliverablePath: projectDetails[module.id].deliverablePath,
  capstoneMaterial: projectDetails[module.id].capstoneMaterial,
  reflection: projectDetails[module.id].reflection,
  codexPrompt: buildPrompt(
    module.id,
    module.title,
    module.miniProject.title,
    module.miniProject.deliverable,
    projectCommands[module.id] ?? ["cd python", "uv run pytest"],
  ),
  lessons: module.lessons,
}));
