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
- PostgreSQL database (local or hosted, e.g., Supabase)

### Environment Setup
1. **Database Configuration**
   - Set up a PostgreSQL database (local or Supabase)
   - Copy environment variables and update `packages/utils/db.ts` if needed
   - Run database migrations:
     ```sh
     npx prisma migrate dev
     npx prisma db seed
     ```

### Install dependencies
```sh
pnpm install
```

### Develop all apps/packages
```sh
pnpm turbo dev
```

Individual app development:
```sh
# Student-facing app (port 3000)
pnpm turbo dev --filter=web

# Admin dashboard (port 3001)
pnpm turbo dev --filter=admin

# Tutor dashboard (port 3002)
pnpm turbo dev --filter=tutor

# Documentation (port 3003)
pnpm turbo dev --filter=docs
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
- **Authentication:** NextAuth.js v4.24.6 with role-based access control
- **Monorepo Tooling:** Turborepo, pnpm
- **Testing:** Playwright (E2E), Vitest (unit/integration)
- **Deployment:** Vercel

## Authentication System

Infinity English uses [NextAuth.js](https://next-auth.js.org/) for authentication across all apps with role-based access control.

### Role-Based Access Control
- **Web App** (`/apps/web`): All user roles (STUDENT, ADMIN, TUTOR) can access
- **Admin App** (`/apps/admin`): Only ADMIN role can access
- **Tutor App** (`/apps/tutor`): Only TUTOR role can access

### How Authentication Works
- **Provider:** Credentials (email/password) with bcrypt password hashing
- **Session Management:** JWT strategy with user ID and role persistence
- **Access Control:** Server-side session checks with automatic redirects
- **Login Pages:** Each app has its own `/login` route

### Database Schema
Users are stored with the following roles:
- `STUDENT`: Medical professionals preparing for exams
- `ADMIN`: Platform administrators with full access
- `TUTOR`: Instructors with student interaction capabilities

### Adding Users
1. **Via Database Seeding:**
   ```sh
   npx prisma db seed
   ```

2. **Manual Password Hashing:**
   ```js
   // In a Node.js REPL or script
   const bcrypt = require('bcrypt');
   const hashedPassword = bcrypt.hashSync('yourpassword', 10);
   console.log(hashedPassword);
   ```

3. **Direct Database Insertion:**
   ```sql
   INSERT INTO "User" (email, password, name, role) 
   VALUES ('admin@test.com', '$hashed_password', 'Admin User', 'ADMIN');
   ```

### Testing Authentication
1. **Start development servers:**
   ```sh
   pnpm turbo dev
   ```

2. **Access login pages:**
   - Web App: `http://localhost:3000/login`
   - Admin App: `http://localhost:3001/login`
   - Tutor App: `http://localhost:3002/login`

3. **Test role-based access:**
   - Try accessing admin dashboard with non-admin credentials
   - Verify automatic redirects work correctly

### API Health Checks
Each app includes a `/api/health` endpoint for monitoring database connectivity:
- Web: `http://localhost:3000/api/health`
- Admin: `http://localhost:3001/api/health`
- Tutor: `http://localhost:3002/api/health`

## Development Status

### ✅ Completed Features
- **Monorepo Architecture**: Turborepo + pnpm workspace setup
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication System**: NextAuth.js with role-based access control
- **Role-Based Routing**: Automatic redirects and session management
- **Build System**: All apps compile successfully with TypeScript
- **API Infrastructure**: Health endpoints and database connectivity

### 🚧 Next Development Priorities
1. **UI Enhancement**: Implement shadcn/ui design system
2. **User Registration**: Signup flow and user onboarding
3. **Student Dashboard**: Learning modules and progress tracking
4. **Content Management**: Admin tools for course creation
5. **Tutor Tools**: Student interaction and assessment features

## Contributing
1. Fork the repo and create your branch from `main`.
2. Make your changes and add tests as needed.
3. Run `pnpm turbo lint && pnpm turbo build && pnpm turbo test` before submitting a PR.

## License
[MIT](LICENSE)
