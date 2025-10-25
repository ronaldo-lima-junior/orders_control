const js = require('@eslint/js');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      'build'
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    files: [
      '**/*.{ts,tsx}',
    ],
    ignores: [
      '**/*.js',
      'node_modules',
      'build',
      '/src/react-app-env.d.ts',
      '/*.js',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: true,
          endOfLine: 'auto',
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase'],
          'custom': {
            'regex': '^I[A-Z]',
            'match': true
          }
        },
        {
          'selector': 'enum',
          'format': ['PascalCase'],
          'custom': {
            'regex': '^E[A-Z]',
            'match': true
          }
        }
      ],
    },
    settings: {
      'import/parsers': {
        [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
      },
    },
  },
)
