import { z } from "zod";

export const editFlashcardSchema = z.object({
  question: z.string().min(1, "Pergunta é obrigatória"),
  answer: z.string().min(1, "Resposta é obrigatória"),
});

export const editQuestionSchema = z
  .object({
    question: z.string().min(1, "Pergunta é obrigatória"),
    type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"]),
    answerText: z.string().nullable().optional(),
    answerIndex: z.number().nullable().optional(),
    options: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === "TRUE_FALSE") {
        return data.answerText === "Verdadeiro" || data.answerText === "Falso";
      }
      if (data.type === "MULTIPLE_CHOICE") {
        return (
          data.options &&
          data.options.length >= 2 &&
          typeof data.answerIndex === "number" &&
          data.answerIndex >= 0 &&
          data.answerIndex < data.options.length &&
          data.answerText === data.options[data.answerIndex]
        );
      }
      if (data.type === "FREE_RESPONSE") {
        return data.answerText && data.answerText.length > 0;
      }
      return true;
    },
    {
      message: "Resposta inválida para o tipo de questão selecionado",
      path: ["root"],
    },
  );

export type EditFlashcardInput = z.infer<typeof editFlashcardSchema>;
export type EditQuestionInput = z.infer<typeof editQuestionSchema>;
