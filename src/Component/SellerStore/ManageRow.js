/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import {Link} from 'react-router'

export default class ManageRow extends Component {
    render(){
        const {name,price,no,paymoneyNum,img} = this.props
        return(
            <div className="imgContainer width_100">
                <Link>
                    <div className="storeRowContainer">
                        <div style={{width:100,height:100}}>
                            <img src={img} />
                        </div>
                        <div className="rightMoudle border_bottom">
                            <div className="orderShow font14 color6 width100">
                                {name}
                            </div>
                            <div>
                                <div className="df flex-pack-justify" style={{height:18,marginBottom:8}}>
                                    <p>
                                        <span className="colorff f12">￥</span>
                                        <span className="colorff font18">{price}</span>
                                    </p>
                                </div>
                                <div>
                                    <div className="rightBottom" style={{color:'#999'}}>
                                        {/*<p><span>货号 : </span><span>{no}</span></p>*/}
                                        <p><span>{paymoneyNum?paymoneyNum:0}</span>人付款</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}