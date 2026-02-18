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


let index = 0;
let amount = 0;
let currentNames = [];
let currentImgs = [];
let currentIds = [];
let currentHeights = [];
let currentWeights = [];
let currentAbilities = [];
let currentTypeColor = [];
let currentHPs = [];
let currentAttacks = [];
let currentDefenses = [];


async function init() {
    showLoadingSpinner();
    await onloadFunc();
    closeLoadingSpinner();
}


async function onloadFunc() {
    for (let i = amount + 1; i < amount + 25; i++) {
        let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${[i]}/`);
        let pokemonResponseAsJson = await pokemonResponse.json();

        let pokemonName = pokemonResponseAsJson.name;

        await renderPokemonList(pokemonResponseAsJson, pokemonName);
    }
}


async function renderPokemonList(pokemonResponseAsJson, pokemonName) {
    let pokemonListRef = document.getElementById("pokemon-list");

    pushSmallCardInfos(pokemonResponseAsJson);
    pushBigCardInfos(pokemonResponseAsJson);
    pushStats(pokemonResponseAsJson);
    getCurrentIndex(pokemonName);

    pokemonListRef.innerHTML += await getPokemonTemplate();
    await getPokemonTypes(currentIds[index], pokemonResponseAsJson);
}

function getCurrentIndex(pokemonName) {
    let currentIndex = currentNames.indexOf(`${pokemonName}`);
    index = currentIndex;
}


function pushSmallCardInfos(pokemonResponseAsJson) {
    currentNames.push(pokemonResponseAsJson.name);
    currentImgs.push(pokemonResponseAsJson.sprites.other['official-artwork'].front_default);
    currentIds.push("#" + pokemonResponseAsJson.id);
    currentTypeColor.push(colours[pokemonResponseAsJson.types[0].type.name]);
}


function pushBigCardInfos(pokemonResponseAsJson) {
    currentHeights.push(pokemonResponseAsJson.height + "0 cm");
    let weightnumber = `${pokemonResponseAsJson.weight / 10}`;
    currentWeights.push(weightnumber.replaceAll(".", ",") + " kg");
    if (pokemonResponseAsJson.abilities.length > 0) {
        currentAbilities.push(pokemonResponseAsJson.abilities[0].ability.name);
    } else {
        currentAbilities.push("none");
    }
}


function pushStats(pokemonResponseAsJson) {
    currentHPs.push(pokemonResponseAsJson.stats[0].base_stat);
    currentAttacks.push(pokemonResponseAsJson.stats[1].base_stat);
    currentDefenses.push(pokemonResponseAsJson.stats[2].base_stat);
}


async function getPokemonTypes(id, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {
        document.getElementById("types" + id).innerHTML +=
            `<div style="background-color: ${currentTypeColor[index]};">${pokemonResponseAsJson.types[iType].type.name}</div>`;
    }
}


async function loadMorePokemon() {
    amount += 24;
    await init();
}


async function openPokemonOverlay(pokemonName) {
    if (currentNames.length > 0) {
        hideBody();
        getCurrentIndex(pokemonName);

        let pokemonOverlay = document.getElementById("pokemon-overlay");
        pokemonOverlay.innerHTML = "";
        pokemonOverlay.showModal();
        pokemonOverlay.innerHTML = await getPokemonOverlayTemplate();
        arrowDisplays()
        document.getElementById("overlay-types" + currentIds[index]).innerHTML = document.getElementById("types" + currentIds[index]).innerHTML;
    } else {
        closePokemonOverlay()
    }
}


function hideBody() {
    let element = document.getElementById("body");
    element.classList.add("hidden");
}


function arrowDisplays() {
    if (index == 0) {
        document.getElementById("arrowleft").style = "display: none;"
    } if (index == currentNames.length - 1) {
        document.getElementById("arrowright").style = "display: none;"
    }
}

async function searchPokemon() {
    showLoadingSpinner();
    await onloadFuncSearchPokemon();
    closeLoadingSpinner();
}


async function onloadFuncSearchPokemon() {
    let searchBarRef = document.getElementById("search-bar");
    if (searchBarRef.value.length >= 3) {
        getReloadButton();
        resetAll();
        await fetchAllPokemon(searchBarRef);

        if (amount == 0) {
            document.getElementById("pokemon-list").innerHTML = `<div class="not-found"><img src="./img/succo-pokemon-go-1574002_640.png" alt="notfound">not found.</div>`;
        }
    } else if (searchBarRef.value.length < 3) {
        document.getElementById("search-error").style = "display: unset;"
    }
}

function getReloadButton() {
    document.getElementById("load-more-button").style = "display: none;"
    document.getElementById("search-error").style = "display: none;"
    document.getElementById("reload-button").style = "display: unset;"
}

function resetAll() {
    document.getElementById("pokemon-list").innerHTML = "";
    amount = 0;
    currentNames = [];
    currentImgs = [];
    currentIds = [];
    currentHeights = [];
    currentWeights = [];
    currentAbilities = [];
    currentTypeColor = [];
}

async function fetchAllPokemon(searchBarRef) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let responseAsJson = await response.json();
    await getSearchedPokemon(responseAsJson, searchBarRef);
}


async function getSearchedPokemon(responseAsJson, searchBarRef) {
    for (let iSearch = 0; iSearch < responseAsJson.results.length; iSearch++) {
        let pokemonName = responseAsJson.results[iSearch].name
        let searchedElement = searchBarRef.value.toLowerCase();

        if (pokemonName.includes(searchedElement) == true && amount < 30) {
            amount++
            let pokemonResponse = await fetch(`${responseAsJson.results[iSearch].url}`);
            let pokemonResponseAsJson = await pokemonResponse.json();

            await renderPokemonList(pokemonResponseAsJson, pokemonName);
        }
    }
}


function nextPokemonOverlay() {
    if (index < currentNames.length - 1) {
        index++;
        openPokemonOverlay(currentNames[index]);
    } else {
        closePokemonOverlay();
    }
}


function lastPokemonOverlay() {
    if (index > 0) {
        index--;
        openPokemonOverlay(currentNames[index]);
    }
}


async function reloadPokemon() {
    resetAll();

    document.getElementById("load-more-button").style = "display: unset;"
    document.getElementById("search-error").style = "display: none;"
    document.getElementById("reload-button").style = "display: none;"

    await init();
}


function showLoadingSpinner() {
    hideBody()
    document.getElementById("loading-spinner").showModal();
}


function closeLoadingSpinner() {
    document.getElementById("loading-spinner").close();
    let element = document.getElementById("body");
    element.classList.remove("hidden");
}


function closePokemonOverlay() {
    let element = document.getElementById("body");
    element.classList.remove("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.close();

}


function logDownWBubblingProtection(event) {
    event.stopPropagation();
}


function search() {
    document.getElementById("h1").classList.toggle("displaynone");
    document.getElementById("search").classList.toggle("displaynone");
}