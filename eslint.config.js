import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import * as mdx from 'eslint-plugin-mdx';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import globals from 'globals';
import ts from 'typescript-eslint';

import tailwind from 'eslint-plugin-tailwindcss';

const style = stylistic.configs.customize({
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'never',
  indent: 2,
  jsx: true,
  quoteProps: 'consistent-as-needed',
  quotes: 'double',
  semi: true,
});

export default ts.config(
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,mdx}'],
    ...react.configs.flat['jsx-runtime'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.mdx'],
    ...mdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    files: ['**/*.mdx'],
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
      // // if you want to override some rules for code blocks
      // 'no-var': 'error',
      // 'prefer-const': 'error',
    },
  },
  {
    extends: [js.configs.recommended, ...ts.configs.recommended],
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  },
  {
    ...style,
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,mdx}'],
  },
  {
    files: ['**/*.mdx'],
    rules: {
      '@stylistic/indent': 'off',
      '@stylistic/jsx-closing-bracket-location': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-tag-spacing': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/no-multi-spaces': 'off',
      '@stylistic/semi': 'off',
    },
  },
  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-named-exports': [
        'error',
        {
          groupKind: 'values-first',
          ignoreCase: true,
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ['classnames', 'clsx', 'ctl', 'cx', 'cva', 'cn'],
        classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
        cssFiles: [
          '**/*.css',
          '!**/node_modules',
          '!**/.*',
          '!**/dist',
          '!**/build',
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        whitelist: [],
      },
    },
  },
  {
    ignores: ['node_modules/**/*', 'dist/**/*', '.next/**/*', '.vscode/**/*'],
  }
);
