import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.sevice';
import { db } from '../prisma/db';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import type { Contract, Models } from '../prisma/contract.d';
import type {
  CreateInput,
  ScalarUpdateInput,
  UniqueConstraintCriterion,
} from '@prisma/orm-postgres/orm-client';

type Product = Scalars<Models.public_Product>;

@Injectable()
export class ProductRepository {
  async findProductById(id: number) {
    return db.orm.public.Product.whereUnique({ id })
      .include('Categories')
      .include('Variants')
      .first();
  }

  async findAllProducts() {
    return db.orm.public.Product.all();
  }

  async create(data: CreateInput<Contract, 'Product'>): Promise<Product> {
    return db.orm.public.Product.create(data);
  }

  async delete(id: number) {
    return db.orm.public.Product.where({ id }).deleteAll();
  }

  async update(id: number, data: ScalarUpdateInput<Contract, 'Product'>) {
    return db.orm.public.Product.where({ id }).update(data);
  }
}
