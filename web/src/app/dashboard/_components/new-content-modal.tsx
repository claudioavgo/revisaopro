"use client"

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner"
import { useConfetti } from "@/hooks/use-confetti";
import { externalApiService } from "@/services/external-api.service";
import { useRouter } from "next/navigation";

function getFileType(filename: string): 'PDF' | 'DOCX' | 'DOC' | 'XLSX' | 'XLS' | 'PPTX' | 'PPT' {
  const extension = filename.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, 'PDF' | 'DOCX' | 'DOC' | 'XLSX' | 'XLS' | 'PPTX' | 'PPT'> = {
    pdf: 'PDF',
    docx: 'DOCX',
    doc: 'DOC',
    xlsx: 'XLSX',
    xls: 'XLS',
    pptx: 'PPTX',
    ppt: 'PPT'
  };
  return typeMap[extension || ''] || 'PDF';
}

export function NewContentModal() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { fireConfetti } = useConfetti();
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(file: File) {
    setFile(file);
    await processFile(file);
  }

  async function uploadToS3(file: File, signedURL: string): Promise<string> {
    const response = await fetch(signedURL, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error('Falha no upload para S3');
    }

    return signedURL.split('?')[0];
  }

  async function processFile(file: File) {
    startTransition(async () => {
      try {
        const extension = file.name.split('.').pop() || '';
        const fileType = getFileType(file.name);

        const { signedURL } = await externalApiService.getSignedUrl({
          type: fileType,
          extension,
          size: file.size,
        });

        const url = await uploadToS3(file, signedURL);

        const document = await externalApiService.createDocument({
          url,
          name: file.name,
          type: fileType,
          extension,
          size: file.size,
        });

        fireConfetti();
        setOpen(false);
        router.push(`/dashboard/documents/${document.id}`);
      } catch (error) {
        console.error("Erro ao criar documento:", error);
        toast.error(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
        setFile(null);
      }
    });
  }

  const openFileDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && !isPending) handleFileChange(file);
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="flat">Novo Documento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Novo documento</DialogTitle>
          <DialogDescription>Faça upload de um novo documento de estudo.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="grid gap-4">
              <div
                role="button"
                tabIndex={0}
                className="w-full justify-center flex border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={!isPending ? openFileDialog : undefined}
                onKeyDown={(e) => !isPending && (e.key === 'Enter' || e.key === ' ') && openFileDialog()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile && !isPending) handleFileChange(droppedFile);
                }}
                style={{
                  pointerEvents: isPending ? 'none' : 'auto',
                  opacity: isPending ? 0.5 : 1
                }}
              >
                {!file ? (
                  <div className="space-y-2">
                    <p className="text-lg">
                      {isPending ? "Processando..." : "Arraste e solte seu arquivo aqui, ou clique para selecionar"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Arquivos suportados: PDF, DOCX, DOC, XLSX, XLS, PPTX, PPT
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {!isPending && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                      >
                        Remover arquivo
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  );
}