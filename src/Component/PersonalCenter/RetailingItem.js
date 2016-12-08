import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class RetailingItem extends Component {
    render() {
        return (
            <div className="height_charge plAll border_bottom">
                <span className="fl di headerImg">
                    <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                </span>
                <div className="fl mr15">
                    <div className="font14 color6"><span>+</span><span>31.00</span></div>
                    <p className="f12 color9 mt1">多云云的天堂佣金发放</p>
                </div>
                <div className="fr f12 color9">
                    <div>2016-11-25</div>
                    <p className="mt3">11:30</p>
                </div>
            </div>
        );
    }
}
