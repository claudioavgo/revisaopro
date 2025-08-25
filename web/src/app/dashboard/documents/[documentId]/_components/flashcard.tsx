// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { MoreVertical } from "lucide-react";
// import { EditFlashcardModal } from "@/components/modals/edit-flashcard-modal";
// import { EditFlashcardInput } from "@/lib/validation/edit";
// import { useQueryClient } from "@tanstack/react-query";

// interface FlashcardProps {
//   front: string;
//   back: string;
//   flashcard?: FlashcardType;
//   projectId?: string;
// }

// export default function Flashcard({ front, back, flashcard, projectId }: FlashcardProps) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const handleEdit = async (data: EditFlashcardInput) => {
//     if (!flashcard) return;
//     await updateFlashcardAction(flashcard.id, data);
//     queryClient.invalidateQueries({ queryKey: ["flashcards", projectId] });
//   };

//   return (
//     <>
//       <div className="perspective-1000 w-full h-96 relative group">
//         <div
//           className="w-full h-full"
//           onClick={() => setIsFlipped(!isFlipped)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               e.preventDefault()
//               setIsFlipped(!isFlipped)
//             }
//           }}
//           tabIndex={0}
//           aria-label={isFlipped ? "Mostrar pergunta" : "Mostrar resposta"}
//         >
//           <div
//             className={cn(
//               "relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer",
//               isFlipped && "rotate-y-180"
//             )}
//           >
//             <Card className="absolute inset-0 w-full h-full backface-hidden">
//               {flashcard && (
//                 <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="h-8 w-8 p-0 bg-background/90 hover:bg-background shadow-sm border"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setEditModalOpen(true);
//                     }}
//                   >
//                     <MoreVertical className="h-4 w-4" />
//                   </Button>
//                 </div>
//               )}

//               <CardContent className="flex items-center justify-center h-full">
//                 <div className="text-center flex flex-col items-center justify-between h-full">
//                   <div className="text-sm text-muted-foreground font-medium">
//                     Pergunta
//                   </div>
//                   <div className="text-lg font-medium text-foreground">
//                     {front}
//                   </div>
//                   <div className="text-xs text-muted-foreground">
//                     Clique para ver a resposta
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-primary">
//               {flashcard && (
//                 <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="h-8 w-8 p-0 bg-primary-foreground/90 hover:bg-primary-foreground shadow-sm border border-primary-foreground/20"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setEditModalOpen(true);
//                     }}
//                   >
//                     <MoreVertical className="h-4 w-4 text-primary" />
//                   </Button>
//                 </div>
//               )}

//               <CardContent className="flex items-center justify-center h-full">
//                 <div className="text-center flex flex-col items-center justify-between h-full">
//                   <div className="text-sm text-primary-foreground/80 font-medium">
//                     Resposta
//                   </div>
//                   <div className="text-lg font-medium text-primary-foreground">
//                     {back}
//                   </div>
//                   <div className="text-xs text-primary-foreground/70">
//                     Clique para voltar à pergunta
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {flashcard && (
//         <EditFlashcardModal
//           key={`flashcard-${flashcard.id}-${flashcard.question}-${flashcard.answer}`}
//           flashcard={flashcard}
//           open={editModalOpen}
//           onOpenChange={setEditModalOpen}
//           onSave={handleEdit}
//         />
//       )}
//     </>
//   );
// }