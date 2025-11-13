import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import type { StringValue } from 'ms';

import { env } from '@/lib/env';

@Injectable()
export class JWTService {
  constructor(private readonly jwt: Jwt) {}

  async signAuthenticationToken({
    userId,
  }: {
    userId: string;
  }): Promise<string> {
    const payload = { sub: { userId } };

    return await this.jwt.signAsync(payload, {
      secret: env.JWT_AUTHENTICATION_TOKEN_SECRET,
      expiresIn: env.JWT_AUTHENTICATION_TOKEN_EXPIRES_IN as StringValue,
    });
  }

  async validateAuthenticationToken(token: string): Promise<{
    userId: string;
  }> {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: env.JWT_AUTHENTICATION_TOKEN_SECRET,
      });

      if (!payload) {
        throw new UnauthorizedException();
      }

      return payload.sub;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
