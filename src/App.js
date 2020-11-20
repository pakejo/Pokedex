import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/homePageContainer.js';
import PokemonInfo from './pages/PokemonInfo';
import NotFound from './pages/NotFound';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPokemon: ''
    }
  }

  notifySelectedPokemon = (pokemon) => {
    this.setState({selectedPokemon: pokemon})
  } 

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/Pokedex"
            component={HomePage}
          />
          <Route
            exact
            path="/Pokedex/:id"
            component={PokemonInfo}
          />
          <Route
            exact
            component={NotFound}
          />
        </Switch>
      </Router>
    )
  }

}

export default App;
