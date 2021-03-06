import React, { Component } from 'react';
import TabBar from '../../Component/NewComponent/TabBar';
import SellerGoodDetails from '../../Component/SellerStore/SellerGoodDetails'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {Link} from 'react-router';
import {GetSellerOrderList} from '../../Action/auth';
import NavBar from '../../Component/CommonComponent/NavBar'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class SellerOrderList extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
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
        this.iScrollInstance.on('scroll', ()=>this.onScroll());
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

    onScroll=()=>{
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
        console.log(this.state.scrollTop)
    }

    onScrollEnd=()=> {
        console.log("onScrollEnd" + this.state.pullDownStatus);

        this.setState({
            scrollTop:(this.iScrollInstance.y<0)?Math.abs(this.iScrollInstance.y):0
        })

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
            if (index == 3) {
                this.getOrderList('6','',this.page)
            }
            await this.getOrderList(index,'',this.page)
        }

    }

    componentWillMount(){
        /* let indexValue = this.props.location.query.index
         console.log('indexValue========>',indexValue)
         this.setState({index:indexValue?indexValue:0})*/
    }

    //点击切换状态
    async onChange(index){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        await this.setState({
            index:index,
            orderItems:[],
            display:'none'
        });
        this.setState({index:index})
        await this.setState({isShow:index})
        if(this.state.index == 0){
            this.getOrderList('0','',1)
        }else if(this.state.index == 1){
            this.getOrderList('1','',1)
        }else if(this.state.index == 2){
            this.getOrderList('2','',1)
        }
        else if(this.state.index == 3){
            this.getOrderList('',1,1)
        }else if(this.state.index == 4){
            this.getOrderList('4','',1)
        }else{
            this.getOrderList('0','',1)
        }
        this.iScrollInstance.refresh();
    }

    //订单列表
    async getOrderList(status,refund,page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await GetSellerOrderList(status,refund,page)
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
                this.setState({orderItems:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
             })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {orderItems,scrollTop} = this.state
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'订单'}
                />
                <TabBar
                    index = {this.state.index}
                    onClick = {index=>this.onChange(index)}
                    contents={['待付款','待发货','已发货','退款中','已完成']}
                />
                <SplitLine />

                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-95}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}

                            {/*待付款*/}
                            { this.state.index == 0?
                                <div>
                                    <SellerGoodDetails
                                        debitPay = {()=>this.getOrderList('0')}
                                        sellerOrderDetails = {orderItems}
                                        toPay = {true}
                                        isShowWhat = {true}
                                        scrollTop = {scrollTop}
                                    />
                                </div>
                                :null
                            }
                            {/*待发货*/}
                            { this.state.index == 1?
                                <div>
                                    <SellerGoodDetails
                                        Receipt = {()=>this.getOrderList('2')}
                                        sellerOrderDetails = {orderItems}
                                        deliverGoods={true}
                                        isShowWhat = {true}
                                        scrollTop = {scrollTop}
                                    />
                                </div>
                                :null
                            }
                            {/*已发货*/}
                            { this.state.index == 2?
                                <div>
                                    <SellerGoodDetails
                                        Receipt = {()=>this.getOrderList('2')}
                                        sellerOrderDetails = {orderItems}
                                        //deliverGoods={true}
                                        isShowWhat = {true}
                                        scrollTop = {scrollTop}
                                    />
                                </div>
                                :null
                            }
                            {/*退款中*/}
                            { this.state.index == 3?
                                <div>
                                    <SellerGoodDetails
                                        sellerOrderDetails = {orderItems}
                                        Refund = {true}
                                        isShowWhat = {true}
                                        scrollTop = {scrollTop}
                                        //query = {}
                                    />
                                </div>
                                :null
                            }
                            {/*已完成*/}
                            { this.state.index == 4?
                                <div>
                                    <SellerGoodDetails
                                        sellerOrderDetails = {orderItems}
                                        alreadyRated = {true}
                                        isShowWhat = {true}
                                        scrollTop = {scrollTop}
                                    />
                                </div>
                                :null
                            }

                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                        {
                            this.state.index == 4?
                                <Link to="/searchOrder">
                                    <div style={{bottom:50,height:50}} className="pf width100"></div>
                                    <div
                                        className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                                        style={{height:50,backgroundColor:'#ff5500'}}>
                                        搜索订单
                                    </div>
                                </Link>
                                :null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
