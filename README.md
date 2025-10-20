# 🛒 Vendas-nest

API REST completa para sistema de vendas desenvolvida com NestJS, TypeORM e PostgreSQL.

## 📋 Sobre o Projeto

Sistema robusto de gerenciamento de vendas que oferece controle total sobre produtos, categorias, fornecedores e estoque. Desenvolvido seguindo as melhores práticas de arquitetura limpa e padrões de design.

## ✨ Features

### 📦 Gestão de Produtos
- CRUD completo de produtos
- Busca avançada por nome, categoria e fornecedor
- Filtro por faixa de preço
- Controle de produtos ativos/inativos
- Soft delete com possibilidade de restauração
- Múltiplas unidades de medida (KG, UN, LT, etc.)

### 🏷️ Gestão de Categorias
- Criação de categorias e subcategorias
- Hierarquia de categorias
- Ícones personalizados para cada categoria

### 🤝 Gestão de Fornecedores
- Cadastro completo de fornecedores
- Informações de contato e pagamento (Chave PIX)
- Busca por nome
- Vínculo com produtos

### 📊 Controle de Estoque
- Monitoramento de quantidade em estoque
- Alertas de estoque baixo
- Atualização individual de estoque por produto

### 💰 Precificação Inteligente
- Preço de custo e preço de venda
- Cálculo automático de margem de lucro
- Suporte a preços promocionais
- Validação para evitar prejuízo (venda < custo)

### 📚 Documentação
- Swagger/OpenAPI integrado
- Documentação interativa de todos os endpoints
- Exemplos de requisições e respostas
- Possibilidade de testar API direto no navegador

## 🛠️ Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de dados
- **[Swagger](https://swagger.io/)** - Documentação de API

## 📁 Estrutura do Projeto

```
src/
├── categoria/
│   ├── dto/
│   │   ├── create-categoria.dto.ts
│   │   └── update-categoria.dto.ts
│   ├── entities/
│   │   └── categoria.entity.ts
│   ├── categoria.controller.ts
│   ├── categoria.service.ts
│   └── categoria.module.ts
├── fornecedor/
│   ├── dto/
│   ├── entities/
│   ├── fornecedor.controller.ts
│   ├── fornecedor.service.ts
│   └── fornecedor.module.ts
├── produto/
│   ├── dto/
│   ├── entities/
│   ├── produto.controller.ts
│   ├── produto.service.ts
│   └── produto.module.ts
├── app.module.ts
└── main.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/vendas-nest.git
cd vendas-nest
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=vendas_nest

# Application
PORT=3000
NODE_ENV=development
```

4. Execute as migrations (se houver)
```bash
npm run migration:run
```

5. Inicie o servidor
```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

6. Acesse a documentação Swagger
```
http://localhost:3000/api
```

## 📡 Endpoints Principais

### Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/categorias` | Criar categoria |
| GET | `/categorias` | Listar todas |
| GET | `/categorias/:id` | Buscar por ID |
| GET | `/categorias/:id/subcategorias` | Listar subcategorias |
| PATCH | `/categorias/:id` | Atualizar |
| DELETE | `/categorias/:id` | Deletar |

### Fornecedores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/fornecedores` | Criar fornecedor |
| GET | `/fornecedores` | Listar todos |
| GET | `/fornecedores/:id` | Buscar por ID |
| GET | `/fornecedores/search?name=` | Buscar por nome |
| PATCH | `/fornecedores/:id` | Atualizar |
| DELETE | `/fornecedores/:id` | Deletar |

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/produtos` | Criar produto |
| GET | `/produtos` | Listar todos |
| GET | `/produtos/ativos` | Listar ativos |
| GET | `/produtos/estoque-baixo` | Estoque baixo |
| GET | `/produtos/search?nome=` | Buscar por nome |
| GET | `/produtos/preco-range?min=&max=` | Filtrar por preço |
| GET | `/produtos/categoria/:id` | Por categoria |
| GET | `/produtos/fornecedor/:id` | Por fornecedor |
| GET | `/produtos/:id` | Buscar por ID |
| PATCH | `/produtos/:id` | Atualizar |
| PATCH | `/produtos/:id/estoque` | Atualizar estoque |
| DELETE | `/produtos/:id` | Deletar (soft) |
| PATCH | `/produtos/:id/restore` | Restaurar |

## 📝 Exemplos de Requisições

### Criar Categoria
```json
POST /categorias
{
  "name": "Frutas",
  "description": "Frutas frescas e selecionadas",
  "icon": "🍎"
}
```

### Criar Fornecedor
```json
POST /fornecedores
{
  "name": "Frutas do Vale Ltda",
  "email": "contato@frutasdovale.com",
  "telefone": "79999887766",
  "chavepix": "12345678000190"
}
```

### Criar Produto
```json
POST /produtos
{
  "nome": "Maçã Gala",
  "categoriaId": "uuid-da-categoria",
  "fornecedorId": "uuid-do-fornecedor",
  "precoCusto": 3.50,
  "precoVenda": 5.90,
  "quantidadeEstoque": 100,
  "unidade": "KG",
  "ativo": true
}
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📄 Licença



## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome](https://github.com/luiz-dias)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request
