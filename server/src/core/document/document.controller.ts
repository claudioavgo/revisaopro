import {
  Body,
  Controller,
  Get,
  Post,
  Sse,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { UserId } from '@/common/decorators/user-id.decorator';
import { CreateDocumentDTO } from './dto/create-document.dto';
import { Observable } from 'rxjs';
import { AIService } from '@/infra/ai/ai.service';
import { JWTGuard } from '@/shared/jwt/guard/jwt.guard';

@UseGuards(JWTGuard)
@Controller('/v1/document')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly aiService: AIService,
  ) {}

  @Post()
  async createDocument(
    @UserId() userId: string,
    @Body()
    body: CreateDocumentDTO,
  ) {
    const document = await this.documentService.createDocument({
      userId,
      data: body,
    });
    return { document };
  }

  @Get('/:id')
  async getDocument(@Param('id') documentId: string, @UserId() userId: string) {
    const document = await this.documentService.getDocumentById({
      documentId,
      userId,
    });
    return { document };
  }

  @Get()
  async getDocuments(@UserId() userId: string) {
    const documents = await this.documentService.getDocuments(userId);
    return { documents };
  }

  @Sse('/:id/stream')
  async streamResume(
    @Param('id') documentId: string,
    @UserId() userId: string,
  ) {
    const document = await this.documentService.getDocumentContent(
      documentId,
      userId,
    );

    if (!document) {
      return new Observable((observer) => {
        observer.error(new Error('Document not found'));
        observer.complete();
      });
    }

    const tenSecondsAgo = new Date().getTime() - 1000 * 10;

    if (document.document.createdAt.getTime() < tenSecondsAgo) {
      return new Observable((observer) => {
        observer.next({
          event: 'warning',
          data: {
            message: 'O documento ainda está sendo processado.',
          },
        });
        observer.next({
          event: 'done',
          data: { documentId },
        });
        observer.complete();
      });
    }

    return new Observable((observer) => {
      void (async () => {
        try {
          let resume = '';
          for await (const chunk of this.aiService.streamResumeGeneration(
            document.text,
          )) {
            resume += chunk;
            observer.next({
              event: 'summary',
              data: chunk,
            });
          }
          observer.next({
            event: 'done',
            data: { documentId },
          });
          observer.complete();

          await this.documentService.updateDocumentResume({
            documentId,
            resume,
            userId,
          });
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
}
