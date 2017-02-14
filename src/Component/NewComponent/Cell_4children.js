import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_4son extends Component {
    render() {
        const {img,link} = this.props
        return (
            <Link to={link}>
                <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                    <div className="pr width100 height_all">
                        <img src={img}/>
                    </div>
                </div>
            </Link>
        );
    }
}
