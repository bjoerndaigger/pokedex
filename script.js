let pokemonData = []; // globale Variable die JSON von API aufruft


async function loadPokemon() {
    for (let i = 1; i < 11; i++) {
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
        const pokemon = pokemonData[i];

        let name = pokemon['name'];
        let id = pokemon['id'];
        let idAsString = id.toString().padStart(3, '0');
        let image = pokemon['sprites']['other']['official-artwork']['front_default'];


        content.innerHTML += /*html*/ `
            <div id="frame${i}" class="pokemon-container text-white m-3 p-3 rounded-5" onclick="openPopupCard(${i})"> 
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
        renderPokemonTypes(i, pokemon);
        chooseBackgroundColor(i, pokemon);
        
    }
}

function renderPokemonTypes(i, pokemon) {
    let content = document.getElementById(`pokemon-types${i}`);
    for (let i = 0; i < pokemon['types'].length; i++) {
        const types = pokemon['types'][i]['type']['name'];

        content.innerHTML += `
        <div class="text-capitalize type-field rounded-5 mb-1">${types}</div>
    `;
    }
}


function chooseBackgroundColor(i, pokemon) {
    let type = pokemon['types'][0]['type']['name'];
    document.getElementById(`frame${i}`).classList.add(type);

}


function openPopupCard(i) {
   let element = document.getElementById('card-container');
    element.classList.remove('d-none');
    contentPopupCard(i);
}

function contentPopupCard(i) {
    document.getElementById('card-container').innerHTML = /*html*/ `
        <h2>NAME</h2>
    `;
}


function closePopupCard() {
    let element = document.getElementById('card-container');
    element.classList.add('d-none');
    
}

