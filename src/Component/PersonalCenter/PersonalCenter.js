import React, { Component } from 'react';
import {Link} from 'react-router';
import Footer from '../../Component/NewComponent/Footer';
//import PersonalInformation from '../../Component/PersonalCenter/PersonalInformation';
import OrderDetails from '../../Component/Orders/OrderDetails'
import '../../Stylesheets/App/personal.css';
import {MyInfo} from '../../Action/auth'

const personDetail = [
    {name:'待付款',imgUrl:require('../../Images/modify.png'),num:0,link:'/orderList'},
    {name:'待收货',imgUrl:require('../../Images/modify.png'),num:0,link:'/orderList'},
    {name:'待评价',imgUrl:require('../../Images/modify.png'),num:0,link:'/orderList'},
    {name:'已评价',imgUrl:require('../../Images/modify.png'),num:0,link:'/orderList'}
    /*{name:'全部订单',imgUrl:require('../../Images/modify.png'),num:0,link:'/orderList'}*/
]
const ItemList = [
    /*{name:'我的合伙人',imgUrl:require('../../Images/partner.png'),link:'partner'},*/
    {name:'我的合伙人',imgUrl:require('../../Images/partner.png'),link:'/personalCenter/memberClub'},
    {name:'会员中心',imgUrl:require('../../Images/change.png'),link:'/personalCenter/memberClub'},
    {name:'我的收藏',imgUrl:require('../../Images/enshirne.png'),link:'/personalCenter/collect'},
    {name:'我的佣金',imgUrl:require('../../Images/balance.png'),link:'/personalCenter/myCharges'},
    {name:'我的足迹',imgUrl:require('../../Images/micro.png'),link:'/personalCenter/BrowseRecord'},
    {name:'收货地址',imgUrl:require('../../Images/path.png'),link:'/chooseInfomation'},
    {name:'同步微信资料',imgUrl:require('../../Images/wxinfo.png'),link:''},
    {name:'聚朵股权',imgUrl:require('../../Images/stock.png'),link:'/personalCenter/jdyStock'},
    {name:'期待更多',imgUrl:require('../../Images/expectmore.png'),link:'/personalCenter/jdyStock'}
]
export default class PersonalCenter extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name : '',
            amount : 0,
            point : 0,
            lv : 0,
            vip_point : 0,
            headImg:'',
            accId:'',
            mobile:''
        };
      }

    componentWillMount() {
        this.getMyInfo()
    }

    async getMyInfo(){
       await MyInfo()
        .then(res=>{
            console.log('个人资料',res)
            this.setState({
                name : res.MEMBER_NAME,
                amount : res.NOW_AMOUNT,
                point : res.NOW_POINTS,
                lv : res.LV,
                vip_point : res.VIP_POINTS,
                headImg:res.IMAGE_URI,
                accId:res.ID,
                now_amount:res.NOW_AMOUNT,
                mobile:res.MOBILE,
                frozen:res.FROZEN
            })
        })
    }

    render() {
        const {name,amount,point,lv,vip_point,accId,now_amount,mobile,frozen} = this.state
        return (
            <div className="containerNav">
                <div className="wrap">
                    <section className="pr tc center_bkImg" style={{paddingTop: 10,paddingBottom: 15}}>
                        <Link to="personalCenter/userInfo">
                            <div className="personLogo">
                                <img className="border_ra50" src={require('../../Images/store.png')} alt=""/>
                            </div>
                        </Link>
                        <Link to="/personalCenter/setting">
                            <span className="pa setUp font14 color_white">设置</span>
                        </Link>
                        <div className="font14 color_white" style={{marginTop:15}}>{name}</div>
                        <div className="bak_img pr">
                            <Link to="/personalCenter/memberClub">
                                <span className="di vipImg pa"><img src={require('../../Images/vip.png')} alt=""/></span>
                                <span className="f12 color_yellow">{vip_point?vip_point:0}</span>
                            </Link>
                        </div>
                    </section>
                    <div className="h35 df color6 border_bottom">
                        <div className="flex1 tc">
                            <p className="font16 hl8">{amount}</p>
                            <p className="f12 m_top">佣金</p>
                        </div>
                    </div>
                    <Link to="/personalCenter/setting" query={{resetMobile:mobile}}>
                        <span className="pa setUp font14 color_white">设置</span>
                    </Link>
                    <div className="font14 color_white" style={{marginTop:10,height:15}}>{name}</div>
                    <div className="bak_img pr">
                        <Link to="/personalCenter/memberClub">
                            <span className="di vipImg pa"><img src={require('../../Images/vip.png')} alt=""/></span>
                            <span className="f12 color_yellow">{vip_point?vip_point:0}</span>
                        </Link>
                    </div>
                    <div className="df border_top border_bottom ptb1">
                        {
                            personDetail&&personDetail.map((el,index)=>{
                                return(
                                    <Link to={el.link} className="di width_third width_100" query={{index:index}}>
                                        <div className="flex1 tc pr">
                                            <p>
                                                <span className="di typeImg"><img src={el.imgUrl} alt=""/></span>
                                                {
                                                  !(el.num === 0)?
                                                    <span className="di f12 promptNav colorff border_ra50 pa">{el.num}</span>
                                                  :null
                                                }
                                            </p>
                                            <p className="f12 m_top color9">{el.name}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className="line"></div>
                    <div className="width_100 countDiv">
                        {
                            ItemList&&ItemList.map(item=>{
                                return(
                                    <Link to={item.link} className="di width_third width_100" query={{memberId:accId}}>
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
                    <div className="wrap">
                        <div className="pf bottom0 wrap" style={{zIndex:100}}>
                            <nav className="bar-tab bkg_color wrap">
                                <Footer />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="plAll">
                    <span className="font14 color6">我的订单</span>
                    <Link className="fr" to="/orderList" query={{index:4}}>
                        <span className="f12 color9">全部订单</span>
                    </Link>
                </div>
                <div className="df border_top border_bottom ptb1">
                    {
                        personDetail&&personDetail.map((el,index)=>{
                            return(
                                <Link to={el.link} className="di width_third width_100" query={{index:index}}>
                                    <div className="flex1 tc pr">
                                        <p>
                                            <span className="di typeImg"><img src={el.imgUrl} alt=""/></span>
                                            {
                                              !(el.num === 0)?
                                                <span className="di f12 promptNav colorff border_ra50 pa">{el.num}</span>
                                              :null
                                            }
                                        </p>
                                        <p className="f12 m_top color9">{el.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="line"></div>
                <div className="width_100 countDiv">
                    {
                        ItemList&&ItemList.map((item,index)=>{
                            return(
                                <Link
                                    to={item.link}
                                    className="di width_third width_100"
                                    query={{memberId:accId,now_amount:now_amount,frozen:frozen}}
                                >
                                    <div className={index%3==0||index%3==1?
                                    "separateRow tc di border_bottom  border_right":
                                    "separateRow tc di border_bottom"}>
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
