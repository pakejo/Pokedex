import React from 'react'
import Card from './Card'

export default class Grid extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newItems: []
    }
  }

  componentDidUpdate(prevProps) {
    // Used to load new content when we press any button or load default content
    if (prevProps.newItems.length !== 0) {
      if (this.props.newItems !== prevProps.newItems)
        this.setState({ newItems: this.props.newItems })

    } else if (this.state.newItems !== this.props.newItems) {
      this.setState({ newItems: this.props.newItems })
    }
  }

  render() {
    const { newItems } = this.state

    return (
      <div className="my-5 container-fluid">
        <div className="px-auto my-5 col-md-12 align-items-start">
          <div className="row">
            {
              newItems.map((pokemon, index) => (
                <Card
                  key={index}
                  name={pokemon}
                  index={index + 1}
                />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
