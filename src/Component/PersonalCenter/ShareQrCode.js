import React, { Component } from 'react';
import {qrCode,accQrCode} from '../../Action/url'
import wx from 'weixin-js-sdk';
import {loadToken,ROOT_URL,GetQueryString} from '../../Action/rpc'
import {imei,version,client,MyInfo} from '../../Action/auth'
import {initWxShare} from '../../Action/wxUtil'

export default class ShareQrCode extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            path:'',
            personalId:''
        };
    }



    async componentWillMount() {
        const erweiCodePath = ROOT_URL+accQrCode +'?accId='+GetQueryString('accId')
            +'&width=180&height=180'
        this.setState({path:erweiCodePath})


        initWxShare(
            "聚朵云",
            "http://jdypage.tunnel.qydev.com/api/shareQrCode?accId="+GetQueryString('accId'),
            "../images/logo.png",
            "",
            "",
            "",
            0,
            GetQueryString('accId')
        )
    }

    render() {
        return (
            <div className="containerNav allIncome_Img supplement">
                {/*<div className="pa_top1 tc">
                    <span className="di incomeImg">
                        <img className="border_ra50" src={image} alt=""/>
                    </span>
                    <p className="f12 color9 mt5">{memberName}</p>
                </div>*/}
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <img src={this.state.path} alt=""/>
                    </span>
                </div>
                {/* <div className="pf bottom0 tc userHeight bkg_ff width100 color_white font16">
                 分享
                 </div>*/}
            </div>
        );
    }
}
