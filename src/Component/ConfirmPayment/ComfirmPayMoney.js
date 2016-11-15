import React, { Component } from 'react';
import {Link} from 'react-router';
import ItemDetails from '../../Component/ShoppingCarts/ItemDetails';
import '../../Stylesheets/App/comfirmPayMoney.css';
const ItemDetail = [
    {title:'拼接雪纺连衣裙小清收到回复奇偶is飞机哦添加',price:288,color:'红色',size:'36',imgUrl:require('../../Images/storeClothes.png')},
    {title:'拼接驾驶的海外时间',price:289,color:'绿色色',size:'38',imgUrl:require('../../Images/storeShoes.png')}]
export default class ComfirmPayMoney extends Component {
    render() {
        return (
            <div>
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
                <div className="paymargin">
                    <div className="di payImgSize mr"><img src={require('../../Images/store.png')} alt=""/></div>
                    <span className="color6 font14">乐乐的小店</span>
                </div>
                {
                    ItemDetail.map((el,index)=>{
                        return (
                            <div className="plAll proPlay border_bottom">
                                <ItemDetails
                                    title={el.title}
                                    color={el.color}
                                    size={el.size}
                                    imgurl={el.imgUrl}
                                />
                            </div>
                        )
                    })
                }
                <div className="pl lh25 border_bottom">
                    <span className="color6 font14">邮费 :</span><label htmlFor="" className="colorff font18"><span>￥</span><span>8</span></label>
                </div>
                <div className="pl lh25 border_bottom">
                    <span className="color6 font14">备注信息 :</span>
                    <input type="text" name="" className="color9 font14 borderno" placeholder="建议填写和商家达成一致意见"/>
                </div>
                <div className="line"></div>
                <div className="lh25 border_bottom">
                    <div className="fr pr_right">
                        <label htmlFor="" className="f12">共<span>2</span>件商品</label>
                        <label htmlFor="" className="f12 ml5">合计<span className="colorff">￥</span><span className="f15 colorff">1258</span></label>
                    </div>
                </div>
                <div className="color9 font14 payAccount tc width_100 border_bottom">
                    <div className="flex1">
                        <span className="di payImgSize"><img src={require('../../Images/weixinpay.png')} alt=""/></span>
                        <p>云卡通支付</p>
                    </div>
                    <div className="flex1">
                        <span className="di payImgSize"><img src={require('../../Images/weixinpay.png')} alt=""/></span>
                        <p>微信支付</p>
                    </div>
                    <div className="flex1">
                        <span className="di payImgSize"><img src={require('../../Images/weixinpay.png')} alt=""/></span>
                        <p>余额支付</p>
                    </div>
                </div>
                <div className="lh25 plr">
                    <div className="fl">
                        <span className="font14">付款 :</span>
                        <span className="colorff">￥</span>
                        <span className="colorff f15">1258</span>
                    </div>
                    <div className="fr">
                        <button className="settleAccount border_ra color_white">支付</button>
                    </div>
                </div>
            </div>
        );
    }
}
