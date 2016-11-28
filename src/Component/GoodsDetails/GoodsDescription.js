import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import GoodsPopup from '../../Component/GoodsDetails/GoodsPopup'
import '../../Stylesheets/App/goodsDetails.css';
import {Details,Follow} from '../../Action/auth'
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class GoodsDescription extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow : false,
            isChecked:false,
            //商品详情
            goodsDetails:[],
            //是否收藏
            status:null
        };
    }
    //弹出popup
    popubAnimate(){
        this.setState({isShow:true});
    }

    componentWillMount() {
        this.getDetails()
    }

    //商品详情
    async getDetails(){
        await Details(1)
            .then(res=>{
                this.setState({goodsDetails:res});
                console.log('goodsDetails',this.state.goodsDetails);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //是否收藏
    async isFollow(){
        await this.setState({isChecked:!this.state.isChecked});
        //收藏
        console.log('istrue',this.state.isChecked );
        //收藏
        if(this.state.isChecked === true){
            this.setState({status:0});
            this.getFollow(this.state.status)
        //取消收藏
        }else{
            this.setState({status:1});
            this.getFollow(this.state.status)
        }
    }

    async getFollow(status){
        await Follow(1,status)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {goodsDetails} = this.state;
        return (
            <section className="containerNav">
                <div className="bannerImg">
                    <AutoPlaySwipeableViews
                        interval = {2000}
                    >
                        {
                            goodsDetails.BANNER&&goodsDetails.BANNER.map((el,index)=>{
                                return(
                                    <img src = {el.IMAGE}/>
                                )
                            })
                        }
                    </AutoPlaySwipeableViews>
                </div>
                <div className="width_100 goodDetails">
                    <div className="pl fl color6 pr_details border_dec width_80 font14 height_all">{goodsDetails.NAME}</div>
                    <div className="width_20 fl tc height_all" onClick={()=>this.isFollow()}>
                        <span className="di collect_img">
                            {this.state.isChecked?
                            <img src={require('../../Images/alreadyFollow.png')} alt=""/>
                            :<img src={require('../../Images/collect.png')} alt=""/>
                            }
                        </span>
                        <span className="f10 db color6">收藏</span>
                    </div>
                </div>
                <div className="mtlr">
                    <div>
                        <span className="colorff f12">￥</span><span className="colorff font18">{goodsDetails.CURRENT_PRICE}</span>
                        <a className="color_gray di f12 ml td_lt"><span>原价&nbsp;</span><span>{goodsDetails.PRICE}</span></a>
                    </div>
                    <div className="f12">
                        <span className="colorff ">卖家包邮</span>
                        <div className="fr">
                            <span>{goodsDetails.SALES}</span>人付款
                        </div>
                    </div>
                </div>
                <div className="list-block margin_tb">
                    <ul>
                        <Link to="/store">
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title">
                                        <span className="di store mr"><img src={require('../../Images/store.png')} alt=""/></span>
                                        <span className="color6 font14">挂花皮草阁</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <li className="item-content item-link pl" onClick={()=>this.popubAnimate()}>
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner margin0">
                                <div className="item-title">
                                    <span className="color6 font14">选择颜色，尺寸</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <SplitLine />

                <Tabscontrol>
                    <div name="商品介绍">
                        我是第一帧
                    </div>
                    <div name="商品参数">
                        我是第二帧
                    </div>
                    <div name="评论">
                        我是第三帧
                    </div>
                </Tabscontrol>

                <div className="height3 pf bottom0 width_100 plAll border_top bkg_color z_index">
                    <Link to="/shoppingCart">
                        <div className="di height_all pr fl width_cart">
                            <button className="cartBtn width_100 height_all border_ra">
                                <span className="di cartImg"><img src={require('../../Images/cart.png')} alt=""/></span>
                                <span className="di pa goodNum border_ra50 f12 colorff">5</span>
                            </button>
                        </div>
                    </Link>
                    <div className="width_de fl height_all"></div>
                    <div className="di height_all pr fl width_buy border_ra">
                        <button className="width_100 height_all color_white font16 color_white">
                            立即购买
                        </button>
                    </div>
                </div>
                {this.state.isShow?
                    <GoodsPopup
                        closePopUp = {()=>this.setState({isShow:false})}
                    />
                :null}
                <div className="goodBottom width_100"></div>
            </section>


        );
    }
}
