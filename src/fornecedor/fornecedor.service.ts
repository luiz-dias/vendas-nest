// ==================== FORNECEDOR SERVICE ====================
// src/fornecedor/fornecedor.service.ts

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    // Verificar se já existe fornecedor com mesmo nome
    const existingFornecedor = await this.fornecedorRepository.findOne({
      where: { name: createFornecedorDto.name },
    });

    if (existingFornecedor) {
      throw new ConflictException(
        `Fornecedor com nome "${createFornecedorDto.name}" já existe`,
      );
    }

    // Verificar se email já existe (se fornecido)
    if (createFornecedorDto.email) {
      const existingEmail = await this.fornecedorRepository.findOne({
        where: { email: createFornecedorDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(
          `Email "${createFornecedorDto.email}" já está em uso`,
        );
      }
    }

    const fornecedor = this.fornecedorRepository.create(createFornecedorDto);
    return await this.fornecedorRepository.save(fornecedor);
  }

  async findAll(): Promise<Fornecedor[]> {
    return await this.fornecedorRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(
        `Fornecedor com ID "${id}" não encontrado`,
      );
    }

    return fornecedor;
  }

  async findByName(name: string): Promise<Fornecedor[]> {
    return await this.fornecedorRepository.find({
      where: { name: Like(`%${name}%`) },
      order: { name: 'ASC' },
    });
  }

  async update(
    id: string,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);

    // Verificar se o novo nome já existe (se estiver sendo alterado)
    if (
      updateFornecedorDto.name &&
      updateFornecedorDto.name !== fornecedor.name
    ) {
      const existingFornecedor = await this.fornecedorRepository.findOne({
        where: { name: updateFornecedorDto.name },
      });

      if (existingFornecedor) {
        throw new ConflictException(
          `Fornecedor com nome "${updateFornecedorDto.name}" já existe`,
        );
      }
    }

    // Verificar se o novo email já existe (se estiver sendo alterado)
    if (
      updateFornecedorDto.email &&
      updateFornecedorDto.email !== fornecedor.email
    ) {
      const existingEmail = await this.fornecedorRepository.findOne({
        where: { email: updateFornecedorDto.email },
      });

      if (existingEmail) {
        throw new ConflictException(
          `Email "${updateFornecedorDto.email}" já está em uso`,
        );
      }
    }

    Object.assign(fornecedor, updateFornecedorDto);
    return await this.fornecedorRepository.save(fornecedor);
  }

  async remove(id: string): Promise<void> {
    const fornecedor = await this.findOne(id);
    await this.fornecedorRepository.remove(fornecedor);
  }

  async count(): Promise<number> {
    return await this.fornecedorRepository.count();
  }
}
