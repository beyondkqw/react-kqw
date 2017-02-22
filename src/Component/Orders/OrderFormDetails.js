import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {OrderDetail,ConfirmReceived} from '../../Action/auth';

export default class OrderFormDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderNo:'',
            orderFormdDetails:[]
            //confirmItem:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
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
                    this.setState({orderFormdDetails:res})
                })
                .catch(err=>{
                    console.warn('err',err)
                })
    }
    //确认收货
    async getConfirmReceive(param){
        await ConfirmReceived(param)
            .then(res=>{
                //this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('收获失败',err)
            })
    }

    render() {
        const {orderFormdDetails} = this.state
        return (
            <div className="containerNav">
                <div className="df plAll border_bottom">
                    <div className="pr" style={{width:14,height:14,margin:'auto'}}>
                        <img className="pa" src={require("../../Images/time.png")} alt=""/>
                    </div>
                    <div className="flex1 mtlr">
                        <div className="font14 color6">
                            <span>收货人:</span><span>{orderFormdDetails.name}</span>
                            <span className="di fr color6">{orderFormdDetails.mobile}</span>
                        </div>
                        <p className="f12 color9 mt3">收货地址:<span>{orderFormdDetails.address+orderFormdDetails.address_detail}</span></p>
                    </div>
                </div>
                {/*<div className="df plAll">
                    <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                    <div className="flex1 mtlr">
                        <p className="font14 color6">[深圳市]快件已签收,感谢您使用中通快递!开始大幅而非哈斯U盾哈苏电话</p>
                        <p className="f12 color9 mt3"><span>{orderFormdDetails.real_receive_time}</span></p>
                    </div>
                    <div className="rightPoint pr"><img className="pa" src={require("../../Images/rightPoint.png")} alt=""/></div>
                </div>*/}

                <SplitLine />
                <div className="paymargin">
                    <div className="di payImgSize mr"><img src={orderFormdDetails.img} alt=""/></div>
                    <span className="color6 font14">{orderFormdDetails.store_name}</span>
                </div>
                {
                    orderFormdDetails.orderDetails&&orderFormdDetails.orderDetails.map(el=>{
                        return(
                            <div className="pr plAll df border_bottom">
                                <div className="order_img">
                                    <img src={el.productImage} alt=""/>
                                </div>
                                <div className="color6 flex1 font14 order_margin">
                                    <p className="oh orderShow db">{el.productName}</p>
                                </div>
                                <div className="pa order_price tr">
                                    <p className=""><span className="f12">￥</span><span className="f15">{el.price}</span></p>
                                    <p className="td_lt color9"><span className="f12">￥</span><span className="f15">258</span></p>
                                    <p className="color9 font14"><span>X</span><span>{el.num}</span></p>
                                    <Link to="/orders/applicationForAfterSales" query={{orderNo:el.orderNo}}>
                                        {/*退款中  退款成功*/}
                                        <button className="plr border_ra color9 font14 border_all mt45">申请售后</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="plAll border_bottom">
                    <div className='f12'>
                         <span className='color9'>商品总价</span>
                         <div className="fr color9">
                             <span>￥</span>
                             <span>189</span>
                         </div>
                     </div>
                    <div className='f12'>
                        <span className='color9'>运费(快递)</span>
                        <div className="fr color9">
                            <span>￥</span>
                            <span>{orderFormdDetails.postage}</span>
                        </div>
                    </div>
                    <div className='f12'>
                        <span className='color9'>订单总价</span>
                        <div className="fr color9">
                            <span>￥</span>
                            <span>{orderFormdDetails.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="plAll border_bottom font14">
                    <div>
                        <span className="color6">实付款</span>
                        <div className="fr color_yellow">
                            <span>￥</span>
                            <span>{orderFormdDetails.amount}</span>
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
                    <div>
                        <span>创建时时间</span>
                        <div className="fr">
                            <span>{orderFormdDetails.create_time}</span>
                        </div>
                    </div>
                    <div>
                        <span>付款时间</span>
                        <div className="fr">
                            <span>{orderFormdDetails.pay_time}</span>
                        </div>
                    </div>
                    <div>
                        <span>发货时间</span>
                        <div className="fr">
                            <span>{orderFormdDetails.delivery_time}</span>
                        </div>
                    </div>
                </div>
                {
                    this.props.location.query.isToPay?
                        <div className="fr font14 plAll">
                            <Link to="/comfirmPayMoney" query={{orderId:this.props.location.query.orderNo}}>
                                <button
                                    className="bkg_ff border_ra color_white pl3"
                                    onClick = {()=>this.confirmClick()}
                                >支付</button>
                            </Link>
                        </div>
                        :null
                }
                {
                    this.props.location.query.isMakeSure?
                        <div className="fr font14 plAll">
                            <button
                                className="bkg_ff border_ra color_white pl3"
                                onClick = {()=>this.confirmClick()}
                            >确认收货</button>
                        </div>
                        :null
                }

            </div>
        );
    }
}
