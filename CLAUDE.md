# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm test             # Run Jest unit tests
pnpm test:watch       # Jest in watch mode
pnpm test:coverage    # Jest with coverage report
pnpm test:e2e         # Run Playwright E2E tests
pnpm lint             # ESLint + Stylelint (0 warnings allowed)
pnpm lint:fix         # Auto-fix lint issues
pnpm format           # Prettier format all files
pnpm type-check       # TypeScript type check (no emit)
pnpm exec next typegen  # Generate .next/types/routes.d.ts (run before type-check in CI)
pnpm validate         # type-check + lint + format:check in parallel
pnpm validate:fix     # lint:fix + format sequentially
```

Run a single Jest test file:

```bash
pnpm test -- path/to/file.test.ts
```

**Requirements:** Node >= 24, pnpm >= 10 (enforced — npm/yarn/bun blocked).

## Architecture

### Route Groups (App Router)

`src/app/` uses Next.js App Router with three route groups:

- `(site)` — Public marketing pages (`/`, `/pricing`, `/contact`)
- `(auth)` — Authentication pages (`/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`)
- `(protected)` — Authenticated-only pages (`/dashboard`, `/settings/account`)

Route protection is enforced by `src/proxy.ts` (the Next.js middleware), which reads the `accessToken` cookie and redirects unauthenticated users to `/login?callbackUrl=...`.

### Feature Modules

Business logic lives in `src/features/<feature>/`:

- `components/` — Feature-specific React components
- `hooks/` — Feature-specific hooks (mutations/queries for that domain)

Features: `auth`, `account`, `contact`, `landing`, `pricing`

### HTTP Layer

Three-tier Axios architecture:

1. **`BaseRequest`** (`src/services/requests/base.ts`) — Abstract class with typed `get/post/patch/put/delete` methods
2. **`AuthenticatedRequest`** (`src/services/requests/authenticated.ts`) — Extends `BaseRequest`, adds 401 interceptor that automatically refreshes tokens via `/auth/refresh`. Uses `TokenRefreshQueue` to queue concurrent requests during a refresh. On failure, clears cookies and redirects to login.
3. **`UnauthenticatedRequest`** (`src/services/requests/unauthenticated.ts`) — Extends `BaseRequest` for public API calls

Service instances are used directly (e.g., `authService` in `src/services/auth.ts`).

### Data Fetching

TanStack Query with two generic wrapper hooks:

- **`useApiQuery`** (`src/hooks/api/use-api-query.ts`) — Wraps `useQuery` with optional error toast and `onError` callback
- **`useApiMutation`** (`src/hooks/api/use-api-mutation.ts`) — Wraps `useMutation` with auto error/success toasts via Sonner

Query keys are centralized in `src/constants/query-keys.ts`.

### Auth Tokens

`CookieStorage` (`src/lib/cookie-storage.ts`) manages `accessToken` (1 day) and `refreshToken` (7 days) cookies via `js-cookie`. The middleware reads cookies server-side; the client reads them via `CookieStorage`.

### Environment

`src/config/env.ts` uses `@t3-oss/env-nextjs` with Zod validation. Key variable: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000/api/v1`). Set `SKIP_ENV_VALIDATION=1` to bypass (e.g., Docker builds).

### Path Aliases

`@/*` maps to `src/*`. Also available: `@/public/*`, `@/prisma/*`, `@/generated/*`.

### Providers Stack

`AppProvider` wraps the app in: `VercelProvider` → `QueryClientProvider` → `ThemeProvider` → `NextTopLoader` + `Toaster` (Sonner).

### Shared Utilities

- `src/lib/utils/classname.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/utils/transformer.ts` — Data transformation utilities
- `src/constants/app-routes.ts` — Centralized route constants (`APP_ROUTES`, `PUBLIC_ROUTES`, `AUTH_ROUTES`)
- `src/schemas/` — Zod schemas for forms (auth, profile, inquiry)
- `src/types/` — Shared TypeScript types (`ApiResponse` shape, auth types)

