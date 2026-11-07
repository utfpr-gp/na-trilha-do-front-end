// O Bulma é só CSS: nem o menu do celular abre sozinho. Este é o JavaScript que a documentação sugere.
document.querySelectorAll('.navbar-burger').forEach((burger) => {
  burger.addEventListener('click', () => {
    const menu = document.getElementById(burger.dataset.target);
    const open = burger.classList.toggle('is-active');
    menu.classList.toggle('is-active', open);
    burger.setAttribute('aria-expanded', String(open));
  });
});
