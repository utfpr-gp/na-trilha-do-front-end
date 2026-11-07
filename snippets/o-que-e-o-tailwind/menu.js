// O Tailwind não tem JavaScript: o botão do menu do celular é seu.
const button = document.querySelector('#abrir-menu');
const menu = document.querySelector('#menu');
button.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden') === false;
  menu.classList.toggle('flex', open);
  button.setAttribute('aria-expanded', String(open));
});
