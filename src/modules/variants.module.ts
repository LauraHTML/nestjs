import { Module } from '@nestjs/common';
import { VariantsController } from '../controllers/variants.controller';
import { VariantsService } from '../services/variants.service';

//@Module: Recebe um objeto com as propriedades que descreve o módulo
@Module({
  //controllers: deixar as rotas prontas para receber requisições http
  controllers: [VariantsController],

  //providers: são classes que o NestJS pode instanciar e injetar em outros lugares
  providers: [VariantsService],
})

//exporta a classe vazia
export class VariantsModule {}
