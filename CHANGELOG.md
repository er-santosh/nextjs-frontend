# 1.0.0 (2026-03-02)

### Bug Fixes

- fixed classname utils type error ([bba37c8](https://github.com/er-santosh/nextjs-frontend/commit/bba37c83c24f41970dbf119e0ef3f0ac6e717f26))
- fixed fetch refresh token ([a41e497](https://github.com/er-santosh/nextjs-frontend/commit/a41e49784a3706c7bbc67cfcf390b57fbb162981))
- fixed hydration issue ([256c331](https://github.com/er-santosh/nextjs-frontend/commit/256c331a47981b6b7f8651a657613ba220246ad9))
- fixed inquiry schema ([fa7804f](https://github.com/er-santosh/nextjs-frontend/commit/fa7804fdf0e3e27571b5f94bed7518e7a4a43e07))
- fixed ui issue ([a7e8792](https://github.com/er-santosh/nextjs-frontend/commit/a7e8792bdc8a835c115cc7005c85a10a5530bcc1))
- gate production deploy on actual release, add format:check, fix PM2 config ([5e3e27c](https://github.com/er-santosh/nextjs-frontend/commit/5e3e27cae26c87584fc25a8cf767af7085fed952))
- remove conflicting --check flag from lint-staged prettier commands ([c8ee4d3](https://github.com/er-santosh/nextjs-frontend/commit/c8ee4d343a194b1e41ee8a96b6ba866628969305))
- resolve incorrect logo image import path in logo component ([c371e5f](https://github.com/er-santosh/nextjs-frontend/commit/c371e5f57bd1ba9e70069b3a52f09cd6f5e30136))
- use pnpm start in PM2 config, fix PORT type to string ([0c0de67](https://github.com/er-santosh/nextjs-frontend/commit/0c0de6795e601107136a2a35d8d4a76fe23ed8f1))

### Features

- api integration ([ecd649b](https://github.com/er-santosh/nextjs-frontend/commit/ecd649bc9cafcbdc9de19520dcf53b6847577306))
- enterprise hardening — code quality, UI patterns, tests, CI + Sentry ([#1](https://github.com/er-santosh/nextjs-frontend/issues/1)) ([be712ee](https://github.com/er-santosh/nextjs-frontend/commit/be712ee633a8af513f3642201898e8a5d7a36536))
- implemented dashboard ([7090e8b](https://github.com/er-santosh/nextjs-frontend/commit/7090e8b66059ea118ffd5b928cf7966887b2feca))
- implemented forgot and reset password ([61ddc31](https://github.com/er-santosh/nextjs-frontend/commit/61ddc3119ff3bee5cbfc9c9e18c03e9889d36adb))
- implemented verification email ([2ba4019](https://github.com/er-santosh/nextjs-frontend/commit/2ba4019d182a1760fb78b864a770c46f88f3cb42))
- updated cookie access token expiry time ([109d5c9](https://github.com/er-santosh/nextjs-frontend/commit/109d5c90bcaaae507f430bc2fd854b1013f6ba96))

### Performance Improvements

- remove import/no-cycle rule (consumed 92% of lint time) ([fcb6d9c](https://github.com/er-santosh/nextjs-frontend/commit/fcb6d9cb69405c09d922b248359038a5640cca54))
