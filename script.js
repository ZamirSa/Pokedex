let colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};
let amount = 0;

async function init() {
    showLoadingSpinner();
    await onloadFunc();
    closeLoadingSpinner();
}

async function onloadFunc() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${amount}`);
    let responseAsJson = await response.json();

    renderPokemonList(responseAsJson);
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

function renderPokemonList(responseAsJson) {
    let pokemonListRef = document.getElementById("pokemon-list");
    pokemonListRef.innerHTML += "";
    for (let i = 0; i < responseAsJson.results.length; i++) {

        getPokemonList(responseAsJson, pokemonListRef, i);
    }
}

async function getPokemonList(responseAsJson, pokemonListRef, i) {
    let pokemonResponse = await fetch(responseAsJson.results[i].url);
    let pokemonResponseAsJson = await pokemonResponse.json();

    let pokemonName = pokemonResponseAsJson.name;

    let img = pokemonResponseAsJson.sprites.other['official-artwork'].front_default;
    let id = "#" + pokemonResponseAsJson.id;

    pokemonListRef.innerHTML += getPokemonTemplate(i, pokemonName, img, id, pokemonResponseAsJson);
    getPokemonTypes(id, pokemonResponseAsJson);
    console.log(pokemonResponseAsJson.sprites.other.showdown.front_default)
}


function getPokemonTypes(id, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {
        let type = pokemonResponseAsJson.types[iType].type.name;
        let color = colours[type];

        document.getElementById("types" + id).innerHTML += `<div style="background-color: ${color};">${pokemonResponseAsJson.types[iType].type.name}</div>`
    }
}


function openPokemonOverlay(pokemonName, img) {
    var element = document.getElementById("body");
    element.classList.add("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.showModal();
    pokemonOverlay.innerHTML = getPokemonOverlayTemplate(pokemonName, img);

}

function getPokemonOverlayTemplate(pokemonName, img) {
    return `
    <img src="${img}" alt="">
    <h3>${pokemonName}</h3>
    `
}

function getPokemonTemplate(i, pokemonName, img, id, pokemonResponseAsJson) {
    return `
        <figure onclick="openPokemonOverlay('${pokemonName}', '${pokemonResponseAsJson.sprites.other.showdown.front_default}')">
            <div style="background-color: ${colours[pokemonResponseAsJson.types[0].type.name]}";><img src="${img}" alt=""></div>
            <p>${id}</p>
            <h2>${pokemonName}</h2>
            <span id="types${id}"></span>
        </figure>
        `

}