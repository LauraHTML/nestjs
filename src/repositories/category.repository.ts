import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.sevice';
import { Categories } from '../generated/prisma/client';

@Injectable()
export class CategoryRepository {
  //private: cria e atribui o valor dentro da classe
  //instanciando o banco de dados, para usar os métodos, as queries do prisma
  constructor(private prisma: PrismaService) {}

  async findCategoryById(id: number): Promise<Categories | null> {
    return this.prisma.categories.findUnique({ where: { id } });
  }

  async create(data: Omit<Categories, 'id'>): Promise<Categories> {
    return this.prisma.categories.create({ data });
  }

  async delete(id: number): Promise<Categories> {
    return this.prisma.categories.delete({ where: { id } });
  }

  async update(id: number, data: Partial<Categories>): Promise<Categories> {
    return this.prisma.categories.update({ where: { id }, data });
  }
}
