import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";

import { ESLint } from "eslint";

import base from "../index.js";
import prettier from "../prettier.js";
import vue from "../vue.js";

const fixtures = path.join(import.meta.dirname, "fixtures");

const eslintFor = (config) =>
  new ESLint({
    cwd: fixtures,
    overrideConfigFile: true,
    overrideConfig: [
      ...config,
      { languageOptions: { parserOptions: { tsconfigRootDir: fixtures } } },
    ],
  });

test("the base config reports the house rules on a TypeScript file", async () => {
  const [result] = await eslintFor(base).lintFiles(["sample.ts"]);
  const rules = new Set(result.messages.map((message) => message.ruleId));
  assert.equal(result.fatalErrorCount, 0);
  for (const rule of [
    "func-style",
    "id-denylist",
    "@typescript-eslint/explicit-module-boundary-types",
  ]) {
    assert.ok(rules.has(rule), `expected ${rule} in ${[...rules].join(", ")}`);
  }
});

test("the vue variant parses SFCs with TypeScript and keeps formatting to Prettier", async () => {
  const config = await eslintFor(vue).calculateConfigForFile("Component.vue");
  assert.equal(config.rules["vue/multi-word-component-names"][0], 2);
  assert.equal(config.rules["vue/html-indent"][0], 0);
  assert.equal(config.rules["@typescript-eslint/naming-convention"][0], 2);
});

test("the Prettier config has the agreed settings", () => {
  assert.deepEqual(prettier, {
    printWidth: 100,
    singleQuote: false,
    trailingComma: "all",
    semi: true,
  });
});
