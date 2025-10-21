import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { config } from './ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Especifica o caminho do .env
    }),
    TypeOrmModule.forRoot(config), 
    ProdutoModule,
    CategoriaModule,
    FornecedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
