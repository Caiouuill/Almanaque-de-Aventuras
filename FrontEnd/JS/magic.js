const spellsContainer = document.getElementById('spells-container');
const alcanceFilter = document.getElementById('alcanceFilter');
const tipoMagiaFilter = document.getElementById('tipoMagiaFilter');
const ritualFilter = document.getElementById('ritualFilter');
const tempoFilter = document.getElementById('tempoFilter');

let spells = [];

async function fetchSpells() {
  try {
    // Se seu backend está no localhost:3000, colocar endereço completo evita problema CORS ou URL relativa errada
    const res = await fetch('http://localhost:3000/api/magias');
    spells = await res.json();
    console.log('Spells recebidas:', spells);
    renderSpells(spells);
  } catch (err) {
    spellsContainer.innerHTML = '<p>Erro ao carregar magias.</p>';
    console.error(err);
  }
}

function renderSpells(spellsToRender) {
  spellsContainer.innerHTML = '';

  if (spellsToRender.length === 0) {
    spellsContainer.innerHTML = '<p>Nenhuma magia encontrada.</p>';
    return;
  }

  spellsToRender.forEach(spell => {
    const alcanceTipo = spell.alcance?.tipo || 'Indefinido';
    const alcanceDistancia = spell.alcance?.distancia ? 
      ` ${spell.alcance.distancia}${alcanceTipo === 'Metros' ? 'm' : (alcanceTipo === 'Km' ? 'km' : '')}` : '';

    // Monta os componentes em texto, só mostra os que são true, e mostra I se existir
    const componentes = [];
    if(spell.componentes?.V) componentes.push('V');
    if(spell.componentes?.S) componentes.push('S');
    if(spell.componentes?.M) componentes.push('M');
    if(spell.componentes?.I) componentes.push(`(${spell.componentes.I})`);
    const componentesTexto = componentes.join(', ') || 'Nenhum';

    const niveisAltosTexto = spell.niveisAltos ? `<p><strong>Níveis Altos:</strong> ${spell.niveisAltos}</p>` : '';

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${spell.nome} (${spell.nivel})</h3>
      <p><strong>Escola:</strong> ${spell.escola}</p>
      <p><strong>Tempo de Conjuração:</strong> ${spell.tempoConjuracao}</p>
      <p><strong>Alcance:</strong> ${alcanceTipo}${alcanceDistancia}</p>
      <p><strong>Componentes:</strong> ${componentesTexto}</p>
      <p><strong>Duração:</strong> ${spell.duracao}</p>
      <p><strong>Tipo:</strong> ${spell.tipoMagia || 'Indefinido'}</p>
      <p><strong>Ritual:</strong> ${spell.ritual ? 'Sim' : 'Não'}</p>
      <p><strong>Descrição:</strong> ${spell.descricao}</p>
      ${niveisAltosTexto}
      <p><strong>Livro:</strong> ${spell.livro} (p. ${spell.pagina})</p>
    `;
    spellsContainer.appendChild(card);
  });
}

function applyFilters() {
  let filtered = spells;

  const alcanceVal = alcanceFilter.value;
  if (alcanceVal) {
    filtered = filtered.filter(spell => spell.alcance?.tipo === alcanceVal);
  }

  const tipoVal = tipoMagiaFilter.value;
  if (tipoVal) {
    filtered = filtered.filter(spell => spell.tipoMagia === tipoVal);
  }

  const ritualVal = ritualFilter.value;
  if (ritualVal) {
    filtered = filtered.filter(spell => String(spell.ritual) === ritualVal);
  }

  const tempoVal = tempoFilter.value.toLowerCase();
  if (tempoVal) {
    filtered = filtered.filter(spell => spell.tempoConjuracao.toLowerCase() === tempoVal);
  }

  renderSpells(filtered);
}

alcanceFilter.addEventListener('change', applyFilters);
tipoMagiaFilter.addEventListener('change', applyFilters);
ritualFilter.addEventListener('change', applyFilters);
tempoFilter.addEventListener('change', applyFilters);

fetchSpells();

const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');

filterToggle.addEventListener('click', () => {
  const isOpen = filterPanel.classList.toggle('open');

  filterToggle.textContent = isOpen ? 'Filtros ▲' : 'Filtros ▼';
});


