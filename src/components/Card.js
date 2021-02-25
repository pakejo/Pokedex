import React from 'react'
import Image from './Image'
import { fetchImageOf } from '../helpers'
import { Link } from 'react-router-dom'

class Card extends React.Component {

    constructor(props) {
        super()
        this.state = {
            img: ''
        }
    }

    componentDidMount() {
        fetchImageOf(this.props.name)
            .then(res => this.setState({ img: res }))
    }

    componentDidUpdate({name}) {
        /**
         * When the user press a button
         * image must be change to the new content image
         */
        if (this.props.name !== name)
            fetchImageOf(this.props.name).then(res => this.setState({ img: res }))
    }

    render() {
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center">
                <div className="card mt-5 shadow p-3 mx-auto mb-5 bg-white rounded card-personalizada">
                    <Link to={`/Pokedex/${this.props.name}`}>
                        <div className="hovereffect">
                            <Image
                                className="img-responsive"
                                imageURL={this.state.img}
                            />
                            <div className="overlay">
                                <h2>{this.props.name}</h2>
                                <p className="icon-links">
                                    <p>Nº {this.props.index}</p>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Card;