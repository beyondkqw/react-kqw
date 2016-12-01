import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {CancelReceived} from '../../Action/auth';

export default class OrderDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //cancelItem:''
        };
      }
    cancelOrder(orderNo){
        this.getCancelOrder(orderNo)
    }
    //取消订单
    async getCancelOrder(param){
        await CancelReceived(param)
        .then(res=>{
            //this.setState({cancelItem:res})
        })
        .catch(err=>{
            console.warn('取消订单失败',err)
        })
    }

    render() {
        const {orderDetails,toPay,makeSure,toRated,alreadyRated,allRated} = this.props
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
                                    el.orderDetails&&el.orderDetails.map(item=>{
                                    return(
                                        <div>
                                            <div className="order_height border_bottom pr plAll df">
                                                <div className="order_img height_all">
                                                    <img src={item.productImage} alt=""/>
                                                </div>
                                                <div className="color6 flex1 font14 order_margin">
                                                    <p className="oh orderShow db">{item.productName}</p>
                                                    <p className="color6 oh_height mt5">
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
                                                <div className="fr mt5">
                                                    <button
                                                        className="border_ra mr20 color9 border_ccc"
                                                        onClick = {()=>this.cancelOrder(el.order_no)}
                                                    >取消订单</button>
                                                    <button className="bkg_ff mr20 border_ra color_white">付款</button>
                                                </div>
                                                :null
                                        }
                                        {
                                            makeSure?
                                                <div className="fr mt5">
                                                    <button className="border_ra mr20 color9 border_ccc">查看物流</button>
                                                    <button className="bkg_ff mr20 border_ra color_white">确定收货</button>
                                                </div>
                                                :null
                                        }
                                        {
                                            toRated?
                                                <div className="fr mt55">
                                                    <Link to="orderList/publishEvalute">
                                                        <button className="bkg_ff mr20 border_ra color_white">评价</button>
                                                    </Link>
                                                </div>
                                                :null
                                        }
                                        {
                                            alreadyRated?
                                                <div className="fr mt55">
                                                    <Link to="orderList/viewEvaluation">
                                                        <button className="bkg_ff mr20 border_ra color_white">查看</button>
                                                    </Link>
                                                </div>
                                                :null
                                        }
                                        {
                                            allRated?
                                                <div className="fr mt5">
                                                    <button className="border_ra mr20 color9 border_ccc">删除订单</button>
                                                    <button className="border_ra mr20 color9 border_ccc">追加评价</button>
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
            </div>
        );
    }
}
