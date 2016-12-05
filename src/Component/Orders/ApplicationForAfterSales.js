import React, { Component } from 'react';
import '../../Stylesheets/App/order.css';
import {GetOrderList} from '../../Action/auth';

const reason = ['不喜欢/不想要','未按约定时间发货','快递一直未达到','空包裹','其他原因']
export default class ApplicationForAfterSales extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            receivedStatus:'',//收货状态
            refundType:'',//退款类型
            showReason:false,//显示退款原因
        };
    }

    render() {
        const {receivedStatus,showReason,refundType} = this.state
        return (
            <div className="containerNav bkg_gray">
                <div className="plr">
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p className="font14 color6">退款类型</p>
                        </div>
                    </div>
                    <div className="bkg_color border_ra">
                        <ul className="color9 font14 saleLi">
                            <li
                                onClick = {()=>this.setState({refundType:1})}
                                className="border_bottom"
                                style={{color:refundType==1?'#ff5500':null}}
                            >
                                我要退款
                                {
                                    refundType==1?
                                        <span className="fr imgSize mr5">
                                            <img src={require('../../Images/gou.png')}/>
                                        </span>
                                        :null
                                }
                            </li>
                            <li
                                onClick = {()=>this.setState({refundType:2})}
                                style={{color:refundType==2?'#ff5500':null}}
                            >
                                我要退货
                                {
                                    refundType==2?
                                        <span className="fr imgSize mr5">
                                            <img src={require('../../Images/gou.png')}/>
                                        </span>
                                        :null
                                }

                            </li>
                        </ul>
                    </div>

                    {
                        refundType==1?
                            <div>
                                <div className="df ml saleTitle">
                                    <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                                    <div className="flex1 ml">
                                        <p className="font14 color6">收获状态</p>
                                    </div>
                                </div>
                                <div className="bkg_color border_ra">
                                    <ul className="color9 font14 saleLi">
                                        <li
                                            onClick = {()=>this.setState({receivedStatus:1})}
                                            className="border_bottom"
                                            style={{color:receivedStatus==1?'#ff5500':null}}
                                        >
                                            未收到货
                                            {
                                                receivedStatus==1?
                                                    <span className="fr imgSize mr5">
                                                        <img src={require('../../Images/gou.png')}/>
                                                    </span>
                                                    :null
                                            }
                                        </li>
                                        <li
                                            style={{color:receivedStatus==2?'#ff5500':null}}
                                            onClick = {()=>this.setState({receivedStatus:2})}
                                        >
                                            已收到货
                                            {
                                                receivedStatus==2?
                                                    <span className="fr imgSize mr5">
                                                        <img src={require('../../Images/gou.png')}/>
                                                    </span>
                                                    :null
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            :null
                    }

                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p className="font14 color6">退款原因</p>
                        </div>
                    </div>
                    <div className="df plr bkg_color border_ra saleTitle">
                        <div
                            onClick={()=>this.setState({showReason:true})}
                            className="flex1"
                        >
                            <p className="font14 color6">退款原因</p>
                        </div>
                        <div className="rightPoint pr"><img className="pa" src={require("../../Images/rightPoint.png")} alt=""/></div>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p>
                                <span  className="font14 color6">退款金额</span>
                                <span className="di f12 color9 ml">最多￥</span>
                                <span className="f12 color9">258.00</span></p>
                        </div>
                    </div>
                    <div className="plr bkg_color border_ra saleTitle color9 font14">
                        <input className="borderno" type="text" placeholder="请输入退款金额"/>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p>
                                <span  className="font14 color6">退款说明</span>
                                <span className="di f12 color9 ml">(可不填)</span>
                            </p>
                        </div>
                    </div>
                    <div className="plr bkg_color border_ra saleTitle color9 font14">
                        <input className="borderno" type="text" placeholder="请输入退款说明"/>
                    </div>
                </div>
                <div className="footerHidden"></div>
                <div className="width_100 commit bkg_ff color_white pf bottom0">
                    <button className="width_100 height_all">确定</button>
                </div>

                {
                    showReason?
                        <div
                            className="containerNav reason"
                            onClick={()=>this.setState({showReason:false})}
                        >
                            <div className="reasonContainer">
                                <div className="reasonTitle">
                                    退款原因
                                </div>
                                {
                                    reason.map((el,index)=>{
                                        return(
                                            <div 
                                                onClick = {(o)=>o.stopPropagation()}
                                                key= {index}
                                                className="reasonRow"
                                            >
                                                {el}
                                            </div>
                                        )
                                    })
                                }

                                <div className="reasonTitle">确 认</div>
                            </div>
                        </div>
                        :null
                }

            </div>
        );
    }
}
