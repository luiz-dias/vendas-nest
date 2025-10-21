import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria, Fornecedor])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
   exports: [ProdutoService],
})
export class ProdutoModule {}
