import React from 'react'

export default class Sidebar extends React.Component {

    constructor(props) {
        super()
        this.state = {
            selectedButton: -1,
            previousSelectedButton: -1
        }
        // Labels for the button of each generation
        this.names = [
            'Generation I', 'Generation II',
            'Generation III', 'Generation IV',
            'Generation V', 'Generation VI']
    }


    componentDidUpdate() {
        // If we press one button update the state and notify the father
        if (this.state.previousSelectedButton !== this.state.selectedButton) {
            this.props.callback(this.state.selectedButton + 1)
            this.setState({
                previousSelectedButton: this.state.selectedButton
            })
        }
    }

    /**
     * @description Handler for the onClick event
     * @param buttonID The number of the button the user pressed 
     */
    handleClick(buttonID) {
        // If we press the same botton, deselect it
        if (this.state.selectedButton === buttonID)
            this.setState({ selectedButton: -1 })
        else
            this.setState({ selectedButton: buttonID })
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
                                    <button key={index} onClick={() => this.handleClick(index)} className="list-group-item list-group-item-action bg-aqua">{name}</button>
                                )
                            else
                                return (
                                    <button key={index} onClick={() => this.handleClick(index)} className="list-group-item list-group-item-action bg-light">{name}  </button>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}