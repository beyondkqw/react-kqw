import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {OrderDetail,ConfirmReceived} from '../../Action/auth';
import {config} from '../../Action/Const'
import NavBar from '../../Component/CommonComponent/NavBar'


export default class SellerOrderDetails extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            orderNo:'',
            sellerOrderDetails:[]
            //confirmItem:[]
        };
    }

    componentWillMount(){
        let orderNo = this.props.location.query.orderNo
        this.setState({orderNo:orderNo})
        this.getOrderDetail(orderNo);
    }

    confirmClick(){
        let orderNum = this.state.orderNo
        this.getConfirmReceive(orderNum)
    }

    //订单详情
    async getOrderDetail(param){
        await OrderDetail(param)
            .then(res=>{
                console.log('res',res)
                this.setState({sellerOrderDetails:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    changeStatus(status){
            switch(status) {
                //申请中
                case 0 :return "申请中";break;
                //处理中
                case 1 :return "处理中";break;
                //退款成功
                case 2 :return "退款成功";break;
                //退款失败
                case 3 :return "退款失败";break;
                default:return '';break;
            }
            return "";

        }

    render() {
        const {sellerOrderDetails} = this.state
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'订单详情'}
                />
                <div className="df plAll">
                    <div className="pr" style={{width:14,height:14,margin:'auto'}}><img className="pa" src={require("../../Images/time.png")} alt=""/></div>
                    <div className="flex1 mtlr">
                        <div className="font14 color6">
                            <span>收货人:</span><span>{sellerOrderDetails.name?sellerOrderDetails.name:'暂未填写'}</span>
                            <span className="di fr color6">{sellerOrderDetails.mobile}</span>
                        </div>
                        <p className="f12 color9 mt3">收货地址:<span>{(sellerOrderDetails.address?sellerOrderDetails.address:'暂未填写')+(sellerOrderDetails.address_detail?sellerOrderDetails.address_detail:'')}</span></p>
                    </div>
                </div>
                <SplitLine />
                {
                    sellerOrderDetails.orderDetails&&sellerOrderDetails.orderDetails.map(el=>{
                        return(
                            <div className="pr plAll df border_bottom">
                                <div className="order_img">
                                    <img src={el.productImage} alt=""/>
                                </div>
                                <div className="color6 flex1 font14 order_margin">
                                    <p className="oh orderShow db">{el.productName}</p>
                                    <p className="db f12 color9 mt">{el.attrDesc}</p>
                                    {/*<p className="db f12 color9 mt">货号 : {el.orderNo}</p>*/}
                                </div>
                                <div className="pa order_price tr">
                                    <p className=""><span className="f12">￥</span><span className="f15">{el.price}</span></p>
                                    <p className="color9 font14"><span>X</span><span>{el.num}</span></p>
                                    {/*退款中  退款成功*/}
                                    {
                                        this.props.location.query.toApply && el.refundStatus !== null?
                                            <button className="plr border_ra color9 font14 border_all mt45">
                                                {
                                                    this.changeStatus(el.refundStatus)
                                                }
                                            </button>
                                            :
                                            null
                                    }
                                </div>

                            </div>
                        )
                    })
                }

                <div className="plAll border_bottom">
                    {/*<div className='f12'>
                        <span className='color9'>商品总价</span>
                        <div className="fr color9">
                            <span>￥</span>
                            <span>189</span>
                        </div>
                    </div>*/}
                    <div className='f12'>
                        <span className='color9'>运费(快递)</span>
                        <div className="fr color9">
                            <span>￥</span>
                            <span>{parseFloat(sellerOrderDetails.postage).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='f12'>
                        <span className='color9'>订单总价</span>
                        <div className="fr color9">
                            <span>￥</span>
                            <span>{sellerOrderDetails.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="plAll border_bottom font14">
                    <div>
                        <span className="color6">实付款</span>
                        <div className="fr color_yellow">
                            <span>￥</span>
                            <span>{sellerOrderDetails.amount}</span>
                        </div>
                    </div>
                </div>
                <SplitLine />
                <div className="plAll border_bottom f12 color9">
                    <div>
                        <span>订单编号</span>
                        <div className="fr">
                            <span>{this.props.location.query.orderNo}</span>
                        </div>
                    </div>
                    {/*<div>
                        <span>聚朵云交易号</span>
                        <div className="fr">
                            <span>c5546</span>
                        </div>
                    </div>*/}
                    <div>
                        <span>创建时时间</span>
                        <div className="fr">
                            <span>{sellerOrderDetails.create_time}</span>
                        </div>
                    </div>
                    <div>
                        <span>付款时间</span>
                        <div className="fr">
                            <span>{sellerOrderDetails.pay_time}</span>
                        </div>
                    </div>
                    <div>
                        <span>发货时间</span>
                        <div className="fr">
                            <span>{sellerOrderDetails.delivery_time}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
