import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {CancelReceived,OrderDel,GetOrderList,ConfirmReceived} from '../../Action/auth';
import {config} from '../../Action/Const'

export default class SellerGoodDetails extends Component {

    render() {
        const {toPay,deliverGoods,Refund,alreadyRated,evaluationManagement,isShowWhat} = this.props
        return (
            <div className="pr">
                <div className="flex1">
                    <Link to="/orders/orderFormDetails">
                        <div>
                            {
                                isShowWhat?
                                    <div className="order_height border_bottom pr plAll df">
                                        <div className="order_img height_all">
                                            <img src={require('../../Images/clothes1.png')} alt=""/>
                                        </div>
                                        <div className="flex1 order_margin">
                                            <p className="oh color6 orderShow font14  db">谁都会发生电话费收到过的速度和</p>
                                            <p className="color9 f12 delete oh_height mt3">
                                                <span>颜色:红色</span>
                                            </p>
                                            <p className="color9 f12 delete oh_height mt1">
                                                货号 : <span>M-165486</span>
                                            </p>
                                            {
                                                alreadyRated?
                                                    <p className="color9 f12 delete oh_height mt1">
                                                        买家昵称 : <span>呦呦切克闹</span>
                                                    </p>
                                                    :null
                                            }
                                        </div>
                                        <div className="pa order_price tr">
                                            <p className="color_yellow">
                                                <span className="f12">￥</span>
                                                <span className="f15">123</span>
                                            </p>
                                            <p className="color9 font14"><span>X</span><span>1</span></p>
                                        </div>
                                    </div>
                                    :
                                    <StoreRow
                                        title = {'呦呦切克闹'}
                                        price = {'234'}
                                        imgurl = {require('../../Images/clothes1.png')}
                                        assess = {true}
                                    />
                            }

                        </div>
                    </Link>
                    <div className="order_pay">
                        {
                            isShowWhat?
                                <div className="f12 width100 height1">
                                    <div className="fr">
                                        <label>共<span>3</span>件商品</label>
                                        <label className="ml5">合计<span>￥</span><span>255</span></label>
                                        <label className="ml">(含运费 : ￥<span>0.00</span>)</label>
                                    </div>
                                </div>
                                :null
                        }
                        <div className="ispayOrCancle font14">
                            {
                                toPay?
                                    <Link to="/sellerErWeiCode">
                                        <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                            <button
                                                className="bkg_ff border_ra color_white"
                                            >支付二维码</button>
                                        </div>
                                    </Link>
                                    :null
                            }
                            {
                                deliverGoods?
                                    <Link to="/toShip">
                                        <div className="mt5" style={{height: 30,textAlign:'right'}}>
                                            <button
                                                className="bkg_ff border_ra color_white"
                                            >去发货</button>
                                        </div>
                                    </Link>
                                    :null
                            }
                            {/*退款*/}
                            {
                                Refund?
                                    <div
                                        className="mt5" style={{height: 30,textAlign:'right'}}
                                    >
                                        <Link to="/toFund">
                                            <button
                                                className="btn font14 bkg_ff border_ra color_white"
                                            >去退款</button>
                                        </Link>
                                    </div>
                                    :null
                            }
                        </div>
                    </div>
                    {
                        isShowWhat?
                            <SplitLine />
                            :null
                    }
                    {
                        alreadyRated?
                            <Link to="/searchOrder">
                                <div
                                    className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                                    style={{height:50,backgroundColor:'#ff5500'}}>
                                    搜索订单
                                </div>
                            </Link>
                            :null
                    }
                </div>
            </div>
        );
    }
}
