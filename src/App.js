import React, { Fragment } from 'react'
import Card from './components/Card'
import Grid from './components/Grid'
import { fetchPokemon } from './helpers'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
    }
  }

  componentDidMount() {
    const pokemonList = fetchPokemon()

    pokemonList.then(res => {
      this.setState({ pokemon: res })
    })
  }

  render() {
    return (
      <Fragment>
        <h1 className="d-flex align-items-center justify-content-center py-3" >Pokedex</h1>
        <Grid>
          {
            this.state.pokemon.slice(0, 10).map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  name={pokemon.name}
                />
              )
            })
          }
        </Grid>
      </Fragment>
    )
  }
}

export default App;
