async function init() {
    await getData(30);

    renderPokemonList();
}

async function getData(length) {
    for (let i = 1; i < length; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let responseAsJson = await response.json();
        console.log(responseAsJson);
    }
}

function renderPokemonList() {
    let mainRef = document.getElementById("main");
    mainRef.innerHTML = "";
    for (let i = 1; i < 30; i++) {
        mainRef.innerHTML += getPokemonTemplate(i);
    }
}


function getPokemonTemplate(i) {
    return `
        <figure>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png" alt="">
            <h2></h2>
        </figure>
        `
}