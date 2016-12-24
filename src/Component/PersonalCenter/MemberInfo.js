import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import GivingList from '../../Component/CommonComponent/GivingList';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {LvmemberInfo} from '../../Action/auth'

const MemberList = [
    {title:'自己消费金额',describing:'5000.00',link:''},
    {title:'直推人数',describing:'54',link:'/paymentOther'},
    {title:'直推消费金额',describing:'12',link:'/alreadyUsed'},
    {title:'团队人数',describing:'4658748',link:'/diaryContainer'},
    {title:'团队消费金额',describing:'4658748',link:'/diaryContainer'}
];
export default class MemberInfo extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberInfo:[]
        };
      }
    async componentWillMount() {
        console.log('this.props.location.query.accId',this.props.location.query.accId)
        await LvmemberInfo(this.props.location.query.accId)
            .then(res=>{
                this.setState({memberInfo:res})
            })
            .catch(err=>{
                console.warn('获取',err)
            })
    }
    render() {
        const {memberInfo} = this.state
        return (
            <div className="containerNav">
                <RankRow
                    more={true}
                    num={1}
                    isShow={true}
                    vipPoints={memberInfo.LV}
                    imgUrl={memberInfo.IMAGE_URI}
                    _vipPoints = {memberInfo.VIP_POINTS}
                />
                <SplitLine />
                <div className="clearAll" style={{height:'160'}}>
                    <div className="height_charge border_bottom plAll font14">
                        <div className="fl lh2 color6">自己消费金额</div>
                        <div className="fr lh2 f12 color9 tr">
                            <span >￥</span><span>{memberInfo.USE_AMOUNT?memberInfo.USE_AMOUNT:0}</span>
                        </div>
                    </div>
                    <div className="height_charge border_bottom plAll font14">
                        <div className="fl lh2 color6">直推人数</div>
                        <div className="fr lh2 f12 color9 tr">
                            <span>{memberInfo.DIRECT_PUSH_COUNT?memberInfo.DIRECT_PUSH_COUNT:0}</span>
                        </div>
                    </div>
                    <div className="height_charge border_bottom plAll font14">
                        <div className="fl lh2 color6">直推消费金额</div>
                        <div className="fr lh2 f12 color9 tr">
                            <span>￥</span><span>{memberInfo.DIRECT_PUSH_AMOUNT?memberInfo.DIRECT_PUSH_AMOUNT:0}</span>
                        </div>
                    </div>
                    <div className="height_charge border_bottom plAll font14">
                        <div className="fl lh2 color6">团队人数</div>
                        <div className="fr lh2 f12 color9 tr">
                            <span>{memberInfo.TEEM_MEMBER_COUNT?memberInfo.TEEM_MEMBER_COUNT:0}</span>
                        </div>
                    </div>
                    <div className="height_charge border_bottom plAll font14">
                        <div className="fl lh2 color6">团队消费金额</div>
                        <div className="fr lh2 f12 color9 tr">
                            <span>￥</span><span>{memberInfo.TEEM_MEMBER_AMOUNT?memberInfo.TEEM_MEMBER_AMOUNT:0}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
