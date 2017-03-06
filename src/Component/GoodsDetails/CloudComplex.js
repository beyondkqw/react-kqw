import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search'
import TabBar from '../../Component/NewComponent/TabBar';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {Link} from 'react-router';
import {StoreType,StoreList} from '../../Action/auth'
import Footer from '../../Component/NewComponent/Footer';
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class CloudComplex extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.StoreTypeItem = [];
        this.StoreTypeId = [];
        this.state = {
            index:0,
            id:this.StoreTypeId[0],
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
            probeType: 3,
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
            this.setState({pullUpStatus: 2});
            this.fetchItems(false);
        }

    }

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        if (this.state.pullUpStatus == 2) {
            const index = this.state.index;
            await this.getStoreList(this.state.id,'',this.page)
        }

    }

    async componentWillMount() {

        await this.getStoreType()
        this.changTab(0,this.StoreTypeId[0])

    }

    //获取店铺类型
    async getStoreType(){
        await  StoreType()
            .then(res=>{
                res.map(item=>{
                    this.StoreTypeItem.push(item.name)
                    this.StoreTypeId.push(item.id)
                })
                this.setState({torender:1})

            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    //请求列表接口
    async getStoreList(type,name,page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await StoreList(type,name,page)
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
                this.setState({storeDetail:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;

            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    //交换
    changTab(index,id){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        this.setState({
            index:index,
            orderItems:[],
            display:'none'
        });
        this.setState({id:id})
        this.getStoreList(id,'',1)
    }

    //搜索
    searchStore(value){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        this.setState({
            orderItems:[],
            display:'none'
        });
        this.getStoreList(this.state.id,value,1)
    }

    render() {
        const {storeDetail} = this.state
        return (
            <div>
                <div style={{position:'absolute',top:0,right:0,left:0,bottom:0,overflow:'auto'}}>
                    <div className="pf t0 width100" style={{zIndex:2,transform: 'translate3d(0,0,0)',left:0}}>
                        <div className="flex1">
                            <Search
                                style={{backgroundColor:'#ff5500'}}
                                location = {true}
                                onClick={(value)=>this.searchStore(value)}
                            />
                        </div>
                        {/*<div
                            className="flex tc bkg_ff flex-pack-center flex-align-center flex-v classify"
                        >
                            <Link to ='/chooseCity'>
                                <span className="di" style={{width:18,height:16,lineHeight:0,marginTop:5}}>
                                    <img src={require('../../Images/common/classification.png')} alt=""/>
                                </span>
                                <div className="f10 color_white">城市</div>
                            </Link>
                        </div>*/}
                    </div>
                    {/*<TabBar
                        willdo = {true}
                        index = {0}
                        onClick = {index=>this.changTab(index,this.StoreTypeId[index])}
                        contents={this.StoreTypeItem}
                    />*/}
                    <div style={{marginTop:'2.2rem'}}>
                        <Tabscontrol
                            onClick = {index=>this.changTab(index,this.StoreTypeId[index])}
                        >
                            {
                                this.StoreTypeItem&&this.StoreTypeItem.map(el=>{
                                    return (
                                        <div name={el}></div>
                                    )
                                })
                            }
                        </Tabscontrol>
                    </div>
                    {/*<div className="pr" style={{marginBottom:54}}>*/}
                    <div className="pr" style={{marginBottom:54,marginTop:'-25'}}>
                        <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                            <div id='ListOutsite' style={{height: window.innerHeight-73}}
                                 onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                                 onTouchMove={this.onTouchMove}>

                                <ul id='ListInside'>
                                    {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                                    {/*<div style={{marginTop:'2.2rem'}}>
                                        <TabBar
                                            willdo = {true}
                                            index = {0}
                                            onClick = {index=>this.changTab(index,this.StoreTypeId[index])}
                                            contents={this.StoreTypeItem}
                                        />
                                    </div>*/}
                                    {
                                        storeDetail == ''?
                                            <IsShowEmptyImg
                                                styleSheet={{width:69,height:72,marginTop:120}}
                                                title={'列表是空的哦~'}
                                            />
                                            :
                                        storeDetail&&storeDetail.map(el=>{
                                            return(
                                                <Link to="/store" query={{storeId:el.id}}>
                                                    <div className="_order_height border_bottom pr plAll df">
                                                        <div className="_order_img height_all">
                                                            <img src={el.img} alt=""/>
                                                        </div>
                                                        <div className="flex1 font14 _order_margin">
                                                            <p className="color6 db">{el.name}</p>
                                                            {/*<p className="color9 oh_height mt3">
                                                                主营衣服
                                                            </p>*/}
                                                            {/*<p className="color9 distance_h mt3 pr">
                                                                <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                                                <span className="pa bottom0">据您{el.distance}千米</span>
                                                            </p>*/}
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                    <p ref="PullUp" id='PullUp'
                                       style={{display:this.state.display}}
                                    >{this.pullUpTips[this.state.pullUpStatus]}</p>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*</div>*/}


                </div>
                <Footer
                    index = {1}
                />
            </div>
        );
    }
}
