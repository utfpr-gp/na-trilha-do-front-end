// Uma função de seta: o mesmo que function greeting(hour) { ... }
const greeting = (hour) => {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};
