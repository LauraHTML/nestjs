import { VariantsRepository } from './../repositories/variant.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVariantDto, UpdateVariantDto } from '../dtos/variants.dto';

@Injectable()
export class VariantService {
  constructor(private variantsRepository: VariantsRepository) {}

  async createVariant(dto: CreateVariantDto) {
    if (dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome do produto');
    }
    if (!dto.idProduct) {
      throw new BadRequestException(
        'Selecione um produto para inserir a variante',
      );
    }
    if (dto.stock < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }

    return this.variantsRepository.create({
      name: dto.name,
      color: dto.color,
      stock: dto.stock,
      idProduct: dto.idProduct,
    });
  }

  async findOneVariant(id: number) {
    const variant = await this.variantsRepository.findVariantById(id);
    if (!variant)
      throw new NotFoundException(`Variante com id:${id} não foi encontrada`);
    return variant;
  }

  async updateVariant(id: number, dto: UpdateVariantDto) {
    await this.findOneVariant(id);

    if (dto.name != null && dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome do produto');
    }
    if (dto.idProduct != null && !dto.idProduct) {
      throw new BadRequestException(
        'Por favor, coloque um preço válido para o produto',
      );
    }
    if (dto.stock != null && dto.stock < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }

    return this.variantsRepository.updateVariant(id, {
      ...(dto.name != null && { name: dto.name }),
      ...(dto.idProduct != null && { idProduct: dto.idProduct }),
      ...(dto.stock != null && { inventory: dto.stock }),
    });
  }

  async deleteVariant(id: number) {
    await this.findOneVariant(id);

    return this.variantsRepository.delete(id);
  }
}
