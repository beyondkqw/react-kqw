import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import StoreDetails from '../../Component/GoodsDetails/StoreDetails'
import Carousel from '../NewComponent/Carousel'
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',price:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',price:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',price:291,imgUrl:require('../../Images/clothes1.png')}];

export default class Store extends Component {


    render() {
        return (
            <div className="containerNav bkg_gray">
               <Search
               />
                <div className="plAll storeDetail ">
                    <div className="fl mr"><img src={require('../../Images/store.png')} alt=""/></div>
                    <div className="color_white f12">
                        <p>分享自卢俊成互联网</p>
                        <p>代理商小店</p>
                    </div>
                </div>
                <div className="carouselHeight">
                    <Carousel />
                </div>
                <Tabscontrol>
                    <div name="最新上架">
                        <div className="imgContainer width_100">
                            {
                                storeDetail.map((el,index)=>{
                                    return (
                                        <StoreDetails
                                            float = {index%2==0?'left':'right'}
                                            title = {el.title}
                                            price = {el.price}
                                            imgurl = {el.imgUrl}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div name="人气排行">
                        我是第二帧
                    </div>
                    <div name="最高价">
                        我是第三帧
                    </div>
                    <div name="最低价">
                        我是第四帧
                    </div>
                </Tabscontrol>

            </div>
        );
    }
}
