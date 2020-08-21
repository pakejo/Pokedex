import React from 'react'
import Radar from '../components/Radar'
import Image from '../components/Image'
import { fetchDescriptionOf, fetchImageOf, fetchTypeOf, TYPE_COLORS_GRADIENTS, weaknessOf, fetchSpecialAbility, fetchStatsOf, fetchMovesOf } from '../helpers'

export default class PokemonInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pokemon: '',
            description: '',
            imgURL: '',
            types: [],
            weakness: [],
            ability: {},
            stats: {},
            moves: []
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        let desc = ''
        let img = ''
        let types = []
        let weakness = []
        let ability = {}
        let stats = {}
        let moves = []

        await fetchDescriptionOf(id).then(res => desc = res)
        await fetchImageOf(id).then(res => img = res)
        await fetchTypeOf(id).then(res => types = res)
        await fetchSpecialAbility(id).then(res => ability = res)
        await fetchStatsOf(id).then(res => stats = res)
        await fetchMovesOf(id).then(res => moves = res)

        // pass the first letter of each type to uppercase
        types = types.map(type => {
            return type.charAt(0).toUpperCase() + type.slice(1)
        })

        weakness = weaknessOf(types)

        this.setState({
            pokemon: id.toUpperCase(),
            description: desc,
            imgURL: img,
            types,
            weakness,
            ability,
            stats,
            moves
        })
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-right">
                        <Image imageURL={this.state.imgURL} />
                    </div>
                    <div className="col-md-6">
                        <h3 className="mt-3">{this.state.pokemon}</h3>
                        <div className="container pl-0  ">{this.state.description}</div>

                        <h3 className="mt-3">Type</h3>
                        <div className="d-flex flex-row justify-content-start">
                            {this.state.types.map((type, index) => (
                                <div key={index} className="p-2 mr-3 badge badge-primary" style={{ background: TYPE_COLORS_GRADIENTS[type] }}>
                                    <h5 className="mb-0">{type}</h5>
                                </div>
                            ))}
                        </div>

                        <h3 className="mt-3">Weakness</h3>
                        <div className="comtainer-fluid">
                            {this.state.weakness.map((type, index) => (
                                <div key={index} className="p-2 mr-3 mb-3 badge badge-primary" style={{ background: TYPE_COLORS_GRADIENTS[type] }}>
                                    <h5 className="mb-0">{type}</h5>
                                </div>
                            ))}
                        </div>

                        <h3 className="mt-3 d-flex justyify-content-space-between">Special ability:
                            <div className="badge badge-secondary d-inline-flex align-items-center justify-content-start">
                                <div className="">
                                    {this.state.ability.name}
                                </div>
                            </div>
                        </h3>
                        <div className="container-fluid pl-0">
                            <p className="border-bottom border-dark pb-2">{this.state.ability.description}</p>
                            <p>{this.state.ability.effect}</p>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mh-100 py-4">
                    <div className="col-md-6 col-xs-12">
                        <div className="text-center">
                            <h3>Stats</h3>
                        </div>
                        <Radar data={this.state.stats} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="text-center pt-3">
                            <h3>Moves</h3>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Learn Method</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.moves.map((move, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{move.name}</td>
                                            <td>{move.description}</td>
                                            <td>{move.learnMethod}</td>
                                            <td>{move.levelLearned}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}