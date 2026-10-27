import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  categoryName!: string;

  @IsString()
  description!: string;
}

export class ReponseCategoryDto {
  categoryName!: string;
  description!: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
