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

type Variants = Scalars<Models.public_Variants>;

@Injectable()
export class VariantsRepository {
  async findVariantById(id: number): Promise<Variants | null> {
    return db.orm.public.Variants.where({ id }).first();
  }

  async findAllVariants() {
    return db.orm.public.Variants.all();
  }

  async create(data: CreateInput<Contract, 'Variants'>): Promise<Variants> {
    return db.orm.public.Variants.create(data);
  }

  async delete(id: number) {
    return db.orm.public.Variants.where({ id }).deleteAll();
  }

  async update(id: number, data: ScalarUpdateInput<Contract, 'Variants'>) {
    return db.orm.public.Variants.where({ id }).update(data);
  }
}
