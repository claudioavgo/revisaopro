// "use client";

// import { Question } from "@/generated/prisma";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { X } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

// interface QuizViewProps {
//   questions: Question[];
//   onClose: () => void;
// }

// export default function QuizView({ questions, onClose }: QuizViewProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const currentQuestion = questions[currentIndex];

//   const handleNext = () => {
//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//       setAnswer("");
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(prev => prev - 1);
//       setAnswer("");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-background/95 flex items-center justify-center p-4">
//       <Card className="w-full max-w-2xl relative">
//         <CardHeader>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute left-4 top-4"
//             onClick={onClose}
//           >
//             <X className="h-4 w-4" />
//           </Button>
//           <div className="bg-muted/30 p-4 rounded-lg mt-8">
//             <h2 className="text-lg mb-2">Questão {currentIndex + 1} de {questions.length}</h2>
//             <p className="text-lg font-medium">{currentQuestion.question}</p>
//           </div>
//         </CardHeader>

//         <CardContent>
//           {(() => {
//             switch (currentQuestion.type) {
//               case "TRUE_FALSE":
//                 return (
//                   <div className="flex flex-col gap-2">
//                     <Button
//                       variant="outline"
//                       className="w-full py-6 text-lg"
//                       onClick={() => setAnswer("Verdadeiro")}
//                       data-selected={answer === "Verdadeiro"}
//                     >
//                       Verdadeiro
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="w-full py-6 text-lg"
//                       onClick={() => setAnswer("Falso")}
//                       data-selected={answer === "Falso"}
//                     >
//                       Falso
//                     </Button>
//                   </div>
//                 );

//               case "MULTIPLE_CHOICE":
//                 return (
//                   <div className="flex flex-col gap-2">
//                     {currentQuestion.options.map((option) => (
//                       <Button
//                         key={option}
//                         variant="outline"
//                         className="w-full py-6 text-lg"
//                         onClick={() => setAnswer(option)}
//                         data-selected={answer === option}
//                       >
//                         {option}
//                       </Button>
//                     ))}
//                   </div>
//                 );

//               default:
//                 return (
//                   <Textarea
//                     placeholder="Digite sua resposta aqui..."
//                     className="min-h-[150px] text-lg"
//                     value={answer}
//                     onChange={(e) => setAnswer(e.target.value)}
//                   />
//                 );
//             }
//           })()}
//         </CardContent>

//         <CardFooter className="flex justify-between gap-4">
//           <Button
//             variant="outline"
//             size="lg"
//             className="w-full"
//             onClick={handlePrevious}
//             disabled={currentIndex === 0}
//           >
//             ← Voltar
//           </Button>
//           <Button
//             variant="outline"
//             size="lg"
//             className="w-full"
//             onClick={handleNext}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Pular →
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
