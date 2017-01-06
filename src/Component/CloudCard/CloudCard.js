import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import PersonInformation from '../../Component/CommonComponent/PersonInformation';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/cloudCard.css';


export default class CloudCard extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="wrap">
                    <SplitLine />
                    <div className="recharge border_bottom plr">
                        <div className="color_yellow fl height_all">
                            <span className="f15">￥</span><span className="f25">5678</span>
                        </div>
                        <Link to="/personalCenter/recharge">
                            <button className="fr settleAccount border_ra color_white mt11">充值</button>
                        </Link>
                    </div>
                    <div className="clearAll">
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/total.png')}
                            title={'总额'}
                            describing={'1256.26'}
                            link={'/totalDetails'}
                        />
                        <CellComponent
                            imgUrl={require('../../Images/payment.png')}
                            title={'待付款'}
                            describing={'待付款项目'}
                            link={'/pendingPayment'}
                        />
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/used.png')}
                            title={'已使用'}
                            describing={'云卡通购买使用记录'}
                            link={'/alreadyUsed'}
                        />
                        <CellComponent
                            imgUrl={require('../../Images/diary.png')}
                            title={'充值记录'}
                            describing={'充值卡卡通记录'}
                            link={'/diaryContainer'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
