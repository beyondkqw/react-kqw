import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'

export default class OrderDetails extends Component {
    render() {
        const {toPay,makeSure,toRated,alreadyRated,allRated} = this.props
        return (
            <div>
                <Link to="/orders/orderFormDetails">
                    <div className="order_height border_bottom pr plAll df">
                        <div className="order_img height_all">
                            <img src={require('../../Images/storeClothes.png')} alt=""/>
                        </div>
                        <div className="color6 flex1 font14 order_margin">
                            <p className="oh orderShow db">李宁赤兔哈空间是的哈U盾手癌花时间都好似按对方</p>
                            <p className="color6 oh_height mt5">
                                <span>颜色 :</span><span>红色</span>
                                <span className="di ml">鞋码 :</span><span>36</span>
                            </p>
                        </div>
                        <div className="pa order_price tr">
                            <p className="color_yellow"><span className="f12">￥</span><span className="f15">258</span></p>
                            <p className="color9 font14"><span>X</span><span>1</span></p>
                        </div>
                    </div>
                </Link>
                <div className="order_pay">
                    <div className="f12 width100 height1">
                        <div className="fr">
                            <label>共<span>1</span>件商品</label>
                            <label className="ml5">合计<span>￥</span><span>258</span></label>
                            <label className="ml">(含运费 : ￥<span>0.00</span>)</label>
                        </div>
                    </div>
                    <div className="ispayOrCancle font14">
                        {
                            toPay?
                                <div className="fr mt5">
                                    <button className="border_ra mr20 color9 border_ccc">取消订单</button>
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
        );
    }
}
