import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';


@Entity('fornecedor')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;


  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  telefone: string;


  // Financeiro
  @Column({ name: 'bank_name', length: 100, nullable: true })
  chavepix: string;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}