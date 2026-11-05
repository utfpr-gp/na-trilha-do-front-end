// Uma função de seta: o mesmo que function saudacao(hora) { ... }
const saudacao = (hora) => {
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
};
