// repositories/product.repository.ts
import { PrismaClient, Prisma } from "../generated/prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  async create(data: { name: string; price: number; storeId: string }) {
    return prisma.product.create({ data });
  }

  async findById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  async findByStore(storeId: string) {
    return prisma.product.findMany({ where: { storeId } });
  }
}