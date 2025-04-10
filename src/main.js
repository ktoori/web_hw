const loadSpellsButton = document.querySelector('#load-spells-button');
const spellCardsContainer = document.querySelector('.spell-cards');

loadSpellsButton.addEventListener('click', fetchAllSpells);

async function fetchAllSpells() {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells/');
        if (!response.ok) {
            throw new Error('Ошибка загрузки заклинаний');
        }
        const data = await response.json();
        displaySpells(data.results);
    } catch (error) {
        console.error('Ошибка при загрузке заклинаний:', error);
    }
}

function getRandomSpells(spells, count) {
  const shuffled = spells.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displaySpells(spells) {
    spellCardsContainer.innerHTML = ''; 
    const randomSpells = getRandomSpells(spells, 5);
    randomSpells.forEach(spell => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <h3>${spell.name}</h3>
            <button class="det-button">Подробнее</button>
        `;
        
        const detailsButton = card.querySelector('.det-button');
        detailsButton.addEventListener('click', () => loadSpellDetails(spell.index));
        
        spellCardsContainer.appendChild(card);
    });
}

async function loadSpellDetails(spellId) {
  const detailsDiv = document.querySelector(".spell-details");

  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellId}`);
  const detailsData = await response.json();
  detailsDiv.innerHTML = detailsData.desc.join('<br>');
  detailsDiv.style.display = 'block';
}