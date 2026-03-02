# [Project Name]

> Replace this line with a one-sentence description of what this project does and who it's for (e.g. "Patient management portal for healthcare providers" or "SaaS billing dashboard for subscription businesses").

## Tech Stack

- **Next.js 16** (App Router, RSC), **React 19**
- **TypeScript 5** (strict), **Tailwind CSS v4**, **Shadcn/ui** + Radix UI
- **React Query** (TanStack v5), **React Hook Form**, **Zod**
- **Axios** (with token refresh queue), js-cookie
- **Jest** + Testing Library (unit), **Playwright** (e2e)
- ESLint, Prettier, Stylelint, Husky, Commitlint

## Package Manager

Always use **pnpm**. npm/yarn/bun are blocked by the preinstall hook.

```sh
pnpm install
```

Requires Node >= 24, pnpm >= 10.

## Essential Commands

| Command              | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `pnpm dev`           | Start dev server                            |
| `pnpm build`         | Production build                            |
| `pnpm type-check`    | TypeScript check (no emit)                  |
| `pnpm lint`          | ESLint + Stylelint                          |
| `pnpm lint:fix`      | Auto-fix lint errors                        |
| `pnpm format`        | Prettier write                              |
| `pnpm validate`      | type-check + lint + format:check (parallel) |
| `pnpm test`          | Jest unit tests                             |
| `pnpm test:coverage` | Jest with coverage                          |
| `pnpm test:e2e`      | Playwright e2e tests                        |
| `pnpm setup`         | Install Playwright browsers (first time)    |

## Environment Setup

```sh
cp .env.example .env
```

| Variable                 | Required | Description            |
| ------------------------ | -------- | ---------------------- |
| `NEXT_PUBLIC_API_URL`    | Yes      | Backend API base URL   |
| `NEXT_PUBLIC_SENTRY_DSN` | No       | Sentry client-side DSN |
| `SENTRY_DSN`             | No       | Sentry server-side DSN |

For builds without a real env (CI, typegen): set `SKIP_ENV_VALIDATION=1`.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (site)/           # Public pages — layout: Header + Footer
│   ├── (auth)/           # Auth pages — layout: centered card
│   └── (protected)/      # Authenticated pages — layout: Sidebar + Header
├── features/             # Feature vertical slices
│   └── {feature}/
│       ├── components/   # Feature UI components
│       └── hooks/        # Feature-specific hooks (form state, API)
├── components/
│   ├── ui/               # Shadcn/ui primitives — do not modify
│   ├── form-fields/      # Reusable form field wrappers
│   ├── partials/         # Layout regions (header, footer, sidebar)
│   └── shared/           # Cross-feature reusable components
├── services/             # API service classes (singletons)
│   └── requests/         # Base, Unauthenticated, Authenticated HTTP clients
├── hooks/
│   ├── api/              # useApiQuery, useApiMutation (generic wrappers)
│   └── auth/             # useCurrentUser, useLogout
├── providers/            # React context providers (composed in AppProvider)
├── schemas/              # Zod validation schemas + inferred types
├── constants/            # App routes, query keys, error codes, enums
├── types/                # TypeScript interfaces and types
├── lib/                  # query-client, cookie-storage, utilities
└── config/               # env.ts — t3-oss/env-nextjs validation
```

## Architecture Patterns

### Adding a new feature

1. Create `src/features/{name}/components/` and `src/features/{name}/hooks/`
2. Define Zod schema in `src/schemas/{name}.ts` — export both schema and inferred type
3. Add service method in `src/services/{name}.ts` using `AuthenticatedRequest` or `UnauthenticatedRequest`
4. Add query key in `src/constants/query-keys.ts`
5. Create hook in `src/features/{name}/hooks/` using `useApiMutation` or `useApiQuery`
6. Build component that imports and uses the hook — component holds no business logic
7. Add page in `src/app/` and update `src/constants/app-routes.ts`

### Service layer

- `UnauthenticatedRequest` (`src/services/requests/unauthenticated.ts`) — public endpoints, no auth header
- `AuthenticatedRequest` (`src/services/requests/authenticated.ts`) — protected endpoints, auto Bearer token + 401 retry with token refresh queue
- Export services as singletons: `export const authService = new AuthService()`
- All methods return `Promise<TypedResponse>`

### Hooks

- `useApiMutation<TData, TVariables>` (`src/hooks/api/use-api-mutation.ts`) — wraps `useMutation`, auto toast on success/error
- `useApiQuery<TData, TPayload>` (`src/hooks/api/use-api-query.ts`) — wraps `useQuery`, auto error toast
- Feature hooks (e.g., `useLoginForm`) compose these and return `{ form, handleSubmit, isPending, ... }` to components — keep components thin

### Forms

- Always: **React Hook Form + zodResolver + feature hook pattern**
- Infer types from schemas: `type LoginInput = z.infer<typeof LoginInputSchema>`
- Use existing field components from `src/components/form-fields/` (EmailField, PasswordField, InputField, etc.)

## Naming Conventions

| Item               | Convention          | Example                   |
| ------------------ | ------------------- | ------------------------- |
| Component files    | `PascalCase.tsx`    | `LoginForm.tsx`           |
| Hook/util files    | `kebab-case.ts`     | `use-login-form.ts`       |
| Service files      | `kebab-case.ts`     | `auth.ts`                 |
| React components   | `PascalCase`        | `function LoginForm()`    |
| Hooks              | `camelCase`         | `function useLoginForm()` |
| Constants          | `UPPER_SNAKE_CASE`  | `APP_ROUTES`, `AUTH_KEYS` |
| Zod schemas        | `PascalCase`+Schema | `LoginInputSchema`        |
| Types / interfaces | `PascalCase`        | `LoginResponse`, `User`   |
| Service instances  | `camelCase`         | `authService`             |

## TypeScript Rules

- `strict: true` is enforced — no implicit `any`, no unused vars
- `verbatimModuleSyntax` is on — always use `import type` for type-only imports
- Prefer `??` over `||` for nullish checks
- No `any` unless truly unavoidable (ESLint warns)
- No non-null assertions (`!`) unless the value is provably non-null (ESLint warns)

## Import Order

Enforced by ESLint `import/order` — lint-staged auto-fixes on commit:

1. Node builtins
2. External packages (`react`, `next` come first within this group)
3. Internal — in this order: `@/providers` → `@/features` → `@/components` → `@/hooks` → `@/services` → `@/schemas` → `@/config` → `@/constants` → `@/lib` → `@/types`
4. Parent / sibling / index

## Commit Convention

Conventional Commits enforced by commitlint. Allowed types:

```
feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert
```

Example: `feat: add patient appointment booking page`

Do **not** include Co-Authored-By or AI attribution in commits.

## Testing

- **Unit tests** colocated with source: `src/services/auth.test.ts`, `src/hooks/api/use-api-query.test.tsx`
- **E2E tests** in `e2e/`
- Before pushing: `pnpm test && pnpm type-check && pnpm lint`
- CI pipeline runs: typegen → type-check → lint → test (coverage) → build
