import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTModule } from '@/shared/jwt/jwt.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [JWTModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
