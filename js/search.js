/**
 * activates search by click on enter key
 */
let input = document.getElementById('search-input');

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
});


/**
 * function to search for pokemon by clicking on the search-input
 * 
 * * @param {json} selectedPokemon contains all infos about searched pokemon
 */
function pokemonSearch() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    if (searchInput.length > 0) {
        selectedPokemon = [];
        let matchFound = false; // initialize matchfound to false
        for (let i = 0; i < pokemonData.length; i++) {
            const result = pokemonData[i];
            if (result['name'].toLowerCase().includes(searchInput)) {
                selectedPokemon.push(result);
                renderPokemonSearch(selectedPokemon);
                matchFound = true; // set matchfound to true if a match is found
            }
        }
        if (matchFound === false) { // rendernomatchfound if no match is found
            renderNoMatchFound();
        }
    }
    else {
        clearPokemonSearch();
    }
    resetSearchInput();
}


/**
 * function to show that no search result was found
 */
function renderNoMatchFound() {
    let content = document.getElementById('pokemon');
    content.innerHTML = '<div>No match! Try again or load more Pokemon.</div>';
}


/**
 * function to clear pokemon search and go back to pokemon list
 */
function clearPokemonSearch() {
    selectedPokemon = [];
    renderPokemonList();
    document.getElementById('load-btn').classList.remove('d-none');
}


/**
 * function to render search results and disable load more button
 * 
 * @param {json} selectedPokemon contains all infos about searched pokemon
 * @param {boolean} search checks if the list of all pokemon (false) or only the search results (true) will be rendered
 */
function renderPokemonSearch(selectedPokemon) {
    let search = true;

    renderPokemon(selectedPokemon, search);
    document.getElementById('load-btn').classList.add('d-none');
}


/**
 * function to reset automatically the value of the search-input 
 */
function resetSearchInput() {
    document.getElementById('search-input').value = '';
}