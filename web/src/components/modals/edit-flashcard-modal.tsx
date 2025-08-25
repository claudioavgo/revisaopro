// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { editFlashcardSchema, EditFlashcardInput } from "@/lib/validation/edit";
// import { toast } from "sonner";

// interface EditFlashcardModalProps {
//   flashcard: Flashcard;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSave: (data: EditFlashcardInput) => Promise<void>;
// }

// export function EditFlashcardModal({
//   flashcard,
//   open,
//   onOpenChange,
//   onSave,
// }: Readonly<EditFlashcardModalProps>) {
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<EditFlashcardInput>({
//     resolver: zodResolver(editFlashcardSchema),
//     defaultValues: {
//       question: flashcard.question,
//       answer: flashcard.answer,
//     },
//   });

//   useEffect(() => {
//     if (open) {
//       reset();
//     }
//   }, [open, flashcard, reset]);

//   const onSubmit = async (data: EditFlashcardInput) => {
//     setIsLoading(true);
//     try {
//       await onSave(data);
//       onOpenChange(false);
//       toast.success("Flashcard atualizado com sucesso!");
//     } catch (error) {
//       console.error("Error updating flashcard:", error);
//       toast.error("Erro ao atualizar flashcard");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Editar Flashcard</DialogTitle>
//           <DialogDescription>
//             Faça as alterações necessárias no flashcard.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="question">Pergunta</Label>
//             <Textarea
//               id="question"
//               {...register("question")}
//               placeholder="Digite a pergunta..."
//               className="min-h-20"
//             />
//             {errors.question && (
//               <p className="text-sm text-red-500">{errors.question.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="answer">Resposta</Label>
//             <Textarea
//               id="answer"
//               {...register("answer")}
//               placeholder="Digite a resposta..."
//               className="min-h-20"
//             />
//             {errors.answer && (
//               <p className="text-sm text-red-500">{errors.answer.message}</p>
//             )}
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//             >
//               Cancelar
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Salvando..." : "Salvar"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }