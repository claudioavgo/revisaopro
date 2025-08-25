"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MarkdownViewer } from "@/components/content/markdown-viewer";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";
import { useDocumentStream } from "@/hooks/use-document-stream";

interface ContentProps {
  summary: string;
  createdAt: Date;
  documentId: string;
}

export default function Content({ summary: initialSummary, createdAt, documentId }: Readonly<ContentProps>) {
  const [activeTab, setActiveTab] = useState<"summary" | "questions" | "flashcards">("summary");
  const [summary, setSummary] = useState<string>(initialSummary);
  const { content, isLoading, isComplete } = useDocumentStream(documentId);

  useEffect(() => {
    if (isComplete && content) {
      setSummary(content);
    }
  }, [isComplete, content]);

  const currentSummary = isLoading || content ? content : summary;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl p-8">
        {activeTab === "summary" && (
          <Summary
            summary={currentSummary ?? ""}
            createdAt={createdAt}
          />
        )}
      </div>
    </div>
  );
}

function Summary({ summary, createdAt }: { summary: string, createdAt: Date }) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center gap-2">
        <Badge variant="3d-purple">Resumo</Badge>
        <Badge variant="3d-orange">{formatDate(createdAt)}</Badge>
      </CardHeader>
      <CardContent>
        <div className="max-w-none">
          <MarkdownViewer key={summary.length} content={summary} />
        </div>
      </CardContent>
    </Card>
  );
}

