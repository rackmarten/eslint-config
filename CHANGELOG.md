# Changelog

All notable changes to `@rackmarten/eslint-config` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
While the version is 0.x, a minor bump may contain breaking changes.

## [Unreleased]

## [0.10.0] - 2026-10-07

The first release.

### Added

- ESLint 9 flat config for TypeScript (`@rackmarten/eslint-config`):
  `@eslint/js` recommended, typescript-eslint `strictTypeChecked` with the
  project service, `eslint-plugin-unicorn` and `eslint-plugin-sonarjs`
  recommended, arrow-function style, naming rules (`naming-convention`,
  `id-length`, `id-denylist`) and `eslint-config-prettier` last.
- A Vue 3 variant (`@rackmarten/eslint-config/vue`) adding
  `eslint-plugin-vue` `flat/recommended` with TypeScript in SFCs.
- A shared Prettier config (`@rackmarten/eslint-config/prettier`).

[Unreleased]: https://github.com/rackmarten/eslint-config/commits/main
[0.10.0]: https://github.com/rackmarten/eslint-config/releases/tag/v0.10.0
