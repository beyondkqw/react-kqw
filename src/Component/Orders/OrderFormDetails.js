import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {OrderDetail,ConfirmReceived} from '../../Action/auth';

const orderList = [
    {title:'商品总价',price:'189.00',style:'f12',color:'color9'},
    {title:'运费(快递)',price:'0.00',style:'f12',color:'color9'},
    {title:'积分抵扣',price:'0.00',style:'f12',color:'color9'},
    {title:'订单总价',price:'0.00',style:'font14',color:'color6'}
]
const orderDetails = [
    {title:'订单编号',detail:'65874'},
    {title:'聚朵云交易号',detail:'748'},
    {title:'创建时间',detail:'2016-5-45 12:45:45'},
    {title:'付款时间',detail:'2016-5-45 12:45:45'},
    {title:'发货时间',detail:'2016-5-45 12:45:45'}
];
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
                //this.setState({confirmItem:res})
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
                    <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                    <div className="flex1 mtlr">
                        <p className="font14 color6">[深圳市]快件已签收,感谢您使用中通快递!开始大幅而非哈斯U盾哈苏电话</p>
                        <p className="f12 color9 mt3"><span>2016-11-21</span><span className="di ml">13:46:05</span></p>
                    </div>
                    <div className="rightPoint pr"><img className="pa" src={require("../../Images/rightPoint.png")} alt=""/></div>
                </div>
                <div className="df plAll">
                    <div className="leftPoint pr"><img className="pa" src={require("../../Images/location.png")} alt=""/></div>
                    <div className="flex1 mtlr">
                        <div className="font14 color6">
                            <span>收货人:</span><span>{orderFormdDetails.name}</span>
                            <span className="di fr color6">{orderFormdDetails.mobile}</span>
                        </div>
                        <p className="f12 color9 mt3">收货地址:<span>广东深空间按调集的ASk就待见的几点开始设法会死人世纪东方</span></p>
                    </div>
                </div>
                <SplitLine />
                <div className="paymargin">
                    <div className="di payImgSize mr"><img src={require('../../Images/store.png')} alt=""/></div>
                    <span className="color6 font14">{orderFormdDetails.store_name}</span>
                </div>
                <div className="pr plAll df border_bottom">
                    <div className="order_img height_all">
                        <img src={require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="color6 flex1 font14 order_margin">
                        <p className="oh orderShow db">李宁赤兔哈空间是的哈U盾手癌花时间都好似按对方</p>
                    </div>
                    <div className="pa order_price tr">
                        <p className=""><span className="f12">￥</span><span className="f15">258</span></p>
                        <p className="td_lt color9"><span className="f12">￥</span><span className="f15">258</span></p>
                        <p className="color9 font14"><span>X</span><span>1</span></p>
                        <button className="plr border_ra color9 font14 border_all mt45">申请售后</button>
                    </div>
                </div>
                <div className="plAll border_bottom">
                    {
                        orderList.map(el=>{
                            return(
                            <div className={el.style}>
                                <span className={el.color}>{el.title}</span>
                                <div className="fr color9">
                                    <span>￥</span>
                                    <span>{el.price}</span>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className="plAll border_bottom font14">
                    <div>
                        <span className="color6">实付款</span>
                        <div className="fr color_yellow">
                            <span>￥</span>
                            <span>236</span>
                        </div>
                    </div>
                </div>
                <SplitLine />
                <div className="plAll border_bottom f12 color9">
                    {
                        orderDetails.map(el=>{
                            return(
                                <div>
                                    <span>{el.title}</span>
                                    <div className="fr">
                                        <span>{el.detail}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="fr font14 plAll">
                    <button
                        className="bkg_ff border_ra color_white pl3"
                        onClick = {()=>this.confirmClick()}
                    >确认收货</button>
                </div>
            </div>
        );
    }
}
