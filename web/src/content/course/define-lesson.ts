import type { Lesson, SkillLineId } from "@/lib/types";
import { moduleSkillLines } from "./skill-lines";

export type LessonContent = Omit<Lesson, "difficulty" | "duration" | "quiz" | "codexTask" | "skillLine"> & {
  difficulty?: Lesson["difficulty"];
  duration?: string;
  skillLine?: SkillLineId;
  quizQuestion: string;
  correctLabel: string;
  wrongLabels: [string, string];
  quizExplanation: string;
  codexFunction: string;
  targetFile: string;
  testFile: string;
};

function buildCodexTask(lesson: string, functionName: string, targetFile: string, testFile: string) {
  return `你正在实现 learn-quant-with-codex 的 ${lesson}。

背景：
- 当前课程讲到一个量化入门概念。
- 项目是教育用途，不提供投资建议，不联网，不做实盘交易。

任务：
- 在 ${targetFile} 中实现 ${functionName}。
- 保持输入和输出的索引对齐。
- 对空输入、缺失值或非法参数给出明确行为。

验收：
- 新增或更新 ${testFile}。
- 运行 uv run pytest。
- 用一个极小 DataFrame 或 Series 解释结果。

请先说明实现思路，再修改代码，最后总结这个函数可能被误用的地方。`;
}

export function defineLesson(input: LessonContent): Lesson {
  const {
    quizQuestion,
    correctLabel,
    wrongLabels,
    quizExplanation,
    codexFunction,
    targetFile,
    testFile,
    difficulty,
    duration,
    skillLine,
    ...lesson
  } = input;

  return {
    difficulty: difficulty ?? "基础",
    duration: duration ?? "15 分钟",
    ...lesson,
    skillLine: skillLine ?? moduleSkillLines[input.moduleId]?.[0] ?? "research-writing",
    quiz: {
      question: quizQuestion,
      options: [
        { label: correctLabel, value: "correct" },
        { label: wrongLabels[0], value: "wrong1" },
        { label: wrongLabels[1], value: "wrong2" },
      ],
      correctValue: "correct",
      explanation: quizExplanation,
    },
    codexTask: buildCodexTask(`${input.id} ${input.title}`, codexFunction, targetFile, testFile),
  };
}
