# Next.js Frontend

A modern, production-ready Next.js starter template with comprehensive tooling.

## Features

- ⚡️ **Next.js 16** - Latest App Router with React 19
- 🎨 **UI Components** - Shadcn UI with Tailwind CSS
- 🔍 **Type Safety** - TypeScript with strict mode
- 🧪 **Testing** - Jest unit tests + Playwright E2E
- 🎯 **Code Quality** - ESLint, Prettier, Stylelint, Husky, Commitlint
- 🌙 **Theme Support** - Dark mode with next-themes

## Tech Stack

### Core

- [Next.js 16](https://nextjs.org/) - React framework

**This README is a concise developer guide — use the scripts in `package.json` for common tasks.**

**Requirements**

- Node.js >= 22
- `pnpm` >= 10 (the repo enforces pnpm in `preinstall`)

**Quick start**

1. Clone and enter the repo

```bash
git clone https://github.com/er-santosh/nextjs-frontend.git
cd nextjs-frontend
```

2. Install dependencies

```bash
pnpm install
```

3. Copy environment variables and edit `.env`

```bash
cp .env.example .env
# then update values in .env (NEXT_PUBLIC_API_URL etc.)
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

- `pnpm dev` — Run development
- `pnpm build` — Next Build
- `pnpm start` — Next Start Production

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

**Where to find things**

- Application code: `src/` (App Router in `src/app`)
- Components: `src/components`
- Tests: unit tests alongside code, Playwright in `e2e/`

**Engines & package manager**

This project enforces `pnpm` (see `preinstall`) and expects Node >= 22. The repo uses `pnpm@10` in `packageManager`.
