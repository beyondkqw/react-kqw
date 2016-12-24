import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';


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
            accId:'',
            Now_Amount:'',
            frozen:''
        };
      }
    componentWillMount() {
        const {memberId,now_amount,frozen} = this.props.location.query
        this.setState({accId:memberId})
        this.setState({Now_Amount:now_amount})
        this.setState({frozen:frozen})
        console.log('memberId',memberId);
        console.log('now_amount',now_amount);
    }
    render() {
        const {accId,Now_Amount,frozen} = this.state
        console.log('============',Now_Amount)
        return (
            <div className="containerNav">
                <div className="wrap">
                    <SplitLine />
                    <div className="recharge border_bottom plr">
                        <div className="color_yellow fl height_all">
                            <span className="f15">￥</span><span className="f25">5678</span>
                        </div>
                        <Link to="/personalCenter/withdrawCash" query={{now_amount:Now_Amount,frozen:frozen}}>
                            <button className="fr settleAccount border_ra color_white mt11">提取</button>
                        </Link>
                    </div>
                </div>
                <div className="clearAll">
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/total.png')}
                        title={'总佣金收入'}
                        describing={Now_Amount}
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
