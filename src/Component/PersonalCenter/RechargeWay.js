import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class RechargeWay extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            changeType:''
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    ChargeType(value,chooseWay,payStatus){
        this.context.router.push({pathname:'/personalCenter/recharge',
            query:{chargeType:value,chargeWay:chooseWay,wayOfPay:payStatus}})
    }

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
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(3,'云卡通支付','')}
                        >
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
                        <li className="item-content item-link pl  border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">聚朵云币</span>
                                </div>
                            </div>
                        </li>
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(4,'余额支付','balance')}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">余额支付</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="plr evalute_h font14">
                    <div className="color9">
                        其他支付方式
                    </div>
                </div>
                <div className="list-block m0">
                    <ul>
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(0,'支付宝支付','')}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6">支付宝支付</span>
                                </div>
                            </div>
                        </li>
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(1,'微信支付','wxpay')}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                    <span className="color6"
                                    >微信支付</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        );
    }
}
