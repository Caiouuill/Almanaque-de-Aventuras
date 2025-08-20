const spellsContainer = document.getElementById('spells-container');

// Filtros
const nomeFilter = document.getElementById('nomeFilter');
const classeFilter = document.getElementById('classeFilter');
const componenteFilter = document.getElementById('componenteFilter');
const nivelFilter = document.getElementById('nivelFilter');
const alcanceFilter = document.getElementById('alcanceFilter');
const tipoMagiaFilter = document.getElementById('tipoMagiaFilter');
const ritualFilter = document.getElementById('ritualFilter');
const tempoFilter = document.getElementById('tempoFilter');
const bookFilter = document.getElementById('bookFilter');

let spells = [];

async function fetchSpells() {
  try {
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
    // Alcance
    const alcanceTipo = spell.alcance?.tipo || 'Indefinido';
    const alcanceDistancia = spell.alcance?.distancia != null
      ? ` ${spell.alcance.distancia}${alcanceTipo === 'Metros' ? 'm' : (alcanceTipo === 'Km' ? 'km' : '')}`
      : '';

    // Tempo de Conjuração
    const tipoConjuracao = spell.tempoConjuracao?.tipo || 'Indefinido';
    const quantidadeConjuracao = spell.tempoConjuracao?.quantidade;
    const tempoConjuracaoTexto = quantidadeConjuracao != null ? `${quantidadeConjuracao} ${tipoConjuracao}` : tipoConjuracao;

    // Componentes
    const componentes = [];
    if (spell.componentes?.V) componentes.push('V');
    if (spell.componentes?.S) componentes.push('S');
    if (spell.componentes?.M) componentes.push('M');
    if (spell.componentes?.I) componentes.push(`(${spell.componentes.I})`);
    const componentesTexto = componentes.join(', ') || 'Nenhum';

    // Níveis altos
    const niveisAltosTexto = spell.niveisAltos ? `<p><strong>Níveis Altos:</strong> ${spell.niveisAltos}</p>` : '';

    // Criação do card
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h2>${spell.nome || '—'} <span class="english-name">(${spell.nomeIngles || '—'})</span></h2>
      <p class="level-school">${spell.nivel || '—'} nível – ${spell.escola || '—'}</p>
      <p class="classes"><strong>Conjuradores:</strong> ${Array.isArray(spell.classes) ? spell.classes.join(', ') : '—'}</p>
      <p><strong>Tempo de Conjuração:</strong> ${tempoConjuracaoTexto}</p>
      <p><strong>Alcance:</strong> ${alcanceTipo}${alcanceDistancia}</p>
      <p><strong>Componentes:</strong> ${componentesTexto}</p>
      <p><strong>Duração:</strong> ${spell.duracao || '—'}</p>
      <p><strong>Tipo:</strong> ${spell.tipoMagia || 'Indefinido'}</p>
      <p><strong>Ritual:</strong> ${spell.ritual ? 'Sim' : 'Não'}</p>
      <p><strong>Descrição:</strong> ${spell.descricao || '—'}</p>
      ${niveisAltosTexto}
      <p><strong>Livro:</strong> ${spell.livro || '—'} (p. ${spell.pagina || '—'})</p>
    `;
    spellsContainer.appendChild(card);
  });
}


function applyFilters() {
  let filtered = spells;

  // FILTRO POR NOME
  const nomeVal = nomeFilter.value.toLowerCase().trim();
  if (nomeVal) {
    filtered = filtered.filter(spell => spell.nome && spell.nome.toLowerCase().includes(nomeVal));
  }

  // FILTRO POR CLASSE
  const classeVal = classeFilter.value;
  if (classeVal) {
    filtered = filtered.filter(spell => {
      if (!spell.classes) return false;
      if (Array.isArray(spell.classes)) {
        return spell.classes.some(c => c.toLowerCase() === classeVal.toLowerCase());
      } else {
        return spell.classes.toLowerCase() === classeVal.toLowerCase();
      }
    });
  }

  // FILTRO POR COMPONENTE
  const componenteVal = componenteFilter.value;
  if (componenteVal) {
    filtered = filtered.filter(spell => spell.componentes?.[componenteVal]);
  }

  // FILTRO POR NÍVEL
  const nivelVal = nivelFilter.value;
  if (nivelVal) {
    filtered = filtered.filter(spell => spell.nivel === nivelVal);
  }

  // FILTRO POR ALCANCE
  const alcanceVal = alcanceFilter.value;
  if (alcanceVal) {
    filtered = filtered.filter(spell => spell.alcance?.tipo === alcanceVal);
  }

  // FILTRO POR TIPO DE MAGIA
  const tipoVal = tipoMagiaFilter.value;
  if (tipoVal) {
    filtered = filtered.filter(spell => spell.tipoMagia === tipoVal);
  }

  // FILTRO POR RITUAL
  const ritualVal = ritualFilter.value;
  if (ritualVal) {
    filtered = filtered.filter(spell => String(spell.ritual) === ritualVal);
  }

  // FILTRO POR TEMPO DE CONJURAÇÃO
  const tempoVal = tempoFilter.value.toLowerCase();
  if (tempoVal) {
    filtered = filtered.filter(spell => spell.tempoConjuracao.toLowerCase() === tempoVal);
  }

  // FILTRO POR LIVRO
  const bookVal = bookFilter.value;
  if (bookVal) {
    filtered = filtered.filter(spell => spell.livro === bookVal);
  }

  renderSpells(filtered);
}


// Eventos
[nomeFilter, classeFilter, componenteFilter, nivelFilter, alcanceFilter, tipoMagiaFilter, ritualFilter, tempoFilter, bookFilter].forEach(el => {
  el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', applyFilters);
});

// Toggle do painel
const filterToggle = document.getElementById('filterToggle');
const filterPanel = document.getElementById('filterPanel');

filterToggle.addEventListener('click', () => {
  const isOpen = filterPanel.classList.toggle('open');
  filterToggle.textContent = isOpen ? 'Filtros ▲' : 'Filtros ▼';
});

fetchSpells();
