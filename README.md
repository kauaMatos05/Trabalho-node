# User CRUD API

API REST para gerenciamento de usuários com Node.js + TypeScript.

## O que foi feito

### 1. Iniciar o projeto
```bash
npm init -y
```

### 2. Instalar dependências
```bash
npm install nodemon express typeorm reflect-metadata sqlite3@5.1.7 zod dotenv
npm install -D typescript ts-node @types/express @types/node
```

### 3. Configurar o tsconfig.json
```bash
npx tsc --init
```

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  }
}
```
### 4. Configurar o nodemon.json

Crie o arquivo `nodemon.json` na raiz do projeto:

```json
{
  "ignore": [
    ".git",
    "node_modules",
    "dist"
  ],
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node ./src/server.ts"
}
```

E atualize o `package.json` com os scripts:

```json
"scripts": {
  "dev": "nodemon",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## 📁 Próximos passos

### 5. Criar as pastas
```powershell
New-Item -ItemType Directory -Path src\entities, src\schemas, src\repositories, src\controllers, src\routes -Force
```

### 6. Criar os arquivos em src/

A ordem de criação dos arquivos:

| Arquivo | Descrição |
|---------|-----------|
| `src/data-source.ts` | Configura a conexão com o banco SQLite |
| `src/entities/User.ts` | Define a tabela de usuários no banco |
| `src/schemas/userSchema.ts` | Validações com Zod |
| `src/repositories/UserRepository.ts` | Funções que acessam o banco |
| `src/controllers/UserController.ts` | Lógica de cada rota |
| `src/routes/userRoutes.ts` | Define as rotas da API |
| `src/server.ts` | Inicializa o Express e sobe o servidor |

## ✅ Projeto concluído

### Estrutura final

src/
├── server.ts
├── data-source.ts
├── entities/
│   └── User.ts
├── schemas/
│   └── userSchema.ts
├── repositories/
│   └── UserRepository.ts
├── controllers/
│   └── UserController.ts
└── routes/
└── userRoutes.ts


### Rotas disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/users` | Cadastrar usuário |
| GET | `/users` | Listar todos |
| GET | `/users/:id` | Buscar por ID |
| PATCH | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Deletar usuário |

### Como rodar

```bash
npm run dev
```

Servidor iniciará em `http://localhost:3000`.

### Exemplo de body (POST /users)

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "idade": 22
}
```