import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './components/Card'
import Grid from './components/Grid'
import { Sidebar } from './components/SideBar'
import { fetchPokemon } from './helpers'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      lastPokemonLoaded: 0,
      hasMoreItems: true,
      newItems: [],
      sidebarIsToggled: true
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

  /**
   * @description Load more data from the API
   */
  fetchMoreData = () => {
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
   * @description The message that will show 
   * when loadind more data
   */
  loader = () => {
    return (
      <div className="loader">Loading ...</div>
    )
  }

  /**
   * @description The message that will show
   * when there are no more data to load
   */
  endMessage = () => {
    return (
      <p style={{ textAlign: "center" }}>
        <b>Yay! You have seen it all</b>
      </p>
    )
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({
      sidebarIsToggled: !this.state.sidebarIsToggled
    })
  }

  render() {
    return (
      <div className={this.state.sidebarIsToggled ? "d-flex toggled" : "d-flex"} id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper">
          <button className="btn btn-primary" id="menu-toggle" onClick={this.handleClick}>
            {this.state.sidebarIsToggled
              ? <i class="fas fa-angle-double-right"></i>
              : <i class="fas fa-angle-double-left"></i>
            }
          </button>

          <InfiniteScroll
            dataLength={this.state.newItems.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMoreItems}
            loader={this.loader}
            endMessage={this.endMessage}
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
        </div>
      </div>
    )
  }
}

export default App;
