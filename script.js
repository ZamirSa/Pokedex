async function init() {
    showLoadingSpinner();
    await onloadFunc();
    closeLoadingSpinner();
}


async function onloadFunc() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${amount}`);
    let responseAsJson = await response.json();

    await renderPokemonList(responseAsJson);
}


function showLoadingSpinner() {
    var element = document.getElementById("body");
    element.classList.add("hidden");
    document.getElementById("loading-spinner").showModal();
}


function closeLoadingSpinner() {
    var element = document.getElementById("body");
    element.classList.remove("hidden");
    document.getElementById("loading-spinner").close();
}


async function loadMorePokemon() {
    amount += 24;

    init();
}


async function renderPokemonList(responseAsJson) {
    let pokemonListRef = document.getElementById("pokemon-list");
    pokemonListRef.innerHTML += "";
    for (let i = 0; i < responseAsJson.results.length; i++) {

        await getPokemonList(responseAsJson, pokemonListRef, i);
    }
}


async function getPokemonList(responseAsJson, pokemonListRef, i) {
    let pokemonResponse = await fetch(responseAsJson.results[i].url);
    let pokemonResponseAsJson = await pokemonResponse.json();

    let pokemonName = pokemonResponseAsJson.name;

    let img = pokemonResponseAsJson.sprites.other['official-artwork'].front_default;
    let id = "#" + pokemonResponseAsJson.id;

    let height = pokemonResponseAsJson.height + "0 cm";

    let weightnumber = `${pokemonResponseAsJson.weight / 10}`;
    let weight = weightnumber.replaceAll(".", ",") + " kg";

    pokemonListRef.innerHTML += getPokemonTemplate(i, pokemonName, img, id, pokemonResponseAsJson, height, weight);
    await getPokemonTypes(id, pokemonResponseAsJson);
    console.log(pokemonResponseAsJson)
}


async function getPokemonTypes(id, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {
        let type = pokemonResponseAsJson.types[iType].type.name;
        let color = colours[type];

        document.getElementById("types" + id).innerHTML += `<div style="background-color: ${color};">${pokemonResponseAsJson.types[iType].type.name}</div>`;
    }
}


async function openPokemonOverlay(pokemonName, gif, typeColor, id, height, weight, abilities, pokemonResponseAsJson) {
    var element = document.getElementById("body");
    element.classList.add("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.showModal();
    pokemonOverlay.innerHTML = getPokemonOverlayTemplate(pokemonName, gif, typeColor, id, height, weight, abilities);
    document.getElementById("overlay-types" + id).innerHTML = document.getElementById("types" + id).innerHTML;
}


function closePokemonOverlay() {
    var element = document.getElementById("body");
    element.classList.remove("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.close();

}


function logDownWBubblingProtection(event) {
    event.stopPropagation();
}
