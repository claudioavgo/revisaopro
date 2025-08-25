import { z } from "zod";

export const createProjectSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(["FILE", "LINK", "PROMPT"]),
  title: z.string().min(1).optional(),
  language: z.string().min(2).optional(),
  summary: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  parsedUrl: z.string().url().optional(),
  uploadId: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
