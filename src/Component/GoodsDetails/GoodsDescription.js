import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import GoodsPopup from '../../Component/GoodsDetails/GoodsPopup'
import '../../Stylesheets/App/goodsDetails.css';
import {Details,Follow,ProductAttribute,AddShopCar} from '../../Action/auth'
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class GoodsDescription extends Component {
    // 构造



    constructor(props) {
        super(props);
        // 初始状态
        this.count = ''
        this.attrIds = []
        this.state = {
            isShow : false,
            isChecked:false,
            //商品详情
            goodsDetails:[],
            //是否收藏
            status:null,
            attributeList : []
        };
    }
    //弹出popup
    popubAnimate(){
        this.setState({isShow:true});
    }

    componentWillMount() {
        this.getDetails()
        this.getProductAttribute()
    }

    //商品属性
    async getProductAttribute(){
        await ProductAttribute(this.props.location.query.id)
        .then(res=>{
            console.log('商品属性',res)
            this.setState({attributeList:res})
        })
        .catch(err=>{
            console.warn('获取商品属性失败',err)
        })
    }

    //商品详情
    async getDetails(){
        console.log('商品详情ID',this.props.location.query.id)
        await Details(this.props.location.query.id)
            .then(res=>{
                this.setState({goodsDetails:res});
                console.log('goodsDetails',this.state.goodsDetails);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //是否收藏
    async isFollow(){
        await this.setState({isChecked:!this.state.isChecked});
        //收藏
        console.log('istrue',this.state.isChecked );
        //收藏
        if(this.state.isChecked === true){
            this.setState({status:0});
            this.getFollow(this.state.status)
        //取消收藏
        }else{
            this.setState({status:1});
            this.getFollow(this.state.status)
        }
    }

    async getFollow(status){
        await Follow(1,status)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //
    ////获取商品属性ids
    //getAttrIds(type,id,isRadio){
    //    //console.log('ids',type,id,isRadio)
    //    //if(type==0){
    //    //
    //    //}
    //    this.state.attributeList.map((el,index)=>{
    //        if(index==type){
    //            if(this.goodIds.indexOf(id)==-1){
    //                this.goodIds.push(id)
    //            }else{
    //                this.goodIds = this.goodIds.filter(el=>{
    //                    if(el==id){
    //                        return false
    //                    }
    //                    return true
    //                })
    //            }
    //        }
    //    })
    //
    //    console.log('goodIds',this.goodIds)
    //}

    //加入购物车
    async addShopCar(ids,count,type){
        if(type==1){
            if(ids.length<this.state.attributeList.length){
                alert('请选择商品属性')
            }else{
                await AddShopCar(this.props.location.query.id,ids.join(','),count)
                    .then(res=>{
                        console.log('添加购物车成功',res)
                        this.setState({isShow:false})
                    })
                    .catch(err=>{
                        console.warn('添加购物车失败',err)
                    })
            }
        }
    }

    render() {
        const {goodsDetails} = this.state;
        return (
            <section className="containerNav">
                <div className="bannerImg">
                    <AutoPlaySwipeableViews
                        interval = {2000}
                    >
                        {
                            goodsDetails.BANNER&&goodsDetails.BANNER.map((el,index)=>{
                                return(
                                    <img src = {el.IMAGE}/>
                                )
                            })
                        }
                    </AutoPlaySwipeableViews>
                </div>
                <div className="width_100 goodDetails">
                    <div className="pl fl color6 pr_details border_dec width_80 font14 height_all">{goodsDetails.NAME}</div>
                    <div className="width_20 fl tc height_all" onClick={()=>this.isFollow()}>
                        <span className="di collect_img">
                            {this.state.isChecked?
                            <img src={require('../../Images/alreadyFollow.png')} alt=""/>
                            :<img src={require('../../Images/collect.png')} alt=""/>
                            }
                        </span>
                        <span className="f10 db color6">收藏</span>
                    </div>
                </div>
                <div className="mtlr">
                    <div>
                        <span className="colorff f12">￥</span><span className="colorff font18">{goodsDetails.CURRENT_PRICE}</span>
                        <a className="color_gray di f12 ml td_lt"><span>原价&nbsp;</span><span>{goodsDetails.PRICE}</span></a>
                    </div>
                    <div className="f12">
                        <span className="colorff ">卖家包邮</span>
                        <div className="fr">
                            <span>{goodsDetails.SALES}</span>人付款
                        </div>
                    </div>
                </div>
                <div className="list-block margin_tb">
                    <ul>
                        <Link to="/store">
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title">
                                        <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                        <span className="color6 font14">挂花皮草阁</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        {/*属性*/}
                        <li className="item-content item-link pl" onClick={()=>this.popubAnimate()}>
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0">
                                <div className="item-title">
                                    <span className="color6 font14">{this.state.attributeList.map((el,index)=>{
                                        if(index<this.state.attributeList.length-1){
                                            return `${el.NAME}`+ ','
                                        }
                                        return `${el.NAME}`
                                    })}分类</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <SplitLine />

                <Tabscontrol>
                    <div name="商品介绍">
                        我是第一帧
                    </div>
                    <div name="商品参数">
                        我是第二帧
                    </div>
                    <div name="评论">
                        我是第三帧
                    </div>
                </Tabscontrol>

                <div className="height3 pf bottom0 width_100 plAll border_top bkg_color z_index">

                    <div
                        onClick = {()=>this.setState({isShow:true})}
                        className="di height_all pr fl width_cart"
                    >
                        <button className="cartBtn width_100 height_all border_ra">
                            <span className="di cartImg"><img src={require('../../Images/cart.png')} alt=""/></span>
                            <span className="di pa goodNum border_ra50 f12 colorff">5</span>
                        </button>
                    </div>
                    <div className="width_de fl height_all"></div>
                    <div className="di height_all pr fl width_buy border_ra">
                        <button className="width_100 height_all color_white font16 color_white">
                            立即购买
                        </button>
                    </div>
                </div>

                {/*选择商品属性*/}
                {this.state.isShow?
                    <GoodsPopup
                        //onClick = {(type,id,isRadio)=>this.getAttrIds(type,id,isRadio)}
                        attr = {this.state.attributeList}
                        closePopUp = {()=>this.setState({isShow:false})}
                        ensurePress = {(ids,count,type)=>this.addShopCar(ids,count,type)}
                    />
                :null}
                <div className="goodBottom width_100"></div>
            </section>


        );
    }
}
