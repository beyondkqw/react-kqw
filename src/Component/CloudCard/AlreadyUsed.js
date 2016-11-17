import React, { Component } from 'react';
import {Link} from 'react-router';
import CloundRow from '../../Component/CloudCard/CloundRow'
import '../../Stylesheets/App/cloudCard.css';

const ItemDetail = [
    {title:'微信充值',price:'+200',date:'2016-11-13'},
    {title:'在线支付',price:'-300',date:'2016-11-14'},
    {title:'微信充值',price:'+400',date:'2016-11-15'},
    {title:'微信充值',price:'+500',date:'2016-11-16'}]

export default class AlreadyUsed extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                {
                    ItemDetail.map((el,index)=>{
                        return(
                            <Link to="/alreadyUsedDetails">
                                <CloundRow
                                    title={el.title}
                                    price={el.price}
                                    date={el.date}
                                />
                            </Link>
                        )
                    })
                }

            </div>
        );
    }
}
