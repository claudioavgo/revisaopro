import { BadRequestException, Injectable } from '@nestjs/common';
import { AwsService } from './aws/aws.service';
import { PrismaService } from '../db/prisma/prisma.service';
import { ENUM_DOCUMENT_TYPE } from 'src/types/content.type';
import { Upload } from 'generated/prisma';

@Injectable()
export class FileService {
  constructor(
    private readonly awsService: AwsService,
    private readonly prisma: PrismaService,
  ) {}

  private async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ key: string; url: string }> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }
    if (!file.originalname) {
      throw new BadRequestException('Nome do arquivo inválido.');
    }

    const { key, url } = await this.awsService.uploadFile(file);

    return { key, url };
  }

  async saveFile(params: {
    file: Express.Multer.File;
    directory: string;
    userId: string;
  }): Promise<{ id: string; url: string }> {
    const { file, directory, userId } = params;

    const allowedMimeTypes = ['application/pdf', 'application/json'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo inválido. São aceitos um dos seguintes tipos: ${allowedMimeTypes.join(', ')}`,
      );
    }

    const extension = file.originalname.split('.').pop();
    const formattedName = file.originalname
      .split('.')
      .slice(0, -1)
      .join('')
      .replace(/ /g, '_')
      .replace(/\./g, '_');
    const pathFileName = `${directory}/${userId}/${formattedName}.${extension}`;
    file.originalname = pathFileName;

    const { url } = await this.uploadFile(file);

    const savedFile = await this.prisma.upload.create({
      data: {
        name: file.filename,
        extension: file.mimetype,
        url: url,
        size: file.size,
        userId,
        type: ENUM_DOCUMENT_TYPE.PDF,
      },
    });

    return { id: savedFile.id, url };
  }

  async getFile(params: { id: string }): Promise<Upload | null> {
    const { id } = params;

    const file = await this.prisma.upload.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      return null;
    }

    return file;
  }

  async getFileById(id: string): Promise<Upload | null> {
    const file = await this.prisma.upload.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      return null;
    }

    return await this.getFile({
      id: file.id,
    });
  }
}
