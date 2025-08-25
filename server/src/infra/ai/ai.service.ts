import { SYSTEM_SUMMARY_INSTRUCTION } from '@/constants/prompts';
import { PrismaService } from '@/infra/storage/db/prisma/prisma.service';
import { openai } from '@ai-sdk/openai';
import { Injectable } from '@nestjs/common';
import { generateObject, streamText } from 'ai';
import { z } from 'zod';

@Injectable()
export class AIService {
  constructor(private readonly prisma: PrismaService) {}

  async generateResume(prompt: string) {
    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      prompt,
      schema: z.object({
        resume: z.string(),
      }),
    });

    return result.object.resume;
  }

  async *streamResumeGeneration(documentContent: string) {
    const result = streamText({
      model: openai('gpt-4o-mini'),
      prompt: SYSTEM_SUMMARY_INSTRUCTION + documentContent,
    });

    let buffer = '';

    for await (const delta of result.textStream) {
      buffer += delta;

      const lines = buffer.split('\n');

      if (lines.length > 1) {
        for (let i = 0; i < lines.length - 1; i++) {
          yield lines[i] + '\n';
        }

        buffer = lines[lines.length - 1];
      }
    }

    if (buffer.trim()) {
      yield buffer;
    }
  }
}
