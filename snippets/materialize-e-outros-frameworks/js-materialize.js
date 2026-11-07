// O menu do celular é um componente do Materialize, ligado pelo init.
M.Sidenav.init(document.querySelectorAll('.sidenav'));
// O modal, no Materialize 2, é o <dialog> do próprio navegador: o showModal abre.
document.querySelector('#abrir-dicas').addEventListener('click', () => {
  document.querySelector('#dicas').showModal();
});
