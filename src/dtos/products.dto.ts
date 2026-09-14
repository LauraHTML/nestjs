import { z } from 'zod';

export class CreateProductDto {
  //   idProduct!: number;
  name!: string;
  idCategory!: number;
  price!: number;
  description!: string;
  idVariants!: number[];
  inventory!: number;
}

export class ResponseProductDto {
  name!: string;
  idCategory!: number;
  price!: number;
  description!: string;
  idVariants!: Number[];
  createdAt?: Date;
}

export class UpdateProductDto {
  //   idProduct!: number;
  name?: string;
  idCategory?: number;
  price?: number;
  description?: string;
  idVariants?: Number[];
  inventory?: number;
}
