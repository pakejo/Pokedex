import Axios from 'axios'
import typeColorsGradients from './Gradients'
import strenghts from './Strenghts'
import weakness from './Weakness'


/**
 * export constants
 */
export const TYPE_COLORS_GRADIENTS = typeColorsGradients


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
export const fetchDescriptionOf = async (name) => {

    let speciesURL = ''
    let description = ''

    if (name.length > 0) {

        await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                speciesURL = res.data.species.url
            })


        await Axios.get(speciesURL)
            .then(res => {
                let {
                    flavor_text_entries
                } = res.data
                flavor_text_entries = flavor_text_entries.filter(entry => entry.language.name === "en")
                description = flavor_text_entries[flavor_text_entries.length - 1].flavor_text
            })
    }

    return description
}

/**
 * @description Get the elementary types of a Pokemon
 * @param {string} name Pokemon name
 * @returns Array with elementary types
 */
export const fetchTypeOf = async (name) => {

    let pokemonTypes = []

    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => {
            const {
                types
            } = res.data
            types.forEach(entry => pokemonTypes.push(entry.type.name))
        })

    return pokemonTypes
}

/**
 * @description Get the data of a Pokemon special ability
 * @param {string} name Pokemon name
 * @returns Object with special ability data
 */
export const fetchSpecialAbility = async (name) => {

    const ability = {
        name: '',
        description: '',
        effect: ''
    }

    let descURL = ''

    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => {
            ability.name = res.data.abilities[0].ability.name
            descURL = res.data.abilities[0].ability.url
        })

    await Axios.get(descURL)
        .then(res => {
            const { effect_entries, flavor_text_entries } = res.data
            ability.description = flavor_text_entries[flavor_text_entries.length - 3].flavor_text
            ability.effect = effect_entries.filter(entry => entry.language.name === "en")[0].effect
        })

    return ability
}


/**
 * @description Get the weakness of a pokemon
 * @param {Array} type Pokemon type
 * @returns Weakness
 */
export const weaknessOf = (type) => {

    let results = []

    if (type.length === 1) {
        results = weakness[type[0]]
    } else {

        let weaknessFirstType = weakness[type[0]]
        let weaknessSecondType = weakness[type[1]]
        let strenghtsFirstTipe = strenghts[type[0]]
        let strenghtsSecondTipe = strenghts[type[1]]

        results.push(...weaknessFirstType, ...weaknessSecondType)
        results = results
            .filter(entry => type.includes(entry) === false)
            .filter(entry => strenghtsFirstTipe.includes(entry) === false)
            .filter(entry => strenghtsSecondTipe.includes(entry) === false)
    }

    return results
}

/**
 * @description Get stats of a pokemon
 * @param {string} name Pokemon name
 * @returns object with a pokemon stats
 */
export const fetchStatsOf = async (name) => {

    const pokemonStats = {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    }

    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => {
            const { stats } = res.data
            let value = 0
            let name = ''

            stats.forEach(stat => {
                value = stat.base_stat
                name = stat.stat.name

                if (name === "special-attack") {
                    name = "specialAttack"
                } else if (name === "special-defense") {
                    name = "specialDefense"
                }

                pokemonStats[name] = value
            })
        })

    return pokemonStats
}

export const fetchMovesOf = async (name) => {

    const pokemonMoves = []

    await Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(async res => {

            const { moves } = res.data

            for (const move of moves) {

                let moveData = {
                    name: '',
                    description: '',
                    learnMethod: '',
                    levelLearned: 0
                }

                moveData.name = move.move.name

                const { version_group_details } = move
                moveData.levelLearned = version_group_details[version_group_details.length - 1].level_learned_at
                moveData.learnMethod = version_group_details[version_group_details.length - 1].move_learn_method.name

                let moveURL = move.move.url

                await Axios.get(moveURL)
                    .then(res => {
                        const { effect_entries } = res.data
                        moveData.description = effect_entries.filter(description => description.language.name === "en")[0].effect
                    })

                pokemonMoves.push(moveData)
            }
        })
    return pokemonMoves.sort(function (a, b) {return  a.levelLearned - b.levelLearned })
}