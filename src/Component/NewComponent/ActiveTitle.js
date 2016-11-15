import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';


export default class ActiveTitle extends Component {
    render() {
        const {title} = this.props
        return (
            <div className="p_all mtb clearAll">
                <div className="width_33 di"><img src={require("../../Images/left.png")}/></div>
                <div className="di plr width_34 tc">
                    <div className="di mr"><img src={require("../../Images/headerLogo.png")} /></div>
                    <span className="activeName">充值中心</span>
                </div>
                <div className="width_33 di"><img src={require("../../Images/right.png")}/></div>
            </div>
        );
    }
}
