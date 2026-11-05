// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { initSearch } from '../../src/js/search.js';

describe('initSearch', () => {
  it('sem o índice (npm run dev), avisa onde a busca funciona', async () => {
    document.body.innerHTML = '<div id="busca"></div><p data-search-status></p>';
    await initSearch({ base: '/', loadScript: () => Promise.reject(new Error('404')), search: '' });
    expect(document.querySelector('[data-search-status]').textContent).toContain('npm run preview');
  });

  it('com ?q= na URL, já abre com a busca feita', async () => {
    document.body.innerHTML = '<div id="busca"></div><p data-search-status></p>';
    const triggerSearch = vi.fn();
    window.PagefindUI = vi.fn(function () { this.triggerSearch = triggerSearch; });
    await initSearch({ base: '/x/', loadScript: () => Promise.resolve(), search: '?q=grid' });
    expect(window.PagefindUI).toHaveBeenCalledWith(expect.objectContaining({ element: '#busca' }));
    expect(triggerSearch).toHaveBeenCalledWith('grid');
  });
});
