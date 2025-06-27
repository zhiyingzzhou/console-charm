import globals from 'globals';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import pluginJs from '@eslint/js';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      "dist/**/*",
      "coverage/**/*",
      "node_modules/**/*",
      "*.js"
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: parserTypeScript,
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es6,
        ...globals.jest,
        NodeJS: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginTypeScript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error'
    }
  }
]; 