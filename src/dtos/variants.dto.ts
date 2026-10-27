import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  name!: string;

  @IsString()
  color!: string;

  @IsInt()
  idProduct!: number;

  @IsInt()
  stock!: number;

  @IsInt()
  variantCode!: number;
}

export class ResponseVariantDto {
  name!: string;
  color!: string;
  idProduct!: number;
  stock!: number;
  variantCode!: string;
}

export class UpdateVariantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsInt()
  idProduct?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsInt()
  variantCode?: number;
}
