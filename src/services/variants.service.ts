import { VariantsRepository } from './../repositories/variant.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateVariantDto,
  UpdateVariantDto,
  ResponseVariantDto,
} from '../dtos/variants.dto';

@Injectable()
export class VariantsService {
  constructor(private variantsRepository: VariantsRepository) {}

  async createVariant(dto: CreateVariantDto) {
    if (dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome da variante');
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
      variantCode: dto.variantCode,
    });
  }

  async findOneVariant(id: number) {
    const variant = await this.variantsRepository.findVariantById(id);
    if (!variant)
      throw new NotFoundException(`Variante com id:${id} não foi encontrada`);
    return variant;
  }

  async findAllVariants(): Promise<ResponseVariantDto[]> {
    const variants = await this.variantsRepository.findAllVariants();
    if (!variants) throw new NotFoundException('Nenhuma variante encontrada');
    return variants;
  }

  async updateVariant(id: number, dto: UpdateVariantDto) {
    await this.findOneVariant(id);

    if (dto.name != null && dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome da variante');
    }
    if (dto.idProduct != null && !dto.idProduct) {
      throw new BadRequestException(
        'Por favor, selecione um produto válido para a variante',
      );
    }
    if (dto.stock != null && dto.stock < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }

    return this.variantsRepository.update(id, {
      ...(dto.name != null && { name: dto.name }),
      ...(dto.color != null && { color: dto.color }),
      ...(dto.idProduct != null && { idProduct: dto.idProduct }),
      ...(dto.stock != null && { stock: dto.stock }),
      ...(dto.variantCode != null && { variantCode: dto.variantCode }),
    });
  }

  async deleteVariant(id: number) {
    await this.findOneVariant(id);

    return this.variantsRepository.delete(id);
  }
}
