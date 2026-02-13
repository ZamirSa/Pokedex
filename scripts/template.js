async function getPokemonTemplate(pokemonName, img, id, pokemonResponseAsJson, height, weight) {
    return `
        <figure onclick="openPokemonOverlay('${pokemonResponseAsJson.id}', '${pokemonName}'); logDownWBubblingProtection(event);">
            <div style="background-color: ${colours[pokemonResponseAsJson.types[0].type.name]}";><img src="${img}" alt=""></div>
            <p>${id}</p>
            <h2>${pokemonName}</h2>
            <span id="types${pokemonResponseAsJson.id}"></span>
        </figure>
        `
}

function getPokemonOverlayTemplate(pokemonName, gif, typeColor, id, height, weight, abilities, i) {
    return `
    <section onclick="logDownWBubblingProtection(event);">
    <div class="overlay-upper-area" style="background-color: ${typeColor}">
        <div>
            <h3>${pokemonName}</h3>
            <p>${id}</p>
        </div>
        <div>
            <span id="overlay-types${i}"></span>
            <img src="${gif}" alt="">
        </div>
    </div>
        <table>
                <tr>
                    <th>Height</th>
                    <td>${height}</td>
                </tr>

                <tr>
                    <th>Weight</th>
                    <td>${weight}</td>
                </tr>

                <tr>
                    <th>Abilities</th>
                    <td>${abilities}</td>
                </tr>
    </table>
    <nav>
<button onclick="closePokemonOverlay(); openPokemonOverlay(${i} - 1)"><img class ="flip" src="./img/arrow-right.png" alt=""></button>
<button onclick="closePokemonOverlay(); openPokemonOverlay(${i} + 1)"><img src="./img/arrow-right.png" alt=""></button>
</nav>
    </section>
    `
}