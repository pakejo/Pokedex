import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonInfo from './pages/PokemonInfo';
import NotFound from './pages/NotFound';


class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <HomePage />}
          />
          <Route
            exact
            path="/pokemon/:id"
            component={() => <PokemonInfo />}
          />
          <Route
            exact
            component={() => <NotFound />}
          />
        </Switch>
      </Router>
    )
  }

}

export default App;
