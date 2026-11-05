import { formatDistance, formatDuration } from './format.js';

const DIFFICULTY_LABELS = { facil: 'Fácil', moderada: 'Moderada', dificil: 'Difícil' };

// Uma trilha: os dados (do array, e depois do servidor) e o que se sabe fazer com eles.
export class Trail {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.cidade = data.cidade;
    this.uf = data.uf;
    this.distanciaKm = data.distanciaKm;
    this.dificuldade = data.dificuldade;
    this.duracaoMin = data.duracaoMin;
    this.destaque = data.destaque;
    this.fotos = data.fotos;
  }

  difficultyLabel() {
    return DIFFICULTY_LABELS[this.dificuldade];
  }

  place() {
    return `${this.cidade}, ${this.uf}`;
  }

  distanceText() {
    return `${formatDistance(this.distanciaKm)} km`;
  }

  durationText() {
    return formatDuration(this.duracaoMin);
  }
}
