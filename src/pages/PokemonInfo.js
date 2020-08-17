import React from 'react'
import Radar from '../components/Radar'
import Image from '../components/Image'
import { fetchDescriptionOf, fetchImageOf, fetchTypeOf, TYPE_COLORS_GRADIENTS, weaknessOf, fetchSpecialAbility } from '../helpers'

export default class PokemonInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pokemon: '',
            description: '',
            imgURL: '',
            types: [],
            weakness: [],
            ability: {}
        }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        let desc = ''
        let img = ''
        let types = []
        let weakness = []
        let ability = {}

        await fetchDescriptionOf(id).then(res => desc = res)
        await fetchImageOf(id).then(res => img = res)
        await fetchTypeOf(id).then(res => types = res)
        await fetchSpecialAbility(id).then(res => ability = res)

        // pass the first letter to uppercase
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
            ability
        })
    }

    render() {
        console.log(this.state);
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
                        <Radar />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <table className="table table-responsive table-hover table-sm table-striped justify-content-center">
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>Product</th>
                                    <th>Payment Taken</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>TB - Monthly</td>
                                    <td>01/04/2012</td>
                                    <td>Default</td>
                                </tr>
                                <tr className="table-active">
                                    <td>1</td>
                                    <td>TB - Monthly</td>
                                    <td>01/04/2012</td>
                                    <td>Approved</td>
                                </tr>
                                <tr className="table-success">
                                    <td>2</td>
                                    <td>TB - Monthly</td>
                                    <td>02/04/2012</td>
                                    <td>Declined</td>
                                </tr>
                                <tr className="table-warning">
                                    <td>3</td>
                                    <td>TB - Monthly</td>
                                    <td>03/04/2012</td>
                                    <td>Pending</td>
                                </tr>
                                <tr className="table-danger">
                                    <td>4</td>
                                    <td>TB - Monthly</td>
                                    <td>04/04/2012</td>
                                    <td>Call in to confirm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}