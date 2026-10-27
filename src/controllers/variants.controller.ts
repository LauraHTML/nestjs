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
import { VariantsService } from '../services/variants.service';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantService: VariantsService) {}

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
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.variantService.updateVariant(id, updateVariantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.variantService.deleteVariant(id);
  }
}
