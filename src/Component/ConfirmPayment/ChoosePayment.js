import React, { Component } from 'react';
import {Link} from 'react-router';
import 'weixin-js-sdk';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class ChoosePayment extends Component {
    wxPay(){
        const wx = require('weixin-js-sdk');
        console.log('----------',wx)
        wx.ready(function() {
            console.log("-----------")
            wx.chooseWXPay({

                /*timestamp: weixinMessage.timeStamp, // 支付签名时间戳，
                nonceStr: weixinMessage.nonceStr, // 支付签名随机串，不长于 32 位
                package: weixinMessage.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: weixinMessage.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: weixinMessage.signature, // 支付签名*/
                success: function (res) {
                    // 支付成功后的回调函数
                    if(res.errMsg == "chooseWXPay:ok" ) {
                        //支付弹框隐藏

                        //支付成功处理
                    } else {
                        //支付失败处理
                    }
                },
                cancel: function(res) {
                    //取消支付处理
                },
                fail: function(res) {
                    alert("支付失败,请重新支付");
                }

            });
        });
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
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.wxPay()}
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
