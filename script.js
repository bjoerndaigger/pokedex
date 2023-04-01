let pokemonData = []; // globale Variable die JSON von API aufruft
let selectedPokemon = []; // JSON Ergebnisse von Pokemon Search-Funktion
let currentPokemon;
let startLoading = 1
let endLoading = 21;


async function loadPokemon() {
    for (let i = startLoading; i < endLoading; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`; // URL der API
        let response = await fetch(url); // Aufruf an Server und Abruf der Daten
        let pokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
        pokemonData.push(pokemon); // push der Daten in Array pokemonData
        renderPokemon(pokemonData);
    }
}


function loadMorePokemon() {
    startLoading = endLoading;
    endLoading = endLoading + 10;
    loadPokemon();
}

// Search

// Funktion wird aufgerufen, wenn die Entertaste im Inputfeld gedrückt wird
let input = document.getElementById('search-input');

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
});

// Funktion, die den Wert des Inputfeldes ausgibt
function searchPokemon() {
    let search = document.getElementById('search-input').value;
    search = search.toLowerCase();
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    if (search != 0) {
        for (let i = 0; i < pokemonData.length; i++) {
            const result = pokemonData[i];
            if (result['name'].toLowerCase().includes(search)) {
                selectedPokemon.push(result);
                renderPokemon(selectedPokemon);
                document.getElementById('load-btn').classList.add('d-none');
            }
        }
    } else {
        selectedPokemon = [];
        renderPokemon(pokemonData);
        document.getElementById('load-btn').classList.remove('d-none');
    }
    document.getElementById('search-input').value = '';
}


// Render Pokemonlist
function renderPokemon(currentPokemon) {
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon.length; i++) {
        let name = currentPokemon[i]['name'];
        let id = currentPokemon[i]['id'];
        let idAsString = id.toString().padStart(3, '0');
        let image = currentPokemon[i]['sprites']['other']['official-artwork']['front_default'];

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
        renderPokemonTypes(i, currentPokemon);
        getBackgroundColor(i, currentPokemon);
    }
}


function renderPokemonTypes(i, currentPokemon) {
    let content = document.getElementById(`pokemon-types${i}`);
    let pokemon = currentPokemon[i];
    for (let i = 0; i < pokemon['types'].length; i++) {
        const types = pokemon['types'][i]['type']['name'];

        content.innerHTML += `
            <div class="text-capitalize type-field rounded-5 mb-1">${types}</div>
         `;
    }
}


function getBackgroundColor(i, currentPokemon) {
    let color = currentPokemon[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon${i}`).classList.add(color);
}

// PopupCard
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
                <div class="d-flex justify-content-between">
                    <img id="back-btn" class="back-btn" src="./img/arrow-back.png" onclick="previousPokemon(${i})">
                    <img id="forward-btn" class="forward-btn" src="./img/arrow-forward.png" onclick="nextPokemon(${i})">
                </div>
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
    renderTypesPopupCard(i);
    getBackgroundColorPopupCard(i);
    showAbout(i);
    getAbilities(i);
}


function renderTypesPopupCard(i) {
    let content = document.getElementById(`pokecard-types${i}`);
    let pokemon = pokemonData[i];
    for (let i = 0; i < pokemon['types'].length; i++) {
        const types = pokemon['types'][i]['type']['name'];

        content.innerHTML += `
            <div class="text-capitalize type-field rounded-5 type-field-popup">${types}</div>
        `;
    }
}


function showAbout(i) {
    document.getElementById('pokemon-card-nav-link-2').classList.remove('text-dark');
    document.getElementById('pokemon-card-nav-link-1').classList.add('text-dark');

    let content = document.getElementById('more-details');
    content.innerHTML = '';

    let height = pokemonData[i]['height'];
    height = height / 10;
    height = height.toString().replace('.', ',');
    let weight = pokemonData[i]['weight'];
    weight = weight / 10;
    weight = weight.toString().replace('.', ',');

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
		        <td id="abilities" class="text-capitalize"></td>				
	        </tr>
        </table>
    `;
}


function getAbilities(i) {
    let content = document.getElementById('abilities');
    content.innerHTML = '';

    for (let j = 0; j < pokemonData[i]['abilities'].length; j++) {
        const abilities = pokemonData[i]['abilities'][j]['ability']['name'];

        content.innerHTML += `
            <div>${abilities}</div>
        `;

    }

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
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${hp / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${hp}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Attack</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${attack / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${attack}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Defense</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${defense / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${defense}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Sp. Atk</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${specialAttack / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${specialAttack}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Sp. Def</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${specialDefense / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${specialDefense}</div>
                    </div>
                </td>				
            </tr>
            <tr>
                <td class="text-secondary small">Speed</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: ${speed / 150 * 100}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${speed}</div>
                    </div>
                </td>				
            </tr>
        </table>
    `;
}


function getBackgroundColorPopupCard(i) {
    let color = pokemonData[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon-card${i}`).classList.add(color);
}


function previousPokemon(i) {
    if (i == 0) {
        document.getElementById('card-container').innerHTML = ``;
        i = pokemonData.length - 1;
        openPopupCard(i);
    } else {
        i--;
        document.getElementById('card-container').innerHTML = ``;
        openPopupCard(i);
    }
}


function nextPokemon(i) {
    if (i == pokemonData.length - 1) {
        document.getElementById('card-container').innerHTML = '';
        i = 0;
        openPopupCard(i);

    } else {
        i++;
        document.getElementById('card-container').innerHTML = '';
        openPopupCard(i);
    }
}


function closePopupCard() {
    let element = document.getElementById('card-container');
    element.classList.add('d-none');

}


