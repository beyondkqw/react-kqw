import React, { Component } from 'react';
import '../../Stylesheets/App/cloudCard.css';

export default class PaymentDetails extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">变更金额</div>
                                <div className={"item-after color_yellow"}><span>￥</span><span>200</span></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">变后金额</div>
                                <div className="item-after color9"><span>￥</span><span>200</span></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">相关订单</div>
                                <div className="item-after color9"><span>asdfewa</span></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">说明</div>
                                <div className="item-after color9"><span>爱速度哈就问</span></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">相关时间</div>
                                <div className="item-after color9"><span>2016-11-09</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="font16 height3 width_100 plAll mt25">
                    <div className="di height_all pr fl width_cart">
                        <button className="cartBtn width_100 height_all border_ra color_yellow">
                            取消付款
                        </button>
                    </div>
                    <div className="width_de fl height_all"></div>
                    <div className="di height_all pr fl width_buy border_ra">
                        <button className="width_100 height_all color_white">
                            立即购买
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
