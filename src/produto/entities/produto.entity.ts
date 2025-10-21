import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Fornecedor } from '../../fornecedor/entities/fornecedor.entity';

@Entity('produto')
export class Produto {
// ==================== IDENTIFICAÇÃO ====================
  
@PrimaryGeneratedColumn('uuid')
id: string;                

@Column({ length: 200 })
nome: string;


  // ==================== CATEGORIZAÇÃO ====================

  @ManyToOne(() => Categoria, { eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;


  // ==================== PRECIFICAÇÃO ====================

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'preco_custo',
  })
  precoCusto: number; // Preço de custo/compra

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'preco_venda',
  })
  precoVenda: number; // Preço de venda

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'margem_lucro',
    nullable: true,
  })
  margemLucro: number; // Percentual de lucro

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'preco_promocional',
    nullable: true,
  })
  precoPromocional: number; // Preço em promoção


  // ==================== ESTOQUE ====================

  @Column({ name: 'quantidade_estoque', default: 0 })
  quantidadeEstoque: number; // Quantidade atual


  @Column({ length: 50, default: 'UN' })
  unidade: string; // UN, KG, LT, CX, PC, MT, etc.

  // ==================== FORNECEDOR ====================

  @ManyToOne(() => Fornecedor, { eager: false, nullable: true })
  @JoinColumn({ name: 'fornecedor_id' })
  fornecedor: Fornecedor;

  // ==================== CONTROLE ====================

  @Column({ default: true })
  ativo: boolean;

  // ==================== OBSERVAÇÕES ====================

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  // ==================== AUDITORIA ====================

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;}
