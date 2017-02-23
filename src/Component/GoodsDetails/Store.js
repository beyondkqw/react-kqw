import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import StoreDetails from '../../Component/GoodsDetails/StoreDetails'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import Carousel from '../NewComponent/Carousel'
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import {StoreDetailItem,StorectList} from '../../Action/auth'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',price:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',price:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',price:291,imgUrl:require('../../Images/clothes1.png')}];

export default class Store extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeDetails:[],
            storeBanner:[],
            storeDetail:[],
            tableIndex:0,
            index : 0,
            isShow:0,
            shopCarList:[],
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

    onTouchStart=(ev)=>{
        this.isTouching = true;
    }

    onTouchMove=(ev)=>{
        ev.preventDefault();
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
            }else if(this.iScrollInstance.y==0){}
            else {
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
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }
        }

    }

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        if (this.state.pullUpStatus == 2) {
    /*        const index = this.state.index;
            await this.getShopCarList(this.page)*/
            const index = this.state.index;
            await this.getOrderList('',this.storeId,'p.create_time','',this.page)
        }

    }

    componentWillMount() {
        this.storeId = this.props.location.query.storeId
        this.getStoreDetails(this.storeId)
        this.getOrderList('',this.storeId,'p.create_time','')
    }

    //获取店铺详情
    async getStoreDetails(storeId){
        await  StoreDetailItem(storeId)
            .then(res=>{
                this.setState({storeDetails:res.store})
                this.setState({storeBanner:res.banner})
            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    //店铺导航切换
    //请求列表接口
    async getOrderList(paramOne,paramTwo,paramThree,paramFour,page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await StorectList(paramOne,paramTwo,paramThree,paramFour,page)
            .then(res=>{
                if(this.page==Math.ceil(res.total/res.pageSize)){
                    this.over=true;
                    this.setState({
                        pullUpStatus: 4
                    });
                }
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({storeDetail:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
                this.setState({
                    pullUpStatus: 3
                });
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    onChangeTab(index){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        this.setState({
            index:index,
            orderItems:[],
            display:'none'
        });
        if(index == 0){
            //最新上架
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }else if(index == 1){
            //人气排行
            this.getOrderList('',this.storeId,'desc','p.CLICK_COUNT')
        }else if(index == 2){
            //最高价
            this.getOrderList('',this.storeId,'desc','p.CURRENT_PRICE')
        }else if(index == 3){
            //最低价
            this.getOrderList('',this.storeId,'asc',' p.CURRENT_PRICE')
        }else{
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }
    }
    //搜索
    searchList(value){
        this.getOrderList(value,this.storeId,'','')
    }

    render() {
        const {storeDetails,storeBanner,storeDetail} = this.state
        return (
            <div className="containerNav bkg_gray">
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            <div className="flex">
                                <div className="flex1">
                                    <Search
                                        style={{backgroundColor:'#ff5500'}}
                                        location = {true}
                                        onClick={(value)=>this.searchList(value)}
                                    />
                                </div>
                                <div
                                    className="flex tc bkg_ff flex-pack-center flex-align-center flex-v classify"
                                >
                                    <Link to ='storeClassify' query={{storeId:this.props.location.query.storeId}}>
                                        <span className="di" style={{width:18,height:16,lineHeight:0,marginTop:5}}>
                                            <img src={require('../../Images/common/classification.png')} alt=""/>
                                        </span>
                                        <p className="f10 color_white">分类</p>
                                    </Link>
                                </div>
                            </div>

                            <div className="plr storeDetail df" >
                                <div className="df width100 pb10" style={{justifyContent:'space-between',alignItems:'flex-end'}}>
                                    <div className="df">
                                        <div className="mr" style={{height:40,width:40}}>
                                            <img src={storeDetails.img} alt=""/>
                                        </div>
                                        {/*<div className="color_white f12" style={{width:100,height:36,overFlow:'hidden',marginTop:7}}>
                                            <p>来自{storeDetails.wechat}的分享</p>
                                        </div>*/}
                                        <div className="color_white f12" style={{width:100,height:36,overFlow:'hidden',marginTop:7}}>
                                            <p>{storeDetails.name}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/contactMe"
                                        query={{wechat:storeDetails.wechat,mobile:storeDetails.mobile,qq:storeDetails.qq}}>
                                        <div style={{height:20,width:63.5,lineHeight:0,marginTop:18}}>
                                            <img src={require('../../Images/contactMe.png')} alt=""/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <img src={require('../../Images/split.png')} alt=""/>
                            </div>
                            {/*<div className="carouselHeight">
                                <Carousel
                                    images = {storeBanner}
                                />
                            </div>*/}
                            <Tabscontrol
                                onClick={(index)=>this.onChangeTab(index)}
                            >
                                <div name="最新上架"></div>
                                <div name="人气排行"></div>
                                <div name="最高价"></div>
                                <div name="最低价"></div>
                            </Tabscontrol>
                            <div className="imgContainer width_100 pr" style={{marginTop:-25}}>
                                {
                                    storeDetail == ''?
                                        <IsShowEmptyImg
                                            styleSheet={{width:69,height:72,marginTop:120}}
                                            title={'查询列表是空的哦~'}
                                        />
                                        :
                                    storeDetail&&storeDetail.map((el,index)=>{
                                        return (
                                            <Link to="/goodsDescription" query={{id:el.ID}}>
                                                <StoreDetails
                                                    key = {index}
                                                    float = {index%2==0?'left':'right'}
                                                    title = {el.NAME}
                                                    price = {el.CURRENT_PRICE}
                                                    imgurl = {el.IMAGE}
                                                />
                                            </Link>
                                        )
                                    })
                                }
                                <div style={{clear:'both'}}></div>
                            </div>
                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
