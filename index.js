// Base flat config for TypeScript projects. Type-aware: a consuming config
// sets `languageOptions.parserOptions.tsconfigRootDir` to its own directory.
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

const BOOLEAN_PREFIXES = ["is", "has", "should", "can", "did", "will"];

const namingConvention = [
  "error",
  { selector: "default", format: ["camelCase"], leadingUnderscore: "allow" },
  { selector: "import", format: ["camelCase", "PascalCase"] },
  {
    selector: "variable",
    modifiers: ["const", "global"],
    format: ["camelCase", "UPPER_CASE"],
  },
  {
    selector: "variable",
    types: ["boolean"],
    format: ["PascalCase"],
    prefix: BOOLEAN_PREFIXES,
    leadingUnderscore: "allow",
  },
  {
    selector: "variable",
    modifiers: ["const", "global"],
    types: ["boolean"],
    format: ["PascalCase", "UPPER_CASE"],
    prefix: BOOLEAN_PREFIXES.flatMap((prefix) => [prefix, `${prefix.toUpperCase()}_`]),
  },
  { selector: "typeLike", format: ["PascalCase"] },
  { selector: "enumMember", format: ["PascalCase", "UPPER_CASE"] },
  {
    selector: "classProperty",
    modifiers: ["static", "readonly"],
    format: ["camelCase", "UPPER_CASE"],
  },
  // Object and type keys often mirror external formats (HTTP headers, JSON APIs, env vars).
  { selector: ["objectLiteralProperty", "typeProperty"], format: null },
];

export default tseslint.config(
  { ignores: ["dist/**", "dist-test/**", "coverage/**"] },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  unicorn.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        projectService: { allowDefaultProject: ["*.config.ts"] },
      },
    },
    rules: {
      "func-style": ["error", "expression"],
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],

      "@typescript-eslint/naming-convention": namingConvention,
      "id-length": ["error", { min: 2, exceptions: ["_", "i", "j", "x", "y"] }],
      "id-denylist": [
        "error",
        ...["data", "tmp", "temp", "obj", "val", "value2", "res", "ret", "foo", "bar"],
        ...["thing", "stuff", "item2", "arr", "str", "num"],
      ],

      "no-console": "warn",
      eqeqeq: "error",
      "no-param-reassign": "error",
      "prefer-const": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // Covered by the naming rules above; its expansions fight common short names.
      "unicorn/prevent-abbreviations": "off",
      // Public APIs return null for "no value", as do JSON and the DOM.
      "unicorn/no-null": "off",
      // Files are named after what they export: camelCase modules, PascalCase components.
      "unicorn/filename-case": ["error", { cases: { camelCase: true, pascalCase: true } }],
    },
  },
  {
    // Plain JS (config files) has no tsconfig to type-check against.
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  eslintConfigPrettier,
);
