import Axios from 'axios'

export const fetchPokemon = async () => {
    let pokemonCount = 0
    let pokemonList = []

    // Get total number of Pokemon
    await Axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then(res => {
            pokemonCount = res.data.count
        })

    // Get pokemon name
    await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`)
        .then(res => {
            pokemonList = res.data.results.map(entry => entry.name)
        })

    return pokemonList
}

export const fetchImageOf = async (name) => {

    let imgURL = ''

    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => {
            imgURL = res.data.sprites.other['official-artwork'].front_default
        })

    return imgURL
}

export const getPokemonFromGeneration = async (genNumber) => {
    
    let pokemon = []

    await Axios.get(`https://pokeapi.co/api/v2/generation/${genNumber}`)
        .then(res => {
            res.data.pokemon_species.forEach(entry => {
                pokemon.push(entry.name)
            })
        })
    
    return pokemon
}


// Get info of each pokemon
/*for (let index = 0; index < pokemonList.length; index++) {
    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[index]}`)
        .then(res => {
            const pokemon = {}
            pokemon.index = index
            pokemon.name = res.data.name    //Get the name
            pokemon.types = []

            // Get the types
            res.data.types.forEach(entry => {
                pokemon.types.push(entry.type.name)
            })

            results.push(pokemon)
        })

}*/