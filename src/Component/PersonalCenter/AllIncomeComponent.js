import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class AllIncomeComponent extends Component {
    render() {
        return (
            <div className="pa_top1 tc">
                <span className="di incomeImg">
                    <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                </span>
                <p className="f12 color9 mt5">小燕子的天堂</p>
                <p className="f25 color6 mt6"><span>+</span><span>2400</span></p>
            </div>
        );
    }
}
