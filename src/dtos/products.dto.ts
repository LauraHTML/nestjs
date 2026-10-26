export class CreateProductDto {
  //   idProduct!: number;
  name!: string;
  idCategory!: number;
  price!: number;
  description!: string;
  inventory!: number;
}

export class ResponseProductDto {
  name!: string;
  idCategory!: number;
  price!: number;
  description!: string;
  createdAt?: Date;
}

export class UpdateProductDto {
  //   idProduct!: number;
  name?: string;
  idCategory?: number;
  price?: number;
  description?: string;
  inventory?: number;
}
