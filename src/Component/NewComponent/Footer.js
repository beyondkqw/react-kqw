import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/sm.min.css';
import '../../Stylesheets/App/homePage.css';

export default class Footer extends Component {
    render() {
        return (
            <nav className="bar bar-tab bkg_color">
                <Link className="tab-item external">
                    <span className="icon"><img src={require("../../Images/search.png")} /></span>
                    <span className="tab-label">首页</span>
                </Link>
                <Link className="tab-item external" >
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">云综合体</span>
                </Link>
                <Link className="tab-item external">
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">购物车</span>
                </Link>
                <Link to="personalCenter" className="tab-item external">
                    <span className="icon"><img src={require("../../Images/search.png")}/></span>
                    <span className="tab-label">个人中心</span>
                </Link>
            </nav>
        );
    }
}
