import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import EnterPassword from '../../Component/CommonComponent/EnterPassword';
import '../../Stylesheets/App/personal.css';
import {Cash,MyInfo} from '../../Action/auth'

export default class WithdrawCash extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.copyArray=[]
        this.state = {
            toShowModal:false,
            amount:'',
            Reminder:'',
            now_amount:0,
            frozen:0,
            allAmount:0
        };
    }

    static contextTypes = {
        router:PropTypes.object
    }

    async componentWillMount() {
        await this.getMyInfo()
        this.setState({allAmount:parseInt(this.state.now_amount)+parseInt(this.state.frozen)})
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({
                    now_amount : res.NOW_AMOUNT,
                    frozen:res.FROZEN
                })
            })
    }

    //确认提现
    confirmIncome(){
        //this.setState({toShowModal:true})
        const {bankcardId} = this.props.location.query
        if(!bankcardId){
            alert('请选择所需银行卡')
            return
        }
        if(!this.state.amount){
            alert('请输入提现金额')
            return
        }
        if(this.state.amount > this.state.now_amount){
            alert('可提现金额不足')
            return
        }
        this.getCash(bankcardId,this.state.amount)

    }

    async getCash(bankcardId,amount) {
        await Cash(bankcardId,amount)
            .then(res=> {
                alert('提现成功')
                //this.context.router.goBack()
            })
            .catch(err=> {
                this.setState({Reminder:err.message})
            })
    }

    render() {
        const {toShowModal,now_amount,frozen,allAmount} = this.state
        const {toChange,bankname,bankcardNo} = this.props.location.query
        return (
            <div className="bkg_color">
                <div className="list-block m0">
                    <ul>
                        {
                            toChange?
                                <Link to='/personalCenter/commissionCash'>
                                    <li className="item-content item-link item-link pl  border_bottom">
                                        <div className="item-media">
                                            <span className="fl di headerImg">
                                                <img className="border_ra50" src={require('../../Images/headerImg.jpg')}
                                                     alt=""/>
                                            </span>
                                        </div>
                                        <div className="item-inner" style={{marginLeft:15}}>
                                            <div className="item-title-row">
                                                <div className="item-title font14 color6">{bankname}</div>
                                                <div className="f12 color9">尾号{bankcardNo}的卡</div>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                :
                                <Link to='/personalCenter/commissionCash'>
                                    <li className="item-content item-link item-link pl  border_bottom">
                                        {/*<div className="item-media">
                                            <span className="fl di headerImg">
                                                <img className="border_ra50" src={require('../../Images/headerImg.jpg')}
                                                     alt=""/>
                                            </span>
                                        </div>*/}
                                        <div className="item-inner" style={{marginLeft:15}}>
                                            <div className="item-title-row">
                                                <div className="f12 color9">请选择提现账号</div>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                        }
                    </ul>
                </div>
                <SplitLine />
                <div className="plAll">
                    <p className="color6 font14">提现金额</p>
                    <div className="mt5 mb1 f25 df">
                        <span className="flex-1">￥</span>
                        <input
                            className="borderno"
                            type="text"
                            placeholder="0.00"
                            ref='pointAmount'
                            onChange={()=>this.setState({amount:this.refs.pointAmount.value})}
                        />
                    </div>
                </div>
                <div className="plAll border_top border_bottom f12">
                    <span>最多可提取</span>
                    <span className="di ml">￥</span><span>{now_amount}</span>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    <ul>
                        <li className ='item-content border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">总佣金</span>
                                </div>
                                <div className="item-after color9 isSet">{allAmount}</div>
                            </div>
                        </li>
                        <li className ='item-content border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">可提取佣金</span>
                                </div>
                                <div className="item-after color9 isSet">{now_amount}</div>
                            </div>
                        </li>
                        <li className ='item-content border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">已申请提现佣金</span>
                                </div>
                                <div className="item-after color9 isSet">{frozen}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <div className="plr">
                    <button
                        className="lh20 border_ra color_white bkg_ff width_100"
                        onClick={()=>this.confirmIncome()}
                    >
                        确认提现
                    </button>
                </div>
                <p className="f12 color6 tc mt5">余额提现时间为产品<span className="color_yellow">确认收货后30</span>天
                    <Link to="/personalCenter/balanceCashRule">
                        <span className="di pa" style={{width:15,height:15,lineHeight:0,marginLeft:5}}>
                            <img src={require('../../Images/toRead.png')} alt=""/>
                        </span>
                    </Link>
                </p>
                {/*模态层*/}
                {
                    toShowModal?
                        <EnterPassword />
                        : null
                }
                </div>
        );
    }
}
