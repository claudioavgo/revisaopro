import { z } from "zod";

export const createFlashcardSchema = z.object({
  userId: z.string().min(1),
  projectId: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  position: z.number().int().min(0).optional(),
});

export type CreateFlashcardInput = z.infer<typeof createFlashcardSchema>;
