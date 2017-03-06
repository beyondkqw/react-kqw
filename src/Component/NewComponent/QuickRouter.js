import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/homePage.css';

export default class OtherApp extends Component {
    render() {
        const {routerName,routerUrl,routerPath} = this.props
        return (
                <Link to={routerPath?routerPath:'/commonSoon'}>
                    <li>
                        <div className="app_icon">
                            <img  src={routerUrl}/>
                        </div>
                        <span>{routerName}</span>
                    </li>
                </Link>
        );
    }
}
