import { existsSync, globSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { livroPlugin } from './build/livro-plugin.js';

const root = resolve(import.meta.dirname, 'src');
const pages = globSync('**/index.html', { cwd: root }).map((p) => resolve(root, p));
if (existsSync(resolve(root, '404.html'))) pages.push(resolve(root, '404.html'));

export default defineConfig(({ command, isPreview }) => ({
  root,
  // O preview serve o dist/, que foi gerado com a base do GitHub Pages.
  base: command === 'build' || isPreview ? '/na-trilha-do-front-end/' : '/',
  publicDir: resolve(root, 'public'),
  plugins: [livroPlugin()],
  css: {
    preprocessorOptions: {
      // O Bootstrap 5.3 ainda usa @import e funções globais do Sass: esconde os avisos dele.
      scss: { quietDeps: true, silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'] },
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pages },
  },
}));
