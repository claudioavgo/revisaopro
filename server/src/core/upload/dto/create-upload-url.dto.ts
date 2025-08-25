import { IsNotEmpty, IsString, Max, IsNumber } from 'class-validator';
import { MAX_FILE_SIZES } from '@/constants/files';
import { ApiProperty } from '@nestjs/swagger';
import { ENUM_DOCUMENT_TYPE } from '@/types/content.type';

export class GetSignedUrlDTO {
  @ApiProperty({
    enum: ENUM_DOCUMENT_TYPE,
    description: 'The type of the upload',
    example: ENUM_DOCUMENT_TYPE.PDF,
  })
  @IsString()
  @IsNotEmpty()
  type: ENUM_DOCUMENT_TYPE;

  @ApiProperty({
    description: 'The extension of the upload',
    example: 'PDF',
  })
  @IsString()
  @IsNotEmpty()
  extension: ENUM_DOCUMENT_TYPE;

  @ApiProperty({
    description: 'The size of the upload',
    example: 1000,
  })
  @IsNumber()
  @Max(MAX_FILE_SIZES.document)
  @IsNotEmpty()
  size: number;
}
