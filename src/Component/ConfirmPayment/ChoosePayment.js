import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class ChoosePayment extends Component {
    render() {
        const {planReceiveTime,orderNos} = this.props.location.query
        return (
            <section>
                <div className="plr evalute_h font14">
                    <div className="fl color9">
                        订单金额
                    </div>
                    <div className="fr colorff">
                        ￥<span>258</span>
                    </div>
                </div>
                <div className="list-block m0">
                    <ul>
                        <Link to="/confirmPayment/surePayment">
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                        <span className="color6">云卡通支付</span>
                                    </div>
                                    <div className="fr colorff">
                                        立减<span>10</span>元
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <li className="item-content item-link pl  border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">聚朵云币</span>
                                </div>
                            </div>
                        </li>
                        <Link
                            to="/confirmPayment/surePayment"
                            query={{
                            planReceiveTime:planReceiveTime,
                            orderNos:orderNos,
                            }}>
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                        <span className="color6">余额支付</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="plr evalute_h font14">
                    <div className="color9">
                        其他支付方式
                    </div>
                </div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content item-link pl  border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">支付宝支付</span>
                                </div>
                            </div>
                        </li>
                        <li className="item-content item-link pl  border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">微信支付</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        );
    }
}
