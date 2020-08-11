import Axios from 'axios'

export const fetchPokemon = async () => {
    let pokemonCount = 0
    let pokemonList = []

    await Axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then(res => {
            pokemonCount = res.data.count
        })

    await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}`)
        .then(res => {
            pokemonList = res.data.results
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
