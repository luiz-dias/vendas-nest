import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Frutas Cítricas',
    maxLength: 100,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada da categoria',
    example: 'Categoria para frutas cítricas como laranja, limão e tangerina',
  })
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Ícone emoji para representar a categoria na UI',
    example: '🍊',
    maxLength: 50,
  })
  @IsString({ message: 'O ícone deve ser uma string' })
  @IsOptional()
  @MaxLength(50, { message: 'O ícone deve ter no máximo 50 caracteres' })
  icon?: string;

  @ApiPropertyOptional({
    description: 'ID da categoria pai (para criar subcategorias)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'O ID da categoria pai deve ser um UUID válido' })
  @IsOptional()
  idCategoriaPai?: string;
}