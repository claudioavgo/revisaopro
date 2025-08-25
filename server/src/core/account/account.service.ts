import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/storage/db/prisma/prisma.service';
import { Account, AccountProvider, User } from 'generated/prisma';
import { generateRandomUsername } from '@/lib/handle-utils';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<(User & { accounts: Account[] }) | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });

    return user ?? null;
  }

  async findByIdOrThrow(id: string): Promise<User & { accounts: Account[] }> {
    const user = await this.findById(id);

    if (!user || !user.accounts) {
      throw new NotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user || null;
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create({
    name,
    email,
    provider,
    profileId,
    accessToken,
    refreshToken,
  }: {
    name: string;
    email: string;
    provider: AccountProvider;
    profileId: string;
    accessToken?: string;
    refreshToken?: string;
  }): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        username: generateRandomUsername(),
        displayName: name,
        email,
      },
    });

    await this.prismaService.account.create({
      data: {
        provider,
        providerId: profileId,
        accessToken,
        refreshToken,
        country: 'BR',
        userId: user.id,
      },
    });

    return user;
  }
}
