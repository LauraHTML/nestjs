// import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {}
