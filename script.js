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
    let element = document.getElementById("body");
    element.classList.add("hidden");
    document.getElementById("loading-spinner").showModal();
}


function closeLoadingSpinner() {
    document.getElementById("loading-spinner").close();
    let element = document.getElementById("body");
    element.classList.remove("hidden");
}


async function loadMorePokemon() {
    amount += 24;

    await init();
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

    pokemonListRef.innerHTML += await getPokemonTemplate(i, pokemonName, img, id, pokemonResponseAsJson, height, weight);
    await getPokemonTypes(pokemonResponseAsJson.id, pokemonResponseAsJson);
}


async function getPokemonTypes(id, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {
        let type = pokemonResponseAsJson.types[iType].type.name;
        let color = colours[type];

        document.getElementById("types" + id).innerHTML += `<div style="background-color: ${color};">${pokemonResponseAsJson.types[iType].type.name}</div>`;
    }
}


async function openPokemonOverlay(i) {
    if (i > 0 && i < amount + 25) {
        var element = document.getElementById("body");
        element.classList.add("hidden");

        let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokemonResponseAsJson = await pokemonResponse.json();

        let pokemonName = pokemonResponseAsJson.name;

        let gif = pokemonResponseAsJson.sprites.other['official-artwork'].front_default;
        let id = "#" + pokemonResponseAsJson.id;

        let height = pokemonResponseAsJson.height + "0 cm";

        let weightnumber = `${pokemonResponseAsJson.weight / 10}`;
        let weight = weightnumber.replaceAll(".", ",") + " kg";

        let typeColor = colours[pokemonResponseAsJson.types[0].type.name];

        let abilities = pokemonResponseAsJson.abilities[0].ability.name

        let pokemonOverlay = document.getElementById("pokemon-overlay");
        pokemonOverlay.showModal();
        pokemonOverlay.innerHTML = getPokemonOverlayTemplate(pokemonName, gif, typeColor, id, height, weight, abilities, i);
        document.getElementById("overlay-types" + i).innerHTML = document.getElementById("types" + i).innerHTML;
    } else {
        closePokemonOverlay()
    }
}


function closePokemonOverlay() {
    var element = document.getElementById("body");
    element.classList.remove("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.close();

}

function nextPokemonOverlay() {

}

function logDownWBubblingProtection(event) {
    event.stopPropagation();
}
