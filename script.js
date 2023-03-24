let pokemonData = []; // globale Variable die JSON von API aufruft
let loadedPokemon = 1
let pokemonAmount = 11;


async function loadPokemon() {
    for (let i = loadedPokemon; i < pokemonAmount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`; // URL der API
        let response = await fetch(url); // Aufruf an Server und Abruf der Daten
        let pokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
        pokemonData.push(pokemon); // push der Daten in Array pokemonData
        renderPokemon();
    }
}


function loadMorePokemoon() {
    loadedPokemon + 10;
    pokemonAmount + 10;
    console.log(loadedPokemon, pokemonAmount);
}


function renderPokemon() {
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        const pokemon = pokemonData[i];

        let name = pokemon['name'];
        let id = pokemon['id'];
        let idAsString = id.toString().padStart(3, '0');
        let image = pokemon['sprites']['other']['official-artwork']['front_default'];

        content.innerHTML += /*html*/ `
            <div id="pokemon${i}" class="pokemon-container text-white m-3 p-3 rounded-5" onclick="openPopupCard(${i})"> 
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
        renderPokemonTypes(i);
        getBackgroundColor(i);
    }
}


function renderPokemonTypes(i) {
    let pokemon = pokemonData[i];
    let content = document.getElementById(`pokemon-types${i}`);

    let types = getTypes(pokemon);
    for (let i = 0; i < types.length; i++) {
        content.innerHTML += `
        <div class="text-capitalize type-field rounded-5 mb-1">${types[i]}</div>
    `;
    }
}


function getBackgroundColor(i) {
    let color = pokemonData[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon${i}`).classList.add(color);
}


function openPopupCard(i) {
    let element = document.getElementById('card-container');
    element.classList.remove('d-none');
    contentPopupCard(i);
}


function contentPopupCard(i) {
    let pokemon = pokemonData[i];
    let name = pokemon['name'];
    let id = pokemon['id'];
    let idAsString = id.toString().padStart(3, '0');
    let image = pokemon['sprites']['other']['official-artwork']['front_default'];
    let height = pokemon['height'] / 10;
    let weight = pokemon['weight'] / 10;
    let ability1 = pokemon['abilities'][0]['ability']['name'];
    let ability2 = pokemon['abilities'][1]['ability']['name'];


    document.getElementById('card-container').innerHTML = /*html*/ `
        <div class="pokemon-card">
            <div id="pokemon-card${i}" class="name-container">
                <img class="close-btn" src="./img/close-btn.png">
            <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <span class="fw-bold">#${idAsString}</span>
                </div>
                <div id="pokecard-types${i}" class="d-flex"></div>
            </div>
            <div class="info-container d-flex flex-column justify-content-start align-items-center">
                <img class="pokemon-card-img" src="${image}">
                <table class="table fw-bold">
	                <tr>
		                <td class="text-secondary">Height</td>
		                <td>${height} m</td>				
	                </tr>
                    <tr>
		                <td class="text-secondary">Weight</td>
		                <td>${weight} kg</td>				
	                </tr>
                    <tr>
		                <td class="text-secondary">Abilities</td>
		                <td class="text-capitalize">${ability1}, ${ability2}</td>				
	                </tr>
                </table>
                
            </div>
        </div>
    `;
    typesPopupCard(i);
    getBackgroundColorPopupCard(i);
}


function typesPopupCard(i) {
    let pokemon = pokemonData[i];
    let content = document.getElementById(`pokecard-types${i}`);

    let types = getTypes(pokemon);
    for (let i = 0; i < types.length; i++) {
        content.innerHTML += `
        <div class="text-capitalize type-field rounded-5">${types[i]}</div>
    `;
    }
}


function getBackgroundColorPopupCard(i) {
    let color = pokemonData[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon-card${i}`).classList.add(color);
}


function getTypes(pokemon) {
    let types = [];
    for (let i = 0; i < pokemon['types'].length; i++) {
        types.push(pokemon['types'][i]['type']['name']);
    }
    return types;
}


function closePopupCard() {
    let element = document.getElementById('card-container');
    element.classList.add('d-none');

}

