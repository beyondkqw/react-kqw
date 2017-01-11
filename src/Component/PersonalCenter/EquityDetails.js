/**
 * Created by asus on 2016/12/12.
 */
import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import '../../Stylesheets/App/personal.css';

export default class EquityDetails extends Component {

    render(){
        const {companyName,holdShares,allHoldShares,price} = this.props.location.query
        return(
            <div className="containerNav">
                <div className="wrap">
                    <div className="stockBanner flex flex-align-center flex-pack-center flex-v">
                        <p className="font14 color_white">总共分红</p>
                        <p className="font30 color_white">{allHoldShares}</p>
                    </div>
                    <SplitLine />
                    <div className ="list-block m0 font14">
                        <ul>
                            <li className ='item-content border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di color6">公司名称</span>
                                    </div>
                                    <div className="item-after color9 isSet">{companyName}</div>
                                </div>
                            </li>
                            <li className ='item-content border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di color6">持有股票</span>
                                    </div>
                                    <div className="item-after color9 isSet">{holdShares}股</div>
                                </div>
                            </li>
                            {/*<li className ='item-content border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di color6">总共分红</span>
                                    </div>
                                    <div className="item-after color9 isSet"><span>￥</span>1222</div>
                                </div>
                            </li>*/}
                            <li className ='item-content border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di color6">每股市价</span>
                                    </div>
                                    <div className="item-after color9 isSet">￥{price}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}