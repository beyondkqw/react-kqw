import React, { Component,PropTypes } from 'react';
import Search from '../../Component/NewComponent/Search'
import Carousel from '../../Component/NewComponent/Carousel'
import Footer from '../../Component/NewComponent/Footer'
import OtherApp from '../../Component/NewComponent/OtherApp'
import ActiveTitle from '../../Component/NewComponent/ActiveTitle'
import Cell_3 from '../../Component/NewComponent/Cell_3'
import Cell_4 from '../../Component/NewComponent/Cell_4'
import Cell_6 from '../../Component/NewComponent/Cell_6'
import Cell_7 from '../../Component/NewComponent/Cell_7'
import SplitLine from '../../Component/NewComponent/SplitLine'
import {loadToken,saveToken,clearToken,GetQueryString,bodyScroll} from '../../Action/rpc'
import {WechatAuth} from '../../Action/autoLogin'
import {Link} from 'react-router';
import iScroll from 'iscroll/build/iscroll-probe';
import {ShopFloor,StoreList} from '../../Action/auth';
import $ from 'jquery';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/scroll.css';

export default class CloudComprehensive extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            banner : [],
            moudle : [],
            goodsList:[],
            display:'block',
            items: [],
            listPage:1,
            goodsList:'',
            city:''
        };
        this.page = 1;
        this.list=''
    }

    componentDidMount() {
        document.querySelector('body').addEventListener('touchmove',bodyScroll, false);
        var that = this;
        var myScroll;
        var pullDownEl, pullDownL;
        var pullUpEl, pullUpL;
        var Downcount = 0 ,Upcount = 0;
        var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新


        pullDownEl = $('#pullDown');
        pullDownL = pullDownEl.find('.pullDownLabel');
        pullDownEl['class'] = pullDownEl.attr('class');
        pullDownEl.attr('class','').hide();

        pullUpEl = $('#pullUp');
        pullUpL = pullUpEl.find('.pullUpLabel');
        pullUpEl['class'] = pullUpEl.attr('class');
        pullUpEl.attr('class','').hide();

        myScroll = new iScroll('#content', {
            preventDefault: false,
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: true,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce:true,//边界反弹
            interactiveScrollbars:true,//滚动条可以拖动
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: true ,// 允许点击事件
            keyBindings:true,//允许使用按键控制
            momentum:true// 允许有惯性滑动
        });
        //滚动时
        myScroll.on('scroll', function(){
            //document.querySelector('body').addEventListener('touchmove',bodyScroll, false);
            console.log(this.y);
            if(loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')){
                if (this.y > 5) {
                    //下拉刷新效果
                    pullDownEl.attr('class',pullUpEl['class'])
                    pullDownEl.show();
                    myScroll.refresh();
                    pullDownEl.addClass('flip');
                    pullDownL.html('下拉刷新...');
                    loadingStep = 1;
                }else if (this.y < (this.maxScrollY - 5) && that.state.storeDetail.length>0) {
                    if(that.state.listPage!=that.page){
                        //上拉刷新效果
                        pullUpEl.attr('class',pullUpEl['class'])
                        pullUpEl.show();
                        myScroll.refresh();
                        pullUpEl.addClass('flip');
                        pullUpL.html('上拉加载...');
                        loadingStep = 1;
                    }
                }
            }

        });
        myScroll.on('touchmove', function(e){
            e.stopPropagation()
            this.setState({
                scrollTop:(this.iScrollInstance.y<0)?Math.abs(this.iScrollInstance.y):0
            })
        });
        //滚动完毕
        myScroll.on('scrollEnd',function(){
            if(loadingStep == 1){
                if (pullUpEl.attr('class').match('flip|loading')) {
                    pullUpEl.removeClass('flip').addClass('loading');
                    pullUpL.html('Loading...');
                    loadingStep = 2;
                    pullUpAction();
                }else if(pullDownEl.attr('class').match('flip|loading')){
                    pullDownEl.removeClass('flip').addClass('loading');
                    pullDownL.html('Loading...');
                    loadingStep = 2;
                    pullDownAction();
                }
            }
        });

        function pullDownAction() {//下拉事件
            that.page=1;
            if(that.props.location.query.value){
                that.getStoreList('','',that.props.location.query.value,that.page)
            }else{
                that.getStoreList('','',sessionStorage.getItem('city'),that.page)
            }

            pullDownEl.removeClass('loading');
            pullDownL.html('下拉刷新...');
            pullDownEl['class'] = pullDownEl.attr('class');
            pullDownEl.attr('class','').hide();
            myScroll.refresh();
            loadingStep = 0;
        }
        function pullUpAction() {//上拉事件
            if(that.state.listPage>that.page){
                that.page++;
                if(that.props.location.query.value){
                    that.getStoreList('','',that.props.location.query.value,that.page)
                }else{
                    that.getStoreList('','',sessionStorage.getItem('city'),that.page)
                }
            }
            pullUpEl.removeClass('loading');
            pullUpL.html('上拉显示更多...');
            pullUpEl['class'] = pullUpEl.attr('class');
            pullUpEl.attr('class','').hide();
            myScroll.refresh();
            loadingStep = 0;
        }
    }

    componentWillUnmount() {
        document.querySelector('body').removeEventListener('touchmove',bodyScroll, false);
    }


    static contextTypes = {
        router:PropTypes.object
    }

    async componentWillMount() {
        this.getShopFloor()
        if(this.props.location.query.value){
            this.page = 1;
            this.setState({city:this.props.location.query.value})
            this.getStoreList('','',this.props.location.query.value,1)
        }else{
            this.setState({city:sessionStorage.getItem('city')})
            this.getStoreList('','',sessionStorage.getItem('city'),1)
        }
    }

    //首页模块
    async getShopFloor(){
        await ShopFloor()
            .then(res=>{
                console.log('首页模块',res)
                this.setState({moudle:res})
            })
            .catch(err=>{
                console.warn('getHomeMoudle',err)
            })
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
        this.getStoreList('',value,this.props.location.query.value,1)
    }

    //请求列表接口
    async getStoreList(type,name,cityName,page){
        await StoreList(type,name,cityName,page)
            .then(res=>{
                const page = Math.ceil(res.total/res.pageSize);
                this.setState({listPage:page})
                if(page==1){
                    this.list = res.resultList;
                    this.setState({storeDetail:this.list})
                }else{
                    this.list = this.list.concat(res.resultList);
                    this.setState({storeDetail:this.list})
                }
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    render() {
        const {moudle,storeDetail} = this.state
        return (
            <div>
                <div className="flex pf t0 width100" style={{zIndex:2,transform: 'translate3d(0,0,0)',left:0}}>
                    <div
                        className="flex tc bkg_ff flex-pack-center flex-align-center flex-v"
                        style={{paddingLeft:5}}
                    >
                         <Link to ='/chooseCity'>
                            <span className="di" style={{width:18,height:16,lineHeight:0,marginTop:5}}>
                                <img src={require('../../Images/common/classification.png')} alt=""/>
                            </span>
                            <p className="f10 color_white">{this.props.location.query.value?this.props.location.query.value:sessionStorage.getItem('city')}</p>
                         </Link>
                    </div>
                    <div className="flex1">
                        <Search
                            style={{backgroundColor:'#ff5500'}}
                            location = {true}
                            onClick={(value)=>this.searchStore(value)}
                        />
                    </div>
                </div>
                <div id="content" className="bkg_color" style={{top:44,bottom:50}}>
                    <div id="scroller" style={{minHeight:window.innerHeight-93}}>
                        <div id="pullDown" className="ub ub-pc c-gra">
                            <div className="pullDownIcon"></div>
                            <div className="pullDownLabel">下拉刷新</div>
                        </div>
                        <div id="add">
                            <OtherApp
                                type = {2}
                            />
                            {
                                moudle&&moudle.map(el=>{
                                    if(el.num == 3){
                                        return(
                                            <div>
                                                <ActiveTitle
                                                    img = {el.img}
                                                    title = {el.name}
                                                />
                                                <Cell_3
                                                    city = {this.state.city}
                                                    isShop = {true}
                                                    imgUrl = {el.cells}
                                                />
                                                <SplitLine />
                                            </div>
                                        )
                                    }else if(el.num == 4){
                                        return(
                                            <div>
                                                <ActiveTitle
                                                    img = {el.img}
                                                    title = {el.name}
                                                />
                                                <Cell_4
                                                    city = {this.state.city}
                                                    isShop = {true}
                                                    imgUrl = {el.cells}
                                                />
                                                <SplitLine />
                                            </div>
                                        )
                                    } else if(el.num == 6){
                                        return(
                                            <div>
                                                <ActiveTitle
                                                    img = {el.img}
                                                    title = {el.name}
                                                />
                                                <Cell_6
                                                    city = {this.state.city}
                                                    isShop = {true}
                                                    imgUrl = {el.cells}
                                                />
                                                <SplitLine />
                                            </div>
                                        )
                                    }else if(el.num == 7){
                                        return(
                                            <div>
                                                <ActiveTitle
                                                    img = {el.img}
                                                    title = {el.name}
                                                />
                                                <Cell_7
                                                    city = {this.state.city}
                                                    isShop = {true}
                                                    imgUrl = {el.cells}
                                                />
                                                <SplitLine />
                                            </div>
                                        )
                                    }
                                })
                            }

                            {
                                storeDetail&&storeDetail.map(el=>{
                                    return(
                                        <Link to="/store" query={{storeId:el.id}}>
                                            <div className="_order_height border_bottom pr plAll df">
                                                <div className="_order_img height_all">
                                                    <img src={el.img?el.img:require('../../Images/common/default.png')} alt=""/>
                                                </div>
                                                <div className="flex1 font14 _order_margin">
                                                    <p className="color6 db">{el.name}</p>
                                                    <p className="color9 f12">{el.desc}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div id="pullUp" className="ub ub-pc c-gra">
                            <div className="pullUpIcon"></div>
                            <div className="pullUpLabel">上拉显示更多...</div>
                        </div>
                    </div>
                </div>
                <Footer
                    index = {1}
                />
            </div>

        );
    }
}
