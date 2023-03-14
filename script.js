let pokemonData = []; // globale Variable die JSON von API aufruft

async function loadPokemon() {
    for (let i = 1; i < 5; i++) {
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
        content.innerHTML += `
            <div>
                <h2 class="text-capitalize">${pokemonName['name']}</h2>
                <img class="pokemon-img" src="${pokemonName['sprites']['other']['official-artwork']['front_default']}">
            </div>
        `;
    }
}


/* function renderPokemonCard() {
    document.getElementById('pokemon-name').innerHTML = pokemonData['name']; // rendern des Namens
    document.getElementById('pokemon-img').src = pokemonData['sprites']['other']['official-artwork']['front_default'];
}*/