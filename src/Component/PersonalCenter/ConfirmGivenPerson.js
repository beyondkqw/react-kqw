import React, { Component } from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/personal.css';


export default class ConfirmGivenPerson extends Component {
    render() {
        return (
            <div className="containerNav">
                <Search />
            </div>
        );
    }
}
