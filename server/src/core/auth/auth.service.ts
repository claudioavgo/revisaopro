import { Injectable, NotFoundException } from '@nestjs/common';

import { JWTService } from '@/shared/jwt/jwt.service';
import { AccountService } from '../account/account.service';
import { User } from 'generated/prisma';
import { GoogleProfile } from './strategy/google.strategy';
import { env } from '@/lib/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JWTService,
  ) {}

  async requestSocialAuthentication({
    provider,
    email,
    profile,
    accessToken,
    refreshToken,
  }: {
    provider: 'google';
    email: string;
    profile: GoogleProfile;
    accessToken?: string;
    refreshToken?: string;
  }): Promise<User> {
    email = email.toLowerCase();

    let user = await this.accountService.findByEmail(email);
    user ??= await this.accountService.create({
      name: profile.displayName,
      provider,
      profileId: profile.id,
      email,
      accessToken,
      refreshToken,
    });

    return user;
  }

  async confirmSocialAuthentication(userId: string) {
    const user = await this.accountService.findByIdOrThrow(userId);

    if (!user.accounts.length) {
      throw new NotFoundException();
    }

    const authenticationToken = await this.jwtService.signAuthenticationToken({
      userId,
    });

    return {
      token: authenticationToken,
    };
  }

  async authenticateWithToken(userId: string): Promise<{ user: User }> {
    const user = await this.accountService.findByIdOrThrow(userId);

    return {
      user,
    };
  }

  getGoogleAuthUrl() {
    const newUrl = new URL(env.GOOGLE_AUTH_BASE_URL);
    newUrl.searchParams.set('client_id', env.GOOGLE_AUTH_CLIENT_ID);
    newUrl.searchParams.set('redirect_uri', env.GOOGLE_AUTH_CALLBACK_URL);
    newUrl.searchParams.set('response_type', 'code');
    newUrl.searchParams.set('scope', 'email profile');

    return newUrl.toString();
  }
}
