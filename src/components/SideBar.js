import React from 'react'

export class Sidebar extends React.Component {

    render() {
        return (
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Pokedex </div>
                <div className="list-group list-group-flush">
                    <button className="list-group-item list-group-item-action bg-light">Generation</button>
                </div>
            </div>
        )
    }
}