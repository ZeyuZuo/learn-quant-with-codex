import type { CourseModule } from "@/lib/types";

export type CourseModuleMeta = Omit<CourseModule, "lessons" | "skillLines">;

export const modulesMeta: CourseModuleMeta[] = [
  {
    id: "m0",
    title: "Module 0: 学习方式和项目边界",
    summary: "先理解课程边界，再学会让 Codex 带着验收标准写代码。",
    product: "学习计划、风险声明、第一个收益率函数",
    miniProject: {
      title: "学习边界和第一条 Codex 工单",
      deliverable: "生成 learning-notes.md，记录项目边界、第一条 Prompt 和第一个已测试函数。",
      checks: ["说明非投资建议边界", "写出 Explain -> Implement -> Test -> Reflect 流程", "至少包含一个 pytest 结果"],
    },
    gate: {
      entry: "能打开项目并理解这是教育用途的学习站。",
      exit: "写下非投资建议边界，完成第一条带验收的 Codex Prompt。",
      nextUse: "Module 1 会沿用这个 Prompt 格式来读取和检查本地样例数据。",
    },
  },
  {
    id: "m1",
    title: "Module 1: 美股数据入门",
    summary: "读懂 ticker、交易日、OHLCV、复权价格和数据质量。",
    product: "数据读取函数和质量报告",
    miniProject: {
      title: "样例价格数据质量报告",
      deliverable: "生成 sample_prices_quality_report.json，并在报告里解释 close 与 adj_close 的选择。",
      checks: ["检查 OHLCV 必要列", "报告缺失值和重复日期", "说明复权价格用途"],
    },
    gate: {
      entry: "已经知道项目不联网、不连接账户，只使用本地样例数据。",
      exit: "生成数据质量报告，能解释 OHLCV、交易日缺口和复权列选择。",
      nextUse: "Module 2 会把这条可信价格序列转换成收益率和净值曲线。",
    },
  },
  {
    id: "m2",
    title: "Module 2: 收益和净值",
    summary: "从价格序列得到收益率、复利、年化收益和净值曲线。",
    product: "收益率和净值曲线函数",
    miniProject: {
      title: "价格到净值曲线",
      deliverable: "从样例价格生成日收益率、总收益和净值曲线数据。",
      checks: ["首日收益处理清楚", "复利用累乘而不是累加", "解释短样本年化风险"],
    },
    gate: {
      entry: "已经有经过基础检查的价格序列和复权列选择。",
      exit: "实现收益率、复利、年化和净值函数，并能手算一个小例子。",
      nextUse: "Module 3 会用收益路径计算波动、回撤、夏普和交易级指标。",
    },
  },
  {
    id: "m3",
    title: "Module 3: 风险和绩效指标",
    summary: "用回撤、夏普、胜率和盈亏比评价策略表现。",
    product: "风险指标计算模块和绩效摘要表",
    miniProject: {
      title: "绩效指标卡片",
      deliverable: "为 buy and hold 样例生成收益、波动率、最大回撤、夏普、胜率和盈亏比摘要。",
      checks: ["最大回撤从净值曲线计算", "零波动夏普有明确行为", "指出至少 3 个指标盲点"],
    },
    gate: {
      entry: "已经能从价格得到收益率和净值曲线。",
      exit: "生成绩效指标表，能指出最终收益、夏普和胜率的局限。",
      nextUse: "Module 4 会把这些指标连接到 signal、position、成本和偏差诊断。",
    },
  },
  {
    id: "m4",
    title: "Module 4: 信号、仓位和成本",
    summary: "把策略想法转换成现实一点的持仓和成本模型。",
    product: "position 和 transaction cost 模块",
    miniProject: {
      title: "信号、仓位和成本对比",
      deliverable: "比较同一信号在无成本、有成本、错误 shift、正确 shift 下的净值差异。",
      checks: ["position 默认滞后一日", "成本用 bps 表示", "解释 look-ahead bias"],
    },
    gate: {
      entry: "已经能读懂收益、回撤和指标表。",
      exit: "实现 signal -> position、turnover、cost，并能识别 look-ahead 示例。",
      nextUse: "Module 5 会把这些执行假设固化到统一回测器里。",
    },
  },
  {
    id: "m5",
    title: "Module 5: 第一套回测系统",
    summary: "把数据、信号、仓位、成本、净值和指标串成回测器。",
    product: "BacktestResult 和报告",
    miniProject: {
      title: "Buy and Hold 回测报告",
      deliverable: "运行 SPY 样例 buy and hold 回测，输出 JSON 或 Markdown 报告。",
      checks: ["保存 BacktestResult 过程数据", "报告包含成本配置", "报告包含非投资建议声明"],
    },
    gate: {
      entry: "已经有数据、收益、指标、仓位和成本函数。",
      exit: "运行 buy and hold 回测，产出含回撤、指标和风险声明的报告。",
      nextUse: "Module 6 会用同一回测器公平比较多个策略信号。",
    },
  },
  {
    id: "m6",
    title: "Module 6: 入门策略模式",
    summary: "用同一套回测器比较双均线、动量和均值回归。",
    product: "可测试的策略函数库和策略对比实验",
    miniProject: {
      title: "三类入门策略对比",
      deliverable: "在同一资产上比较 buy and hold、双均线、动量和均值回归。",
      checks: ["策略函数只生成 signal", "使用同一回测配置", "写出每个策略的假设和失效场景"],
    },
    gate: {
      entry: "已经有统一回测器和 buy and hold 基准报告。",
      exit: "用同一数据、lag、成本和指标公平比较三类策略。",
      nextUse: "Module 7 会把单资产策略比较扩展到多资产组合和 benchmark。",
    },
  },
  {
    id: "m7",
    title: "Module 7: 多股票组合",
    summary: "理解组合收益、权重、再平衡和 benchmark。",
    product: "等权组合和轮动组合实验",
    miniProject: {
      title: "组合和 SPY 基准比较",
      deliverable: "比较单股票、等权组合、动量轮动组合和 SPY benchmark。",
      checks: ["多资产日期已对齐", "组合收益按权重计算", "分散化结论有指标支持"],
    },
    gate: {
      entry: "已经会做单资产策略对比和基准比较。",
      exit: "对齐多资产数据，生成等权或轮动组合报告。",
      nextUse: "Module 8 会检查策略和组合参数在样本外是否还能迁移。",
    },
  },
  {
    id: "m8",
    title: "Module 8: 参数实验和验证",
    summary: "用参数扫描、样本外验证和随机策略识别过拟合风险。",
    product: "参数扫描和样本外报告",
    miniProject: {
      title: "参数扫描和样本外验证",
      deliverable: "扫描双均线参数，选择样本内最优参数，并展示样本外表现。",
      checks: ["跳过非法参数组合", "按日期切分样本", "说明历史最优不代表未来"],
    },
    gate: {
      entry: "已经有策略和组合实验结果。",
      exit: "展示参数扫描、样本内 / 外、随机策略或年度稳定性诊断。",
      nextUse: "Module 9 会把验证材料写入最终 Capstone 报告的限制和偏差章节。",
    },
  },
  {
    id: "m9",
    title: "Module 9: 回测边界和 Capstone",
    summary: "理解回测不能代表未来，并完成最终学习报告。",
    product: "包含数据、策略、验证和风险声明的完整研究报告",
    miniProject: {
      title: "Capstone 最终研究报告",
      deliverable: "提交 final_research_report.md，包含数据、策略、指标、成本、参数、样本外、偏差和风险声明。",
      checks: ["至少 5 条限制或风险", "包含 benchmark", "不包含投资建议或收益承诺"],
    },
    gate: {
      entry: "已经完成数据、指标、策略、组合和验证模块材料。",
      exit: "交付完整 Capstone 报告，并通过 Python 报告验证函数。",
      nextUse: "后续学习可以进入因子研究、事件驱动回测或组合优化，但继续保留验证和风险边界。",
    },
  },
];
