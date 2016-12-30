import React, { Component } from 'react';
import '../../Stylesheets/App/order.css';
import {GetOrderList,NoticeList,Refund} from '../../Action/auth';

export default class ToFund extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            reason:[],
            showReason:false,//显示退款原因
            isChoose:null,
            refundReason:'退款原因',
            type:'',
            recStatus:'',
            applyAmount:'',
            refundDesc:''
        };
    }

    async componentWillMount() {
        //退款原因列表
        await NoticeList('REFUND',10,0)
            .then(res=>{
                console.log('res',res)
                this.setState({reason:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //选择退款原因
    async checkReason(o,index,value){
        o.stopPropagation()
        await this.setState({isChoose:index})
        this.setState({showReason:false})
        this.setState({refundReason:value})
    }

    //申请退款
    async confirmRefund(){
        const orderDetailId = this.props.location.query.orderNo
        const {applyAmount,refundReason,type,recStatus,refundDesc} = this.state
        await Refund(orderDetailId,applyAmount,refundReason,type,recStatus,refundDesc)
            .then(res=>{
                console.log('res',res)
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {reason,receivedStatus,showReason,refundType,isChoose,refundReason} = this.state
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
                            <li>退款</li>
                        </ul>
                    </div>
                    <div className="df ml saleTitle">
                        <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                        <div className="flex1 ml">
                            <p className="font14 color6">退款原因</p>
                        </div>
                    </div>
                    <div className="df plr bkg_color border_ra saleTitle">
                        <div className="flex1">
                            <p className="font14 color9">按时刚好放假</p>
                        </div>
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
                        色热热
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
                        石头人人头
                    </div>
                </div>
                <div className="footerHidden"></div>
                <div className="width_100 commit pf bottom0">
                    <button className="width50 height_all bkg_fadeff color_yellow">买家协商</button>
                    <button className="width50 height_all bkg_ff color_white">退款</button>
                </div>

            </div>
        );
    }
}
