import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsInt()
  idCategory!: number;

  @IsInt()
  price!: number;

  @IsString()
  description!: string;

  @IsInt()
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
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  idCategory?: number;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  stock?: number;
}
