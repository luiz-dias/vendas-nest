import { hostname } from 'os';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true, /* Carrega entidades sem precisar especifica-las */
  synchronize: process.env.NODE_ENV !== 'production', // false em produção
        /* nao deve ser utilizado em producao pois sincroniza e pode apagar tabelas de acordo com estado do codigo*/
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};