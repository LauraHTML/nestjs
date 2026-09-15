import { CreateVariantDto, UpdateVariantDto } from '../dtos/variants.dto';
// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VariantService } from '../services/variants.service';

@Controller('variants')
export class UserController {
  constructor(private readonly variantService: VariantService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.variantService.findOneVariant(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantService.createVariant(createVariantDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVariantDto: Partial<UpdateVariantDto>,
  ) {
    return this.variantService.updateVariant(id, updateVariantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.variantService.deleteVariant(id);
  }
}
