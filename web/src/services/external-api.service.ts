import { ApiClient } from "@/lib/api-client";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

interface CreateDocumentDTO {
  url: string;
  name: string;
  type: string;
  extension: string;
  size: number;
}

interface SignedUrlRequest {
  type: "PDF" | "DOCX" | "DOC" | "XLSX" | "XLS" | "PPTX" | "PPT";
  extension: string;
  size: number;
}

interface SignedUrlResponse {
  signedURL: string;
  key: string;
}

interface Account {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  displayName: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  accounts: Array<{
    id: string;
    provider: string;
    providerId: string;
    accessToken: string;
    refreshToken: string | null;
    country: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface Document {
  id: string;
  name: string;
  type: string;
  extension: string;
  size: number;
  resume: string | null;
  parsedResumeURL: string;
  pages: number | null;
  uploadId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

class ExternalApiService {
  private readonly client: ApiClient;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    this.client = new ApiClient({
      baseUrl,
      timeout: 15000,
      withCredentials: true,
      responseWrapper: "data",
    });
  }

  async getGoogleAuthLink(): Promise<{ url: string }> {
    return this.client.get("/v1/auth/google");
  }

  async logout(): Promise<void> {
    return this.client.get("/v1/auth/logout");
  }

  async getAccount(): Promise<Account> {
    return this.client.getWrapped<Account>("/v1/me", "user");
  }

  async getSignedUrl(data: SignedUrlRequest): Promise<SignedUrlResponse> {
    return this.client.post("/v1/upload/signed-url", data);
  }

  async createDocument(data: CreateDocumentDTO): Promise<Document> {
    return this.client.postWrapped<Document>("/v1/document", "document", data);
  }

  async getDocuments(): Promise<Document[]> {
    return this.client.getWrapped<Document[]>("/v1/document", "documents");
  }

  async getDocument(id: string, headers?: ReadonlyHeaders): Promise<Document> {
    return this.client.getWrapped<Document>(`/v1/document/${id}`, "document", {
      headers: headers ? Object.fromEntries(headers.entries()) : undefined,
    });
  }

  async checkHealth(): Promise<{ status: string }> {
    return this.client.get("/v1/health");
  }
}

export const externalApiService = new ExternalApiService();
export {
  type Account,
  type Document,
  type CreateDocumentDTO,
  type SignedUrlRequest,
  type SignedUrlResponse,
};
