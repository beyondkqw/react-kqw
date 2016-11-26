import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class DeliveredInformation extends Component {
    render() {
        return (
            <div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">收货人</div>
                                <div className="item-after color9"><input className="borderno tr " type="\" placeholder="收货人姓名"/></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">联系电话</div>
                                <div className="item-after color9"><input className="borderno tr" type="\" placeholder="电话号码"/></div>
                            </div>
                        </li>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">所在地区</div>
                                <div className="item-after color9"><input className="borderno tr" type="\" placeholder="请选择"/></div>
                            </div>
                        </li>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">街道</div>
                                <div className="item-after color9"><input className="borderno tr" type="\" placeholder="请选择所在区域"/></div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">详细信息</div>
                                <div className="item-after color9"><input className="borderno tr" type="\" placeholder=""/></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <CommonBtn
                    title={'确定'}
                />
            </div>
        );
    }
}
