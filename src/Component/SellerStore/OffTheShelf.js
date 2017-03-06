/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import {Link} from 'react-router'
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import Modal from '../../Component/CommonComponent/Modal'
import {SellerProductList,SellerOffShelf} from '../../Action/auth';
import NavBar from '../../Component/CommonComponent/NavBar'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class OffTheShelf extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        //是否使用全选按钮
        this.isUseSelectAll = false
        this.selectOffShelf = []
        this.state = {
            selectAll:false,
            toRender:1,
            sellerOffDownList:[],
            isVisible:false,
            index : 0,
            isShow:0,
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

/*    componentWillMount() {
        this.getOrderList('',this.storeId,'p.create_time','')
    }*/

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
        this.getSellerOrder(this.page)

    }


    //请求列表接口
    async getSellerOrder(page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await SellerProductList(this.props.location.query.storeId,0,page)
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
                this.setState({sellerOffDownList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    //全选/反选
    async onChangeState(){
        this.isUseSelectAll = true
        this.setState({selectAll:!this.state.checked});
        if(this.selectOffShelf.length<this.state.sellerOffDownList.length){
            this.selectOffShelf = []
            this.setState({selectAll:true})
            await this.state.sellerOffDownList.map(el=>{
                this.selectOffShelf.push(el.ID)
            })
        }else{
            this.setState({selectAll:false})
            this.selectOffShelf = []
        }
        this.setState({toRender:1})
        console.log('this.select.length',this.selectOffShelf.length)
    }

    //单选
    async getSelect(state,id){
        this.isUseSelectAll = false
        if(state){
            this.selectOffShelf.push(id)
        }else{
            this.selectOffShelf = this.selectOffShelf.filter(el=>{
                if(el==id){
                    return false
                }
                return true
            })
        }
        this.setState({toRender:1})
    }

    //弹出模态层,判断所选数量
    showModal(){
        if(this.selectOffShelf.length == 0){
            alert('请选择要清空的宝贝？')
            return
        }
        this.setState({isVisible:true})
    }

    //清空宝贝
    async DelOrderList(){
        if(this.selectOffShelf.length>0){
            await SellerOffShelf(this.selectOffShelf)
                .then(res=>{
                    //alert('清空宝贝成功')
                    this.selectOffShelf = []

                    this.setState({isVisible:false})
                    this.page=1;
                    this.over=false;
                    this.dataList = [];
                    this.setState({sellerOffDownList:this.dataList});
                    this.getSellerOrder(1)
                    //this.setState({selectAll:false});
                    // window.location.reload()
                    //this.getSellerOrder()
                    //this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                })
        }else{
            alert('请选择要清空的宝贝')
        }
        ///comfirmPayMoney
    }
    render(){
        const {sellerOffDownList,selectAll} = this.state
        return(
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'下架商品'}
                />
                <SplitLine />
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-95}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                {
                    sellerOffDownList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'查询列表为空哦~'}
                        />
                        :
                    sellerOffDownList&&sellerOffDownList.map((el,index)=>{
                        return(
                            <Link>
                                <div className="storeRowContainer">
                                    <div style={{width:100,height:100}}>
                                        <img src={el.IMAGE} />
                                    </div>
                                    <div className="rightMoudle border_bottom">
                                        <div className="orderShow font14 color6 width100">
                                            {el.NAME}
                                        </div>
                                        <div>
                                            <div className="df flex-pack-justify" style={{height:18,marginBottom:8}}>
                                                <p>
                                                    <span className="colorff f12">￥</span>
                                                    <span className="colorff font18">{el.CURRENT_PRICE?el.CURRENT_PRICE:0}</span>
                                                </p>
                                                <CheckBox
                                                    index={index}
                                                    selectAll = {this.isUseSelectAll?this.state.selectAll:null}
                                                    onSelect = {(state)=>this.getSelect(state,el.ID)}
                                                />
                                            </div>
                                            <div>
                                                <div className="rightBottom" style={{color:'#999'}}>
                                                    {/*<p><span>货号 : </span><span>asere</span></p>*/}
                                                    <p><span>25</span>人付款</p>
                                                </div>
                                            </div>
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

                {
                    sellerOffDownList == ''?
                        null:
                        <div className="width_100 commit pf bottom0 df">
                            <button
                                className="width50 height_all color_pink color_yellow"
                                onClick={()=>this.showModal()}
                            >下架宝贝</button>
                            <div className="df width50 height_all bkg_ff color_white flex-align-center flex-pack-center">
                                <span className="di check_radius pr fl">
                                    <input
                                        type="checkbox" id="checkAll"
                                        checked={this.selectOffShelf.length == sellerOffDownList.length?true:false}
                                        onClick={()=>this.onChangeState()}
                                        className="di isCheck"
                                    />
                                    <label htmlFor="checkAll"></label>
                                </span>
                                <span className="di ml">全部选择</span>
                            </div>
                        </div>
                }
                <div className="footerHidden"></div>
                {/*模态层*/}
                {this.state.isVisible?
                    <Modal
                        title = {'确定要下架所选宝贝？'}
                        onClick = {()=>this.DelOrderList()}
                        toHideModal = {()=>this.setState({isVisible:false})}
                    />
                    :null
                }
            </div>
        )
    }
}