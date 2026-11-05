// Abre uma página num Chrome com depuração remota, roda uma expressão e imprime o resultado em JSON.
// Uso: google-chrome --headless=new --remote-debugging-port=9334 about:blank &
//      node scripts/avaliar-no-chrome.mjs <url> "<expressão JS, pode ser async>"
// Serve para conferir componentes de verdade (modais, carrosséis, mensagens do console).
const [url, expr] = process.argv.slice(2);
const port = process.env.CDP_PORT ?? 9334;
const page = (await (await fetch(`http://localhost:${port}/json`)).json()).find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const logs = [];
const call = (method, params = {}) => new Promise((res) => {
  const my = ++id;
  const on = (e) => {
    const m = JSON.parse(e.data);
    if (m.id === my) { ws.removeEventListener('message', on); res(m.result); }
  };
  ws.addEventListener('message', on);
  ws.send(JSON.stringify({ id: my, method, params }));
});
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') logs.push('Uncaught ' + m.params.exceptionDetails.exception?.description?.split('\n')[0]);
  if (m.method === 'Runtime.consoleAPICalled') logs.push(`console.${m.params.type}: ` + m.params.args.map((a) => a.value ?? a.description).join(' '));
  if (m.method === 'Log.entryAdded') logs.push(`[${m.params.entry.level}] ${m.params.entry.text}`);
});
ws.onopen = async () => {
  await call('Runtime.enable');
  await call('Log.enable');
  await call('Page.enable');
  await call('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, 2500));
  const r = await call('Runtime.evaluate', { expression: expr ?? 'document.title', returnByValue: true, awaitPromise: true });
  console.log(JSON.stringify(r.result.value ?? r.exceptionDetails?.exception?.description));
  if (logs.length) console.log('CONSOLE:\n' + logs.join('\n'));
  process.exit(0);
};
