const cardContainer = document.querySelector('.cards-display');
const regionBtnsContainer = document.querySelector('.region-btns');
const loadingContainer = document.querySelector('.loading-container');
const types = ['fire', 'grass', 'electric', 'water', 'ground', 'rock', 'fairy', 'poison', 'bug', 'dragon', 'psychic', 'flying', 'fighting', 'normal', 'ghost', 'dark', 'steel', 'ice']
const regionBtns = Array.from(document.querySelector('.region-btns').children);
const regions = [[1, 151], [152, 251], [252, 386], [387, 493], [494, 649], [650, 721], [722, 809], [810, 905], [906, 1025]];

const renderData = (pokeData, pokemonTypesID) => {
    console.log(pokeData);
    const pokeTypes = pokeData.types.map((type) => type.type.name);
    const type = types.find((element) => pokeTypes.includes(element));
    const pokemonCard = 
    `<div class="card-container ${type}">
        <div class="front-side">
            <div class="img-container">
                <img class="pokemon-sprite" src="${pokeData.sprites.front_default}" alt="">
                <img class="pokeball-img" src="./icons/pokeball.svg" alt="">
            </div>
            <p class="pokedex-index">#${pokeData.id}</p>
            <h3 class="pokemon-name">${pokeData.name.toUpperCase()}</h3>
            <div id="pokemon-types-${pokemonTypesID}" class="pokemon-type-container"></div>
        </div>
        <div class="back-side">
            <div class="img-container">
                <img class="pokemon-sprite" src="${pokeData.sprites.back_default}" alt="">
                <img class="pokeball-img" src="./icons/pokeball.svg" alt="">
            </div>
            <p class="pokedex-index">#${pokeData.id}</p>
            <div class="physical-properties">
                <div class="weight-display">
                    <p class="weight-title">WEIGHT:</p>
                    <p class="weight-data">${pokeData.weight / 10}KG</p>
                </div>
                <div class="height-display">
                    <p class="height-title">HEIGHT:</p>
                    <p class="height-data">${pokeData.height / 10}M</p>
                </div>
            </div>
        </div>
    </div>`;
    cardContainer.innerHTML += pokemonCard;
    const pokeTypesContainer = document.querySelector(`#pokemon-types-${pokemonTypesID}`);
    for (element of pokeTypes) {
        const pokeType = `<img class="pokemon-type ${element}-type" src="./icons/${element}.svg"></img>`
        pokeTypesContainer.innerHTML += pokeType;
    }
}

// separate fetching data and creating html in two separate functions later
async function fetchPokeData(region) {
    cardContainer.style.display = 'none';
    regionBtnsContainer.style.display = 'none';
    loadingContainer.style.display = 'flex';
    cardContainer.innerHTML = '';
    let pokemonTypesID = region[0]
    for(i=region[0]; i <= region[1]; i++) {
        let pokeDataRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokeData = await pokeDataRaw.json();
        renderData(pokeData, pokemonTypesID);
        pokemonTypesID++;
    }
    cardContainer.style.display = 'flex';
    regionBtnsContainer.style.display = 'flex';
    loadingContainer.style.display = 'none';
}

for (let i = 0; i < regions.length; i++) {
    regionBtns[i].addEventListener('click', () => {
        fetchPokeData(regions[i]);
    })
}

fetchPokeData(regions[0]);
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