

let offset = 0
const limit = 10
const maxRecords = 151

const olPokemons = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
 
function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItem(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            olPokemons.innerHTML += pokemons.map(convertPokemonToHtml).join('')
        })
        .catch((response) => console.log(response))
        .finally(() => console.log("Requisição concluída"))
}

loadPokemonItem(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItem(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItem(offset, limit)
    }
    
})
