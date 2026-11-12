#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/72f9162363934be14c5db8238d7516afa4a49689b06ce87f60d6fb07ddfffd69/contract';
import endContract from '../../snapshots/72f9162363934be14c5db8238d7516afa4a49689b06ce87f60d6fb07ddfffd69/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b2975c4754c9d91ab5aa81616126cc477bf452f92d83e708b4e9cbb13009abca/contract';
import startContract from '../../snapshots/b2975c4754c9d91ab5aa81616126cc477bf452f92d83e708b4e9cbb13009abca/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'RefreshToken',
        column: 'familyId',
        type: 'int4',
        using: placeholder('RefreshToken.familyId:convert'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'RefreshToken',
        column: 'id',
        type: 'int4',
        using: placeholder('RefreshToken.id:convert'),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
