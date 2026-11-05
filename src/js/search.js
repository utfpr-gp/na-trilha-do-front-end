// A busca usa a interface do Pagefind, gerada no build. No `npm run dev` o índice não existe.
function defaultLoadScript(src) {
  return new Promise((resolve, reject) => {
    const script = Object.assign(document.createElement('script'), { src, onload: resolve, onerror: reject });
    document.head.append(script);
  });
}

export async function initSearch({ base, loadScript = defaultLoadScript, search = location.search }) {
  const status = document.querySelector('[data-search-status]');
  try {
    await loadScript(`${base}pagefind/pagefind-ui.js`);
  } catch {
    status.textContent = 'A busca funciona no site publicado ou depois de npm run build, no npm run preview.';
    return;
  }
  const css = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: `${base}pagefind/pagefind-ui.css` });
  document.head.append(css);
  const ui = new window.PagefindUI({
    element: '#busca',
    showSubResults: true,
    translations: { placeholder: 'Buscar no livro', zero_results: 'Nada encontrado para [SEARCH_TERM]. Tente outra palavra.' },
  });
  const q = new URLSearchParams(search).get('q');
  if (q) ui.triggerSearch(q);
}
