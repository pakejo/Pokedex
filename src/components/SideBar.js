import React from 'react'

export class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedButton: -1
        }
        this.names = [
            'Generation I', 'Generation II',
            'Generation III', 'Generation IV',
            'Generation V', 'Generation VI',
            'Generation VII']
    }

    handleClick(buttonID) {

        if (this.state.selectedButton === buttonID) {
            this.setState({ selectedButton: -1 })
            //this.props.callback(this.state.selectedButton + 1)
        }
        else {
            this.setState({ selectedButton: buttonID })
        }
    }

    componentDidUpdate() {
        this.props.callback(this.state.selectedButton + 1)
    }

    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <h1 className="sidebar-heading">Pokedex </h1>
                <div className="list-group list-group-flush">
                    <p className="sidebar-heading">Select Generation</p>
                    {
                        this.names.map((name, index) => {
                            if (index === this.state.selectedButton)
                                return (
                                    <button onClick={() => this.handleClick(index)} className="list-group-item list-group-item-action bg-aqua">{name}</button>
                                )
                            else
                                return (
                                    <button onClick={() => this.handleClick(index)} className="list-group-item list-group-item-action bg-light">{name}  </button>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}