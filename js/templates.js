function htmlRenderPokemon(i, currentPokemon, search) {
    let name = currentPokemon[i]['name'];
    let id = currentPokemon[i]['id'];
    let idAsString = id.toString().padStart(3, '0');
    let image = currentPokemon[i]['sprites']['other']['official-artwork']['front_default'];

    return /*html*/ `
    <div id="pokemon${i}" class="pokemon-container text-white m-3 p-3 rounded-5" onclick="openPopupCard(${i}, ${search})"> 
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
}


function htmlOpenPopupCard(i, currentPokemon, search) {
    let name = currentPokemon['name'];
    let id = currentPokemon['id'];
    let idAsString = id.toString().padStart(3, '0');
    let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    return /*html*/ `
    <div class="pokemon-card" onclick="doNotClosePopupCardContent(event)">
        <div id="pokemon-card${i}" class="name-container">
            <img class="close-btn" src="./img/close-btn.png" onclick="closePopupCard()">
                <div class="d-flex justify-content-between">
                    <h2 class="text-capitalize">${name}</h2>
                    <span class="fw-bold">#${idAsString}</span>
                </div>
                <div id="pokecard-types${i}" class="d-flex"></div>
            <div class="d-flex justify-content-between">
                <div>
                    <img id="back-btn" class="back-btn" src="./img/arrow-back.png" onclick="previousPokemon(${i}, ${search})">
                </div>
                <div>
                    <img id="forward-btn" class="forward-btn" src="./img/arrow-forward.png" onclick="nextPokemon(${i}, ${search})">
                </div>
            </div>
        </div>
        <div class="info-container d-flex flex-column justify-content-start align-items-center">
            <img class="pokemon-card-img" src="${image}">

            <div class="d-flex justify-content-between w-50 p-2"> 
                <a id="pokemon-card-nav-link-1" class="pokemon-card-nav text-secondary fw-bold" href="javascript:void(0);" onclick="showAbout(${i}, ${search})">About</a>       
                <a id="pokemon-card-nav-link-2" class="pokemon-card-nav text-secondary fw-bold" href="javascript:void(0);" onclick="showStats(${i}, ${search})">Stats</a> 
            </div>
            <div id="more-details" class="w-100">
            </div>
        </div>
    </div>
`;
}


function htmlShowAbout(currentPokemon) {

    let height = currentPokemon['height'];
    height = height / 10;
    height = height.toString().replace('.', ',');
    let weight = currentPokemon['weight'];
    weight = weight / 10;
    weight = weight.toString().replace('.', ',');

    return /*html*/`
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


function htmlShowStats(currentPokemon) {
    let hp = currentPokemon['stats'][0]['base_stat'];
    let attack = currentPokemon['stats'][1]['base_stat'];
    let defense = currentPokemon['stats'][2]['base_stat'];
    let specialAttack = currentPokemon['stats'][3]['base_stat'];
    let specialDefense = currentPokemon['stats'][4]['base_stat'];
    let speed = currentPokemon['stats'][5]['base_stat'];

    return /*html*/`
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