import React from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends React.PureComponent {

    render() {
        return (
            <div id="notfound">
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>4<img src={process.env.PUBLIC_URL + 'img/emoji.png'} alt="emoji" />4</h1>
                    </div>
                    <h2>Oops! Page Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                    <Link to="/">Back to homepage</Link>
                </div>
            </div>
        )
    }
}