//chama o repositório dentro de service para aplicar as regras de negócio

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { hash } from 'bcrypt-ts';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  static sanitizeText(text: string) {
    const sanitize = typeof text === 'string' ? text.trim().toLowerCase() : '';
    return sanitize;
  }
  static testEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.sanitizeText(email));
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(dto: CreateUserDto) {
    if (UserService.sanitizeText(dto.password).length < 6) {
      throw new BadRequestException(
        'Senha muito curta: Para a sua segurança, digite uma senha mais longa',
      );
    }
    if (!UserService.testEmail(dto.email)) {
      throw new BadRequestException(
        'Formato de email inválido: Digite um email válido',
      );
    }
    if (UserService.sanitizeText(dto.adress).length < 10) {
      throw new BadRequestException(
        'Endereço muito curto: Digite um endereço válido',
      );
    }
    if (UserService.sanitizeText(dto.name).length < 2) {
      throw new BadRequestException('Nome muito curto: Digite um nome maior');
    }
    if (UserService.sanitizeText(dto.userName).length < 2) {
      throw new BadRequestException(
        'Nome muito curto: Digite um nome de usuário maior',
      );
    }

    return this.userRepository.create({
      email: dto.email,
      adress: dto.adress,
      password: dto.password,
      userName: dto.userName,
      name: dto.name,
    });
  }

  async findOneUser(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user)
      throw new NotFoundException(`Usuário com ${id} não foi encontrado`);
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.findOneUser(id);

    if (
      dto.password != null &&
      UserService.sanitizeText(dto.password).length < 6
    ) {
      throw new BadRequestException(
        'Senha muito curta: Para a sua segurança, digite uma senha mais longa',
      );
    }
    if (dto.email != null && !UserService.testEmail(dto.email)) {
      throw new BadRequestException(
        'Formato de email inválido: Digite um email válido',
      );
    }
    if (
      dto.adress != null &&
      UserService.sanitizeText(dto.adress).length < 10
    ) {
      throw new BadRequestException(
        'Endereço muito curto: Digite um endereço válido',
      );
    }
    if (dto.name != null && UserService.sanitizeText(dto.name).length < 2) {
      throw new BadRequestException('Nome muito curto: Digite um nome maior');
    }
    if (
      dto.userName != null &&
      UserService.sanitizeText(dto.userName).length < 2
    ) {
      throw new BadRequestException(
        'Nome muito curto: Digite um nome de usuário maior',
      );
    }

    return this.userRepository.update(id, {
      ...(dto.email != null && { email: dto.email }),
      ...(dto.adress != null && { adress: dto.adress }),
      ...(dto.password != null && { password: dto.password }),
      ...(dto.userName != null && { userName: dto.userName }),
      ...(dto.name != null && { name: dto.name }),
    });
  }

  async deleteUser(id: number) {
    await this.findOneUser(id);

    return this.userRepository.delete(id);
  }
}
