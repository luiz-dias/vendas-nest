import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API VENDAS-NEST')
    .setDescription('API para gerenciamento de VENDAS')
    .setVersion('1.0')
    .addTag('Categorias')
    .addTag('Fornecedores')
    .addTag('Produtos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Servidor rodando em: http://localhost:3000');
  console.log('📚 Documentação Swagger: http://localhost:3000/api');
  
}
bootstrap();
