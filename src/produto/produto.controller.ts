// ==================== PRODUTO CONTROLLER ====================
// src/produto/produto.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  ParseFloatPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
    type: Produto,
  })
  @ApiResponse({ status: 409, description: 'Produto já existe' })
  @ApiResponse({ status: 404, description: 'Categoria ou Fornecedor não encontrado' })
  create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso',
    type: [Produto],
  })
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('ativos')
  @ApiOperation({ summary: 'Listar produtos ativos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos ativos',
    type: [Produto],
  })
  findAtivos(): Promise<Produto[]> {
    return this.produtoService.findAtivos();
  }

  @Get('estoque-baixo')
  @ApiOperation({ summary: 'Listar produtos com estoque baixo' })
  @ApiQuery({
    name: 'quantidade',
    required: false,
    description: 'Quantidade mínima de estoque (padrão: 10)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos com estoque baixo',
    type: [Produto],
  })
  findEstoqueBaixo(
    @Query('quantidade', new ParseIntPipe({ optional: true }))
    quantidade?: number,
  ): Promise<Produto[]> {
    return this.produtoService.findEstoqueBaixo(quantidade);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar produtos por nome' })
  @ApiQuery({
    name: 'nome',
    description: 'Nome do produto (busca parcial)',
    example: 'Maçã',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos encontrados',
    type: [Produto],
  })
  findByNome(@Query('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Get('preco-range')
  @ApiOperation({ summary: 'Buscar produtos por faixa de preço' })
  @ApiQuery({ name: 'min', description: 'Preço mínimo', example: 5.0 })
  @ApiQuery({ name: 'max', description: 'Preço máximo', example: 20.0 })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos na faixa de preço',
    type: [Produto],
  })
  findByPrecoRange(
    @Query('min', ParseFloatPipe) min: number,
    @Query('max', ParseFloatPipe) max: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByPrecoRange(min, max);
  }

  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Listar produtos por categoria' })
  @ApiParam({ name: 'categoriaId', description: 'ID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos da categoria',
    type: [Produto],
  })
  findByCategoria(@Param('categoriaId') categoriaId: string): Promise<Produto[]> {
    return this.produtoService.findByCategoria(categoriaId);
  }

  @Get('fornecedor/:fornecedorId')
  @ApiOperation({ summary: 'Listar produtos por fornecedor' })
  @ApiParam({ name: 'fornecedorId', description: 'ID do fornecedor' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos do fornecedor',
    type: [Produto],
  })
  findByFornecedor(@Param('fornecedorId') fornecedorId: string): Promise<Produto[]> {
    return this.produtoService.findByFornecedor(fornecedorId);
  }

  @Get('count')
  @ApiOperation({ summary: 'Contar total de produtos' })
  @ApiResponse({
    status: 200,
    description: 'Total de produtos',
    schema: { type: 'number' },
  })
  count(): Promise<number> {
    return this.produtoService.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado',
    type: Produto,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
    type: Produto,
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'Nome do produto já existe' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Patch(':id/estoque')
  @ApiOperation({ summary: 'Atualizar estoque de um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiQuery({ name: 'quantidade', description: 'Nova quantidade em estoque' })
  @ApiResponse({
    status: 200,
    description: 'Estoque atualizado com sucesso',
    type: Produto,
  })
  updateEstoque(
    @Param('id', ParseIntPipe) id: string,
    @Query('quantidade', ParseIntPipe) quantidade: number,
  ): Promise<Produto> {
    return this.produtoService.updateEstoque(id, quantidade);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um produto (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 204, description: 'Produto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.produtoService.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restaurar um produto deletado' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto restaurado com sucesso',
    type: Produto,
  })
  restore(@Param('id', ParseIntPipe) id: string): Promise<Produto> {
    return this.produtoService.restore(id);
  }
}