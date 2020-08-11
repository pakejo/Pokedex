import React, { Fragment } from 'react'
import Card from './components/Card'
import Grid from './components/Grid'


class App extends React.Component {

  render() {
    return (
      <Fragment>
        <h1 className="d-flex align-items-center justify-content-center py-3" >Pokedex</h1>
        <Grid>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Grid>
      </Fragment>
    )
  }
}

export default App;
