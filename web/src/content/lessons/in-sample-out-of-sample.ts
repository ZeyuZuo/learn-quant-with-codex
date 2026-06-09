import { defineLesson } from "../course/define-lesson";

export default defineLesson({
  id: "8.2",
  moduleId: "m8",
  order: 802,
  slug: "in-sample-out-of-sample",
  title: "样本内和样本外",
  subtitle: "先调参，再用未参与调参的历史区间做更严格验证。",
  pythonModule: "quant_learning.experiments",
  objectives: ["按日期切分数据", "区分 train/test", "避免随机打乱时间序列"],
  concepts: ["in-sample", "out-of-sample", "time series split"],
  intuition: "样本内像练习题，样本外像你还没看过的模拟考试。它仍然是历史，不是未来，但比只看练习题更严格。",
  formula: "train = data[index <= split_date], test = data[index > split_date]",
  handExample: "用 2020-2022 调参数，再用 2023 检查表现，比在 2020-2023 全部数据上调参更严谨。",
  pythonCode: `def train_test_split_time_series(data, split_date: str):
    split = pd.Timestamp(split_date)
    return data.loc[data.index <= split], data.loc[data.index > split]`,
  chart: "out-of-sample",
  chartNote: "图表把样本内和样本外结果放在一起，观察参数是否迁移。",
  mistakes: ["随机打乱时间序列", "全样本调参后宣称样本外有效", "样本外表现差就继续调样本外"],
  checkpoint: ["能按日期切分", "知道不能随机打乱", "能解释样本外的意义"],
  skillLine: "validation",
  quizQuestion: "时间序列样本切分为什么不应随机打乱？",
  correctLabel: "会破坏时间顺序",
  wrongLabels: ["会让图表变蓝", "会减少文件数量"],
  quizExplanation: "未来数据不能参与过去决策，时间顺序必须保留。",
  codexFunction: "train_test_split_time_series",
  targetFile: "python/src/quant_learning/experiments.py",
  testFile: "python/tests/test_experiments.py",
});
