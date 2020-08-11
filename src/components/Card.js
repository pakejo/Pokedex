import React from 'react'
import Image from './Image'

class Card extends React.Component {

    render() {
        return (
            <div className="col-md-3 d-flex justify-content-center">
                <div className="card mt-5 shadow p-3 mb-5 bg-white rounded card-personalizada">
                    <Image
                        imageURL={"https://vignette.wikia.nocookie.net/es.pokemon/images/f/f2/Eevee.png/revision/latest?cb=20150621181400"}
                    />
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-center ">Eevee Nº 222</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;