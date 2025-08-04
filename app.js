const cardContainer = document.querySelector('.cards-display');
const types = ['fire', 'grass', 'electric', 'water', 'ground', 'rock', 'fairy', 'poison', 'bug', 'dragon', 'psychic', 'flying', 'fighting', 'normal', 'ghost', 'dark', 'steel', 'ice']

// separate fetching data and creating html in two separate functions later
async function fetchPokeData(region) {
    let pokemonTypesID = 1;
    for(i=region[0]; i <= region[1]; i++) {
        let pokeDataRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokeData = await pokeDataRaw.json();
        // pokemonTypes = (pokeData.types[pokeData.types.length - 1].type.name);
        const pokeTypes = pokeData.types.map((type) => type.type.name);
        const type = types.find((element) => pokeTypes.includes(element));
        const pokemonCard = `<div class="card-container ${type}">
                                <div class="img-container">
                                    <img class="pokemon-sprite" src="${pokeData.sprites.front_default}" alt="">
                                    <img class="pokeball-img" src="./icons/pokeball.svg" alt="">
                                </div>
                                <p class="pokedex-index">#${pokeData.id}</p>
                                <h3 class="pokemon-name">${pokeData.name.toUpperCase()}</h3>
                                <div id="pokemon-types-${pokemonTypesID}" class="pokemon-type-container"></div>
                            </div>`;
        cardContainer.innerHTML += pokemonCard;
        const pokeTypesContainer = document.querySelector(`#pokemon-types-${pokemonTypesID}`);
        for (element of pokeTypes) {
            const pokeType = `<img class="pokemon-type ${element}-type" src="./icons/${element}.svg"></img>`
            pokeTypesContainer.innerHTML += pokeType;
        }
        pokemonTypesID++;
    }
}

fetchPokeData([1, 151]);



/*

<div class="card-container">
    <div class="img-container">
        <img class="pokemon-sprite" src="" alt="">
        <img class="pokeball-img" src="./icons/pokeball.svg" alt="">
    </div>
    <p class="pokedex-index"></p>
    <h3 class="pokemon-name"></h3>
    <div class="pokemon-type-container"></div>
</div>

*/



// important values for infinite scrolling
// const scrollPosition = window.scrollY;
// const windowHeight = window.innerHeight;
// const bodyHeight = document.body.offsetHeight;