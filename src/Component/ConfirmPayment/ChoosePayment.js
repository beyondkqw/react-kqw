import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class ChoosePayment extends Component {
    render() {
        const {planReceiveTime,orderNos,payMuchMoney} = this.props.location.query
        return (
            <section>
                <div className="plr evalute_h font14">
                    <div className="fl color9">
                        订单金额
                    </div>
                    <div className="fr colorff">
                        ￥<span>{payMuchMoney}</span>
                    </div>
                </div>
                <div className="list-block m0">
                    <ul>
                        <Link
                            to="/confirmPayment/surePayment"
                            query={{
                            planReceiveTime:planReceiveTime,
                            orderNos:orderNos,
                            wayOfPay:'cloudCartoon',
                            money:payMuchMoney,
                            type:0
                            }}
                        >
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di mr" style={{width:23,height:24}}>
                                            <img src={require('../../Images/common/ykt.png')} alt=""/>
                                        </span>
                                        <span className="color6">云卡通支付</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <li className="item-content item-link pl  border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di mr" style={{width:23,height:24}}>
                                        <img src={require('../../Images/common/jdyb.png')} alt=""/>
                                    </span>
                                    <span className="color6">聚朵云币</span>
                                </div>
                            </div>
                        </li>
                        <Link
                            to="/confirmPayment/surePayment"
                            query={{
                            planReceiveTime:planReceiveTime,
                            orderNos:orderNos,
                            wayOfPay:'balance',
                            money:payMuchMoney,
                            type:0
                            }}
                        >
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di mr" style={{width:23,height:23}}>
                                            <img src={require('../../Images/common/yjzf.png')} alt=""/>
                                        </span>
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
                        {/*<Link
                            to="/confirmPayment/surePayment"
                            query={{
                            planReceiveTime:planReceiveTime,
                            orderNos:orderNos,
                            wayOfPay:'Alipay',
                            money:payMuchMoney
                            }}>
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di mr" style={{width:23,height:23}}>
                                            <img src={require('../../Images/common/zfb.png')} alt=""/>
                                        </span>
                                        <span className="color6">支付宝支付</span>
                                    </div>
                                </div>
                            </li>
                        </Link>*/}
                        <Link
                            to="/confirmPayment/surePayment"
                            query={{
                                planReceiveTime:planReceiveTime,
                                orderNos:orderNos,
                                wayOfPay:'wxpay',
                                money:payMuchMoney
                                }}>
                            <li
                                className="item-content item-link pl  border_bottom"
                            >
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0 font14">
                                    <div className="item-title">
                                        <span className="di mr" style={{width:23,height:20}}>
                                            <img src={require('../../Images/common/wxPay.png')} alt=""/>
                                        </span>
                                        <span className="color6"
                                        >微信支付</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </section>

        );
    }
}
