import { CreateUserDto } from './../dtos/user.dto';
// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return { message: 'Returns all users' };
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {  
    return this.userService.createUser(createUserDto);
  }

  // PUT /users/:id - Updates an existing user
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return { message: `User ${id} updated`, data: updateUserDto };
  }

  // DELETE /users/:id - Removes a user
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return;
  }
}