// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Navbar } from "./navbar";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { MarkdownViewer } from "@/components/content/markdown-viewer";
// import { Badge } from "@/components/ui/badge";
// import { formatDate } from "@/lib/date";
// import { Flashcard as FlashcardType, Status } from "@/generated/prisma";
// import Flashcard from "./flashcard";
// import Questions from "./question";
// import { Loader2 } from "lucide-react";
// import { getFlashcardsAction, getProjectStatusAction } from "@/services/flashcard.service";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface ProjectContentProps {
//   projectId: string;
//   initialSummary: string | null;
//   createdAt: Date;
// }

// export default function ProjectContent({
//   projectId,
//   initialSummary,
//   createdAt,
// }: ProjectContentProps) {
//   const [activeTab, setActiveTab] = useState<"summary" | "questions" | "flashcards">("summary");

//   const { data: projectStatus } = useQuery({
//     queryKey: ["project-status", projectId],
//     queryFn: () => getProjectStatusAction(projectId),
//     refetchInterval: (query) => {
//       const summaryStatus = query.state.data?.summaryStatus;
//       const flashcardsStatus = query.state.data?.flashcardsStatus;

//       if (summaryStatus === "PROCESSING" || flashcardsStatus === "PROCESSING") {
//         return 2000;
//       }
//       return false;
//     },
//   });

//   const { data: flashcards } = useQuery({
//     queryKey: ["flashcards", projectId],
//     queryFn: () => getFlashcardsAction(projectId),
//     enabled: projectStatus?.flashcardsStatus === "COMPLETED",
//   });

//   const getGeneratingText = () => {
//     if (projectStatus?.summaryStatus === "PROCESSING" && projectStatus?.flashcardsStatus === "PROCESSING") {
//       return "Gerando resumo e flashcards...";
//     } else if (projectStatus?.summaryStatus === "PROCESSING") {
//       return "Gerando resumo...";
//     } else if (projectStatus?.flashcardsStatus === "PROCESSING") {
//       return "Gerando flashcards...";
//     }
//     return "";
//   };

//   const isProcessing = projectStatus?.summaryStatus === "PROCESSING" || projectStatus?.flashcardsStatus === "PROCESSING";
//   const summary = projectStatus?.summary || initialSummary || "";

//   return (
//     <div className="flex flex-col h-full">
//       <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {isProcessing && (
//         <div className="w-full pt-4 max-w-4xl mx-auto flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
//           <Loader2 className="animate-spin" size={20} />
//           <span>{getGeneratingText()}</span>
//         </div>
//       )}

//       <div className="flex-1 py-8 max-w-4xl w-full mx-auto overflow-y-auto">
//         {activeTab === "summary" && (
//           <Summary
//             summary={summary}
//             createdAt={createdAt}
//             isProcessing={projectStatus?.summaryStatus === "PROCESSING"}
//           />
//         )}
//         {activeTab === "flashcards" && (
//           <Flashcards
//             cards={flashcards ?? []}
//             flashcardsStatus={projectStatus?.flashcardsStatus ?? "PENDING"}
//             projectId={projectId}
//           />
//         )}
//         {activeTab === "questions" && (
//           <Questions projectId={projectId} />
//         )}
//       </div>
//     </div>
//   );
// }

// function Summary({
//   summary,
//   createdAt,
//   isProcessing
// }: Readonly<{
//   summary: string;
//   createdAt: Date;
//   isProcessing: boolean;
// }>) {
//   const renderSummaryContent = () => {
//     if (summary && summary.length > 0) {
//       return <MarkdownViewer content={summary} />;
//     }

//     if (isProcessing) {
//       return (
//         <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
//           <Loader2 className="animate-spin" size={20} />
//           <span>Gerando resumo...</span>
//         </div>
//       );
//     }

//     return <p className="text-muted-foreground">Nenhum resumo disponível</p>;
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader className="flex items-center gap-2">
//         <Badge variant="3d-purple">Resumo</Badge>
//         <Badge variant="3d-orange">{formatDate(createdAt)}</Badge>
//       </CardHeader>
//       <CardContent>
//         {renderSummaryContent()}
//       </CardContent>
//     </Card>
//   );
// }

// function Flashcards({ cards, flashcardsStatus, projectId }: Readonly<{ cards: FlashcardType[], flashcardsStatus: Status, projectId: string }>) {
//   return (
//     <Card className="w-full">
//       <CardHeader className="flex items-center gap-2">
//         <Badge variant="3d-purple">Flashcards</Badge>
//         <Badge variant="3d-orange">{cards.length} cards</Badge>
//         {cards.length > 0 && flashcardsStatus === "COMPLETED" && (
//           <Link href={`/dashboard/projects/${projectId}/flashcards`} className="ml-auto">
//             <Button variant="flat">
//               Estudar Flashcards
//             </Button>
//           </Link>
//         )}
//       </CardHeader>
//       <CardContent>
//         {flashcardsStatus !== "COMPLETED" && (
//           <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
//             <Loader2 className="animate-spin" size={20} />
//             <span>Gerando flashcards...</span>
//           </div>
//         )}
//         {cards.length > 0 && flashcardsStatus === "COMPLETED" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cards.map((card) => (
//               <div key={card.id} className="aspect-[4/3]">
//                 <Flashcard front={card.question} back={card.answer} flashcard={card} projectId={projectId} />
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }