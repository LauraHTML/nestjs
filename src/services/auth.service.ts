import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../dtos/user.dto';
import { compare, hash } from 'bcrypt-ts';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshToken: RefreshTokenRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.validateCredentials(email, password);
    if (!user) throw new UnauthorizedException();
    //const vale para todas as variáveis declaradas pela desestruturação
    //pega a propriedade senha do usuário e declara uma variável _
    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('O email está incorreto');
    }

    const comparePassword = await compare(dto.password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('A senha está incorreta');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = crypto.randomBytes(32).toString('hex');

    await this.refreshToken.createRefreshToken({
      userId: user.id,
      token: await hash(refreshToken, 10),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refresh(refreshToken: string) {
    const tokens = await this.refreshToken.findRefreshToken({
      where: {
        expiresAt: {
          gt: new Date(),
        },
        revokedAt: null,
      },
      include: {
        user: true,
      },
    });

    let matchedToken = null;

    for (const token of tokens) {
      const isValid = await compare(refreshToken, token.tokenHash);

      if (isValid) {
        matchedToken = token;
        break;
      }
    }
    if (!matchedToken) {
      throw new UnauthorizedException('Token inválido');
    }
    const newRefreshToken = crypto.randomBytes(64).toString('hex');

    const newAccessToken = await this.jwtService.signAsync({
      sub: matchedToken.user.id,
      email: matchedToken.user.email,
    });

    // 4. Rotate refresh token atomically
    await this.prisma.$transaction([
      this.prisma.refreshToken.update({
        where: {
          id: matchedToken.id,
        },
        data: {
          revokedAt: new Date(),
        },
      }),

      this.prisma.refreshToken.create({
        data: {
          tokenHash: await bcrypt.hash(newRefreshToken, 12),
          userId: matchedToken.user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    // 5. Return new credentials
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
