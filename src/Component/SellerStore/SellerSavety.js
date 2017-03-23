import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import NavBar from '../../Component/CommonComponent/NavBar'


export default class SellerSavety extends Component {
    render() {
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'账号与安全'}
                />
                <SplitLine />
                <div className="font14">
                    <ul>
                        <Link to='/sellerBankCard'>
                            <li>
                                <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                    <div>
                                        <span className="di listimg">
                                            <img src={require('../../Images/credit.png')} alt=""/>
                                        </span>
                                        <span className="di color6 ml5">我的银行卡</span>
                                    </div>
                                    <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                        <img src={require('../../Images/rightArrow.png')} alt=""/>
                                    </span>
                                </div>
                            </li>
                        </Link>
                        <Link to="/sellerMyAlipy">
                            <li>
                                <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                    <div>
                                        <span className="di listimg">
                                            <img src={require('../../Images/alipay.png')} alt=""/>
                                        </span>
                                        <span className="di color6 ml5">我的支付宝</span>
                                    </div>
                                    <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                        <img src={require('../../Images/rightArrow.png')} alt=""/>
                                    </span>
                                </div>
                            </li>
                        </Link>
                        {/* <Link>
                            <li className="item-content border_bottom isConfirmSet">
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg"><img src={require('../../Images/wx.png')} alt=""/></span>
                                        <span className="di margin15 color6">微信号</span>
                                    </div>
                                    <div className="item-after color9 isSet">未绑定</div>
                                </div>
                            </li>
                        </Link>*/}
                        <SplitLine />
                        <Link to = '/sellerBindPhone'>
                            <li>
                                <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                    <div>
                                        <span className="di listimg">
                                            <img src={require('../../Images/phoneImg.png')} alt=""/>
                                        </span>
                                        <span className="di color6 ml5">手机号</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/sellerPwdModify" query={{mobile:this.props.location.query.mobile}}>
                            <li>
                                <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                    <div>
                                        <span className="di listimg">
                                            <img src={require('../../Images/password.png')} alt=""/>
                                        </span>
                                        <span className="di color6 ml5">修改密码</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}
