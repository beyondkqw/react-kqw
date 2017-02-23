import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/personal.css';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {FollowList,Follow} from '../../Action/auth';
import {loadToken,getToken} from '../../Action/rpc'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class Collect extends Component {
      // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:null,
            visible:false,
            isIndex:null,
            ItemList:[],
            index:0,
            isShow:0,
            shopCarList:[],
            agentList:[],
            list: [],
            disabled:false,
            display:'block',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0,
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
            await this.getCollectList(this.page)
        }

    }

    async componentWillMount() {
        await loadToken()
        this.getCollectList(1)
    }

    //我的商品收藏列表
    async getCollectList(page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await FollowList(page)
            .then(res=>{
                if(this.page==Math.ceil(res.total/res.pageSize)){
                    this.over=true;
                    this.setState({
                        pullUpStatus: 4
                    });
                }
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({ItemList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
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
    //显示模态层
    isShow(id,index,e){
        e.stopPropagation()
        this.setState({id:id,visible:true,isIndex:index});
    }
    //隐藏模态层
    isHidden(){
        this.setState({visible:false});
    }
    /*取消收藏*/
    async isDetete(){
        const productId = this.state.id;
        //const index = this.state.isIndex;
        await this.getCollect(productId)
        .then(()=>{
            //this.state.ItemList.splice(index,1);
            this.getCollectList()
            this.setState({visible:false});
        })
    }

    async getCollect(productId){
        await Follow(productId,1)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //跳转到商品详情页
    jumpLink(productId){
        this.context.router.push({pathname:'/goodsDescription',
            query:{id:productId}})
    }

    render() {
        const {ItemList} = this.state
        return (
            <div className="containerNav">
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            {
                                ItemList == ''?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72,marginTop:120}}
                                        title={'收藏列表是空的哦~'}
                                    />
                                    :
                                    ItemList&&ItemList.map((el,index)=>{
                                    return(
                                        <div className="pt_collect border_bottom pr"
                                            onClick={()=>this.jumpLink(el.PRODUCT_ID)}
                                        >
                                            <div className="store_img pa">
                                                <img className="border_ra" src={el.IMAGE} alt=""/>
                                            </div>
                                            <div className="color6 mr45">
                                                <p className="font14 oh oh_height">{el.NAME}</p>
                                                <p className="color_yellow oh_height">
                                                    <span className="f12">￥</span><span className="font14">{el.CURRENT_PRICE}</span></p>
                                            </div>
                                            <div className="pa color6 cancel_collect">
                                                <button className="f12 cancel_btn border_ra"
                                                        onClick={(e)=>this.isShow(el.PRODUCT_ID,index,e)}
                                                >取消</button>
                                            </div>
                                        </div>)
                                    })
                                }
                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
                </div>
                    {/*模态层*/}
                    {this.state.visible?
                        <div>
                            <div className="modalNav pa width_100 height_all font14">
                                <div className="modal_body border_ra scale">
                                    <p className="isCancel border_bottom tc">确定删除？</p>
                                    <div className="chooseType">
                                        <button className="w50 border_right color_yellow"
                                            onClick = {()=>this.isDetete()}
                                        >确定</button>
                                        <button className="w50"
                                            onClick = {()=>this.isHidden()}
                                        >取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :null}
                </div>
        );
    }
}
