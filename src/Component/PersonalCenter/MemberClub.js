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
            list:[],
            headImg:'',
            name:''
        };
    }
    /*    componentWillMount() {
     this.getMyInfo()
     // this.getMemberInfo()
     }

     async getMyInfo(){
     await MyInfo()
     .then(res=>{
     console.log('个人资料',res)
     this.setState({
     name : res.MEMBER_NAME,
     headImg:res.IMAGE_URI
     })
     })
     }*/

    // async getMemberInfo(){
    //     await MemberInfo()
    //     .then(res=>{
    //         console.log('俱乐部',res)
    //         this.setState({clubInfo:res,list:res.FIRST_THREE_ACCOUNT})
    //     })
    //     .catch(err=>{
    //         console.log('getMemberInfo',err)
    //     })
    // }

    render() {
        const {clubInfo,list,headImg,name} = this.state
        return (
            <div className="containerNav">

                <div className="club_height member_bkImg">
                    <Link to="personalCenter/userInfo">
                        <div className="personLogo">
                            <img className="border_ra50" src={headImg} alt=""/>
                        </div>
                    </Link>
                    <div className="font14 color_white" style={{marginTop:10,height:15}}>{name}</div>
                </div>
                <SplitLine />
                <div className="clearAll personal_h8">
                    <Link to="/personalCenter/teamAmount"
                    >
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/Invitation.png')}
                            title='我的积分'
                            //describing={clubInfo.USE_AMOUNT?clubInfo.USE_AMOUNT:0}
                            describing={'所有积分消息都在这里'}
                            //link={el.link}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/myTeam"
                    >
                        <CellComponent
                            imgUrl={require('../../Images/team.png')}
                            title={'我的团队'}
                            describing={'我最爱的直推会员'}
                            //describing={clubInfo.DIRECT_PUSH_COUNT?clubInfo.DIRECT_PUSH_COUNT:0}
                            //link={'/paymentOther'}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/countryRank">
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/integral.png')}
                            title={'我的邀请函'}
                            //describing={clubInfo.TEEM_MEMBER_COUNT?clubInfo.TEEM_MEMBER_COUNT:0}
                            describing={'展示你的靓靓面'}
                        />
                    </Link>
                    <Link
                        to="/personalCenter/aboutDemo"
                    >
                        <CellComponent
                            imgUrl={require('../../Images/share.png')}
                            title={'分享禄贤'}
                            describing={'分享得积分大大赞'}
                            //describing={clubInfo.TEEM_MEMBER_AMOUNT?clubInfo.TEEM_MEMBER_AMOUNT:0}
                            //link={'/personalCenter/teamAmount'}
                        />
                    </Link>
                </div>

            </div>
        )
    }
}
