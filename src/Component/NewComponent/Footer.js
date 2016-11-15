import React, { Component } from 'react';
import '../../Stylesheets/App/sm.min.css';
import '../../Stylesheets/App/homePage.css';

export default class Footer extends Component {
    render() {
        return (
            <nav className="bar bar-tab bkg_color">
                <a className="tab-item external">
                    <span className="icon"><img src={require("../../Images/search.png")} /></span>
                    <span className="tab-label">首页</span>
                </a>
                <a className="tab-item external" >
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">云综合体</span>
                </a>
                <a className="tab-item external">
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">购物车</span>
                </a>
                <a className="tab-item external" href="#">
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">个人中心</span>
                </a>
            </nav>
        );
    }
}
