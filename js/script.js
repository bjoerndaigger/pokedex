let pokemonData = []; // globale Variable die JSON von API aufruft
let selectedPokemon = []; // JSON Ergebnisse von Pokemon Search-Funktion
let startLoading = 1
let endLoading = 21;


async function loadPokemon() {
    for (let i = startLoading; i < endLoading; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`; // URL der API
        let response = await fetch(url); // Aufruf an Server und Abruf der Daten
        let pokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
        pokemonData.push(pokemon); // push der Daten in Array pokemonData
        renderPokemon(pokemonData, false);  // render komplette Pokemon Liste, wenn Search-Input leer ist
    }
}


function loadMorePokemon() {
    startLoading = endLoading;
    endLoading = endLoading + 20;
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
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    if (searchInput.length > 0) {
        selectedPokemon = [];
        for (let i = 0; i < pokemonData.length; i++) {
            const result = pokemonData[i];
            if (result['name'].toLowerCase().includes(searchInput)) {
                selectedPokemon.push(result);
                renderPokemon(selectedPokemon, true);
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
function renderPokemon(currentPokemon, search) {
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon.length; i++) {
        content.innerHTML += htmlRenderPokemon(i, currentPokemon, search);
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
// If-Else, which renders all Pokemon or search results

function openPopupCard(i, search) {
    document.getElementById('card-container').classList.remove('d-none');
    if (search === false) {
        let currentPokemon = pokemonData[i];
        contentPopupCard(i, currentPokemon, search);
    } else {
        let currentPokemon = selectedPokemon[i];
        contentPopupCard(i, currentPokemon, search);
    }
}


function contentPopupCard(i, currentPokemon, search) {
    document.getElementById('card-container').innerHTML = htmlOpenPopupCard(i, currentPokemon, search);
    renderTypesPopupCard(i, currentPokemon);
    getBackgroundColorPopupCard(i, currentPokemon);
    showAbout(i, search);
}


function renderTypesPopupCard(i, currentPokemon) {
    let content = document.getElementById(`pokecard-types${i}`);
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const types = currentPokemon['types'][i]['type']['name'];

        content.innerHTML += `
            <div class="text-capitalize type-field rounded-5 type-field-popup">${types}</div>
        `;
    }
}


function showAbout(i, search) {
    document.getElementById('pokemon-card-nav-link-2').classList.remove('text-dark');
    document.getElementById('pokemon-card-nav-link-1').classList.add('text-dark');

    let content = document.getElementById('more-details');
    content.innerHTML = '';

    if (search === false) {
        let currentPokemon = pokemonData[i];
        content.innerHTML += htmlShowAbout(currentPokemon);
        getAbilities(currentPokemon);
    } else {
        let currentPokemon = selectedPokemon[i];
        content.innerHTML += htmlShowAbout(currentPokemon);
        getAbilities(currentPokemon);
    }
}


function getAbilities(currentPokemon) {
    let content = document.getElementById('abilities');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        const abilities = currentPokemon['abilities'][i]['ability']['name'];

        content.innerHTML += `
            <div>${abilities}</div>
        `;

    }
}


function showStats(i, search) {
    document.getElementById('pokemon-card-nav-link-1').classList.remove('text-dark');
    document.getElementById('pokemon-card-nav-link-2').classList.add('text-dark');

    let content = document.getElementById('more-details');
    content.innerHTML = '';

    if (search === false) {
        let currentPokemon = pokemonData[i];
        content.innerHTML += htmlShowStats(currentPokemon);

    } else {
        let currentPokemon = selectedPokemon[i];
        content.innerHTML += htmlShowStats(currentPokemon);
    }
}


function getBackgroundColorPopupCard(i, currentPokemon) {
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokemon-card${i}`).classList.add(color);
}


function closePopupCard() {
    document.getElementById('card-container').classList.add('d-none');
}


// stop closing popup card by click on background for popup card content
function doNotClosePopupCardContent(event) {
    event.stopPropagation();
}


/*function previousPokemon(i, search) {
    if (search === false) {
        let currentPokemon = pokemonData[i];
        backwards(i, currentPokemon, search);
    } else {
        let currentPokemon = selectedPokemon[i];
        backwards(i, currentPokemon, search);
    }
}


function backwards(i, currentPokemon, search) {
        i--;
        document.getElementById('card-container').innerHTML = ``;
        openPopupCard(i, search);
}


function nextPokemon(i, search) {
    if (search === false) {
        let currentPokemon = pokemonData[i];
        forward(i, currentPokemon, search);
    } else {
        let currentPokemon = selectedPokemon[i];
        forward(i, currentPokemon, search);
    }
}


function forward(i, currentPokemon, search) {
        i++;
        document.getElementById('card-container').innerHTML = '';
        openPopupCard(i, search);
}

/* function previousPokemon(i) {
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
} */

