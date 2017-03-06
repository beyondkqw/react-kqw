import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class StoreDetails extends Component {
    render() {
        const {title,price,imgurl,float,sales} = this.props
        return (
            <div className="storeLeftImg di" style={{float:float}}>
                <div className="storePlayImg">
                    <img src={imgurl} alt=""/>
                </div>
                <div className="plAll">
                    <p className="color9 f12 storeImgPlay">{title}</p>
                    <div className="flex flex-pack-justify flex-align-center">
                        <div><span className="colorff f12">￥</span><span className="colorff font18">{price}</span></div>
                        <div className="color9 f12">售出<span>{sales?sales:0}</span>份</div>
                    </div>
                </div>
            </div>
        );
    }
}
