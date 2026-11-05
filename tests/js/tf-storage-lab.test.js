// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfStorageLab, LAB_KEY } from '../../src/js/components/tf-storage-lab.js';

beforeAll(() => customElements.define('tf-storage-lab', TfStorageLab));
beforeEach(() => localStorage.clear());

const mount = () => {
  document.body.innerHTML = '<tf-storage-lab></tf-storage-lab>';
};
const $$ = (sel) => [...document.querySelectorAll(`tf-storage-lab ${sel}`)];
const outputs = () => $$('output').map((o) => o.textContent);
const toggle = (index) => {
  const box = $$('input[type="checkbox"]')[index];
  box.checked = !box.checked;
  box.dispatchEvent(new Event('change', { bubbles: true }));
};

describe('<tf-storage-lab>', () => {
  it('começa sem favoritas: array vazio, JSON vazio e texto vazio', () => {
    mount();
    expect($$('input[type="checkbox"]')).toHaveLength(3);
    expect($$('label')[0].textContent).toBe('Trilha do Salto');
    expect(outputs()).toEqual(['[]', "'[]'", "''"]);
  });

  it('marcar mostra o array, o JSON e o que viraria sem JSON, e grava no localStorage', () => {
    mount();
    toggle(0);
    toggle(2);
    expect(outputs()).toEqual(["['1', '3']", '\'["1","3"]\'', "'1,3'"]);
    expect(localStorage.getItem(LAB_KEY)).toBe('["1","3"]');
  });

  it('ao montar de novo (como ao recarregar), lê o que estava guardado', () => {
    localStorage.setItem(LAB_KEY, '["2"]');
    mount();
    expect($$('input[type="checkbox"]').map((b) => b.checked)).toEqual([false, true, false]);
  });

  it('com JSON estragado no armazenamento, começa vazio sem quebrar', () => {
    localStorage.setItem(LAB_KEY, '[1,');
    mount();
    expect(outputs()[0]).toBe('[]');
  });
});
