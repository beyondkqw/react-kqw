import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {CancelReceived,OrderDel,GetOrderList,ConfirmReceived} from '../../Action/auth';
import {config} from '../../Action/Const'

export default class OrderDetails extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isCancel:false,
            isDelete:false,
            orderNo:'',
            delNo:'',
            cancelOrder:'取消订单'
        };
    }

    //取消订单
    async cancelOrder(orderNo){
        await CancelReceived(orderNo)
            .then(res=>{
                this.setState({isCancel:false});
                this.props.debitPay()
                //this.setState({cancelOrder:'订单取消成功'})
                //GetOrderList('0')
            })
            .catch(err=>{
                console.warn('取消订单失败',err)
            })
    }

    //删除订单
    async DeletdOrder(orderNo){
        await OrderDel(orderNo)
            .then(res=>{
                this.setState({isDelete:false})
                //重新请求列表接口
                this.props.againSend()
            })
            .catch(err=>{
                console.warn('删除订单失败',err)
            })
    }

    //确认收货
    async confirmHarvest(orderNo){
        await ConfirmReceived(orderNo)
            .then(res=>{
                alert('收货成功')
                this.props.Receipt()
            })
            .catch(err=>{
                console.warn('收获失败',err)
            })
    }
    render() {
        const {orderDetails,toPay,makeSure,toRated,alreadyRated,allRated,query,scrollTop} = this.props
        return (
            <div className="pr">
                {
                    orderDetails == '' ?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    orderDetails&&orderDetails.map((el,index)=>{
                        return(
                            <div>
                                <div className="paymargin">
                                    <div className="di payImgSize mr"><img src={el.img} alt=""/></div>
                                    <span className="color6 font14">{el.store_name}</span>
                                </div>
                                <Link
                                    to="/orders/orderFormDetails"
                                    query={{
                                    orderId:el.order_no,
                                    isToPay:toPay,
                                    isMakeSure:makeSure,
                                    index:this.props.orderIndex
                                    }}

                                >
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
                                                            <p className="color9 f12 delete oh_height mt5">
                                                                <span>{item.attrDesc}</span>
                                                            </p>
                                                        </div>
                                                        <div className="pa order_price tr">
                                                            <p className="color_yellow">
                                                                <span className="f12">￥</span>
                                                                <span className="f15">{item.price}</span>
                                                            </p>
                                                            <p className="color9 font14"><span>X</span><span>{item.num}</span></p>
                                                        </div>
                                                        {/*评论*/}
                                                        {
                                                            toRated?
                                                                <div
                                                                    style={{bottom:10,right:10}}
                                                                    className="pa mt55"
                                                                >
                                                                    <Link
                                                                        to="orderList/publishEvalute"
                                                                        query={{
                                                                            orderNo:item.orderNo,
                                                                            image : item.productImage,
                                                                            productId  :item.productId
                                                                        }}>
                                                                        <button
                                                                            className="btn font14 bkg_ff border_ra color_white"
                                                                        >评价</button>
                                                                    </Link>
                                                                </div>
                                                                :null
                                                        }
                                                        {
                                                            //评价
                                                        allRated &&(el.status == 3)?
                                                            <div
                                                                style={{bottom:10,right:10}}
                                                                className="pa mt55"
                                                            >
                                                                <Link
                                                                    to="orderList/publishEvalute"
                                                                    query={{
                                                                    orderNo:item.orderNo,
                                                                    image : item.productImage,
                                                                    productId  :item.productId
                                                                }}>
                                                                    <button
                                                                    className="btn font14 bkg_ff border_ra color_white"
                                                                    >评价</button>
                                                                </Link>
                                                            </div>
                                                            :null
                                                        }
                                                        {/*{
                                                         alreadyRated?
                                                         <div className="pa mt55" style={{bottom:10,right:10}}>
                                                         <Link
                                                         to="orderList/viewEvaluation"
                                                         query={{
                                                         orderNo:item.orderNo,
                                                         image : item.productImage,
                                                         productId  :item.productId
                                                         }}
                                                         >
                                                         <button className="btn font14 bkg_ff border_ra color_white">查看</button>
                                                         </Link>
                                                         </div>
                                                         :null
                                                         }*/}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Link>
                                <div className="order_pay">
                                    <div className="f12 width100 height1">
                                        <div className="fr">
                                            <label>共<span>{el.num}</span>件商品</label>
                                            <label className="ml5">合计<span>￥</span><span>{el.amount+el.postage}</span></label>
                                            <label className="ml">(含运费 : ￥<span>{el.postage}</span>)</label>
                                        </div>
                                    </div>
                                    <div className="ispayOrCancle font14">
                                        {
                                            toPay?
                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <button
                                                        className="border_ra color9 border_ccc"
                                                        onClick = {()=>
                                                            this.setState({isCancel:true,
                                                                orderNo:el.order_no})}
                                                    >{el.status == config.order_status_cancel?'已取消':'取消订单'}</button>
                                                    {
                                                        el.status == config.order_status_cancel?
                                                            null:
                                                            <Link to="/comfirmPayMoney" query={{orderId:el.order_no}}>
                                                                <button className="bkg_ff ml5 border_ra color_white">付款</button>
                                                            </Link>
                                                    }
                                                </div>
                                                :null
                                        }
                                        {
                                            makeSure?
                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <Link to="/toWebView" query={{LogCompany:el.delivery_name,LogNo:el.delivery_no,chooseLink:true}}>
                                                        <button className="border_ra mr5 color9 border_ccc">查看物流</button>
                                                    </Link>
                                                    <button
                                                        className="bkg_ff border_ra color_white"
                                                        onClick={()=>this.confirmHarvest(el.order_no)}
                                                    >{el.status == config.order_status_receipt?'待评价':'确认收货'}</button>
                                                </div>
                                                :null
                                        }
                                        {   //全部订单显示的状态
                                            allRated && (el.status == 4 || el.status == 7)?
                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <button
                                                        className="border_ra bkg_ff color_white"
                                                        onClick={()=>{
                                                            this.setState({isDelete:true,delNo:el.order_no});
                                                        }}
                                                    >删除订单</button>
                                                </div>
                                                ://待支付
                                                allRated && (el.status == 0)?
                                                    <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <button
                                                        className="border_ra color9 border_ccc"
                                                        onClick = {()=>this.setState({isCancel:true, orderNo:el.order_no})}
                                                    >{el.status == config.order_status_cancel?'已取消':'取消订单'}</button>
                                                    {
                                                        el.status == config.order_status_cancel?
                                                            null:
                                                            <Link to="/comfirmPayMoney" query={{orderId:el.order_no}}>
                                                                <button className="bkg_ff ml5 border_ra color_white">付款</button>
                                                            </Link>
                                                    }
                                                    </div>
                                                    ://待发货
                                                    allRated && (el.status == 1)?
                                                    <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                        <button
                                                            className="border_ra color9 border_ccc"
                                                        >待发货</button>
                                                    </div>
                                                        ://待发货
                                                        allRated && (el.status == 2)?
                                                            <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                                <button
                                                                    className="bkg_ff border_ra color_white"
                                                                    onClick={()=>this.confirmHarvest(el.order_no)}
                                                                >确认收货</button>
                                                            </div>
                                                            ://已完成
                                                            allRated && (el.status == 4)?
                                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                                    <button
                                                                        className="border_ra color9 border_ccc"
                                                                    >已完成</button>
                                                                </div>
                                                                ://已取消
                                                                allRated && (el.status == 5)?
                                                                    <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                                        <button
                                                                            className="border_ra color9 border_ccc"
                                                                        >已取消</button>
                                                                    </div>
                                                                    ://已退款
                                                                    allRated && (el.status == 7)?
                                                                        <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                                            <button
                                                                                className="border_ra color9 border_ccc"
                                                                            >已退款</button>
                                                                        </div>
                                                                        ://退款失败
                                                                        allRated && (el.status == 8)?
                                                                            <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                                                <button
                                                                                    className="border_ra color9 border_ccc"
                                                                                >退款失败</button>
                                                                            </div>
                                                                            :null
                                        }
                                    </div>
                                </div>
                                <SplitLine />
                            </div>
                        )
                    })
                }
                {/*取消订单*/}
                {
                    this.state.isCancel?
                        <Modal
                            title = {'确定取消订单?'}
                            scrollTop = {scrollTop}
                            onClick = {()=>this.cancelOrder(this.state.orderNo)}
                            toHideModal={()=>this.setState({isCancel:false})}
                        />
                        :null
                }
                {/*删除订单*/}
                {
                    this.state.isDelete?
                        <Modal
                            title = {'确定删除订单?'}
                            scrollTop = {scrollTop}
                            onClick = {()=>this.DeletdOrder(this.state.delNo)}
                            toHideModal={()=>this.setState({isDelete:false})}
                        />
                        :null
                }
            </div>
        );
    }
}
