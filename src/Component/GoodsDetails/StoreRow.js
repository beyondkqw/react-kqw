/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class StoreRow extends Component {

    render() {
        const {title,price,imgurl,Postage,peopleRemark,
            payNum,record,browseId,onClick,toDelete,assess,showBorderBottom,sales} = this.props

        return (
            <div className="storeRowContainer">
                <div style={{width:100,height:100}}
                     onClick={()=>onClick&&onClick()}
                >
                    <img src={imgurl} />
                </div>
                <div className={showBorderBottom?"rightMoudle":"rightMoudle border_bottom"}>
                    <div className="goodsTitle">{title}</div>
                    <div>
                        <div style={{height:18,marginBottom:5}}>
                            {
                                price?<span className="colorff f12">￥</span>:null
                            }
                            <span className="colorff font18">{price?price:''}</span>
                        </div>

                        {
                            record?
                                <div className="rightBottom">
                                    <div>
                                        <span className="colorff f12">￥</span>
                                        <span className="colorff font18">{record?record:0}</span>
                                    </div>

                                    <span
                                        className="deletHistory fr"
                                        onClick={()=>toDelete&&toDelete()}
                                    >
                                        <img src = {require('../../Images/detelename.png')}/>
                                    </span>
                                </div>
                                :
                                <div>
                                    {
                                        assess?
                                            <p className="color9 f12"><span>{peopleRemark?peopleRemark:0}</span>人评价</p>
                                            :
                                            <div className="rightBottom">
                                                <span>{Postage?Postage+'元':'免邮费'}</span>
                                                <span style={{color:'#999'}}>售出{sales?sales:0}份</span>
                                            </div>
                                    }


                                </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}