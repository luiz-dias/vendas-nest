import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    // Verificar se o nome já existe
    const existingCategoria = await this.categoriaRepository.findOne({
      where: { name: createCategoriaDto.name },
    });

    if (existingCategoria) {
      throw new ConflictException(
        `Categoria com nome "${createCategoriaDto.name}" já existe`,
      );
    }

    // Verificar se a categoria pai existe (se fornecida)
    if (createCategoriaDto.idCategoriaPai) {
      const parentCategoria = await this.categoriaRepository.findOne({
        where: { id: createCategoriaDto.idCategoriaPai },
      });

      if (!parentCategoria) {
        throw new NotFoundException(
          `Categoria pai com ID "${createCategoriaDto.idCategoriaPai}" não encontrada`,
        );
      }
    }

    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID "${id}" não encontrada`);
    }

    return categoria;
  }

  async findSubcategorias(idCategoriaPai: string): Promise<Categoria[]> {
    // Verificar se a categoria pai existe
    await this.findOne(idCategoriaPai);

    return await this.categoriaRepository.find({
      where: { idCategoriaPai },
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);

    // Verificar se o novo nome já existe (se estiver sendo alterado)
    if (
      updateCategoriaDto.name &&
      updateCategoriaDto.name !== categoria.name
    ) {
      const existingCategoria = await this.categoriaRepository.findOne({
        where: { name: updateCategoriaDto.name },
      });

      if (existingCategoria) {
        throw new ConflictException(
          `Categoria com nome "${updateCategoriaDto.name}" já existe`,
        );
      }
    }

    // Verificar se a categoria pai existe (se estiver sendo alterada)
    if (updateCategoriaDto.idCategoriaPai) {
      // Não permitir que uma categoria seja pai de si mesma
      if (updateCategoriaDto.idCategoriaPai === id) {
        throw new BadRequestException(
          'Uma categoria não pode ser pai de si mesma',
        );
      }

      const parentCategoria = await this.categoriaRepository.findOne({
        where: { id: updateCategoriaDto.idCategoriaPai },
      });

      if (!parentCategoria) {
        throw new NotFoundException(
          `Categoria pai com ID "${updateCategoriaDto.idCategoriaPai}" não encontrada`,
        );
      }
    }

    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: string): Promise<void> {
    const categoria = await this.findOne(id);

    // Verificar se existem subcategorias
    const subcategorias = await this.categoriaRepository.find({
      where: { idCategoriaPai: id },
    });

    if (subcategorias.length > 0) {
      throw new BadRequestException(
        'Não é possível excluir uma categoria que possui subcategorias',
      );
    }

    await this.categoriaRepository.remove(categoria);
  }
}