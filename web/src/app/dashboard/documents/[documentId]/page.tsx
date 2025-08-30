"use client";

import { useParams, notFound } from "next/navigation";
import { useDocument } from "@/hooks/use-document";
import Content from "./_components/content";
import LoadingPage from "@/components/loading-page";

export default function DocumentPage() {
  const params = useParams();
  const documentId = params?.documentId as string;

  const { data: document, isLoading, error } = useDocument(documentId);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !document) {
    notFound();
  }

  return (
    <div>
      <Content summary={document.resume} createdAt={new Date(document.createdAt)} documentId={document.id} />
    </div>
  );
}
