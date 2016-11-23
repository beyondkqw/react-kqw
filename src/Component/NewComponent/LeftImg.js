import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';

export default class LeftImg extends Component {
    render() {
        const {imgPath} = this.props;
        return (
            <a className="di leftImg line_center">
                <img src={imgPath} alt=""/>
            </a>
        );
    }
}
