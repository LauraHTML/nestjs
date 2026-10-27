import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category.module';
import { ProductModule } from './modules/product.module';
import { UserModule } from './modules/user.module';
import { VariantsModule } from './modules/variants.module';

@Module({
  imports: [CategoryModule, ProductModule, UserModule, VariantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
