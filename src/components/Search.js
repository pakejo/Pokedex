import React from 'react';
import PropTypes from 'prop-types'

const Search = (props) => {

    const handleOnInputChange = event => {
        const { resultHandler, searchIn } = props
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

    return (
        <div className="container">
            <form>
                <div className="input-group">
                    <input
                        className="form-control py-2 border-right-0 border"
                        type="search" id="example-search-input"
                        placeholder="Search"
                        onChange={handleOnInputChange}
                    />
                    <span className="input-group-append">
                        <div className="input-group-text bg-transparent"><i className="fa fa-search"/></div>
                    </span>
                </div>
            </form>
        </div>
    )
}

Search.propTypes = {
    searchIn: PropTypes.arrayOf(PropTypes.string),
    resultHandler: PropTypes.func
};

export default Search