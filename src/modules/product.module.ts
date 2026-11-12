import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { PrismaModule } from './prisma.module';

//@Module: Recebe um objeto com as propriedades que descreve o módulo
@Module({
  imports: [PrismaModule],
  //controllers: deixar as rotas prontas para receber requisições http
  controllers: [ProductController],

  //providers: são classes que o NestJS pode instanciar e injetar em outros lugares
  providers: [ProductService, ProductRepository],
})

//exporta a classe vazia
export class ProductModule {}
