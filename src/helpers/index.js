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
        .catch(() => {
            imgURL = process.env.PUBLIC_URL + 'img/noImage.jpg'
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