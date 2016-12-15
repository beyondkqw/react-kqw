import React, { Component,PropTypes} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import {BandBank} from '../../Action/auth';
import {ErrorNum,BankNum} from '../../Action/rpc'


export default class BankInformation extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Reminder:'',
            bankName:'',
            name:'',
            bankCardNo:'',
            pro:'',
            city:'',
            area:'',
            branch:'',
            mobile:''
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }
    //绑定银行卡
    async BandCard() {
        const {bankName,name,bankCardNo,pro,city,area,branch,mobile} = this.state
        if(bankName ==''||name == ''||pro==''||city==''||area==''||branch==''){
            this.setState({Reminder:'信息不能为空,请填写完整'})
            return
        }
        await BandBank(bankName,name,bankCardNo,pro,city,area,branch,mobile)
            .then(res=>{
               this.context.router.push({pathname:'/personalCenter/myBankCark'})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //判断手机号是否正确
    isRight(value,param){
        if(param === 'mobile'){
            if (!ErrorNum(value)) {
                this.setState({Reminder:'手机号码有误,请重新填写'})
            }
        }
        if(param === 'bankcardNo'){
            if (!BankNum(value)) {
                this.setState({Reminder:'银行卡号码有误,请重新填写'})
            }
        }
    }

    render() {
        return (
            <div className="containerNav pb1">
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
                                        ref="name"
                                        onChange={()=>this.setState({name:this.refs.name.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">联系电话</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="mobile"
                                        onChange={()=>this.setState({mobile:this.refs.mobile.value})}
                                        onBlur={()=>this.isRight(this.state.mobile,'mobile')}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">银行账号</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="bankCardNo"
                                        onChange={()=>this.setState({bankCardNo:this.refs.bankCardNo.value})}
                                        onBlur={()=>this.isRight(this.state.bankCardNo,'bankcardNo')}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">开户银行</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="bankName"
                                        onChange={()=>this.setState({bankName:this.refs.bankName.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">省份</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="pro"
                                        onChange={()=>this.setState({pro:this.refs.pro.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">城市</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="city"
                                        onChange={()=>this.setState({city:this.refs.city.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">区县</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="area"
                                        onChange={()=>this.setState({area:this.refs.area.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="userHeight border_bottom plr font14">
                            <div className="fl color6">开户支行</div>
                            <div className="fr f12 color9 tr">
                                <span>
                                    <input
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref="branch"
                                        onChange={()=>this.setState({branch:this.refs.branch.value})}
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="userHeight border_bottom plr font14 color_yellow">
                    请写明:姓名+XX银行XX省XX市XX分行XX支行
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <div className="plr">
                    <button
                        className="bank_height border_ra color_white bkg_ff width_100"
                        onClick={()=>this.BandCard()}
                    >
                        确认
                    </button>
                </div>
            </div>
        );
    }
}
