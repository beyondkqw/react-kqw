import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CellComponent from '../../Component/CommonComponent/CellComponent';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {MemberInfo} from '../../Action/auth'

export default class MemberClub extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            clubInfo:'',
            list:[]
        };
      }

    componentWillMount() {
        this.getMemberInfo()
    }

    async getMemberInfo(){
        await MemberInfo()
        .then(res=>{
            console.log('俱乐部',res)
            this.setState({clubInfo:res,list:res.FIRST_THREE_ACCOUNT})
        })
        .catch(err=>{
            console.log('getMemberInfo',err)
        })
    }

    render() {
        const {clubInfo,list} = this.state
        return (
            <div className="containerNav">
                <div className="club_height member_bkImg">
                    <div>
                        <span className="di memberImg mr">
                            <img className="border_ra50" src={clubInfo.IMAGE_URI} alt=""/>
                        </span>
                        <span className="f12 color_white">{clubInfo.MEMBER_NAME}</span>
                        <Link
                            to="/personalCenter/memberIntroduction"
                            query={{vipPoint:clubInfo.VIP_POINTS?clubInfo.VIP_POINTS:0}}
                        >
                            <div className="left_radio fr f12 color_yellow tc ml">
                                <span>V{clubInfo.LV}会员</span>
                            </div>
                        </Link>
                    </div>
                    <Link to="/personalCenter/memberInfo" query={{accId:clubInfo.ID}}>
                        <div className="score color_white tc">
                            <div>
                                <span className="di vip_img"><img src={require('../../Images/iconfont-vip.png')} alt=""/></span>
                                <span className="font14">总分</span>
                            </div>
                            <p className="f25">{clubInfo.VIP_POINTS?clubInfo.VIP_POINTS:0}</p>
                        </div>
                    </Link>
                </div>
                <SplitLine />
                <div className="clearAll" style={{height:'160'}}>
                    <Link to="/personalCenter/teamAmount"
                          query={{imgUrl:clubInfo.IMAGE_URI,memberName:clubInfo.MEMBER_NAME,amount:clubInfo.USE_AMOUNT}}>
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/total.png')}
                            title='直推消费金额'
                            describing={clubInfo.USE_AMOUNT}
                            //link={el.link}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/teamAmount"
                        query={{imgUrl:clubInfo.IMAGE_URI,memberName:clubInfo.MEMBER_NAME,amount:clubInfo.DIRECT_PUSH_COUNT}}>
                        <CellComponent
                            imgUrl={require('../../Images/payment.png')}
                            title={'直推人数'}
                            describing={clubInfo.DIRECT_PUSH_COUNT}
                            //link={'/paymentOther'}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/countryRank"
                        query={{toShowTeam:true,teemCount:clubInfo.TEEM_MEMBER_COUNT,teemAmount:clubInfo.TEEM_MEMBER_COUNT}}>
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/used.png')}
                            title={'团队人数'}
                            describing={clubInfo.TEEM_MEMBER_COUNT}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/teamAmount"
                        query={{imgUrl:clubInfo.IMAGE_URI,memberName:clubInfo.MEMBER_NAME,amount:clubInfo.TEEM_MEMBER_AMOUNT}}>
                            <CellComponent
                                imgUrl={require('../../Images/diary.png')}
                                title={'团队消费金额'}
                                describing={clubInfo.TEEM_MEMBER_AMOUNT}
                                //link={'/personalCenter/teamAmount'}
                            />
                    </Link>
                </div>
                <SplitLine />
                <div className="chooseType font14 plr border_bottom">
                    <span className="color6">全国等级排名</span>
                    <Link to="/personalCenter/countryRank" query={{point:clubInfo.VIP_POINTS?clubInfo.VIP_POINTS:0}}>
                        <span className="fr color9">查看更多</span>
                    </Link>
                </div>
                {
                    list.map((el,index)=>{
                        return(
                            <RankRow
                                imgUrl={el.imageUri}
                                memberName={el.memberName}
                                vipPoints={el.lv}
                                more={true}
                                vip={index+1}
                                _vipPoints={el.vipPoints}
                            />
                        )
                    })
                }

            </div>
        );
    }
}
