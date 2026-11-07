  // Na tela, "27° / 18°" basta; o leitor de tela recebe "máxima de 27°, mínima de 18°".
  const temp = li.querySelector('[data-temp]');
  temp.setAttribute('aria-hidden', 'true');
  temp.textContent = `${Math.round(day.max)}° / ${Math.round(day.min)}°`;
  const spoken = document.createElement('span');
  spoken.className = 'visually-hidden';
  spoken.textContent = `máxima de ${Math.round(day.max)}°, mínima de ${Math.round(day.min)}°`;
  temp.after(spoken);
