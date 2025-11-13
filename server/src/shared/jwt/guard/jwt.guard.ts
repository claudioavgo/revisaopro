import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JWTService } from '@/shared/jwt/jwt.service';
import type { JWTRequest } from '@/types/jwt-request.type';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<JWTRequest>();

    if (!request.cookies) {
      throw new UnauthorizedException();
    }

    const token = request.cookies['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }

    const { userId } = await this.jwtService.validateAuthenticationToken(token);

    if (!userId) {
      throw new UnauthorizedException();
    }

    request.userId = userId;

    return true;
  }
}
