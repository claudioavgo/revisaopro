# RevisaoPro 🚀

Uma plataforma inteligente de estudos que utiliza Inteligência Artificial para transformar qualquer conteúdo em material de revisão otimizado. Faça upload de documentos, vídeos ou áudios e receba automaticamente resumos, flashcards e quizzes personalizados.

## ✨ Funcionalidades

- 📄 **Upload de Documentos**: Suporte para PDF, DOCX, TXT e outros formatos de texto
- 🎥 **Processamento de Vídeos**: MP4, AVI, MOV com transcrição automática
- 🎵 **Análise de Áudios**: MP3, WAV, M4A com extração de conteúdo
- 🤖 **IA Avançada**: Geração automática de resumos inteligentes
- 🗂️ **Flashcards**: Criação automática de cartões de memorização
- 📝 **Quizzes**: Questionários personalizados baseados no conteúdo
- 🔐 **Autenticação**: Login com Google ou email
- 💾 **Armazenamento Seguro**: Upload e armazenamento na AWS S3
- 📊 **Dashboard**: Interface intuitiva para gerenciar seus estudos

## 🏗️ Arquitetura

O projeto é dividido em duas aplicações principais:

### Backend (`/server`)

- **Framework**: NestJS com TypeScript
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **IA**: Integração com OpenAI e Google AI
- **Armazenamento**: AWS S3 para arquivos
- **Autenticação**: JWT + Passport (Google OAuth)
- **Documentação**: Swagger/OpenAPI

### Frontend (`/web`)

- **Framework**: Next.js 15 com React 19
- **Estilização**: TailwindCSS + shadcn/ui
- **Estado**: TanStack Query (React Query)
- **Validação**: React Hook Form + Zod
- **Animações**: Framer Motion
- **Tema**: Sistema de temas dark/light

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL
- Conta AWS (S3)
- Chaves de API (OpenAI/Google AI)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/RevisaoPro.git
cd RevisaoPro
```

### 2. Configuração do Backend

```bash
cd server
npm install
```

#### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `server`:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/RevisaoPro"

# JWT
JWT_SECRET="seu-jwt-secret-aqui"

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# OpenAI
OPENAI_API_KEY="sua-openai-api-key"

# Google AI
GOOGLE_AI_API_KEY="sua-google-ai-api-key"

# AWS S3
AWS_ACCESS_KEY_ID="sua-aws-access-key"
AWS_SECRET_ACCESS_KEY="sua-aws-secret-key"
AWS_BUCKET_NAME="seu-bucket-s3"
AWS_REGION="us-east-1"

# App
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

#### Configuração do Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# (Opcional) Visualizar banco
npx prisma studio
```

### 3. Configuração do Frontend

```bash
cd web
npm install
```

#### Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `web`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd web
npm run dev
```

A aplicação estará disponível em:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Documentação da API: http://localhost:3001/docs

### Produção

```bash
# Backend
cd server
npm run build
npm run prod

# Frontend
cd web
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
RevisaoPro/
├── server/                     # Backend NestJS
│   ├── src/
│   │   ├── core/              # Módulos principais
│   │   │   ├── auth/          # Autenticação
│   │   │   ├── document/      # Gerenciamento de documentos
│   │   │   ├── upload/        # Upload de arquivos
│   │   │   └── ...
│   │   ├── infra/             # Infraestrutura
│   │   │   ├── ai/            # Serviços de IA
│   │   │   └── storage/       # Armazenamento
│   │   ├── shared/            # Módulos compartilhados
│   │   └── lib/               # Bibliotecas utilitárias
│   ├── prisma/                # Schema e migrações
│   └── package.json
│
├── web/                       # Frontend Next.js
│   ├── src/
│   │   ├── app/               # App Router
│   │   │   ├── dashboard/     # Dashboard principal
│   │   │   └── auth/          # Páginas de autenticação
│   │   ├── components/        # Componentes React
│   │   │   ├── ui/            # Componentes base (shadcn)
│   │   │   ├── landing/       # Landing page
│   │   │   └── modals/        # Modais
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilitários
│   │   ├── services/          # Serviços de API
│   │   └── types/             # Tipos TypeScript
│   └── package.json
│
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend (`/server`)

```bash
npm run dev         # Desenvolvimento com hot reload
npm run build       # Build para produção
npm run start       # Execução normal
npm run prod        # Execução em produção
npm run lint        # Linting
npm run test        # Testes unitários
```

### Frontend (`/web`)

```bash
npm run dev         # Desenvolvimento com Turbopack
npm run build       # Build para produção
npm run start       # Execução em produção
npm run lint        # Linting
```

## 🧪 Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem principal
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Passport** - Autenticação
- **OpenAI SDK** - Integração com GPT
- **AWS S3** - Armazenamento de arquivos
- **PDF Parse** - Extração de texto de PDFs
- **Jest** - Testes

### Frontend

- **Next.js 15** - Framework React
- **React 19** - Biblioteca de UI
- **TypeScript** - Linguagem principal
- **TailwindCSS** - Framework CSS
- **shadcn/ui** - Componentes de UI
- **TanStack Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **Lucide** - Ícones

## 🔐 Autenticação

O sistema suporta dois métodos de autenticação:

1. **Email/Senha**: Registro tradicional com email
2. **Google OAuth**: Login com conta Google

Tokens JWT são utilizados para manter as sessões ativas.

## 🤖 Integração com IA

A plataforma integra com múltiplos provedores de IA:

- **OpenAI GPT**: Para geração de resumos e questões
- **Google AI**: Como alternativa para processamento
- **Processamento de PDF**: Extração automática de texto
- **Análise de Conteúdo**: Criação inteligente de flashcards

## 📊 Banco de Dados

### Modelos Principais

- **User**: Informações do usuário
- **Account**: Contas de autenticação (Google, email)
- **Document**: Documentos processados
- **Upload**: Arquivos enviados
- **Flashcard**: Cartões de memorização
- **Question**: Questões geradas

## 🚀 Deploy

### Backend (Recomendado: Railway/Heroku)

1. Configure as variáveis de ambiente
2. Execute as migrações do banco
3. Faça deploy do código

### Frontend (Recomendado: Vercel)

1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🐛 Problemas Conhecidos

- Upload de arquivos muito grandes pode causar timeout
- Processamento de vídeos longos demora mais tempo
- Alguns PDFs com formatação complexa podem ter extração incompleta

## 📞 Suporte

Para dúvidas ou problemas:

- Abra uma [issue](https://github.com/seu-usuario/RevisaoPro/issues)
- Entre em contato: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

---

**RevisaoPro** - Transformando conhecimento em aprendizado eficiente! 🎓✨
