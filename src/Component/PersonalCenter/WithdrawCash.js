import React, { Component} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import EnterPassword from '../../Component/CommonComponent/EnterPassword';
import '../../Stylesheets/App/personal.css';

export default class WithdrawCash extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.copyArray=[]
        this.state = {
            toShowModal:false
        };
    }
    confirmIncome(){
        this.setState({toShowModal:true})
    }
    render() {
        const {toShowModal} = this.state
        console.log('toShowModal==========>',toShowModal)
        return (
            <div className="bkg_color containerNav">
                <div className="wrap">
                    <div className="list-block m0">
                        <ul>
                            <Link to='/personalCenter/commissionCash'>
                                <li className="item-content item-link item-link pl  border_bottom">
                                    <div className="item-media">
                                        <span className="fl di headerImg">
                                            <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                                        </span>
                                    </div>
                                    <div className="item-inner" style={{marginLeft:15}}>
                                        <div className="item-title-row">
                                            <div className="item-title font14 color6">多云云的天堂</div>
                                            <div className="f12 color9">请选择提现账号</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
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
                            />
                        </div>
                    </div>
                    <div className="plAll border_top border_bottom f12">
                        <span>最多可提取</span>
                        <span className="di ml">￥</span><span>123</span>
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
                                    <div className="item-after color9 isSet">421</div>
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
                                    <div className="item-after color9 isSet">345</div>
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
                                    <div className="item-after color9 isSet">345</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <CommonBtn
                        title={'确认提现'}
                        onClick={()=>this.confirmIncome()}
                    />
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
            </div>
        );
    }
}
