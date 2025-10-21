import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFornecedorDto {
  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Frutas São João Ltda',
    maxLength: 200,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(200, { message: 'O nome deve ter no máximo 200 caracteres' })
  name: string;

  @ApiPropertyOptional({
    description: 'Email do fornecedor',
    example: 'contato@frutassaojoao.com.br',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  @MaxLength(100, { message: 'O email deve ter no máximo 100 caracteres' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Telefone do fornecedor',
    example: '79999887766',
    maxLength: 20,
  })
  @IsString({ message: 'O telefone deve ser uma string' })
  @IsOptional()
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres' })
  @Matches(/^[0-9+\-\s()]*$/, {
    message: 'Telefone deve conter apenas números e caracteres válidos',
  })
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Chave PIX do fornecedor (CPF, CNPJ, email, telefone ou chave aleatória)',
    example: '12345678000190',
    maxLength: 100,
  })
  @IsString({ message: 'A chave PIX deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'A chave PIX deve ter no máximo 100 caracteres' })
  chavepix?: string;
}