### UI Components

Shadcn UI components in `src/components/ui/`. Custom shared components in `src/components/shared/`. Form field wrappers in `src/components/form-fields/`.

### Code Style

**TypeScript:**

- No `any` — use `unknown` and narrow, or specific types
- Prefer `interface` for object shapes, `type` for unions/primitives
- Export types from `src/types/`; export Zod schemas from `src/schemas/`

**Naming:**

- Components: `PascalCase` | Hooks: `use-kebab-case.ts` | Files: `kebab-case.ts`
- Boolean props/vars: prefix with `is`, `has`, `can` (e.g., `isLoading`)

**Imports:**

- Use `@/*` alias for all internal imports
- Import order (enforced by ESLint): React → Next → third-party → internal → types

### Component Guidelines

**Default to Server Components.** Only add `'use client'` when the component needs:

- `useState` / `useReducer` / `useEffect`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser-only APIs (`window`, `localStorage`)
- TanStack Query hooks (`useApiQuery`, `useApiMutation`)

**Split pattern:** Server parent fetches data → passes props to a Client child for interaction.

**Route file conventions:**

- `loading.tsx` — skeleton/spinner for that route segment
- `error.tsx` — error boundary with reset button
- `not-found.tsx` — 404 within a route group

### Performance

- **Parallel fetching:** Use `Promise.all` for independent server-side fetches — never sequential `await` chains
  ```ts
  const [user, settings] = await Promise.all([fetchUser(), fetchSettings()]);
  ```
- **Dynamic imports:** Lazy-load heavy client components (charts, rich editors, modals not in critical path)
  ```ts
  const Chart = dynamic(() => import("./chart"), { ssr: false });
  ```
- **Images:** Always use `next/image`. Set `priority` for above-the-fold images.
- **Re-renders:** Avoid creating objects/arrays/functions inline in JSX props — hoist or memoize.

### Gotchas

- **Middleware file is `src/proxy.ts`** — not the standard `middleware.ts`. Do not create a new middleware file.
- **Token refresh:** `AuthenticatedRequest` handles concurrent 401s via `TokenRefreshQueue` automatically — do not add manual retry logic in feature hooks.
- **Always use wrapper hooks:** Use `useApiQuery` / `useApiMutation` (never raw `useQuery` / `useMutation`) so toasts and error handling are consistent.
- **Query keys:** All new keys go in `src/constants/query-keys.ts` — never inline string keys.
- **Shadcn components:** Do not modify files in `src/components/ui/` directly — extend via wrappers in `src/components/shared/`.
- **Env vars:** Add new variables to `src/config/env.ts` with Zod validation — never read `process.env` directly in components.
- **CI type-check:** `pnpm exec next typegen` (with `SKIP_ENV_VALIDATION=1`) must run before `pnpm type-check` in CI — App Router requires `.next/types/routes.d.ts` or tsc fails on `next-env.d.ts`.
- **pnpm CI:** `pnpm/action-setup@v4` reads version from `packageManager` in `package.json` — never set `version:` in the workflow, it conflicts.
- **Contact service:** `src/services/contact.ts` — `contactService.submitInquiry()` posts to `/contact/inquiry`.

### CI / Tooling

- **GitHub Actions:** `.github/workflows/ci.yml` — runs `next typegen` → `type-check` → `lint` → `test --ci --coverage` → `build` on push/PR to `main`.
- **Sentry:** `@sentry/nextjs` installed. Config: `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`. DSN env vars: `NEXT_PUBLIC_SENTRY_DSN` (client), `SENTRY_DSN` (server) — both optional in `src/config/env.ts`.
- **Worktrees:** Feature branches use git worktrees under `.worktrees/<name>/`. Pre-push hook runs `type-check` + `test` automatically.

### Commit Convention

Commitlint enforces Conventional Commits. Pre-commit hooks (Husky + lint-staged) auto-fix lint/format issues on staged files.
