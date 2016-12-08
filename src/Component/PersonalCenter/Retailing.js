import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';

export default class Retailing extends Component {
    render() {
        return (
            <div className="containerNav">
                <Link to="/personalCenter/retailingDetails">
                    <RetailingItem />
                </Link>
            </div>
        );
    }
}
