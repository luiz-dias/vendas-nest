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
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
  
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: Categoria,
  })
  @ApiResponse({ status: 409, description: 'Categoria já existe' })
  @ApiResponse({ status: 404, description: 'Categoria pai não encontrada' })
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
    type: [Categoria],
  })
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma categoria por ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Get(':id/subcategorias')
  @ApiOperation({ summary: 'Listar subcategorias de uma categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria pai' })
  @ApiResponse({
    status: 200,
    description: 'Lista de subcategorias retornada com sucesso',
    type: [Categoria],
  })
  @ApiResponse({ status: 404, description: 'Categoria pai não encontrada' })
  findSubcategorias(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Categoria[]> {
    return this.categoriaService.findSubcategorias(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiResponse({ status: 409, description: 'Nome da categoria já existe' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar uma categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  @ApiResponse({
    status: 400,
    description: 'Categoria possui subcategorias',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.categoriaService.remove(id);
  }
}