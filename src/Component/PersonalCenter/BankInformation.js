import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';


export default class BankInformation extends Component {
    render() {
        return (
            <div className="containerNav pb1">
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
                            <div className="fl color6">联系电话</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">银行账号</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">开户银行</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">省份</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">城市</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">区县</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">开户支行</div>
                            <div className="fr f12 color9 tr">
                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="userHeight border_bottom plr font14 color_yellow">
                    请写明:姓名+XX银行XX省XX市XX分行XX支行
                </div>
                <CommonBtn
                    title = {'确认'}
                />
            </div>
        );
    }
}
