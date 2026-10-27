import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';

//@Module: Recebe um objeto com as propriedades que descreve o módulo
@Module({
  //controllers: deixar as rotas prontas para receber requisições http
  controllers: [CategoryController],

  //providers: são classes que o NestJS pode instanciar e injetar em outros lugares
  providers: [CategoryService],
})

//exporta a classe vazia
export class CategoryModule {}
