# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm dev` (uses Next.js with Turbopack)
- **Build**: `npm build`
- **Start production**: `npm start`
- **Linting**: `npm lint` (ESLint with Next.js config)
- **Database**: `npx prisma db push` (sync schema), `npx prisma migrate dev` (create migrations), `npx prisma generate` (generate client)
- **Package manager**: Uses `npm` (not pnpm/yarn)

## Architecture Overview

This is a Next.js 15 application with TypeScript that processes documents/content to generate study materials (summaries, flashcards, quizzes).

### Core Technologies

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with Google OAuth
- **UI**: Tailwind CSS + shadcn/ui components
- **AI**: OpenAI API for content processing
- **File uploads**: S3 integration

### Key Architecture Patterns

**Database Schema**: All models use UUID primary keys. Custom Prisma client output to `src/generated/prisma/`. Main entities:

- `User` (auth, subscriptions)
- `Project` (content processing units with status tracking)
- `Flashcard` and `Question` (generated study materials)
- `Subscription` (billing/plans)

**Content Processing Pipeline**:

1. Projects created via file upload, URL, or text input
2. Content extracted and processed through AI services
3. Structured summaries and study materials generated
4. Real-time streaming updates to UI during processing

**Service Layer**: All business logic in `/src/services/` with clear separation:

- `ai.service.ts`: OpenAI integration
- `content-processor.service.ts`: Document parsing/processing
- `project.service.ts`: Project lifecycle management
- `flashcard.service.ts` & `question.service.ts`: Study material generation

**Authentication Flow**: Uses Better Auth with Prisma adapter. Session-based auth with Google OAuth provider.

### File Organization

- `/src/app/` - App Router pages and API routes
- `/src/components/ui/` - shadcn/ui reusable components
- `/src/components/landing/` - Landing page specific components
- `/src/lib/` - Utilities, auth configuration, database client
- `/src/services/` - Business logic layer
- `/src/types/` - TypeScript schemas and validation
- `/src/enums/` - Shared enum definitions
- `/prisma/` - Database schema and migrations

### AI Integration Specifics

The system uses two main AI prompts (in `/src/config/prompts.ts`):

- `SYSTEM_INSTRUCTION`: Generates structured summaries with embedded flashcards
- `QUIZ_INSTRUCTION`: Creates quiz questions (multiple choice, true/false, free response)

Content processing is streaming-based with real-time updates via Server-Sent Events.

### Code Style & Standards

- ESLint with Next.js + TypeScript + Prettier config
- Import organization via `simple-import-sort` plugin
- Tailwind CSS with custom configuration
- Zod for runtime validation
- All forms use `react-hook-form` with `@hookform/resolvers`

### Key Development Notes

- Prisma client generates to non-standard location (`src/generated/prisma/`)
- Uses custom path aliases: `@/` maps to `src/`
- Database enums match TypeScript enums in `/src/enums/`
- Project status tracking: `PENDING` → `PROCESSING` → `COMPLETED`/`FAILED`
- All user actions require authentication checks
