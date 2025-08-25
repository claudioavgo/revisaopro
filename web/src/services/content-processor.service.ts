"use server";

export async function processFile(fileUrl: string) {
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  const file = new File([blob], "document.pdf", { type: "application/pdf" });

  const formData = new FormData();
  formData.append("file", file);

  const extractResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/extract-pdf", {
    method: "POST",
    body: formData,
  });

  if (!extractResponse.ok) {
    throw new Error("Falha ao extrair texto do PDF");
  }

  const extractedData = await extractResponse.json();

  interface Section {
    content: string;
  }

  const fullText = extractedData.sections.map((section: Section) => section.content).join("\n\n");

  return fullText;
}
