// "use server";

// import { generateObject } from "ai";
// import { openai } from "@ai-sdk/openai";
// import { z } from "zod";
// import {
//   QUIZ_INSTRUCTION,
//   SYSTEM_FLASHCARDS_INSTRUCTION,
//   SYSTEM_SUMMARY_INSTRUCTION,
// } from "@/config/prompts";
// import { prisma } from "@/lib/prisma";
// import { Difficulty, QuestionType, QuizZ } from "@/types/quiz.schema";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const flashcardItemSchema = z.object({
//   question: z.string(),
//   answer: z.string(),
// });

// function createFlashcardSchema(count: number) {
//   return z.object({
//     flashcards: z.array(flashcardItemSchema).length(count).describe(`Exactly ${count} flashcards`),
//   });
// }

// export async function generateFlashcards({
//   userId,
//   projectId,
//   count = 25,
// }: {
//   userId: string;
//   projectId: string;
//   count?: number;
// }) {
//   const project = await prisma.project.findUnique({
//     where: { id: projectId },
//   });

//   if (!project) {
//     return {
//       success: false,
//       message: "Project not found",
//     };
//   }

//   if (project.flashcardsStatus === "COMPLETED") {
//     return {
//       success: true,
//       message: "Flashcards already generated",
//     };
//   }

//   await prisma.project.update({
//     where: { id: projectId },
//     data: { flashcardsStatus: "PROCESSING" },
//   });

//   const { object } = await generateObject({
//     model: openai("gpt-4o"),
//     schema: createFlashcardSchema(count),
//     messages: [
//       { role: "system", content: SYSTEM_FLASHCARDS_INSTRUCTION },
//       {
//         role: "user",
//         content: `IMPORTANTE: Gere EXATAMENTE ${count} flashcards. Conte cuidadosamente.

// Conteúdo:
// ${JSON.stringify(project.rawText)}

// Lembre-se: Preciso de EXATAMENTE ${count} flashcards no array. Nem mais, nem menos.`,
//       },
//     ],
//     temperature: 0.1,
//   });

//   await Promise.all(
//     object.flashcards.map(async (flashcard) => {
//       await prisma.flashcard.create({
//         data: {
//           projectId,
//           userId,
//           question: flashcard.question,
//           answer: flashcard.answer,
//         },
//       });
//     }),
//   );

//   await prisma.project.update({
//     where: { id: projectId },
//     data: { flashcardsStatus: "COMPLETED" },
//   });

//   return {
//     success: true,
//     message: "Flashcards generated successfully",
//   };
// }

// type QuizConfig = {
//   questions?: number;
//   difficulty?: Difficulty[];
//   types?: QuestionType[];
// };

// export async function generateQuiz(
//   userId: string,
//   projectId: string,
//   cfg: QuizConfig = {
//     questions: 25,
//     difficulty: ["MEDIUM"],
//     types: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"],
//   },
// ) {
//   const project = await prisma.project.findUnique({
//     where: { id: projectId },
//     include: { questionsConfig: true },
//   });

//   if (!project) {
//     throw new Error("Projeto não encontrado");
//   }

//   if (!project.rawText) {
//     throw new Error("O projeto não tem conteúdo para gerar questões");
//   }

//   if (project.questionsConfig?.status === "COMPLETED") {
//     return {
//       success: true,
//       message: "Questions already generated",
//     };
//   }

//   await prisma.questionsConfig.create({
//     data: {
//       projectId,
//       status: "PROCESSING",
//       difficulty: cfg.difficulty,
//       type: cfg.types,
//     },
//   });

//   const totalQuestions = cfg.questions ?? 15;
//   const rawTextToString = JSON.stringify(project.rawText);

