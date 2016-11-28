import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';


export default class ActiveTitle extends Component {
    render() {
        const {title,style} = this.props
        console.log(style);
        return (
            <div className="p_all ptb clearAll df" style={style}>
                <div className="width_33 di flex1"><img src={require("../../Images/left.png")}/></div>
                <div className="di flex1">
                    <div className="di activeLogo pa">
                        <img className="pa" src={require("../../Images/headerLogo.png")} />
                    </div>
                    <span className="di activeName">{title}</span>
                </div>
                <div className="width_33 di flex1"><img src={require("../../Images/right.png")}/></div>
            </div>
        );
    }
}
