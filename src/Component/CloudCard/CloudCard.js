import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import PersonInformation from '../../Component/CommonComponent/PersonInformation';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/cloudCard.css';
import {MyInfo} from '../../Action/auth'


export default class CloudCard extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            yunCard:''
        };
      }

    componentWillMount() {
        this.getMyInfo()
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                console.log('个人资料',res)
                this.setState({
                    yunCard:res.YUN_CARD_AMOUNT
                })
            })
    }
    render() {
        const {yunCard} = this.state
        return (
            <div className="containerNav">
                <div className="wrap">
                    <SplitLine />
                    <div className="recharge border_bottom plr">
                        <div className="color_yellow fl height_all">
                            <span className="f15">￥</span><span className="f25">{yunCard}</span>
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
                            describing={yunCard}
                            //link={'/totalDetails'}
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
