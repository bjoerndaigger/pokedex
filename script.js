let currentPokemon; // globale Variable die JSON von API aufruft

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander'; // URL der API
    let response = await fetch(url); // Aufruf an Server und Abruf der Daten
    currentPokemon = await response.json(); // umwandeln der Textdaten ins JSON-Format
    console.log('loaded Pokemon', currentPokemon);
    renderPokemon();
    renderPokemonCard();
}

function renderPokemon() {
    let name = currentPokemon['name'];
    let img = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    document.getElementById('pokemon').innerHTML = `
        <h2>${name}</h2>
        <img class="pokemon-img" src="${img}">
    `;

}
function renderPokemonCard() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name']; // rendern des Namens
    document.getElementById('pokemon-img').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}