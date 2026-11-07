import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from '../dtos/user.dto';
import { compare } from 'bcrypt-ts';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.validateCredentials(email, password);
    if (!user) throw new UnauthorizedException();
    // oconst vale para todas as variáveis declaradas pela desestruturação
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
    const payload = { id: user.id };

    return {
      //signAsync: recebe o payload e devolve uma string: header.payload.signature
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
