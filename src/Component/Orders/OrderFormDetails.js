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
            orderFormdDetails:[],
            timer:'',
            address:'',
            mobile:'',
            name:'',
            detail:''
            //confirmItem:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

     componentWillMount(){
        let orderNo = this.props.location.query.orderId
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
                    this.setState({orderFormdDetails:res})
                    this.setState({timer:res.plan_receive_time})
                    this.setState({address:res.address})
                    this.setState({detail:res.address_detail})
                    this.setState({mobile:res.mobile})
                    this.setState({name:res.name})

                    //地址从sessionStorage里面去拿
                    if(this.props.location.query.isOrder){
                        this.setState({address:sessionStorage.getItem('getOrderAddress')?sessionStorage.getItem('getOrderAddress'):''})
                        this.setState({datail:sessionStorage.getItem('getOrderDetail')?sessionStorage.getItem('getOrderDetail'):''})
                        this.setState({name:sessionStorage.getItem('getOrderName')?sessionStorage.getItem('getOrderName'):''})
                        this.setState({mobile:sessionStorage.getItem('getOrderMobile')?sessionStorage.getItem('getOrderMobile'):''})
                        sessionStorage.removeItem("getOrderAddress")
                        sessionStorage.removeItem("getOrderDetail")
                        sessionStorage.removeItem("getOrderName")
                        sessionStorage.removeItem("getOrderMobile")
                    }

                    if(this.props.location.query.isOrderTime){
                        //时间从sessionStorage里面去拿
                        this.setState({timer:sessionStorage.getItem('orderTime')})
                        sessionStorage.removeItem("getOrderMobile")
                    }

                })
                .catch(err=>{
                    console.warn('err',err)
                })
    }
    //确认收货
    async getConfirmReceive(param){
        await ConfirmReceived(param)
            .then(res=>{
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('收获失败',err)
            })
    }

    //支付
    toPay(){
        if(!this.state.address){
            alert('请选择地址')
            return
        }
        this.context.router.push({pathname:'/confirmPayment/choosePayment',
            query:{
                orderNos:this.props.location.query.orderId,
                payMuchMoney:this.state.orderFormdDetails.amount,
                planReceiveTime:this.state.timer
            }});
    }

    render() {
        const {orderFormdDetails,timer,address,detail,mobile,name} = this.state
        return (
            <div className="containerNav">
                <Link
                    to={this.props.location.query.index == 0?'/chooseInfomation':null}
                    query = {{
                    orderPath:true,
                    orderId:this.props.location.query.orderId,
                    index:this.props.location.query.index,
                    isToPay:this.props.location.query.isToPay
                    }}
                >
                    <div className="flex flex1 flex-pack-justify flex-align-center border_bottom" style={{padding:'5px 10px'}}>
                        <div className="flex flex1 flex-align-center">
                            <span className="fl di positionImg" style={{lineHeight:0,marginRight:15}}>
                                <img src={require('../../Images/location.png')} alt=""/>
                            </span>
                            {
                                address == null || address == ''?
                                    <div style={{height:35}}>
                                        <span className="color6 font14">完善收货地址</span>
                                    </div>
                                    :
                                <div className="flex1 mtlr">
                                    <div className="flex flex-pack-justify font14 color6">
                                        <div><span>收货人:</span><span>{name}</span></div>
                                        <span className="di fr color6">{mobile}</span>
                                    </div>
                                    <p className="f12 color9 mt3">收货地址:<span>{(address?address:'')+(detail?detail:'')}</span></p>
                                </div>
                            }
                        </div>
                        <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:10}}>
                            <img src={require('../../Images/rightArrow.png')} alt=""/>
                        </span>
                    </div>
                </Link>
                <Link
                    to="/receivingTime"
                    query={{
                    orderId:this.props.location.query.orderId,
                    orderPayMoney:true,
                    index:this.props.location.query.index,
                    isToPay:this.props.location.query.isToPay
                    }}
                >
                    <div className="flex flex-pack-justify flex-align-center border_bottom" style={{height:50,padding:'5px 10px'}}>
                        <div className="flex flex-align-center">
                            <span className="di mr6 timeImg" style={{lineHeight:0}}><img src={require('../../Images/time.png')} alt=""/></span>
                            {
                                timer ==''||timer ==undefined ?
                                    <span className="color6 font14">送货时间不限</span>
                                    :
                                    <span className="color6 font14">{this.state.timer}</span>
                            }
                        </div>
                       <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:10}}>
                            <img src={require('../../Images/rightArrow.png')} alt=""/>
                        </span>
                    </div>
                </Link>
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
                                    <Link to="/orders/applicationForAfterSales" query={{orderNo:el.id}}>
                                        {
                                            this.props.location.query.index != 0?
                                                <button className="plr border_ra color9 font14 border_all mt45">申请售后</button>
                                                :null
                                        }

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
                             <span>{orderFormdDetails.amount}</span>
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
                            <span>{this.props.location.query.orderId}</span>
                        </div>
                    </div>
                    <div>
                        <span>创建时间</span>
                        <div className="fr">
                            <span>{orderFormdDetails.create_time}</span>
                        </div>
                    </div>
                    <div>
                        <span>付款时间</span>
                        <div className="fr">
                            <span>{orderFormdDetails.pay_time?orderFormdDetails.pay_time:'未付款'}</span>
                        </div>
                    </div>
                    <div>
                        <span>发货状态</span>
                        <div className="fr">
                            <span>{this.props.location.query.index==1?'未发货':orderFormdDetails.delivery_time?orderFormdDetails.delivery_time:'未发货'}</span>
                        </div>
                    </div>
                </div>
                {
                    this.props.location.query.isToPay?
                        <div className="fr font14 plAll">
                            <button
                                className="bkg_ff border_ra color_white"
                                style={{padding:'5px 10px'}}
                                onClick = {()=>this.toPay()}
                            >支付</button>
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
