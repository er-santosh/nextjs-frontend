# Next.js Starter

A modern, production-ready Next.js starter template with authentication, database integration, and comprehensive tooling.

## Features

- ⚡️ **Next.js 16** - Latest App Router with React 19
- 🔐 **Authentication** - Better Auth with Google OAuth
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 📧 **Email** - React Email with Resend
- 🎨 **UI Components** - Shadcn UI with Tailwind CSS
- 🔍 **Type Safety** - TypeScript with strict mode
- 🧪 **Testing** - Jest unit tests + Playwright E2E
- 📊 **API Layer** - tRPC for type-safe APIs
- 🎯 **Code Quality** - ESLint, Prettier, Stylelint, Husky, Commitlint
- 🌙 **Theme Support** - Dark mode with next-themes

## Tech Stack

### Core

- [Next.js 16](https://nextjs.org/) - React framework

# Next.js Starter

A production-ready Next.js + TypeScript starter with authentication, Prisma, tRPC, Playwright, and developer tooling.

**This README is a concise developer guide — use the scripts in `package.json` for common tasks.**

**Requirements**

- Node.js >= 22
- `pnpm` >= 10 (the repo enforces pnpm in `preinstall`)
- PostgreSQL (or any database supported by Prisma)

**Quick start**

1. Clone and enter the repo

```bash
git clone https://github.com/er-santosh/nextjs-starter.git
cd nextjs-starter
```

2. Install dependencies

```bash
pnpm install
```

3. Copy environment variables and edit `.env`

```bash
cp .env.example .env
# then update values in .env (DATABASE_URL, OAuth keys, RESEND_API_KEY, etc.)
```

4. (Optional) Install Playwright browsers for E2E testing

```bash
pnpm setup
```

5. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

**Important scripts**

- `pnpm dev` — Run development (starts database migration dev step then Next dev)
- `pnpm dev:next` — Run only Next.js dev server
- `pnpm dev:email` — Start the React Email dev/preview (templates in `src/email-templates`)
- `pnpm build` — Build (runs Prisma generate then Next build)
- `pnpm start` — Start (runs Prisma migration deploy then Next start)

**Database (Prisma)**

Script names map to Prisma commands (see `package.json`):

- `pnpm db:generate` — `prisma generate` (generate client)
- `pnpm db:migration:dev` — `prisma migrate dev` (create & apply migration in dev)
- `pnpm db:migration:create` — `prisma migrate dev -- --name <name>` (create new migration)
- `pnpm db:migration:deploy` — `prisma migrate deploy` (apply migrations in CI/production)
- `pnpm db:push` — `prisma db push` (push schema to the db without migrations)
- `pnpm db:studio` — `prisma studio` (GUI for exploring data)

Typical local workflow:

```bash
# generate client
pnpm db:generate

# create & apply migration (development)
pnpm db:migration:dev

# or just push schema (fast for prototyping)
pnpm db:push
```

**Testing**

- Unit tests: `pnpm test` (Jest)
- Playwright E2E: `pnpm test:e2e`
- Playwright report: `pnpm test:e2e:report`

To install Playwright browsers (if not done during first setup):

```bash
pnpm setup
```

**Code quality & tooling**

- Lint JavaScript/TypeScript: `pnpm lint`
- Fix lint: `pnpm lint:fix`
- Format: `pnpm format`
- Type check: `pnpm type-check`
- Validate (type + lint + format check): `pnpm validate`

Pre-commit hooks via Husky & lint-staged will format and lint staged files.

**Email templates**

Templates live under `src/email-templates`. Use the email preview (script `dev:email`) to iterate locally.

```bash
pnpm dev:email
```

**Deployment notes**

- Ensure all environment variables from `.env` are set in production (notably `DATABASE_URL`, OAuth credentials, `RESEND_API_KEY`, and `BETTER_AUTH_SECRET`).
- Use `pnpm build` then `pnpm start` (or deploy to Vercel with appropriate environment variables).
- In CI/production, run `pnpm db:migration:deploy` to apply migrations before starting the app.

**Where to find things**

- Application code: `src/` (App Router in `src/app`)
- Components: `src/components`
- Prisma schema & migrations: `prisma/`
- Generated Prisma client: `generated/prisma/client.ts`
- Email templates: `src/email-templates`
- Tests: unit tests alongside code, Playwright in `e2e/`

**Engines & package manager**

This project enforces `pnpm` (see `preinstall`) and expects Node >= 22. The repo uses `pnpm@10` in `packageManager`.

**Need help or want to contribute?**

Open an issue or a pull request on the repository. Follow Conventional Commits for commit messages.

---

Built with ❤️ using Next.js
