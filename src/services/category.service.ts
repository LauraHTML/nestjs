import { CategoryRepository } from './../repositories/category.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ResponseCategoryDto,
} from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto) {
    if (dto.categoryName === '') {
      throw new BadRequestException(
        'Por favor, coloque um nome para a categoria',
      );
    }

    if (dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
      );
    }

    return this.categoryRepository.create({
      categoryName: dto.categoryName,
      description: dto.description,
    });
  }

  async findAllCategories(): Promise<ResponseCategoryDto[]> {
    const categories = await this.categoryRepository.findAllCategories();
    if (!categories)
      throw new NotFoundException('Nenhuma categoria foi encontrada');
    return categories;
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepository.findCategoryById(id);
    if (!category)
      throw new NotFoundException(`Categoria com id:${id} não foi encontrada`);
    return category;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    await this.findOneCategory(id);

    if (!id) throw new NotFoundException('A categoria não foi encontrada');

    if (dto.categoryName != null && !dto.categoryName) {
      throw new BadRequestException(
        'Por favor, coloque um nome para a categoria',
      );
    }
    if (dto.description != null && dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, coloque a descrição da categoria ou escreva com mais detalhes',
      );
    }

    return this.categoryRepository.update(id, {
      ...(dto.categoryName != null && { categoryName: dto.categoryName }),
      ...(dto.description != null && { description: dto.description }),
    });
  }

  async deleteCategory(id: number) {
    await this.findOneCategory(id);

    return this.categoryRepository.delete(id);
  }
}
