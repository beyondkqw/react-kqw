import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/homePage.css';

export default class Cell_4son extends Component {
    render() {
        const {title,color} = this.props
        return (
            <div className="width_25 height_all fl border_right">
                <Link to="/goodsDescription">
                    <div>
                        <span className="db tc f12 mt">{title}</span>
                        <span className="db tc f12 mt" style={color}>正品保证</span>
                    </div>
                    <div className="pr width100 hfour mt">
                        <div className="cellFourImg line_center">
                            <img src={require('../../Images/phone.png')}/>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
