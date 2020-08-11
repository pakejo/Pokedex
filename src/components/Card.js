import React from 'react'
import Image from './Image'
import { fetchImageOf } from '../helpers'

class Card extends React.Component {

    state = {
        img: ''
    }

    componentDidMount() {        
        fetchImageOf(this.props.name)
            .then(res => this.setState({img: res}))
    }

    render() {
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center">
                <div className="card mt-5 shadow p-3 mx-auto mb-5 bg-white rounded card-personalizada">

                    <div className="hovereffect">
                        <Image
                            className="img-responsive"
                            imageURL={this.state.img}
                        />
                        <div className="overlay">
                            <h2>{this.props.name}</h2>
                            <p className="icon-links">
                                <a>Tipo 1</a>
                                <a>Tipo 2</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;