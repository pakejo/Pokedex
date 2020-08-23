import React from 'react';
import PropTypes from 'prop-types'

export default class Search extends React.Component {

    static defaultProps = {
        searchIn: PropTypes.arrayOf(PropTypes.string),
        resultHandler: PropTypes.func
    }

    /**
     * @description Handler for the search
     * @param {Event} event The event
     */
    handleOnInputChange = event => {
        const { resultHandler, searchIn } = this.props
        const search = event.target.value

        if (search.length > 0) {
            let searchResult = searchIn
                .filter(val => val.toLowerCase().match(search))
                .filter(val => val.indexOf("-") === -1)

            resultHandler(searchResult)
        } else {
            resultHandler([])
        }

    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="input-group">
                        <input
                            className="form-control py-2 border-right-0 border"
                            type="search" id="example-search-input"
                            placeholder="Search"
                            onChange={this.handleOnInputChange}
                        />
                        <span className="input-group-append">
                            <div className="input-group-text bg-transparent"><i className="fa fa-search"></i></div>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}