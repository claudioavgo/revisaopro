import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/storage/db/prisma/prisma.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from '@/lib/env';
import { MAX_FILE_SIZES } from '@/constants/files';
import { createId } from '@paralleldrive/cuid2';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetSignedUrlDTO } from './dto/create-upload-url.dto';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async getUploads(userId: string) {
    const uploads = await this.prisma.upload.findMany({
      where: {
        userId,
      },
    });

    return uploads;
  }

  async getSignedUrl({
    userId,
    data,
  }: {
    userId: string;
    data: GetSignedUrlDTO;
  }): Promise<{ signedURL: string; key: string }> {
    const { size, extension } = data;

    if (size > MAX_FILE_SIZES.document) {
      throw new BadRequestException(
        `File size too large, max size is ${MAX_FILE_SIZES.document} bytes`,
      );
    }

    const key = `documents/${userId}/${createId()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: extension,
    });

    const signedURL = await getSignedUrl(this.s3Client, command);

    return {
      signedURL,
      key,
    };
  }
}
