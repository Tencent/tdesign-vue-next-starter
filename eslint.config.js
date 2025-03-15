import antfu from '@antfu/eslint-config';
import { defineConfigWithVueTs as vueTsConverter, vueTsConfigs as vueTs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vue from 'eslint-plugin-vue';
import vueCss from 'eslint-plugin-vue-scoped-css';
import globals from 'globals';
import typescript from 'typescript-eslint';

export default antfu(
  {
    formatters: true,
    typescript: true,
    vue: true,
  },
  [
    ...typescript.configs.recommended,
    ...vueTsConverter(vueTs.recommended),
    ...vue.configs['flat/recommended'],
    ...vueCss.configs['flat/recommended'],
    prettier,
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.jest,
          defineProps: 'readonly',
          defineEmits: 'readonly',
        },
        ecmaVersion: 6,
        sourceType: 'module',

        parserOptions: {
          parser: typescript.parser,
          allowImportExportEverywhere: true,

          ecmaFeatures: {
            jsx: true,
          },
        },
      },

      plugins: {
        'simple-import-sort': simpleImportSort,
      },

      settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },

      rules: {
        'ts/no-explicit-any': 'off',

        /* Disallow person rules */
        'antfu/top-level-function': 'off',
        'antfu/if-newline': 'off',

        /* If you need control the imports sequence, must be off
         *  https://github.com/vuejs/vue-eslint-parser/issues/58
         */
        'import/first': 'off',

        /* Allow start with _ */
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'vue/no-unused-vars': [
          'error',
          {
            ignorePattern: '^_',
          },
        ],
        'no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        /* Some variables are initialized in the function */
        '@typescript-eslint/no-use-before-define': 'off',
        'no-use-before-define': 'off',

        /* Disable antfu sort, use simple sort import */
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-named-imports': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      files: ['**/*.vue'],

      rules: {
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/block-order': [
          'error',
          {
            order: ['template', 'script', 'style'],
          },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-props': 'off',
        'vue/no-v-html': 'off',

        'vue-scoped-css/enforce-style-type': [
          'error',
          {
            allows: ['scoped'],
          },
        ],
      },
    },
    globalIgnores([
      '**/snapshot*',
      '**/dist',
      '**/lib',
      '**/es',
      '**/esm',
      '**/node_modules',
      'src/_common',
      '**/static',
      '**/cypress',
      'script/test/cypress',
      '**/_site',
      '**/temp*',
      '**/static/',
      '!**/.prettierrc.js',
    ]),
  ],
);
