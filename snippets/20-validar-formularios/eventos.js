function isField(el) {
  return el.matches('input, select, textarea');
}

// Só mostra o erro depois que a pessoa passou pelo campo (design system).
form.addEventListener('focusout', (event) => {
  if (!isField(event.target)) return;
  event.target.dataset.touched = 'true';
  validateField(event.target);
});

// Depois de tocado, o campo é conferido a cada mudança: o erro some assim que é corrigido.
form.addEventListener('input', (event) => {
  if (isField(event.target) && event.target.dataset.touched) validateField(event.target);
});

