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

type RefreshToken = Scalars<Models.public_RefreshToken>;

@Injectable()
export class RefreshTokenRepository {
  async createRefreshToken(token: CreateInput<Contract, 'RefreshToken'>) {
    db.orm.public.RefreshToken.create(token);
  }
}
