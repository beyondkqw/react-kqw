import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class AboutDemo extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="wrap">
                    <div className="navbanner tc">
                        <div className="imglogo border-ra"><img src={require('../../Images/wx.png')}/></div>
                        <span className="di color_white">聚朵云 1.0.1</span>
                    </div>
                    <h4 className="tc aboutjdy">关于聚朵云</h4>
                    <p className="pl1">
                        聚朵云是.......
                    </p>
                </div>
            </div>
        );
    }
}
