import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AccountService } from './account.service';
import { JWTGuard } from '@/shared/jwt/guard/jwt.guard';
import type { JWTRequest } from '@/types/jwt-request.type';

@Controller('/v1/me')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(JWTGuard)
  async getAccount(@Req() { userId }: JWTRequest) {
    const user = await this.accountService.findByIdOrThrow(userId);
    return { user };
  }
}
