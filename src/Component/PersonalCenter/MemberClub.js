import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';

const MemberList = [
    {imgUrl:require('../../Images/total.png'),title:'自己消毒金额',describing:'5000.00',link:''},
    {imgUrl:require('../../Images/payment.png'),title:'直推人数',describing:'54',link:'/paymentOther'},
    {imgUrl:require('../../Images/used.png'),title:'团队人数',describing:'12',link:'/alreadyUsed'},
    {imgUrl:require('../../Images/diary.png'),title:'团队消费金额',describing:'4658748',link:'/diaryContainer'}
];
export default class MemberClub extends Component {

    render() {
        return (
            <div className="containerNav">
                <div className="club_height color_pink">
                    <div>
                        <Link to="/personalCenter/memberInfo">
                        <span className="di memberImg mr">
                            <img className="border_ra50" src={require('../../Images/store.png')} alt=""/>
                        </span>
                        <span className="f12 color6 ">聚朵云的天堂</span>
                        </Link>
                        <Link to="/personalCenter/memberIntroduction">
                        <div className="left_radio fr f12 color_white bkg_ff tc ml">
                            <span>V4会员</span>
                        </div>
                        </Link>
                    </div>
                    <div className="score color_yellow tc">
                        <div>
                            <span className="di vip_img"><img src={require('../../Images/iconfont-vip.png')} alt=""/></span>
                            <span className="font14">总分</span>
                        </div>
                        <p className="f25">865</p>
                    </div>
                </div>
                <SplitLine />
                <div className="clearAll" style={{height:'160'}}>
                    {
                        MemberList.map((el,index)=>{
                            return (
                                <CellComponent
                                    className={index%2==0?'border_right':''}
                                    imgUrl={el.imgUrl}
                                    title={el.title}
                                    describing={el.describing}
                                    link={el.link}
                                />
                            )
                        })
                    }
                </div>
                <SplitLine />
                <div className="chooseType font14 plr border_bottom">
                    <span className="color6">全国等级排名</span>
                    <span className="fr color9">查看更多</span>
                </div>
            </div>
        );
    }
}
