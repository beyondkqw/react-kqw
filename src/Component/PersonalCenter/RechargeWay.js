import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/comfirmPayMoney.css';
import RPC from '../../Action/rpc'
import Subscribe from '../../Component/NewComponent/Subscribe'

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

    ChargeType(value,chooseWay,payStatus,img){
        //RPC.emit('rechargeWay')
        this.context.router.push({pathname:'/personalCenter/recharge',
            query:{chargeType:value,chargeWay:chooseWay,wayOfPay:payStatus,chooseImg:img}})
    }

    render() {
        const {planReceiveTime,orderNos} = this.props.location.query
        return (
            <section>
                <div className="list-block m0">
                    <ul>
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
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(4,'余额支付','balance',require('../../Images/common/yjzf.png'))}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di mr" style={{width:23,height:24}}>
                                        <img src={require('../../Images/common/yjzf.png')} alt=""/>
                                    </span>
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
                        {/* <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(0,'支付宝支付','',require('../../Images/common/zfb.png'))}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0 font14">
                                <div className="item-title">
                                    <span className="di mr"  style={{width:23,height:23}}>
                                        <img src={require('../../Images/common/zfb.png')} alt=""/>
                                    </span>
                                    <span className="color6">支付宝支付</span>
                                </div>
                            </div>
                        </li>*/}
                        <li
                            className="item-content item-link pl  border_bottom"
                            onClick = {()=>this.ChargeType(1,'微信支付','wxpay',require('../../Images/common/wxPay.png'))}
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
                    </ul>
                </div>
            </section>

        );
    }
}
