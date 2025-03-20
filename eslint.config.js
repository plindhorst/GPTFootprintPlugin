/* eslint-disable import-x/no-named-as-default-member */
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import importX from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import globals from "globals";
import ts from "typescript-eslint";

const _files = ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,mdx}"];
const _tsFiles = ["**/*.ts", "**/*.tsx", "**/*.mtsx"];
// import tailwind from 'eslint-plugin-tailwindcss';

const customise = stylistic.configs.customize;

const style = customise({
  blockSpacing: true,
  braceStyle: "1tbs",
  commaDangle: "never",
  indent: 2,
  jsx: true,
  quoteProps: "consistent-as-needed",
  quotes: "double",
  semi: true
});

export default ts.config(
  {
    ignores: ["node_modules/**/*", "dist*/**/*", ".next/**/*", ".vscode/**/*"]
  },
  style,
  perfectionist.configs["recommended-natural"],
  react.configs.flat["jsx-runtime"],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  {
    // disable type-aware linting on JS files
    extends: [ts.configs.disableTypeChecked],
    files: ["**/*.js"]
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_"
        }
      ],
      "import-x/no-unresolved": "error",
      "perfectionist/sort-named-exports": [
        "error",
        {
          groupKind: "values-first",
          ignoreCase: true,
          order: "asc",
          type: "natural"
        }
      ],
      "react/jsx-uses-vars": "error"
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.node,
        ...globals.browser
      },
      parser: tsParser,
      parserOptions: {
        allowDefaultProject: ["*.js"],
        project: "tsconfig.json",
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  // ...tailwind.configs['flat/recommended'],
  {
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
          // project: 'tsconfig.json',
        })
      ],
      "react": {
        version: "detect"
      },
      "tailwindcss": {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "ctl", "cx", "cva", "cn"],
        classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build"
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        whitelist: []
      }
    }
  }
);
