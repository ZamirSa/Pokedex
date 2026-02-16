
async function init() {
    showLoadingSpinner();
    await onloadFunc();
    closeLoadingSpinner();
}


async function onloadFunc() {
    for (let i = amount + 1; i < amount + 25; i++) {
        let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${[i]}/`);
        let pokemonResponseAsJson = await pokemonResponse.json();

        let name = pokemonResponseAsJson.name;

        await renderPokemonList(pokemonResponseAsJson, i, name);
    }

}


async function loadMorePokemon() {
    amount += 24;

    await init();
}


async function renderPokemonList(pokemonResponseAsJson, i, pokemonName) {
    let pokemonListRef = document.getElementById("pokemon-list");
    pokemonListRef.innerHTML += "";

    currentNames.push(pokemonResponseAsJson.name);
    currentImgs.push(pokemonResponseAsJson.sprites.other['official-artwork'].front_default);
    currentIds.push("#" + pokemonResponseAsJson.id);
    currentHeights.push(pokemonResponseAsJson.height + "0 cm");
    let weightnumber = `${pokemonResponseAsJson.weight / 10}`;
    currentWeights.push(weightnumber.replaceAll(".", ",") + " kg");
    currentTypeColor.push(colours[pokemonResponseAsJson.types[0].type.name]);
    if (pokemonResponseAsJson.abilities.length > 0) {
        currentAbilities.push(pokemonResponseAsJson.abilities[0].ability.name);
    } else {
        currentAbilities.push("none");
    }
    currentHPs.push(pokemonResponseAsJson.stats[0].base_stat);
    currentAttacks.push(pokemonResponseAsJson.stats[1].base_stat);
    currentDefenses.push(pokemonResponseAsJson.stats[2].base_stat);

    let currentIndex = currentNames.indexOf(`${pokemonName}`);
    index = currentIndex;

    pokemonListRef.innerHTML += await getPokemonTemplate(pokemonName, pokemonResponseAsJson, i);
    await getPokemonTypes(currentIds[index], pokemonResponseAsJson);

    console.log(pokemonResponseAsJson)
    console.log(index)
}


async function getPokemonTypes(id, pokemonResponseAsJson) {
    for (let iType = 0; iType < pokemonResponseAsJson.types.length; iType++) {

        document.getElementById("types" + id).innerHTML += `<div style="background-color: ${currentTypeColor[index]};">${pokemonResponseAsJson.types[iType].type.name}</div>`;
    }
}

async function openPokemonOverlay(i, pokeName) {
    if (currentNames.length > 0) {
        var element = document.getElementById("body");
        element.classList.add("hidden");

        let currentIndex = currentNames.indexOf(`${pokeName}`);
        index = currentIndex;

        let pokemonOverlay = document.getElementById("pokemon-overlay");
        pokemonOverlay.showModal();
        pokemonOverlay.innerHTML = "";
        pokemonOverlay.innerHTML = getPokemonOverlayTemplate(i);
        document.getElementById("overlay-types" + currentIds[index]).innerHTML = document.getElementById("types" + currentIds[index]).innerHTML;
    } else {
        closePokemonOverlay()
    }
}

let index = 0;

async function searchPokemon() {
    showLoadingSpinner();
    await onloadFuncSearchPokemon();
    closeLoadingSpinner();
}

async function onloadFuncSearchPokemon() {
    let searchBarRef = document.getElementById("search-bar");
    if (searchBarRef.value.length >= 3) {
        let pokemonListRef = document.getElementById("pokemon-list");
        pokemonListRef.innerHTML = "";
        document.getElementById("search-error").style = "display: none;"
        amount = 0;
        currentNames = [];
        currentImgs = [];
        currentIds = [];
        currentHeights = [];
        currentWeights = [];
        currentAbilities = [];
        currentTypeColor = [];

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
        let responseAsJson = await response.json();

        for (let iSearch = 0; iSearch < responseAsJson.results.length; iSearch++) {
            let name = responseAsJson.results[iSearch].name


            if (name.includes(searchBarRef.value) == true && amount < 30) {
                amount++
                let pokemonResponse = await fetch(`${responseAsJson.results[iSearch].url}`);
                let pokemonResponseAsJson = await pokemonResponse.json();

                await renderPokemonList(pokemonResponseAsJson, iSearch, name);
            }

        }

        console.log(currentNames);
    } else {
        document.getElementById("search-error").style = "display: unset;"
    }
}

function nextPokemonOverlay() {
    if (index < currentNames.length - 1) {
        index++;

        openPokemonOverlay(index, currentNames[index]);
    } else {
        closePokemonOverlay();
    }
}

function lastPokemonOverlay() {
    if (index > 0) {
        index--;

        openPokemonOverlay(index, currentNames[index]);
    } else {
        closePokemonOverlay();
    }
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


function closePokemonOverlay() {
    var element = document.getElementById("body");
    element.classList.remove("hidden");
    let pokemonOverlay = document.getElementById("pokemon-overlay");
    pokemonOverlay.close();

}


function logDownWBubblingProtection(event) {
    event.stopPropagation();
}
