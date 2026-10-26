import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.sevice';
import { Prisma, Variants } from '../generated/prisma/client';

@Injectable()
export class VariantsRepository {
  constructor(private prisma: PrismaService) {}

  async findVariantById(id: number): Promise<Variants | null> {
    return this.prisma.variants.findUnique({ where: { id } });
  }

  async findAllVariants() {
    return this.prisma.variants.findMany();
  }

  async create(data: Prisma.VariantsUncheckedCreateInput): Promise<Variants> {
    return this.prisma.variants.create({ data });
  }

  async delete(id: number): Promise<Variants> {
    return this.prisma.variants.delete({ where: { id } });
  }

  async update(id: number, data: Partial<Variants>): Promise<Variants> {
    return this.prisma.variants.update({ where: { id }, data });
  }
}
