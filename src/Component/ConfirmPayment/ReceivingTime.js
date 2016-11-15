import React, { Component } from 'react';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class ReceivingTime extends Component {
    render() {
        return (
            <div>
                <div className="list-block m0">
                    <div className="pr lh25 plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input type="checkbox" id="isCheck"  className="di isConfirm" />
                            <label htmlFor="isCheck"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">送货时间不限</span>
                    </div>
                    <div className="pr lh25 personStore plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input type="checkbox" id="isCheckOne"  className="di isConfirm" />
                            <label htmlFor="isCheckOne"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只休息日/节假日送货(工作日不送)</span>
                    </div>
                    <div className="pr lh25 personStore plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input type="checkbox" id="isCheckTwo"  className="di isConfirm" />
                            <label htmlFor="isCheckTwo"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只工作日送货(双休/节假日不送)</span>
                    </div>
                </div>
                <div className="plr">
                    <button className="comfirmBtn border_ra color_white bkg_ff width_100">确定</button>
                </div>
            </div>
        );
    }
}
