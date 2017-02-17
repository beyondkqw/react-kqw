import React, { Component,PropTypes } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import NavBar from '../../Component/CommonComponent/NavBar'
import {BindingAlipay,QueryAlipay} from '../../Action/auth';

export default class SellerMyAlipy extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            remind:'',
            alipyName:'',
            alipyNum:''
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getInformation()
    }

    //查询默认的账号
    async getInformation(){
        await QueryAlipay()
            .then(res=>{
                this.setState({alipyName:res.name})
                this.setState({alipyNum:res.accNumber})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //绑定新的支付宝账号
    async addAlipy(){
        if(!this.refs.alipyName.value || !this.refs.accountNum.value){
            this.setState({remind:'所填数据不能为空'})
            return
        }
        await BindingAlipay(this.refs.alipyName.value,this.refs.accountNum.value)
            .then(res=>{
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {alipyName,alipyNum} = this.state
        return (
            <div className="containerNav pb1">
                <NavBar
                    renderBack = {true}
                    title = {'我的支付宝'}
                />
                <div className="wrap">
                    <ul>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">开户姓名</div>
                                <div className="fr f12 color9 tr">
                                    <span>
                                        <input
                                            className="tr borderno"
                                            type="text"
                                            placeholder="编辑"
                                            ref="alipyName"
                                            value={alipyName}
                                            onChange = {()=>this.setState({alipyName:this.refs.alipyName.value})}
                                        />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">支付宝账号</div>
                                <div className="fr f12 color9 tr">
                                    <span>
                                        <input
                                            className="tr borderno"
                                            type="text"
                                            placeholder="编辑"
                                            ref="accountNum"
                                            value={alipyNum}
                                            onChange = {()=>this.setState({alipyNum:this.refs.accountNum.value})}
                                        />
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="tc f12 color_red width_100 plr mtb loginHeight" style={{lineHeight:'1.8rem'}}>
                        {this.state.remind}
                    </div>
                    <CommonBtn
                        title = {'确认'}
                        onClick = {()=>this.addAlipy()}
                    />
                </div>
            </div>
        );
    }
}
