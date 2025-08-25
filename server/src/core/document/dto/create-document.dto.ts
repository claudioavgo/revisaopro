import { MAX_FILE_SIZES } from '@/constants/files';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Max } from 'class-validator';

export class CreateDocumentDTO {
  @ApiProperty({
    description: 'The URL of the document',
    example: 'https://www.google.com',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The name of the document',
    example: 'document.pdf',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the document',
    example: 'PDF',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The extension of the document',
    example: 'pdf',
  })
  @IsString()
  @IsNotEmpty()
  extension: string;

  @ApiProperty({
    description: 'The size of the document',
    example: 1000,
  })
  @IsNumber()
  @Max(MAX_FILE_SIZES.document)
  @IsNotEmpty()
  size: number;
}
