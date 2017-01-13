import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/order.css';
import {GetOrderList,NoticeList,Refund} from '../../Action/auth';
export default class ApplicationForAfterSales extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            reason:[],
            receivedStatus:'',//收货状态
            refundType:'',//退款类型
            showReason:false,//显示退款原因
            isChoose:null,
            refundReason:'退款原因',
            type:'',
            recStatus:'',
            applyAmount:'',
            refundDesc:''
        };
    }

    static contextTypes = {
        router:PropTypes.object
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
                this.context.router.goBack()
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
                            <li
                                onClick = {()=>this.setState({refundType:1,type:0})}
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
                                onClick = {()=>this.setState({refundType:2,type:1})}
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
                                            onClick = {()=>this.setState({receivedStatus:1,recStatus:0})}
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
                                            onClick = {()=>this.setState({receivedStatus:2,recStatus:1})}
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
                            <p className="font14 color6">{refundReason}</p>
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
                        <input
                            className="borderno"
                            type="text"
                            placeholder="请输入退款金额"
                            ref="refundMoney"
                            onChange={()=>this.setState({applyAmount:this.refs.refundMoney.value})}
                        />
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
                        <input
                            className="borderno"
                            type="text"
                            placeholder="请输入退款说明"
                            ref="refundDesc"
                            onChange={()=>this.setState({refundDesc:this.refs.refundDesc.value})}
                        />
                    </div>
                </div>
                <div className="footerHidden"></div>
                <div className="width_100 commit bkg_ff color_white pf bottom0">
                    <button
                        className="width_100 height_all"
                        onClick={()=>this.confirmRefund()}
                    >确定</button>
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
                                                onClick = {(e)=>this.checkReason(e,index,el.title)}
                                                style={{backgroundColor:isChoose==index?'#fff5f0':null}}
                                                key= {index}
                                                className="reasonRow"
                                            >
                                                {el.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :null
                }

            </div>
        );
    }
}
