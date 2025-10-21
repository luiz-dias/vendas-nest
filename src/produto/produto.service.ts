
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    // Verificar se produto com mesmo nome já existe
    const existingProduto = await this.produtoRepository.findOne({
      where: { nome: createProdutoDto.nome },
    });

    if (existingProduto) {
      throw new ConflictException(
        `Produto com nome "${createProdutoDto.nome}" já existe`,
      );
    }

    // Verificar se categoria existe
    const categoria = await this.categoriaRepository.findOne({
      where: { id: createProdutoDto.categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria com ID "${createProdutoDto.categoriaId}" não encontrada`,
      );
    }

    // Verificar se fornecedor existe (se fornecido)
    if (createProdutoDto.fornecedorId) {
      const fornecedor = await this.fornecedorRepository.findOne({
        where: { id: createProdutoDto.fornecedorId },
      });

      if (!fornecedor) {
        throw new NotFoundException(
          `Fornecedor com ID "${createProdutoDto.fornecedorId}" não encontrado`,
        );
      }
    }

    // Validar preços
    if (createProdutoDto.precoVenda < createProdutoDto.precoCusto) {
      throw new BadRequestException(
        'Preço de venda não pode ser menor que o preço de custo',
      );
    }

    // Calcular margem de lucro se não fornecida
    if (!createProdutoDto.margemLucro) {
      const margem =
        ((createProdutoDto.precoVenda - createProdutoDto.precoCusto) /
          createProdutoDto.precoCusto) *
        100;
      createProdutoDto.margemLucro = Number(margem.toFixed(2));
    }

    // Criar o produto sem os IDs de relacionamento
    const { categoriaId, fornecedorId, ...produtoData } = createProdutoDto;
    
    const produto = this.produtoRepository.create({
      ...produtoData,
      categoria,
      ...(fornecedorId && {
        fornecedor: { id: fornecedorId } as Fornecedor,
      }),
    });

    return await this.produtoRepository.save(produto);
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria', 'fornecedor'],
      order: { nome: 'ASC' },
    });
  }

  async findAtivos(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { ativo: true },
      relations: ['categoria', 'fornecedor'],
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria', 'fornecedor'],
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    return produto;
  }

  async findByCategoria(categoriaId: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria', 'fornecedor'],
      order: { nome: 'ASC' },
    });
  }

  async findByFornecedor(fornecedorId: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { fornecedor: { id: fornecedorId } },
      relations: ['categoria', 'fornecedor'],
      order: { nome: 'ASC' },
    });
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: Like(`%${nome}%`) },
      relations: ['categoria', 'fornecedor'],
      order: { nome: 'ASC' },
    });
  }

  async findByPrecoRange(min: number, max: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { precoVenda: Between(min, max) },
      relations: ['categoria', 'fornecedor'],
      order: { precoVenda: 'ASC' },
    });
  }

  async findEstoqueBaixo(quantidade: number = 10): Promise<Produto[]> {
    return await this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.categoria', 'categoria')
      .leftJoinAndSelect('produto.fornecedor', 'fornecedor')
      .where('produto.quantidadeEstoque <= :quantidade', { quantidade })
      .andWhere('produto.ativo = :ativo', { ativo: true })
      .orderBy('produto.quantidadeEstoque', 'ASC')
      .getMany();
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);

    // Verificar se novo nome já existe (se estiver sendo alterado)
    if (updateProdutoDto.nome && updateProdutoDto.nome !== produto.nome) {
      const existingProduto = await this.produtoRepository.findOne({
        where: { nome: updateProdutoDto.nome },
      });

      if (existingProduto) {
        throw new ConflictException(
          `Produto com nome "${updateProdutoDto.nome}" já existe`,
        );
      }
    }

    // Verificar se categoria existe (se estiver sendo alterada)
    if (updateProdutoDto.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: updateProdutoDto.categoriaId },
      });

      if (!categoria) {
        throw new NotFoundException(
          `Categoria com ID "${updateProdutoDto.categoriaId}" não encontrada`,
        );
      }
      produto.categoria = categoria;
    }

    // Verificar se fornecedor existe (se estiver sendo alterado)
    if (updateProdutoDto.fornecedorId) {
      const fornecedor = await this.fornecedorRepository.findOne({
        where: { id: updateProdutoDto.fornecedorId },
      });

      if (!fornecedor) {
        throw new NotFoundException(
          `Fornecedor com ID "${updateProdutoDto.fornecedorId}" não encontrado`,
        );
      }
      produto.fornecedor = fornecedor;
    }

    // Validar preços
    const precoCusto = updateProdutoDto.precoCusto || produto.precoCusto;
    const precoVenda = updateProdutoDto.precoVenda || produto.precoVenda;

    if (precoVenda < precoCusto) {
      throw new BadRequestException(
        'Preço de venda não pode ser menor que o preço de custo',
      );
    }

    // Recalcular margem de lucro se preços mudaram
    if (updateProdutoDto.precoCusto || updateProdutoDto.precoVenda) {
      const margem = ((precoVenda - precoCusto) / precoCusto) * 100;
      updateProdutoDto.margemLucro = Number(margem.toFixed(2));
    }

    Object.assign(produto, updateProdutoDto);
    return await this.produtoRepository.save(produto);
  }

  async updateEstoque(id: string, quantidade: number): Promise<Produto> {
    const produto = await this.findOne(id);
    produto.quantidadeEstoque = quantidade;
    return await this.produtoRepository.save(produto);
  }

  async remove(id: string): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.softRemove(produto);
  }

  async restore(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    return await this.produtoRepository.recover(produto);
  }

  async count(): Promise<number> {
    return await this.produtoRepository.count();
  }
}