"use client";

import { useQuery } from "@tanstack/react-query";
import { externalApiService } from "@/services/external-api.service";

export function useDocument(documentId: string) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => externalApiService.getDocument(documentId),
    enabled: !!documentId,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
