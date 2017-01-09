import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';


export default class SellerSavety extends Component {
    render() {
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="list-block m0 font14">
                    <ul>
                        <Link to='/sellerBankCard'>
                            <li className="item-content item-link border_bottom isConfirmSet">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/credit.png')} alt=""/></span>
                                        <span className="di margin15 color6">我的银行卡</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/sellerMyAlipy">
                            <li className="item-content item-link border_bottom">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/alipay.png')} alt=""/></span>
                                        <span className="di margin15 color6">我的支付宝</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link>
                            <li className="item-content border_bottom isConfirmSet">
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg"><img src={require('../../Images/wx.png')} alt=""/></span>
                                        <span className="di margin15 color6">微信号</span>
                                    </div>
                                    <div className="item-after color9 isSet">未绑定</div>
                                </div>
                            </li>
                        </Link>
                        <SplitLine />
                        <Link to = '/sellerBindPhone'>
                            <li className="item-content border_bottom">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/phoneImg.png')} alt=""/></span>
                                        <span className="di margin15 color6">手机号</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/sellerPwdModify" query={{mobile:this.props.location.query.mobile}}>
                            <li className="item-content">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/password.png')} alt=""/></span>
                                        <span className="di margin15 color6">修改密码</span></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}
