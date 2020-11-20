import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '../components/Grid'
import { Sidebar } from '../components/SideBar'
import { fetchPokemon, getPokemonFromGeneration } from '../helpers'
import Search from '../components/Search'

export default class HomePage extends React.Component {
  constructor(props) {
    super()
    this.state = {
      pokemon: [],
      newItems: [],
      lastPokemonLoaded: 0,
      hasMoreItems: true,
      sidebarIsToggled: false,
      filterByGeneration: false
    }
  }

  componentDidMount() {
    // Init state
    this.loadInitialContent()
  }

  loadInitialContent = async () => {
    const listaPokemon = fetchPokemon()

    await listaPokemon.then(res => {
      this.setState({
        pokemon: res,
        newItems: res.slice(0, 15),
        lastPokemonLoaded: 15,
        hasMoreItems: true,
        sidebarIsToggled: true
      })
    })
  }

  /**
   * @description Load more data from the API
   */
  fetchMoreData = async () => {

    if (this.state.pokemon.length === 0) {
      await this.loadInitialContent()
    }

    const firstToLoad = this.state.lastPokemonLoaded
    const lastToLoad = firstToLoad + 3
    const items = this.state.newItems
    let hasMoreToLoad = true

    this.state.pokemon.slice(firstToLoad, lastToLoad)
      .map(pokemon => items.push(pokemon))

    if (lastToLoad >= this.state.pokemon.length)
      hasMoreToLoad = false

    this.setState({
      lastPokemonLoaded: lastToLoad,
      hasMoreItems: hasMoreToLoad
    })
  };

  /**
   * @description handle click event
   * to show or not the sidebar
   */
  handleClick = e => {
    e.preventDefault();
    this.setState({
      sidebarIsToggled: !this.state.sidebarIsToggled
    })
  }

  /**
   * @description Set the state with the pokemon
   * of the generation passed as param
   * @param genNumber Generation number
   */
  showPokemonOfGeneration = async (genNumber) => {
    if (genNumber > 0) {
      const pokemon = getPokemonFromGeneration(genNumber)
      await pokemon.then(res => {
        this.setState({
          pokemon: res,
          filterByGeneration: true,
          newItems: res.slice(0, 10)
        })
      })
    }
    else {
      const allPokemon = fetchPokemon()
      await allPokemon.then(res => {
        this.setState({
          pokemon: res,
          filterByGeneration: false,
          newItems: res.slice(0, 10)
        })
      })
    }
  }

  resultHandler = data => {
    console.log(data)

    if (data.length > 0)
      this.setState({
        newItems: data,
        lastPokemonLoaded: 0,
        hasMoreItems: false
      })
    else {
      this.loadInitialContent()
    }
  }

  render() {
    return (
      <div className={this.state.sidebarIsToggled ? "d-flex toggled" : "d-flex"} id="wrapper">
        <Sidebar callback={this.showPokemonOfGeneration} />

        <div id="page-content-wrapper">
          <button className="btn btn-primary" id="menu-toggle" onClick={this.handleClick}>
            {this.state.sidebarIsToggled
              ? <i className="fas fa-angle-double-right"></i>
              : <i className="fas fa-angle-double-left"></i>
            }
          </button>

          <Search searchIn={this.state.pokemon} resultHandler={this.resultHandler} />

          <InfiniteScroll
            dataLength={this.state.newItems.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMoreItems}
          >
            <Grid newItems={this.state.newItems} />
          </InfiniteScroll>

        </div>
      </div>
    )
  }
}
