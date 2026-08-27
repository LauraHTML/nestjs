import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto} from '../dtos/user.dto';
import { create } from 'domain';

//criando a rota usuarios
@Controller('users')
export class UsersController {
    @Get()
    findAll():string{
        return 'Retorna todos os usuários';
    }

    @Get(':id')
    findOne(@Param('id')id: string):string{
        return `retorna o usuário com o id: ${id}`;
    }
    
    // @Post()
    // async criarUsuario(){
    //   create(@Body('create') createUserDto: CreateUserDto): string {
    //   return 'Cria um novo usuário';
    // }
    
  // }

    @Put(':id')
    update(@Param('id') id: string, @Body('update') updateUserDto: UpdateUserDto): string {   
    return `Atualiza o usuário com o ID ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `Deleta o usuário com o ID ${id}`;
  }
}