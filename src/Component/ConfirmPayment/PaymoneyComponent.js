import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';

export default class PaymoneyComponent extends Component {
    render() {
        const {title,num,color,size,imgurl} = this.props
        return (
            <div className="order_height border_bottom pr plAll df">
                <div className="order_img height_all">
                    <img src={imgurl} alt=""/>
                </div>
                <div className="flex1 font14 order_margin">
                    <p className="color6 db">{title}</p>
                    <p className="color9 oh_height mt3">
                        <span>颜色 :</span><span>{color}</span>
                        <span className="di ml">鞋码 :</span><span>{size}</span>
                    </p>
                </div>
                <div className="pa order_price tr">
                    <p className="color_yellow"><span className="f12">￥</span><span className="f15">258</span></p>
                    <p className="color9 font14"><span>X</span><span>{num}</span></p>
                </div>
            </div>
        );
    }
}
