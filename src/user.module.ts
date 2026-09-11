// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}