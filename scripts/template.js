async function getPokemonTemplate() {
    return `
        <figure tabindex="0" onclick="openPokemonOverlay('${currentNames[index]}'); logDownWBubblingProtection(event);">
            <div style="background-color: ${currentTypeColor[index]}";><img src="${currentImgs[index]}" alt=""></div>
            <p>${currentIds[index]}</p>
            <h2>${currentNames[index]}</h2>
            <span id="types${currentIds[index]}"></span>
        </figure>
        `
}

function getPokemonOverlayTemplate() {
    return `
    <section onclick="logDownWBubblingProtection(event);">
    <div class="overlay-upper-area" style="background-color: ${currentTypeColor[index]}">
        <div>
            <h3>${currentNames[index]}</h3>
            <p>${currentIds[index]}</p>
        </div>
        <div>
            <span id="overlay-types${currentIds[index]}"></span>
            <img src="${currentImgs[index]}" alt="">
        </div>
    </div>
        <table>
                <tr>
                    <th>Height</th>
                    <td>${currentHeights[index]}</td>
                </tr>

                <tr>
                    <th>Weight</th>
                    <td>${currentWeights[index]}</td>
                </tr>

                <tr>
                    <th>Abilities</th>
                    <td>${currentAbilities[index]}</td>
                </tr>

                <tr>
                <th>HP</th>
                    <td>${currentHPs[index]}</td>
                </tr>

                <th>Attack</th>
                    <td>${currentAttacks[index]}</td>
                </tr>
                <th>Defense</th>
                    <td>${currentDefenses[index]}</td>
                </tr>
    </table>
    <nav>
        <button onclick="lastPokemonOverlay()"><img class ="flip" src="./img/arrow-right.png" alt="arrowleft"></button>
        <button onclick="nextPokemonOverlay()"><img src="./img/arrow-right.png" alt="arrowright"></button>
    </nav>
    </section>
    `
}