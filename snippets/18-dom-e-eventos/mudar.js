const title = document.querySelector('.card-title');
title.textContent = 'Trilha do Salto (fechada)'; // troca o texto

const card = document.querySelector('.trail-card');
card.dataset.dificuldade;      // 'moderada': lê o atributo data-dificuldade
card.hidden = true;            // esconde (o mesmo que o atributo hidden no HTML)

const icon = card.querySelector('i');
icon.classList.add('bi-heart-fill');     // põe uma classe
icon.classList.remove('bi-heart');       // tira uma classe
icon.classList.toggle('text-warning');   // põe se não tem, tira se tem

const button = card.querySelector('button');
button.setAttribute('aria-pressed', 'true');
button.getAttribute('aria-pressed');     // 'true' (atributos são sempre texto)
