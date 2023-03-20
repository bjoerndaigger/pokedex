let pokemonData = []; // globale Variable die JSON von API aufruft

async function loadPokemon() {
    for (let i = 1; i < 11; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`; // URL der API
        let response = await fetch(url); // Aufruf an Server und Abruf der Daten
        let pokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
        pokemonData.push(pokemon); // push der Daten in Array pokemonData
        renderPokemon();
        renderPokemonCard();
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


        content.innerHTML += /*html*/ `
            <div id="frame${i}" class="pokemon-container text-white m-3 p-3 rounded-5"> 
                <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <small class="fw-bold">#${idAsString}</small>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div id="pokemon-types${i}"></div>
                    <img class="pokemon-img" src="${image}"> 
                </div>
            </div>
        `;
        chooseBackgroundColor(i, type);
        renderPokemonTypes(i, pokemonName);
    }
}


function renderPokemonTypes(i, pokemonName) {
    let content = document.getElementById(`pokemon-types${i}`);
    for (let i = 0; i < pokemonName['types'].length; i++) {
        const types = pokemonName['types'][i]['type']['name'];

        content.innerHTML += `
        <div class="text-capitalize type-field rounded-5 mb-1">${types}</div>
    `;
    }
}


function chooseBackgroundColor(i, type) {
    document.getElementById(`frame${i}`).classList.add(type);

}


function renderPokemonCard() {
    document.getElementById('pokemon-name').innerHTML = 'Test';
}

