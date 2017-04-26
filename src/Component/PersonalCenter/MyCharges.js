import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';
import {GiveOnOff,MyInfo} from '../../Action/auth'

export default class MyCharges extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            accId:'',
            Now_Amount:'',
            frozen:'',
            GiveOnOff:'',
            name:'',
            img:''
        };
      }
    componentWillMount() {
        this.getMyInfo()
        //转赠开关
        this.judgeGiveOnOff()
    }

    judgeGiveOnOff(){
        GiveOnOff()
            .then(res=>{
                this.setState({GiveOnOff:res})
            })
            .catch(err=>{
                console.warn('GiveOnOff err',err)
            })
    }
    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                console.log('个人资料',res)
                this.setState({accId:res.ID,Now_Amount:res.NOW_AMOUNT,frozen:res.FROZEN,name:res.MEMBER_NAME,img:res.IMAGE_URI})
            })
    }
    render() {
        const {accId,Now_Amount,frozen,name,img} = this.state
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="recharge border_bottom plr">
                    <div className="color_yellow fl height_all">
                        <span className="f15">￥</span><span className="f25">{Now_Amount?Now_Amount:0}</span>
                    </div>
                    <Link to="/personalCenter/withdrawCash" query={{now_amount:Now_Amount,frozen:frozen}}>
                        <button className="fr settleAccount border_ra color_white mt11">提取</button>
                    </Link>
                </div>
                <div className="border_bottom plr flex flex-pack-justify flex-align-center" style={{height:40}}>
                    <div className="color6 font14">
                        冻结金额￥{frozen?frozen:0}
                    </div>
                    <button className="color9 font14">无法提取</button>
                </div>
                <div className="clearAll">
                    {/*<Link to="/personalCenter/allIncome">*/}
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/total.png')}
                            title={'总佣金收入'}
                            describing={Now_Amount}
                        />
                    {/*</Link>*/}
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
                    {
                        this.state.GiveOnOff?
                            <CellComponent
                                imgUrl={require('../../Images/diary.png')}
                                title={'佣金转赠'}
                                describing={'把佣金转给好友'}
                                link={'/personalCenter/commisionGiving'}
                            />
                            :null
                    }
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/record.png')}
                        title={'交易记录'}
                        link={'/changeRecord'}
                    />


                </div>
            </div>
        );
    }
}
