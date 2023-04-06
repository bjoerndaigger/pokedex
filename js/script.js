let pokemonData = []; // pokemon list
let selectedPokemon = []; // pokemon search
let startLoading = 1
let endLoading = 31;


/**
 * function to load 30 pokemon from api
 */
async function loadPokemon() {
    for (let i = startLoading; i < endLoading; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let pokemon = await response.json();
        pokemonData.push(pokemon);
        renderPokemonList();
    }
}


/**
 * function to render pokemon list
 * 
 * @param {json} pokemonData contains all infos for pokemon list
 * @param {boolean} search checks if the list of all pokemon (false) or only the search results (true) will rendered
 */
function renderPokemonList() {
    let search = false;
    renderPokemon(pokemonData, search);
}


/**
 * function to load 20 more pokemon from api
 */
function loadMorePokemon() {
    startLoading = endLoading;
    endLoading = endLoading + 20;
    loadPokemon();
}


/**
 * function to render pokemon list or search results
 * 
 * @param {json} currentPokemon contains all infos about current pokemon
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
function renderPokemon(currentPokemon, search) {
    let content = document.getElementById('pokemon');
    content.innerHTML = '';

    for (let i = 0; i < currentPokemon.length; i++) {
        content.innerHTML += htmlRenderPokemon(i, currentPokemon, search);
        renderPokemonTypes(i, currentPokemon);
        getBackgroundColor(i, currentPokemon);
    }
}


/**
 * function to render pokemon types
 * 
 * @param {number} i to get the correct counter index
 * @param {json} currentPokemon contains all infos about current pokemon
 */
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


/**
 * function to add the correct background color to each pokemon
 * 
 * @param {number} i to get the correct counter index
 * @param {json} currentPokemon contains all infos about current pokemon
 */
function getBackgroundColor(i, currentPokemon) {
    let color = currentPokemon[i]['types'][0]['type']['name'];
    document.getElementById(`pokemon${i}`).classList.add(color);
}


/**
 * POPUP CARD
 * function to open popup card with details for current pokemon
 * 
 * @param {number} i to get the correct counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
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


/**
 * POPUP CARD
 * function to get content for current pokemon popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {json} currentPokemon contains all infos about current pokemon
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
function contentPopupCard(i, currentPokemon, search) {
    document.getElementById('card-container').innerHTML = htmlOpenPopupCard(i, currentPokemon, search);
    renderTypesPopupCard(i, currentPokemon);
    getBackgroundColorPopupCard(i, currentPokemon);
    showAbout(i, search);
    hideBackAndForwardBtn(i, search);
}


/**
 * POPUP CARD
 * function to get types for current pokemon popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {json} currentPokemon contains all infos about current pokemon
 */
function renderTypesPopupCard(i, currentPokemon) {
    let content = document.getElementById(`pokecard-types${i}`);
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const types = currentPokemon['types'][i]['type']['name'];

        content.innerHTML += `
            <div class="text-capitalize type-field rounded-5 type-field-popup">${types}</div>
        `;
    }
}


/**
 * POPUP CARD
 * function to render about details for current pokemon popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
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


/**
 * POPUP CARD
 * function to render abilities for current pokemon popup card
 * 
 * @param {json} currentPokemon contains all infos about current pokemon
 */
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


/**
 * POPUP CARD
 * function to render stats for current pokemon popup card
 * 
 * @param {number} i renders the pokemon stats on the same counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
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


/**
 * POPUP CARD
 * function to add the correct background color for current popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {json} currentPokemon contains all infos about current pokemon
 */
function getBackgroundColorPopupCard(i, currentPokemon) {
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokemon-card${i}`).classList.add(color);
}


/**
 * POPUP CARD
 * function to close popup card by click on close button or website background
 */
function closePopupCard() {
    document.getElementById('card-container').classList.add('d-none');
}


/**
 * POPUP CARD
 * function to stop closing popup card by click on popup card background
 */
function doNotClosePopupCardContent(event) {
    event.stopPropagation();
}


/**
 * POPUP CARD
 * function to go to previous popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
function previousPokemon(i, search) {
    document.getElementById('card-container').innerHTML = '';
    i--;
    openPopupCard(i, search)
}


/**
 * POPUP CARD
 * function to go to next popup card
 * 
 * @param {number} i to get the correct counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
function nextPokemon(i, search) {
    document.getElementById('card-container').innerHTML = '';
    i++;
    openPopupCard(i, search)
}


/**
 * POPUP CARD
 * function to disable back or forward button when end of array/index is arrived
 * 
 * @param {number} i to get the correct counter index
 * @param {boolean} search is false, pokemon list will be rendered / is true, pokemon search will be rendered
 */
function hideBackAndForwardBtn(i, search) {
    if (i == 0) {
        document.getElementById('back-btn').classList.add('d-none');
    }
    if (i == pokemonData.length - 1 && search === false) {
        document.getElementById('forward-btn').classList.add('d-none');
    }
    if (i == selectedPokemon.length - 1 && search === true) {
        document.getElementById('forward-btn').classList.add('d-none');
    }
}

