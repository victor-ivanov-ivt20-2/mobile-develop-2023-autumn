import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin-input';
import { ChangePasswordInput } from './dto/change-password.input';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }
  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password);
    const user = await this.prisma.user.create({
      data: {
        username: signUpInput.username,
        hashedPassword,
        email: signUpInput.email,
      },
    });
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInInput.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access denied');
    }
    const doPasswordsMatch = await argon.verify(
      user.hashedPassword,
      signInInput.password,
    );
    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user, message: 'Вошёл' };
  }
  hello() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async logout(userId: string) {
    const updatedAt = new Date();
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: { not: null },
      },
      data: {
        hashedRefreshToken: null,
        updatedAt,
      },
    });
    return { loggedOut: true };
  }

  async createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '15m',
        secret: 'ACCESS_TOKEN_SECRET',
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: 'REFRESH_TOKEN_SECRET',
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    const updatedAt = new Date();
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken, updatedAt },
    });
  }

  async getNewTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new ForbiddenException('Access denied');
    }
    const doRefreshTokensMatch = await argon.verify(
      user.hashedRefreshToken,
      rt,
    );
    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async changePassword(changePassword: ChangePasswordInput) {
    const hashedPassword = await argon.hash(changePassword.password);
    const user = await this.prisma.user.update({
      where: {
        id: changePassword.id
      },
      data: {
        hashedPassword,
      },
    });
    return { user };
  }

}
