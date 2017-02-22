import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';
import {MyInfo} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'


const ChargesList = [
    {imgUrl:require('../../Images/total.png'),title:'总佣金收入',describing:'1256.26',link:'/personalCenter/allIncome'},
    {imgUrl:require('../../Images/payment.png'),title:'分销佣金',describing:'团队共赢',link:'/personalCenter/retailing'},
    {imgUrl:require('../../Images/used.png'),title:'佣金提取明细',describing:'佣金提取记录',link:'/personalCenter/takenDetails'},
    {imgUrl:require('../../Images/diary.png'),title:'佣金转赠',describing:'把佣金转给好友',link:'/personalCenter/commisionGiving'}
];
export default class SellerBalanceMan extends Component {
    render() {
        const {accId,Now_Amount,frozen} = this.props.location.query
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'资金管理'}
                />
                <SplitLine />
                <div className="recharge border_bottom plr">
                    <div className="color_yellow fl height_all">
                        <span className="f15">￥</span><span className="f25">{Now_Amount}</span>
                    </div>
                    <Link to="/balanceTake" query={{now_amount:Now_Amount,frozen:frozen}}>
                        <button className="fr f15 settleAccount border_ra color_white mt11">提取</button>
                    </Link>
                </div>
                <div className="recharge border_bottom plr">
                    <div className="fl color9 height_all">
                        <span className="f15">￥</span><span className="f25">{frozen}</span>
                    </div>
                    <Link to="/personalCenter/withdrawCash" query={{now_amount:Now_Amount,frozen:frozen}}>
                        <button className="fr f15 settleAccount border_ra color_white mt11" style={{backgroundColor:'#999'}}>冻结金额</button>
                    </Link>
                </div>
                <div className="clearAll">
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/total.png')}
                        title={'全部余额'}
                        describing={Now_Amount}
                    />
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/common/jilu.png')}
                        title={'余额收支明细'}
                        describing={'余额收支记录'}
                        link={'/sellerTakenDetails'}
                        accId = {accId}
                        showRight = {true}
                    />
                </div>
            </div>
        );
    }
}
