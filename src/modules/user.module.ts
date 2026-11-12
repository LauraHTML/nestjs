import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { PrismaModule } from './prisma.module';

//@Module: Recebe um objeto com as propriedades que descreve o módulo
@Module({
  imports: [PrismaModule],
  //controllers: deixar as rotas prontas para receber requisições http
  controllers: [UserController],

  //providers: são classes que o NestJS pode instanciar e injetar em outros lugares
  providers: [UserService, UserRepository],
})

//exporta a classe vazia
export class UserModule {}
