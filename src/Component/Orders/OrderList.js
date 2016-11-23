import React, { Component } from 'react';
import '../../Stylesheets/App/order.css';

export default class OrderList extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="drder_height border_bottom pr">
                    <div className="store_img pa">
                        <img className="border_ra" src={require('../../Images/wx.png')} alt=""/>
                    </div>
                    <div className="color6 mr45">
                        <p className="font14 oh oh_height">213</p>
                        <p className="color_yellow oh_height">
                            <span className="f12">￥</span><span className="font14">45867</span></p>
                    </div>
                    <div className="pa color6 cancel_collect">
                        <button className="f12 cancel_btn border_ra">取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
