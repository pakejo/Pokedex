import React from 'react'
import PropTypes from 'prop-types'
import { Palette } from 'react-palette'

class Image extends React.Component {
    static propTypes = {
        imageURL: PropTypes.string
    }

    render() {
        return (
            <Palette src={this.props.imageURL}>
                {({ data }) => (
                    <img
                        className="img-fluid rounded imagen"
                        style={{ backgroundColor: data.vibrant }}
                        src={this.props.imageURL}
                        alt="Pokemon Logo" />
                )}
            </Palette>
        )
    }

}

export default Image