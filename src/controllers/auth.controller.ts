import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dto';
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
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
}
