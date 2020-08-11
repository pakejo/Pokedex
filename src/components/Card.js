import React from 'react'
import Image from './Image'

class Card extends React.Component {

    render() {
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center">
                <div className="card mt-5 shadow p-3 mx-auto mb-5 bg-white rounded card-personalizada">

                    <div className="hovereffect">
                        <Image
                            className="img-responsive"
                            imageURL={"https://vignette.wikia.nocookie.net/es.pokemon/images/f/f2/Eevee.png/revision/latest?cb=20150621181400"}
                        />
                        <div className="overlay">
                            <h2>Eevee</h2>
                            <p className="icon-links">
                                <a>Normal</a>
                                <a>Lucha</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;