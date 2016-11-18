import React, { Component } from 'react';
import '../../Stylesheets/App/cloudCard.css';


export default class DetailsRow extends Component {
    render() {
        const {title,intruduction} = this.props
        return (
            <li className="item-content pl border_bottom">
                <div className="item-media"><i className="icon icon-f7"></i></div>
                <div className="item-inner">
                    <div className="item-title color6 font14">{title}</div>
                    <div className="item-after color9 f12"><span>{intruduction}</span></div>
                </div>
            </li>
        );
    }
}
