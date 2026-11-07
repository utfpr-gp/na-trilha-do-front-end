// As regras do ESLint para o Trilheiro. O .mjs diz ao Node que este arquivo usa import/export.
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['node_modules/', 'css/'] },

  // As regras recomendadas: as que quase sempre apontam um bug de verdade.
  js.configs.recommended,

  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // os arquivos usam import e export
      globals: {
        ...globals.browser, // document, window, fetch, localStorage…
        $: 'readonly', // o jQuery, que vem do CDN (capítulo 22)
        bootstrap: 'readonly', // o JavaScript do Bootstrap, do bundle
      },
    },
    rules: {
      eqeqeq: ['error', 'smart'], // === e !==, menos no "== null"
      'prefer-const': 'error', // let que nunca muda deveria ser const
      'no-console': ['warn', { allow: ['error'] }], // console.log esquecido vira aviso
    },
  },
]);
