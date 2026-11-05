import { existsSync, globSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { livroPlugin } from './build/livro-plugin.js';

const root = resolve(import.meta.dirname, 'src');
const pages = globSync('**/index.html', { cwd: root }).map((p) => resolve(root, p));
if (existsSync(resolve(root, '404.html'))) pages.push(resolve(root, '404.html'));

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/na-trilha-do-front-end/' : '/',
  publicDir: resolve(root, 'public'),
  plugins: [livroPlugin()],
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { input: pages },
  },
}));
