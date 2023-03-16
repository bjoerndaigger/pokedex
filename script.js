let pokemonData = []; // globale Variable die JSON von API aufruft

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

async function loadPokemon() {
    for (let i = 1; i < 150; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`; // URL der API
        let response = await fetch(url); // Aufruf an Server und Abruf der Daten
        let pokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
        pokemonData.push(pokemon); // push der Daten in Array pokemonData
        renderPokemon();
    }
}

function renderPokemon() {
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        const pokemonName = pokemonData[i];
        
        let name = pokemonName['name'];
        let id = pokemonName['id'];
        let idAsString = id.toString().padStart(3, '0');
        let image = pokemonName['sprites']['other']['official-artwork']['front_default'];
        let type = pokemonName['types'][0]['type']['name'];
       
        content.innerHTML += `
            <div id="frame${i}" class="m-5">
                <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between">
                        <h2 class="text-capitalize">${name}</h2><div>#${idAsString}</div>
                    </div>
                    <div class="text-capitalize">${type}</div>
                </div>
                <img class="pokemon-img" src="${image}">
            </div>
        `;
        chooseBackgroundColor(i, type);
    }
}

function chooseBackgroundColor(i, type) {
    if (type == 'grass') {
        document.getElementById(`frame${i}`).classList.add('bg-green');
    }
    if (type == 'fire') {
        document.getElementById(`frame${i}`).classList.add('bg-red');
    }
    if (type == 'water') {
        document.getElementById(`frame${i}`).classList.add('bg-blue');
    }
}


/* function renderPokemonCard() {
    document.getElementById('pokemon-name').innerHTML = pokemonData['name']; // rendern des Namens
    document.getElementById('pokemon-img').src = pokemonData['sprites']['other']['official-artwork']['front_default'];
}*/