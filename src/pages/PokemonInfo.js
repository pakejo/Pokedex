import React from 'react'
import Radar from '../components/Radar'
import Image from '../components/Image'

export default class PokemonInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pokemon: '',
            graphColor: ''
        }
    }

    componentDidMount() {

        this.setState({
            pokemon: this.props.match.params.id.toUpperCase()
        })
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container-fluid pt-5 px-5 mx-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-right">
                        <Image imageURL="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" />
                    </div>
                    <div className="col-md-6">
                        <h3>{this.state.pokemon}</h3>
                        <p>
                            descripcion del pokemon
                            </p>
                        <h3>Type</h3>
                        <p>
                            Tipos del pokemon
                            </p>
                        <h3>
                            Debilidades
                    </h3>
                        <p>
                            Debilidades del pokemon
                            </p>
                        <h3>
                            Habilidad especial
                    </h3>
                        <p>
                            Descripcion de la habilidad
                            </p>
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