import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/lib/env';

@Injectable()
export class AwsService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  private generateUniqueName(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ key: string; url: string }> {
    const name = file.originalname.split('.')[0];
    const extension = file.originalname.split('.').pop();
    const key = `${name}_${this.generateUniqueName()}.${extension}`;

    const putObjectParams: PutObjectCommandInput = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(putObjectParams);
      await this.s3Client.send(command);
      const url = await this.fileUrl(key);

      return { key, url };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao fazer o upload para o S3: ' + error.message,
      );
    }
  }

  async fileUrl(key: string): Promise<string> {
    const getObjectParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    };

    try {
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this.s3Client, command);
      return url.split('?')[0];
    } catch (error) {
      throw new Error('Erro ao obter URL do arquivo do S3: ' + error.message);
    }
  }

  async deleteFile(key: string): Promise<{ key: string }> {
    const deleteObjectParams: DeleteObjectCommandInput = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    };

    try {
      const command = new DeleteObjectCommand(deleteObjectParams);
      await this.s3Client.send(command);
      return { key };
    } catch (error) {
      throw new Error('Erro ao excluir arquivo do S3: ' + error.message);
    }
  }

  async getUploadFileUrl(key: string): Promise<string> {
    const putObjectParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    };

    try {
      const command = new PutObjectCommand(putObjectParams);
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 5 /* 5 segundos */,
      });
      return url;
    } catch (error) {
      throw new Error('Erro ao obter URL do S3: ' + error.message);
    }
  }
}
