import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import PaymoneyComponent from '../../Component/ConfirmPayment/PaymoneyComponent';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {ListByOrderNo} from '../../Action/auth'
const ItemDetail = [
    {title:'拼接雪纺连衣裙小清收到回复奇偶is飞机哦添加',num:1,price:288,color:'红色',size:'36',imgUrl:require('../../Images/storeClothes.png')},
    {title:'拼接驾驶的海外时间',num:2,price:289,color:'绿色',size:'38',imgUrl:require('../../Images/storeShoes.png')}]


export default class ComfirmPayMoney extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            PaymentDetails:[]
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getOrderInfor()
    }

   async getOrderInfor(){
        console.log('orderId',this.props.location.query.orderId)
        await ListByOrderNo(this.props.location.query.orderId)
        .then(res=>{
            console.log('订单资料',res)
            this.setState({PaymentDetails:res})
        })
        .catch(err=>{
            console.warn('getOrderInfor',err)
        })
    }

    render() {
        const {PaymentDetails} = this.state
        return (
            <div className="containerNav oa">
                <div className="list-block m0">
                    <ul>
                        <Link to="/deliveredInformation">
                            <li className="item-content item-link pl border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title">
                                        <span className="di mr9 positionImg"><img src={require('../../Images/location.png')} alt=""/></span>
                                        <span className="color6 font14">完善收货信息</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/receivingTime">
                            <li className="item-content item-link pl border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title">
                                        <span className="di mr6 timeImg"><img src={require('../../Images/time.png')} alt=""/></span>
                                        <span className="color6 font14">送货时间不限</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="line"></div>
                {
                    PaymentDetails.map(item=>{
                        return(
                            <div>
                                <Link to="/chooseInfomation">
                                    <div className="paymargin">
                                        <div className="di payImgSize mr"><img src={item.img} alt=""/></div>
                                        <span className="color6 font14">{item.store_name}</span>
                                    </div>
                                </Link>
                                {
                                    item.orderDetails.map((el,index)=>{
                                        return (
                                            <PaymoneyComponent
                                                title={el.productName}
                                                num={el.num}
                                                attr={el.attrDesc}
                                                imgurl={el.productImage}
                                                price={el.price}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }

                <SplitLine />
                <div className="plr lh25 border_bottom clearAll">
                    <span className="color6 font14">云卡通支付</span>
                    <label htmlFor="" className="colorff fr font14">可优惠<span className="f12">￥</span><span className="font14">10</span></label>
                </div>
                <div className="plr lh25 border_bottom clearAll">
                    <span className="color6 font14">商品金额</span>
                    <label htmlFor="" className="colorff fr"><span className="f12">￥</span><span className="font14">1235</span></label>
                </div>
                <div className="plr lh25 border_bottom clearAll">
                    <span className="color6 font14">运费</span>
                    <label htmlFor="" className="colorff fr"><span className="f12">￥</span><span className="font14">12</span></label>
                </div>
                <SplitLine />
                <section className="plr lh25">
                    <div className="fl color6 font14">可用<span>30</span>积分抵用<span>3.00</span>元</div>
                    <span className="di check_radius pr fr">
                        <input
                            type="checkbox" id="isChoose"
                            className="di toChoose"
                        />
                        <label htmlFor="isChoose"></label>
                    </span>
                </section>
                <div className="lh25 plr border_top">
                    <div className="fr">
                        <span className="font14">实付款 :</span>
                        <span className="colorff f12">￥</span>
                        <span className="colorff f15">1258</span>
                        <Link to="/confirmPayment/choosePayment">
                            <button className="settleAccount border_ra color_white margin15">支付</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
