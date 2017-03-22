import React, { Component,PropTypes} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import {BankUpdate,UnBinding} from '../../Action/auth';
import {ErrorNum,BankNum,ChinaChar,EnglishChar,specialChar} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class ModifyBankCard extends Component {
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
            mobile:'',
            bankId:''
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        const {bankId,bankName,name,bankCardNo,pro,city,area,branch,mobile} = this.props.location.query
        this.setState({
            bankId:bankId,
            bankName:bankName,
            name:name,
            bankCardNo:bankCardNo,
            pro:pro,
            city:city,
            area:area,
            branch:branch,
            mobile:mobile
        })
    }

    //更新银行卡的信息
    async getModifyCard() {
        const {bankId,bankName,name,bankCardNo,pro,city,area,branch,mobile} = this.state
        if(bankName ==''||name == ''||pro==''||city==''||area==''||branch==''||mobile ==''||bankCardNo==''){
            this.setState({Reminder:'信息不能为空,请填写完整'})
            return
        }
        if (!ErrorNum(mobile)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
            return
        }
        /*if (!BankNum(bankCardNo)) {
            this.setState({Reminder:'银行卡号码有误,请重新填写'})
            return
        }*/
        await BankUpdate(bankId,bankName,name,bankCardNo,pro,city,area,branch,mobile)
            .then(res=>{
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    async DelCard(){
        await UnBinding(this.state.bankId)
            .then(res=>{
                alert('删除银行卡成功')
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //判断手机号是否正确
    isRight(value,param){
        if(value){
            if(param === 'mobile'){
                if (!ErrorNum(value)) {
                    this.setState({Reminder:'手机号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
            if(param === 'bankcardNo'){
                if (!BankNum(value)) {
                    this.setState({Reminder:'银行卡号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
        }

    }

    render() {
        const {bankName,name,bankCardNo,pro,city,area,branch,mobile} = this.state
        return (
            <div className="containerNav pb1">
                <NavBar
                    renderBack = {true}
                    title = {'修改银行卡'}
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
                                            ref="name"
                                            value = {name}
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
                                            value = {mobile}
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
                                            value = {bankCardNo}
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
                                            value = {bankName}
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
                                            value = {pro}
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
                                            value = {city}
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
                                            value = {area}
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
                                            value = {branch}
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
                    <div className="plr flex">
                        <button
                            className="bank_height border_ra color_white bkg_ff flex-1 font16"
                            onClick={()=>this.getModifyCard()}
                        >
                            编辑
                        </button>
                        <button
                            className="bank_height border_ra color_white bkg_ff flex-1 font16"
                            style={{marginLeft:25}}
                            onClick={()=>this.DelCard()}
                        >
                            删除
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
