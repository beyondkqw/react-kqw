/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import Search from '../../Component/NewComponent/Search';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';
import StoreDetails from '../../Component/GoodsDetails/StoreDetails';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import {ProductList} from '../../Action/auth';
import {Link} from 'react-router'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class SearchPage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.compositor = ['默认排序','价格从低到高','价格从高到低']
        this.state = {
            isChoose : 0,
            display_0 : false,
            display_2 : false,
            showByColumn : false,
            history : false,
            orderName:'',
            order:'',
            goodsList:[],
            minPrice:'',
            maxPrice:'',
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
            const index = this.state.index;
            if(index==0){
                this.getOrder('',this.state.order,this.state.orderName,'','',this.page);
            }else if(index==1){
                this.getOrder('','asc','p.SALES','','',this.page)
            }else if(index==2){
                this.getOrder('','','',this.state.minPrice,this.state.maxPrice,this.page)
            }else if(index==3){
                //this.upDownOrder()
                this.iScrollInstance.refresh();
            }
        }

    }

    async componentWillMount(){
        await this.getOrder((this.props.location.query.value?this.props.location.query.value:''),'','','','',1,(this.props.location.query.type?this.props.location.query.type:0));
    }

    //搜索
    async SearchBtn(value){
        //const name = this.props.location.query.value?this.props.location.query.value:''
        this.over = false;
        this.page = 1
        this.dataList = []
        await this.getOrder(value,'','','','');
    }

    //排序的列表
    async SelectSortOrder(index){
        this.page=1;
        this.setState({isChoose:index})
        await    this.ChooseOneorder(index)
        this.getOrder('',this.state.order,this.state.orderName,'','');
        this.setState({display_0:false})
    }

    //设置价格区间
    async comfirmPrice(){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        await this.setState({
            goodsList:[],
            display:'none'
        });
        await this.getOrder('','','',this.state.minPrice,this.state.maxPrice)
        this.setState({display_2:false})
    }

    //销量优先
    async SalesPreferred(){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        await this.setState({
            goodsList:[],
            display:'none'
        });
        await this.getOrder('','asc','p.SALES','','')
    }

    //上下排序
    //async upDownOrder(){
    //    await this.getOrder('','','','','')
    //}

    //请求列表接口
    async getOrder(name,order,orderName,minPrice,maxPrice,page,type){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await ProductList(name,order,orderName,minPrice,maxPrice,page,type)
        .then(res=>{
            if(this.page==Math.ceil(res.total/res.pageSize)){
                this.over=true;
                this.setState({
                    pullUpStatus: 4
                });
            }
            this.dataList = this.dataList.concat(res.resultList);
            this.setState({goodsList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
            this.iScrollInstance.refresh();
            this.page++;
            this.setState({
                pullUpStatus: 3
            });
            console.log('res.resultList=======>',res.resultList)
        })
        .catch(err=>{
            console.warn('err',err)
        })
    }
    //选择某种排序方式
    ChooseOneorder(index){
        this.dataList=[];
        this.over = false;
        this.page = 1;
        this.setState({
            goodsList:[],
            display:'none',
            orderName:'p.CURRENT_PRICE'
        });
        if(index === 0){
            this.setState({order:''});
            this.setState({orderName:''});
        }else if(index === 1){
            this.setState({order: 'asc'});
        }else if(index === 2){
            this.setState({order: 'desc'});
        }else{
            this.setState({order: ''});
        }
    }
    //选择排序方式
    chooseSortOrder(){
        const {display_0,isChoose} = this.state
        return(
            display_0?
                <ul className='compositor'>
                    {
                        this.compositor.map((el,index)=>{
                            return(
                                <li
                                    key = {index}
                                    onClick={()=>this.SelectSortOrder(index)}
                                    style={{background:isChoose==index?'#fff5f0':'#fff'}}
                                >
                                    <span style={{color:isChoose==index?'#ff5500':'#666'}}>{el}</span>
                                    {
                                        isChoose==index?
                                            <img src={require('../../Images/choose.png')} />
                                            :null
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
                :null
        )
    }

    //筛选内容
    toScreen(){
        const {display_2} = this.state
        return(
            display_2?
                <div className="screen">
                    <p>价格范围选择</p>

                    <div>
                        <input placeholder="最低价"
                               ref="minPrice"
                               onChange={()=>this.setState({minPrice:this.refs.minPrice.value})}
                        />
                        <div className="liner" />
                        <input placeholder="最高价"
                               ref="maxPrice"
                               onChange={()=>this.setState({maxPrice:this.refs.maxPrice.value})}
                        />
                    </div>

                    <div>
                        <input
                            className="reset"
                            type="button"
                            value="重置"
                            onClick={()=>{this.refs.minPrice.value = '',this.refs.maxPrice.value = ''}}
                        />
                        <div className="blank" />
                        <input
                            className="makesure"
                            type="button"
                            value="确定"
                            onClick={()=>this.comfirmPrice()}
                        />
                    </div>
                </div>
                :null
        )
    }

    //tab切换
    async onChange(index){
        if(index!=3){
            this.setState({index:index})
        }
        const {display_0,display_2,showByColumn} = this.state
        //console.log('display',display_0)
        if(index==0){
            this.setState({display_0:!display_0,display_2:false})
        }else if(index==1){
            this.SalesPreferred()
            this.setState({display_0:false,display_2:false})
        }else if(index==2){
            this.setState({display_2:!display_2,display_0:false})
        }else if(index==3){
            this.setState({showByColumn:!showByColumn,display_2:false,display_0:false});
            await this.fetchItems(true)
            this.iScrollInstance.refresh();
            this.iScrollInstance.y=0;
        }else{
            this.setState({display_2:false,display_0:false})
        }
    }

    render(){
        const {showByColumn,display_0,display_2,history,goodsList} = this.state
        return(
            <div className="containerNav"
                 style={{backgroundColor: showByColumn?'#fff':'rgb(245,245,245)'}}
            >
                <div className = 'searchContainer' style={{height:display_0||display_2?null:75}}>
                    <Search
                        location = {true}
                        onClick = {(value)=>this.SearchBtn(value)}
                        display = {this.state.history}
                        style={{backgroundColor:'#ff5500'}}
                    />
                    {/*todo scroll滚动时置顶fixed*/}
                    <Tabscontrol
                        index = {2}
                        onClick = {(index)=>this.onChange(index)}
                    >
                        {/*综合排序tag*/}
                        <div name="综合排序">
                            {
                                this.chooseSortOrder()
                            }
                        </div>

                        {/*销量优先---tag*/}
                        <div name="销量优先"
                             onClick={()=>this.SalesPreferred()}
                        >
                        </div>

                        {/*筛选tab*/}
                        <div
                            name={<span><img src={require('../../Images/screen.png')} className = 'screenImg'/>筛选</span> }
                        >
                            {  this.toScreen() }
                        </div>

                        {/*切换显示方式*/}
                        <div name={<img src={require('../../Images/array.png')} className='arrayImg'/>}>
                        </div>
                    </Tabscontrol>

                    {/*modal遮罩层*/}
                    {
                        display_0||display_2?
                            <div
                                className="cover"
                                onClick = {()=>this.setState({display_0:false,display_2:false})}
                            ></div>
                            :null
                    }
                </div>

                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-73,marginTop:73}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>
                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            <div className="imgContainer width_100">
                                {
                                    goodsList == ''?
                                        <IsShowEmptyImg
                                            styleSheet={{width:69,height:72,marginTop:120}}
                                            title={'查询列表是空的哦~'}
                                        />
                                        :
                                    goodsList&&goodsList.map((el,index)=>{
                                        return (
                                            showByColumn?
                                                <Link to = {'/goodsDescription/'} query = {{id:el.ID}}>
                                                    <StoreRow
                                                        title = {el.NAME}
                                                        price = {el.CURRENT_PRICE}
                                                        imgurl = {el.IMAGE}
                                                        sales = {el.SALES}

                                                    />
                                                </Link>
                                                :
                                                <Link to = {'/goodsDescription/'} query = {{id:el.ID}}>
                                                    <StoreDetails
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
        )
    }
}