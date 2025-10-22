import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/infra/storage/db/prisma/prisma.service';
import { CreateDocumentDTO } from './dto/create-document.dto';
import { extractTextFromPdf } from '@/lib/extract-text-from-pdf.service';
import { FileService } from '@/infra/storage/file/file.service';
import { Readable } from 'node:stream';
import { Document } from 'generated/prisma';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async createDocument({
    userId,
    data,
  }: {
    userId: string;
    data: CreateDocumentDTO;
  }) {
    const { url, name, type, extension, size } = data;

    const upload = await this.prisma.upload.create({
      data: {
        url,
        userId,
        type,
        name,
        extension,
        size,
      },
    });

    const fileRequest = await fetch(upload.url);
    const blob = await fileRequest.blob();
    const file = new File([blob], name);

    const parsedJsonContent = await extractTextFromPdf(file);
    const jsonContent = JSON.stringify(parsedJsonContent);
    const buffer = Buffer.from(jsonContent, 'utf-8');

    const multerFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: `${name}.json`,
      encoding: '7bit',
      mimetype: 'application/json',
      size: buffer.length,
      buffer,
      destination: '',
      filename: `${name}.json`,
      path: '',
      stream: new Readable(),
    };

    const { url: parsedResumeURL } = await this.fileService.saveFile({
      file: multerFile,
      directory: 'parsed',
      userId,
    });

    const document = await this.prisma.document.create({
      data: {
        name,
        type,
        extension,
        size,
        uploadId: upload.id,
        userId,
        parsedResumeURL,
      },
    });

    return document;
  }

  async getDocuments(userId: string) {
    const documents = await this.prisma.document.findMany({
      where: {
        userId,
      },
      include: {
        upload: true,
      },
    });

    return documents;
  }

  async getDocumentById({
    userId,
    documentId,
  }: {
    userId: string;
    documentId: string;
  }) {
    const document = await this.prisma.document.findUnique({
      where: {
        id: documentId,
        userId,
      },
    });

    if (!document) {
      throw new Error('Documento não encontrado');
    }

    return document;
  }

  async getDocumentContent(
    documentId: string,
    userId: string,
  ): Promise<{
    text: string;
    document: Document;
  }> {
    const document = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        userId,
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    if (!document.parsedResumeURL) {
      throw new BadRequestException('Documento ainda não foi processado');
    }

    try {
      const response = await fetch(document.parsedResumeURL);
      const parsedContent = await response.json();
      if (parsedContent.text) {
        return {
          text: parsedContent.text,
          document,
        };
      }

      if (typeof parsedContent === 'object') {
        return {
          text: JSON.stringify(parsedContent, null, 2),
          document,
        };
      }

      return {
        text: parsedContent.toString(),
        document,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar conteúdo do documento: ${error.message}`,
      );
    }
  }

  async updateDocumentResume({
    documentId,
    resume,
    userId,
  }: {
    documentId: string;
    resume: string;
    userId: string;
  }) {
    await this.prisma.document.update({
      where: { id: documentId, userId },
      data: { resume },
    });
  }
}
