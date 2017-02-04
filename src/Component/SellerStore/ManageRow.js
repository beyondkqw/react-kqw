/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import {Link} from 'react-router'


/*const itemList = [
    {name:'或者豆腐丝收到货基地是可敬的',prace:235,num:'hisjuhdi',paymoney:2367,id:1},
    {name:'dfghrugeyr',prace:2456,num:'ags',paymoney:255,id:2}
]*/
export default class ManageRow extends Component {
    render(){
        const {name,price,no,paymoneyNum} = this.props
        console.log('name=======>',name)
        return(
            <div className="imgContainer width_100">
                <Link>
                    <div className="storeRowContainer">
                        <div style={{width:100,height:100}}>
                            <img src={require('../../Images/clothes1.png')} />
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
                                        <p><span>货号 : </span><span>{no}</span></p>
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