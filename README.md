# @rackmarten/eslint-config

[![Support on Ko-fi](https://img.shields.io/badge/Ko--fi-support-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/rackmarten)

An opinionated ESLint 9 flat config for TypeScript (and Vue 3) projects, plus
the Prettier config that goes with it. Prettier owns formatting; ESLint owns
everything else, and `eslint-config-prettier` runs last so the two never
disagree.

> **Heads-up:** this config exists to serve the maintainer's own projects. It
> is published in case it is useful to you too, but rules may change between
> 0.x minor versions. Pin a version range and read `CHANGELOG.md` before
> bumping.

```bash
npm i -D @rackmarten/eslint-config eslint@9 prettier typescript
```

## Usage

`eslint.config.js` in a TypeScript project. Linting is type-aware, so point
`tsconfigRootDir` at the directory holding your `tsconfig.json`:

```js
import config from "@rackmarten/eslint-config";

export default [
  ...config,
  { languageOptions: { parserOptions: { tsconfigRootDir: import.meta.dirname } } },
];
```

For a Vue 3 project, import `@rackmarten/eslint-config/vue` instead. It adds
`eslint-plugin-vue`'s `flat/recommended` and parses `<script lang="ts">`
blocks with the same type-aware TypeScript rules.

`prettier.config.js`:

```js
export { default } from "@rackmarten/eslint-config/prettier";
```

Scripts most projects want:

```json
{
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write ."
}
```

Type-aware linting uses typescript-eslint's project service, which gives each
file the nearest `tsconfig.json`. A file no `tsconfig.json` includes (tests
outside `include`, say) fails to parse; give such a directory its own
`tsconfig.json` that extends the main one. Root `*.config.ts` files are
allowed without one, and plain `.js`/`.mjs`/`.cjs` files skip the type-aware
rules.

## What it enables

Everything below is an error unless noted.

| Area                  | Rules                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Baseline              | `@eslint/js` recommended, typescript-eslint `strictTypeChecked`                                                         |
| Arrow functions       | `func-style: expression`, `prefer-arrow-callback`, `arrow-body-style: as-needed` (class methods stay allowed)           |
| Modern idioms         | `eslint-plugin-unicorn` recommended                                                                                     |
| Complexity, dead code | `eslint-plugin-sonarjs` recommended (cognitive complexity 15, duplicate branches, identical functions, ...)             |
| Names                 | `@typescript-eslint/naming-convention` (see below), `id-length` min 2 except `_`, `i`, `j`, `x`, `y`, `id-denylist`     |
| Hygiene               | `eqeqeq`, `no-param-reassign`, `prefer-const`, `@typescript-eslint/explicit-module-boundary-types`, `no-console` (warn) |

Naming: camelCase variables and functions, PascalCase types, classes and
imports, UPPER_CASE allowed for module-level constants, and boolean variables
start with `is`, `has`, `should`, `can`, `did` or `will`. Object and type keys
are not checked, since they often mirror an external format (HTTP headers,
JSON APIs). The denylist rejects `data`, `tmp`, `temp`, `obj`, `val`,
`value2`, `res`, `ret`, `foo`, `bar`, `thing`, `stuff`, `item2`, `arr`,
`str` and `num`.

Unicorn rules changed from its defaults, and why:

- `prevent-abbreviations`: off. The naming rules cover it, and its expansions
  fight common short names.
- `no-null`: off. APIs return `null` for "no value", as do JSON and the DOM.
- `filename-case`: camelCase or PascalCase, since files are named after what
  they export (`useSearch.ts`, `AppShell.vue`).

The Prettier config: `printWidth: 100`, double quotes, `trailingComma: "all"`,
semicolons.

## Support this project

If this config saves you time, you can support its development on
[Ko-fi](https://ko-fi.com/rackmarten):

[![Support on Ko-fi](https://img.shields.io/badge/Ko--fi-support-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/rackmarten)

Bug reports, ideas and pull requests
are just as welcome; see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
