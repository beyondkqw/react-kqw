import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class SurePayment extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="plAll tc bkg_fadeff">
                    <p className="color9 font14">聚朵云-订单编号4453546458</p>
                    <p className="mt5 color6 f20"><span>￥</span><span>258</span></p>
                </div>
                <CommonBtn
                    title={'确认付款'}
                />
            </div>
        );
    }
}
