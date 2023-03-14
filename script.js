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
        let name = pokemonName['name'];
        let id = pokemonName['id'];
        let image = pokemonName['sprites']['other']['official-artwork']['front_default'];
       
        content.innerHTML += `
            <div class="m-5">
                <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <span>#${id}</span>
                </div>
                <img class="pokemon-img" src="${image}">
            </div>
        `;
    }
}


/* function renderPokemonCard() {
    document.getElementById('pokemon-name').innerHTML = pokemonData['name']; // rendern des Namens
    document.getElementById('pokemon-img').src = pokemonData['sprites']['other']['official-artwork']['front_default'];
}*/