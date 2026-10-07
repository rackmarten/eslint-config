// Vue 3 variant: the base config plus eslint-plugin-vue's flat/recommended,
// with TypeScript (type-aware) inside `<script lang="ts">` blocks.
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

import base from "./index.js";

export default tseslint.config(
  ...base,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
  },
  // Again last, so it also switches off the Vue plugin's formatting rules.
  eslintConfigPrettier,
);
