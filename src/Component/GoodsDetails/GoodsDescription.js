import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import GoodsPopup from '../../Component/GoodsDetails/GoodsPopup'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/goodsDetails.css';
import {Details,Follow,ProductAttribute,AddShopCar,OrderShopping,RemarkList} from '../../Action/auth'
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
            attributeList : [],
            type:'',
            remarkList:[],
            showEmptyImg:false
        };
    }
    //弹出popup
    popubAnimate(){
        this.setState({isShow:true,type:''});
    }

    componentWillMount() {
        this.getDetails()
        this.getProductAttribute()
        this.getRemarkList()
    }

    static contextTypes = {
        router:PropTypes.object
    }

    //获取评论列表
    async getRemarkList(){
        await RemarkList(this.props.location.query.id,1,'')
        .then(res=>{
            console.log('评论列表',res)
            const {resultList} = res
            if(resultList == ''){
                this.setState({showEmptyImg:true})
                return
            }
            this.setState({remarkList:resultList})
        })
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
        console.log('istrue',this.state.isChecked== true);
        //收藏
        if(this.state.isChecked){
            await this.setState({status:0});
            this.getFollow(this.state.status)
        //取消收藏
        }else{
            await this.setState({status:1});
            this.getFollow(this.state.status)
        }
    }

    async getFollow(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress){
        await Follow(this.props.location.query.id,status)
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

    //加入购物车 type = 1 加入购物车  2 立即购买
    async addShopCar(ids,count,typeParam){
        //const {type} = this.state
        let type = typeParam?typeParam:this.state.type
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
        if(type==2){
            if(ids.length<this.state.attributeList.length){
                alert('请选择商品属性')
            }else{
                await OrderShopping(this.props.location.query.id,ids.join(','),count)
                    .then(res=>{
                        console.log('立即付款成功',res)
                        this.setState({isShow:false})
                        this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                    })
                    .catch(err=>{
                        console.warn('立即付款失败',err)
                    })
            }
        }
    }

    async adShopCarOrToPay(type){
       await this.setState({isShow:true,type:type})
    }

    //商品参数
    showGoodsParams(){
        return(
            <div className="goodsParams">
                <div style={{height:10,backgroundColor:'#f5f5f5'}} />

                {/*商品参数*/}
                <div className="goodsParams-item font14">
                    <span className="left-item color9">品牌</span>

                    <span className="color6">xxx</span>
                </div>
                <div className="goodsParams-item font14">
                    <span className="left-item color9">aaa品牌</span>

                    <span className="color6">xxx</span>
                </div>

            </div>
        )
    }


    //评价列表
    showGoodsRemark(){
        const {remarkList,showEmptyImg} = this.state
        console.log('showEmptyImg',showEmptyImg)
        const imgHeight = document.body.scrollWidth
        //console.log('imgHeight',imgHeight)
        return(
            <div className="remark pr" style={{backgroundColor:'#f5f5f5'}}>
                {
                    showEmptyImg?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72}}
                            title={'暂无评论哦~'}
                        />
                        :
                    remarkList.map((el,index)=>{
                        return(
                            <div
                                className="remark-items f12 color9"
                                key = {index}
                            >
                                <div className="re-headImg mr5">
                                    <img
                                        className="border_ra50"
                                        src={el.IMAGE_URI}
                                    />
                                </div>

                                <span>{el.MEMBER_NAME}</span>

                                <p>{el.CREATE_TIME}&nbsp;&nbsp;{el.PRODUCT_ATTR}</p>

                                <div className="flex flex-wrap color6 font14">
                                    {el.COMMENT}
                                </div>

                                {/*评论图片 最多3张    todo IMAGES转数组map*/}
                                {

                                }
                                <div ref='img' className="remark-img mt5" style={{height:imgHeight*27/100}} >
                                    <img />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
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
                                    <img
                                        src = {el.IMAGE}
                                        //key = {index}
                                    />
                                )
                            })
                        }
                    </AutoPlaySwipeableViews>
                </div>
                <div className="width_100 goodDetails">
                    <div className="pl fl color6 pr_details border_dec width_80 font14 height_all">{goodsDetails.NAME}</div>
                    <div className="width_20 fl tc height_all" onClick={()=>this.isFollow()}>
                        <span className="di collect_img">
                            {
                                this.state.isChecked?
                            <img src={require('../../Images/alreadyFollow.png')} alt=""/>
                            :
                            <img src={require('../../Images/collect.png')} alt=""/>
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
                        {
                            goodsDetails.STORE_ID == ''||goodsDetails.STORE_ID == null?
                            null:
                            <Link to="/store" query={{storeId:goodsDetails.STORE_ID}}>
                                <li className="item-content item-link pl  border_bottom">
                                    <div className="item-media"><i className="icon icon-f7"></i></div>
                                    <div className="item-inner margin0">
                                        <div className="item-title">
                                            <span className="di store mr"><img src={goodsDetails.STORE_IMG} alt=""/></span>
                                            <span className="color6 font14">{goodsDetails.STORE_NAME}</span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        }
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

                <Tabscontrol
                    style={{backgroundColor:'#fff'}}
                >
                    <div name="商品介绍">
                        我是第一帧
                    </div>
                    <div name="商品参数">
                        {this.showGoodsParams()}
                    </div>
                    <div name="评论">
                        {this.showGoodsRemark()}

                    </div>
                    <SplitLine />
                </Tabscontrol>


                <div className="wrap">
                    <div className="height3 pf bottom0  plAll border_top bkg_color z_index wrap">
                            {/*购物车*/}
                            <div
                                onClick = {()=>this.adShopCarOrToPay(1)}
                                className="di height_all pr fl width_cart"
                            >
                                <button className="cartBtn width_100 height_all border_ra">
                                    <span className="di cartImg"><img src={require('../../Images/cart.png')} alt=""/></span>
                                    {/*<span className="di pa goodNum border_ra50 f12 colorff">5</span>*/}
                                </button>
                            </div>
                            <div className="width_de fl height_all"></div>
                            <div
                                className="di height_all pr fl width_buy border_ra"
                                onClick={()=>this.adShopCarOrToPay(2)}
                            >
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
                            ensurePress = {(ids,count,typeParam)=>this.addShopCar(ids,count,typeParam)}
                            isOnly = {this.state.type?true:false}
                            //typeParam = {type=>{console.log('type',type)}}
                        />
                    :null}
                    <div className="goodBottom width_100"></div>
                </div>
            </section>


        );
    }
}
