import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.sevice';
import { User } from '../generated/prisma/client';

@Injectable()
export class UserRepository {
  //private: cria e atribui o valor dentro da classe
  //instanciando o banco de dados, para usar os métodos, as queries do prisma
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
