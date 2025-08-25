// "use client";

// import { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Question } from "@/generated/prisma";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { editQuestionSchema, EditQuestionInput } from "@/lib/validation/edit";
// import { toast } from "sonner";
// import { Plus, X } from "lucide-react";

// interface EditQuestionModalProps {
//   question: Question;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSave: (data: EditQuestionInput) => Promise<void>;
// }

// export function EditQuestionModal({
//   question,
//   open,
//   onOpenChange,
//   onSave,
// }: Readonly<EditQuestionModalProps>) {
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//     control,
//   } = useForm<EditQuestionInput>({
//     resolver: zodResolver(editQuestionSchema),
//     defaultValues: {
//       question: question.question,
//       type: question.type,
//       answerText: question.answerText || "",
//       answerIndex: question.answerIndex ?? 0,
//       options: question.options.length > 0 ? question.options : ["", ""],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "options" as never,
//   });

//   const questionType = watch("type");

//   useEffect(() => {
//     if (open) {
//       reset();
//     }
//   }, [open, question, reset]);

//   const onSubmit = async (data: EditQuestionInput) => {
//     setIsLoading(true);
//     try {
//       await onSave(data);
//       onOpenChange(false);
//       toast.success("Questão atualizada com sucesso!");
//     } catch (error) {
//       console.error("Error updating question:", error);
//       toast.error("Erro ao atualizar questão");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addOption = () => {
//     append("");
//   };

//   const removeOption = (index: number) => {
//     if (fields.length > 2) {
//       remove(index);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Editar Questão</DialogTitle>
//           <DialogDescription>
//             Faça as alterações necessárias na questão.
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
//             <Label htmlFor="type">Tipo de Questão</Label>
//             <Select value={questionType} onValueChange={(value) => setValue("type", value as "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FREE_RESPONSE")}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Selecione o tipo" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="MULTIPLE_CHOICE">Múltipla Escolha</SelectItem>
//                 <SelectItem value="TRUE_FALSE">Verdadeiro ou Falso</SelectItem>
//                 <SelectItem value="FREE_RESPONSE">Resposta Livre</SelectItem>
//               </SelectContent>
//             </Select>
//             {errors.type && (
//               <p className="text-sm text-red-500">{errors.type.message}</p>
//             )}
//           </div>

//           {/* TRUE_FALSE */}
//           {questionType === "TRUE_FALSE" && (
//             <div className="space-y-2">
//               <Label>Resposta Correta</Label>
//               <RadioGroup
//                 value={watch("answerText") || ""}
//                 onValueChange={(value) => setValue("answerText", value)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="Verdadeiro" id="true" />
//                   <Label htmlFor="true">Verdadeiro</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="Falso" id="false" />
//                   <Label htmlFor="false">Falso</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           )}

//           {/* FREE_RESPONSE */}
//           {questionType === "FREE_RESPONSE" && (
//             <div className="space-y-2">
//               <Label htmlFor="answerText">Resposta Esperada</Label>
//               <Textarea
//                 id="answerText"
//                 {...register("answerText")}
//                 placeholder="Digite a resposta esperada..."
//                 className="min-h-20"
//               />
//             </div>
//           )}

//           {/* MULTIPLE_CHOICE */}
//           {questionType === "MULTIPLE_CHOICE" && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <Label>Opções de Resposta</Label>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={addOption}
//                   className="gap-2"
//                 >
//                   <Plus size={16} />
//                   Adicionar opção
//                 </Button>
//               </div>

//               <div className="space-y-3">
//                 {fields.map((field, index) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`correct-${index}`}
//                         checked={watch("answerIndex") === index}
//                         onCheckedChange={(checked) => {
//                           if (checked) {
//                             setValue("answerIndex", index);
//                             setValue("answerText", watch(`options.${index}`));
//                           }
//                         }}
//                       />
//                       <Label htmlFor={`correct-${index}`} className="text-xs text-muted-foreground">
//                         Correta
//                       </Label>
//                     </div>

//                     <Input
//                       {...register(`options.${index}` as const)}
//                       placeholder={`Opção ${index + 1}`}
//                       className="flex-1"
//                     />

//                     {fields.length > 2 && (
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeOption(index)}
//                       >
//                         <X size={16} />
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {errors.root && (
//             <p className="text-sm text-red-500">{errors.root.message}</p>
//           )}

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