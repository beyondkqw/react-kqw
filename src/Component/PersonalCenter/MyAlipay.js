import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';

export default class MyAlipay extends Component {
    render() {
        return (
            <div className="containerNav pb1">
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
                    <div style={{marginTop:30}}>
                        <CommonBtn
                            title = {'确认'}
                        />
                    </div>

                </div>
            </div>
        );
    }
}
