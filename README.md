# Infinity English

Infinity English is an AI-powered, global e-learning platform designed to help medical professionals and students prepare for high-stakes English language exams, starting with OET (Occupational English Test) for Doctors and Nurses.

## Vision
- Scalable, SEO-optimized, and performance-driven
- Structured using global software engineering standards
- Architected for long-term growth (IELTS, other exams, AI-driven tools)
- Clear separation of concerns: Students, Admins, and Tutors each have isolated, role-specific environments
- Built as a monorepo for unified code management and scalable development

## Monorepo Structure
```
apps/
  web/      # Main Student-facing App (Doctors/Nurses/other future exams)
  admin/    # Internal Admin Dashboard (Analytics, User Management)
  tutor/    # Dedicated Tutor Dashboard (Minimal, role-specific tools)
  docs/     # Internal documentation (not user-facing)
packages/
  ui/       # Shared Design System, Components
  utils/    # Shared Utilities (helpers, date functions, etc.)
  types/    # Global TypeScript Interfaces and Enums
  config/   # Central App Configuration (roles, exam types, constants)
  eslint-config/ # Shared ESLint config
  typescript-config/ # Shared TypeScript config
prisma/     # Database schema and migration scripts
turbo.json  # Turborepo task orchestration
pnpm-workspace.yaml # Workspace management
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)

### Install dependencies
```sh
pnpm install
```

### Develop all apps/packages
```sh
pnpm turbo dev
```

### Build all apps/packages
```sh
pnpm turbo build
```

### Run linting
```sh
pnpm turbo lint
```

## Core Tech Stack
- **Frontend:** Next.js App Router, TypeScript, TailwindCSS, shadcn/ui
- **Backend/API:** Next.js API Routes, scalable to microservices
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js or Supabase Auth
- **Monorepo Tooling:** Turborepo, pnpm
- **Testing:** Playwright (E2E), Vitest (unit/integration)
- **Deployment:** Vercel

## Role-Based Platform Logic
- **Student:** Personalized learning modules by exam type
- **Admin:** Full platform management, analytics, user/tutor control
- **Tutor:** Focused dashboard for student interaction and content

## Authentication Setup

Infinity English uses [NextAuth.js](https://next-auth.js.org/) for authentication in the `web` app.

### How it works
- Credentials (email/password) provider is enabled for MVP.
- User passwords are securely hashed with bcrypt.
- User sessions include `id` and `role` for role-based access.
- Login page is available at `/login`.

### Adding Users
- Users must be present in the database with a hashed password.
- You can add users via a seed script, admin panel (future), or directly in the database.
- To hash a password for manual insertion, use bcrypt:
  ```js
  // In a Node.js REPL or script
  const bcrypt = require('bcrypt');
  bcrypt.hashSync('yourpassword', 10);
  ```

### Testing Login
1. Start the dev server:
   ```sh
   pnpm turbo dev --filter=web
   ```
2. Go to `http://localhost:3000/login`.
3. Sign in with a valid email and password.

### Extending Authentication
- You can add social providers (Google, GitHub, etc.) by updating the NextAuth config in `/app/api/auth/[...nextauth]/route.ts`.
- Session includes user role for role-based routing and access control.

## Contributing
1. Fork the repo and create your branch from `main`.
2. Make your changes and add tests as needed.
3. Run `pnpm turbo lint && pnpm turbo build && pnpm turbo test` before submitting a PR.

## License
[MIT](LICENSE)
