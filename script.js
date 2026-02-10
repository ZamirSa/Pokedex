async function onloadFunc() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
    let responseAsJson = await response.json();

    await renderPokemonList(responseAsJson);

}

async function renderPokemonList(responseAsJson) {
    let pokemonListRef = document.getElementById("pokemon-list");
    pokemonListRef.innerHTML = "";
    for (let i = 0; i < responseAsJson.results.length; i++) {
        pokemonName = responseAsJson.results[i].name;

        await getPokemonList(responseAsJson, pokemonListRef, i);
    }
}

async function getPokemonList(responseAsJson, pokemonListRef, i) {
    let pokemonResponse = await fetch(responseAsJson.results[i].url);
    let pokemonResponseAsJson = await pokemonResponse.json();

    let img = pokemonResponseAsJson.sprites.other['official-artwork'].front_default;
    let id = "#" + pokemonResponseAsJson.id;

    pokemonListRef.innerHTML += getPokemonTemplate(i, pokemonName, img, id, responseAsJson);
    await getPokemonTypes(i, pokemonResponseAsJson);
}

async function getPokemonTypes(i, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {
        document.getElementById("types" + i).innerHTML += `<div>${pokemonResponseAsJson.types[iType].type.name}</div>`
    }
}

function getPokemonTemplate(i, pokemonName, img, id) {
    return `
        <figure>
            <div><img src="${img}" alt=""></div>
            <p>${id}</p>
            <h2>${pokemonName}</h2>
            <span id="types${i}"></span>
        </figure>
        `
}