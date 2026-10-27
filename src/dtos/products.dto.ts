export class CreateProductDto {
  //   idProduct!: number;
  name!: string;
  idCategory!: number;
  price!: number;
  description!: string;
  stock!: number;
}

export class ResponseProductDto {
  id!: number;
  name!: string;
  idCategory!: number;
  price!: number;
  stock!: number;
  description!: string;
}

export class UpdateProductDto {
  //   idProduct!: number;
  name?: string;
  idCategory?: number;
  price?: number;
  description?: string;
  stock?: number;
}
