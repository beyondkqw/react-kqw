/**
 * Created by asus on 2016/11/24.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/personal.css';
import StoreRow from '../../Component/GoodsDetails/StoreRow'
import PublishComment from '../../Component/CommonComponent/PublishComment'
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {BrowseHistory,DelBrowseRecord} from '../../Action/auth'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',record:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',record:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',record:291,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
]


export default class BrowseRecord extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            historyList:[],
            historyImgShow:true,
            isDelete:false,
            delAll:false,
            browseId:'',
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
        this.getBrowseHistory(this.page)

    }

    //删除单条浏览记录
    async deleteItem(){
        await DelBrowseRecord(this.state.browseId)
            .then(res=>{
                this.setState({isDelete:false})
                this.over = false
                this.dataList = []
                this.page = 1
                this.getBrowseHistory()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //清空浏览记录
    async deleteRecord(){
        await DelBrowseRecord('')
            .then(res=>{
                this.setState({delAll:false})
                this.over = false
                this.dataList = []
                this.page = 1
                this.getBrowseHistory()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }


    async getBrowseHistory(page){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await BrowseHistory(page)
                .then(res=>{
                    if(this.page==Math.ceil(res.total/res.pageSize)){
                        this.over=true;
                        this.setState({
                            pullUpStatus: 4,
                        });
                    }
                    this.dataList = this.dataList.concat(res.resultList);
                    this.setState({historyList:this.dataList,display:(this.dataList.length==0)?'none':'block',historyImgShow:false});
                    this.iScrollInstance.refresh();
                    this.page++;
                    this.setState({
                        pullUpStatus: 3
                    });
                    if(this.dataList.length==0){
                        this.setState({historyImgShow:true})
                    }else{
                        this.setState({historyImgShow:false})
                        this.setState({historyList:res.resultList})
                    }
                })
                .catch(err=>{
                    console.warn('err',err)
                })
    }
    //跳转链接
    jumpToLink(productId){
        this.context.router.push({pathname:'/goodsDescription',
            query:{id:productId}})
    }

    render(){
        const {historyList,historyImgShow} = this.state
        return(
            <div className="containerNav">
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-50}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            {
                                historyImgShow?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72,marginTop:120}}
                                        title={'浏览记录列表是空的哦~'}
                                    />
                                    :
                                historyList&&historyList.map(el=>{
                                    return(
                                        <StoreRow
                                            title = {el.NAME}
                                            record = {el.CURRENT_PRICE}
                                            imgurl = {el.IMAGE}
                                            //browseId = {el.BROWSE_ID}
                                            toDelete = {()=>this.setState({isDelete:true,browseId:el.BROWSE_ID})}
                                            onClick={()=>this.jumpToLink(el.PRODUCT_ID)}
                                        />
                                    )
                                })
                            }
                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
                </div>

            {/*<div style={{position: 'absolute',top: 0,bottom: 0,left: 0,height: '100%',width: '100%'}}>
                <div className="touchMove" style={{position:'absolute',top:0,right:0,left:0,bottom:'2.5rem',overflow:'auto'}}>
                    {
                        historyImgShow?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'浏览记录列表是空的哦~'}
                            />
                            :
                        historyList&&historyList.map(el=>{
                            return(
                                <StoreRow
                                    title = {el.NAME}
                                    record = {el.CURRENT_PRICE}
                                    imgurl = {el.IMAGE}
                                    //browseId = {el.BROWSE_ID}
                                    toDelete = {()=>this.setState({isDelete:true,browseId:el.BROWSE_ID})}
                                    onClick={()=>this.jumpToLink(el.PRODUCT_ID)}
                                />
                            )
                        })
                    }
                </div>*/}

                {
                    historyImgShow?
                    null
                    :<section>
                        <div className="footerHidden"></div>
                        <div className="width_100 commit bkg_ff pf bottom0">
                            <button
                                onClick={()=>this.setState({delAll:true})}
                                className="width_100 height_all color_white"
                            >清空浏览记录</button>
                        </div>
                    </section>
                }
                {
                    this.state.isDelete?
                        <Modal
                            title = {'确定删除浏览记录?'}
                            onClick = {()=>this.deleteItem()}
                            toHideModal={()=>this.setState({isDelete:false})}
                        />
                        :null
                }
                {
                    this.state.delAll?
                        <Modal
                            title = {'确定删除浏览记录?'}
                            onClick = {()=>this.deleteRecord()}
                            toHideModal={()=>this.setState({delAll:false})}
                        />
                        :null
                }

            </div>
        )
    }
}