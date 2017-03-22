import React, { Component } from 'react';
import {Link} from 'react-router';
import OrderDetails from '../../Component/Orders/OrderDetails'
import '../../Stylesheets/App/personal.css';
import {MyStore,MyInfo} from '../../Action/auth'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

const ItemList = [
    {name:'销售统计',imgUrl:require('../../Images/common/SalesStatistics.png'),link:'/salesStatistics'},
    {name:'订单管理',imgUrl:require('../../Images/common/OrderManagement.png'),link:'/sellerOrderList'},
    {name:'店铺首页',imgUrl:require('../../Images/common/ShopHome.png'),link:'/shopHome'},
    {name:'产品管理',imgUrl:require('../../Images/common/productManagement.png'),link:'/productManagement'},
    {name:'客服设置',imgUrl:require('../../Images/common/CustomerService.png'),link:'/customerService'},
    {name:'分佣比例设置',imgUrl:require('../../Images/common/SubCommission.png'),link:'/storeSubCommission'},
    {name:'资金管理',imgUrl:require('../../Images/common/balanceMan.png'),link:'/sellerBalanceMan'}
]
export default class SellerStoreCenter extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeDetails:'',
            Now_Amount:'',
            frozen:'',
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
            location.reload()
        }
    }

    componentWillMount() {
        this.getMyStore()
        this.getMyInfo()
    }

    async getMyStore(){
        await MyStore()
            .then(res=>{
                this.setState({storeDetails:res.store})
            })
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({
                    Now_Amount : res.NOW_AMOUNT,
                    frozen:res.FROZEN
                })
            })
    }

    render() {
        const {storeDetails,Now_Amount,frozen} = this.state
        return (
            <div className="containerNav">
                <div id='ScrollContainer' className="ScrollContainer">
                    <div id='ListOutsite' style={{height: window.innerHeight-50}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            <section className="pr tc center_bkImg" style={{height:170,paddingTop:20}}>
                                <Link to="/sellerSetting" query={{storeId:storeDetails.id}}>
                                    <div className="personLogo">
                                        <img className="border_ra50" src={storeDetails.img} alt=""/>
                                    </div>
                                </Link>
                                <div className="pa setUp">
                                    <Link
                                        to="/sellerStoreSetting"
                                        query={{mobile:storeDetails.mobile,storeId:storeDetails.id}}>
                                        <span className="di" style={{width:15,height:15,lineHeight:0,marginRight:5}}>
                                            <img src={require('../../Images/common/shezhi.png')} alt=""/>
                                        </span>
                                        <span className="font14 color_white">设置</span>
                                    </Link>
                                </div>
                                <div className="font14 color_white" style={{marginTop:20,height:15}}>{storeDetails.name}</div>
                                <div className="flex flex-pack-justify color_white" style={{margin:'10px 3.5rem 0'}}>
                                    <div className="flex flex-v">
                                        <span className="font16">{frozen}</span>
                                        <span className="font14">冻结金额</span>
                                    </div>
                                    <div className="flex flex-v">
                                        <span className="font16">{Now_Amount}</span>
                                        <span className="font14">可用余额</span>
                                    </div>
                                </div>
                            </section>
                            <div className="line"></div>
                            <div className="width_100 countDiv">
                                {
                                    ItemList&&ItemList.map((item,index)=>{
                                        return(
                                            <Link
                                                to={item.link}
                                                className="di width_third width_100"
                                                query={{storeId:storeDetails.id,Now_Amount:Now_Amount,frozen:frozen}}
                                            >
                                                <div className={index%3==0||index%3==1?
                                                "separateRow tc di border_bottom  border_right":
                                                "separateRow tc di border_bottom"}>
                                                    <p>
                                                        <span className="di separateRowImg"><img src={item.imgUrl} alt=""/></span>
                                                    </p>
                                                    <div className="f12 m_top color6">{item.name}</div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            <div className="footerHidden"></div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
