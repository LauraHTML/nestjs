import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db';

import type { Scalars } from '@prisma/orm-postgres/family-contract/types';
import type { Contract, Models } from '../prisma/contract.d';
import type {
  CreateInput,
  ScalarUpdateInput,
  UniqueConstraintCriterion,
} from '@prisma/orm-postgres/orm-client';

type User = Scalars<Models.public_User>;

@Injectable()
export class UserRepository {
  async findUserById(id: UniqueConstraintCriterion<Contract, 'User'>) {
    return db.orm.public.User.whereUnique(id);
  }

  async findUserByEmail(email: string) {
    return db.orm.public.User.where({ email }).first();
  }

  async create(data: CreateInput<Contract, 'User'>): Promise<User> {
    return db.orm.public.User.create(data);
  }

  async delete(id: number) {
    return db.orm.public.User.where({ id }).deleteAll();
  }

  async update(id: number, data: ScalarUpdateInput<Contract, 'User'>) {
    return db.orm.public.User.where({ id }).update(data);
  }

  async findEmail() {
    const users = await db.orm.public.User.select('email').all();
    return users.map((user) => user.email);
  }
}
