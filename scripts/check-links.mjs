// Confere os links internos do site gerado, servido com a mesma base do GitHub Pages.
import { spawn } from 'node:child_process';
import { LinkChecker } from 'linkinator';

const PORT = 4174;
const ROOT = `http://localhost:${PORT}/na-trilha-do-front-end/`;

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', detached: true });
const stop = () => { try { process.kill(-server.pid); } catch { /* já parou */ } };

try {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(ROOT)).ok) break; } catch { /* ainda subindo */ }
    await new Promise((r) => setTimeout(r, 200));
  }
  const result = await new LinkChecker().check({
    path: ROOT,
    recurse: true,
    linksToSkip: (link) => Promise.resolve(!link.startsWith(`http://localhost:${PORT}/`)),
  });
  const broken = result.links.filter((l) => l.state === 'BROKEN');
  for (const l of broken) console.error(`✗ ${l.status} ${l.url} (em ${l.parent})`);
  console.log(`Links internos: ${result.links.length - broken.length}/${result.links.length} funcionando.`);
  process.exitCode = broken.length ? 1 : 0;
} finally {
  stop();
}
