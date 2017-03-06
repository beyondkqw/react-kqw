import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import Footer from '../../Component/NewComponent/Footer';
import ItemDetails from '../../Component/ShoppingCarts/ItemDetails';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import '../../Stylesheets/App/shoppingCarts.css';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {ShopCarList,EditShopNum,DelShopCar,SettlementShopCar} from '../../Action/auth'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class ShoppingCart extends Component {

      // 构造
      constructor(props) {
            super(props);
            // 初始状态
            //是否使用全选按钮
            this.isUseSelectAll = false
            this.amount = 0
            this.select = []
            this.selectNum = []
            this.selectDel = []
            this.state = {
                selectAll:false,
                toRender:1,
                amount : 0 ,
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

    static contextTypes = {
        router:PropTypes.object
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
            await this.getShopCarList(this.page)
        }

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

    componentWillMount() {
        this.getShopCarList(1)
    }

    async getShopCarList(page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
       await ShopCarList(page)
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
            this.setState({shopCarList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
            this.iScrollInstance.refresh();
            this.page++;

           /* this.setState({
                display:(this.dataList.length==0)?'none':'block'
            })*/
      /*      const {resultList} = res
            this.setState({shopCarList:resultList})*/
        })
    }

/*    componentDidUpdate(aa) {
        let a = document.getElementById('aa')
    }*/



    //全选/反选
    async onChangeState(){
        this.isUseSelectAll = true
        this.setState({selectAll:!this.state.checked});
        if(this.select.length<this.state.shopCarList.length){
            this.select = []
            await this.setState({selectAll:true})
            this.state.shopCarList.map(el=>{
                this.select.push(el.CAR_ID)
            })
        }else{
            this.setState({selectAll:false})
            this.select = []
        }

        this.countAmount()
        this.setState({toRender:1})
        console.log('selected',this.select)
    }

    //单选
    getSelect(state,id){
        this.isUseSelectAll = false
        console.log('state',state)
        if(state){
            this.select.push(id)
        }else{
            this.select = this.select.filter(el=>{
                if(el==id){
                    return false
                }
                return true
            })
        }
        this.countAmount()
        this.setState({toRender:1})
    }

    async editShopNum(id,count,type){
        await EditShopNum(id,count)
            .then(res=>{
                let num = this.selectNum[id]?this.selectNum[id]:0
                if(type){
                    this.selectDel[id] = false
                    this.selectNum[id] = num + 1
                }else{
                    if(count>0){
                        if(!this.selectDel[id]){
                            this.selectNum[id] = num -1
                        }
                    }
                }
                this.countAmount()
            })
            .catch(err=>{
                console.warn('更新购物车失败',err)
            })
    }

    //计算总价
    countAmount() {
        this.state.shopCarList.map(el=>{
            let num = this.selectNum[el.CAR_ID]?this.selectNum[el.CAR_ID]:0
            this.select.map(item=>{
                if(el.CAR_ID == item){
                    this.amount += el.PRICE*el.PRODUCT_NUM + el.PRICE*num
                }
            })
        })
        this.setState({amount:this.amount})
        this.amount = 0
    }

    //删除购物车
    async Del(id){
        this.selectDel[id] = true
        if(confirm("确定删除商品？")){
            await DelShopCar([id])
                .then(res=>{
                    /*this.over = false;
                    this.dataList = []
                    this.getShopCarList(1)*/
                    window.location.reload()
                    //this.countAmount()
                })
        }else{
            this.getShopCarList()
        }
    }

    async toSubmit(){
        if(this.select.length>0){
            await SettlementShopCar(this.select)
                .then(res=>{
                    console.log('购物车结算成功')
                    this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                })
        }else{
            alert('请选择商品')
        }
    }

    render() {
        const {shopCarList,amount,scrollTop} = this.state
        return (
            <div>
                <div className="containerNav bkg_color">
                    <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                        <div id='ListOutsite' style={{height: window.innerHeight-103}}
                             onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                             onTouchMove={this.onTouchMove}>

                            <ul id='ListInside'>
                                {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                                {
                                    shopCarList == ''?
                                       <IsShowEmptyImg
                                           styleSheet={{width:69,height:72,marginTop:120}}
                                           title={'列表是空的哦~'}
                                       />
                                        :
                                    shopCarList&&shopCarList.map((el,index)=>{
                                            return (
                                                <div className="plAll proPlay border_bottom">
                                                    <CheckBox
                                                        selectAll = {this.isUseSelectAll?this.state.selectAll:null}
                                                        index={index}
                                                        onSelect = {(state)=>this.getSelect(state,el.CAR_ID)}
                                                    />
                                                    <ItemDetails
                                                        price={el.PRICE}
                                                        title={el.NAME}
                                                        attr={el.ATTR_DESC}
                                                        imgurl={el.IMAGE}
                                                        num={el.PRODUCT_NUM}
                                                        changeNum ={(value,type)=>this.editShopNum(el.CAR_ID,value,type)}
                                                        del={value=>this.Del(el.CAR_ID,value)}
                                                    />
                                                </div>
                                            )
                                    })
                               }
                                <p ref="PullUp" id='PullUp'
                                   style={{display:this.state.display}}
                                >{this.pullUpTips[this.state.pullUpStatus]}</p>
                            </ul>
                        </div>
                    </div>
                    <div className="height5 wrap"></div>
                    <div className="pf bottomCount flex flex-align-center flex-pack-justify plr width100">
                        <div className="flex flex-align-center">
                            <span className="di check_radius pr fl">
                                <input
                                    type="checkbox" id="checkAll"
                                    checked={this.select.length==this.state.shopCarList.length?true:false}
                                    onClick={()=>this.onChangeState()}
                                    className="di isCheck"
                                />
                                <label htmlFor="checkAll"></label>
                            </span>
                            <span className="di font14 color6 ml5 height_all lh25">全选</span>
                            <div className="di ml5 flex flex-v">
                                <div>
                                    <label className="f12">合计</label>
                                    <span className="colorff f12">￥</span><span className="colorff font18">{amount}</span>
                                </div>
                                <span className="di f10 color9">不含运费</span>
                            </div>
                        </div>
                        <button
                            onClick={()=>this.toSubmit()}
                            className="settleAccount border_ra color_white"
                        >
                            结算
                        </button>
                    </div>
                </div>
                <div className="pf bottom0 wrap" style={{zIndex:100}}>
                    <nav className="bar-tab bkg_color wrap">
                        <Footer
                            index = {2}
                        />
                    </nav>
                </div>
            </div>
        );
    }
}
