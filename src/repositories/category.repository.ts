import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db';
import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import type { Contract, Models } from '../prisma/contract.d';
import type {
  CreateInput,
  ScalarUpdateInput,
  UniqueConstraintCriterion,
} from '@prisma/orm-postgres/orm-client';

type Categories = Scalars<Models.public_Categories>;

@Injectable()
export class CategoryRepository {
  async findAllCategories(): Promise<Categories[]> {
    return db.orm.public.Categories.limit(20).offset(20).all();
  }

  async findCategoryById(
    id: UniqueConstraintCriterion<Contract, 'Categories'>,
  ) {
    return db.orm.public.Categories.whereUnique(id);
  }

  async create(data: CreateInput<Contract, 'Categories'>) {
    return db.orm.public.Categories.create(data);
  }

  async delete(id: number) {
    return db.orm.public.Categories.where({ id }).deleteAll();
  }

  async update(id: number, data: ScalarUpdateInput<Contract, 'Categories'>) {
    return db.orm.public.Categories.where({ id }).update(data);
  }
}
