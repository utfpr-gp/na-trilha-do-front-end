// As regras do ESLint para o Trilheiro. O .mjs diz ao Node que este arquivo usa import/export.
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['node_modules/', 'dist/'] },

  // As regras recomendadas: as que quase sempre apontam um bug de verdade.
  js.configs.recommended,

  {
    files: ['js/**/*.js', 'vite.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // os arquivos usam import e export
      // Com o Vite, o jQuery e o Bootstrap chegam por import: nenhum nome global a declarar.
      globals: globals.browser, // document, window, fetch, localStorage…
    },
    rules: {
      eqeqeq: ['error', 'smart'], // === e !==, menos no "== null"
      'prefer-const': 'error', // let que nunca muda deveria ser const
      'no-console': ['warn', { allow: ['error'] }], // console.log esquecido vira aviso
    },
  },
]);
