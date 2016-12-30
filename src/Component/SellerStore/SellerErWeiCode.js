import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {qrCode} from '../../Action/url'
import {loadToken,ROOT_URL} from '../../Action/rpc'
import {ErCode,imei,version,client} from '../../Action/auth'

export default class SellerErWeiCode extends Component {
    render() {
        return (
            <div className="containerNav allIncome_Img supplement">
                <div className="pa_top1 tc">
                    <span className="di incomeImg">
                        <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                    </span>
                    <p className="f12 color6 mt5">速度快解放</p>
                </div>
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <img src={require('../../Images/QrCode.png')} alt=""/>
                    </span>
                </div>
            </div>
        );
    }
}
