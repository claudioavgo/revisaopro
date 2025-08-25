import { useEffect, useState, useRef } from "react";

interface DocumentStreamState {
  content: string;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
}

interface DocumentStreamResult extends DocumentStreamState {
  startStream: () => void;
  stopStream: () => void;
}

export function useDocumentStream(documentId: string): DocumentStreamResult {
  const [state, setState] = useState<DocumentStreamState>({
    content: "",
    isLoading: false,
    isComplete: false,
    error: null,
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const isConnectedRef = useRef(false);

  const startStream = () => {
    if (isConnectedRef.current || !documentId) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      content: "",
      isComplete: false,
    }));

    const url = `http://localhost:3003/v1/document/${documentId}/stream`;
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;
    isConnectedRef.current = true;

    eventSource.onopen = () => {
      console.log("Conexão SSE estabelecida");
    };

    eventSource.onmessage = (event) => {
      try {
        // Tenta fazer parse do JSON para detectar o fim do stream
        const data = JSON.parse(event.data);
        if (data.documentId) {
          // Sinal de fim do stream
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isComplete: true,
          }));
          eventSource.close();
          isConnectedRef.current = false;
          return;
        }
      } catch {
        // Se não é JSON, é conteúdo normal
        setState((prev) => ({
          ...prev,
          content: prev.content + event.data + "\n",
        }));
      }
    };

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Erro ao conectar com o servidor",
      }));
      eventSource.close();
      isConnectedRef.current = false;
    };
  };

  const stopStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      isConnectedRef.current = false;
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    // Inicia o stream automaticamente quando o hook é montado
    if (documentId) {
      startStream();
    }

    return () => {
      stopStream();
    };
  }, [documentId]);

  return {
    ...state,
    startStream,
    stopStream,
  };
}
