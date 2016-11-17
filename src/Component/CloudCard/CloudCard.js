import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import '../../Stylesheets/App/cloudCard.css';

export default class CloudCard extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="plAll cloudInformation">
                    <div className="fl mr5 height_all header_img">
                        <img className="border_ra50" src={require('../../Images/store.png')} alt=""/>
                    </div>
                    <div className="font14 mt3 color6">
                        <p><span>会员ID :</span><span>123456</span></p>
                        <p><span>微信昵称 :</span><span>洁</span></p>
                    </div>
                </div>
                <SplitLine />
                <div className="recharge border_bottom plr">
                    <div className="color_yellow fl height_all">
                        <span className="f15">￥</span><span className="f25">5678</span>
                    </div>
                    <Link>
                        <button className="fr settleAccount border_ra color_white mt11">充值</button>
                    </Link>
                </div>
                <div className="height4 df clearAll border_bottom tc">
                    <div className="fl flex1 border_right">总额</div>
                    <div className="fl flex1"><Link to="/paymentOther" className="color6">代付款</Link></div>
                </div>
                <div className="height4 df clearAll border_bottom tc">
                    <div className="fl flex1 border_right"><Link to="/alreadyUsed" className="color6">已使用</Link></div>
                    <div className="fl flex1"><Link to="/diaryContainer" className="color6">全部日志</Link></div>
                </div>
            </div>
        );
    }
}
