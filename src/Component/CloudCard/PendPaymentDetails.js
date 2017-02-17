import React, { Component } from 'react';
import '../../Stylesheets/App/cloudCard.css';
import Modal from '../../Component/CommonComponent/Modal'
import {Link} from 'react-router';
import {CancelReceived} from '../../Action/auth';

export default class PaymentDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isCancel:false,
        };
      }

    //取消订单
    async cancelOrder(orderNo){
        console.log('orderNo========>',orderNo)
        await CancelReceived(orderNo)
            .then(res=>{
                this.setState({isCancel:false})
            })
            .catch(err=>{
                console.warn('取消订单失败',err)
            })
    }
    render() {
        const {showBar,showMsg,amount,msg,time,orderNo} = this.props.location.query
        return (
            <div className="containerNav bkg_color">
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">变更金额</div>
                                <div className={"item-after color_yellow"}><span>￥</span><span>{amount}</span></div>
                            </div>
                        </li>
                        {/*<li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">变后金额</div>
                                <div className="item-after color9"><span>￥</span><span>200</span></div>
                            </div>
                        </li>
                        */}
                        {
                            showBar?
                                <li className="item-content pl border_bottom">
                                    <div className="item-media"><i className="icon icon-f7"></i></div>
                                    <div className="item-inner font14">
                                        <div className="item-title color6">相关订单</div>
                                        <div className="item-after color9"><span>{orderNo}</span></div>
                                    </div>
                                </li>
                                :null

                        }
                        {
                            showMsg?
                                <li className="item-content pl border_bottom">
                                    <div className="item-media"><i className="icon icon-f7"></i></div>
                                    <div className="item-inner font14">
                                        <div className="item-title color6">说明</div>
                                        <div className="item-after color9"><span>{msg}</span></div>
                                    </div>
                                </li>
                                :null
                        }

                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">创建时间</div>
                                <div className="item-after color9"><span>{time}</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                {
                    showBar?
                        <div className="font16 height3 width_100 plAll mt25">
                            <div className="di height_all pr fl width_cart">
                                <button
                                    className="cartBtn width_100 height_all border_ra color_yellow"
                                    onClick = {()=>this.setState({isCancel:true})}
                                >
                                    取消付款
                                </button>
                            </div>
                            <div className="width_de fl height_all"></div>
                            <Link
                                to="/confirmPayment/choosePayment"
                                query={{
                                    planReceiveTime:'送货时间不限',
                                    orderNos:this.props.location.query.orderNo,
                                    payMuchMoney :amount
                                    }}>
                                <div className="di height_all pr fl width_buy border_ra">
                                    <button className="width_100 height_all color_white">
                                        立即购买
                                    </button>
                                </div>
                            </Link>
                        </div>
                        :null
                }
                {
                    this.state.isCancel?
                        <Modal
                            title = {'确定取消订单?'}
                            onClick = {()=>this.cancelOrder(this.props.location.query.orderNo)}
                            toHideModal={()=>this.setState({isCancel:false})}
                        />
                        :null
                }

            </div>
        );
    }
}
