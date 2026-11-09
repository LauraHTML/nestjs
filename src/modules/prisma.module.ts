import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.sevice';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}