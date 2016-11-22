import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';

export default class Savety extends Component {
    render() {
        return (
            <div>
                <div className="bkg_gray save_h2 pl8">账号</div>
                <div className="list-block m0 font14">
                    <ul>
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
                        <Link>
                            <li className="item-content border_bottom">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/qq.png')} alt=""/></span>
                                        <span className="di margin15 color6">QQ号</span>
                                    </div>
                                    <div className="item-after bandNum color9">已绑定</div>
                                </div>
                            </li>
                        </Link>
                        <Link>
                            <li className="item-content border_bottom">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/weibo.png')} alt=""/></span>
                                        <span className="di margin15 color6">微博号</span></div>
                                    <div className="item-after bandNum color9">已绑定</div>
                                </div>
                            </li>
                        </Link>
                        <Link>
                            <li className="item-content border_bottom">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/phoneImg.png')} alt=""/></span>
                                        <span className="di margin15 color6">手机号</span>
                                    </div>
                                    <div className="item-after bandNum color9">已绑定</div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="bkg_gray save_h2 pl8">安全</div>
                <div className="list-block m0 font14">
                    <ul>
                        <li className="item-content">
                            <div className="item-inner">
                                <div className="item-title">
                                    <span className="di listimg"><img src={require('../../Images/password.png')} alt=""/></span>
                                    <span className="di margin15">修改密码</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
