import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerMyAlipy extends Component {
    render() {
        return (
            <div className="containerNav pb1">
                <NavBar
                    renderBack = {true}
                    title = {'我的支付宝'}
                />
                <div className="wrap">
                    <ul>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">开户姓名</div>
                                <div className="fr f12 color9 tr">
                                    <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">支付宝账号</div>
                                <div className="fr f12 color9 tr">
                                    <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="tc f12 color_red width_100 plr mtb loginHeight">
                        哈哈
                    </div>
                    <CommonBtn
                        title = {'确认'}
                    />
                </div>
            </div>
        );
    }
}
