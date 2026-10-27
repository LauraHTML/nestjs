import {
  CreateProductDto,
  UpdateProductDto,
  ResponseProductDto,
} from '../dtos/products.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';

//@: no typescript anexa informações extras a uma classe, método ou propriedade
//expande o comportamento do elemento que ele "decora", sem mudar a lógica interna
@Controller('products')
export class ProductController {
  //injeção de dependência
  //O nest cria uma instância do ProductService e entrega para o controller
  constructor(private readonly productService: ProductService) {}
  //typescript: private readonly -> cria a propriedade da classe e atribui o valor de productService
  //readonly: garante que a instância de serviço seja sobreescrita

  @Get()
  findAll(): Promise<ResponseProductDto[]> {
    return this.productService.findProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOneProduct(id);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
