import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Modal from '../../Component/CommonComponent/Modal'
import {CancelReceived,OrderDel,GetOrderList} from '../../Action/auth';
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
            this.setState({isCancel:false})
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
    render() {
        const {orderDetails,toPay,makeSure,toRated,alreadyRated,allRated,query} = this.props
        return (
            <div>
                {
                    orderDetails&&orderDetails.map((el,index)=>{
                        return(
                            <div>
                                <div className="paymargin">
                                    <div className="di payImgSize mr"><img src={el.img} alt=""/></div>
                                    <span className="color6 font14">{el.store_name}</span>
                                </div>
                                <Link to="/orders/orderFormDetails"  query={{orderNo:el.order_no}}>
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
                                            <label className="ml5">合计<span>￥</span><span>{el.pay_amount}</span></label>
                                            <label className="ml">(含运费 : ￥<span>0.00</span>)</label>
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
                                                            <button className="bkg_ff ml5 border_ra color_white">付款</button>
                                                    }
                                                </div>
                                                :null
                                        }
                                        {
                                            makeSure?
                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <button className="border_ra mr5 color9 border_ccc">查看物流</button>
                                                    <button className="bkg_ff border_ra color_white">确定收货</button>
                                                </div>
                                                :null
                                        }

                                        {
                                            alreadyRated?
                                                <div className="mt55" style={{height: 30,textAlign:'right'}}>
                                                    <Link to="orderList/viewEvaluation">
                                                        <button className="bkg_ff border_ra color_white">查看</button>
                                                    </Link>
                                                </div>
                                                :null
                                        }
                                        {
                                            allRated?
                                                <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                                    <button
                                                        className="border_ra mr5 color9 border_ccc"
                                                        onClick={()=>this.setState({isDelete:true,delNo:el.order_no})}
                                                    >删除订单</button>
                                                    <button className="border_ra mr5 color9 border_ccc">追加评价</button>
                                                    <button className="bkg_ff mr20 border_ra color_white">查看评价</button>
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
                            onClick = {()=>this.DeletdOrder(this.state.delNo)}
                            toHideModal={()=>this.setState({isDelete:false})}
                        />
                        :null
                }
            </div>
        );
    }
}
