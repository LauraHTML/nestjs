import { ProductRepository } from './../repositories/product.repository';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateProductDto,
  ResponseProductDto,
  UpdateProductDto,
} from '../dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto): Promise<ResponseProductDto> {
    if (dto.name === '') {
      throw new BadRequestException('Por favor, coloque o nome do produto');
    }
    if (dto.price < 10.0) {
      throw new BadRequestException(
        'Por favor, coloque um preço válido para o produto',
      );
    }
    if (dto.stock < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }
    if (dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, escreva uma descrição mais completa para o produto',
      );
    }

    const product = await this.productRepository.create({
      name: dto.name,
      idCategory: dto.idCategory,
      price: dto.price,
      description: dto.description,
      stock: dto.stock,
    });
    return this.toResponseProduct(product);
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.findProductById(id);
    if (!product)
      throw new NotFoundException(`Produto com id:${id} não foi encontrado`);
    return product;
  }

  async findProducts(): Promise<ResponseProductDto[]> {
    const products = await this.productRepository.findAllProducts();
    console.log(products);
    if (!products) throw new NotFoundException('Nenhum produto foi encontrado');
    return products.map((product) => this.toResponseProduct(product));
  }

  private toResponseProduct(product: {
    id?: number;
    name: string;
    idCategory: number;
    price: number;
    stock: number;
    description: string;
  }): ResponseProductDto {
    if (product.id === undefined) {
      throw new InternalServerErrorException(
        'O banco de dados não retornou o id do produto',
      );
    }

    return {
      id: product.id,
      name: product.name,
      idCategory: product.idCategory,
      price: product.price,
      stock: product.stock,
      description: product.description,
    };
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
    if (dto.stock != null && dto.stock < 0) {
      throw new BadRequestException(
        'Por favor, coloque um valor válido para o estoque',
      );
    }
    if (dto.description != null && dto.description.split(/\s+/).length < 4) {
      throw new BadRequestException(
        'Por favor, escreva uma descrição mais completa para o produto',
      );
    }

    return this.productRepository.update(id, {
      ...(dto.name != null && { name: dto.name }),
      ...(dto.price != null && { price: dto.price }),
      ...(dto.stock != null && { inventory: dto.stock }),
      ...(dto.description != null && { description: dto.description }),
    });
  }

  async deleteProduct(id: number) {
    await this.findOneProduct(id);

    return this.productRepository.delete(id);
  }
}
