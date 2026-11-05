// RN04: o hífen é opcional ao digitar, mas o CEP é guardado como 00000-000.
function formatCep(value) {
  const digits = value.replace(/\D/g, ''); // tira tudo o que não é dígito
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
