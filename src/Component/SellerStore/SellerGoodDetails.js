import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {AuditRefund} from '../../Action/auth';

export default class SellerGoodDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isVisible:false,
            orderId:'',
            refundAmount:''
        };
      }

    async agreeRefund(e,orderId,amount){

        //阻止默认事件
        e.preventDefault()
        await this.setState({isVisible:true,orderId:orderId,refundAmount:amount})
    }

    async agreeAuditRefund(amount,orderId){
        await AuditRefund(amount,orderId)
            .then(res=>{
                this.setState({isVisible:false})
                alert('同意退款成功')
                window.location.reload()
            })
            .catch(err=>{
                console.warn('删除订单失败',err)
            })
    }

    render() {
        const {sellerOrderDetails,toPay,deliverGoods,Refund,alreadyRated,evaluationManagement,isShowWhat,scrollTop} = this.props
        return (
            <div className="pr">
                {
                    sellerOrderDetails == '' ?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    sellerOrderDetails&&sellerOrderDetails.map(el=>{
                        return(
                            <div>
                                <Link to="/sellerOrderDetails" query={Refund?{toApply:true,orderNo:el.order_no}:{orderNo:el.order_no}}>
                                    {
                                        el.orderDetails&&el.orderDetails.map((item,index)=>{
                                            return(
                                                <div>
                                                    <div className="order_height border_bottom pr plAll df">
                                                        <div className="order_img height_all">
                                                            <img src={item.productImage} alt=""/>
                                                        </div>
                                                        <div className="flex1 order_margin">
                                                            <p className="oh color6 orderShow font14  db">{item.productName}</p>
                                                            <p className="color9 f12 delete oh_height mt3">
                                                                <span>{item.attrDesc}</span>
                                                            </p>
                                                            {/*<p className="color9 f12 delete oh_height mt1">
                                                                货号 : <span>{item.orderNo}</span>
                                                            </p>*/}
                                                            {
                                                                alreadyRated?
                                                                    <p className="color9 f12 delete oh_height mt1">
                                                                        买家昵称 : <span>{el.name}</span>
                                                                    </p>
                                                                    :null
                                                            }
                                                        </div>
                                                        <div className="pa order_price tr">
                                                            <p className="color_yellow">
                                                                <span className="f12">￥</span>
                                                                <span className="f15">{item.price}</span>
                                                            </p>
                                                            <p className="color9 font14"><span>X</span><span>{item.num}</span></p>
                                                        </div>
                                                       {

                                                            Refund?
                                                                <div className=" pa mt55" style={{bottom:10,right:10}}>
                                                                    <div >
                                                                        {
                                                                            item.refundStatus == 0?
                                                                                <span
                                                                                    className="di font14 bkg_ff border_ra color_white"
                                                                                    style={{padding:'2px 5px'}}
                                                                                    onClick = {(e)=>this.agreeRefund(e,item.id,item.price)}
                                                                                >同意</span>
                                                                                :null
                                                                        }
                                                                        {
                                                                            item.refundStatus == 1?
                                                                                <span
                                                                                    className="di font14 border_ra color9 border_all"
                                                                                    style={{padding:'2px 5px'}}
                                                                                >处理中</span>
                                                                                :null
                                                                        }

                                                                    </div>
                                                                </div>
                                                                :null
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Link>
                                <div>
                                    <div className="order_pay">
                                        <div className="f12 width100 height1">
                                            <div className="fr">
                                                <label>共<span>{el.num}</span>件商品</label>
                                                <label className="ml5">合计<span>￥</span><span>{el.amount}</span></label>
                                                <label className="ml">(含运费 : ￥<span>{parseFloat(el.postage).toFixed(2)}</span>)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ispayOrCancle font14">
                                        {
                                            toPay?
                                                <div className="paddingorder">
                                                    <Link to="/sellerErWeiCode" query={{orderNos:el.order_no}}>
                                                        <div style={{height: 30,textAlign:'right'}}>
                                                            <button
                                                                className="bkg_ff border_ra color_white"
                                                            >支付二维码</button>
                                                        </div>
                                                    </Link>
                                                </div>
                                                :null
                                        }
                                        {
                                            deliverGoods?
                                                <div className="paddingorder">
                                                    <Link to="/toShip" query={{orderNo:el.order_no}}>
                                                        <div style={{height: 30,textAlign:'right'}}>
                                                            <button
                                                                className="bkg_ff border_ra color_white"
                                                            >去发货</button>
                                                        </div>
                                                    </Link>
                                                </div>
                                                :null
                                        }

                                    </div>
                                </div>
                                <SplitLine />
                                {/*{
                                    alreadyRated?
                                            <Link to="/searchOrder">
                                                <div style={{bottom:50,height:50}} className="pf width100"></div>
                                                <div
                                                    className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                                                    style={{height:50,backgroundColor:'#ff5500'}}>
                                                    搜索订单
                                                </div>
                                            </Link>
                                        :null
                                }*/}
                            </div>
                        )
                    })
                }
                {
                    this.state.isVisible?
                    <Modal
                        title = {'确定同意退款？'}
                        scrollTop = {scrollTop}
                        onClick = {()=>this.agreeAuditRefund(this.state.refundAmount,this.state.orderId)}
                        toHideModal = {()=>this.setState({isVisible:false})}
                    />
                    :null
                }
            </div>
        );
    }
}
