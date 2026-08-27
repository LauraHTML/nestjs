// import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './controllers/user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [AppService],
})
export class AppModule { }
