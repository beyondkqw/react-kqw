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
import NavBar from '../../Component/CommonComponent/NavBar'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

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
            showEmptyImg:false,
            index : 0,
            agentList:[],
            list: [],
            disabled:false,
            display:'block',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0
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

        this.onItemClicked = this.onItemClicked.bind(this);

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    //弹出popup
    popubAnimate(){
        this.setState({isShow:true,type:''});
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
    onItemClicked(ev) {
        // 获取对应的DOM节点, 转换成jquery对象
        let item = $(ev.target);
        // 操作router实现页面切换
        this.context.router.push(item.attr('to'));
        this.context.router.goForward();
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchMove=(ev)=>{
        ev.preventDefault();
        document.getElementById('#ListInside').addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        this.setState({
            scrollTop:(this.iScrollInstance.y<0)?Math.abs(this.iScrollInstance.y):0
        })
    }

    onTouchEnd(ev) {
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
            }else if(this.iScrollInstance.y==0){
                this.setState({pullUpStatus: 4});
            }else {
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

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        this.getRemarkList()

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
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await RemarkList(this.props.location.query.id,this.page,'')
            .then(res=>{
                if(this.page==Math.ceil(res.total/res.pageSize)){
                    this.over=true;
                    this.setState({
                        pullUpStatus: 4
                    });
                }else{
                    this.setState({
                        pullUpStatus: 3
                    });
                }
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({remarkList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
                if(this.dataList.length==0){
                    this.setState({showEmptyImg:true})
                    return
                }
            })
    }

    //商品属性
    async getProductAttribute(){
        await ProductAttribute(this.props.location.query.id)
            .then(res=>{
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
            <section style={{position:'absolute',top:0,bottom:0,overflow:'auto',right:0,left:0}}>
                <NavBar
                    renderBack = {true}
                    title = {'商品详情'}
                />
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
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-45}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
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
                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
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
                    {/*<div className="goodBottom width_100"></div>*/}
            </section>


        );
    }
}
