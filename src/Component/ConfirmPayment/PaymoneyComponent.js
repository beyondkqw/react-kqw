import React, { Component } from 'react';
import {Link} from 'react-router';
//import '../../Stylesheets/App/order.css';

export default class PaymoneyComponent extends Component {
    render() {
        const {title,num,attr,imgurl,price} = this.props
        return (
            <div className="order_height border_bottom pr plAll df">
                <div className="order_img height_all">
                    <img src={imgurl} alt=""/>
                </div>
                <div className="flex1 order_margin">
                    <p className="color6 font14 db">{title}</p>
                    <p className="color9 f12 oh_height mt3">
                        <span>{attr}</span>
                    </p>
                </div>
                <div className="pa order_price tr">
                    <p className="color_yellow"><span className="f12">￥</span><span className="f15">{price}</span></p>
                    <p className="color9 font14"><span>X</span><span>{num}</span></p>
                </div>
            </div>
        );
    }
}
