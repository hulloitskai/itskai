// @ts-check

import js from "@eslint/js";
// @ts-expect-error eslint-plugin-import is not typed
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { readFileSync } from "fs";
import ts from "typescript-eslint";

const ignores = readFileSync(".prettierignore", "utf8")
  .split("\n")
  .map(line => line.trim())
  .filter(line => !!line);

export default ts.config(
  { ignores },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-console": ["warn", { allow: ["debug", "info", "warn", "error"] }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/consistent-type-exports": [
        "warn",
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    ...ts.configs.disableTypeChecked,
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ..._import.flatConfigs.recommended,
    ..._import.flatConfigs.typescript,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: _import,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // == Side effect imports
            ["^\\u0000"],

            // == Node.js builtins prefixed with `node:`
            ["^node:"],

            // == Packages
            // Things that start with a letter (or digit or underscore), or `@`
            // followed by a letter
            ["^@?\\w"],

            // == Absolute imports and other imports such as Vue-style `@/foo`
            // Anything not matched in another group.
            ["^~icons"],
            ["^~/assets"],
            ["^"],

            // == Relative imports
            // (Anything that starts with a dot.)
            ["^\\."],

            // == Fontsource fonts
            ["^\\u0000@fontsource"],

            // == CSS modules
            ["\\.module\\.css$", "\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "import/no-unresolved": "off",
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
      "import/namespace": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // @ts-expect-error react.configs.flat should not be undefined
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    // @ts-expect-error react-hooks is not typed
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "(useDidUpdate|useShallowEffect)",
        },
      ],
    },
  },
);
