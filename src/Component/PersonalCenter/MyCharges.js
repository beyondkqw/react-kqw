import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';
import {WechatAuth} from '../../Action/autoLogin'


const ChargesList = [
    {imgUrl:require('../../Images/total.png'),title:'总佣金收入',describing:'1256.26',link:'/personalCenter/allIncome'},
    {imgUrl:require('../../Images/payment.png'),title:'分销佣金',describing:'团队共赢',link:'/personalCenter/retailing'},
    {imgUrl:require('../../Images/used.png'),title:'佣金提取明细',describing:'佣金提取记录',link:'/personalCenter/takenDetails'},
    {imgUrl:require('../../Images/diary.png'),title:'佣金转赠',describing:'把佣金转给好友',link:'/personalCenter/commisionGiving'}
];
export default class MyCharges extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            accId:''
        };
      }
    componentWillMount() {
        const accId = this.props.location.query.memberId
        this.setState({accId:accId})
        console.log('memberId',accId);
        //WechatAuth()
    }
    render() {
        const {accId} = this.state
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="recharge border_bottom plr">
                    <div className="color_yellow fl height_all">
                        <span className="f15">￥</span><span className="f25">5678</span>
                    </div>
                    <Link to="/personalCenter/withdrawCash">
                        <button className="fr settleAccount border_ra color_white mt11">提取</button>
                    </Link>
                </div>
                <div className="clearAll">
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/total.png')}
                        title={'总佣金收入'}
                        describing={'1256.26'}
                        link={'/personalCenter/allIncome'}
                    />
                    <CellComponent
                        imgUrl={require('../../Images/payment.png')}
                        title={'分销佣金'}
                        describing={'团队共赢'}
                        link={'/personalCenter/retailing'}
                        accId = {accId}
                    />
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/used.png')}
                        title={'佣金提取明细'}
                        describing={'佣金提取记录'}
                        link={'/personalCenter/takenDetails'}
                        accId = {accId}
                    />
                    <CellComponent
                        imgUrl={require('../../Images/diary.png')}
                        title={'佣金转赠'}
                        describing={'把佣金转给好友'}
                        link={'/personalCenter/commisionGiving'}
                    />
                </div>
            </div>
        );
    }
}
