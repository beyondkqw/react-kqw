import React, { Component } from 'react';
import DetailsRow from '../../Component/CloudCard/DetailsRow'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
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
                <CommonBtn
                    title = {'确定'}
                />
            </div>
        );
    }
}
