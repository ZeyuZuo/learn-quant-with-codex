import type { SkillLine, SkillLineId } from "@/lib/types";

export const skillLines: SkillLine[] = [
  {
    id: "data-review",
    title: "数据审查",
    shortTitle: "数据",
    description: "检查 ticker、交易日、OHLCV、复权列、缺失和选择偏差，让后续指标有可信输入。",
    capstoneEvidence: "报告说明数据范围、复权列选择、缺失值、异常值和样本选择限制。",
  },
  {
    id: "return-path",
    title: "收益路径",
    shortTitle: "收益",
    description: "把价格转换为收益率、复利净值、年化收益和回撤路径，不只看最终数字。",
    capstoneEvidence: "报告展示价格、日收益、净值和回撤，并解释路径风险。",
  },
  {
    id: "risk-reading",
    title: "风险解释",
    shortTitle: "风险",
    description: "读懂波动、最大回撤、夏普、胜率和盈亏比，并知道每个指标会怎样误导。",
    capstoneEvidence: "报告给出绩效指标表，并写出至少 3 个指标局限。",
  },
  {
    id: "execution-assumptions",
    title: "执行假设",
    shortTitle: "执行",
    description: "区分 signal、position、lag、turnover、commission 和 slippage，避免把想法直接当收益。",
    capstoneEvidence: "报告说明仓位滞后、成本假设、换手和向量化回测简化边界。",
  },
  {
    id: "validation",
    title: "验证能力",
    shortTitle: "验证",
    description: "用错误回测、参数扫描、样本外和随机策略识别过拟合与数据窥探。",
    capstoneEvidence: "报告包含参数扫描、样本内 / 样本外和偏差检查。",
  },
  {
    id: "research-writing",
    title: "研究表达",
    shortTitle: "报告",
    description: "把代码、图表、测试和限制写成可复查的学习报告，避免收益承诺式表述。",
    capstoneEvidence: "报告语言明确教育用途、非投资建议和历史结果不代表未来。",
  },
];

export const moduleSkillLines: Record<string, SkillLineId[]> = {
  m0: ["research-writing", "return-path"],
  m1: ["data-review"],
  m2: ["return-path"],
  m3: ["risk-reading"],
  m4: ["execution-assumptions", "validation"],
  m5: ["return-path", "execution-assumptions", "research-writing"],
  m6: ["execution-assumptions", "validation"],
  m7: ["data-review", "risk-reading"],
  m8: ["validation"],
  m9: ["research-writing", "validation"],
};
