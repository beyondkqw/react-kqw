import React, { Component } from 'react';
import '../../Stylesheets/App/order.css';
import {GetOrderList} from '../../Action/auth';

export default class ApplicationForAfterSales extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render() {
        return (
            <div className="containerNav bkg_gray">
                <div className="plr">
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p className="font14 color6">退款类型</p>
                        </div>
                    </div>
                    <div className="bkg_color border_ra">
                        <ul className="color9 font14 saleLi">
                            <li className="border_bottom">我要退款(无需退货)</li>
                            <li>我要退货</li>
                        </ul>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p className="font14 color6">退款原因</p>
                        </div>
                    </div>
                    <div className="df plr bkg_color border_ra saleTitle">
                        <div className="flex1">
                            <p className="font14 color6">退款原因</p>
                        </div>
                        <div className="rightPoint pr"><img className="pa" src={require("../../Images/rightPoint.png")} alt=""/></div>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p>
                                <span  className="font14 color6">退款金额</span>
                                <span className="di f12 color9 ml">最多￥</span>
                                <span className="f12 color9">258.00</span></p>
                        </div>
                    </div>
                    <div className="plr bkg_color border_ra saleTitle color9 font14">
                        <input className="borderno" type="text" placeholder="请输入退款金额"/>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p>
                                <span  className="font14 color6">退款说明</span>
                                <span className="di f12 color9 ml">(可不填)</span>
                            </p>
                        </div>
                    </div>
                    <div className="plr bkg_color border_ra saleTitle color9 font14">
                        <input className="borderno" type="text" placeholder="请输入退款说明"/>
                    </div>
                </div>
                <div className="footerHidden"></div>
                <div className="width_100 commit bkg_ff color_white pf bottom0">
                    <button className="width_100 height_all">确定</button>
                </div>
            </div>
        );
    }
}
