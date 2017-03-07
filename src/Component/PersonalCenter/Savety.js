import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';
import {MyInfo} from '../../Action/auth'


export default class Savety extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mobile:''
        };
      }
    componentWillMount() {
        this.getMyInfo()
    }
    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({
                    mobile:res.ACC_NAME
                })
            })
    }
    render() {
        const {mobile} = this.state
        return (
            <div className="containerNav">
                <div className="wrap">
                    <div className="bkg_gray save_h2 pl8">账户</div>
                    <div className="list-block m0 font14">
                        <ul>
                            <Link to='/personalCenter/myBankCark'>
                                <li className="item-content item-link border_bottom isConfirmSet">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            <span className="di listimg"><img src={require('../../Images/alipay.png')} alt=""/></span>
                                            <span className="di margin15 color6">我的银行卡</span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/personalCenter/myAlipay">
                                <li className="item-content item-link border_bottom">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            <span className="di listimg"><img src={require('../../Images/credit.png')} alt=""/></span>
                                            <span className="di margin15 color6">我的支付宝</span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="bkg_gray save_h2 pl8">账号</div>
                    <div className="list-block m0 font14">
                        <ul>
                            <Link>
                                <li className="item-content border_bottom isConfirmSet">
                                    <div className="item-inner">
                                        <div className="item-title height_all">
                                            <span className="di listimg"><img src={require('../../Images/wx.png')} alt=""/></span>
                                            <span className="di margin15 color6">微信号</span>
                                        </div>
                                        <div className="item-after color9 isSet">未绑定</div>
                                    </div>
                                </li>
                            </Link>
                            {/*<Link>
                                <li className="item-content border_bottom">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            <span className="di listimg"><img src={require('../../Images/qq.png')} alt=""/></span>
                                            <span className="di margin15 color6">QQ号</span>
                                        </div>
                                        <div className="item-after bandNum color9">已绑定</div>
                                    </div>
                                </li>
                            </Link>
                            <Link>
                                <li className="item-content border_bottom">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            <span className="di listimg"><img src={require('../../Images/weibo.png')} alt=""/></span>
                                            <span className="di margin15 color6">微博号</span></div>
                                        <div className="item-after bandNum color9">已绑定</div>
                                    </div>
                                </li>
                            </Link>*/}
                            <Link to = '/Setting/BindPhone'>
                                <li className="item-content border_bottom">
                                    <div className="item-inner">
                                        <div className="item-title">
                                            <span className="di listimg"><img src={require('../../Images/phoneImg.png')} alt=""/></span>
                                            <span className="di margin15 color6">手机号</span>
                                        </div>
                                        <div className="item-after bandNum color9">{mobile?mobile:'未绑定'}</div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="bkg_gray save_h2 pl8">安全</div>
                <div className="list-block m0 font14">
                    <ul>
                        <Link to="/Setting/PwdModify" query={{mobile:this.props.location.query.mobile}}>
                            <li className="item-content">
                                <div className="item-inner">
                                    <div className="item-title">
                                        <span className="di listimg"><img src={require('../../Images/password.png')} alt=""/></span>
                                        <span className="di margin15 color6">修改密码</span></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}
