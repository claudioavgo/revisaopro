// "use client";

// import { useState } from "react";
// import { Question } from "@/generated/prisma";
// import { QuestionType, Difficulty } from "@/types/quiz.schema";
// import QuestionForm from "./question-form";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { generateQuizAction, getQuizStatusAction } from "@/services/ai.service";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { Loader2, MoreVertical, Edit } from "lucide-react";
// import { getProjectQuestions } from "../quiz/actions";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { EditQuestionModal } from "@/components/modals/edit-question-modal";
// import { updateQuestionAction } from "@/services/edit.service";
// import { EditQuestionInput } from "@/lib/validation/edit";

// interface QuestionsProps {
//   projectId: string;
// }

// function getQuestionType(type: QuestionType) {
//   switch (type) {
//     case "MULTIPLE_CHOICE": return "Múltipla escolha";
//     case "TRUE_FALSE": return "Verdadeiro ou falso";
//     default: return "Resposta livre";
//   }
// }

// function getQuestionDifficulty(difficulty: Difficulty) {
//   switch (difficulty) {
//     case "EASY": return "Fácil";
//     case "MEDIUM": return "Médio";
//     default: return "Difícil";
//   }
// }

// export default function Questions({ projectId }: QuestionsProps) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { data: questionsStatus, refetch: refetchStatus } = useQuery({
//     queryKey: ["quiz-status", projectId],
//     queryFn: () => getQuizStatusAction(projectId),
//     refetchInterval: (query) => {
//       const status = query.state.data?.status;
//       return status === "PROCESSING" ? 2000 : false;
//     },
//     enabled: !!projectId,
//   });

//   const { data: questions } = useQuery({
//     queryKey: ["questions", projectId],
//     queryFn: () => getProjectQuestions(projectId),
//     enabled: questionsStatus?.status === "COMPLETED",
//   });

//   const handleCreateQuestion = async (
//     types: QuestionType[],
//     difficulty: Difficulty[]
//   ) => {
//     setIsSubmitting(true);
//     try {
//       await generateQuizAction(projectId, {
//         difficulty,
//         types,
//         questions: 25,
//       });
//       // Force refresh status immediately
//       await refetchStatus();
//     } catch (error) {
//       console.error('Error generating questions:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isGenerating = questionsStatus?.status === "PROCESSING" || isSubmitting;
//   const hasQuestions = questions && questions.length > 0;
//   const showForm = questionsStatus?.status === "PENDING" || (!questionsStatus?.status && !hasQuestions);

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex items-center gap-2">
//         <Badge variant="3d-purple">Questões</Badge>
//         <Badge variant="3d-orange">{questions?.length ?? 0} questões</Badge>
//         {hasQuestions && !isGenerating && (
//           <Button
//             variant="flat"
//             onClick={() => router.push(`/dashboard/projects/${projectId}/quiz`)}
//             className="ml-auto"
//           >
//             Iniciar Quiz
//           </Button>
//         )}
//       </CardHeader>

//       <CardContent>
//         {isGenerating && (
//           <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
//             <Loader2 className="animate-spin" size={20} />
//             <span>Gerando questões...</span>
//           </div>
//         )}
//         {showForm && (
//           <QuestionForm
//             onSubmit={handleCreateQuestion}
//             isLoading={isGenerating}
//             disabled={isGenerating}
//           />
//         )}
//         {hasQuestions && questionsStatus?.status === "COMPLETED" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {questions.map((question, index) => (
//               <QuestionCard key={question.id} question={question} index={index} projectId={projectId} />
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// function QuestionCard({ question, index, projectId }: { question: Question, index: number, projectId: string }) {
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const handleEdit = async (data: EditQuestionInput) => {
//     await updateQuestionAction(question.id, data);
//     queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
//   };

//   return (
//     <>
//       <Card className="w-full flex flex-col justify-between relative group">
//         <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
//               >
//                 <MoreVertical className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
//                 <Edit className="mr-2 h-4 w-4" />
//                 Editar
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         <CardHeader className="flex items-center">
//           <h3 className="text-sm font-semibold text-muted-foreground">Questão {index + 1}.</h3>
//         </CardHeader>
//         <CardContent>
//           <p className="font-semibold">{question.question}</p>
//         </CardContent>
//         <CardFooter className="flex items-center gap-2">
//           <Badge variant="secondary">{getQuestionType(question.type)}</Badge>
//           <Badge variant="secondary">{getQuestionDifficulty(question.difficulty)}</Badge>
//         </CardFooter>
//       </Card>

//       <EditQuestionModal
//         key={`question-${question.id}-${question.question}-${question.answerIndex}-${question.answerText}`}
//         question={question}
//         open={editModalOpen}
//         onOpenChange={setEditModalOpen}
//         onSave={handleEdit}
//       />
//     </>
//   );
// }