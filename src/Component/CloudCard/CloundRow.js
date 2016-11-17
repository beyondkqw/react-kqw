import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/cloudCard.css';


export default class CloundRow extends Component {
    render() {
        const {title,price,date} = this.props
        return (
            <div className="height_charge border_bottom plAll">
                <div className="fl lh2 font14 color6">{title}</div>
                <div className="fr f12 tr">
                    <div className="color6">{/*<span>+</span>*/}<span>{price}</span></div>
                    <div className="color9 mt">{date}</div>
                </div>
            </div>
        );
    }
}
