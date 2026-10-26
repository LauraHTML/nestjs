#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/d091be57a839d058217118f45136f0ad18e27b63b613367bcdeb7d66e6ba6757/contract';
import endContract from '../../snapshots/d091be57a839d058217118f45136f0ad18e27b63b613367bcdeb7d66e6ba6757/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'categories',
        columns: [
          col('categoryName', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('description', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'orderItens',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idOrder', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idVariant', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('quantity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('unitPrice', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'orders',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idUser', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('orderDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('orderStatus', 'text', {
            notNull: true,
            default: lit('em processo'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'orders_orderStatus_check_87e3506c',
            "\"orderStatus\" IN ('concluído', 'em processo', 'recusado')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'payment',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idOrder', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idUser', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_transacao_gateway', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('paymentDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('paymentMetod', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('paymentStatus', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'payment_paymentMetod_check_a25b1114',
            "\"paymentMetod\" IN ('pix', 'cartão', 'boleto', 'paypal')",
          ),
          checkExpression(
            'payment_paymentStatus_check_d59e4170',
            "\"paymentStatus\" IN ('concluído', 'em processo', 'recusado')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'product',
        columns: [
          col('description', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idCategory', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('price', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('stock', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('adress', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('email', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'variants',
        columns: [
          col('color', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idProduct', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('stock', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('variantCode', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_userName_key',
        columns: ['userName'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orderItens',
        index: 'orderItens_idOrder_idx_13561201',
        columns: ['idOrder'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orderItens',
        index: 'orderItens_idVariant_idx_ba13bdf6',
        columns: ['idVariant'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'orders_idUser_idx_6acaa521',
        columns: ['idUser'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment',
        index: 'payment_idOrder_idx_13561201',
        columns: ['idOrder'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'payment',
        index: 'payment_idUser_idx_6acaa521',
        columns: ['idUser'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'product',
        index: 'product_idCategory_idx_f7a5d9d3',
        columns: ['idCategory'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'variants',
        index: 'variants_idProduct_idx_101452b5',
        columns: ['idProduct'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orderItens',
        foreignKey: {
          name: 'orderItens_idOrder_fkey',
          columns: ['idOrder'],
          references: { schema: 'public', table: 'orders', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orderItens',
        foreignKey: {
          name: 'orderItens_idVariant_fkey',
          columns: ['idVariant'],
          references: { schema: 'public', table: 'variants', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orders',
        foreignKey: {
          name: 'orders_idUser_fkey',
          columns: ['idUser'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment',
        foreignKey: {
          name: 'payment_idOrder_fkey',
          columns: ['idOrder'],
          references: { schema: 'public', table: 'orders', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'payment',
        foreignKey: {
          name: 'payment_idUser_fkey',
          columns: ['idUser'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'product',
        foreignKey: {
          name: 'product_idCategory_fkey',
          columns: ['idCategory'],
          references: { schema: 'public', table: 'categories', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'variants',
        foreignKey: {
          name: 'variants_idProduct_fkey',
          columns: ['idProduct'],
          references: { schema: 'public', table: 'product', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
