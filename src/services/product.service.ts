import { ProductRepository } from './../repositories/product.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto) {
    if (dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome do produto');
    }
    if (dto.price < 10.0) {
      throw new BadRequestException(
        'Por favor, coloque um preço válido para o produto',
      );
    }
    if (dto.inventory < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }
    if (dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, escreva uma descrição mais completa para o produto',
      );
    }
    // if (!dto.idVariants)
    //   throw new BadRequestException(
    //     'Por favor, coloque pelo menos uma variante padrão para o produto',
    //   );

    return this.productRepository.create({
      name: dto.name,
      idCategory: dto.idCategory,
      price: dto.price,
      description: dto.description,
      stock: dto.inventory,
    });
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.findProductById(id);
    if (!product)
      throw new NotFoundException(`Produto com id:${id} não foi encontrado`);
    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    await this.findOneProduct(id);

    if (dto.name != null && dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome do produto');
    }
    if (dto.price != null && dto.price < 10.0) {
      throw new BadRequestException(
        'Por favor, coloque um preço válido para o produto',
      );
    }
    if (dto.inventory != null && dto.inventory < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }
    if (dto.description != null && dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, escreva uma descrição mais completa para o produto',
      );
    }

    return this.productRepository.updateProduct(id, {
      ...(dto.name != null && { name: dto.name }),
      ...(dto.price != null && { price: dto.price }),
      ...(dto.inventory != null && { inventory: dto.inventory }),
      ...(dto.description != null && { description: dto.description }),
    });
  }
}
