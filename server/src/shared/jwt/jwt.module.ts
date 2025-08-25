import { Global, Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';

import { JWTService } from './jwt.service';
import { JWTGuard } from './guard/jwt.guard';

@Global()
@Module({
  imports: [Jwt.register({})],
  providers: [JWTService, JWTGuard],
  exports: [JWTService],
})
export class JWTModule {}
