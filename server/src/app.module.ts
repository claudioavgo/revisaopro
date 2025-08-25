import { Module } from '@nestjs/common';

import { AccountModule } from './core/account/account.module';
import { AuthModule } from './core/auth/auth.module';
import { HealthModule } from './core/health/health.module';
import { PrismaModule } from './infra/storage/db/prisma/prisma.module';
import { JWTModule } from './shared/jwt/jwt.module';
import { UploadModule } from './core/upload/upload.module';
import { AIModule } from './infra/ai/ai.module';
import { DocumentModule } from './core/document/document.module';
import { FileModule } from './infra/storage/file/file.module';

@Module({
  imports: [
    PrismaModule,
    FileModule,
    AIModule,
    AuthModule,
    JWTModule,
    HealthModule,
    AccountModule,
    UploadModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
