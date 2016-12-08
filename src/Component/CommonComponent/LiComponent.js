import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';

export default class LiComponent extends Component {
    render() {
        const {link,name}=this.props
        return (
            <Link to={link}>
                <li className="item-content item-link pl  border_bottom">
                    <div className="item-media"><i className="icon icon-f7"></i></div>
                    <div className="item-inner margin0">
                        <div className="item-title color6 font14">
                            {name}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }
}
