import React from 'react'
import { Palette } from 'react-palette'

const Image = (props) => {

    return (
        <Palette src={props.imageURL}>
            {({ data }) => (
                <img
                    className="img-fluid rounded imagen"
                    style={{ backgroundColor: data.vibrant }}
                    src={props.imageURL}
                    alt="Pokemon Logo" />
            )}
        </Palette>
    )

}

export default Image