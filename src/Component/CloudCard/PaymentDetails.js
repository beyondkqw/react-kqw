import React, { Component } from 'react';
import DetailsRow from '../../Component/CloudCard/DetailsRow'
import '../../Stylesheets/App/cloudCard.css';

const ItemList = [
    {title:'变后金额',intruduction:'￥5688'},
    {title:'相关订单',intruduction:'rechasdhjoaijd'},
    {title:'说明',intruduction:'微信充值20'},
    {title:'相关时间',intruduction:'2016-12-25'}
]
export default class PaymentDetails extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom bkg_fadeff">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">变更金额</div>
                                <div className="item-after color_yellow"><span>￥</span><span>200</span></div>
                            </div>
                        </li>
                        {
                            ItemList.map((el,index)=>{
                                return(
                                    <DetailsRow
                                        title={el.title}
                                        intruduction={el.intruduction}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="font16 height3 width_100 plAll mt25">
                    <div className="di height_all pr fl width_cart">
                        <button className="cartBtn width_100 height_all border_ra color_yellow">
                            取消付款
                        </button>
                    </div>
                    <div className="width_de fl height_all"></div>
                    <div className="di height_all pr fl width_buy border_ra">
                        <button className="width_100 height_all color_white">
                           立即购买
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
