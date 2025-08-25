import { z } from "zod";

export const DifficultyZ = z.enum(["EASY", "MEDIUM", "HARD"]);
export type Difficulty = z.infer<typeof DifficultyZ>;

export const QuestionTypeZ = z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"]);
export type QuestionType = z.infer<typeof QuestionTypeZ>;

export const QuestionZ = z.object({
  type: QuestionTypeZ,
  difficulty: DifficultyZ,
  question: z.string().min(1),
  case: z.string().nullable().optional(),
  options: z.array(z.string()).default([]),
  answer: z.string().min(1),
  explanation: z.string().nullable().optional(),
  reference: z.string().nullable().optional(),
});

export const QuizZ = z.object({
  questions: z.array(QuestionZ),
});

export type Question = z.infer<typeof QuestionZ>;
export type Quiz = z.infer<typeof QuizZ>;
