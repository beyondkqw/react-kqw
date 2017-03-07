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
                    <div className="flex flex-pack-justify flex-align-center">
                        <div>
                            <span className="di memberImg mr">
                            <img className="border_ra50" src={clubInfo.IMAGE_URI} alt=""/>
                        </span>
                            <span className="f12 color_white">{clubInfo.MEMBER_NAME}</span>
                        </div>
                        <Link
                            to="/personalCenter/memberIntroduction"
                            query={{vipPoint:clubInfo.VIP_POINTS?clubInfo.VIP_POINTS:0}}
                        >
                            <div className="left_radio f12 color_yellow tc">
                                <span>V{clubInfo.LV?clubInfo.LV:0}会员</span>
                            </div>
                        </Link>
                    </div>
                    <Link to="/personalCenter/memberInfo" query={{accId:clubInfo.ID}}>
                        <div className="score color_white tc">
                            <div>
                                <span className="di vip_img"><img src={require('../../Images/iconfont-vip.png')} alt=""/></span>
                                <span className="font14">等级</span>
                            </div>
                            <p className="f25">{clubInfo.LV?clubInfo.LV:0}</p>
                        </div>
                    </Link>
                </div>
                <SplitLine />
                <div className="clearAll" style={{height:'8rem'}}>
                    <Link to="/personalCenter/teamAmount"
                          query={{
                          imgUrl:clubInfo.IMAGE_URI,
                          memberName:clubInfo.MEMBER_NAME,
                          amount:clubInfo.USE_AMOUNT,
                          toChange:true
                          }}
                    >
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/total.png')}
                            title='直推消费金额'
                            describing={clubInfo.USE_AMOUNT?clubInfo.USE_AMOUNT:0}
                            //link={el.link}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/teamAmount"
                        query={{palyMoney:clubInfo.USE_AMOUNT,amount:clubInfo.DIRECT_PUSH_COUNT}}
                        >
                        <CellComponent
                            imgUrl={require('../../Images/payment.png')}
                            title={'直推人数'}
                            describing={clubInfo.DIRECT_PUSH_COUNT?clubInfo.DIRECT_PUSH_COUNT:0}
                            //link={'/paymentOther'}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/myCustomer"
                        query={{teemCount:clubInfo.TEEM_MEMBER_COUNT,teemAmount:clubInfo.TEEM_MEMBER_COUNT}}>
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/used.png')}
                            title={'团队人数'}
                            describing={clubInfo.TEEM_MEMBER_COUNT?clubInfo.TEEM_MEMBER_COUNT:0}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/teamAmount"
                        query={{
                        imgUrl:clubInfo.IMAGE_URI,
                        memberName:clubInfo.MEMBER_NAME,
                        amount:clubInfo.TEEM_MEMBER_AMOUNT,
                        toChange:true
                        }}
                    >
                        <CellComponent
                            imgUrl={require('../../Images/diary.png')}
                            title={'团队消费金额'}
                            describing={clubInfo.TEEM_MEMBER_AMOUNT?clubInfo.TEEM_MEMBER_AMOUNT:0}
                            //link={'/personalCenter/teamAmount'}
                        />
                    </Link>
                </div>
                <SplitLine />
                <div className="chooseType font14 plr border_bottom">
                    <span className="color6">全国等级排名</span>
                    <Link to="/personalCenter/countryRank" query={{point:clubInfo.USE_AMOUNT?clubInfo.USE_AMOUNT:0}}>
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
                                totalPay = {el.totalPay}
                                _vipPoints={el.vipPoints}
                                rightCursor = {false}
                                isShow = {false}
                            />
                        )
                    })
                }

            </div>
        );
    }
}
