import React from 'react'
import { Link } from 'react-router-dom'
import Radar from '../components/Radar'
import Image from '../components/Image'
import { fetchDescriptionOf, fetchImageOf, fetchTypeOf, TYPE_COLORS_GRADIENTS, weaknessOf, fetchSpecialAbility, fetchStatsOf, fetchMovesOf } from '../helpers'

export default class PokemonInfo extends React.Component {

    constructor(props) {
        super()
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

    componentDidMount() {
        const { id } = this.props.match.params

        const name = id.charAt(0).toUpperCase() + id.slice(1)
        this.setState({ pokemon: name })

        fetchDescriptionOf(id).then(res => this.setState({ description: res }))
        fetchImageOf(id).then(res => this.setState({ imgURL: res }))
        fetchSpecialAbility(id).then(res => this.setState({ ability: res }))
        fetchStatsOf(id).then(res => this.setState({ stats: res }))
        fetchMovesOf(id).then(res => this.setState({ moves: res }))
        fetchTypeOf(id).then(res => {
            let types = res

            // pass the first letter of each type to uppercase
            types = types.map(type => {
                return type.charAt(0).toUpperCase() + type.slice(1)
            })

            let weakness = weaknessOf(types)

            this.setState({
                types,
                weakness
            })
        })

        // put page to the history
        this.props.history.push(`/Pokedex/${id}`);
    }

    render() {
        return (
            <div className="bg-pokemon m-0 p-0">
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
                            <table className="table table-striped table-responsive">
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
                    <Link className="my-2 btn btn-success btn-block" to={process.env.PUBLIC_URL} >Go Back</Link>
                </div>
            </div>

        )
    }
}