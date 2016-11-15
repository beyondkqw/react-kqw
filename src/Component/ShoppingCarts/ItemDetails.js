import React, { Component } from 'react';
import ChangeNum from '../../Component/ShoppingCarts/ChangeNum';
import '../../Stylesheets/App/shoppingCarts.css';

export default class ItemDetails extends Component {
    render() {
        const {title,color,size,imgurl} = this.props
        return (
            <div className="f12 height_all">
                <div className="di imgPlay fl mr5">
                    <img src={imgurl} alt=""/>
                </div>
                <div>
                    <span className="productShow db">{title}</span>
                    <span>颜色:</span><span>{color}</span>
                    <span className="di ml5">鞋码:</span><span>{size}</span>
                </div>
                <div>
                    <span className="colorff f12">￥</span><span className="colorff font18">258</span>
                </div>
                <ChangeNum />
            </div>
        );
    }
}
