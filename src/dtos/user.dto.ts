import {
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  userName!: string;

  @IsString()
  adress!: string;

  @IsInt()
  telephone!: number;

  @IsInt()
  cep!: number;

  @IsString()
  cpf!: string;
}

export class ResponseUserDto {
  id!: number;
  name!: string;
  email!: string;
  userName!: string;
  adress!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsInt()
  idClient!: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  userName?: string | null;

  @IsString()
  @IsOptional()
  telephone?: string | null;

  @IsOptional()
  @IsString()
  adress?: string | null;

  @IsOptional()
  @IsString()
  password?: string | null;
}

export class signInDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
