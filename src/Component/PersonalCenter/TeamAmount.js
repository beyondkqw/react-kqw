import React, { Component } from 'react';
import RankRow from './RankRow'
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';
import {EecommendList} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

const Itemlist =[
    {name:'今日积分收入',link:'/personalCenter/userInfo',imgurl:require('../../Images/common/incomeToday.png')},
    {name:'积分余额',link:'/personalCenter/savety',imgurl:require('../../Images/common/integralBalance.png')},
    {name:'可用积分',link:'/personalCenter/feedback',imgurl:require('../../Images/common/availableIntegral.png')},
    {name:'冻结积分',link:'/personalCenter/aboutDemo',imgurl:require('../../Images/common/frozen.png')},
    {name:'兑换记录',link:'/personalCenter/exchangeRecord',imgurl:require('../../Images/common/exchangeRecord.png')}
];
export default class TeamAmount extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Eecommend:[]
        };
    }

    /*    componentWillMount() {
     this.getEecommendList()
     }

     async getEecommendList(){
     await EecommendList()
     .then(res=>{
     this.setState({Eecommend:res.resultList})
     })
     .catch(err=>{
     console.warn('err',err)
     })
     }*/

    render() {
        return (
            <div className="containerNav">
                <div className="list-block m0">
                    <ul>
                        <Link to='/personalCenter/userInfo'>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="item-title height_all">
                                                    <span className="di" style={{width:20,height:20}}>
                                                    <img src={require('../../Images/common/incomeToday.png')} alt=""/>
                                                </span>
                                        <span className="di color6 ml5">今日积分收入</span>
                                        <span className="item-after fr color9 isSet">50积分</span>
                                    </div>
                                </div>
                            </li>
                        </Link>

                        <div className="line"></div>
                        <Link to='/personalCenter/savety'>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="item-title height_all">
                                                    <span className="di" style={{width:20,height:20}}>
                                                    <img src={require('../../Images/common/integralBalance.png')} alt=""/>
                                                </span>
                                        <span className="di color6 ml5">积分余额</span>
                                        <span className="item-after fr color9 isSet">50积分</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/personalCenter/feedback'>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="item-title height_all">
                                                    <span className="di" style={{width:20,height:20}}>
                                                    <img src={require('../../Images/common/availableIntegral.png')} alt=""/>
                                                </span>
                                        <span className="di color6 ml5">可用积分</span>
                                        <span className="item-after fr color9 isSet">50积分</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/personalCenter/aboutDemo'>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="item-title height_all">
                                                    <span className="di" style={{width:20,height:20}}>
                                                    <img src={require('../../Images/common/frozen.png')} alt=""/>
                                                </span>
                                        <span className="di color6 ml5">冻结积分</span>
                                        <span className="item-after fr color9 isSet">50积分</span>
                                    </div>
                                </div>
                            </li>
                        </Link>

                        <div className="line"></div>
                        <Link to='/personalCenter/exchangeRecord'>
                            <li className="item-content item-link pl border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner font14">
                                    <div className="item-title height_all">
                                                    <span className="di" style={{width:20,height:20}}>
                                                    <img src={require('../../Images/common/exchangeRecord.png')} alt=""/>
                                                </span>
                                        <span className="di color6 ml5">兑换记录</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

            /*toChange?
             <div className="containerNav allIncome_Img supplement">
             <div className="pa_top1 tc">
             <span className="di incomeImg">
             <img className="border_ra50" src={imgUrl} alt=""/>
             </span>
             <p className="f12 color9 mt5">{memberName}</p>
             <p className="f25 color6 mt6"><span>+</span><span>{amount?amount:0}</span></p>
             </div>
             </div>
             :
             <div className="pr">
             <div className="rankHeader flex flex-align-center flex-pack-justify-end">
             <div>
             <div className="di rank-head-cell font14 mr10">
             直推人数:{amount?amount:0}名
             </div>
             <div className="di rank-head-cell font14 mr10">
             直推消费:{palyMoney?palyMoney:0}
             </div>
             </div>
             </div>
             {
             Eecommend == ''?
             <IsShowEmptyImg
             styleSheet={{width:69,height:72,marginTop:20}}
             title={'查询列表为空哦~'}
             />
             :
             Eecommend&&Eecommend.map((el,index)=>{
             return(
             <RankRow
             _vipPoints={el.vipPoints}
             imgUrl={el.imageUri}
             memberName={el.memberName}
             num={index+1}
             more={true}
             vipPoints={el.lv}
             />
             )
             })
             }

             </div>*/
        );
    }
}