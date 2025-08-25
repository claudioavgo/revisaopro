import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UploadService } from './upload.service';
import { JWTGuard } from '@/shared/jwt/guard/jwt.guard';
import { UserId } from '@/common/decorators/user-id.decorator';
import { GetSignedUrlDTO } from './dto/create-upload-url.dto';

@UseGuards(JWTGuard)
@Controller('/v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('signed-url')
  async getSignedUrl(@UserId() userId: string, @Body() body: GetSignedUrlDTO) {
    const { signedURL, key } = await this.uploadService.getSignedUrl({
      userId,
      data: body,
    });
    return { signedURL, key };
  }

  @Get()
  async getUploads(@UserId() userId: string) {
    const uploads = await this.uploadService.getUploads(userId);
    return { uploads };
  }
}
