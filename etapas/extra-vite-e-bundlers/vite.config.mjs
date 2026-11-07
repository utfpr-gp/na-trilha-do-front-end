// O Vite do Trilheiro: quatro páginas HTML, o Sass compilado na hora e o site pronto em dist/.
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // caminhos relativos no dist/, para funcionar numa pasta do GitHub Pages
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // não mostra os avisos de dentro do Bootstrap
        silenceDeprecations: ['import'],
      },
    },
  },
  build: {
    rollupOptions: {
      // Um site de várias páginas: cada HTML é uma porta de entrada.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        trilhas: resolve(import.meta.dirname, 'trilhas.html'),
        trilha: resolve(import.meta.dirname, 'trilha.html'),
        cadastrar: resolve(import.meta.dirname, 'cadastrar.html'),
      },
    },
  },
});
