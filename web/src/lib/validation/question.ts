import { z } from "zod";

export const createQuestionSchema = z.object({
  userId: z.string().min(1),
  projectId: z.string().min(1),
  type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
  question: z.string().min(1),
  context: z.string().optional(),
  options: z.array(z.string()).default([]),
  answerText: z.string().optional(),
  answerIndex: z.number().int().min(0).optional(),
  explanation: z.string().optional(),
  reference: z.string().optional(),
});

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
