
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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from './entities/fornecedor.entity';

@ApiTags('Fornecedores')
@Controller('fornecedores')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo fornecedor' })
  @ApiResponse({
    status: 201,
    description: 'Fornecedor criado com sucesso',
    type: Fornecedor,
  })
  @ApiResponse({ status: 409, description: 'Fornecedor já existe' })
  create(
    @Body() createFornecedorDto: CreateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os fornecedores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de fornecedores retornada com sucesso',
    type: [Fornecedor],
  })
  findAll(): Promise<Fornecedor[]> {
    return this.fornecedorService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar fornecedores por nome' })
  @ApiQuery({
    name: 'name',
    description: 'Nome do fornecedor (busca parcial)',
    example: 'Frutas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de fornecedores encontrados',
    type: [Fornecedor],
  })
  findByName(@Query('name') name: string): Promise<Fornecedor[]> {
    return this.fornecedorService.findByName(name);
  }

  @Get('count')
  @ApiOperation({ summary: 'Contar total de fornecedores' })
  @ApiResponse({
    status: 200,
    description: 'Total de fornecedores',
    schema: { type: 'number' },
  })
  count(): Promise<number> {
    return this.fornecedorService.count();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um fornecedor por ID' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({
    status: 200,
    description: 'Fornecedor encontrado',
    type: Fornecedor,
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Fornecedor> {
    return this.fornecedorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({
    status: 200,
    description: 'Fornecedor atualizado com sucesso',
    type: Fornecedor,
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @ApiResponse({ status: 409, description: 'Nome ou email já existe' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedorService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um fornecedor' })
  @ApiParam({ name: 'id', description: 'ID do fornecedor' })
  @ApiResponse({
    status: 204,
    description: 'Fornecedor deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.fornecedorService.remove(id);
  }
}