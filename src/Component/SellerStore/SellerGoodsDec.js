import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import GoodsPopup from '../../Component/GoodsDetails/GoodsPopup'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/goodsDetails.css';
import {Details,Follow,ProductAttribute,AddShopCar,OrderShopping,RemarkList} from '../../Action/auth'
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class SellerGoodsDec extends Component {
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

    async getFollow(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress){
        await Follow(this.props.location.query.id,status)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }


    async adShopCarOrToPay(type){
        await this.setState({isShow:true,type:type})
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
                    <div className="plr color6 pr_details font14 height_all">{goodsDetails.NAME}</div>
                </div>
                <div className="mtlr">
                    <div>
                        <span className="colorff f12">￥</span><span className="colorff font18">{goodsDetails.CURRENT_PRICE}</span>
                        <a className="color_gray di f12 ml td_lt"><span>原价&nbsp;</span><span>{goodsDetails.PRICE}</span></a>
                    </div>
                    <div className="f12 df flex-pack-justify color9">
                        <span>卖家包邮</span>
                        {/*<div>赠<span>32</span>积分</div>*/}
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
                {/*<SplitLine />

                    {/!*选择商品属性*!/}
                    {this.state.isShow?
                        <GoodsPopup
                            //onClick = {(type,id,isRadio)=>this.getAttrIds(type,id,isRadio)}
                            attr = {this.state.attributeList}
                            closePopUp = {()=>this.setState({isShow:false})}
                            ensurePress = {(ids,count,typeParam)=>this.addShopCar(ids,count,typeParam)}
                            isOnly = {this.state.type?true:false}
                            //typeParam = {type=>{console.log('type',type)}}
                        />
                        :null}*/}
                    <div className="goodBottom width_100"></div>
            </section>


        );
    }
}
