import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import NavBar from '../../Component/CommonComponent/NavBar'

export default class AboutDemo extends Component {
    render() {
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'关于禄贤'}
                />
                <div className="wrap">
                    <div className="navbanner tc">
                        <div className="imglogo border-ra"><img src={require('../../Images/wx.png')}/></div>
                        <span className="di color_white">禄贤百姓商城1.0.1</span>
                    </div>
                    <h4 className="tc aboutjdy">关于禄贤</h4>
                    <p className="pl1">
                        禄贤.......
                    </p>
                </div>
            </div>
        );
    }
}
