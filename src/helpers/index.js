import Axios from 'axios'

/**
 * @description Get the complete Pokemon list
 * @returns A list with all pokemon names
 */
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

/**
 * @description Get all pokemon of genNumber generarion
 * @param {int} genNumber Generation number
 * @returns List of pokemon of the generation passed as param
 */
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

/**
 * @description Get the image of any pokemon
 * @param {string} name Pokemon name
 * @returns Image URL
 */
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

/**
 * @description Get a pokemon description
 * @param {string} name Pokemon name
 * @returns String with the description
 */
export const getDescriptionOf = async (name) => {

}