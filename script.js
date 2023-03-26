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

        let name = pokemonData[i]['name'];
        let id = pokemonData[i]['id'];
        let idAsString = id.toString().padStart(3, '0');
        let image = pokemonData[i]['sprites']['other']['official-artwork']['front_default'];

        content.innerHTML += /*html*/ `
            <div id="pokemon${i}" class="pokemon-container text-white m-3 p-3 rounded-5" onclick="openPopupCard(${i})"> 
                <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <span class="fw-bold small">#${idAsString}</span>
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
    let name = pokemonData[i]['name'];
    let id = pokemonData[i]['id'];
    let idAsString = id.toString().padStart(3, '0');
    let image = pokemonData[i]['sprites']['other']['official-artwork']['front_default'];


    document.getElementById('card-container').innerHTML = /*html*/ `
        <div class="pokemon-card">
            <div id="pokemon-card${i}" class="name-container">
                <img class="close-btn" src="./img/close-btn.png" onclick="closePopupCard()">
            <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <span class="fw-bold">#${idAsString}</span>
                </div>
                <div id="pokecard-types${i}" class="d-flex"></div>
            </div>
            <div class="info-container d-flex flex-column justify-content-start align-items-center">
                <img class="pokemon-card-img" src="${image}">

                <div class="d-flex justify-content-between w-50 p-2"> 
                    <a id="pokemon-card-nav-link-1" class="pokemon-card-nav text-secondary fw-bold" href="javascript:void(0);" onclick="showAbout(${i})">About</a>       
                    <a id="pokemon-card-nav-link-2" class="pokemon-card-nav text-secondary fw-bold" href="javascript:void(0);" onclick="showStats(${i})">Stats</a> 
                </div>
                <div id="more-details" class="w-100">
                </div>
            </div>
        </div>
    `;
    typesPopupCard(i);
    getBackgroundColorPopupCard(i);
    showAbout(i);
}

function showAbout(i) {
    document.getElementById('pokemon-card-nav-link-2').classList.remove('text-dark');
    document.getElementById('pokemon-card-nav-link-1').classList.add('text-dark');

    let content = document.getElementById('more-details');
    content.innerHTML = '';

    let height = pokemonData[i]['height'] / 10;
    let weight = pokemonData[i]['weight'] / 10;
    let ability1 = pokemonData[i]['abilities'][0]['ability']['name'];
    let ability2 = pokemonData[i]['abilities'][1]['ability']['name'];

    content.innerHTML += /*html*/`
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
    `;
}

function showStats(i) {
    document.getElementById('pokemon-card-nav-link-1').classList.remove('text-dark');
    document.getElementById('pokemon-card-nav-link-2').classList.add('text-dark');

    let hp = pokemonData[i]['stats'][0]['base_stat'];
    let attack = pokemonData[i]['stats'][1]['base_stat'];
    let defense = pokemonData[i]['stats'][2]['base_stat'];
    let specialAttack = pokemonData[i]['stats'][3]['base_stat'];
    let specialDefense = pokemonData[i]['stats'][4]['base_stat'];
    let speed = pokemonData[i]['stats'][5]['base_stat'];

    let content = document.getElementById('more-details');
    content.innerHTML = '';

    content.innerHTML += /*html*/`
        <table class="table">
            <tr>
                <td class="text-secondary small">HP</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${hp}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${hp}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Attack</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${attack}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${attack}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Defense</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${defense}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${defense}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Sp. Atk</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${specialAttack}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${specialAttack}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Sp. Def</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${specialDefense}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${specialDefense}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Speed</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${speed}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${speed}</div>
                    </div>
                </td>				
            </tr>
        </table>
    `;
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

