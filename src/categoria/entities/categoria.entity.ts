import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Informações Básicas
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, nullable: true, comment: 'Ícone para UI (ex: 🍎, 🥕)' })
  icon: string;

  // Categoria Pai (para subcategorias)
  @Column({ name: 'parent_id', type: 'uuid', nullable: true })
  idCategoriaPai: string;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}