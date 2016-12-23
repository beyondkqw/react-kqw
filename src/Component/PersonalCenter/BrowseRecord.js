/**
 * Created by asus on 2016/11/24.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import StoreRow from '../../Component/GoodsDetails/StoreRow'
import {test} from '../../Action/auth'

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',record:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',record:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',record:291,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
]


export default class BrowseRecord extends Component {

    render(){
        return(
            <div
                onClick = {()=>test()}
                className="containerNav">
                <div className="wrap">
                    {
                        storeDetail.map(el=>{
                            return(
                                <StoreRow
                                    title = {el.title}
                                    record = {el.record}
                                    imgurl = {el.imgUrl}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}