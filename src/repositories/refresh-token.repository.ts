import { Injectable } from '@nestjs/common';
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

  async findRefreshToken(token: CreateInput<Contract, 'RefreshToken'>) {
    db.orm.public.RefreshToken.all();
  }

  async updateRefreshToken(
    id: number,
    token: ScalarUpdateInput<Contract, 'RefreshToken'>,
  ) {
    db.orm.public.RefreshToken.where({ id }).update({ token });
  }

  async transactionRefreshToken(
    id: number,
    userId: number,
    token: CreateInput<Contract, 'RefreshToken'>,
  ) {
    const result = await db.transaction(async (tx) => {
      const update = await tx.orm.public.RefreshToken.where({
        id,
        userId,
      }).update({ revokedAt: new Date() });
      const create = await tx.orm.public.RefreshToken.create({
        ...token,
        tokenHash: token.tokenHash,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return create;
    });
  }
}
