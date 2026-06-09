export type ChartKind =
  | "learning-path"
  | "price"
  | "ohlcv"
  | "adjusted-close"
  | "data-quality"
  | "returns"
  | "equity"
  | "annualized"
  | "volatility"
  | "drawdown"
  | "metrics"
  | "position"
  | "costs"
  | "backtest"
  | "moving-average"
  | "strategy-comparison"
  | "portfolio"
  | "parameter-scan"
  | "out-of-sample"
  | "bias";

export type QuizOption = {
  label: string;
  value: string;
};

export type Quiz = {
  question: string;
  options: QuizOption[];
  correctValue: string;
  explanation: string;
};

export type SkillLineId = "data-review" | "return-path" | "risk-reading" | "execution-assumptions" | "validation" | "research-writing";

export type SkillLine = {
  id: SkillLineId;
  title: string;
  shortTitle: string;
  description: string;
  capstoneEvidence: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  order: number;
  slug: string;
  title: string;
  subtitle: string;
  difficulty: "入门" | "基础" | "进阶";
  duration: string;
  pythonModule: string;
  objectives: string[];
  concepts: string[];
  intuition: string;
  formula?: string;
  handExample: string;
  pythonCode: string;
  chart: ChartKind;
  chartNote: string;
  mistakes: string[];
  quiz: Quiz;
  codexTask: string;
  checkpoint: string[];
  skillLine: SkillLineId;
};

export type CourseModule = {
  id: string;
  title: string;
  summary: string;
  product: string;
  miniProject: {
    title: string;
    deliverable: string;
    checks: string[];
  };
  gate: {
    entry: string;
    exit: string;
    nextUse: string;
  };
  skillLines: SkillLineId[];
  lessons: Lesson[];
};
