export class CreateCategoryDto {
  categoryName!: string;
  description!: string;
}

export class ReponseCategoryDto {
  categoryName!: string;
  description!: string;
}

export class UpdateCategoryDto {
  categoryName?: number;
  description?: string;
}
