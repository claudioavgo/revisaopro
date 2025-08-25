import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { env } from '@/lib/env';
import { GoogleGuard } from './guard/google.guard';
import { Response } from 'express';
import { User } from 'generated/prisma';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setTokenToResponseCookie(response: Response, token: string) {
    response.cookie('authorization', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  @Get('/google')
  getGoogleAuthLink() {
    const url = this.authService.getGoogleAuthUrl();

    return { url };
  }

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async confirmAuthenticationWithGoogle(
    @Req() { user }: { user: User },
    @Res() response: Response,
  ) {
    const { token } = await this.authService.confirmSocialAuthentication(
      user.id,
    );

    this.setTokenToResponseCookie(response, token);

    return response.redirect(env.GOOGLE_AUTH_REDIRECT_URL);
  }

  @Get('logout')
  logout(@Res() response: Response) {
    response.clearCookie('authorization');

    return response.json({ loggedOut: true });
  }
}
