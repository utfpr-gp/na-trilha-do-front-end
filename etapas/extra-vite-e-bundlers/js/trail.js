import { formatDate, formatDistance, formatDuration } from './format.js';

const DIFFICULTY_LABELS = { facil: 'Fácil', moderada: 'Moderada', dificil: 'Difícil' };
const ROUTE_LABELS = { 'ida-e-volta': 'Ida e volta', circular: 'Circular', travessia: 'Travessia' };
const ITEM_LABELS = {
  agua: 'Água',
  lanche: 'Lanche',
  'protetor-solar': 'Protetor solar',
  repelente: 'Repelente',
  'capa-de-chuva': 'Capa de chuva',
  lanterna: 'Lanterna',
};

// Uma trilha: os dados que vêm do servidor e o que se sabe fazer com eles.
export class Trail {
  constructor(data) {
    Object.assign(this, data); // copia todos os campos (nome, cidade, distanciaKm…) para este objeto
  }

  difficultyLabel() {
    return DIFFICULTY_LABELS[this.dificuldade];
  }

  routeLabel() {
    return ROUTE_LABELS[this.tipoPercurso];
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

  lastVisitText() {
    return formatDate(this.ultimaVisita);
  }

  packingList() {
    return (this.oQueLevar ?? []).map((item) => ITEM_LABELS[item] ?? item);
  }
}
