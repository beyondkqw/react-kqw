import React, { Component } from 'react';
import NavBar from '../../Component/CommonComponent/NavBar'

export default class Feedback extends Component {
    render() {
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'帮助与反馈'}
                />
                <div className="bkg_gray contact font14">任何业务咨询、投诉建议等,欢迎通过以下方式与我们联系,工作日09:00-18:00</div>
                <div className="list-block m0 font14">
                    <ul>
                        <li className="item-content border_bottom">
                            <div className="item-inner">
                                <div className="item-title">微信公众服务号</div>
                                <div className="item-after">聚朵云</div>
                            </div>
                        </li>
                        <li className="item-content border_bottom">
                            <div className="item-inner">
                                <div className="item-title">企业QQ服务号</div>
                            </div>
                        </li>
                        <li className="item-content border_bottom">
                            <div className="item-inner">
                                <div className="item-title">客服热线</div>
                                <div className="item-after">4008-770-123</div>
                            </div>
                        </li>
                        <li className="item-content">
                            <div className="item-inner">
                                <div >提交资料请发送邮箱至12154653466@qq.com</div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}
