import React, { Component } from 'react';
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {RemarkList,Reply} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';

export default class EvaluationDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            remarkList:[],
            showMsg:false,
            replayName:'',
            parentID:'',
            index : 0,
            isShow:0,
            orderItems:[],
            agentList:[],
            list: [],
            disabled:false,
            display:'none',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0,
            commentIndex:0
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
/*
    componentWillMount() {
        this.getSellerRemarkList()
    }*/

    async fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        this.getSellerRemarkList()

    }


    //获取评论列表
    async getSellerRemarkList(){
        if(this.over){
            this.setState({
                pullUpStatus: 4
            });
            return
        }
        await RemarkList(this.props.location.query.id,this.page,'')
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
                this.setState({remarkList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //出现回复框
    ReplyMsg(name,commentID,index){
        this.setState({showMsg:true,replayName:name,parentID:commentID,commentIndex:index});
    }

    //发送回复
    async sendMsgOut(){
        const {commentIndex,remarkList}=this.state;
        await Reply(this.refs.sendMsg.value,this.state.parentID)
            .then(res=>{
                remarkList[commentIndex].REPLY.push({COMMENT:this.refs.sendMsg.value})
                this.setState({showMsg:false})
                // this.getSellerRemarkList()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {name,imgUrl,price,comment} = this.props.location.query
        const {remarkList,showMsg,replayName} = this.state
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'商品评价'}
                />

                <div className="border_bottom pr">
                    <StoreRow
                        title = {name}
                        price = {price}
                        imgurl = {imgUrl}
                        peopleRemark = {comment}
                        assess = {true}
                        showBorderBottom = {true}
                    />
                </div>
                <SplitLine />
                <div className="pa oa width_100" style={{top:165,bottom:0}}>
                    <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                        <div id='ListOutsite' style={{height: window.innerHeight-105}}
                             onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                             onTouchMove={this.onTouchMove}>

                            <ul id='ListInside'>
                                {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                                {
                                    remarkList == ''?
                                       <IsShowEmptyImg
                                           styleSheet={{width:69,height:72,marginTop:20}}
                                           title={'评论列表为空哦~'}
                                       />
                                        :
                                    remarkList&&remarkList.map((el,index)=>{
                                        return(
                                            <div>
                                                <div className="plAll border_bottom">
                                                    <div className="flex flex-pack-justify">
                                                        <div>
                                                            <span className="di  mr10" style={{width:30,height:30}}>
                                                                <img className="border_ra50" src={el.IMAGE_URI} alt=""/>
                                                            </span>
                                                            <span className="font14 color9">{el.MEMBER_NAME}</span>
                                                        </div>
                                                        <button
                                                            className="di f12 color_yellow border_ra border_ye pa_reply"
                                                            style={{height:22}}
                                                            onClick={()=>this.ReplyMsg(el.MEMBER_NAME,el.COMMENT_ID,index)}
                                                        >回复</button>
                                                    </div>
                                                    <p className="font14 color6 mt">{el.COMMENT}</p>
                                                    <p className="f12 color9 mt">{el.CREATE_TIME}</p>
                                                </div>
                                                {
                                                    el.REPLY&&el.REPLY.map(item=>{
                                                        return(
                                                            <div className="plAll border_bottom font14 color9">
                                                                掌柜回复:<span>{item.COMMENT}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
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
                </div>
                {
                    showMsg?
                        <div className="pa bottom0 z_index colore5 left0 right0 replyPadding" >
                            <span className="pa close"
                                  onClick={()=>this.setState({showMsg:false})}
                            >
                                <img src={require('../../Images/deiete_yellow.png')} alt=""/>
                            </span>
                            <textarea
                                name=""
                                className="width_100 color9 border_ra borderno f12"
                                style={{height:100}}
                                placeholder={'回复:@'+replayName}
                                ref="sendMsg"
                            ></textarea>
                            <buttton
                                className="fr color_yellow f12 border_ye pa_reply border_ra bkg_color"
                                onClick={()=>this.sendMsgOut()}
                            >发送</buttton>
                        </div>:null

                }


            </div>


        );
    }
}
