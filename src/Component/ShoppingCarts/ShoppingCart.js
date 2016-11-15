import React, { Component } from 'react';
import {Link} from 'react-router';
import Footer from '../../Component/NewComponent/Footer';
import ItemDetails from '../../Component/ShoppingCarts/ItemDetails';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import '../../Stylesheets/App/shoppingCarts.css';

const ItemDetail = [
    {title:'拼接雪纺连衣裙小清收到回复奇偶is飞机哦添加',price:288,color:'红色',size:'36',imgUrl:require('../../Images/storeClothes.png')},
    {title:'拼接驾驶的海外时间',price:289,color:'绿色色',size:'38',imgUrl:require('../../Images/storeShoes.png')}]
export default class ShoppingCart extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="pr personStore plr bk_fff5f0">
                    <span className="di check_radius pr fl">
                        <input type="checkbox" id="isLink"  className="di isCheck" />
                        <label htmlFor="isLink"></label>
                    </span>
                    <span className="di font14 color6 ml5 fl">乐乐的小店</span>
                    <div className="rightArrow pa"><img src={require('../../Images/rightArrow.png')} alt=""/></div>
                </div>
                {
                    ItemDetail.map((el,index)=>{
                            return (
                                <div className="plAll proPlay border_bottom">
                                <CheckBox
                                    index = {index}
                                />
                                <ItemDetails
                                    title = {el.title}
                                    color = {el.color}
                                    size = {el.size}
                                    imgurl = {el.imgUrl}
                                />
                                </div>
                            )
                    })
               }
                <div className="height5 width_100"></div>
                <div className="pf bottomCount width_100 plr">
                    <span className="di check_radius pr fl">
                        <input type="checkbox" id="checkAll"  className="di isCheck"/>
                        <label htmlFor="checkAll"></label>
                    </span>
                    <span className="di font14 color6 ml5 fl height_all lh25">全选</span>
                    <div className="di ml5 pr">
                        <div className="mt2">
                            <label className="f12">合计</label>
                            <span className="colorff f12">￥</span><span className="colorff font18">258</span>
                        </div>
                        <span className="di pa f10">不含运费</span>
                    </div>
                    <Link to="/comfirmPayMoney">
                        <button className="fr settleAccount border_ra color_white">结算</button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
}
