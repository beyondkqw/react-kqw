/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class StoreRow extends Component {

    render() {
        const {title,price,imgurl,Postage,payNum,record,browseId,onClick,toDelete} = this.props

        return (
            <div className="storeRowContainer">
                <div style={{width:100,height:100}}
                     onClick={()=>onClick&&onClick()}
                >
                    <img src={imgurl} />
                </div>
                <div className="rightMoudle">
                    <div className="goodsTitle">{title}</div>
                    <div>
                        <div style={{height:18,marginBottom:5}}>
                            {
                                price?<span className="colorff f12">￥</span>:null
                            }
                            <span className="colorff font18">{price}</span>
                        </div>

                        {
                            record?
                                <div className="rightBottom">
                                    <div>
                                        <span className="colorff f12">￥</span>
                                        <span className="colorff font18">{record}</span>
                                    </div>

                                    <span
                                        className="deletHistory fr"
                                        onClick={()=>toDelete&&toDelete()}
                                    >
                                        <img src = {require('../../Images/detelename.png')}/>
                                    </span>
                                </div>
                                :
                                <div className="rightBottom">
                                    <span>{Postage?Postage+'元':'免邮费'}</span>
                                    <span style={{color:'#999'}}>{payNum?payNum:0}人付款</span>
                                </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}