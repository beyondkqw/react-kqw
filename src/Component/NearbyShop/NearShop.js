/**
 * Created by asus on 2016/12/7.
 */
import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/homePage.css';
import '../../Stylesheets/App/MsgListPage.css';
import {_NearByShop,AmapNearby} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {Link} from 'react-router';
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

const type = ['','','','','','','','']
export default class NearShop extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            latitude:'',
            longitude:'',
            address:'',
            shopList:'',
            index : 0,
            isShow:0,
            orderItems:[],
            agentList:[],
            list: [],
            disabled:false,
            display:'block',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0,
            status:''
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

    onTouchMove(ev){
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

    async componentDidMount() {
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


        await this.setState({
            address:sessionStorage.getItem('address'),
            latitude:sessionStorage.getItem('latitude'),
            longitude:sessionStorage.getItem('longitude')
        })
        this.getShopList()
    }

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        if (this.state.pullUpStatus == 2) {
            const index = this.state.index;
            await this.getShopList()
        }

    }

    async getShopList(){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        const {latitude,longitude,address} = this.state
        await _NearByShop(latitude,longitude,address,this.page)
            .then(res=>{
                this.setState({status:res.status})
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
                this.dataList = this.dataList.concat(res.datas);
                this.setState({shopList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
            })
            .catch(err=>{
                console.warn('_NearByShop',err)
            })
    }

    render(){
        const {shopList,status} = this.state
        return(
            <div className="containerNav">
                <Search
                    location = {true}
                    style = {{backgroundColor:'#ff5500',paddingLeft:10,paddingRight:10}}
                    onClick = {(value)=>this.getNearbyShop(value)}
                />
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-44}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            <div className="flex flex-align-center" style={{padding:'5px 10px'}}>
                                <span className="di" style={{width:19,height:23,marginRight:10,lineHeight:0}}><img src={require('../../Images/path.png')} alt=""/></span>
                                <div className="font14 color9">{this.state.address?this.state.address:'暂未定位到当前地址'}</div>
                            </div>
                            {
                                (this.state.status ===  0 || this.state.shopList.length == 0)?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72,marginTop:120}}
                                        title={'查询列表是空的哦~'}
                                    />:
                                shopList&&shopList.map(el=>{
                                    return(
                                        <Link to="/store" query={{storeId:el.id}}>
                                            <div className="_order_height border_bottom pr plAll df">
                                                <div className="_order_img height_all">
                                                    <img src={el.img} alt=""/>
                                                </div>
                                                <div className="flex1 font14 _order_margin">
                                                    <p className="color6 db">{el.name}</p>
                                                    <div className="color9 distance_h mt3 pr">
                                                        <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                                        <span className="pa bottom0">据您{Math.round(el._distance?el._distance:0)}米</span>
                                                    </div>
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
        )
    }
}