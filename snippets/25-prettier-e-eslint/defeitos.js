import { getTrails } from './api.js';

const trailList = document.querySelector('#trail-list');
let total = 0;

function statusText(count) {
  if (count == 0) return 'Nenhuma trilha.';
  return `${count} trilhas`;
}

async function load() {
  const data = await getTrails();
  trailList.textContent = statusText(data.length);
  console.log(data);
  render(data);
}
