
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsUUID,
  Min,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProdutoDto {
  // ==================== IDENTIFICAÇÃO ====================

  @ApiProperty({
    description: 'Nome do produto',
    example: 'Maçã Gala',
    maxLength: 200,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(200, { message: 'O nome deve ter no máximo 200 caracteres' })
  nome: string;

  // ==================== CATEGORIZAÇÃO ====================

  @ApiProperty({
    description: 'ID da categoria do produto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'O ID da categoria deve ser um UUID válido' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  categoriaId: string;

  // ==================== PRECIFICAÇÃO ====================

  @ApiProperty({
    description: 'Preço de custo/compra do produto',
    example: 3.50,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço de custo deve ser um número com até 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço de custo deve ser positivo' })
  @Type(() => Number)
  precoCusto: number;

  @ApiProperty({
    description: 'Preço de venda do produto',
    example: 5.90,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço de venda deve ser um número com até 2 casas decimais' },
  )
  @IsPositive({ message: 'O preço de venda deve ser positivo' })
  @Type(() => Number)
  precoVenda: number;

  @ApiPropertyOptional({
    description: 'Margem de lucro em percentual',
    example: 68.57,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'A margem de lucro deve ser um número com até 2 casas decimais' },
  )
  @IsOptional()
  @Min(0, { message: 'A margem de lucro não pode ser negativa' })
  @Type(() => Number)
  margemLucro?: number;

  @ApiPropertyOptional({
    description: 'Preço promocional do produto',
    example: 4.90,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço promocional deve ser um número com até 2 casas decimais' },
  )
  @IsOptional()
  @IsPositive({ message: 'O preço promocional deve ser positivo' })
  @Type(() => Number)
  precoPromocional?: number;

  // ==================== ESTOQUE ====================

  @ApiPropertyOptional({
    description: 'Quantidade em estoque',
    example: 100,
    default: 0,
  })
  @IsNumber({}, { message: 'A quantidade em estoque deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'A quantidade em estoque não pode ser negativa' })
  @Type(() => Number)
  quantidadeEstoque?: number;

  @ApiPropertyOptional({
    description: 'Unidade de medida (UN, KG, LT, CX, PC, MT, etc)',
    example: 'KG',
    default: 'UN',
    maxLength: 50,
  })
  @IsString({ message: 'A unidade deve ser uma string' })
  @IsOptional()
  @MaxLength(50, { message: 'A unidade deve ter no máximo 50 caracteres' })
  @IsIn(['UN', 'KG', 'LT', 'CX', 'PC', 'MT', 'DZ', 'ML', 'G'], {
    message: 'Unidade inválida. Use: UN, KG, LT, CX, PC, MT, DZ, ML ou G',
  })
  unidade?: string;

  // ==================== FORNECEDOR ====================

  @ApiPropertyOptional({
    description: 'ID do fornecedor do produto',
    example: '660e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('4', { message: 'O ID do fornecedor deve ser um UUID válido' })
  @IsOptional()
  fornecedorId?: string;

  // ==================== CONTROLE ====================

  @ApiPropertyOptional({
    description: 'Status do produto (ativo/inativo)',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'O status ativo deve ser um booleano' })
  @IsOptional()
  ativo?: boolean;

  // ==================== OBSERVAÇÕES ====================

  @ApiPropertyOptional({
    description: 'Observações adicionais sobre o produto',
    example: 'Produto orgânico, manter refrigerado',
  })
  @IsString({ message: 'As observações devem ser uma string' })
  @IsOptional()
  observacoes?: string;
}

