const PokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    return new Pokemon(pokeDetail.id, pokeDetail.name, pokeDetail.types.map((typeSlot) => typeSlot.type.name), pokeDetail.sprites.other.dream_world.front_default)
}


PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

PokeApi.getPokemons = (offset = 0, limit= 60) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((json) => json.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((pokemonDetailsRequests) => Promise.all(pokemonDetailsRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error))
}

