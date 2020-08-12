import React, { Fragment } from 'react'
import Card from './components/Card'
import Grid from './components/Grid'
import { fetchPokemon } from './helpers'
import InfiniteScroll from 'react-infinite-scroll-component'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      lastPokemonLoaded: 0,
      hasMoreItems: true,
      newItems: []
    }
  }

  componentDidMount() {
    // Inicializamos el state
    const listaPokemon = fetchPokemon()

    listaPokemon.then(res => {
      this.setState({
        pokemon: res,
        lastPokemonLoaded: 10,
        newItems: res.slice(0, 10)
      })
    })
  }

  fetchMoreData = () => {
    const firstToLoad = this.state.lastPokemonLoaded
    const lastToLoad = firstToLoad + 5
    const items = this.state.newItems

    this.state.pokemon.slice(firstToLoad, lastToLoad)
      .map(pokemon => items.push(pokemon))

    this.setState({ lastPokemonLoaded: lastToLoad })
  };

  _loader = () => {
    return (
      <div className="loader">Loading ...</div>
    )
  }

  render() {
    return (
      <Fragment>
        <h1 className="d-flex align-items-center justify-content-center py-3" >Pokedex</h1>
          <InfiniteScroll
            dataLength={this.state.newItems.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMoreItems}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid>
            {
              this.state.newItems.map((pokemon, index) => (
                <Card
                  key={index}
                  name={pokemon}
                  index={("00" + (index + 1)).slice(-3)}
                />
              ))
            }
            </Grid>
          </InfiniteScroll>
      </Fragment>
    )
  }
}

export default App;

/**
 * this.state.pokemon.slice(0, 12).map((pokemon, index) => {
              return (
                <Card
                  key={index}
                  name={pokemon.name}
                  index={("00" + (index + 1)).slice(-3)}
                />
              )
            })
 */

/*
this.state.newItems.map((i, index) => (
           <div style={style} key={index}>
             div - #{index}
           </div>
         ))
*/

/**
 *
 <InfiniteScroll
            dataLength={this.state.newItems.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMoreItems}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {
              this.state.newItems.map((i, index) => (
                <div style={style} key={index}>
                  div - #{index}
                </div>
              ))
            }
          </InfiniteScroll>
 */