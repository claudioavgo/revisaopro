import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JWTRequest } from '../../types/jwt-request.type';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<JWTRequest>();
    return request.userId;
  },
);