//   const userMessage = [
//     `Conteúdo base:\n\n${rawTextToString}`,
//     `\n\nGere um objeto JSON com a seguinte estrutura:`,
//     `{`,
//     `  "questions": [`,
//     `    {`,
//     `      "type": "MULTIPLE_CHOICE | TRUE_FALSE | FREE_RESPONSE",`,
//     `      "difficulty": "EASY | MEDIUM | HARD",`,
//     `      "question": "Texto da pergunta",`,
//     `      "answer": "Resposta correta",`,
//     `      "options": ["array", "de", "opções"],`,
//     `      "case": null,`,
//     `      "explanation": null,`,
//     `      "reference": null`,
//     `    }`,
//     `  ]`,
//     `}`,
//     `\n\nRegras:`,
//     `1. Gere exatamente ${totalQuestions} questões`,
//     `2. Use apenas os tipos: ${JSON.stringify(cfg.types ?? ["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"])}`,
//     `3. Use apenas as dificuldades: ${JSON.stringify(cfg.difficulty ?? ["MEDIUM"])}`,
//     `4. Campos question e answer são obrigatórios e não podem ser vazios`,
//     `5. Campos case, explanation e reference são opcionais e podem ser null`,
//     `6. Para MULTIPLE_CHOICE, inclua ao menos 3 opções no array options`,
//     `7. Para TRUE_FALSE, a resposta deve ser "Verdadeiro" ou "Falso"`,
//     `\n\nIMPORTANTE: Retorne APENAS o objeto JSON, sem explicações ou texto adicional.`,
//   ].join("\n");

//   const { object } = await generateObject({
//     model: openai("gpt-4o"),
//     schema: QuizZ,
//     messages: [
//       { role: "system", content: QUIZ_INSTRUCTION },
//       { role: "user", content: userMessage },
//     ],
//     temperature: 0.3,
//   });

//   await Promise.all(
//     object.questions.map(async (question) => {
//       await prisma.question.create({
//         data: {
//           type: question.type,
//           difficulty: question.difficulty,
//           question: question.question,
//           answerText: question.answer,
//           options: question.options,
//           explanation: question.explanation,
//           reference: question.reference,
//           projectId,
//           userId,
//         },
//       });
//     }),
//   );

//   await prisma.questionsConfig.update({
//     where: { projectId },
//     data: { status: "COMPLETED" },
//   });

//   return {
//     success: true,
//     message: "Questions generated successfully",
//   };
// }

// export async function getQuizStatusAction(projectId: string) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) {
//     throw new Error("Unauthorized");
//   }

//   const project = await prisma.project.findUnique({
//     where: { id: projectId },
//     include: { questionsConfig: true },
//   });

//   if (!project) {
//     throw new Error("Project not found");
//   }

//   return {
//     success: true,
//     status: project.questionsConfig?.status || "PENDING",
//     questionsCount: project.questionsCount,
//   };
// }

// export async function generateQuizAction(
//   projectId: string,
//   cfg: QuizConfig = {
//     questions: 25,
//     difficulty: ["MEDIUM"],
//     types: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FREE_RESPONSE"],
//   },
// ) {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user) {
//     throw new Error("Unauthorized");
//   }

//   return await generateQuiz(session.user.id, projectId, cfg);
// }

// export async function getQuizStatus(projectId: string) {
//   const project = await prisma.project.findUnique({
//     where: { id: projectId },
//     include: { questionsConfig: true },
//   });

//   if (!project) {
//     return {
//       success: false,
//       message: "Project not found",
//       status: null,
//     };
//   }

//   return {
//     success: true,
//     status: project.questionsConfig?.status || null,
//   };
// }

// export async function generateSummary({ projectId }: { projectId: string }) {
//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: projectId },
//     });

//     if (!project) {
//       console.error("Project not found");
//       return;
//     }

//     if (!project.rawText) {
//       console.error("No content to process");
//       return;
//     }

//     if (project.summaryStatus === "COMPLETED") {
//       console.log("Summary already generated");
//       return;
//     }

//     await prisma.project.update({
//       where: { id: projectId },
//       data: { summaryStatus: "PROCESSING" },
//     });

//     const rawText = JSON.stringify(project.rawText);

//     const res = await generateObject({
//       model: openai("gpt-4o-mini"),
//       messages: [
//         { role: "system", content: SYSTEM_SUMMARY_INSTRUCTION },
//         { role: "user", content: rawText },
//       ],
//       schema: z.object({
//         summary: z.string().describe("Generated summary of the content"),
//       }),
//     });

//     const full = res.object.summary;

//     await prisma.project.update({
//       where: { id: projectId },
//       data: {
//         summary: full,
//         summaryStatus: "COMPLETED",
//       },
//     });

//     console.log(`Summary generated successfully for project ${projectId}`);
//   } catch (err) {
//     console.error("Summary generation error:", err);

//     await prisma.project.update({
//       where: { id: projectId },
//       data: { summaryStatus: "FAILED" },
//     });
//   }
// }
