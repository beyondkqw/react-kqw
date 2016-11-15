import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import GoodsPopup from '../../Component/GoodsDetails/GoodsPopup'
import '../../Stylesheets/App/goodsDetails.css';

export default class GoodsDescription extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow : false
        };
    }
    popubAnimate(){
        this.setState({isShow:true});
    }
    render() {
        return (
            <section className="containerNav">
                <div className="bannerImg">
                    <img src={require('../../Images/clothesDetails.png')}/>
                </div>
                <div className="width_100 goodDetails">
                    <div className="pl fl color6 pr_details border_dec width_80 font14 height_all">拼接雪纺连衣裙拼接雪纺连衣裙拼接雪纺连衣裙拼接雪纺连衣裙</div>
                    <div className="width_20 fl tc">
                        <a>
                            <span className="di collect_img"><img src={require('../../Images/collect.png')} alt=""/></span>
                            <span className="f10 db color6">收藏</span>
                        </a>
                    </div>
                </div>
                <div className="mtlr">
                    <div>
                        <span className="colorff f12">￥</span><span className="colorff font18">258</span>
                        <a className="color_gray di f12 ml td_lt"><span>原价&nbsp;</span><span>328</span></a>
                    </div>
                    <div className="f12">
                        <span className="colorff ">卖家包邮</span>
                        <div className="fr">
                            <span>123</span>人付款
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

                <div className="height3 pf bottom0 width_100 plAll border_top">
                    <Link to="/shoppingCart">
                        <div className="di height_all pr">
                            <button className="cartBtn height_all border_ra width_cart bkg_color">
                                <span className="di cartImg"><img src={require('../../Images/cart.png')} alt=""/></span>
                                <span className="di pa goodNum border_ra50 f12 colorff">5</span>
                            </button>
                        </div>
                    </Link>
                    <div className="di height_all pr margin15">
                        <button className="borderno width_buy height_all border_ra">
                            <span className="font16 color_white">立即购买</span>
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
