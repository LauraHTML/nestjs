import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { PrismaModule } from './prisma.module';

//@Module: Recebe um objeto com as propriedades que descreve o módulo
@Module({
  imports: [PrismaModule],
  //controllers: deixar as rotas prontas para receber requisições http
  controllers: [CategoryController],

  //providers: são classes que o NestJS pode instanciar e injetar em outros lugares
  providers: [CategoryService, CategoryRepository],
})

//exporta a classe vazia
export class CategoryModule {}
