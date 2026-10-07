// Shared Prettier config. Use it from a `prettier.config.js`:
//   export { default } from "@rackmarten/eslint-config/prettier";
/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
};

export default config;
