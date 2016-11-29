import React, { Component } from 'react';
import {Link} from 'react-router';
import Footer from '../../Component/NewComponent/Footer';
import PersonalInformation from '../../Component/PersonalCenter/PersonalInformation';
import '../../Stylesheets/App/personal.css';

const personDetail = [
    {name:'待付款',imgUrl:require('../../Images/modify.png'),num:0,link:''},
    {name:'待收货',imgUrl:require('../../Images/modify.png'),num:0,link:''},
    {name:'待评价',imgUrl:require('../../Images/modify.png'),num:3,link:''},
    {name:'已评价',imgUrl:require('../../Images/modify.png'),num:0,link:''},
    {name:'全部订单',imgUrl:require('../../Images/modify.png'),num:0,link:'orderList'}
]
const ItemList = [
    {name:'我的合伙人',imgUrl:require('../../Images/partner.png'),link:'partner'},
    {name:'我的兑换',imgUrl:require('../../Images/change.png'),link:''},
    {name:'我的收藏',imgUrl:require('../../Images/enshirne.png'),link:'/personalCenter/collect'},
    {name:'我的余额',imgUrl:require('../../Images/balance.png'),link:''},
    {name:'微夺宝',imgUrl:require('../../Images/micro.png'),link:''},
    {name:'收货地址',imgUrl:require('../../Images/path.png'),link:''},
    {name:'同步微信资料',imgUrl:require('../../Images/wxinfo.png'),link:''},
    {name:'佣金转赠',imgUrl:require('../../Images/commission.png'),link:'/personalCenter/commisionGiving'},
    {name:'聚朵股权',imgUrl:require('../../Images/stock.png'),link:''}
]
export default class PersonalCenter extends Component {
    render() {
        return (
            <div>
                <PersonalInformation />
                <div className="h35 df color6 border_bottom">
                    <div className="flex1 tc">
                        <Link to="personalCenter/setting">
                        <p className="font16 hl8">0</p>
                        <p className="f12 m_top">佣金</p>
                        </Link>
                    </div>
                    <div className="flex1 tc">
                        <p className="font16 hl8">0</p>
                        <p className="f12 m_top">代金券</p>
                    </div>
                    <div className="flex1 tc">
                        <p className="font16 hl8">0</p>
                        <p className="f12 m_top">积分</p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="good_mr font14 color6">
                    我的订单
                </div>
                <div className="df border_top border_bottom ptb1">
                    {
                        personDetail.map(el=>{
                            return(
                                <Link to={el.link} className="di width_third width_100">
                                    <div className="flex1 tc pr">
                                        <p>
                                            <span className="di typeImg"><img src={el.imgUrl} alt=""/></span>
                                            {
                                              !el.num == 0?
                                                <span className="di f12 promptNav colorff border_ra50 pa">{el.num}</span>
                                              :null
                                            }
                                        </p>
                                        <p className="f12 m_top color6">{el.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="line"></div>
                <div className="width_100 countDiv">
                    {
                        ItemList.map(item=>{
                            return(
                                <Link to={item.link} className="di width_third width_100">
                                    <div className="separateRow tc di border_bottom border_right">
                                        <p>
                                            <span className="di separateRowImg"><img src={item.imgUrl} alt=""/></span>
                                        </p>
                                        <p className="f12 m_top color9">{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="footerHidden"></div>
                <Footer />
            </div>
        );
    }
}
