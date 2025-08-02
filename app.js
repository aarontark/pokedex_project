const cardContainer = document.querySelector('.cards-display');

async function fetchPokeData(region) {
    for(i=region[0]; i <= region[1]; i++) {
        let pokeDataRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokeData = await pokeDataRaw.json();
        const pokemonCard = `<div class="card-container">
                                <div class="img-container">
                                    <img class="pokemon-sprite" src="${pokeData.sprites.front_default}" alt="">
                                    <img class="pokeball-img" src="./icons/pokeball.svg" alt="">
                                </div>
                                <p class="pokedex-index">${pokeData.id}</p>
                                <h3 class="pokemon-name">${pokeData.name.toUpperCase()}</h3>
                                <div class="pokemon-type-container"></div>
                            </div>`;
        cardContainer.innerHTML += pokemonCard;
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