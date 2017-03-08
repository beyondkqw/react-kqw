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
import iScroll from 'iscroll/build/iscroll-probe';
import {SCREEN_HEIGHT} from '../../Action/rpc'
import $ from 'jquery';

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
            showEmptyImg:false,
            index : 0,
            remarkList:[],
            agentList:[],
            list: [],
            disabled:false,
            display:'block',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0,
            height:''
        };
        this.page = 1;
        this.over = false;
        this.dataList=[];
        this.itemsChanged = false;

        this.pullDownTips = {
            // 下拉状态
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功',
        };

        this.pullUpTips = {
            // 上拉状态
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功',
            4: '没有更多数据了'
        };

        this.isTouching = false;

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    componentDidMount() {
        const options = {
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
            preventDefault: false,
            // 禁止缩放
            zoom: false,
            // 支持鼠标事件，因为我开发是PC鼠标模拟的
            mouseWheel: true,
            // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
            // probeType: 3,
            // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
            bounce: true,
            // 展示滚动条
            scrollbars: true,
            vScrollbar: false,
            fadeScrollbars:true
        };
        this.iScrollInstance = new iScroll('#ListOutsite', options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true);

    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        if (this.state.pullUpStatus == 2) {
            const index = this.state.index;
            await this.getRemarkList(this.page)
        }

    }

    onTouchStart=(ev)=>{
        this.isTouching = true;
    }

    onTouchMove=(ev)=>{
        ev.preventDefault();
        document.getElementById('#ListInside').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.setState({
            scrollTop:(this.iScrollInstance.y<0)?Math.abs(this.iScrollInstance.y):0
        })
    }

    onTouchEnd=(ev)=>{
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y > 5) {
                this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }

    onPullUp() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
        this.setState({
            scrollTop:(this.iScrollInstance.y<0)?Math.abs(this.iScrollInstance.y):0
        })
    }

    onScrollEnd() {
        console.log("onScrollEnd" + this.state.pullDownStatus);

        let pullDown = $(this.refs.PullDown);
        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                // this.fetchItems(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            this.setState({pullUpStatus: 2});
            this.fetchItems(false);
        }

    }

    //弹出popup
    popubAnimate(){
        this.setState({isShow:true,type:''});
    }

    async componentWillMount() {
        await this.getDetails()
        this.getProductAttribute()
        this.getRemarkList(1)
    }

    static contextTypes = {
        router:PropTypes.object
    }

    //获取评论列表
    async getRemarkList(page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await RemarkList(this.props.location.query.id,page,'')
        .then(res=>{
            if(res.resultList.length==0){
                this.over = true;
                this.iScrollInstance.refresh();
                this.setState({
                    pullUpStatus: 4,
                    showEmptyImg:true
                });
            }else{
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({remarkList:this.dataList});
                this.iScrollInstance.refresh();
                this.page++
                this.setState({
                    pullUpStatus: 1
                });
            }
            this.setState({
                display:(this.dataList.length==0)?'none':'block'
            })
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
                //判断当前商品是否收藏
                const isFollow = res.IS_FOLLOW == 1?false:true
                this.setState({isChecked:isFollow})
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
            //await this.setState({status:0});
            this.getFollow(0)
        //取消收藏
        }else{
            //await this.setState({status:1});
            this.getFollow(1)
        }
    }

    async getFollow(status){
        await Follow(this.props.location.query.id,status)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

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
                        alert('添加购物车成功')
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



    //商品介绍
    commodityIntroduction(){
        const detail = this.state.goodsDetails.CONTENT_URL_WEB
        return (
            <div className="pr">
                <iframe src={detail}  id="myiframe" overflow='auto' onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)" scrolling="yes" style={{border:'none',width:'100%',height:window.innerHeight-94}}></iframe>
            </div>
        )
    }

    //商品参数
    showGoodsParams(){
        const params = this.state.goodsDetails.PARAMS
        return(
            <div className="goodsParams" style={{border:'none',width:'100%',height:window.innerHeight-88}}>
                <div style={{height:10,backgroundColor:'#f5f5f5'}} />
                <div className="tc"><img src={params} alt=""/></div>
            </div>
        )
    }


    //评价列表
    showGoodsRemark(){
        const {remarkList,showEmptyImg} = this.state
        const imgHeight = document.body.scrollWidth
        return(
            <div className="remark pr" style={{backgroundColor:'#f5f5f5',width:'100%',height:window.innerHeight-94}}>
           {/*     <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-50}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>*/}
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            {
                                remarkList.length == 0?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72}}
                                        title={'暂无评论哦~'}
                                    />
                                    :
                                    remarkList&&remarkList.map((el,index)=>{
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
                                            <div className="flex">
                                                {

                                                    el.IMAGES && el.IMAGES.length>0&&el.IMAGES[0]!=''?
                                                        el.IMAGES.map(item=>{
                                                            return(
                                                                <div ref='img' className="remark-img mt5" style={{height:imgHeight*27/100,marginRight:10}} >
                                                                    <img  src={item}/>
                                                                </div>
                                                            )
                                                        })
                                                        :null
                                                }
                                            </div>
                                            <div style={{height:60}}></div>
                                           {/* <div ref='img' className="remark-img mt5" style={{height:imgHeight*27/100}} >
                                                <img />
                                            </div>*/}
                                        </div>
                                    )
                                })
                            }
                 {/*           <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
                </div>*/}
           </div>

        )
    }
    render() {
        const {goodsDetails} = this.state;
        return (
            <section>
                <div  className="bkg_color overScroll" style={{position:'absolute',top:0,bottom:'3rem',overflowX:'hidden',overflowY:'auto',width:"100%"}}>
                    <div className="bannerImg">
                        <AutoPlaySwipeableViews
                            style={{height:'9rem'}}
                            interval = {2000}
                        >
                            {
                                goodsDetails.BANNER&&goodsDetails.BANNER.map((el,index)=>{
                                    return(
                                        <div style={{width:'100%',height:'9rem',textAlign:'center'}}>
                                            <img
                                                style={{width:'70%'}}
                                                src = {el.IMAGE}
                                            />
                                        </div>

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
                                        <span className="color6 font14">
                                            {
                                            this.state.attributeList.map((el,index)=>{
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
                            {this.commodityIntroduction()}
                        </div>
                        <div name="商品参数">
                            {this.showGoodsParams()}
                        </div>
                        <div name="评论">
                            {this.showGoodsRemark()}
                        </div>

                    </Tabscontrol>
                </div>

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
                        image = {goodsDetails.IMAGE}
                        attr = {this.state.attributeList}
                        closePopUp = {()=>this.setState({isShow:false})}
                        ensurePress = {(ids,count,typeParam)=>this.addShopCar(ids,count,typeParam)}
                        isOnly = {this.state.type?true:false}
                        price = {goodsDetails.CURRENT_PRICE}
                        //typeParam = {type=>{console.log('type',type)}}
                    />
                :null}
                <div className="goodBottom width_100"></div>
            </section>


        );
    }
}
