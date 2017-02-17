import React, { Component } from 'react';
import ChangeNum from '../../Component/ShoppingCarts/ChangeNum';
import '../../Stylesheets/App/shoppingCarts.css';

export default class ItemDetails extends Component {
    render() {
        const {title,attr,price,imgurl,num,del,changeNum} = this.props
        return (
            <div className="f12 height_all">
                <div className="di imgPlay fl mr5">
                    <img src={imgurl} alt=""/>
                </div>
                <div>
                    <span className="productShow db">{title}</span>
                    <span className="color9">{attr}</span>
                </div>
                <div>
                    <span className="colorff f12">￥</span><span className="colorff font18">{price}</span>
                </div>
                <ChangeNum
                    minus = {(value,type)=>changeNum(value,type)}
                    del = {value=>del(value)}
                    num = {num}
                />
            </div>
        );
    }
}
