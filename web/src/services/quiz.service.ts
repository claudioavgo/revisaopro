// "use server";

// import { openai } from "@ai-sdk/openai";
// import { streamObject } from "ai";
// import { QUIZ_INSTRUCTION } from "@/config/prompts";
// import { Difficulty, QuestionType, QuestionZ } from "@/types/quiz.schema";
// import { prisma } from "@/lib/prisma";

// type QuizConfig = {
//   questions?: number;
//   difficulty?: Difficulty[];
//   types?: QuestionType[];
// };

// export async function generateQuizFromContent(
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
//     select: {
//       id: true,
//       rawText: true,
//     },
//   });

//   if (!project) {
//     throw new Error("Projeto não encontrado");
//   }

//   if (!project.rawText) {
//     throw new Error("O projeto não tem conteúdo para gerar questões");
//   }

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

//   const { elementStream } = streamObject({
//     model: openai("gpt-4o"),
//     output: "array",
//     schema: QuestionZ,
//     messages: [
//       { role: "system", content: QUIZ_INSTRUCTION },
//       { role: "user", content: userMessage },
//     ],
//     temperature: 0.3,
//   });

//   const questions = [];

//   for await (const el of elementStream) {
//     await prisma.question.create({
//       data: {
//         projectId,
//         userId,
//         type: el.type,
//         difficulty: el.difficulty,
//         question: el.question,
//         options: el.options,
//         answerText: el.answer,
//         explanation: el.explanation,
//         reference: el.reference,
//       },
//     });

//     console.log(el);

//     questions.push(el);
//   }

//   if (!questions || questions.length === 0) {
//     throw new Error("Não foi possível gerar questões válidas");
//   }
// }
