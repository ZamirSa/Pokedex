function getPokemonTemplate(i, pokemonName, img, id, pokemonResponseAsJson, height, weight) {
    return `
        <figure onclick="openPokemonOverlay('${pokemonName}', '${pokemonResponseAsJson.sprites.other.showdown.front_default}', '${colours[pokemonResponseAsJson.types[0].type.name]}', '${id}', '${height}', '${weight}', '${pokemonResponseAsJson.abilities[0].ability.name}', '${pokemonResponseAsJson}'); logDownWBubblingProtection(event);">
            <div style="background-color: ${colours[pokemonResponseAsJson.types[0].type.name]}";><img src="${img}" alt=""></div>
            <p>${id}</p>
            <h2>${pokemonName}</h2>
            <span id="types${id}"></span>
        </figure>
        `
}

function getPokemonOverlayTemplate(pokemonName, gif, typeColor, id, height, weight, abilities) {
    return `
    <section onclick="logDownWBubblingProtection(event);">
    <div class="pokemon-img-div" style="background-color: ${typeColor}">
        <div>
            <h3>${pokemonName}</h3>
            <p>${id}</p>
        </div>
        <div>
            <span id="overlay-types${id}"></span>
            <img src="${gif}" alt="">
        </div>
    </div>
        <button onclick="closePokemonOverlay()">exit</button>
        <table>
                <tr>
                    <th>Height:</th>
                    <td>${height}</td>
                </tr>

                <tr>
                    <th>Weight:</th>
                    <td>${weight}</td>
                </tr>

                <tr>
                    <th>Abilities:</th>
                    <td>${abilities}</td>
                </tr>

                <tr>
                    <th>Gender:</th>
                    <td></td>
                </tr>
    </table>
    </section>
    `
}