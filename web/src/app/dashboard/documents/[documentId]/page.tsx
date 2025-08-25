import { notFound } from "next/navigation";
import { externalApiService } from "@/services/external-api.service";
import { headers } from "next/headers";
import Content from "./_components/content";

export default async function DocumentPage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const document = await externalApiService.getDocument(documentId, await headers());

  if (!document) {
    notFound();
  }

  return (
    <div>
      <Content summary={document.resume ?? ""} createdAt={new Date(document.createdAt)} documentId={document.id} />
    </div>
  );
}
